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
            $table->foreignId('id_users')->nullable()->constrained('users')->onDelete('cascade');
            $table->foreignId('id_penggunas')->constrained('penggunas')->onDelete('cascade');
            $table->foreignId('id_kejadians')->constrained('kejadians')->onDelete('cascade');
            $table->foreignId('id_datas')->constrained('datas')->onDelete('cascade');
            $table->foreignId('id_klasifikasis')->constrained('klasifikasis')->onDelete('cascade');
            $table->string('no_tiket');
            $table->enum('status', ['gagal','diterima', 'proses', 'selesai']);
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
