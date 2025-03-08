import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="px-4">
    <nav className="relative bg-[url('/asset/bg.png')] from-blue-500 to-blue-400 p-4 rounded-full flex justify-between items-center shadow-lg">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="/asset/logo.png" alt="Logo Bappeda" className="h-10" />
      </div>

      {/* Menu untuk layar besar */}
      <div className="hidden md:flex space-x-6 text-white font-medium">
        <a href="#" className="hover:font-semibold">Beranda</a>
        <a href="#" className="hover:font-semibold">Tata Cara Pengaduan</a>
        <a href="#" className="hover:font-semibold">Cek Status</a>
      </div>

      {/* Profil User untuk layar besar */}
      <div className="hidden md:flex items-center text-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white text-blue-500 flex items-center justify-center rounded-full">
            <span className="font-bold">👤</span>
          </div>
          <span>Hi, Regga Ananda</span>
        </div>
      </div>

      {/* Menu untuk layar kecil */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Dropdown menu untuk layar kecil */}
      {isOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg w-48 py-2 flex flex-col md:hidden z-10">
          <a href="#" className="px-4 py-2 hover:bg-gray-100">Beranda</a>
          <a href="#" className="px-4 py-2 hover:bg-gray-100">Tata Cara Pengaduan</a>
          <a href="#" className="px-4 py-2 hover:bg-gray-100">Cek Status</a>
          <div className="border-t my-2"></div>
          <div className="px-4 py-2 text-gray-700 flex items-center">
            <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full mr-2">
              <span className="font-bold">👤</span>
            </div>
            <span>Hi, Regga Ananda</span>
          </div>
        </div>
      )}
    </nav>
    </div>
  );
}
