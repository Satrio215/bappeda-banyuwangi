import React from "react";

const Tata = () => {
    return (
        <div className="px-2 md:px-8 xl:px-16 pt-8 xl:pt-16 pb-4 lg:pb-8">
            <div className="flex justify-center mb-8">
                <h1 className="text-2xl lg:text-4xl font-bold font-saira text-center text-[#097FF5]">
                    Tata Cara Pelayanan Umpan Balik
                </h1>
            </div>
            <div className="flex justify-center">
                <img
                    src="/asset/cara.png"
                    alt="Tata Cara Pengaduan"
                    className="w-10/12 max-w-xl h-auto"
                />
            </div>
        </div>
    );
};

export default Tata;
