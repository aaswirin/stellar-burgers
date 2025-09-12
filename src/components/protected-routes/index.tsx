import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectUser } from '../../slices/user';
import { Preloader } from '@ui';
import { selectIsChecked } from '../../slices/user';

interface ProtectedRouteProps {
  authorized: boolean;
  children: ReactNode;
}

export const ProtectedRoute = ({
  authorized,
  children
}: ProtectedRouteProps) => {
  const user = useSelector(selectUser);
  const isChecked = useSelector(selectIsChecked);
  const location = useLocation();

  if (!isChecked) return <Preloader />;

  if (authorized) {
    if (user) return <>{children}</>;
    return (
      <Navigate
        to='/login'
        state={{
          from: {
            ...location,
            background: location.state?.background,
            state: null
          }
        }}
        replace
      />
    );
  } else {
    const backgroundLocation = location.state?.from?.background || null;
    const from = location.state?.from || { pathname: '/' };

    if (!user) return children;

    return (
      <Navigate replace to={from} state={{ background: backgroundLocation }} />
    );
  }
};
