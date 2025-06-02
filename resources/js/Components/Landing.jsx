import React from "react";
import { router } from "@inertiajs/react";

const Landing = ({ user }) => {
    const handleClick = () => {
        if (user) {
            const createSection = document.getElementById("create-section");
            if (createSection) {
                createSection.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            router.visit(route("pengguna.login"));
        }
    };

    return (
        <div className="px-2 md:px-8 xl:px-16">
            <div className="flex flex-col lg:flex-row items-center justify-between bg-[url('/asset/layanan.png')] bg-cover rounded-[50px] xl:rounded-[70px] p-6 lg:p-10 px-6 lg:px-10 shadow-lg mx-auto my-10">
                <div className="w-full lg:w-1/2">
                    <img
                        src="/asset/kantor.png"
                        alt="BAPPEDA"
                        className="rounded-[50px] xl:rounded-[70px] w-full h-auto shadow-md"
                    />
                </div>

                <div className="w-full lg:w-1/2 text-white text-center lg:text-left mt-6 lg:mt-0 px-6">
                    <h2 className="text-4xl lg:text-6xl font-extrabold mb-4 lg:mb-6 font-saira">
                        Layanan Informasi dan Pengaduan
                    </h2>
                    <p className="text-md lg:text-xl mb-6 font-saira">
                        Kantor Badan Perencanaan Pembangunan Daerah (BAPPEDA)
                        Kabupaten Banyuwangi
                    </p>
                    <button
                        type="button"
                        onClick={handleClick}
                        className="bg-white text-blue-600 font-bold py-1 lg:py-3 px-10 lg:px-12 rounded-full shadow-md hover:bg-gray-200 transition font-saira text-md xl:text-xl"
                    >
                        Laporkan Pengaduan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Landing;
