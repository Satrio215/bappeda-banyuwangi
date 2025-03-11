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
        $forms = Form::latest()->get()->map(function ($form){
            $form->file_bukti = asset('images/' . $form->file_bukti);
            $form->file_identitas = asset('images/' . $form->file_identitas);
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
            'file_bukti' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'nama' => 'required|string',
            'sex' => 'nullable|in:Laki-laki,Perempuan',
            'identitas' => 'required|string',
            'nomor' => 'required|string',
            'file_identitas' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'alamat' => 'required|string',
            'provinsi' => 'nullable|string',
            'kota' => 'nullable|string',
            'no_telp' => 'nullable|string',
            'email' => 'required|email',
            'status' => 'required|string',
        ]);

        $form = new Form($request->except(['file_bukti', 'file_identitas']));

        if ($request->hasFile('file_bukti')) {
            $filename = time() . '.' . $request->file('file_bukti')->getClientOriginalExtension();
            $request->file('file_bukti')->move(public_path('images'), $filename);
            $form->file_bukti = 'images/' . $filename;
        }

        if ($request->hasFile('file_identitas')) {
            $filename = time() . '.' . $request->file('file_identitas')->getClientOriginalExtension();
            $request->file('file_identitas')->move(public_path('images'), $filename);
            $form->file_identitas = 'images/' . $filename;
        }

        $form->save();

        return Redirect::route('forms.index')->with('success', 'Form berhasil disimpan!');
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
    public function edit(Form $form)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Form $form)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Form $form)
    {
        //
    }
}
