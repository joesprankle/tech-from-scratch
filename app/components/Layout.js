'use  client';
import Navbar from './Navbar';

import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-bg">
      <div className="flex flex-1">
   
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;