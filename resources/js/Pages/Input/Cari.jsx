import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";

export default function Cari({ no_tiket, status }) {
  const [ticketNumber, setTicketNumber] = useState(no_tiket || "");
  const [statusMessage, setStatusMessage] = useState(status || "Tiket tidak ditemukan");

  useEffect(() => {
    if (status) {
      setStatusMessage(status);
    }
  }, [status]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!ticketNumber.trim()) {
      alert("Harap isi No Tiket.");
      return;
    }

    router.get(route("cari.tiket"), { no_tiket: ticketNumber });
  };

  return (
    <div className="px-2 md:px-8 xl:px-16 pt-8 xl:pt-16">
      <div className="flex justify-center">
        <label className="text-2xl lg:text-4xl font-bold font-saira text-center text-[#097FF5]">
          Cek Status Pengaduan
        </label>
      </div>

      <div className="flex justify-center items-center pt-8 xl:pt-16">
        <div className="bg-[#097FF5] p-6 md:p-8 rounded-[30px] lg:rounded-[50px] shadow-lg w-full text-center">
          {/* Deskripsi */}
          <p className="text-white font-saira font-bold mb-4 text-md md:text-lg lg:text-xl">
            Periksa status umpan balik atau saran yang sebelumnya telah dibuat.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full justify-center"
          >
            {/* Input No Tiket */}
            <input
              type="text"
              placeholder="No Urut Tiket Pengadu"
              value={ticketNumber}
              onChange={(e) => setTicketNumber(e.target.value)}
              className="bg-white text-gray-600 p-3 rounded-full w-full max-w-[200px] md:max-w-none flex-1 focus:outline-none font-saira text-center"
            />

            {/* Tombol Periksa */}
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold font-saira w-full md:w-auto"
            >
              Periksa
            </button>
          </form>

          {/* Menampilkan Status */}
          <div className="mt-6 p-4 text-gray-800 rounded-lg shadow-md">
            <p className="font-semibold lg:text-xl">Status Pengaduan:</p>
            <p className="text-lg font-bold text-[#097FF5]">{statusMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
