import { useEffect, useState } from 'react';
import './App.css';
import AuthForm from './components/AuthForm';
import { observer } from 'mobx-react-lite';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { IUser } from './models/IUser';
import UserService from './services/UserService';
import { AppStoreProvider, useAppStore } from './store/StoreProvider';

const App = observer(() => {
  const { store: { AuthStore } } = useAppStore();
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      AuthStore.checkAuth();
    }
  }, [AuthStore]);

  const getUsers = async () => {
    const responce = await UserService.fetchUsers();
    setUsers(responce.data);
  };

  if (AuthStore.isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <AppStoreProvider>
      <BrowserRouter>
        <h1>{AuthStore.isAuth ? 'Пользователь авторизован' : 'Пользователь не авторизован'}</h1>
        <Routes>
          <Route path='login' element={<AuthForm formType='login' />} />
          <Route path='registration' element={<AuthForm formType='registration' />} />
          <Route path='main' element={<div>Главная</div>} />
          <Route path='profile' element={<div>Профиль</div>} />
        </Routes>
        <button onClick={() => getUsers()}>получить юзеров</button>
        {users.map((user) => (
          <div key={user.id}>{user.email}</div>
        ))}
        <button onClick={() => AuthStore.logout()}>Выйти</button>
      </BrowserRouter>
    </AppStoreProvider>
  );
});

export default App;
