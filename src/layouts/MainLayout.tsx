import React, {ReactNode} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdminPanel from '../features/admin/components/AdminPanel';

interface MainLayoutProps {children: ReactNode;}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        {children}
      </main>
      <Footer />
      <AdminPanel />
    </div>
  );
};

export default MainLayout;