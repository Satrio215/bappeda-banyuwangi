import { useState } from "react";
import { Link } from "@inertiajs/react";
import { Menu, X } from "lucide-react";
import Dropdown from "./Dropdown";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

export default function Navbar({ user }) {
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
        <div className="hidden lg:flex gap-4">
          {user ? (
            <Dropdown>
              <Dropdown.Trigger>
                <span className="inline-flex rounded-md">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border-2 border-light-blue-active px-3 py-2 text-sm font-medium leading-4 text-white transition duration-150 ease-in-out hover:bg-light-blue-active hover:text-dark-blue-active focus:outline-none"
                  >
                    {user.name}
                    <svg
                      className="-me-0.5 ms-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              </Dropdown.Trigger>
              <Dropdown.Content>
                <Dropdown.Link href={route("logoutBuyer")} method="post" as="button">
                  Log Out
                </Dropdown.Link>
              </Dropdown.Content>
            </Dropdown>
          ) : (
            <>
              <Link href="/login-pengguna">
                <SecondaryButton className="font-bold bg-transparent text-white hover:bg-normal-blue-active">
                  Log In
                </SecondaryButton>
              </Link>
              <Link href="/register-pengguna">
                <PrimaryButton className="font-bold bg-normal-blue-active hover:bg-transparent hover:border-normal-blue-active">
                  Gabung
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
              <button
                onClick={() => route("logoutBuyer")}
                className="px-4 py-2 text-red-500 hover:bg-gray-100"
              >
                Log Out
              </button>
            ) : (
              <>
                <Link href="/login-pengguna" className="px-4 py-2 text-blue-500 hover:bg-gray-100">Log In</Link>
                <Link href="/register-pengguna" className="px-4 py-2 text-blue-500 hover:bg-gray-100">Gabung</Link>
              </>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}
