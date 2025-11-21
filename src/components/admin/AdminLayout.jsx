import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export const AdminLayout = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  // Redirect if not authenticated or not admin
  if (!isAuthenticated) {
    return <Navigate to="/login-new" />;
  }
  
  if (!isAdmin()) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
};
