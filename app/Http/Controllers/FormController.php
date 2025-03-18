<?php

namespace App\Http\Controllers;

use App\Models\Form;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FormController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $forms = Form::latest()->get()->map(function ($form) {

            $form->file_bukti = asset('storage/' . ltrim($form->file_bukti, '/'));
            $form->file_identitas = asset('storage/' . ltrim($form->file_identitas, '/'));
            return $form;
        });

        return inertia('Form/Index', [
            'forms' => $forms,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Form/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'klasifikasi' => 'required|string',
            'judul' => 'required|string',
            'uraian' => 'required|string',
            'tanggal' => 'required|date',
            'lokasi' => 'required|string',
            'keterangan' => 'required|string',
            'file_bukti' => 'required|file|mimes:jpg,jpeg,png|max:2048',
            'nama' => 'required|string',
            'sex' => 'nullable|in:pria,wanita',
            'identitas' => 'required|string',
            'nomor' => 'required|string|max:20',
            'file_identitas' => 'required|file|mimes:jpg,jpeg,png|max:2048',
            'alamat' => 'required|string',
            'provinsi' => 'nullable|string',
            'kota' => 'nullable|string',
            'no_telp' => 'nullable|string',
            'email' => 'required|email',
            'status' => 'nullable|string',
        ]);

        $form = new Form($request->except(['file_bukti', 'file_identitas']));

        if ($request->hasFile('file_bukti')) {
            $form->file_bukti = $request->file('file_bukti')->store('images', 'public');
        }

        if ($request->hasFile('file_identitas')) {
            $form->file_identitas = $request->file('file_identitas')->store('images', 'public');
        }

        $form->save();

        return redirect()->route('forms.index')->with('success', 'Form berhasil disimpan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Form $form)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $form = Form::findOrFail($id);
        return inertia('Form/Update', [
            'form' => $form,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
{
    $request->validate([
        'status' => 'required|string|in:proses,diterima,selesai',
        'file_bukti' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        'file_identitas' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
    ]);

    $form = Form::findOrFail($id);

    if ($request->hasFile('file_bukti')) {
        $oldFileBukti = public_path('images/' . $form->file_bukti);
        if ($form->file_bukti && file_exists($oldFileBukti)) {
            unlink($oldFileBukti);
        }
        $fileBuktiName = time() . '_bukti.' . $request->file('file_bukti')->getClientOriginalExtension();
        $request->file('file_bukti')->move(public_path('images'), $fileBuktiName);
        $form->file_bukti = $fileBuktiName;
    }

    if ($request->hasFile('file_identitas')) {
        $oldFileIdentitas = public_path('images/' . $form->file_identitas);
        if ($form->file_identitas && file_exists($oldFileIdentitas)) {
            unlink($oldFileIdentitas);
        }
        $fileIdentitasName = time() . '_identitas.' . $request->file('file_identitas')->getClientOriginalExtension();
        $request->file('file_identitas')->move(public_path('images'), $fileIdentitasName);
        $form->file_identitas = $fileIdentitasName;
    }

    $form->status = $request->status;
    $form->save();

    return redirect()->route('forms.index')->with('success', 'Form berhasil diperbarui!');
}
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Form $form)
    {
        //
    }
}
