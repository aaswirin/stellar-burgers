import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectIsLoading, selectUser } from '../../slices/profile';
import { Preloader } from '@ui';

interface ProtectedRouteProps {
  authorized: boolean;
  children: ReactNode;
}

export const ProtectedRoute = ({
  authorized,
  children
}: ProtectedRouteProps) => {
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);

  if (isLoading) return <Preloader />;

  if (authorized && !user) {
    return <Navigate to='/login' />;
  }
  if (!authorized && user) {
    return <Navigate replace to='/profile' />;
  }

  return <>{children}</>;
};
