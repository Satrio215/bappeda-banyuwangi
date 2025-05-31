<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kejadian extends Model
{
    use HasFactory;

    protected $fillable = [
        'judul',
        'uraian',
        'tanggal',
        'lokasi',
        'keterangan',
        'file_bukti',
    ];

    /**
     * Relasi ke Form
     * Satu kejadian dimiliki oleh satu form
     */
    public function form()
    {
        return $this->hasOne(Form::class);
    }
}
