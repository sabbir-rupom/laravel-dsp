<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdCampaign extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'campaign_start',
        'campaign_end',
        'budget_total',
        'budget_daily',
    ];
}
