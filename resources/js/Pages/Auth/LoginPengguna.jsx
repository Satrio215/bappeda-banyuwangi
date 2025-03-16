import { useForm } from "@inertiajs/react";

export default function LoginPengguna() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/login-pengguna");
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Kiri - Informasi */}
            <div className="w-full md:w-1/2 bg-cover bg-center flex flex-col justify-center items-center text-white p-6 md:p-10 bg-[url('/asset/bg-login.png')]">
                <h1 className="text-2xl md:text-4xl font-extrabold font-saira mb-4 text-center">
                    Selamat Datang Kembali!
                </h1>
                <div className="border w-1/4 h-2 bg-white rounded-md" />
                <p className="text-center max-w-md text-sm md:text-base font-saira pt-4">
                    "Masuk ke akun Anda untuk melaporkan masalah dan meningkatkan kualitas layanan di Kabupaten Banyuwangi."
                </p>
            </div>

            {/* Kanan - Form Login */}
            <div className="w-full md:w-1/2 flex justify-center items-center p-6 md:p-10 bg-white">
                <div className="w-full max-w-md">
                    <h2 className="text-2xl lg:text-4xl font-extrabold font-saira text-center text-[#097FF5] mb-6">
                        Login
                    </h2>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center">
                        {[
                            { label: "Email", type: "email", name: "email", placeholder: "Masukkan email" },
                            { label: "Password", type: "password", name: "password", placeholder: "Masukkan password" },
                        ].map((field) => (
                            <div className="mb-4 w-full" key={field.name}>
                                <label className="block font-semibold font-saira text-[#097FF5] text-md lg:text-xl">
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}
                                    className="w-full p-3 border-l-8 border-[#097FF5] focus:outline-none focus:ring-2 focus:ring-[#097FF5]"
                                    value={data[field.name]}
                                    onChange={(e) => setData(field.name, e.target.value)}
                                    placeholder={field.placeholder}
                                />
                                {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
                            </div>
                        ))}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-3/4 bg-[#097FF5] text-white py-3 pt-4 rounded-full hover:bg-blue-700 transition duration-300 disabled:opacity-50 text-center"
                            disabled={processing}
                        >
                            {processing ? "Memproses..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
