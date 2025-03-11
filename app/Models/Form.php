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
        'no_tiket', 'klasifikasi', 'judul', 'uraian', 'tanggal',
        'lokasi', 'keterangan', 'file_bukti', 'nama', 'sex',
        'identitas', 'nomor', 'file_identitas', 'alamat', 'provinsi',
        'kota', 'no_telp', 'email', 'status'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($form) {
            $randomStr = strtoupper(Str::uuid());
            $form->no_tiket = 'TKT-' . now()->format('Ymd') . '-' . substr($randomStr, 0, 8);

            if (empty($form->status)) {
                $form->status = 'proses';
            }
        });
    }
}
