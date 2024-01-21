import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/SignIn')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3')));
// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <AuthRegister3 />

    },
    {
      path: '/Login',
      element: <AuthLogin3 />
    },
   
  ]
};

export default AuthenticationRoutes;
