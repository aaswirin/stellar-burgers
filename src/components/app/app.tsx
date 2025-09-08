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
import { Route, Routes } from 'react-router-dom';

const App = () => (
  <div className={styles.app}>
    <AppHeader />

    <Routes>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      <Route
        path='/login'
        element={
          <ProtectedRoute authorized={false}>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path='/register'
        element={
          <ProtectedRoute authorized={false}>
            <Register />
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
        path='/profile'
        element={
          <ProtectedRoute authorized>
            <Profile />
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

      <Route path='*' element={<NotFound404 />} />

      <Route
        path='/feed/:number'
        element={
          <Modal title={'Заголовок'} onClose={() => console.log(1)}>
            <OrderInfo />
          </Modal>
        }
      />
      <Route
        path='/ingredients/:id'
        element={
          <Modal title={'Заголовок'} onClose={() => console.log(2)}>
            <IngredientDetails />
          </Modal>
        }
      />
      <Route
        path='/profile/orders/:number'
        element={
          <Modal title={'Заголовок'} onClose={() => console.log(1)}>
            <OrderInfo />
          </Modal>
        }
      />
    </Routes>
  </div>
);

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
