<?php
use App\Http\Controllers\Auth\PenggunaAuthController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\InputController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PenggunaRegisterController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PenggunaAuthController::class,'welcome'])->name('beranda');
Route::get('/status', [PenggunaAuthController::class,'status'])->name('status');
Route::get('/create', [PenggunaAuthController::class,'create'])->name('create');


Route::get('/register-pengguna', function () {
    return Inertia::render('Auth/RegisterPengguna');
})->name('register');

Route::post('/register-pengguna', [PenggunaRegisterController::class, 'store']);
Route::get('/login-pengguna', [PenggunaAuthController::class, 'showLoginForm'])->name('pengguna.login');
Route::post('/login-pengguna', [PenggunaAuthController::class, 'login']);
Route::post('/logout-pengguna', [PenggunaAuthController::class, 'logout'])->name('pengguna.logout');

// Inputs Routes
Route::get('/inputs/create', [InputController::class, 'create'])->name('inputs.create');
Route::post('/inputs', [InputController::class, 'store'])->name('inputs.store');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/cari-tiket', [InputController::class, 'show'])->name('cari.tiket');

Route::middleware('auth')->group(function () {
    // Profile Routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Forms Routes
    Route::get('/forms', [FormController::class, 'index'])->name('forms.index');
    Route::get('/forms/create', [FormController::class, 'create'])->name('forms.create');
    Route::post('/forms', [FormController::class, 'store'])->name('forms.store');
    Route::get('/forms/{id}/edit', [FormController::class, 'edit'])->name('forms.edit');
    Route::put('/forms/{id}', [FormController::class, 'update'])->name('forms.update');
});

require __DIR__.'/auth.php';
