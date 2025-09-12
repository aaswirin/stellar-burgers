import { FC } from 'react';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../slices/ingredients';

export const IngredientDetails: FC = () => {
  /** взять переменную из stor'а */
  const idIngredient = String(Object.values(useParams()));
  const ingredientData = useSelector(selectIngredients).find(
    (ingredient) => ingredient._id === idIngredient
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
