import React, { useEffect, useState } from 'react';
import { useAppStore } from '../store/StoreProvider';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import AddStrainForm from './AddStrainForm';
import StrainInfo from './StrainInfo';

const StrainList = observer(() => {
  const { strainStore, authStore } = useAppStore();
  const navigate = useNavigate();
  const [info, setInfo] = useState<number | null>(null);

  useEffect(() => {
    console.log(authStore.isAuth);
    // if(!authStore.isAuth) {
    //   navigate('/login');
    // }
  }, []);

  useEffect(() => {
    strainStore.getStrains();
  }, []);

  const openInfoHundler = (id: number) => {
    if (info === id) {
      setInfo(null);
    }
    setInfo(id);
  };

  return (
    <div className='asd'>
      <AddStrainForm />
      {strainStore.isLoading ? (
        <div>Загрузка...</div>
      ) : (
        Object.values(strainStore.strains).map((strain) => (
          <div key={strain.id}>
            <button onClick={() => openInfoHundler(strain.id)}>{strain.name}</button>
            {info === strain.id ? <StrainInfo strain={strain} /> : null}
          </div>
          
        ))
      )}
    </div>
  );
});

export default StrainList;
