import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Cari({ no_tiket, status }) {
    const [ticketNumber, setTicketNumber] = useState(no_tiket || "");

    useEffect(() => {
        if (!no_tiket) return; // Cegah Swal jika belum ada pencarian

        if (status === "Tiket tidak ditemukan") {
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Tiket tidak ditemukan.",
            });
        } else if (status) {
            let warna = "info";
            let pesan = "";

            if (status === "gagal") {
                warna = "error";
                pesan = "Pengaduan Gagal";
            } else if (status === "diterima") {
                warna = "success";
                pesan = "Pengaduan Diterima";
            } else if (status === "selesai") {
                warna = "info";
                pesan = "Pengaduan Terselesaikan";
            } else if (status === "proses") {
                warna = "warning";
                pesan = "Pengaduan Sedang Diproses";
            } else {
                pesan = `Status: ${status}`;
            }

            Swal.fire({
                icon: warna,
                title: "Status Pengaduan Ditemukan!",
                html: `Status Pengaduan Anda: <strong>${pesan}</strong>`,
            });
        }
    }, [status, no_tiket]);

    const handleSearch = (e) => {
        e.preventDefault();

        if (!ticketNumber.trim()) {
            Swal.fire({
                icon: "warning",
                title: "No Tiket kosong",
                text: "Harap isi No Tiket terlebih dahulu.",
            });
            return;
        }

        router.get(route("cari.tiket"), { no_tiket: ticketNumber });
    };

    return (
        <div className="px-2 md:px-8 xl:px-16 pt-8 xl:pt-16 pb-8 xl:pb-16">
            <div className="flex justify-center">
                <label className="text-2xl lg:text-4xl font-bold font-saira text-center text-[#097FF5]">
                    Cek Status Pengaduan
                </label>
            </div>

            <div className="flex justify-center items-center pt-8 xl:pt-16">
                <div className="bg-[#097FF5] p-6 md:p-8 rounded-[30px] lg:rounded-[50px] shadow-lg w-full text-center">
                    <p className="text-white font-saira font-bold mb-4 text-md md:text-lg lg:text-xl">
                        Periksa status umpan balik atau saran yang sebelumnya
                        telah dibuat.
                    </p>

                    <form
                        onSubmit={handleSearch}
                        className="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full justify-center"
                    >
                        <input
                            type="text"
                            placeholder="No Urut Tiket Pengadu"
                            value={ticketNumber}
                            onChange={(e) => setTicketNumber(e.target.value)}
                            className="bg-white text-gray-600 p-3 rounded-full w-full max-w-[200px] md:max-w-none flex-1 focus:outline-none font-saira text-center"
                        />
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold font-saira w-full md:w-auto"
                        >
                            Periksa
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
