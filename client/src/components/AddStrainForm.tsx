import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppStore } from '../store/StoreProvider';
import { IStrain } from '../models/IStrain';
import { useEffect } from 'react';

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string(),
  type: Yup.number().required(),
  feminization: Yup.number().required(),
});

const AddStrainForm = () => {
  const { strainStore } = useAppStore();

  useEffect(() => {
    strainStore.deleteError('post')
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      type: null,
      description: '',
      feminization: null,
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async ({ name, description, type, feminization }) => {
      const validValue: IStrain = {
        name: name,
        description: description === '' ? null : description,
        type: type === 1 ? true : false,
        feminization: feminization === 1 ? true : false,
      };
      console.log(validValue);
      await strainStore.postStrain(validValue);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className='asd'>
      <label htmlFor='name'>Название</label>
      <input type='text' id='name' name='name' onChange={formik.handleChange} value={formik.values.name} />
      <label htmlFor='description'>Описание</label>
      <textarea
        id='description'
        name='description'
        onChange={formik.handleChange}
        value={formik.values.description}
      />
      <label htmlFor='type'>Тип</label>
      <div>
        <input type='radio' name='type' value={1} onChange={formik.handleChange} />
        Автоцветущий
        <input type='radio' name='type' value={0} onChange={formik.handleChange} />
        Фотопериодный
      </div>
      <label htmlFor='femenization'>Феменизированность</label>
      <div>
        <input type='radio' name='feminization' value={1} onChange={formik.handleChange} />
        Феменизированный
        <input type='radio' name='feminization' value={0} onChange={formik.handleChange} />
        Регулярный
      </div>

      <button type='submit'>Добавить</button>
      {strainStore.errors.post ? <div>Сорт уже существует</div> : null}
    </form>
  );
};

export default AddStrainForm;
