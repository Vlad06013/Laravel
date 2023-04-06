<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\StatisticController;
Route::get('/', function () {
    return view('main');
})->name('main');

Route::get('/about/', function () {
    return view('about');
})->name('about');


Route::get('/statistic/', 'StatisticController@getSiteList')->name('statistic');
Route::post('statistic', 'StatisticController@selectMap');
