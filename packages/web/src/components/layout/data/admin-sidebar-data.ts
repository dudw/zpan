import {
  Database,
  HardDrive,
  Settings,
  Users,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const adminSidebarData: SidebarData = {
  user: {
    name: '',
    email: '',
    avatar: '',
  },
  teams: [
    {
      name: 'ZPan Admin',
      logo: HardDrive,
      plan: 'Administration',
    },
  ],
  navGroups: [
    {
      title: 'Management',
      items: [
        {
          title: 'Storage Backends',
          url: '/admin/storages',
          icon: Database,
        },
        {
          title: 'Users',
          url: '/admin/users',
          icon: Users,
        },
        {
          title: 'System Settings',
          url: '/admin/settings',
          icon: Settings,
        },
      ],
    },
  ],
}
