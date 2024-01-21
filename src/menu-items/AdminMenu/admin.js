// assets
import { IconUsers, IconFileStack, IconSubtask, IconPlaylistAdd, IconUserSearch, IconFileDatabase,IconDatabase } from '@tabler/icons';

// constant
const icons = {
  IconFileStack,
  IconSubtask,
  IconUsers,
  IconPlaylistAdd,
  IconUserSearch,
  IconFileDatabase,
  IconDatabase
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const AdminUtils = {
  id: 'utilities',
  title: 'Data Points',
  type: 'group',
  children: [
    {
      id: 'product master',
      title: 'Product Master',
      type: 'item',
      url: '/Admin/AddProduct',
      icon: icons.IconFileStack,
      breadcrumbs: false
    },
    {
      id: 'field master',
      title: 'Field Master',
      type: 'item',
      url: '/Admin/AddDP',
      icon: icons.IconSubtask,
      breadcrumbs: false
    },
    {
      id: 'access management',
      title: 'Access Management',
      type: 'item',
      url: '/Admin/AccessManagement',
      icon: icons.IconPlaylistAdd,
      breadcrumbs: false
    },
    {
      id: 'Manage group',
      title: 'Manage Group',
      type: 'item',
      url: '/Admin/CreateGroup',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
    {
      id: 'View groups',
      title: 'View Groups',
      type: 'item',
      url: '/Admin/ViewGroup',
      icon: icons.IconUserSearch,
      breadcrumbs: false
    },
    {
      id: 'View add points',
      title: 'View MDM',
      type: 'item',
      url: '/Admin/ViewDatapoints',
      icon: icons.IconDatabase,
      breadcrumbs: false
    },

  ]
};

export default AdminUtils;
