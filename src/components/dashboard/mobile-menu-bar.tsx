import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar'

export default function MobileMenuBar() {
  const { isMobile } = useSidebar()
  return isMobile ? (
    <div className="h-10 flex items-center p-2">
      <SidebarTrigger />
    </div>
  ) : null
}
