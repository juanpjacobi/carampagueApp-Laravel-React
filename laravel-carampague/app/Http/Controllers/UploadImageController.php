<?php

namespace App\Http\Controllers;

use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;

class UploadImageController extends Controller
{
    public function uploadImage(Request $request)
{
    $request->validate([
        'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    if ($request->hasFile('image')) {
        $uploadedFileUrl = Cloudinary::upload($request->file('image')->getRealPath())->getSecurePath();

        // Save the URL to the database
        $imageUrl = $uploadedFileUrl;

        // Aquí podrías guardar la URL en tu modelo asociado
        // $asociado = Asociado::find($id);
        // $asociado->image_url = $imageUrl;
        // $asociado->save();

        return response()->json(['url' => $imageUrl], 200);
    }

    return response()->json(['error' => 'No image uploaded'], 400);
}
}
