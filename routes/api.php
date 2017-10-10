<?php

use Illuminate\Http\Request;

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

Route::group(['middleware' => 'cors', 'prefix' => '/v1'], function () {

    Route::post('/login', 'AuthController@authenticate');

    Route::get('/logout/{api_token}', 'AuthController@logout');

    Route::get('/articles', 'ArticleController@index');

    Route::get('/articles/{id}', 'ArticleController@show');

    Route::post('/articles/save', 'ArticleController@store');

    Route::post('/articles/update', 'ArticleController@update');

    Route::get('/articles/delete/{id}/{api_token}', 'ArticleController@delete');

    Route::get('/users', 'UserController@index');

    Route::get('/users/{id}', 'UserController@show');

    Route::post('/users/update', 'UserController@update');

    Route::post('/users/create', 'UserController@store');

    Route::post('/users/delete', 'UserController@delete');

    Route::post('/contact/create', 'ContactController@store');


});
