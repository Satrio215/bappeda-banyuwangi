import { useState, useEffect } from "react";

export default function Syarat() {
  const [open, setOpen] = useState(true);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Reset localStorage setiap kali halaman di-refresh
    localStorage.removeItem("syaratAccepted");
    setOpen(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("syaratAccepted", "true");
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40 px-4">
          <div className="max-w-lg p-6 border rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-semibold text-gray-800">Syarat & Ketentuan</h2>
            <ul className="list-decimal list-inside text-gray-700 space-y-2 mt-4">
              <li>Berkas yang diterima Komnas HAM RI merupakan dokumen negara sehingga tidak dapat dipinjam dan diminta kembali.</li>
              <li>Pengadu wajib menjaga kerahasiaan nomor agenda, nomor kasus, username & password akun, dan informasi terkait aduan yang disampaikan.</li>
              <li>Pengaduan ini disampaikan dengan itikad baik dan penuh kesungguhan.</li>
              <li>Harap simpan No Tiket anda.</li>
            </ul>
            <div className="mt-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
              <strong>Catatan:</strong> Jika ingin melakukan pengisian form pengaduan, diwajibkan untuk melakukan login terlebih dahulu.
            </div>
            <div className="flex items-center mt-4 space-x-2">
              <Checkbox checked={checked} onCheckedChange={setChecked} />
              <label className="text-gray-700">Saya setuju dengan Syarat & Ketentuan yang ada</label>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <Button disabled={!checked} onClick={handleAccept}>
                Lanjutkan
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Button({ children, disabled, className, ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium text-white ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

function Checkbox({ checked, onCheckedChange, className, ...props }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className={`w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
}
