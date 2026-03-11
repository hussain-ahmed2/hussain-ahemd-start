import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { Link } from '@tanstack/react-router'
import { SidebarClose, SidebarOpen } from 'lucide-react'

export default function SidebarHeaderButton() {
  const { open, toggleSidebar, isMobile } = useSidebar()
  return (
    <div className="flex items-center gap-2">
      {open && (
        <Link to="/" className="px-2">
          Hussain
        </Link>
      )}
      <SidebarMenu className="w-fit ml-auto">
        <SidebarMenuItem>
          <SidebarMenuButton asChild onClick={toggleSidebar}>
            {isMobile && open ? (
              <SidebarClose />
            ) : open ? (
              <SidebarClose />
            ) : (
              <SidebarOpen />
            )}
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  )
}
