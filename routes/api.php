<?php

// use App\Http\Controllers\AdCompanyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/ad/campaigns', '\App\Http\Controllers\AdCampaignController@index');
Route::post('/ad/campaign/create', '\App\Http\Controllers\AdCampaignController@create');
Route::get('/ad/campaign/{id}/get', '\App\Http\Controllers\AdCampaignController@get');
Route::put('/ad/campaign/{id}/update', '\App\Http\Controllers\AdCampaignController@update');