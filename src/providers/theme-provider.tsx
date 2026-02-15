import { ScriptOnce, useRouter } from '@tanstack/react-router'
import { createServerFn, useServerFn } from '@tanstack/react-start'
import { getCookie, setCookie } from '@tanstack/react-start/server'
import {
  createContext,
  use,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import { z } from 'zod'
import { tryCatch } from '@/lib/utils'

export type Theme = 'dark' | 'light' | 'system'
const MEDIA = '(prefers-color-scheme: dark)'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
}

export const themeSchema = z.enum(['dark', 'light', 'system'])

export const getThemeFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const fn = (): Promise<Theme> => {
      return new Promise((resolve, reject) => {
        const value = getCookie('theme')
        const parsed = themeSchema.safeParse(value)
        if (parsed.success === false) reject(parsed.error)
        else resolve(parsed.data)
      })
    }

    const [error, theme] = await tryCatch(fn)

    if (error) {
      console.error(error)
      return 'system' as Theme
    }
    return theme
  },
)

const setThemeFn = createServerFn({ method: 'POST' })
  .inputValidator((input) =>
    z.object({ theme: themeSchema, key: z.string() }).parse(input),
  )
  .handler(({ data: { theme, key } }) => {
    setCookie(key, theme, {
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    })
    return theme
  })

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
  ...props
}: ThemeProviderProps) {
  const setThemeServer = useServerFn(setThemeFn)
  const router = useRouter()

  const [theme, setThemeState] = useState<Theme>(defaultTheme)

  const handleMediaQuery = useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      if (theme !== 'system') return
      const root = window.document.documentElement
      const targetTheme = e.matches ? 'dark' : 'light'
      if (!root.classList.contains(targetTheme)) {
        root.classList.remove('light', 'dark')
        root.classList.add(targetTheme)
      }
    },
    [theme],
  )

  // Listen for system preference changes
  useLayoutEffect(() => {
    const media = window.matchMedia(MEDIA)

    media.addEventListener('change', handleMediaQuery)
    handleMediaQuery(media)

    return () => media.removeEventListener('change', handleMediaQuery)
  }, [handleMediaQuery])

  useEffect(() => {
    const root = window.document.documentElement

    let targetTheme: string

    if (theme === 'system') {
      localStorage.removeItem(storageKey)
      targetTheme = window.matchMedia(MEDIA).matches ? 'dark' : 'light'
    } else {
      localStorage.setItem(storageKey, theme)
      targetTheme = theme
    }

    if (!root.classList.contains(targetTheme)) {
      root.classList.remove('light', 'dark')
      root.classList.add(targetTheme)
    }
  }, [theme, storageKey])

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme)

      // Persistence - Non-blocking for instant UI response
      setThemeServer({
        data: { theme: newTheme, key: 'theme' },
      }).then(() => {
        router.invalidate()
      })
    },
    [setThemeServer, router],
  )

  const value = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme, setTheme],
  )

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      <ScriptOnce>
        {`document.documentElement.classList.toggle(
            'dark',
            localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
            )`}
      </ScriptOnce>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = use(ThemeProviderContext)

  if ((context as unknown) === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
