<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatisticController extends Controller
{
   
    public function getSiteList(){

       $arSites = DB::table('clickers')
            ->select(DB::raw('url'))
            ->distinct()
            ->get();

        return view('statistic',['arSites'=>$arSites]);
    }

    public function selectMap(Request $request) { 

        if($request->action){

            switch ($request->action) {

                case 'getClickMap':

                    $siteVals = $this->getClickMap($request->site);
                    
                break;

                case 'getHeatMap':

                    $siteVals = $this->getHeatMap($request->site);
                    
                break;
            }
        }

        return response()->json(['success'=>$siteVals]);

    }

    public function getClickMap($site) { 

        $siteVals['vals'] = DB::table('clickers')
            ->select(DB::raw('count(*) as count, hour'),'date')
            ->where('url', $site)
            ->groupBy('date','hour')
            ->orderByRaw('date ASC')
            ->get();

        $siteVals['map']='click';

        return $siteVals;
  
    }

    public function getHeatMap($site) { 

        $siteVals['vals'] = DB::table('clickers')
            ->select('posX','posY')
            ->where('url', $site)
            ->get();

        $siteVals['map']='heat';


        return $siteVals;
  
    }
   
}
