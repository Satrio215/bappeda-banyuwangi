import React, { useEffect } from "react";

const LiveChat = () => {
    useEffect(() => {
        // Cek apakah skrip sudah ada untuk menghindari duplikasi
        if (window.Tawk_API) return;

        const script = document.createElement("script");
        script.src = "https://embed.tawk.to/67d9847d8164481907e9dc35/1imkqr4pm";
        script.async = true;
        script.charset = "UTF-8";
        script.setAttribute("crossorigin", "*");

        // Setelah skrip dimuat, inisialisasi Tawk_API
        script.onload = () => {
            window.Tawk_API = window.Tawk_API || {};
            window.Tawk_LoadStart = new Date();
        };

        document.body.appendChild(script);

        return () => {
            // Hapus skrip saat komponen unmount
            document.body.removeChild(script);
        };
    }, []);

    return null; // Tidak perlu elemen div karena ini hanya pemanggilan script
};

export default LiveChat;
