import React from "react";

const Header = () => {
  return (
    <div className="bg-white pb-4">
      <div className="container mx-auto px-4 py-2 text-center">
        <p className="text-blue-600 text-xl sm:text-base font-bold">
          Informasi Jam Layanan Pengaduan: <span className="font-bold">08.00 - 15.00 WIB</span>
        </p>
        <p className="text-blue-600 text-xl sm:text-base font-bold">
          Layanan Contact Center: <span className="font-bold">08.00 - 17.00 WIB</span>
        </p>
      </div>
      <div className="border-b-4 border-blue-500"></div>
    </div>
  );
};

export default Header;
