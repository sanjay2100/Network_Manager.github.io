// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill, IconBuildingBank, IconWallet,IconFileCertificate } from '@tabler/icons';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconBuildingBank,
  IconWallet,
  IconFileCertificate
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'My Account (Payout Detaild)',
  type: 'group',
  children: [
    {
      id: 'util-color',
      title: 'Savings A/C',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconBuildingBank,
      breadcrumbs: false
    },
    {
      id: 'util-typography',
      title: 'Wallet',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconWallet,
      breadcrumbs: false
    },
    {
      id: 'util-shadow',
      title: 'Add New',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconBuildingBank,
      breadcrumbs: false
    },
    {
      id: 'util-service',
      title: 'Request Services',
      type: 'item',
      url: '/dashboard/servicerequest',
      icon: icons.IconFileCertificate,
      breadcrumbs: false
    },
    {
      id: 'icons',
      title: 'Icons',
      type: 'collapse',
      icon: icons.IconWindmill,
      children: [
        {
          id: 'tabler-icons',
          title: 'Tabler Icons',
          type: 'item',
          url: '/dashboard/default',
          breadcrumbs: false
        },
        {
          id: 'material-icons',
          title: 'Material Icons',
          type: 'item',
          external: true,
          target: '_blank',
          url: '/dashboard/default',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default utilities;
