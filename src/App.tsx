import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './app/store';
import AppRouter from './routes/AppRouter';
import {checkAuthStatus} from './features/auth/model/authSlice';
import ErrorBoundary from './components/ErrorBoundary';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './shared/styles/global.css';

// Компонент для ініціалізації авторизації
const AuthInitializer: React.FC = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      store.dispatch(checkAuthStatus());
    }
  }, []);

  return (
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AuthInitializer />
    </Provider>
  );
};
export default App;