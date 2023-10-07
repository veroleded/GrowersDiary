import React from 'react';
import { IStrainResponse } from '../../models/response/IStrainResponse';
import { useAppStore } from '../../store/StoreProvider';

type Props = {
  strain: IStrainResponse;
};

const StrainInfo = ({ strain }: Props) => {
  const { strainStore } = useAppStore();

  console.log(strain.type);
  return (
    <div>
      <p>{strain.name}</p>
      <p>{strain.description}</p>
      <div>
        <p>
          <span>{strain.type ? 'Автоцветущий' : 'Фотопериодный'}</span>
          {', '}
          <span>{strain.feminization ? 'Феменизированный' : 'Регулярный'}</span>
        </p>
        <button onClick={async () => await strainStore.delStrain(strain.id)}>Удалить</button>
      </div>
    </div>
  );
};

export default StrainInfo;
