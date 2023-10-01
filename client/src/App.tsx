import { useEffect, useState } from 'react';
import './App.css';
import AuthForm from './components/AuthForm';
import { observer } from 'mobx-react-lite';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { IUser } from './models/IUser';
import UserService from './services/UserService';
import { useAppStore } from './store/StoreProvider';
import StrainList from './components/StrainsList';

const App = observer(() => {
  const { authStore } = useAppStore();
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      authStore.checkAuth();
    }
  }, [authStore]);

  const getUsers = async () => {
    const response = await UserService.fetchUsers();
    setUsers(response.data);
  };

  if (authStore.isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <BrowserRouter>
      <h1>{authStore.isAuth ? 'Пользователь авторизован' : 'Пользователь не авторизован'}</h1>
      <Routes>
        <Route path='login' element={<AuthForm formType='login' />} />
        <Route path='registration' element={<AuthForm formType='registration' />} />
        <Route path='main' element={<div>Главная</div>} />
        <Route path='profile' element={<div>Профиль</div>} />
        <Route path='strains' element={<StrainList />} />
      </Routes>
      <button onClick={() => getUsers()}>получить юзеров</button>
      {users.map((user) => (
        <div key={user.id}>{user.email}</div>
      ))}
      <button onClick={() => authStore.logout()}>Выйти</button>
    </BrowserRouter>
  );
});

export default App;
