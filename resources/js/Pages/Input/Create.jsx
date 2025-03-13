import { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, errors } = useForm({
        klasifikasi: '',
        judul: '',
        uraian: '',
        tanggal: '',
        lokasi: '',
        keterangan: '',
        file_bukti: null,
        nama: '',
        sex: '',
        identitas: '',
        nomor: '',
        file_identitas: null,
        alamat: '',
        provinsi: '',
        kota: '',
        no_telp: '',
        email: '',
        status: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('inputs.store'));
    };

    return (
        <div className="px-2 md:px-8 xl:px-16 ">
            <div className="flex justify-center items-center mx-auto bg-[#097FF5] p-6 rounded-t-[50px] lg:rounded-t-[70px] border-4 border-[#097FF5] px-6 shadow-[4px_8px_20px_-5px_gray]">
                <label className="text-xl lg:text-3xl font-bold font-saira text-center font text-white">Formulir Layanan Pengaduan</label>
            </div>

        <div className="mx-auto bg-white p-6 rounded-b-[50px] lg:rounded-b-[70px] border-4 border-[#097FF5] shadow-[4px_8px_20px_-5px_gray]">
            {/* Pilih Klasifikasi */}
            <div className='sm:px-10 lg:px-14'>
            <div className="border px-4 lg:px-10 py-8 lg:py-10 rounded-lg shadow-xl ">
                <label className="block font-saira text-[#097FF5] font-bold text-xl lg:text-3xl pb-4">Pilih Klasifikasi Pengaduan</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                    {['Infrastruktur', 'Lingkungan', 'Pembangunan', 'Desa', 'UMKM'].map((item) => (
                        <button
                            type="button"
                            key={item}
                            className={`flex items-center py-2 px-4 border rounded-md outline-dotted text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-saira font-bold w-full truncate
                                ${data.klasifikasi === item ? 'bg-[#FF9D00] text-white border-[#FF9D00]' : 'bg-white border-gray-300 text-[#097FF5]'}`}
                            onClick={() => setData('klasifikasi', item)}
                        >
                            <input
                                type="checkbox"
                                className="mr-2 accent-orange-500 rounded-full"
                                checked={data.klasifikasi === item}
                                readOnly
                            />
                            {item} {data.klasifikasi === item}
                        </button>
                    ))}
                </div>
            </div>
            </div>

            <div className="pt-8">
                <label className="block font-saira text-sm lg:text-lg">Jika ada tanda "<span className="text-red-500 font-bold text-xl lg:text-2xl">*</span>" wajib untuk diisi, pastikan data sudah diisi dengan benar</label>
            </div>



            {/* Deskripsi Kejadian */}
            <div className="mt-4 p-4 rounded-lg outline-dashed outline-[#097FF5] shadow-sm">
                <label className="block font-saira text-[#097FF5] font-bold text-xl lg:text-3xl">Deskripsi Kejadian</label>
                <label className="block font-saira font-medium text-md lg:text-2xl pt-4 lg:pt-6">Judul Pengaduan *</label>
                <input type="text" className="w-full mt-2 p-2 border rounded-md border-[#097FF5] shadow-xl" onChange={(e) => setData('judul', e.target.value)} />
                <label className="block font-saira font-medium text-md lg:text-2xl pt-2 lg:pt-4">Uraian Pengaduan *</label>
                <textarea className="w-full mt-2 p-2 border rounded-md border-[#097FF5] shadow-xl" onChange={(e) => setData('uraian', e.target.value)}></textarea>
                <label className="block font-saira font-medium text-md lg:text-2xl pt-2 lg:pt-4">Tanggal Kejadian *</label>
                <input type="date" className="w-full mt-2 p-2 border rounded-md border-[#097FF5] shadow-xl" onChange={(e) => setData('tanggal', e.target.value)} />
                <label className="block font-saira font-medium text-md lg:text-2xl pt-2 lg:pt-4">Lokasi Kejadian *</label>
                <input type="text" className="w-full mt-2 p-2 border rounded-md border-[#097FF5] shadow-xl" onChange={(e) => setData('lokasi', e.target.value)} />
            </div>

            {/* Unggah Bukti */}
            <div className="mt-4 p-4 rounded-lg outline-dashed outline-[#097FF5] shadow-sm pt-4">
                <label className="block font-saira text-[#097FF5] font-bold text-xl lg:text-3xl">Unggah Bukti Pendukung</label>
                <label className="block font-saira font-medium text-md lg:text-2xl pt-4 lg:pt-6">Keterangan *</label>
                <input type="text" className="w-full mt-2 p-2 border rounded-md border-[#097FF5] shadow-xl" onChange={(e) => setData('keterangan', e.target.value)} />
                {/* File Lampiran */}
                <label className="block font-saira font-medium text-md lg:text-2xl pt-2 lg:pt-4 pb-2">
                    File Lampiran *
                </label>
                <div className="flex items-center border-2 border-blue-400 rounded-lg overflow-hidden shadow-sm">
                <label className="bg-[#097FF5] text-white px-6 lg:px-12 py-2 font-semibold cursor-pointer whitespace-nowrap">
                    Pilih File...
                    <input
                        type="file"
                        className="hidden"
                        onChange={(e) => setData('file_bukti', e.target.files[0])}
                    />
                </label>
                    <span className="px-4 py-2 text-gray-600 w-full">
                        {data.file_bukti ? data.file_bukti.name : ""}
                    </span>
                </div>
            </div>

            {/* Data Pengadu */}
            <div className="mt-4 p-4 rounded-lg outline-dashed outline-[#097FF5] shadow-sm">
                <label className="block font-saira text-[#097FF5] font-bold text-xl lg:text-3xl">Data Pengadu</label>
                <input type="text" placeholder="Nama Pelapor" className="w-full mt-2 p-2 border rounded-md" onChange={(e) => setData('nama', e.target.value)} />
                <select className="w-full mt-2 p-2 border rounded-md" onChange={(e) => setData('sex', e.target.value)}>
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="pria">Pria</option>
                    <option value="wanita">Wanita</option>
                </select>
                <input type="text" placeholder="Tipe Identitas" className="w-full mt-2 p-2 border rounded-md" onChange={(e) => setData('identitas', e.target.value)} />
                <input type="text" placeholder="Nomor Identitas" className="w-full mt-2 p-2 border rounded-md" onChange={(e) => setData('nomor', e.target.value)} />
                <input type="file" className="w-full mt-2" onChange={(e) => setData('file_identitas', e.target.files[0])} />
                <input type="text" placeholder="Alamat Domisili" className="w-full mt-2 p-2 border rounded-md" onChange={(e) => setData('alamat', e.target.value)} />
                <input type="text" placeholder="Provinsi" className="w-full mt-2 p-2 border rounded-md" onChange={(e) => setData('provinsi', e.target.value)} />
                <input type="text" placeholder="Kota" className="w-full mt-2 p-2 border rounded-md" onChange={(e) => setData('kota', e.target.value)} />
                <input type="text" placeholder="Nomor Telepon" className="w-full mt-2 p-2 border rounded-md" onChange={(e) => setData('no_telp', e.target.value)} />
                <input type="email" placeholder="Email Pelapor" className="w-full mt-2 p-2 border rounded-md" onChange={(e) => setData('email', e.target.value)} />
            </div>

            {/* Tombol Submit */}
            <div className='py-10'>
            <button onClick={handleSubmit} className="block mx-auto mt-4 bg-[#097FF5] text-white py-2 lg:py-3 px-9 lg:px-12 rounded-[20px] lg:rounded-[30px] hover:bg-blue-700">
                Kirimkan Pengaduan
            </button>
            </div>
        </div>
        </div>
    );
}
