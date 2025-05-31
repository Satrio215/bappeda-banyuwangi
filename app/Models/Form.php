<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Form extends Model
{
    use HasFactory;

    protected $table = 'forms';

    protected $fillable = [
        'id_users',
        'id_penggunas',
        'id_kejadians',
        'id_datas',
        'id_klasifikasis',
        'no_tiket',
        'status',
    ];

    /**
     * Relasi ke User (pelapor)
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'id_users');
    }

    /**
     * Relasi ke Pengguna (yang mengisi laporan)
     */
    public function pengguna()
    {
        return $this->belongsTo(Pengguna::class, 'id_penggunas');
    }

    /**
     * Relasi ke Kejadian
     */
    public function kejadian()
    {
        return $this->belongsTo(Kejadian::class, 'id_kejadians');
    }

    /**
     * Relasi ke Data Pelapor
     */
    public function data()
    {
        return $this->belongsTo(Data::class, 'id_datas');
    }

    /**
     * Relasi ke Klasifikasi
     */
    public function klasifikasi()
    {
        return $this->belongsTo(Klasifikasi::class, 'id_klasifikasis');
    }
}
