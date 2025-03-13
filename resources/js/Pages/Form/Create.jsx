import React from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, errors, reset } = useForm({
        klasifikasi: '',
        judul: '',
        uraian: '',
        tanggal: '',
        lokasi: '',
        keterangan: '',
        file_bukti: null,
        nama: '',
        sex: null,
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

        post(route('forms.store'), {
            onSuccess: () => reset(),
        });
    };

    const handleFileChange = (e, field) => {
        setData(field, e.target.files[0]);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tambah Form" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 bg-gray-100 border-b border-gray-200">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">Tambah Form</h2>

                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                {[
                                    { label: 'Klasifikasi', name: 'klasifikasi', type: 'select', options: ['infrastruktur', 'lingkungan', 'desa', 'pembangunan', 'umkm'] },
                                    { label: 'Judul', name: 'judul', type: 'text' },
                                    { label: 'Uraian', name: 'uraian', type: 'textarea' },
                                    { label: 'Tanggal', name: 'tanggal', type: 'date' },
                                    { label: 'Lokasi', name: 'lokasi', type: 'text' },
                                    { label: 'Keterangan', name: 'keterangan', type: 'textarea' },
                                    { label: 'File Bukti', name: 'file_bukti', type: 'file' },
                                    { label: 'Nama', name: 'nama', type: 'text' },
                                    { label: 'Jenis Kelamin', name: 'sex', type: 'select', options: ['pria', 'wanita'] },
                                    { label: 'Identitas', name: 'identitas', type: 'select', options: ['SIM', 'KTP'] },
                                    { label: 'Nomor', name: 'nomor', type: 'text' },
                                    { label: 'File Identitas', name: 'file_identitas', type: 'file' },
                                    { label: 'Alamat', name: 'alamat', type: 'text' },
                                    { label: 'Provinsi', name: 'provinsi', type: 'text' },
                                    { label: 'Kota', name: 'kota', type: 'text' },
                                    { label: 'No. Telepon', name: 'no_telp', type: 'text' },
                                    { label: 'Email', name: 'email', type: 'email' },
                                ].map(({ label, name, type, options }) => (
                                    <div className="mb-4" key={name}>
                                        <label className="block text-sm font-medium text-gray-700">{label}</label>
                                        {type === 'textarea' ? (
                                            <textarea
                                                value={data[name]}
                                                onChange={(e) => setData(name, e.target.value)}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                                            />
                                        ) : type === 'select' ? (
                                            <select
                                                value={data[name]}
                                                onChange={(e) => setData(name, e.target.value)}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                                            >
                                                <option value="">Pilih</option>
                                                {options.map((option) => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        ) : type === 'file' ? (
                                            <input
                                                type="file"
                                                onChange={(e) => handleFileChange(e, name)}
                                                className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer"
                                            />
                                        ) : (
                                            <input
                                                type={type}
                                                value={data[name]}
                                                onChange={(e) => setData(name, e.target.value)}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                                            />
                                        )}
                                        {errors[name] && <span className="text-red-600 text-sm">{errors[name]}</span>}
                                    </div>
                                ))}

                                <div className="flex justify-end">
                                    <Link href={route('forms.index')} className="bg-gray-600 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-700">
                                        Kembali
                                    </Link>
                                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
