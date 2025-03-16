import { useState } from "react";
import { Link } from "@inertiajs/react";
import { Menu, X } from "lucide-react";
import { usePage } from "@inertiajs/react";
import Dropdown from "./Dropdown";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

export default function Navbar() {
    const user = usePage().props.user;
    console.log( user );
    const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="px-2 md:px-8 xl:px-16">
      <nav className="relative bg-[url('/asset/bg.png')] from-blue-500 to-blue-400 p-4 rounded-full flex justify-between items-center shadow-lg">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/asset/logo.png" alt="Logo Bappeda" className="h-10" />
        </div>

        {/* Menu untuk layar besar */}
        <div className="hidden md:flex space-x-6 text-white font-medium">
          <Link href={route("beranda")} className="hover:font-semibold">Beranda</Link>
          <a href="#" className="hover:font-semibold">Tata Cara Pengaduan</a>
          <Link href={route("status")} className="hover:font-semibold">Cek Status</Link>
        </div>

        {/* Profil User & Dropdown untuk layar besar */}
        <div className="hidden lg:flex gap-4 items-center">
          {user ? (
            <div className="text-white font-medium">Hi, {user.name}</div>
          ) : (
            <>
              <Link href="/login-pengguna">
                <SecondaryButton className="font-bold bg-transparent text-white hover:bg-normal-blue-active">
                  Log In
                </SecondaryButton>
              </Link>
              <Link href="/register-pengguna">
                <PrimaryButton className="font-bold bg-normal-blue-active hover:bg-transparent hover:border-normal-blue-active">
                  Register
                </PrimaryButton>
              </Link>
            </>
          )}
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
            <Link href={route("beranda")} className="px-4 py-2 hover:bg-gray-100">Beranda</Link>
            <a href="#" className="px-4 py-2 hover:bg-gray-100">Tata Cara Pengaduan</a>
            <Link href={route("status")} className="px-4 py-2 hover:bg-gray-100">Cek Status</Link>
            <div className="border-t my-2"></div>
            {user ? (
              <div className="px-4 py-2 text-gray-800 font-medium">Hi, {user.name}</div>
            ) : (
              <>
                <Link href="/login-pengguna" className="px-4 py-2 text-blue-500 hover:bg-gray-100">Log In</Link>
                <Link href="/register-pengguna" className="px-4 py-2 text-blue-500 hover:bg-gray-100">Register</Link>
              </>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}
