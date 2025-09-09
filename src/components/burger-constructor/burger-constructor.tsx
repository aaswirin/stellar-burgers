import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectBurger } from '../../slices/burger';
import { selectNewOrder, selectOrderRequest } from '../../slices/order';
import { formatPrice } from '../../utils/functions';

export const BurgerConstructor: FC = () => {
  /** Взять переменные constructorItems, orderRequest и orderModalData из stor'а */
  const constructorItems = useSelector(selectBurger);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectNewOrder).order;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

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
