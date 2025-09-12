import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getUserOrders,
  selectNewOrder,
  selectUserOrders
} from '../../slices/order';
import { selectUser } from '../../slices/user';

export const ProfileOrders: FC = () => {
  /** взять переменную из stor'а */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectUserOrders);
  const user = useSelector(selectUser);
  const newOrder = useSelector(selectNewOrder);

  useEffect(() => {
    if (user) {
      dispatch(getUserOrders());
    }
  }, [dispatch, user, newOrder]);

  return <ProfileOrdersUI orders={orders} />;
};
