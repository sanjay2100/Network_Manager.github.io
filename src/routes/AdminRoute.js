import { lazy } from 'react';

// project imports
// import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AdminLayout from 'layout/AdminLayout';
// import CreateGroup from 'views/utilities/CreateGroup';
// import AccessManagement from 'views/utilities/AccessManagement';
//  import MoneyTransfer from 'views/utilities/MoneyTransfer';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/AdminDashboard/Default')));

// utilities routing
const UtilsAccessManagement = Loadable(lazy(() => import('views/utilities/AccessManagement')));
const UtilsCreateGroup = Loadable(lazy(() => import('views/utilities/CreateGroup')));
const ViewGroup = Loadable(lazy(() => import('views/utilities/Components/ViewGroup')));
const UtilsAddDataPoints = Loadable(lazy(() => import('views/utilities/DataPoints')));
const ViewDatapoints = Loadable(lazy(() => import('views/utilities/ViewAddPoints')));
const UtilsProductMaster = Loadable(lazy(() => import('views/utilities/ProductMaster')));

const UtilsAddProduct = Loadable(lazy(() => import('views/utilities/AddProduct')));

// const UtilsMoneyTransfer=Loadable(lazy(() => import('views/utilities/PopularServices')));

// sample page routing

// ==============================|| MAIN ROUTING ||============================== //

const AdminRoute = {
  path: '/',
  element: <AdminLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },

    {
      path: 'Admin',
      children: [
        {
          path: 'AddDP',
          element: <UtilsAddDataPoints />,
          breadcrumbs: true
        }
      ]
    },
    {
      path: 'Admin',
      children: [
        {
          path: 'ProductMaster',
          element: <UtilsProductMaster />,
          breadcrumbs: true
        }
      ]
    },
    {
      path: 'Admin',
      children: [
        {
          path: 'AddProduct',
          element: <UtilsAddProduct />,
          breadcrumbs: true
        }
      ]
    },

    {
      path: 'Admin',
      children: [
        {
          path: 'AccessManagement',
          element: <UtilsAccessManagement />,
          breadcrumbs: true
        }
      ]
    },

    {
      path: 'Admin',
      children: [
        {
          path: 'CreateGroup',
          element: <UtilsCreateGroup />,
          breadcrumbs: true
        }
      ]
    },
    {
      path: 'Admin',
      children: [
        {
          path: 'ViewGroup',
          element: <ViewGroup />,
          breadcrumbs: true
        }
      ]
    },
    {
      path: 'Admin',
      children: [
        {
          path: 'ViewDatapoints',
          element: <ViewDatapoints />,
          breadcrumbs: true
        }
      ]
    }
  ]
};

export default AdminRoute;
