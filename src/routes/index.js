import { useRoutes } from 'react-router-dom';

// routes
import AuthenticationRoutes from './AuthenticationRoutes';
import AdminRoute from './AdminRoute';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([ AuthenticationRoutes,AdminRoute]);
}
