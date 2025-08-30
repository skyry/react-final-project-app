import {createRoot} from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.tsx'

// Глобальна обробка помилок
window.addEventListener('error', (event) => {
  // Ігноруємо помилки від Chrome розширень
  if (event.filename && event.filename.includes('chrome-extension://')) {
    event.preventDefault();
    return;
  }
  console.error('Global error:', event.error);
});

// Обробка необроблених Promise помилок
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(<App />);
} else {
  console.error('Root element not found');
}