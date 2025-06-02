import React from "react";

const Footer = () => {
    return (
        <footer className="bg-[url('/asset/layanan.png')] bg-cover bg-center text-white py-8">
            <div className="px-2 md:px-8 xl:px-16">
                <div className="w-full flex flex-col md:flex-row justify-between py-5 gap-6">
                    {/* Left Section */}
                    <div className="text-center md:text-left w-full md:w-auto">
                        <h1 className="font-bold text-2xl mb-2 font-saira">
                            BAPPEDA BANYUWANGI
                        </h1>
                        <div className="flex flex-col space-y-2 text-sm items-center md:items-start">
                            <a
                                href="mailto:email.example@gmail.com"
                                className="flex items-center gap-2 hover:underline font-saira"
                            >
                                email.example@gmail.com
                            </a>
                            <a
                                href="tel:082140429494"
                                className="flex items-center gap-2 hover:underline font-saira"
                            >
                                1234-1234-1234
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <hr className="border-blue-200 my-4" />

                {/* Footer note */}
                <p className="text-xs font-bold text-white text-cente font-sairar">
                    ©2025, BAPPEDA BANYUWANGI
                </p>
            </div>
        </footer>
    );
};

export default Footer;
