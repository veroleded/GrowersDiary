import React, { useState } from 'react';
import AuthForm from './AuthForm';
import classNames from 'classnames';

const Auth = () => {
  const [authType, setAuthType] = useState<'login' | 'registration'>('registration');

  const slideBtnHandler = (authType: 'login' | 'registration') => () => {
    setAuthType(authType);
  };

  return (
    <div className='container'>
      <div className='auth-inner'>
        <div className='slogan'>
          <span>Веди свой</span>
          <span>дневник</span>
          <span>выращивания</span>
        </div>
        <div className='form-container'>
          <div className='form-btn-group'>
            <button
              className={classNames('btn-slide', { 'active-btn': authType === 'registration' })}
              onClick={slideBtnHandler('registration')}>
              Регистрация
            </button>
            <button
              className={classNames('btn-slide', { 'active-btn': authType === 'login' })}
              onClick={slideBtnHandler('login')}>
              Войти
            </button>
          </div>
          <AuthForm formType={authType} />
        </div>
      </div>
    </div>
  );
};

export default Auth;
