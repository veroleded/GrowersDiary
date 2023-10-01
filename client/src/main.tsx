import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AppStoreProvider } from './store/StoreProvider.tsx';

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <AppStoreProvider>
    <App />
  </AppStoreProvider>,
);
