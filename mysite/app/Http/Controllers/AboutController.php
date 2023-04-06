<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\AboutRequest;
use App\models\Contact;

class AboutController extends Controller
{
    public function submit(AboutRequest $req){

        // dd($req->input('name'));
        // $validation = $req->validate([
        //     'name'=>'required|min:2|max:4'
        // ]);
        // Cache::flush();
    }
  
}
