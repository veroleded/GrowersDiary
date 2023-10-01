import { ReactNode, createContext, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import AuthStore from './AuthStore';
import StrainStore from './StrainStore';

interface IStore {
  authStore: AuthStore;
  strainStore: StrainStore;
}

const store = {
  authStore: new AuthStore(),
  strainStore: new StrainStore(),
};

const Context = createContext<IStore>(store);

type Props = {
  children: ReactNode;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppStore = () => {
  const store = useContext(Context);
  if (!store) throw new Error('Use App store within provider!');
  return store;
};

export const AppStoreProvider = observer(({ children }: Props) => {
  return <Context.Provider value={store}>{children}</Context.Provider>;
});

