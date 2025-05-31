<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KlasifikasiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $klasifikasis = ['be', 'bpp', 'bkrp', 'bspl', 'bppp'];

        foreach ($klasifikasis as $tipe) {
            DB::table('klasifikasis')->insert([
                'tipe' => $tipe,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
