import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Index({ auth, forms }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus form ini?")) {
            destroy(route("forms.destroy", id));
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "proses":
                return "bg-yellow-500 text-white";
            case "diterima":
                return "bg-green-500 text-white";
            case "selesai":
                return "bg-red-500 text-white";
            default:
                return "bg-gray-500 text-white";
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Daftar Form" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 bg-gray-100 border-b border-gray-200">
                            <div className="mb-4 flex justify-end">
                                {/* <Link
                                    href={route("forms.create")}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition"
                                >
                                    Tambah Form
                                </Link> */}
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                No
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Judul
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                No. Tiket
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Keterangan
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                File Bukti
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {forms.map((form, index) => (
                                            <tr key={form.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {form.kejadian?.judul ??
                                                        "-"}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {form.no_tiket}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {form.kejadian
                                                        ?.keterangan ?? "-"}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {form.kejadian
                                                        ?.file_bukti ? (
                                                        <img
                                                            src={
                                                                form.file_bukti
                                                            }
                                                            alt="File Bukti"
                                                            className="w-20 h-20 object-cover rounded-lg"
                                                        />
                                                    ) : (
                                                        "Tidak ada"
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
                                                            form.status
                                                        )}`}
                                                    >
                                                        {form.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                    <Link
                                                        href={route(
                                                            "forms.edit",
                                                            form.id
                                                        )}
                                                        className="border border-blue-500 text-blue-500 px-3 py-1 rounded-lg hover:bg-blue-500 hover:text-white"
                                                    >
                                                        Edit
                                                    </Link>
                                                    {/*
                                                    <button
                                                        onClick={() => handleDelete(form.id)}
                                                        className="border border-red-500 text-red-500 px-3 py-1 rounded-lg hover:bg-red-500 hover:text-white"
                                                    >
                                                        Hapus
                                                    </button>
                                                    */}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
