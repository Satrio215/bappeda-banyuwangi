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
        $user = Auth::guard('penggunas')->user();
        return Inertia::render('Auth/LoginPengguna', [
            'user' => $user,
            'email' => $user ? $user->email : null,
        ]);
    }

    public function welcome()
    {
        $user = Auth::guard('penggunas')->user();
        return Inertia::render('Welcome', [
            'user' => $user,
            'email' => $user ? $user->email : null,
        ]);
    }

    public function status()
    {
        $user = Auth::guard('penggunas')->user();
        return Inertia::render('Status', [
            'user' => $user,
            'email' => $user ? $user->email : null,
            'no_tiket' => session()->get('no_tiket'),
            'status' => session()->get('status', 'Tiket tidak ditemukan'),
        ]);
    }

    public function create()
    {
        $user = Auth::guard('Input/Create')->user();
        return Inertia::render('Input/Create', [
            'user' => $user,
            'email' => $user ? $user->email : null,
        ]);
    }

    public function landing()
    {
        $user = Auth::guard('Components/Landing')->user();
        return Inertia::render('Components/Landing', [
            'user' => $user,
            'email' => $user ? $user->email : null,
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
            session()->regenerate();
            return redirect()->intended(route('beranda'));
        }

        return Inertia::render('Welcome', [
            'errors' => ['message' => 'Invalid credentials provided'],
        ]);
    }

    /**
     * Proses logout untuk pengguna.
     */
    public function logout(Request $request)
    {
        Auth::guard('penggunas')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    /**
     * Menampilkan dashboard pengguna.
     */
    public function dashboard()
    {
        $user = Auth::guard('penggunas')->user();
        return Inertia::render('Welcome', [
            'user' => $user,
            'email' => $user ? $user->email : null,
        ]);
    }
}
