<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Form extends Model
{
    use HasFactory;

    protected $table = 'forms';
    protected $fillable = [
        'no_tiket', 'klasifikasi', 'deskripsi', 'uraian', 'tanggal',
        'lokasi', 'keterangan', 'file_bukti', 'nama', 'sex',
        'identitas', 'nomor', 'file_identitas', 'alamat', 'provinsi',
        'kota', 'no_telp', 'email', 'status'
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($form) {
            $randomStr = strtoupper(Str::random(8));
            $form->no_tiket = 'TKT-' . date('Ymd') . '-' . $randomStr;
        });
    }
}
