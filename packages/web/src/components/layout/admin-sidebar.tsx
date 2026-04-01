import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { useLayout } from '@/context/layout-provider'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { AppTitle } from './app-title'
import { adminSidebarData } from './data/admin-sidebar-data'
import { NavGroup } from './nav-group'
import { NavUser } from './nav-user'

export function AdminSidebar() {
  const { collapsible, variant } = useLayout()
  return (
    <Sidebar collapsible={collapsible} variant={variant}>
      <SidebarHeader>
        <AppTitle title='ZPan' subtitle='Administration' />
      </SidebarHeader>
      <SidebarContent>
        {adminSidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <Button variant='ghost' size='sm' className='w-full justify-start' asChild>
          <Link to='/files'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Files
          </Link>
        </Button>
        <NavUser user={adminSidebarData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
