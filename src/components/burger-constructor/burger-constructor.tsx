import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { deleteBurger, selectBurger } from '../../slices/burger';
import orderSlice, {
  selectNewOrder,
  selectOrderRequest,
  sendBurger
} from '../../slices/order';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectUser } from '../../slices/user';

export const BurgerConstructor: FC = () => {
  /** Взять переменные constructorItems, orderRequest и orderModalData из stor'а */
  const constructorItems = useSelector(selectBurger);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectNewOrder).order;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(selectUser);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      return navigate('/login', {
        replace: true,
        state: {
          from: {
            ...location,
            background: location.state?.background,
            state: null
          }
        }
      });
    } else {
      const from = location.state?.from || { pathname: '/' };
      const backgroundLocation = location.state?.from?.background || null;

      const itemsId = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id),
        constructorItems.bun._id
      ];

      dispatch(sendBurger(itemsId)).then(() => dispatch(deleteBurger()));
      return navigate(from, {
        replace: true,
        state: { background: backgroundLocation }
      });
    }
  };

  const closeOrderModal = () => dispatch(orderSlice.actions.setNewOrder(false));

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
