import { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAppStore } from '../../store/StoreProvider';

type Props = {
  formType: 'login' | 'registration';
};

const validationSchema = Yup.object().shape({
  email: Yup.string().trim().email('Недопустимый формат email').required('Обязательное поле'),
  name: Yup.string().min(6, 'Минимум 2 символа').max(25, 'Максимум 32 символа').default('Гровер'),
  password: Yup.string()
    .min(2, 'минимум 6 символов')
    .max(32, 'Максимум 32 символа')
    .required('Поле обязательно'),
});

const AuthForm: FC<Props> = observer(({ formType }) => {
  const { authStore } = useAppStore();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authStore.isAuth) {
      navigate('/diaries');
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async ({ email, password, name }) => {
      if (formType === 'login') {
        await authStore.login(email, password);
        if (authStore.isAuth) {
          setError(null);
          navigate('/diaries');
        } else {
          setError('Неверный логин или пароль');
        }
      } else {
        await authStore.registration(email, name, password);
        if (authStore.isAuth) {
          setError(null);
          navigate('/diaries');
        } else {
          setError('Пользователь с таким email уже зарегистрирован');
        }
      }
    },
  });

  const nameInput = (
    <div className='auth-form-input'>
      <label htmlFor='name'>Имя</label>{' '}
      <input type='text' id='name' name='name' onChange={formik.handleChange} value={formik.values.name} />
      {formik.errors.name ? <div>{formik.errors.name}</div> : null}
    </div>
  );

  const errorEl = <div>{error}</div>;

  return (
      <form onSubmit={formik.handleSubmit} className='auth'>
        <div className='auth-form-input'>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            id='email'
            name='email'
            placeholder=''
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email ? <div>{formik.errors.email}</div> : null}
        </div>
        {formType === 'registration' ? nameInput : null}
        <div className='auth-form-input'>
          <label htmlFor='password'>Пароль</label>
          <input
            id='password'
            name='password'
            type='password'
            placeholder=''
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password ? <div>{formik.errors.password}</div> : null}
        </div>
        <button type='submit'>{formType === 'login' ? 'Войти' : 'Зарегистрироваться'}</button>
        {error ? errorEl : null}
      </form>
  );
});

export default AuthForm;
