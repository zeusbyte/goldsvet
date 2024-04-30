<?php
use Illuminate\Support\Facades\Route;

Route::namespace ('Frontend')->middleware(['siteisclosed', 'checker'])->group(function ()
{

    Route::get('login', ['as' => 'frontend.auth.login', 'uses' => 'Auth\AuthController@getLogin']);

    Route::get('launcher/{game}/{token}', 'Auth\AuthController@apiLogin');

    Route::get('refresh-csrf', function ()
    {
        return csrf_token();
    });

    Route::post('login', ['as' => 'frontend.auth.login.post', 'uses' => 'Auth\AuthController@postLogin']);
    Route::get('logout', ['as' => 'frontend.auth.logout', 'uses' => 'Auth\AuthController@getLogout']);

    Route::get('/specauth/{user}', ['as' => 'frontend.user.specauth', 'uses' => 'Auth\AuthController@specauth', ]);

    // Allow registration routes only if registration is enabled.
    if (settings('reg_enabled') || true)
    {

        Route::get('register', ['as' => 'frontend.register', 'uses' => 'Auth\AuthController@getRegister']);

        Route::post('register', ['as' => 'frontend.register.post', 'uses' => 'Auth\AuthController@postRegister']);

    }

    Route::get('register/confirmation/{token}', ['as' => 'frontend.register.confirm-email', 'uses' => 'Auth\AuthController@confirmEmail']);

    if (settings('forgot_password') || true) {

        Route::get('password/remind', [
            'as' => 'frontend.password.remind',
            'uses' => 'Auth\PasswordController@forgotPassword'
        ]);
        Route::post('password/remind', [
            'as' => 'frontend.password.remind.post',
            'uses' => 'Auth\PasswordController@sendPasswordReminder'
        ]);
        Route::get('password/reset/{token}', [
            'as' => 'frontend.password.reset',
            'uses' => 'Auth\PasswordController@getReset'
        ]);
        Route::post('password/reset', [
            'as' => 'frontend.password.reset.post',
            'uses' => 'Auth\PasswordController@postReset'
        ]);
    }

    Route::get('new-license', ['as' => 'frontend.new_license', 'uses' => 'PagesController@new_license']);
    Route::post('new-license', ['as' => 'frontend.new_license.post', 'uses' => 'PagesController@new_license_post']);

    Route::get('license-error', ['as' => 'frontend.page.error_license', 'uses' => 'PagesController@error_license']);

    Route::get('jpstv/{id?}', ['as' => 'frontend.jpstv', 'uses' => 'PagesController@jpstv']);

    Route::get('jpstv.json', ['as' => 'frontend.jpstv_json', 'uses' => 'PagesController@jpstv_json']);

    /**
     * Dashboard
     */

    /*
    Route::get('statistics', [
        'as' => 'frontend.statistics',
        'uses' => 'DashboardController@statistics'
    ]);
    */
    Route::get('subsession', ['as' => 'frontend.subsession', 'uses' => 'GamesController@subsession']);

    /**
     * User Profile
     */

    Route::get('profile', ['as' => 'frontend.profile', 'uses' => 'ProfileController@index']);
    Route::get('profile/activity', ['as' => 'frontend.profile.activity', 'uses' => 'ProfileController@activity']);

    Route::post('profile/details/update', ['as' => 'frontend.profile.update.details', 'uses' => 'ProfileController@updateDetails']);
    Route::post('profile/password/update', ['as' => 'frontend.profile.update.password', 'uses' => 'ProfileController@updatePassword']);
    Route::post('profile/avatar/update', ['as' => 'frontend.profile.update.avatar', 'uses' => 'ProfileController@updateAvatar']);
    Route::post('profile/avatar/update/external', ['as' => 'frontend.profile.update.avatar-external', 'uses' => 'ProfileController@updateAvatarExternal']);

    Route::get('profile/clear_phone', ['as' => 'frontend.clear_phone', 'uses' => 'ProfileController@clear_phone']);

    Route::post('profile/contact', ['as' => 'frontend.profile.contact', 'uses' => 'ProfileController@contact_form']);

    Route::put('profile/login-details/update', ['as' => 'frontend.profile.update.login-details', 'uses' => 'ProfileController@updateLoginDetails']);
    Route::post('profile/two-factor/enable', ['as' => 'frontend.profile.two-factor.enable', 'uses' => 'ProfileController@enableTwoFactorAuth']);
    Route::post('profile/two-factor/disable', ['as' => 'frontend.profile.two-factor.disable', 'uses' => 'ProfileController@disableTwoFactorAuth']);
    Route::get('profile/sessions', ['as' => 'frontend.profile.sessions', 'uses' => 'ProfileController@sessions']);
    Route::delete('profile/sessions/{session}/invalidate', ['as' => 'frontend.profile.sessions.invalidate', 'uses' => 'ProfileController@invalidateSession']);

    Route::get('profile/refunds', ['as' => 'frontend.profile.refunds', 'uses' => 'ProfileController@refunds']);

    Route::get('profile/ajax', ['as' => 'frontend.profile.ajax', 'uses' => 'ProfileController@ajax']);

    Route::get('profile/message', ['as' => 'frontend.profile.message', 'uses' => 'ProfileController@message']);

    Route::get('profile/pincode', ['as' => 'frontend.profile.pincode', 'uses' => 'ProfileController@pincode']);

    Route::get('profile/daily_entry', ['as' => 'frontend.profile.daily_entry', 'uses' => 'ProfileController@daily_entry']);

    Route::get('profile/phone', ['as' => 'frontend.profile.phone', 'uses' => 'ProfileController@phone']);

    Route::get('profile/code', ['as' => 'frontend.profile.code', 'uses' => 'ProfileController@code']);

    Route::get('profile/agree', ['as' => 'frontend.profile.agree', 'uses' => 'ProfileController@agree']);

    Route::get('profile/reward', ['as' => 'frontend.profile.reward', 'uses' => 'ProfileController@reward']);

    Route::get('profile/sms', ['as' => 'frontend.profile.sms', 'uses' => 'ProfileController@sms']);

    Route::get('setlang/{lang}', ['as' => 'frontend.setlang', 'uses' => 'ProfileController@setlang']);

    Route::post('profile/withdraw', ['as' => 'frontend.profile.withdraw', 'uses' => 'ProfileController@withdraw']);

    /**
     * Games routes
     */

    Route::get('/', ['as' => 'frontend.game.list', 'uses' => 'GamesController@index']);
    Route::get('/faq', ['as' => 'frontend.faq', 'uses' => 'GamesController@faq', ]);

    Route::get('/bonuses', ['as' => 'frontend.bonuses', 'uses' => 'GamesController@bonuses', ]);
    Route::get('/bonus-conditions', ['as' => 'frontend.bonus.conditions', 'uses' => 'GamesController@bonus_conditions', ]);
    Route::get('/progress', ['as' => 'frontend.progress', 'uses' => 'GamesController@progress', ]);
    Route::get('/search', ['as' => 'frontend.game.search', 'uses' => 'GamesController@search']);
    Route::get('/search.json', ['as' => 'frontend.search.json', 'uses' => 'GamesController@search_json']);
    Route::post('balance', ['as' => 'frontend.balance.post', 'uses' => 'GamesController@balanceAdd']);

    /*
    Route::get('games', [
        'as' => 'frontend.game.list',
        'uses' => 'GamesController@index'
    ]);
    */

    Route::get('categories/{category1}', ['as' => 'frontend.game.list.category', 'uses' => 'GamesController@index']);

    Route::get('categories/{category1}/{category2}', ['as' => 'frontend.game.list.category_level2', 'uses' => 'GamesController@index']);

    Route::get('setpage.json', ['as' => 'frontend.category.setpage', 'uses' => 'GamesController@setpage']);

    Route::get('game/{game}', ['as' => 'frontend.game.go', 'uses' => 'GamesController@go']);
    Route::post('game/{game}/server', ['as' => 'frontend.game.server', 'uses' => 'GamesController@server']);

    Route::get('game/{game}/{prego}', ['as' => 'frontend.game.go.prego', 'uses' => 'GamesController@go']);

    Route::get('/game_stat', ['as' => 'frontend.game_stat', 'uses' => 'GamesController@game_stat', ]);

    Route::get('/tournaments', ['as' => 'frontend.tournaments', 'uses' => 'TournamentsController@index', ]);
    Route::get('/tournaments/{tournament}', ['as' => 'frontend.tournaments.view', 'uses' => 'TournamentsController@view', ]);

    Route::prefix('payment')->group(function ()
    {
        Route::post('/interkassa/result', ['as' => 'payment.interkassa.result', 'uses' => 'Payment\InterkassaController@index']);
        Route::get('/interkassa/success', ['as' => 'payment.interkassa.success', 'uses' => 'Payment\InterkassaController@success']);
        Route::get('/interkassa/fail', ['as' => 'payment.interkassa.fail', 'uses' => 'Payment\InterkassaController@fail']);
        Route::get('/interkassa/wait', ['as' => 'payment.interkassa.wait', 'uses' => 'Payment\InterkassaController@wait']);

        Route::post('/coinbase/result', ['as' => 'payment.coinbase.result', 'uses' => 'Payment\CoinbaseController@index']);
        Route::get('/coinbase/success', ['as' => 'payment.coinbase.success', 'uses' => 'Payment\CoinbaseController@success']);
        Route::get('/coinbase/fail', ['as' => 'payment.coinbase.fail', 'uses' => 'Payment\CoinbaseController@fail']);

        Route::post('/btcpayserver/result', ['as' => 'payment.btcpayserver.result', 'uses' => 'Payment\BtcPayServerController@index']);
        Route::get('/btcpayserver/redirect', ['as' => 'payment.btcpayserver.redirect', 'uses' => 'Payment\BtcPayServerController@redirect']);

    });

    Route::post('/sms/callback', ['as' => 'sms.callback', 'uses' => 'SMSController@index']);

    Route::post('/coin-payment/create', "Payment\CoinPaymentController@store")
        ->name('coin-payment.create');
    Route::get('/coin-payment/show/{transaction_id}', "Payment\CoinPaymentController@show");

});

/**
 *
 *
 *
 ******************* BACKEND
 *
 *
 *
 */

Route::prefix('backend')
    ->middleware(['checker'])->group(function ()
{
    Route::namespace ('Backend')->group(function ()
    {
        Route::get('login', ['as' => 'backend.auth.login', 'uses' => 'Auth\AuthController@getLogin']);
        Route::post('login', ['as' => 'backend.auth.login.post', 'uses' => 'Auth\AuthController@postLogin']);

    });
});

Route::prefix('backend')
    ->middleware(['auth', 'checker'])->group(function ()
{
    Route::namespace ('Backend')->group(function ()
    {

        Route::get('logout', ['as' => 'backend.auth.logout', 'uses' => 'Auth\AuthController@getLogout']);

        Route::post('/2fa', function ()
        {
            return redirect(URL()
                ->previous());
        })
            ->name('2fa')
            ->middleware('2fa');

        /**
         * Dashboard
         */

        // TERMINAL
        Route::get('/terminal', 'TerminalController@index');
        Route::post('/terminal/create', 'TerminalController@craeteTerminal');
        Route::get('/terminal/details/{id}', 'TerminalController@detailsTerminal');
        Route::post('/terminal/details/{id}', 'TerminalController@terminalUpdate');
        Route::post('/terminal/balance/add', 'TerminalController@balanceAdd');
        Route::post('/terminal/balance/out', 'TerminalController@balanceOut');
        Route::post('/terminal/ajax/pay-tickets', 'TerminalController@ajaxPayTickets');

        // ATM
        Route::get('/atm', 'AtmController@index');
        Route::get('/atm/create', 'AtmController@createNewAtm');
        Route::get('/atm/reset', 'AtmController@resetAtm');
        Route::get('/atm/status/{status}', 'AtmController@statusUpdate');
        Route::get('/atm/newkey/{api_id}', 'AtmController@newApiKey');
        Route::get('/atm/delete/{id}/{api_id}', 'AtmController@deleteATM');

Route::redirect('/netpos', '/backend/user')->name('netpos');

        //Route::get('netpos', ['as' => 'netpos', 'uses' => 'DashboardController@shopIndex', ]);
        // Route::get('/new/user', [
        //     'as' => 'netpos.user.new',
        //     'uses' => 'UsersController@netposCreate',
        //     'middleware' => 'permission:users.add'
        // ]);
        // Route::put('/update/profile/{user}', [
        //     'as' => 'netpos.user.update',
        //     'uses' => 'UsersController@updateUserDetails',
        //     'middleware' => 'permission:users.add'
        // ]);
        // Route::get('/shop/transactions', [
        //     'as' => 'netpos.transactionsApi',
        //     'uses' => 'DashboardController@shopTransactions',
        //     //
        // ]);
        // Route::get('/transactions', [
        //     'as' => 'netpos.transactions',
        //     'uses' => 'DashboardController@transactions',
        //     //
        // ]);
        // Route::get('/cashiers/profile', [
        //     'as' => 'netpos.cashier.profile',
        //     'uses' => 'DashboardController@cashierProfile',
        //     //
        // ]);
        // Route::get('/jackpot', [
        //     'as' => 'netpos.jackpot',
        //     'uses' => 'DashboardController@jackpots',
        //     //
        // ]);
        // Route::get('get/logs', [
        //     'as' => 'netpos.logs',
        //     'uses' => 'DashboardController@logs',
        //     //
        // ]);
        Route::get('/withdraw', ['as' => 'backend.withdraw', 'uses' => 'DashboardController@withdraw', ]);

        Route::get('/search', ['as' => 'backend.search', 'uses' => 'DashboardController@search', ]);

        Route::get('/', ['as' => 'backend.dashboard', 'uses' => 'DashboardController@index',
        //
        ]);
        Route::get('/game_stat', ['as' => 'backend.game_stat', 'uses' => 'DashboardController@game_stat', 'middleware' => 'permission:stats.game', ]);

        Route::get('/shift_stat', ['as' => 'backend.shift_stat', 'uses' => 'DashboardController@shift_stat', 'middleware' => 'permission:stats.shift', ]);

        Route::get('/transactions', ['as' => 'backend.transactions', 'uses' => 'DashboardController@transactions', 'middleware' => 'permission:stats.pay', ]);

        Route::get('/start_shift', ['as' => 'backend.start_shift', 'uses' => 'DashboardController@start_shift']);

        Route::get('/start_shift/print', ['as' => 'backend.start_shift.print', 'uses' => 'DashboardController@start_shift_print']);

        Route::get('/invite', ['as' => 'backend.invites', 'uses' => 'DashboardController@invites', 'middleware' => ['permission:invite.manage', 'shopzero'], ]);
        Route::get('invite/status/{status}', ['as' => 'backend.invite.status', 'uses' => 'DashboardController@invite_status', 'middleware' => ['permission:invite.edit', 'shopzero'], ]);

        Route::post('/invite', ['as' => 'backend.invites.update', 'uses' => 'DashboardController@invite_update', 'middleware' => ['permission:invite.edit', 'shopzero'], ]);

        Route::get('/wheelfortune', ['as' => 'backend.wheelfortune', 'uses' => 'DashboardController@wheelfortune', 'middleware' => ['permission:wheelfortune.manage', 'shopzero'], ]);
        Route::get('wheelfortune/status/{status}', ['as' => 'backend.wheelfortune.status', 'uses' => 'DashboardController@wheelfortune_status', 'middleware' => ['permission:wheelfortune.manage', 'shopzero'], ]);

        Route::post('/wheelfortune', ['as' => 'backend.wheelfortune.update', 'uses' => 'DashboardController@wheelfortune_update', 'middleware' => ['permission:wheelfortune.manage', 'shopzero'], ]);

        Route::get('/banks', ['as' => 'backend.banks', 'uses' => 'DashboardController@banks', 'middleware' => ['shopzero', 'only_for_admin'], ]);

        Route::post('/banks', ['as' => 'backend.banks.update', 'uses' => 'DashboardController@banks_update', 'middleware' => 'only_for_admin']);

        Route::post('/banks/update', ['as' => 'backend.banks.update.do', 'uses' => 'DashboardController@do_banks_update', 'middleware' => 'only_for_admin']);

        /**
         * User Profile
         */

        Route::get('profile', ['as' => 'backend.profile', 'uses' => 'ProfileController@index']);
        Route::get('balance', ['as' => 'backend.balance', 'uses' => 'ProfileController@balance']);

        Route::get('profile/activity', ['as' => 'backend.profile.activity', 'uses' => 'ProfileController@activity']);
        Route::put('profile/details/update', ['as' => 'backend.profile.update.details', 'uses' => 'ProfileController@updateDetails']);
        Route::post('profile/avatar/update', ['as' => 'backend.profile.update.avatar', 'uses' => 'ProfileController@updateAvatar']);
        Route::post('profile/avatar/update/external', ['as' => 'backend.profile.update.avatar-external', 'uses' => 'ProfileController@updateAvatarExternal']);
        Route::put('profile/login-details/update', ['as' => 'backend.profile.update.login-details', 'uses' => 'ProfileController@updateLoginDetails']);
        Route::post('profile/two-factor/enable', ['as' => 'backend.profile.two-factor.enable', 'uses' => 'ProfileController@enableTwoFactorAuth']);
        Route::post('profile/two-factor/disable', ['as' => 'backend.profile.two-factor.disable', 'uses' => 'ProfileController@disableTwoFactorAuth']);
        Route::get('profile/sessions', ['as' => 'backend.profile.sessions', 'uses' => 'ProfileController@sessions']);
        Route::delete('profile/sessions/{session}/invalidate', ['as' => 'backend.profile.sessions.invalidate', 'uses' => 'ProfileController@invalidateSession']);
        Route::match(['get', 'post'], 'profile/setshop', ['as' => 'backend.profile.setshop', 'uses' => 'ProfileController@setshop']);

        /**
         * User Management
         */

        Route::get('user', ['as' => 'backend.user.list', 'uses' => 'UsersController@index', 'middleware' => 'permission:users.manage']);

        Route::get('tree', ['as' => 'backend.user.tree', 'uses' => 'UsersController@tree', 'middleware' => 'permission:users.tree']);
        /*
        Route::get('statistics', [
            'as' => 'backend.statistics',
            'uses' => 'DashboardController@statistics',
            'middleware' => 'permission:stats.pay',
        ]);
        */
        Route::get('user/balances', ['uses' => 'UsersController@get_balance', 'as' => 'backend.user.balance.get', ]);

        Route::post('profile/balance/update', ['uses' => 'UsersController@updateBalance', 'as' => 'backend.user.balance.update', ]);
        Route::post('profile/limit/update', ['uses' => 'UsersController@updateLimit', 'as' => 'backend.user.limit.update', ]);
        Route::get('user/create', ['as' => 'backend.user.create', 'uses' => 'UsersController@create', 'middleware' => 'permission:users.add']);
        Route::post('user/create', ['as' => 'backend.user.store', 'uses' => 'UsersController@store', 'middleware' => 'permission:users.add']);
        Route::get('user/{user}/stat', ['as' => 'backend.user.stat', 'uses' => 'UsersController@statistics']);
        Route::get('/user/{user}/specauth', ['as' => 'backend.user.specauth', 'uses' => 'UsersController@specauth', ]);
        Route::get('/user/back_login', ['as' => 'backend.user.back_login', 'uses' => 'UsersController@back_login', ]);
        Route::get('/user/send_phone_code', ['as' => 'backend.profile.send_phone_code', 'uses' => 'UsersController@send_phone_code', ]);

        Route::post('user/mass', ['as' => 'backend.user.massadd', 'uses' => 'UsersController@massadd', 'middleware' => 'permission:users.add']);
        Route::get('user/{user}/show', ['as' => 'backend.user.show', 'uses' => 'UsersController@view']);
        Route::get('user/{user}/profile', ['as' => 'backend.user.edit', 'uses' => 'UsersController@edit', 'middleware' => 'permission:users.edit']);
        Route::put('user/{user}/update/details', ['as' => 'backend.user.update.details', 'uses' => 'UsersController@updateDetails', 'middleware' => 'permission:users.edit']);
        Route::put('user/{user}/update/login-details', ['as' => 'backend.user.update.login-details', 'uses' => 'UsersController@updateLoginDetails', 'middleware' => 'permission:users.edit']);
        Route::delete('user/{user}/delete', ['as' => 'backend.user.delete', 'uses' => 'UsersController@delete', 'middleware' => 'permission:users.delete']);
        Route::delete('user/{user}/hard_delete', ['as' => 'backend.user.hard_delete', 'uses' => 'UsersController@hard_delete', 'middleware' => 'permission:users.delete']);
        Route::post('user/{user}/update/avatar', ['as' => 'backend.user.update.avatar', 'uses' => 'UsersController@updateAvatar']);
        Route::post('user/{user}/update/avatar/external', ['as' => 'backend.user.update.avatar.external', 'uses' => 'UsersController@updateAvatarExternal']);
        Route::get('user/{user}/sessions', ['as' => 'backend.user.sessions', 'uses' => 'UsersController@sessions']);
        Route::delete('user/{user}/sessions/{session}/invalidate', ['as' => 'backend.user.sessions.invalidate', 'uses' => 'UsersController@invalidateSession']);
        Route::post('user/{user}/two-factor/enable', ['as' => 'backend.user.two-factor.enable', 'uses' => 'UsersController@enableTwoFactorAuth']);
        Route::post('user/{user}/two-factor/disable', ['as' => 'backend.user.two-factor.disable', 'uses' => 'UsersController@disableTwoFactorAuth']);

        Route::delete('user/action/{action}', ['as' => 'backend.user.action', 'uses' => 'UsersController@action', ]);

        /**
         * Games routes
         */

        Route::get('game', ['as' => 'backend.game.list', 'uses' => 'GamesController@index', 'middleware' => 'permission:games.manage']);
        Route::get('games.json', ['as' => 'backend.game.list.json', 'uses' => 'GamesController@index_json']);
        Route::get('game/create', ['as' => 'backend.game.create', 'uses' => 'GamesController@create', ]);
        Route::post('game/create', ['as' => 'backend.game.store', 'uses' => 'GamesController@store', ]);
        Route::get('game/{game}/show', ['as' => 'backend.game.show', 'uses' => 'GamesController@view', ]);
        Route::get('game/{game}', ['as' => 'backend.game.go', 'uses' => 'GamesController@go']);
        Route::post('/game/{game}/server', ['as' => 'backend.game.server', 'uses' => 'GamesController@server']);
        Route::get('game/{game}/edit', ['as' => 'backend.game.edit', 'uses' => 'GamesController@edit', ]);
        Route::post('game/{game}/update', ['as' => 'backend.game.update', 'uses' => 'GamesController@update', ]);
        Route::delete('game/{game}/delete', ['as' => 'backend.game.delete', 'uses' => 'GamesController@delete', ]);
        Route::post('game/categories', ['as' => 'backend.game.categories', 'uses' => 'GamesController@categories', ]);
        Route::post('game/update/mass', ['as' => 'backend.game.mass', 'uses' => 'GamesController@mass', ]);
        Route::post('game/update/view', ['as' => 'backend.game.view', 'uses' => 'GamesController@views', ]);
        Route::put('game/clear', ['as' => 'backend.game.clear', 'uses' => 'GamesController@clear_games', ]);

        /**
         * Categories routes
         */

        Route::get('category', ['as' => 'backend.category.list', 'uses' => 'CategoriesController@index', 'middleware' => 'only_for_admin']);
        Route::get('category/create', ['as' => 'backend.category.create', 'uses' => 'CategoriesController@create', 'middleware' => 'only_for_admin']);
        Route::post('category/create', ['as' => 'backend.category.store', 'uses' => 'CategoriesController@store', 'middleware' => 'only_for_admin']);
        Route::get('category/{category}/edit', ['as' => 'backend.category.edit', 'uses' => 'CategoriesController@edit', 'middleware' => 'only_for_admin']);
        Route::post('category/{category}/update', ['as' => 'backend.category.update', 'uses' => 'CategoriesController@update', 'middleware' => 'only_for_admin']);
        Route::delete('category/{category}/delete', ['as' => 'backend.category.delete', 'uses' => 'CategoriesController@delete', 'middleware' => 'only_for_admin']);

        /**
         * Categories routes
         */

        Route::get('shops', ['as' => 'backend.shop.list', 'uses' => 'ShopsController@index', 'middleware' => 'permission:shops.manage']);
        Route::get('shops/create', ['as' => 'backend.shop.create', 'uses' => 'ShopsController@create', 'middleware' => 'permission:shops.add']);
        Route::post('shops/create', ['as' => 'backend.shop.store', 'uses' => 'ShopsController@store', 'middleware' => 'permission:shops.add']);

        Route::get('shops/admin/create', ['as' => 'backend.shop.admin_create', 'uses' => 'ShopsController@admin_create', 'middleware' => 'permission:shops.manage']);
        Route::post('shops/admin/create', ['as' => 'backend.shop.admin_store', 'uses' => 'ShopsController@admin_store', 'middleware' => 'permission:shops.manage']);
        Route::get('shops/get_demo', ['as' => 'backend.shop.get_demo', 'uses' => 'ShopsController@get_demo', 'middleware' => 'permission:shops.free_demo']);

        Route::get('shops/fast_shop', ['as' => 'backend.shop.fast_shop', 'uses' => 'ShopsController@fast_shop', 'middleware' => 'permission:shops.manage']);

        Route::get('shops/{shop}/edit', ['as' => 'backend.shop.edit', 'uses' => 'ShopsController@edit', 'middleware' => 'permission:shops.manage']);
        Route::post('shops/{shop}/update', ['as' => 'backend.shop.update', 'uses' => 'ShopsController@update', 'middleware' => 'permission:shops.manage']);
        Route::post('shops/balance', ['as' => 'backend.shop.balance', 'uses' => 'ShopsController@balance', 'middleware' => 'permission:shops.manage']);
        Route::delete('shops/{shop}/delete', ['as' => 'backend.shop.delete', 'uses' => 'ShopsController@delete', 'middleware' => 'permission:shops.delete']);
        Route::delete('shops/{shop}/hard_delete', ['as' => 'backend.shop.hard_delete', 'uses' => 'ShopsController@hard_delete', 'middleware' => 'permission:shops.hard_delete']);
        Route::delete('shops/{shop}/action/{action}', ['as' => 'backend.shop.action', 'uses' => 'ShopsController@action', 'middleware' => 'permission:shops.manage']);

        /**
         * Pincodes routes
         */

        Route::get('pincodes', ['as' => 'backend.pincode.list', 'uses' => 'PincodeController@index', 'middleware' => 'permission:pincodes.manage']);
        Route::get('pincodes/create', ['as' => 'backend.pincode.create', 'uses' => 'PincodeController@create', 'middleware' => 'permission:pincodes.add']);
        Route::post('pincodes/create', ['as' => 'backend.pincode.store', 'uses' => 'PincodeController@store', 'middleware' => 'permission:pincodes.add']);
        Route::post('pincodes/mass/create', ['as' => 'backend.pincode.massadd', 'uses' => 'PincodeController@massadd', 'middleware' => 'permission:pincodes.add']);
        Route::get('pincodes/{pincode}/edit', ['as' => 'backend.pincode.edit', 'uses' => 'PincodeController@edit', 'middleware' => 'permission:pincodes.edit']);
        Route::post('pincodes/{pincode}/update', ['as' => 'backend.pincode.update', 'uses' => 'PincodeController@update', 'middleware' => 'permission:pincodes.edit']);
        Route::post('pincodes/balance', ['as' => 'backend.pincode.balance', 'uses' => 'PincodeController@balance', ]);
        Route::delete('pincodes/{pincode}/delete', ['as' => 'backend.pincode.delete', 'uses' => 'PincodeController@delete', 'middleware' => 'permission:pincodes.delete']);

        /*
         *
         * Credits
         *
         * */

        Route::get('credits', ['as' => 'backend.credit.list', 'uses' => 'CreditController@index', ]);
        Route::get('credits/create', ['as' => 'backend.credit.create', 'uses' => 'CreditController@create', ]);
        Route::post('credits/create', ['as' => 'backend.credit.store', 'uses' => 'CreditController@store', ]);
        Route::get('credits/{credit}/edit', ['as' => 'backend.credit.edit', 'uses' => 'CreditController@edit', ]);
        Route::post('credits/{credit}/update', ['as' => 'backend.credit.update', 'uses' => 'CreditController@update', ]);
        Route::delete('credits/{credit}/delete', ['as' => 'backend.credit.delete', 'uses' => 'CreditController@delete', ]);

        Route::get('credits/{credit}/buy', ['as' => 'backend.credit.buy', 'uses' => 'CreditController@buy', ]);
        Route::get('credits/{credit}/buy/{system}', ['as' => 'backend.credit.payment', 'uses' => 'CreditController@payment', ]);

        /**
         * Happyhours routes
         */

        Route::get('happyhours', ['as' => 'backend.happyhour.list', 'uses' => 'HappyHourController@index', 'middleware' => 'permission:happyhours.manage']);
        Route::get('happyhours/create', ['as' => 'backend.happyhour.create', 'uses' => 'HappyHourController@create', 'middleware' => 'permission:happyhours.add']);
        Route::post('happyhours/create', ['as' => 'backend.happyhour.store', 'uses' => 'HappyHourController@store', 'middleware' => 'permission:happyhours.add']);
        Route::get('happyhours/{happyhour}/edit', ['as' => 'backend.happyhour.edit', 'uses' => 'HappyHourController@edit', ]);
        Route::post('happyhours/{happyhour}/update', ['as' => 'backend.happyhour.update', 'uses' => 'HappyHourController@update', ]);
        Route::delete('happyhours/{happyhour}/delete', ['as' => 'backend.happyhour.delete', 'uses' => 'HappyHourController@delete', 'middleware' => 'permission:happyhours.delete']);
        Route::get('happyhours/status/{status}', ['as' => 'backend.happyhour.status', 'uses' => 'HappyHourController@status', ]);

        /**
         * Happyhours routes
         */

        Route::get('welcome_bonuses', ['as' => 'backend.welcome_bonus.list', 'uses' => 'WelcomeBonusController@index', 'middleware' => 'permission:welcome_bonuses.manage']);
        Route::get('welcome_bonuses/{welcome_bonus}/edit', ['as' => 'backend.welcome_bonus.edit', 'uses' => 'WelcomeBonusController@edit', 'middleware' => 'permission:welcome_bonuses.edit']);
        Route::post('welcome_bonuses/{welcome_bonus}/update', ['as' => 'backend.welcome_bonus.update', 'uses' => 'WelcomeBonusController@update', 'middleware' => 'permission:welcome_bonuses.edit']);
        Route::get('welcome_bonuses/status/{status}', ['as' => 'backend.welcome_bonus.status', 'uses' => 'WelcomeBonusController@status', ]);

        /**
         * Info routes
         */

        Route::get('info', ['as' => 'backend.info.list', 'uses' => 'InfoController@index', 'middleware' => 'only_for_admin']);
        Route::get('info/create', ['as' => 'backend.info.create', 'uses' => 'InfoController@create', 'middleware' => 'only_for_admin']);
        Route::post('info/create', ['as' => 'backend.info.store', 'uses' => 'InfoController@store', 'middleware' => 'only_for_admin']);
        Route::get('info/{info}/edit', ['as' => 'backend.info.edit', 'uses' => 'InfoController@edit', 'middleware' => 'only_for_admin']);
        Route::post('info/{info}/update', ['as' => 'backend.info.update', 'uses' => 'InfoController@update', 'middleware' => 'only_for_admin']);
        Route::post('info/balance', ['as' => 'backend.info.balance', 'uses' => 'InfoController@balance', 'middleware' => 'only_for_admin']);
        Route::delete('info/{info}/delete', ['as' => 'backend.info.delete', 'uses' => 'InfoController@delete', 'middleware' => 'only_for_admin']);

        /**
         * Info routes
         */

        Route::get('api', ['as' => 'backend.api.list', 'uses' => 'ApiController@index', 'middleware' => 'permission:api.manage']);
        Route::get('api/create', ['as' => 'backend.api.create', 'uses' => 'ApiController@create', 'middleware' => 'permission:api.add', ]);
        Route::post('api/create', ['as' => 'backend.api.store', 'uses' => 'ApiController@store', 'middleware' => 'permission:api.add', ]);
        Route::get('api/generate', ['as' => 'backend.api.generate', 'uses' => 'ApiController@generate', ]);
        Route::get('api/json', ['as' => 'backend.api.json', 'uses' => 'ApiController@json', ]);
        Route::get('api/{api}/edit', ['as' => 'backend.api.edit', 'uses' => 'ApiController@edit', 'middleware' => 'permission:api.edit']);
        Route::post('api/{api}/update', ['as' => 'backend.api.update', 'uses' => 'ApiController@update', 'middleware' => 'permission:api.edit']);
        Route::post('api/balance', ['as' => 'backend.api.balance', 'uses' => 'ApiController@balance', ]);
        Route::delete('api/{api}/delete', ['as' => 'backend.api.delete', 'uses' => 'ApiController@delete', 'middleware' => 'permission:api.delete', ]);

        /**
         * Info routes
         */

        Route::get('tournaments', ['as' => 'backend.tournament.list', 'uses' => 'TournamentController@index', 'middleware' => 'permission:tournaments.manage']);
        Route::get('tournaments/create', ['as' => 'backend.tournament.create', 'uses' => 'TournamentController@create', 'middleware' => 'permission:tournaments.add']);
        Route::post('tournaments/create', ['as' => 'backend.tournament.store', 'uses' => 'TournamentController@store', 'middleware' => 'permission:tournaments.add']);
        Route::get('tournaments/{tournament}/edit', ['as' => 'backend.tournament.edit', 'uses' => 'TournamentController@edit', 'middleware' => 'permission:tournaments.edit']);
        Route::post('tournaments/{tournament}/update', ['as' => 'backend.tournament.update', 'uses' => 'TournamentController@update', 'middleware' => 'permission:tournaments.edit']);
        Route::delete('tournaments/{tournament}/delete', ['as' => 'backend.tournament.delete', 'uses' => 'TournamentController@delete', 'middleware' => 'permission:tournaments.delete']);
        Route::get('tournaments/games.json', ['as' => 'backend.tournament.games', 'uses' => 'TournamentController@games', 'middleware' => 'permission:tournaments.manage']);

        /**
         * Info routes
         */

        Route::get('smsbonuses', ['as' => 'backend.sms_bonus.list', 'uses' => 'SMSBonusController@index', 'middleware' => 'permission:sms_bonuses.manage']);
        Route::get('smsbonuses/create', ['as' => 'backend.sms_bonus.create', 'uses' => 'SMSBonusController@create', 'middleware' => 'permission:sms_bonuses.add']);
        Route::post('smsbonuses/create', ['as' => 'backend.sms_bonus.store', 'uses' => 'SMSBonusController@store', 'middleware' => 'permission:sms_bonuses.add']);
        Route::get('smsbonuses/{sms_bonus}/edit', ['as' => 'backend.sms_bonus.edit', 'uses' => 'SMSBonusController@edit', 'middleware' => 'permission:sms_bonuses.edit']);
        Route::post('smsbonuses/{sms_bonus}/update', ['as' => 'backend.sms_bonus.update', 'uses' => 'SMSBonusController@update', 'middleware' => 'permission:sms_bonuses.edit']);
        Route::delete('smsbonuses/{sms_bonus}/delete', ['as' => 'backend.sms_bonus.delete', 'uses' => 'SMSBonusController@delete', 'middleware' => 'permission:sms_bonuses.delete']);
        Route::get('smsbonuses/status/{status}', ['as' => 'backend.sms_bonus.status', 'uses' => 'SMSBonusController@status', ]);

        /**
         * Articles routes
         */

        Route::get('articles', ['as' => 'backend.article.list', 'uses' => 'ArticlesController@index', 'middleware' => 'only_for_admin', ]);
        Route::get('articles/create', ['as' => 'backend.article.create', 'uses' => 'ArticlesController@create', 'middleware' => 'only_for_admin', ]);
        Route::post('articles/create', ['as' => 'backend.article.store', 'uses' => 'ArticlesController@store', 'middleware' => 'only_for_admin', ]);
        Route::get('articles/{article}/edit', ['as' => 'backend.article.edit', 'uses' => 'ArticlesController@edit', 'middleware' => 'only_for_admin', ]);
        Route::post('articles/{article}/update', ['as' => 'backend.article.update', 'uses' => 'ArticlesController@update', 'middleware' => 'only_for_admin', ]);
        Route::delete('articles/{article}/delete', ['as' => 'backend.article.delete', 'uses' => 'ArticlesController@delete', 'middleware' => 'only_for_admin', ]);

        /**
         * Rules routes
         */

        Route::get('rules', ['as' => 'backend.rule.list', 'uses' => 'RulesController@index', 'middleware' => 'only_for_admin', ]);
        Route::get('rules/{rule}/edit', ['as' => 'backend.rule.edit', 'uses' => 'RulesController@edit', 'middleware' => 'only_for_admin', ]);
        Route::post('rules/{rule}/update', ['as' => 'backend.rule.update', 'uses' => 'RulesController@update', 'middleware' => 'only_for_admin', ]);

        /**
         * FAQ routes
         */

        Route::get('faq', ['as' => 'backend.faq.list', 'uses' => 'FaqsController@index', 'middleware' => 'only_for_admin', ]);
        Route::get('faq/create', ['as' => 'backend.faq.create', 'uses' => 'FaqsController@create', 'middleware' => 'only_for_admin', ]);
        Route::post('faq/create', ['as' => 'backend.faq.store', 'uses' => 'FaqsController@store', 'middleware' => 'only_for_admin', ]);
        Route::get('faq/{faq}/edit', ['as' => 'backend.faq.edit', 'uses' => 'FaqsController@edit', 'middleware' => 'only_for_admin', ]);
        Route::post('faq/{faq}/update', ['as' => 'backend.faq.update', 'uses' => 'FaqsController@update', 'middleware' => 'only_for_admin', ]);
        Route::delete('faq/{faq}/delete', ['as' => 'backend.faq.delete', 'uses' => 'FaqsController@delete', 'middleware' => 'only_for_admin', ]);

        /**
         * Roles & Permissions
         */

        Route::get('jpgame', ['as' => 'backend.jpgame.list', 'uses' => 'JPGController@index', ]);

        Route::get('jpgame/{jackpot}/edit', ['as' => 'backend.jpgame.edit', 'uses' => 'JPGController@edit', 'middleware' => 'permission:jpgame.manage']);
        Route::post('jpgame/{jackpot}/update', ['as' => 'backend.jpgame.update', 'uses' => 'JPGController@update', 'middleware' => 'permission:jpgame.edit']);

        Route::post('jpgame/global', ['as' => 'backend.jpgame.global', 'uses' => 'JPGController@global', ]);
        Route::post('jpgame/global_update', ['as' => 'backend.jpgame.global_update', 'uses' => 'JPGController@global_update', ]);

        /*
         *
         * ProgressController
         *
         * */

        Route::get('progress', ['as' => 'backend.progress.list', 'uses' => 'ProgressController@index', 'middleware' => 'permission:progress.manage']);

        Route::get('progress/{progress}/edit', ['as' => 'backend.progress.edit', 'uses' => 'ProgressController@edit', 'middleware' => 'permission:progress.edit']);
        Route::post('progress/{progress}/update', ['as' => 'backend.progress.update', 'uses' => 'ProgressController@update', 'middleware' => 'permission:progress.edit']);

        Route::get('progress/status/{status}', ['as' => 'backend.progress.status', 'uses' => 'ProgressController@status', 'middleware' => 'permission:progress.manage']);

        /**
         * Roles & Permissions
         */

        Route::get('role', ['as' => 'backend.role.index', 'uses' => 'RolesController@index', ]);
        Route::get('role/create', ['as' => 'backend.role.create', 'uses' => 'RolesController@create']);
        Route::post('role/store', ['as' => 'backend.role.store', 'uses' => 'RolesController@store']);
        Route::get('role/{role}/edit', ['as' => 'backend.role.edit', 'uses' => 'RolesController@edit']);
        Route::put('role/{role}/update', ['as' => 'backend.role.update', 'uses' => 'RolesController@update']);
        Route::delete('role/{role}/delete', ['as' => 'backend.role.delete', 'uses' => 'RolesController@delete']);

        /**
         * Permissions
         */

        Route::get('permission', ['as' => 'backend.permission.index', 'uses' => 'PermissionsController@index', 'middleware' => 'only_for_admin']);
        Route::post('permission/save', ['as' => 'backend.permission.save', 'uses' => 'PermissionsController@saveRolePermissions', 'middleware' => 'only_for_admin']);

        /**
         * Settings
         */

        Route::get('settings/{tab}', ['as' => 'backend.settings.list', 'uses' => 'SettingsController@general', ]);

        Route::post('settings/{tab}', ['as' => 'backend.settings.list.update', 'uses' => 'SettingsController@update', ]);

        Route::get('securities', ['as' => 'backend.securities', 'uses' => 'DashboardController@securities', 'middleware' => 'only_for_admin']);
        Route::put('securities/{item}/block', ['as' => 'backend.securities.block', 'uses' => 'DashboardController@securities_block', 'middleware' => 'only_for_admin']);
        Route::delete('securities/{item}/delete', ['as' => 'backend.securities.delete', 'uses' => 'DashboardController@securities_delete', 'middleware' => 'only_for_admin']);
        Route::get('generator', ['as' => 'backend.settings.generator', 'uses' => 'DashboardController@generator', ]);
        Route::post('generator', ['as' => 'backend.settings.generator.post', 'uses' => 'DashboardController@generator', ]);
        Route::put('shops/block', ['as' => 'backend.settings.shop_block', 'uses' => 'SettingsController@shop_block', 'middleware' => 'permission:shops.block']);
        Route::put('shops/unblock', ['as' => 'backend.settings.shop_unblock', 'uses' => 'SettingsController@shop_unblock', 'middleware' => 'permission:shops.unblock']);
        Route::put('settings/sync', ['as' => 'backend.settings.sync', 'uses' => 'SettingsController@sync']);

        Route::put('settings/delete/stat/game', ['as' => 'backend.settings.gelete_stat', 'uses' => 'SettingsController@gelete_stat', 'middleware' => 'only_for_admin']);
        Route::put('settings/delete/log/game', ['as' => 'backend.settings.gelete_log', 'uses' => 'SettingsController@gelete_log', 'middleware' => 'only_for_admin']);

        /**
         * Activity Log
         */

        Route::get('activity', ['as' => 'backend.activity.index', 'uses' => 'ActivityController@index', 'middleware' => 'permission:activity.system', ]);

        Route::get('activity/system', ['as' => 'backend.activity.system', 'uses' => 'ActivityController@system', 'middleware' => 'permission:activity.system', ]);

        Route::get('activity/user', ['as' => 'backend.activity.user', 'uses' => 'ActivityController@user', 'middleware' => 'permission:activity.user', ]);

        Route::get('activity/user/{user}/log', ['as' => 'backend.activity.user.log', 'uses' => 'ActivityController@userActivity']);

        Route::delete('activity/clear', ['as' => 'backend.activity.clear', 'uses' => 'ActivityController@clear', ]);

        /*
         *
         *  SMS mailing
         *
         * */

        Route::get('sms_mailings', ['as' => 'backend.sms_mailing.list', 'uses' => 'SMSMailingController@index', 'middleware' => 'only_for_admin']);
        Route::get('sms_mailings/create', ['as' => 'backend.sms_mailing.create', 'uses' => 'SMSMailingController@create', 'middleware' => 'only_for_admin']);
        Route::post('sms_mailings/create', ['as' => 'backend.sms_mailing.store', 'uses' => 'SMSMailingController@store', 'middleware' => 'only_for_admin']);
        Route::get('sms_mailings/{mailing}/edit', ['as' => 'backend.sms_mailing.edit', 'uses' => 'SMSMailingController@edit', 'middleware' => 'only_for_admin']);
        Route::post('sms_mailings/{mailing}/update', ['as' => 'backend.sms_mailing.update', 'uses' => 'SMSMailingController@update', 'middleware' => 'only_for_admin']);
        Route::delete('sms_mailings/{mailing}/delete', ['as' => 'backend.sms_mailing.delete', 'uses' => 'SMSMailingController@delete', 'middleware' => 'only_for_admin']);

        /* Ticket */

        Route::get('/support', ['as' => 'backend.support.index', 'uses' => 'SupportController@index', 'middleware' => 'permission:tickets.manage']);
        Route::get('support/create', ['as' => 'backend.support.create', 'uses' => 'SupportController@create', 'middleware' => 'permission:tickets.add']);
        Route::post('support/create', ['as' => 'backend.support.store', 'uses' => 'SupportController@store', 'middleware' => 'permission:tickets.add']);
        Route::post('support/{ticket}/answer', ['as' => 'backend.support.answer', 'uses' => 'SupportController@answer', ]);
        Route::get('/support/{ticket}', ['as' => 'backend.support.view', 'uses' => 'SupportController@view']);
        Route::put('support/{ticket}/close', ['as' => 'backend.support.close', 'uses' => 'SupportController@close', ]);

    });
});

