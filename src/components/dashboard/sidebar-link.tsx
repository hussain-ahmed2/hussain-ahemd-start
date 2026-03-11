import { SidebarMenuButton, useSidebar } from '../ui/sidebar'
import type { SidebarLink } from './app-sidebar'
import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'

export default function SidebarLink({
  item,
  isActive,
}: {
  item: SidebarLink
  isActive: boolean
}) {
  const { isMobile, toggleSidebar } = useSidebar()

  const handleClick = () => {
    if (isMobile) {
      toggleSidebar()
    }
  }

  return (
    <SidebarMenuButton
      onClick={handleClick}
      asChild
      isActive={isActive}
      className={cn(
        'data-[active=true]:bg-primary data-[active=true]:text-primary-foreground',
        'data-[active=true]:dark:bg-primary data-[active=true]:dark:text-primary-foreground',
      )}
    >
      <Link to={item.url} className="flex items-center gap-2">
        <item.icon className="w-4 h-4" />
        <span>{item.title}</span>
      </Link>
    </SidebarMenuButton>
  )
}
