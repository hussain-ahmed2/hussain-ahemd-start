import { useEffect, useState } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { ScrollAnimate } from './motion/scroll-animation'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/#hero', content: 'Home' },
  { href: '/#experience', content: 'Experience' },
  { href: '/#skills', content: 'Skills' },
  { href: '/#projects', content: 'Projects' },
  { href: '/#contact', content: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { pathname } = useLocation()

  const toggleMenu = () => {
    setOpen((prev) => !prev)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // Scroll lock effect
  useEffect(() => {
    if (open) {
      // Store the current scroll position
      const scrollY = window.scrollY

      // Apply styles to prevent scrolling
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'

      // Cleanup function
      return () => {
        // Restore scroll position and remove styles
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''

        // Restore scroll position
        window.scrollTo(0, scrollY)
      }
    }
  }, [open])

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <header>
      <ScrollAnimate
        variant="fadeDown"
        ease="easeIn"
        className={`fixed top-0 left-0 right-0 bg-background z-50 border-b transition duration-300 ${isScrolled ? 'border-muted' : 'border-transparent'}`}
      >
        <nav className="flex items-center justify-between max-w-6xl mx-auto min-h-16 px-2 sm:px-4">
          <div className="block md:hidden">
            <Button
              className={cn(open && 'bg-secondary/80')}
              onClick={toggleMenu}
              variant="ghost"
              size="icon-lg"
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="none"
                viewBox="0 0 48 48"
                stroke="currentColor"
                strokeWidth="6"
              >
                <line x1="4" y1="14" x2="44" y2="14" strokeLinecap="round" />
                <line x1="4" y1="34" x2="44" y2="34" strokeLinecap="round" />
              </svg>
            </Button>
          </div>

          <Link onClick={handleClose} to="/" className="logo">
            Hussain
          </Link>

          {/* Mobile menu with backdrop */}
          {open && (
            <div
              className="fixed top-20 inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              onClick={handleClose}
              aria-hidden="true"
            />
          )}

          <div
            className={`${open ? 'translate-x-0' : '-translate-x-full'} transition transform duration-300 md:hidden fixed top-16 left-0 right-0 bg-background flex flex-col h-full z-50`}
          >
            {navLinks.map(({ href, content }) => (
              <Link
                className={cn(
                  'mobile-nav-link',
                  pathname === href && 'text-neutral-950 dark:text-neutral-50',
                )}
                to={href}
                key={href}
                onClick={handleClose}
              >
                {content}
              </Link>
            ))}
          </div>

          <div className="space-x-8 hidden md:block">
            {navLinks.map(({ href, content }) => (
              <Link
                className={cn(
                  'nav-link',
                  pathname === href && 'text-neutral-950 dark:text-neutral-50',
                )}
                to={href}
                key={href}
              >
                {content}
              </Link>
            ))}
          </div>

          <ThemeToggle />
        </nav>
      </ScrollAnimate>
    </header>
  )
}
