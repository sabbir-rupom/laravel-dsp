<?php

namespace App\Http\Controllers;

use App\Models\AdCampaign;
use App\Models\AdCampaignMedias;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdCampaignController extends Controller {
    //

    public function index() {
        $adData = AdCampaign::all();

        return response()->json($adData);
    }

    public function create(Request $request) {

        $inputData = $this->requestValidator($request);

        $ad = AdCampaign::create([
            'name' => $inputData['name'],
            'campaign_start' => $inputData['date_start'],
            'campaign_end' => $inputData['date_end'],
            'budget_total' => $inputData['budget_total'],
            'budget_daily' => $inputData['budget_daily'],
        ]);

        $ad->save();

        if ($ad->id > 0) {
            foreach ($inputData['banner_images'] as $image) {
                list($imageName, $imageMime) = $this->createImage($image);

                $adBanner = AdCampaignMedias::create([
                    'ad_campaign_id' => $ad->id,
                    'file_name' => $imageName,
                    'file_mime' => $imageMime,
                ]);

                $adBanner->save();
            }
        }

        $response = [
            'success' => true,
            'result' => [],
            'message' => 'Ad campaign data added successfully',
        ];

        return response()->json($response, 200);
    }

    public function get($id) {
        $ad = AdCampaign::find($id);
        $adMedias = AdCampaignMedias::where('ad_campaign_id', $id)->get();

        $result = [
            'id' => $ad->id,
            'name' => $ad->name,
            'campaign_start' => $ad->campaign_start,
            'campaign_end' => $ad->campaign_end,
            'budget_total' => $ad->budget_total,
            'budget_daily' => $ad->budget_daily,
            'banner_images' => [],
            'banner_ids' => []
        ];

        if(!empty($adMedias)) {
            foreach ($adMedias as $image) {
                $result['banner_images'][] = url('/storage/' . $image->file_name);
                $result['banner_ids'][] =  $image->id;
            }
        }

        $response = [
            'success' => true,
            'result' => $result,
            'message' => 'Ad campaign data fetched successfully',
        ];

        return response()->json($response);

    }

    public function update(Request $request, $id) {
        $inputData = $this->requestValidator($request, true);

        AdCampaign::find($inputData['id'])->update([
            'name' => $inputData['name'],
            'date_start' => $inputData['date_start'],
            'date_end' => $inputData['date_end'],
            'budget_total' => $inputData['budget_total'],
            'budget_daily' => $inputData['budget_daily'],
        ]);

        $response = [
            'success' => true,
            'result' => $inputData,
            'message' => 'Ad campaign data fetched successfully',
        ];

        return response()->json($response);

    }

    /**
     * Create image file from base64 image-data and store
     *
     * @param string $img Base64 Image
     * @return array
     */
    private function createImage(string $img): array{

        $imageName = uniqid() . '_' . date('Ymd') . '.png';
        $path = public_path('storage') . DIRECTORY_SEPARATOR . $imageName;
        $img = substr($img, strpos($img, ",") + 1);
        $imageFile = base64_decode($img);
        file_put_contents($path, $imageFile);

        return [$imageName, 'image/png'];

    }

    private function requestValidator(Request $request, $update = false): array {

        $rules = [
            'name' => 'required',
            'date_start' => 'required|date_format:Y-m-d',
            'date_end' => 'required|date_format:Y-m-d',
            'budget_total' => 'required|numeric',
            'budget_daily' => 'required|numeric',
        ];

        if($update) {
            $rules['id'] = 'required|numeric|min:0|not_in:0';
        } else {
            $rules['banner_images'] = 'required|array';
            $rules['banner_images.*'] = 'base64_image';

        }

        return $request->validate($rules);
    }

}
