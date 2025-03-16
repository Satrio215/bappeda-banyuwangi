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
        return Inertia::render('Auth/LoginPengguna', [
            'user' => Auth::guard('penggunas')->user(),

        ]);
    }

    public function welcome()
    {
        return Inertia::render('Welcome', [
            'user' => Auth::guard('penggunas')->user(),
        ]);
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

        $credentials = $request->only('email', 'password');

        if (Auth::guard('penggunas')->attempt($credentials)) {
            return redirect()->intended('/');
        }

        return Inertia::render('Welcome', [
            'errors' => ['message' => 'Invalid credentials provided'],
            'user' => Auth::guard('penggunas')->user(),
        ]);
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
    $pengguna = auth()->user();

    return Inertia::render('Welcome', [
        'user' => Auth::guard('penggunas')->user(),
    ]);
}
}
