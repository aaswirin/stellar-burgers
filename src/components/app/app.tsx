/**
 * Приложение
 **/

import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../protected-routes';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { getApiIngredients, selectIngredients } from '../../slices/ingredients';
import { useEffect } from 'react';
import { checkUser, setIsChecked } from '../../slices/user';

const App = () => {
  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();
  const ingredients: TIngredient[] = useSelector(selectIngredients);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getApiIngredients());
    }
  }, [dispatch, ingredients.length]);

  useEffect(() => {
    dispatch(checkUser()).finally(() => dispatch(setIsChecked(true)));
  }, [dispatch]);

  const onCloseModal = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      {/* Заголовок */}
      <AppHeader />
      {/* Маршруты */}
      <Routes location={background || location}>
        {/* Конструктор бургера */}
        <Route path='/' element={<ConstructorPage />} />
        {/* Лента заказов */}
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/register'
          element={
            <ProtectedRoute authorized={false}>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/login'
          element={
            <ProtectedRoute authorized={false}>
              <Login />
            </ProtectedRoute>
          }
        />
        {/* Всё про пользователя */}
        <Route
          path='/profile'
          element={
            <ProtectedRoute authorized>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute authorized={false}>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute authorized={false}>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute authorized>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        {/* Открытие страницы по прямой ссылке */}
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute authorized>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Маршруты для модальных окон */}
      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title={''} onClose={onCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />

          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={onCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />

          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute authorized>
                <Modal title={''} onClose={onCloseModal}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;

/*
Шаг 1. Роутинг
Установите библиотеку react-router-dom и в компоненте app.tsx сделайте настройку:
по роуту / расположите компонент ConstructorPage;
по роуту /feed расположите компонент Feed;
по защищённому роуту /login расположите компонент Login;
по защищённому роуту /register расположите компонент Register;
по защищённому роуту /forgot-password расположите компонент ForgotPassword;
по защищённому роуту /reset-password расположите компонент ResetPassword;
по защищённому роуту /profile расположите компонент Profile;
по защищённому роуту /profile/orders расположите компонент ProfileOrders;
по роуту * расположите компонент NotFound404 .
Также нужно добавить модалки с дополнительной информацией:
по роуту /feed/:number расположите компонент Modal с компонентом OrderInfo;
по роуту /ingredients/:id расположите компонент Modal с компонентом IngredientDetails;
по защищённому роуту /profile/orders/:number расположите компонент Modal с компонентом OrderInfo .
 */
