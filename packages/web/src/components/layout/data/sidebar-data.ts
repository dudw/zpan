import {
  FolderOpen,
  HardDrive,
  ImageUp,
  Trash2,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: '',
    email: '',
    avatar: '',
  },
  teams: [],
  navGroups: [
    {
      title: 'Main',
      items: [
        {
          title: 'Files',
          url: '/files',
          icon: FolderOpen,
        },
        {
          title: 'Image Bed',
          url: '/images',
          icon: ImageUp,
        },
        {
          title: 'Recycle Bin',
          url: '/recycle-bin',
          icon: Trash2,
        },
      ],
    },
  ],
}
