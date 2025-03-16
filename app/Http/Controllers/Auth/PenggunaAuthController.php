<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Pengguna;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class PenggunaAuthController extends Controller
{
    /**
     * Menampilkan halaman login untuk pengguna.
     */
    public function showLoginForm()
    {
        return Inertia::render('Auth/LoginPengguna');
    }

    /**
     * Proses login untuk pengguna.
     */
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        $pengguna = Pengguna::where('email', $validated['email'])->first();

        if ($pengguna && Hash::check($validated['password'], $pengguna->password)) {
            Auth::guard('penggunas')->login($pengguna);

            return redirect()->route('beranda')->with('success', 'Login berhasil!');
        }

        return back()->withErrors(['email' => 'The provided credentials are incorrect.']);
    }

    /**
     * Proses logout untuk pengguna.
     */
    public function logout()
    {
        Auth::guard('penggunas')->logout();

        return redirect()->route('beranda')->with('success', 'Logout berhasil!');
    }

    /**
     * Menampilkan dashboard pengguna.
     */
    public function dashboard()
    {
        $pengguna = auth()->guard('penggunas')->user();

        return Inertia::render('Welcome', [
            'pengguna' => $pengguna
        ]);
    }
}
