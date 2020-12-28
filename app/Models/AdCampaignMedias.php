<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdCampaignMedias extends Model
{
    use HasFactory;

    protected $fillable = [
        'ad_campaign_id',
        'file_name',
        'file_mime'
    ];
}
