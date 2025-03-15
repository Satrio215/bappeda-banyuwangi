<?php

namespace App\Http\Controllers;

use App\Models\Pengguna;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class PenggunaRegisterController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:penggunas,email',
            'password' => 'required|min:6|confirmed',
            'nik' => 'required|min:16|max:16',
        ]);

        Pengguna::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'nik' => $request->nik,
        ]);

        return redirect()->route('beranda')->with('success', 'Pendaftaran berhasil!');
    }
}

