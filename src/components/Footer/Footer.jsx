import { Link } from "react-router-dom";
import image from "../../assets/image_brand.webp";

const Footer = () => {
  return (
    <footer className="bg-white shadow dark:bg-black w-full mt-auto"> {/* Cambié self-end y justify-self-end a mt-auto */}
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:justify-between">
          <div className="flex items-center justify-center md:justify-start mb-4 md:mb-0">
            <Link to="/index" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={image} className="h-20 w-20 rounded-full" alt="Flowbite Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Usa2 Shop
              </span>
            </Link>
          </div>
          <div className="flex items-center justify-center md:justify-end mb-4 md:mb-0 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
            ¡Explora, descubre y reinventa tu estilo! Encuentra piezas únicas en nuestra tienda online de ropa de segunda mano.
          </div>
        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 text-center dark:text-gray-400">
          © 2024{" "}
          <a href="/index" className="hover:underline">
            Usa2 Shop™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
