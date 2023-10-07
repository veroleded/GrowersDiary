import React from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store/StoreProvider';

const Header = () => {
  const { authStore } = useAppStore();

  return (
    <header className='header'>
      <div className='header-inner'>
        <div>
          <img src='./weed.svg' alt='logo' className='logo' />
        </div>
        {authStore.isAuth ? (
          <>
            <Link to={'strains'}>Сорты</Link>
            <Link to={'diaries'}>Дневники</Link>
            <button onClick={() => authStore.logout()}>Выйти</button>
          </>
        ) : (
          <Link to={'auth'}>Войти</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
