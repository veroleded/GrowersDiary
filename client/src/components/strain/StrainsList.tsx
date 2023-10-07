import { useEffect, useState } from 'react';
import { useAppStore } from '../../store/StoreProvider';
import { observer } from 'mobx-react-lite';
import AddStrainForm from './AddStrainForm';
import StrainInfo from './StrainInfo';

const StrainList = observer(() => {
  const { strainStore } = useAppStore();
  const [info, setInfo] = useState<number | null>(null);


  useEffect(() => {
    strainStore.getStrains();
  }, [strainStore]);

  const openInfoHundler = (id: number) => {
    if (info === id) {
      setInfo(null);
    } else {
      setInfo(id);
    }
  };

  return (
    <div className='asd'>
      <AddStrainForm />
      {strainStore.isLoading ? (
        <div>Загрузка...</div>
      ) : (
        strainStore.strains.map((strain) => (
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
