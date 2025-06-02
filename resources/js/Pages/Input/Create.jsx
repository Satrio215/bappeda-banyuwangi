import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Create({ email }) {
    const { data, setData, post, reset, errors } = useForm({
        tipe: "",
        judul: "",
        uraian: "",
        tanggal: "",
        lokasi: "",
        keterangan: "",
        file_bukti: null,
        nama: "",
        sex: "",
        identitas: "",
        nomor: "",
        file_identitas: null,
        alamat: "",
        provinsi: "",
        kota: "",
        no_telp: "",
        email: email || "",
        status: "diterima",
    });

    useEffect(() => {
        setData("email", email || "");
    }, [email]);

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("inputs.store"), {
            onSuccess: (page) => {
                const successMessage =
                    page.props.flash?.success ||
                    "Aduan baru berhasil dibuat dan akan segera dibuat";
                const noTiket =
                    page.props.flash?.no_tiket ||
                    "Tidak ada tiket yang dikembalikan.";

                Swal.fire({
                    title: "Berhasil!",
                    html: `
                    <br>
                        ${successMessage}
                        <div style="
                            margin-top: 16px;
                            padding: 12px;
                            background-color: #FEF3C7;
                            border-left: 4px solid #D97706;
                            color: #92400E;
                        ">
                            <strong>Catatan:</strong> No Tiket harap disimpan.
                        </div>
                        <br>
                        <strong>No Tiket:</strong> <br>
                        ${noTiket}
                    `,
                    icon: "success",
                    confirmButtonText: "OK",
                });

                reset();
            },
            onError: (errors) => {
                console.log(errors);
                Swal.fire({
                    title: "Gagal!",
                    text: "Terjadi kesalahan saat mengirim formulir.",
                    icon: "error",
                    confirmButtonText: "Coba Lagi",
                });
            },
        });
    };

    return (
        <div id="create-section" className="px-2 md:px-8 xl:px-16 pb-8">
            <div className="flex justify-center items-center mx-auto bg-[#097FF5] p-6 rounded-t-[50px] lg:rounded-t-[70px] border-4 border-[#097FF5] px-6 shadow-[4px_8px_20px_-5px_gray]">
                <label className="text-xl lg:text-3xl font-bold font-saira text-center text-white">
                    Formulir Layanan Pengaduan
                </label>
            </div>

            <div className="mx-auto bg-white p-6 rounded-b-[50px] lg:rounded-b-[70px] border-4 border-[#097FF5] shadow-[4px_8px_20px_-5px_gray]">
                <form onSubmit={handleSubmit}>
                    {/* Pilih Klasifikasi */}
                    <div className="sm:px-10 lg:px-14">
                        {/* Pilih Klasifikasi Pengaduan */}
                        <div className="border px-4 lg:px-10 py-8 lg:py-10 rounded-lg shadow-xl">
                            <label className="block font-saira text-[#097FF5] font-bold text-xl lg:text-3xl pb-4">
                                Pilih Klasifikasi Pengaduan
                            </label>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                {[
                                    { value: "be", label: "Bidang Ekonomi" },
                                    {
                                        value: "bpp",
                                        label: "Bidang Perencanaan dan Pembangunan",
                                    },
                                    {
                                        value: "bkrp",
                                        label: "Bidang Kesejahteraan Rakyat dan Pemerintah",
                                    },
                                    {
                                        value: "bspl",
                                        label: "Bidang Sarana dan Prasarana Wilayah dan Lingkungan",
                                    },
                                    {
                                        value: "bppp",
                                        label: "Bidang Penelitian, Pengembangan, dan Pengendalian Evaluasi",
                                    },
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item.value}
                                        className={`flex items-center py-2 px-4 border rounded-md outline-dotted text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-saira font-bold w-full truncate
                    ${
                        data.tipe === item.value
                            ? "bg-[#FF9D00] text-white border-[#FF9D00]"
                            : "bg-white border-gray-300 text-[#097FF5]"
                    }`}
                                        onClick={() =>
                                            setData("tipe", item.value)
                                        }
                                    >
                                        <input
                                            type="checkbox"
                                            className="mr-2 accent-orange-500 rounded-full"
                                            checked={data.tipe === item.value}
                                            readOnly
                                        />
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                            {errors.tipe && (
                                <div className="text-red-500 text-sm mt-2">
                                    {errors.tipe}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pt-8">
                        <label className="block font-saira text-sm lg:text-lg">
                            Jika ada tanda "
                            <span className="text-red-500 font-bold text-xl lg:text-2xl">
                                *
                            </span>
                            " wajib untuk diisi, pastikan data sudah diisi
                            dengan benar
                        </label>
                    </div>

                    {/* Deskripsi Kejadian */}
                    <div className="mt-4 p-4 rounded-lg outline-dashed outline-[#097FF5] shadow-sm">
                        <label className="block font-saira text-[#097FF5] font-bold text-xl lg:text-3xl">
                            Deskripsi Kejadian
                        </label>
                        <label className="block font-saira font-medium text-md lg:text-2xl pt-4 lg:pt-6">
                            Judul Pengaduan *
                        </label>
                        <input
                            type="text"
                            className="w-full mt-2 p-2 border rounded-md border-[#097FF5] shadow-xl"
                            value={data.judul}
                            onChange={(e) => setData("judul", e.target.value)}
                        />
                        {errors.judul && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.judul}
                            </div>
                        )}

                        <label className="block font-saira font-medium text-md lg:text-2xl pt-2 lg:pt-4">
                            Uraian Pengaduan *
                        </label>
                        <textarea
                            className="w-full mt-2 p-2 border rounded-md border-[#097FF5] shadow-xl"
                            value={data.uraian}
                            onChange={(e) => setData("uraian", e.target.value)}
                        ></textarea>
                        {errors.uraian && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.uraian}
                            </div>
                        )}

                        <label className="block font-saira font-medium text-md lg:text-2xl pt-2 lg:pt-4">
                            Tanggal Kejadian *
                        </label>
                        <input
                            type="date"
                            className="mt-2 p-2 border rounded-md border-[#097FF5] shadow-xl w-1/2 md:w-1/3 lg:w-1/5"
                            value={data.tanggal}
                            onChange={(e) => setData("tanggal", e.target.value)}
                        />
                        {errors.tanggal && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.tanggal}
                            </div>
                        )}

                        <label className="block font-saira font-medium text-md lg:text-2xl pt-2 lg:pt-4">
                            Lokasi Kejadian *
                        </label>
                        <input
                            type="text"
                            className="w-full mt-2 p-2 border rounded-md border-[#097FF5] shadow-xl"
                            value={data.lokasi}
                            onChange={(e) => setData("lokasi", e.target.value)}
                        />
                        {errors.lokasi && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.lokasi}
                            </div>
                        )}
                    </div>
                    {/* Unggah Bukti */}
                    <div className="mt-4 p-4 rounded-lg outline-dashed outline-[#097FF5] shadow-sm pt-4">
                        <label className="block font-saira text-[#097FF5] font-bold text-xl lg:text-3xl">
                            Unggah Bukti Pendukung
                        </label>

                        {/* Input Keterangan */}
                        <label className="block font-saira font-medium text-md lg:text-2xl pt-4 lg:pt-6">
                            Keterangan *
                        </label>
                        <input
                            type="text"
                            className="w-full mt-2 p-2 border rounded-md border-[#097FF5] shadow-xl"
                            value={data.keterangan}
                            onChange={(e) =>
                                setData("keterangan", e.target.value)
                            }
                        />
                        {errors.keterangan && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.keterangan}
                            </div>
                        )}

                        {/* Input File Lampiran */}
                        <label className="block font-saira font-medium text-md lg:text-2xl pt-2 lg:pt-4 pb-2">
                            File Lampiran *
                        </label>
                        <div className="flex items-center border-2 border-[#097FF5] rounded-lg overflow-hidden shadow-md">
                            <label className="bg-[#097FF5] text-white px-6 lg:px-12 py-2 h-full font-semibold cursor-pointer whitespace-nowrap">
                                Pilih File...
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (!file) return;

                                        if (file.size > 2 * 1024 * 1024) {
                                            alert(
                                                "Ukuran file terlalu besar! Maksimal 2MB."
                                            );
                                            return;
                                        }

                                        const allowedTypes = [
                                            "image/jpeg",
                                            "image/png",
                                            "image/jpg",
                                        ];
                                        if (!allowedTypes.includes(file.type)) {
                                            alert(
                                                "Format file tidak didukung! Harap unggah file JPG atau PNG."
                                            );
                                            return;
                                        }

                                        setData("file_bukti", file);
                                    }}
                                />
                            </label>
                            <span className="px-4 py-2 text-gray-600 w-full truncate">
                                {data.file_bukti
                                    ? data.file_bukti.name
                                    : "Belum ada file dipilih"}
                            </span>
                        </div>
                        {errors.file_bukti && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.file_bukti}
                            </div>
                        )}

                        {/* Info Batasan File */}
                        <label className="block font-saira font-light text-sm lg:text-lg pt-2 lg:pt-4 pb-2">
                            Maksimum 2MB (JPG, JPEG, PNG)
                        </label>
                    </div>

                    {/* Data Pengadu */}
                    <div className="mt-4 p-6 rounded-lg outline-dashed outline-[#097FF5] shadow-sm">
                        <label className="block font-saira text-[#097FF5] font-bold text-xl lg:text-3xl mb-4">
                            Data Pengadu
                        </label>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-2">
                            <label className="block font-saira font-medium text-md lg:text-2xl pt-4 lg:pt-6">
                                Nama Pelapor *
                            </label>
                            <input
                                type="text"
                                className="md:col-span-2 w-full p-2 border border-[#097FF5] rounded-md shadow-md"
                                value={data.nama}
                                onChange={(e) =>
                                    setData("nama", e.target.value)
                                }
                            />
                        </div>
                        {errors.nama && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.nama}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-2">
                            <label className="block font-saira font-medium text-md lg:text-2xl pt-2 lg:pt-4">
                                Jenis Kelamin
                            </label>
                            <div className="md:col-span-2 flex gap-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="sex"
                                        value="pria"
                                        className="mr-2"
                                        onChange={(e) =>
                                            setData("sex", e.target.value)
                                        }
                                    />
                                    Pria
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="sex"
                                        value="wanita"
                                        className="mr-2"
                                        onChange={(e) =>
                                            setData("sex", e.target.value)
                                        }
                                    />
                                    Wanita
                                </label>
                            </div>
                        </div>
                        {errors.sex && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.sex}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-2">
                            <label className="block font-saira font-medium text-md lg:text-2xl pt-2 lg:pt-4">
                                Tipe Identitas *
                            </label>
                            <select
                                className="md:col-span-2 w-full p-2 border border-[#097FF5] rounded-md shadow-md"
                                value={data.identitas}
                                onChange={(e) =>
                                    setData("identitas", e.target.value)
                                }
                            >
                                <option value="">Pilih Tipe Identitas</option>
                                <option value="sim">SIM</option>
                                <option value="ktp">KTP</option>
                            </select>
                        </div>
                        {errors.identitas && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.identitas}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-2">
                            <label className="block font-saira font-medium text-md lg:text-2xl pt-2 lg:pt-4">
                                Nomor Identitas *
                            </label>
                            <input
                                type="text"
                                className="md:col-span-2 w-full p-2 border border-[#097FF5] rounded-md shadow-md"
                                value={data.nomor}
                                onChange={(e) =>
                                    setData("nomor", e.target.value)
                                }
                            />
                        </div>
                        {errors.nomor && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.nomor}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-2">
                            <label className="block font-saira font-medium text-md lg:text-2xl pt-2 lg:pt-4">
                                Unggah Identitas Pelapor *
                            </label>
                            <div className="flex items-center border-2 border-[#097FF5] rounded-lg overflow-hidden shadow-md">
                                <label className="bg-[#097FF5] text-white px-6 lg:px-12 py-2 h-full font-semibold cursor-pointer whitespace-nowrap">
                                    Pilih File...
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (!file) return;

                                            if (file.size > 2 * 1024 * 1024) {
                                                alert(
                                                    "Ukuran file terlalu besar! Maksimal 2MB."
                                                );
                                                return;
                                            }

                                            const allowedTypes = [
                                                "image/jpeg",
                                                "image/png",
                                                "image/jpg",
                                            ];
                                            if (
                                                !allowedTypes.includes(
                                                    file.type
                                                )
                                            ) {
                                                alert(
                                                    "Format file tidak didukung! Harap unggah file JPG atau PNG."
                                                );
                                                return;
                                            }

                                            setData("file_identitas", file);
                                        }}
                                    />
                                </label>
                                <span className="px-4 py-2 text-gray-600 w-full truncate">
                                    {data.file_identitas
                                        ? data.file_identitas.name
                                        : "Belum ada file dipilih"}
                                </span>
                            </div>
                        </div>
                        {errors.file_identitas && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.file_identitas}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-2">
                            <label className="block font-saira font-medium text-md lg:text-2xl pt-2 lg:pt-4">
                                Alamat Domisili *
                            </label>
                            <input
                                type="text"
                                className="md:col-span-2 w-full p-2 border border-[#097FF5] rounded-md shadow-md"
                                value={data.alamat}
                                onChange={(e) =>
                                    setData("alamat", e.target.value)
                                }
                            />
                        </div>
                        {errors.alamat && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.alamat}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-2">
                            <label className="block font-saira font-medium text-md lg:text-2xl pt-2 lg:pt-4">
                                Provinsi
                            </label>
                            <input
                                type="text"
                                className="md:col-span-2 w-full p-2 border border-[#097FF5] rounded-md shadow-md"
                                value={data.provinsi}
                                onChange={(e) =>
                                    setData("provinsi", e.target.value)
                                }
                            />
                        </div>
                        {errors.provinsi && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.provinsi}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-2">
                            <label className="block font-saira font-medium text-md lg:text-2xl pt-2 lg:pt-4">
                                Kota
                            </label>
                            <input
                                type="text"
                                className="md:col-span-2 w-full p-2 border border-[#097FF5] rounded-md shadow-md"
                                value={data.kota}
                                onChange={(e) =>
                                    setData("kota", e.target.value)
                                }
                            />
                        </div>
                        {errors.kota && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.kota}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-2">
                            <label className="block font-saira font-medium text-md lg:text-2xl pt-2 lg:pt-4">
                                No Telepon/Ponsel Pelapor
                            </label>
                            <input
                                type="text"
                                className="md:col-span-2 w-full p-2 border border-[#097FF5] rounded-md shadow-md"
                                value={data.no_telp}
                                onChange={(e) =>
                                    setData("no_telp", e.target.value)
                                }
                            />
                        </div>
                        {errors.no_telp && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.no_telp}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                            <label className="block font-saira font-medium text-md lg:text-2xl pt-2 lg:pt-4">
                                Email Pelapor *
                            </label>
                            <input
                                type="email"
                                className="md:col-span-2 w-full p-2 border border-[#097FF5] rounded-md shadow-md"
                                value={data.email}
                                readOnly
                            />
                        </div>
                        {errors.email && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.email}
                            </div>
                        )}
                    </div>

                    {/* Tombol Submit */}
                    <div className="py-10">
                        <button
                            type="submit"
                            className="block mx-auto mt-4 bg-[#097FF5] text-white py-2 lg:py-3 px-9 lg:px-12 rounded-[20px] lg:rounded-[30px] hover:bg-blue-700"
                        >
                            Kirimkan Pengaduan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
