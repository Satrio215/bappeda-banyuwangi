import React from "react";

const Landing = () => {
  return (
    <div className="px-4">
    <div className="flex flex-col lg:flex-row items-center justify-between bg-[url('/asset/layanan.png')] bg-cover rounded-3xl p-6 lg:p-10 px-6 lg:px-10 shadow-lg max-w-fit mx-auto my-10">
      <div className="w-full lg:w-1/2">
        <img
          src="/asset/kantor.png"
          alt="BAPPEDA"
          className="rounded-3xl w-full h-auto shadow-md"
        />
      </div>

      <div className="w-full lg:w-1/2 text-white text-center lg:text-left mt-6 lg:mt-0 px-6">
        <h2 className="text-2xl lg:text-5xl font-extrabold mb-4 lg:mb-6 font-saira">
          Layanan Informasi dan Pengaduan
        </h2>
        <p className="text-base mb-6 font-saira">
          Kantor Badan Perencanaan Pembangunan Daerah (BAPPEDA) Kabupaten Banyuwangi
        </p>
        <button type="button" className="bg-white text-blue-600 font-bold py-2 px-4 lg:px-6 rounded-full shadow-md hover:bg-gray-200 transition font-saira text-sm">
            Laporkan Pengaduan
        </button>
      </div>
    </div>
    </div>
  );
};

export default Landing;
