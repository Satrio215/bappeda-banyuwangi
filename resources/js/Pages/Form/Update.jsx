import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Edit({ auth, form }) {
    const { data, setData, put, errors } = useForm({
        status: form.status || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("forms.update", form.id), {
            onSuccess: () => {},
            preserveScroll: true,
        });
    };

    const inputFields = [
        { label: "No Tiket", value: form.no_tiket },
        { label: "Klasifikasi", value: form.tipe }, // diperbaiki dari form.klasifikasi
        { label: "Judul", value: form.judul },
        { label: "Tanggal", value: form.tanggal },
        { label: "Lokasi", value: form.lokasi },
        { label: "Keterangan", value: form.keterangan },
        { label: "Nama Pengadu", value: form.nama },
        { label: "Jenis Kelamin", value: form.sex },
        { label: "Identitas", value: form.identitas },
        { label: "Nomor Identitas", value: form.nomor },
        { label: "Alamat", value: form.alamat },
        { label: "Provinsi", value: form.provinsi },
        { label: "Kota", value: form.kota },
        { label: "No Telp", value: form.no_telp },
        { label: "Email", value: form.email },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Form
                </h2>
            }
        >
            <Head title="Edit Form" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
                        <div className="space-y-4">
                            {inputFields.map((item, index) => (
                                <div key={index}>
                                    <label className="block text-sm font-medium text-gray-700">
                                        {item.label}
                                    </label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm px-3 py-2"
                                        value={item.value || ""}
                                        disabled
                                    />
                                </div>
                            ))}

                            {/* Textarea untuk Uraian */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Uraian
                                </label>
                                <textarea
                                    className="mt-1 block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm px-3 py-2"
                                    value={form.uraian || ""}
                                    disabled
                                    rows={4}
                                />
                            </div>

                            {/* File Bukti */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    File Bukti
                                </label>
                                {form.file_bukti ? (
                                    <a
                                        href={`/${form.file_bukti}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src={`/${form.file_bukti}`}
                                            alt="File Bukti"
                                            className="w-64 h-auto rounded-md shadow-md cursor-pointer hover:opacity-80 transition"
                                        />
                                    </a>
                                ) : (
                                    <p className="text-gray-500">
                                        Tidak ada file bukti
                                    </p>
                                )}
                            </div>

                            {/* File Identitas */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    File Identitas
                                </label>
                                {form.file_identitas ? (
                                    <a
                                        href={`/${form.file_identitas}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src={`/${form.file_identitas}`}
                                            alt="File Identitas"
                                            className="w-64 h-auto rounded-md shadow-md cursor-pointer hover:opacity-80 transition"
                                        />
                                    </a>
                                ) : (
                                    <p className="text-gray-500">
                                        Tidak ada file identitas
                                    </p>
                                )}
                            </div>

                            {/* Select Status */}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Ubah Status
                                    </label>
                                    <select
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                                        value={data.status}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                    >
                                        <option value="">Pilih Status</option>
                                        <option value="diterima">
                                            Diterima
                                        </option>
                                        <option value="proses">Diproses</option>
                                        <option value="selesai">Selesai</option>
                                    </select>
                                    {errors.status && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.status}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
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
