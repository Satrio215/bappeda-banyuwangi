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
        Schema::create('kejadians', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->text('uraian');
            $table->date('tanggal');
            $table->string('lokasi');
            $table->string('keterangan');
            $table->string('file_bukti');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kejadians');
    }
};
