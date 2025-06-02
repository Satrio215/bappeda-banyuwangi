<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\Data;
use App\Models\Kejadian;
use App\Models\Klasifikasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class FormController extends Controller
{
    public function index()
    {
        $forms = Form::with(['data', 'kejadian', 'klasifikasi'])
            ->whereNotNull('id_penggunas')
            ->get();

        foreach ($forms as $form) {
            $form->file_bukti = asset($form->kejadian->file_bukti);
            $form->file_identitas = asset($form->data->file_identitas);
        }

        return Inertia::render('Form/Index', [
            'forms' => $forms,
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Form $form)
    {
        //
    }

    public function edit($id)
    {
        $form = Form::with(['data', 'kejadian', 'klasifikasi'])->findOrFail($id);

        return Inertia::render('Form/Update', [
            'form' => [
                'id' => $form->id,
                'no_tiket' => $form->no_tiket,
                'status' => $form->status,

                // Klasifikasi
                'tipe' => $form->klasifikasi->tipe ?? null,

                // Data pribadi
                'nama' => $form->data->nama,
                'sex' => $form->data->sex,
                'identitas' => $form->data->identitas,
                'nomor' => $form->data->nomor,
                'alamat' => $form->data->alamat,
                'provinsi' => $form->data->provinsi,
                'kota' => $form->data->kota,
                'no_telp' => $form->data->no_telp,
                'email' => $form->data->email,
                'file_identitas' => $form->data->file_identitas,

                // Kejadian
                'judul' => $form->kejadian->judul,
                'uraian' => $form->kejadian->uraian,
                'tanggal' => $form->kejadian->tanggal,
                'lokasi' => $form->kejadian->lokasi,
                'keterangan' => $form->kejadian->keterangan,
                'file_bukti' => $form->kejadian->file_bukti,
            ],
        ]);
    }

   public function update(Request $request, $id)
{
    $form = Form::with(['data', 'kejadian'])->findOrFail($id);

    // Jika hanya update status
    if (
        $request->has('status') &&
        Arr::has($request->except('_method'), ['status']) &&
        count($request->except('_method')) === 1
    ) {
        $validated = $request->validate([
            'status' => 'required|string|in:diterima,proses,selesai',
        ]);

        $form->status = $validated['status'];
        $form->id_users = Auth::id(); // Tambahkan ini untuk update id_users juga
        $form->save();

        return redirect()->route('forms.index')->with('success', 'Status berhasil diperbarui.');
    }

    // Validasi lengkap
    $validated = $request->validate([
        'data.nama' => 'required|string|max:255',
        'data.sex' => 'nullable|in:pria,wanita',
        'data.identitas' => 'required|in:ktp,sim',
        'data.nomor' => 'required|string|max:255',
        'data.alamat' => 'required|string',
        'data.provinsi' => 'nullable|string',
        'data.kota' => 'nullable|string',
        'data.no_telp' => 'nullable|string|max:20',
        'data.email' => 'required|email',

        'kejadian.judul' => 'required|string|max:255',
        'kejadian.uraian' => 'required|string',
        'kejadian.tanggal' => 'required|date',
        'kejadian.lokasi' => 'required|string|max:255',
        'kejadian.keterangan' => 'required|string',

        'tipe' => 'required|in:be,bpp,bkrp,bspl,bppp',
        'status' => 'required|string|in:diterima,proses,selesai',
    ]);

    DB::beginTransaction();

    try {
        // Update data pribadi
        $form->data->update($validated['data']);

        // File identitas
        if ($request->hasFile('file_identitas')) {
            if ($form->data->file_identitas && file_exists(public_path($form->data->file_identitas))) {
                unlink(public_path($form->data->file_identitas));
            }

            $fileIdentitasName = time() . '_identitas.' . $request->file('file_identitas')->extension();
            $request->file('file_identitas')->move(public_path('uploads'), $fileIdentitasName);
            $form->data->file_identitas = 'uploads/' . $fileIdentitasName;
            $form->data->save();
        }

        // Update kejadian
        $form->kejadian->update($validated['kejadian']);

        // File bukti
        if ($request->hasFile('file_bukti')) {
            if ($form->kejadian->file_bukti && file_exists(public_path($form->kejadian->file_bukti))) {
                unlink(public_path($form->kejadian->file_bukti));
            }

            $fileBuktiName = time() . '_bukti.' . $request->file('file_bukti')->extension();
            $request->file('file_bukti')->move(public_path('uploads'), $fileBuktiName);
            $form->kejadian->file_bukti = 'uploads/' . $fileBuktiName;
            $form->kejadian->save();
        }

        // Update klasifikasi, status, dan id_users (admin)
        $klasifikasi = Klasifikasi::where('tipe', $validated['tipe'])->firstOrFail();

        $form->update([
            'id_klasifikasis' => $klasifikasi->id,
            'tipe' => $validated['tipe'],
            'status' => $validated['status'],
            'id_users' => Auth::id(), // Set ID admin yang mengedit
        ]);

        DB::commit();

        return redirect()->route('forms.index')->with('success', 'Form berhasil diperbarui.');
    } catch (\Exception $e) {
        DB::rollBack();
        return back()->withErrors(['message' => $e->getMessage()])->withInput();
    }
}
    public function destroy($id)
{
    DB::beginTransaction();

    try {
        $form = Form::with(['data', 'kejadian'])->findOrFail($id);

        // Hapus file identitas jika ada
        if ($form->data && $form->data->file_identitas && file_exists(public_path($form->data->file_identitas))) {
            unlink(public_path($form->data->file_identitas));
        }

        // Hapus file bukti jika ada
        if ($form->kejadian && $form->kejadian->file_bukti && file_exists(public_path($form->kejadian->file_bukti))) {
            unlink(public_path($form->kejadian->file_bukti));
        }

        // Hapus relasi data dan kejadian
        $form->data?->delete();
        $form->kejadian?->delete();

        // Hapus form itu sendiri
        $form->delete();

        DB::commit();

        return redirect()->route('forms.index')->with('success', 'Data form berhasil dihapus.');
    } catch (\Exception $e) {
        DB::rollBack();
        return back()->withErrors(['message' => 'Gagal menghapus data: ' . $e->getMessage()]);
    }
}

}
