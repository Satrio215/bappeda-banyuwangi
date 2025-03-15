<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable as AuthenticatableTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengguna extends Model implements \Illuminate\Contracts\Auth\Authenticatable
{
    use HasFactory, AuthenticatableTrait;

    protected $table = 'penggunas';

    protected  $fillable = [
        'email',
        'password',
        'nik'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
