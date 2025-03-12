import React from "react";

const Header = () => {
  return (
    <div className="bg-white pb-4">
      <div className="container mx-auto px-4 py-2 text-center">
        <p className="text-[#097FF5] text-xl lg:text-3xl font-saira font-bold">
          Informasi Jam Layanan Pengaduan : <span className="font-saira font-bold">08.00 - 15.00 WIB</span>
        </p>
        <p className="text-[#097FF5] text-xl lg:text-3xl font-saira font-bold">
          Layanan Contact Center : <span className="font-saira font-bold">08.00 - 17.00 WIB</span>
        </p>
      </div>
      <div className="border-b-8 border-[#097FF5] shadow-2xl"></div>
    </div>
  );
};

export default Header;
