<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Klasifikasi extends Model
{
    use HasFactory;

    protected $fillable = [
        'tipe'
    ];

    /**
     * Relasi ke Form
     * Satu klasifikasi dapat dimiliki oleh banyak form
     */
    public function forms()
    {
        return $this->hasMany(Form::class);
    }
}
