import React from 'react';
import { IStrain } from '../models/IStrain';

type Props = {
  strain: IStrain;
};

const StrainInfo = ({ strain }: Props) => {
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
      </div>
    </div>
  );
};

export default StrainInfo;
