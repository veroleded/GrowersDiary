import './App.css';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { IUser } from './models/IUser';
import UserService from './services/UserService';
import { useAppStore } from './store/StoreProvider';
import StrainList from './components/strain/StrainsList';
import Header from './components/Header';
import Auth from './components/auth/Auth';

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
      {!authStore.isAuth ? (
        <Auth />
      ) : (
        <>
          <Header />
          <Routes>
            <Route path='auth' element={<Auth />} />
            <Route path='diaries' element={<div>Главная</div>} />
            <Route path='profile' element={<div>Профиль</div>} />
            <Route path='strains' element={<StrainList />} />
          </Routes>
          <button onClick={() => getUsers()}>получить юзеров</button>
          {users.map((user) => (
            <div key={user.id}>{user.email}</div>
          ))}
        </>
      )}
    </BrowserRouter>
  );
});

export default App;
