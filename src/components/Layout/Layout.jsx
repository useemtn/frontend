import React from 'react';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
const MainLayout = ({ children }) => {
  return (
    <>
      <div className='min-h-screen m-0 overflow-x-hidden'>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;