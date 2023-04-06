<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\ClickerRequest;
use App\Models\Clicker; 

class ClickerController extends Controller
{
  
    public function add(Request $request) { 

        foreach ($request->data as $click) {



            $clicker = new Clicker;
    
            $clicker->url = $click['url'];
            // $clicker->url = 'testDomain';
            $clicker->posX = $click['posX'];
            $clicker->posY = $click['posY'];
            $clicker->date = $click['date'];
            $clicker->hour = $click['hour'];
    
            $clicker->save();
        }
        
        return response()->json(['success'=>'succsess Add']);
  
    }

  

    
}
