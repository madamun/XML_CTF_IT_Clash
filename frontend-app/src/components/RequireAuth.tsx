import { Navigate } from 'react-router-dom';

type RequireAuthProps ={
  children?: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;