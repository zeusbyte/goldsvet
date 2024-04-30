<?php

use Illuminate\Support\Facades\Route;
use VanguardLTE\Http\Controllers\Api\V2\AtmController;

Route::group(['middleware' => ['ipcheck']], function () {

    Route::post('/demo', ['uses' => 'BasicController@index']);
    Route::post('/agent/trial', ['uses' => 'BasicController@agent']);

	Route::post('login', 'Auth\AuthController@login');
	Route::post('logout', 'Auth\AuthController@logout');

    if (settings('reg_enabled')) {
        Route::post('register', 'Auth\RegistrationController@index');
        if (settings('use_email')) {
            Route::post('register/verify-email/{token}', 'Auth\RegistrationController@verifyEmail');
        }
    }

    if (settings('forgot_password')) {
        Route::post('password/remind', 'Auth\Password\RemindController@index');
        Route::post('password/reset', 'Auth\Password\ResetController@index');
    }


	Route::get('me', 'Profile\DetailsController@index');
	Route::patch('me/details', 'Profile\DetailsController@update');
	Route::get('me/refund', 'Profile\DetailsController@refunds');
    Route::post('pincodes/check', 'Profile\DetailsController@check');
    Route::post('sms', 'Profile\DetailsController@sms');

    Route::post('me/balance', 'Profile\DetailsController@balance');

    Route::resource('users', 'Users\UsersController', [
        'except' => ['create']
    ]);
    Route::post('users/mass', 'Users\UsersController@mass');
    Route::put('users/{user}/balance/{type}', 'Users\BalanceController@balance');


    Route::get('shops', ['uses' => 'ShopController@index']);
    Route::get('shops/currency', ['uses' => 'ShopController@currency']);
    Route::put('shops/{shop}/balance/{type}', ['uses' => 'ShopController@balance']);
    Route::put('shops/block', ['uses' => 'ShopController@shop_block', 'middleware' => 'permission_api:shops.block']);
    Route::put('shops/unblock', ['uses' => 'ShopController@shop_unblock', 'middleware' => 'permission_api:shops.unblock']);
    Route::get('shops/{id}/view', ['uses' => 'ShopController@view']);
    Route::post('shops/create', ['uses' => 'ShopController@store']);
    Route::put('shops/{shop}/update', ['uses' => 'ShopController@update']);
    Route::post('shops/admin', ['uses' => 'ShopController@admin']);
    Route::delete('shops/{id}/destroy', ['uses' => 'ShopController@destroy']);

    Route::get('pincodes', 'PincodessController@index');
    Route::post('pincodes/store', 'PincodessController@store');
    Route::post('pincodes/mass', 'PincodessController@mass');

    Route::put('pincodes/{pincode}/update', ['uses' => 'PincodessController@update']);
    Route::delete('pincodes/{pincode}/destroy', ['uses' => 'PincodessController@destroy']);


	Route::get('games', 'Games\GamesController@index');
    Route::get('category', 'Categories\CategoriesController@index');
	Route::get('jackpots', 'Jackpots\JackpotsController@index');


	Route::get('stats/pay', 'GameStats\GameStatsController@pay');
    Route::get('stats/game', 'GameStats\GameStatsController@game');
    Route::get('stats/shift', 'GameStats\GameStatsController@shift');
    Route::put('shifts/start', 'OpenShiftController@start_shift');
    Route::get('shifts/info', 'OpenShiftController@info');
    Route::get('happyhours', 'HappyHourController@index');
    Route::get('paysystems', 'GeneralController@paysystems');
	
});	
// Custom api's
Route::get('player/getlic', 'Player\LicenseController@AskForLicense');
Route::post('player/licsaved', 'Player\LicenseController@LicSaved');


Route::get('player/isonline', 'Player\StatusController@checkUsecheckUserOnline');
Route::get('player/check-user-login', 'Player\StatusController@checkUserLogin');
Route::get('player/testlogin', 'Player\StatusController@checkUserLoginSyn');
Route::get('player/apilogin/{token}', 'Player\StatusController@apiLogin');
Route::get('player/read', 'Player\StatusController@getUserData');
Route::get('player/score', 'Player\StatusController@checkUserScore');

Route::get('player/withdrawticket', 'Player\TicketController@payoutTicket');


													  
																		  
																				 
Route::get('credits', 'Player\CreditController@index');
Route::get('credits/depositusb', 'Player\CreditController@creditsDeposit');
Route::get('credits/pending-depositusb', 'Player\CreditController@pendingCashIN');

Route::get('cashier/readbalance', 'Player\StatusController@loadShopBalance');
Route::get('cashier/readinamounts', 'Player\StatusController@loadInAmounts');

									   
																		
																		  
																							
																	 
// ==========================================================================================
// V3 APIs Newly developed - 17-07-2021 
Route::post('/V2', [AtmController::class, 'index']);


/*
Route::prefix('V2')->group(function () {
    // Credit relatedAPIs
    Route::post('/player/depositusb', 'V2\CreditController@creditsDeposit');
    Route::post('/player/withdrawusb', 'V2\CreditController@creditsWithdraw');
    Route::post('/player/withdrawusbcashout', 'V2\CreditController@creditsWithdrawAndCashOut');
    Route::post('/player/withdrawticket', 'V2\CreditController@payoutTicket');

    // ATM APIs
    Route::post('/atm/ping', 'V2\AtmControler@atmPing');

    //=====================
    Route::post('/player/activate', 'V2\AtmControler@activateUser');
    Route::post('/player/checkbarcode', 'V2\AtmControler@checkBarcodeAsync');
    Route::post('/player/updatebarcode', 'V2\AtmControler@saveBarcodeAsync');
    Route::post('/player/deposit', 'V2\AtmControler@PendingCashIN');
    Route::post('/player/forgotpassword', 'V2\AtmControler@forgotPass');
    Route::post('/player/resetpassword', 'V2\AtmControler@resetPass');
    Route::post('/player/checkmagcard', 'V2\AtmControler@checkMagCardAsync');
    Route::post('/player/checkpanic', 'V2\AtmControler@checkForPanic');
    //Route::post('/player/deposit', 'V2\AtmControler@PendingCashIN');

														   
    Route::post('/player/createuservoucher', 'V2\AtmControler@createUser');
    Route::post('/atm/updaterec', 'V2\AtmControler@updateRecServer');
    Route::post('/player/readcredits', 'V2\AtmControler@checkServerCreditsAsync');
    Route::post('/player/deposit', 'V2\AtmControler@CashINAsync');
    Route::post('/player/create', 'V2\AtmControler@createUserAsync');
    Route::post('/player/createupdatecode', 'V2\AtmControler@createUpdateCode');
    Route::post('/player/update', 'V2\AtmControler@SaveSettings');
    Route::post('/player/login', 'V2\AtmControler@checkSignInAsync');
    Route::post('/player/vouchersignin', 'V2\AtmControler@checkVoucherAsync');
    Route::post('/player/createwcode', 'V2\AtmControler@createWithdrawCodeAsync');
    Route::post('/player/withdraw', 'V2\AtmControler@CashOUTAsync');
});
*/

