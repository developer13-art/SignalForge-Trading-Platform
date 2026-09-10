import { useAuthStore } from '../stores/auth.store';
import { authService } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useAuth() {
  const { user, isAuthenticated, accessToken, setAuth, logout } = useAuthStore();
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    setAuth(response.user, response.accessToken, response.refreshToken);
    return response;
  };

  const register = async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    referralCode?: string;
  }) => {
    const response = await authService.register(data);
    setAuth(response.user, response.accessToken, response.refreshToken);
    return response;
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } finally {
      logout();
      navigate('/login');
      toast.success('Logged out');
    }
  };

  return {
    user,
    isAuthenticated,
    accessToken,
    login,
    register,
    logout: handleLogout,
  };
}