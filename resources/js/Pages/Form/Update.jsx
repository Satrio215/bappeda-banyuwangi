import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ auth, form }) {
    const { data, setData, put, errors, reset } = useForm({
        status: form.status || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('forms.update', form.id), {
            data,
            onSuccess: () => reset(),
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Form</h2>}
        >
            <Head title="Edit Form" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 bg-gray-100 border-b border-gray-200">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">No Tiket</label>
                                <input type="text" className="mt-1 block w-full bg-gray-200" value={form.no_tiket} disabled />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Klasifikasi</label>
                                <input type="text" className="mt-1 block w-full bg-gray-200" value={form.klasifikasi} disabled />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Judul</label>
                                <input type="text" className="mt-1 block w-full bg-gray-200" value={form.judul} disabled />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Uraian</label>
                                <textarea className="mt-1 block w-full bg-gray-200" value={form.uraian} disabled></textarea>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Tanggal</label>
                                <input type="text" className="mt-1 block w-full bg-gray-200" value={form.tanggal} disabled />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Lokasi</label>
                                <input type="text" className="mt-1 block w-full bg-gray-200" value={form.lokasi} disabled />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Keterangan</label>
                                <input type="text" className="mt-1 block w-full bg-gray-200" value={form.keterangan} disabled />
                            </div>
                            <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">File Bukti</label>
                                    {form.file_bukti ? (
                                        <a href={`/storage/${form.file_bukti}`} target="_blank" rel="noopener noreferrer">
                                            <img src={`/storage/${form.file_bukti}`} alt="File Bukti" className="w-64 h-auto rounded-md shadow-md cursor-pointer hover:opacity-80 transition" />
                                        </a>
                                    ) : (
                                        <p className="text-gray-500">Tidak ada file bukti</p>
                                    )}
                                </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Nama Penggadu</label>
                                <input type="text" className="mt-1 block w-full bg-gray-200" value={form.nama} disabled />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Jensi Kelamin</label>
                                <input type="text" className="mt-1 block w-full bg-gray-200" value={form.sex} disabled />
                            </div>
                            <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">File Identitas</label>
                                    {form.file_identitas ? (
                                        <a href={`/storage/${form.file_identitas}`} target="_blank" rel="noopener noreferrer">
                                            <img src={`/storage/${form.file_identitas}`} alt="File Identitas" className="w-64 h-auto rounded-md shadow-md cursor-pointer hover:opacity-80 transition" />
                                        </a>
                                    ) : (
                                        <p className="text-gray-500">Tidak ada file identitas</p>
                                    )}
                                </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Identitas</label>
                                <input type="text" className="mt-1 block w-full bg-gray-200" value={form.identitas} disabled />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Nomor Identitas</label>
                                <input type="text" className="mt-1 block w-full bg-gray-200" value={form.nomor} disabled />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Alamat</label>
                                <input type="text" className="mt-1 block w-full bg-gray-200" value={form.alamat} disabled />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Provinsi</label>
                                <input type="text" className="mt-1 block w-full bg-gray-200" value={form.provinsi} disabled />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Kota</label>
                                <input type="text" className="mt-1 block w-full bg-gray-200" value={form.kota} disabled />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">No Telp</label>
                                <input type="text" className="mt-1 block w-full bg-gray-200" value={form.no_telp} disabled />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="text" className="mt-1 block w-full bg-gray-200" value={form.email} disabled />
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    <select
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                    >
                                        <option value="">Pilih Status</option>
                                        <option value="proses">Proses</option>
                                        <option value="diterima">Diterima</option>
                                        <option value="selesai">Selesai</option>
                                    </select>
                                    {errors.status && <div className="text-red-500 text-xs mt-1">{errors.status}</div>}
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition ease-in-out duration-300"
                                >
                                    Simpan
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
