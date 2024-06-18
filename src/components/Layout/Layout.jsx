// Importar los componentes necesarios
import React from "react";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
const MainLayout = ({ children }) => {
  return (
    <>
      {/* Contenido principal, children son los componentes que se renderizan dentro del layout */}
      <div className="min-h-screen m-0 overflow-x-hidden flex flex-col">
        <Header />
          <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
