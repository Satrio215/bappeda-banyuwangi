<?php

namespace App\Http\Controllers;

use App\Models\Data;
use App\Models\Form;
use App\Models\Kejadian;
use App\Models\Klasifikasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class InputController extends Controller
{
    /**
     * Menampilkan halaman input aduan.
     */
    public function create()
    {
        if (!Auth::guard('penggunas')->check()) {
            return redirect()->route('login.pengguna');
        }

        // Daftar tipe klasifikasi
        $tipeList = ['be', 'bpp', 'bkrp', 'bspl', 'bppp'];

        // Tambahkan tipe klasifikasi jika belum ada
        foreach ($tipeList as $tipe) {
            Klasifikasi::firstOrCreate(['tipe' => $tipe]);
        }

        return Inertia::render('Input/Create', [
            'email' => Auth::guard('penggunas')->user()->email,
        ]);
    }

    /**
     * Menyimpan data aduan ke dalam database.
     */
    public function store(Request $request)
    {
        if (!Auth::guard('penggunas')->check()) {
            return redirect()->route('login.pengguna');
        }

        $validated = $request->validate([
            // Data pribadi
            'nama' => 'required|string|max:255',
            'sex' => 'nullable|in:pria,wanita',
            'identitas' => 'required|in:ktp,sim',
            'nomor' => 'required|string|max:255',
            'file_identitas' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'alamat' => 'required|string',
            'provinsi' => 'nullable|string',
            'kota' => 'nullable|string',
            'no_telp' => 'nullable|string|max:20',
            'email' => 'required|email',

            // Data kejadian
            'judul' => 'required|string|max:255',
            'uraian' => 'required|string',
            'tanggal' => 'required|date',
            'lokasi' => 'required|string|max:255',
            'keterangan' => 'required|string',
            'file_bukti' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',

            // Klasifikasi
            'tipe' => 'required|in:be,bpp,bkrp,bspl,bppp',
        ]);

        DB::beginTransaction();

        try {
            // Upload file identitas
            $fileIdentitasName = time() . '_identitas.' . $request->file('file_identitas')->extension();
            $request->file('file_identitas')->move(public_path('uploads'), $fileIdentitasName);

            // Upload file bukti
            $fileBuktiName = time() . '_bukti.' . $request->file('file_bukti')->extension();
            $request->file('file_bukti')->move(public_path('uploads'), $fileBuktiName);

            // Simpan data pribadi
            $data = Data::create([
                'nama' => $validated['nama'],
                'sex' => $validated['sex'],
                'identitas' => $validated['identitas'],
                'nomor' => $validated['nomor'],
                'file_identitas' => 'uploads/' . $fileIdentitasName,
                'alamat' => $validated['alamat'],
                'provinsi' => $validated['provinsi'],
                'kota' => $validated['kota'],
                'no_telp' => $validated['no_telp'],
                'email' => $validated['email'],
            ]);

            // Simpan data kejadian
            $kejadian = Kejadian::create([
                'judul' => $validated['judul'],
                'uraian' => $validated['uraian'],
                'tanggal' => $validated['tanggal'],
                'lokasi' => $validated['lokasi'],
                'keterangan' => $validated['keterangan'],
                'file_bukti' => 'uploads/' . $fileBuktiName,
            ]);

            // Ambil pengguna login
            $pengguna = Auth::guard('penggunas')->user();

            // Ambil klasifikasi
            $klasifikasi = Klasifikasi::where('tipe', $validated['tipe'])->first();
            if (!$klasifikasi) {
                throw new \Exception('Klasifikasi tidak ditemukan untuk tipe: ' . $validated['tipe']);
            }

            // Buat nomor tiket unik
            $noTiket = 'TKT-' . strtoupper(Str::random(8));

            // Simpan ke tabel forms
            Form::create([
                'id_users' => null,
                'id_penggunas' => $pengguna->id,
                'id_kejadians' => $kejadian->id,
                'id_klasifikasis' => $klasifikasi->id,
                'id_datas' => $data->id,
                'no_tiket' => $noTiket,
                'status' => 'diterima',
                'tipe' => $validated['tipe'],
            ]);

            DB::commit();

return redirect()->route('beranda')->with([
    'success' => 'Laporan berhasil dikirim.',
    'no_tiket' => $noTiket,
]);
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['message' => $e->getMessage()])->withInput();
        }
    }

    /**
     * Menampilkan status tiket berdasarkan no_tiket.
     */
    public function show(Request $request)
    {
        $no_tiket = $request->input('no_tiket');
        $status = 'Tiket tidak ditemukan';

        if ($no_tiket) {
            $form = Form::where('no_tiket', $no_tiket)->first();
            if ($form) {
                $status = $form->status;
            }
        }

        return redirect()->route('status')->with([
            'no_tiket' => $no_tiket,
            'status' => $status,
        ]);
    }
}
