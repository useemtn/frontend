import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <main class="h-screen w-full flex flex-col justify-center items-center bg-white">
      <h1 class="text-9xl font-extrabold text-black tracking-widest">404</h1>
      <div class="bg-purple-500 px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button class="mt-5">
        <a class="relative inline-block text-sm font-medium text-purple-500 group active:text-purple-500 focus:outline-none focus:ring">
          <span class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-purple-500 group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span class="relative block px-8 py-3 bg-[#1A2238] border border-current">
            <Link to="/">Volver a Inicio</Link>
          </span>
        </a>
      </button>
    </main>
  );
};

export default NotFound;