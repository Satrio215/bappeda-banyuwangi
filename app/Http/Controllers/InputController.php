<?php

namespace App\Http\Controllers;

use App\Models\Form;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class InputController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (!Auth::guard('penggunas')->check()) {
            return redirect()->route('login.pengguna');
        }

        return Inertia::render('Input/Create', [
            'email' => Auth::guard('penggunas')->user()->email,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'no_tiket' => 'nullable',
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
            'nomor' => ['required', 'numeric', 'regex:/^[0-9]+$/'],
            'file_identitas' => 'required|file|mimes:jpg,jpeg,png|max:2048',
            'alamat' => 'required|string',
            'provinsi' => 'nullable|string',
            'kota' => 'nullable|string',
            'no_telp' => ['nullable', 'regex:/^08[0-9]{8,11}$/'],
            'email' => 'required|email',
            'status' => 'nullable|string',
        ]);

        $form = new Form($request->except(['file_bukti', 'file_identitas']));

        $form->no_tiket = 'TIKET-' . time();

        if ($request->hasFile('file_bukti')) {
            $form->file_bukti = $request->file('file_bukti')->store('images', 'public');
        }

        if ($request->hasFile('file_identitas')) {
            $form->file_identitas = $request->file('file_identitas')->store('images', 'public');
        }

        $form->save();

        return redirect()->route('beranda')->with([
            'success' => 'Aduan baru berhasil dibuat dan akan segera dibuat',
            'no_tiket' => $form->no_tiket
        ]);
    }

    /**
     * Display the specified resource.
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
