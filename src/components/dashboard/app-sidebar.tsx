import {
  Briefcase,
  Code2,
  Contact,
  FolderKanban,
  LayoutDashboard,
  Settings,
  UserSearch,
} from 'lucide-react'

import { useLocation } from '@tanstack/react-router'
import { NavUser } from './nav-user'
import SidebarHeaderButton from './sidebar-header-buttons'
import SidebarLink from './sidebar-link'
import type { User } from 'better-auth'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const sidebarLinks = [
  {
    title: 'Dashboard',
    url: '/me',
    icon: LayoutDashboard,
  },
  {
    title: 'Experiences',
    url: '/me/experiences',
    icon: Briefcase,
  },
  {
    title: 'Skills',
    url: '/me/skills',
    icon: Code2,
  },
  {
    title: 'Projects',
    url: '/me/projects',
    icon: FolderKanban,
  },
  {
    title: 'Contacts',
    url: '/me/contacts',
    icon: Contact,
  },
  {
    title: 'Visitors',
    url: '/me/visitors',
    icon: UserSearch,
  },
  {
    title: 'Settings',
    url: '/me/settings',
    icon: Settings,
  },
]

export type SidebarLink = (typeof sidebarLinks)[number]

export default function AppSidebar({ user }: { user: User }) {
  const { pathname } = useLocation()
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarHeaderButton />
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarLink isActive={pathname === item.url} item={item} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user.name,
            email: user.email,
            avatar: user.image || '',
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
