// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Services',
  caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Services',
      type: 'collapse',
      icon: icons.IconKey,
    }
  ]
};

export default pages;
