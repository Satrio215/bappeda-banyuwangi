<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Data extends Model
{
    use HasFactory;

    protected $table = 'datas';

    protected $fillable = [
        'nama',
        'sex',
        'identitas',
        'nomor',
        'file_identitas',
        'alamat',
        'provinsi',
        'kota',
        'no_telp',
        'email',
    ];

    /**
     * Relasi ke Form
     * Satu data identitas dimiliki oleh satu form
     */
    public function form()
    {
        return $this->hasOne(Form::class);
    }
}
