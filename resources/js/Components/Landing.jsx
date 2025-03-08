import React from "react";

const Landing = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between bg-gradient-to-r from-blue-500 to-blue-400 rounded-3xl p-6 lg:p-10 shadow-lg max-w-5xl mx-auto my-10">
      <div className="w-full lg:w-1/2">
        <img
          src="/asset/bappeda.png" // Sesuaikan path gambarnya
          alt="BAPPEDA"
          className="rounded-3xl w-full h-auto shadow-md"
        />
      </div>

      {/* Bagian Teks */}
      <div className="w-full lg:w-1/2 text-white text-center lg:text-left mt-6 lg:mt-0 px-4">
        <h2 className="text-2xl lg:text-4xl font-bold mb-4">
          Layanan Informasi dan Pengaduan
        </h2>
        <p className="text-sm lg:text-base mb-6">
          Kantor Badan Perencanaan Pembangunan Daerah (BAPPEDA) Kabupaten Banyuwangi
        </p>
        <a
          href="#"
          className="bg-white text-blue-600 font-bold py-2 px-4 lg:px-6 rounded-full shadow-md hover:bg-gray-200 transition"
        >
          Laporkan Pengaduan
        </a>
      </div>
    </div>
  );
};

export default Landing;
