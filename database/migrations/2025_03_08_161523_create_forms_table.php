<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('forms', function (Blueprint $table) {
            $table->id();
            $table->string('no_tiket');
            $table->enum('klasifikasi',['infrastruktur', 'lingkungan', 'desa', 'pembangunan', 'umkm']);
            $table->string('judul');
            $table->string('uraian');
            $table->date('tanggal');
            $table->string('lokasi');
            $table->string('keterangan');
            $table->string('file_bukti');
            $table->string('nama');
            $table->enum('sex',['pria','wanita'])->nullable();
            $table->enum('identitas',['ktp','sim']);
            $table->string('nomor');
            $table->string('file_identitas');
            $table->string('alamat');
            $table->string('provinsi')->nullable();
            $table->string('kota')->nullable();
            $table->string('no_telp')->nullable();
            $table->string('email');
            $table->enum('status',['diterima', 'proses', 'selesai']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('forms');
    }
};
