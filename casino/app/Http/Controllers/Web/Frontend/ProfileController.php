<?php
namespace VanguardLTE\Http\Controllers\Web\Frontend
{
    use Mail;
    use VanguardLTE\Mail\UserWithdrawRequest;
    include_once(base_path() . '/app/ShopCore.php');
    include_once(base_path() . '/app/ShopGame.php');
    class ProfileController extends \VanguardLTE\Http\Controllers\Controller
    {
        protected $theUser = null;
        private $users = null;
        public function __construct(\VanguardLTE\Repositories\User\UserRepository $users)
        {
            $this->middleware('auth');
            $this->middleware('session.database', [
                'only' => [
                    'sessions',
                    'invalidateSession'
                ]
            ]);
            $this->users = $users;
            $this->middleware(function($request, $next)
            {
                $this->theUser = auth()->user();
                return $next($request);
            });
        }
        public function index(\VanguardLTE\Repositories\Role\RoleRepository $rolesRepo)
        {
            $user = $this->theUser;
            $edit = true;
            $roles = $rolesRepo->lists();
            $statuses = \VanguardLTE\Support\Enum\UserStatus::lists();
            return view('frontend.user.profile', compact('user', 'edit', 'roles', 'statuses'));
        }
        public function updateDetails(\VanguardLTE\Http\Requests\User\UpdateProfileDetailsRequest $request)
        {
            $this->users->update($this->theUser->id, $request->except('role_id', 'status'));
            event(new \VanguardLTE\Events\User\UpdatedProfileDetails());
            return response()->json(['success' => trans('app.profile_updated_successfully')], 200);
            return redirect()->back()->withSuccess(trans('app.profile_updated_successfully'));
        }
        public function updatePassword(\VanguardLTE\Http\Requests\User\UpdateProfilePasswordRequest $request)
        {
            $old_password = $request->old_password;
            if( !\Illuminate\Support\Facades\Hash::check($old_password, auth()->user()->password) )
            {
                return response()->json(['error' => trans('passwords.current_password')], 422);
            }
            $this->users->update($this->theUser->id, $request->only('password', 'password_confirmation'));
            event(new \VanguardLTE\Events\User\UpdatedProfileDetails());
            return response()->json(['success' => trans('app.profile_updated_successfully')], 200);
        }
        public function updateAvatar(\Illuminate\Http\Request $request, \VanguardLTE\Services\Upload\UserAvatarManager $avatarManager)
        {
            $this->validate($request, ['avatar' => 'image']);
            $name = $avatarManager->uploadAndCropAvatar($this->theUser, $request->file('avatar'), $request->get('points'));
            if( $name )
            {
                return $this->handleAvatarUpdate($name);
            }
            return redirect()->route('frontend.profile')->withErrors(trans('app.avatar_not_changed'));
        }
        private function handleAvatarUpdate($avatar)
        {
            $this->users->update($this->theUser->id, ['avatar' => $avatar]);
            event(new \VanguardLTE\Events\User\ChangedAvatar());
            return redirect()->route('frontend.profile')->withSuccess(trans('app.avatar_changed'));
        }
        public function updateAvatarExternal(\Illuminate\Http\Request $request, \VanguardLTE\Services\Upload\UserAvatarManager $avatarManager)
        {
            $avatarManager->deleteAvatarIfUploaded($this->theUser);
            return $this->handleAvatarUpdate($request->get('url'));
        }
        public function updateLoginDetails(\VanguardLTE\Http\Requests\User\UpdateProfileLoginDetailsRequest $request)
        {
            $data = $request->except('role', 'status');
            if( trim($data['password']) == '' )
            {
                unset($data['password']);
                unset($data['password_confirmation']);
            }
            $this->users->update($this->theUser->id, $data);
            return redirect()->route('frontend.profile')->withSuccess(trans('app.login_updated'));
        }
        public function activity(\VanguardLTE\Repositories\Activity\ActivityRepository $activitiesRepo, \Illuminate\Http\Request $request)
        {
            $user = $this->theUser;
            $activities = $activitiesRepo->paginateActivitiesForUser($user->id, $perPage = 20, $request->get('search'));
            return view('frontend.activity.index', compact('activities', 'user'));
        }
        public function sessions(\VanguardLTE\Repositories\Session\SessionRepository $sessionRepository)
        {
            $profile = true;
            $user = $this->theUser;
            $sessions = $sessionRepository->getUserSessions($user->id);
            return view('frontend.user.sessions', compact('sessions', 'user', 'profile'));
        }
        public function invalidateSession($session, \VanguardLTE\Repositories\Session\SessionRepository $sessionRepository)
        {
            $sessionRepository->invalidateSession($session->id);
            return redirect()->route('frontend.profile.sessions')->withSuccess(trans('app.session_invalidated'));
        }
        public function daily_entry(\Illuminate\Http\Request $request)
        {
            $user = \VanguardLTE\User::where('id', auth()->user()->id)->first();
            $user->update([
                'last_bid' => \Carbon\Carbon::now(),
                'last_progress' => \Carbon\Carbon::now()
            ]);
            $sms_bonus = \VanguardLTE\SMSBonusItem::where([
                'user_id' => $user->id,
                'status' => 0
            ])->orderBy('id', 'DESC')->first();
            if( $sms_bonus )
            {
                $sms_bonus->update(['status' => 1]);
                $payeer = \VanguardLTE\User::find($user->parent_id);
                $user->addBalance('add', $sms_bonus->bonus, $payeer, false, 'sms_bonus', false, $sms_bonus);
                $user->update(['last_daily_entry' => \Carbon\Carbon::now()]);
                return response()->json([
                    'success' => true,
                    'message' => __('app.sms_bonus'),
                    'value' => $sms_bonus->bonus,
                    'currency' => $user->shop->currency,
                    'balance' => number_format($user->balance, 2, '.', ''),
                    'refunds' => number_format($user->refunds, 2, '.', '')
                ]);
            }
            $daily_entry = false;
            if( $user->shop && $user->shop->progress_active )
            {
                $daily_entry = \VanguardLTE\Progress::where([
                    'shop_id' => auth()->user()->shop_id,
                    'day' => date('l'),
                    'rating' => auth()->user()->rating
                ])->first();
            }
            if( $daily_entry )
            {
                if( !\Carbon\Carbon::now()->diffInDays(\Carbon\Carbon::parse($user->last_daily_entry), false) )
                {
                    return response()->json([
                        'fail' => true,
                        'error' => __('app.only_1_daily_entry_in_a_day')
                    ]);
                }
                $value = rand($daily_entry->min, $daily_entry->max);
                $payeer = \VanguardLTE\User::find($user->parent_id);
                $user->addBalance('add', $value, $payeer, false, 'daily_entry', false, $daily_entry);
                $user->update(['last_daily_entry' => \Carbon\Carbon::now()]);
                return response()->json([
                    'success' => true,
                    'value' => $value,
                    'message' => __('app.daily_entry'),
                    'currency' => $user->shop->currency,
                    'balance' => number_format($user->balance, 2, '.', ''),
                    'refunds' => number_format($user->refunds, 2, '.', '')
                ]);
            }
            return response()->json([
                'fail' => true,
                'error' => __('app.no_active_daily_entries')
            ]);
        }
        public function pincode(\Illuminate\Http\Request $request)
        {
            $user = \VanguardLTE\User::find(auth()->user()->id);
            $shop = \VanguardLTE\Shop::find($user->shop_id);
            if (!settings('payment_pin')) {
                return redirect()->back()->withErrors('System is not available');
            }
            if (!$request->pincode) {
                return redirect()->back()->withErrors('Please enter pincode');
            }

            $pincode = \VanguardLTE\Pincode::where([
                'code' => $request->pincode,
                'shop_id' => auth()->user()->shop_id,
            ])->first();
            if (!$pincode) {
                return redirect()->back()->withErrors('Pincode not exist');
            }
            if (!$pincode->status) {
                return redirect()->back()->withErrors('Wrong Pincode');
            }
            $open_shift = \VanguardLTE\OpenShift::where([
                'shop_id' => auth()->user()->shop_id,
                'end_date' => null,
            ])->first();
            if (!$open_shift) {
                return redirect()->back()->withErrors(
                    trans('app.shift_not_opened')
                );
            }
            if ($shop->balance < $pincode->nominal) {
                return redirect()->back()->withErrors(
                    trans('app.not_enough_money_in_the_shop', [
                        'name' => $shop->name,
                        'balance' => $shop->balance,
                    ])
                );
            }
            $user->update([
                'balance' => $user->balance + $pincode->nominal,
                'count_balance' => $user->count_balance + $pincode->nominal,
                'refunds' => $user->refunds + \VanguardLTE\Lib\Functions::refunds(
                        $pincode->nominal,
                        $user->shop_id,
                        $user->rating
                    ),
                'total_in' => $user->total_in + $pincode->nominal,
            ]);
            $shop->decrement('balance', $pincode->nominal);
            $open_shift->increment('balance_out', abs($pincode->nominal));
            $open_shift->increment('money_in', abs($pincode->nominal));
            $open_shift->increment('transfers');
            event(new \VanguardLTE\Events\User\MoneyIn($user, $pincode->nominal));
            \VanguardLTE\Statistic::create([
                'user_id' => auth()->user()->id,
                'payeer_id' => auth()->user()->parent_id,
                'sum' => abs($pincode->nominal),
                'type' => 'add',
                'system' => 'pincode',
                'shop_id' => $user->shop_id,
                'item_id' => $pincode->code,
                'title' => 'PIN '.$pincode->code,
            ]);
            $pincode->delete();

            return redirect()->back()->withSuccess(
                array(
                    //		trans('app.user_withdrawal_request_submitted')
                    'title' => 'Pincode activated',
                    'msg' => '',
                )
            );
        }
        public function phone(\Illuminate\Http\Request $request)
        {
            $phone = preg_replace('/[^0-9]/', '', $request->phone);
            if( !$phone )
            {
                return response()->json([
                    'fail' => 'fail',
                    'text' => __('app.phone_empty')
                ], 200);
            }
            $sms = \VanguardLTE\SMS::where('user_id', auth()->user()->id)->where('status', '!=', 'DELIVERED')->count();
            if( config('smsto.max_invites') <= $sms )
            {
                return response()->json([
                    'fail' => 'fail',
                    'text' => __('app.max_invites_error', ['max' => config('smsto.max_invites')])
                ], 200);
            }
            if( auth()->user()->phone_verified )
            {
                return response()->json([
                    'fail' => 'fail',
                    'text' => __('app.phone_verified')
                ], 200);
            }
            $uniq = \VanguardLTE\User::where(['phone' => $phone])->where('id', '!=', auth()->user()->id)->count();
            if( $uniq )
            {
                return response()->json([
                    'fail' => 'fail',
                    'text' => __('validation.unique', ['attribute' => 'phone'])
                ], 200);
            }
            $code = rand(1111, 9999);
            $return = \VanguardLTE\Lib\SMS_sender::send('+' . $phone, 'Code: ' . $code, auth()->user()->id);
            if( isset($return['error']) )
            {
                if( isset($return['text']) )
                {
                    return response()->json([
                        'fail' => 'fail',
                        'text' => $return['text']
                    ], 200);
                }
                return response()->json([
                    'fail' => 'fail',
                    'text' => __('app.something_went_wrong')
                ], 200);
            }
            if( !isset($return['success']) )
            {
                return response()->json([
                    'fail' => 'fail',
                    'text' => __('app.something_went_wrong')
                ], 200);
            }
            if( !$return['success'] )
            {
                return response()->json([
                    'fail' => 'fail',
                    'text' => $return['message']
                ], 200);
            }
            \VanguardLTE\User::find(auth()->user()->id)->update([
                'phone' => $phone,
                'sms_token_date' => \Carbon\Carbon::now()->addMinutes(settings('smsto_time')),
                'sms_token' => $code
            ]);
            \VanguardLTE\SMS::create([
                'user_id' => auth()->user()->id,
                'message' => $code,
                'message_id' => $return['message_id'],
                'shop_id' => auth()->user()->shop_id,
                'type' => 'verification',
                'status' => 'Sent'
            ]);
            if( isset($return['success']) )
            {
                $times = settings('smsto_time') * 60;
                $minutes = settings('smsto_time');
                $seconds = $times - (settings('smsto_time') * 60);
                $timer_text = (($minutes < 10 ? '0' . $minutes : $minutes)) . ':' . (($seconds < 10 ? '0' . $seconds : $seconds));
                return response()->json([
                    'success' => 'success',
                    'text' => __('app.sms_sent'),
                    'times' => $times,
                    'timer_text' => $timer_text
                ], 200);
            }
            return response()->json([
                'fail' => 'fail',
                'text' => trans('app.sms_error')
            ], 200);
        }
        public function clear_phone()
        {
            $user = \VanguardLTE\User::find(auth()->user()->id);
            if( $user->sms_token != '' )
            {
                $now = \Carbon\Carbon::now();
                $times = $now->diffInSeconds(\Carbon\Carbon::parse($user->sms_token_date), false);
                if( $times <= 0 )
                {
                    $user->update([
                        'phone' => '',
                        'phone_verified' => 0,
                        'sms_token' => ''
                    ]);
                    return json_encode([
                        'success' => true,
                        'message' => __('app.time_is_up')
                    ]);
                }
            }
            return json_encode([
                'error' => true,
                'message' => __('app.something_went_wrong')
            ]);
        }
        public function code(\Illuminate\Http\Request $request)
        {
            $code = preg_replace('/[^0-9]/', '', $request->code);
            if( !$code )
            {
                return response()->json([
                    'fail' => 'fail',
                    'text' => __('app.empty_string')
                ], 200);
            }
            $user = \VanguardLTE\User::find(auth()->user()->id);
            if( $code != $user->sms_token )
            {
                return response()->json([
                    'fail' => 'fail',
                    'text' => __('app.wrong_code')
                ], 200);
            }
            $now = \Carbon\Carbon::now();
            $seconds = $now->diffInSeconds(\Carbon\Carbon::parse(auth()->user()->sms_token_date), false);
            if( $seconds <= 0 )
            {
                return response()->json([
                    'fail' => 'fail',
                    'text' => __('app.time_is_up')
                ], 200);
            }
            $user->update([
                'sms_token' => null,
                'phone_verified' => 1
            ]);
            return response()->json([
                'success' => 'success',
                'text' => __('app.sms_sent')
            ], 200);
        }
        public function sms(\Illuminate\Http\Request $request)
        {
            if( !(auth()->user()->shop && auth()->user()->shop->invite_active) )
            {
                return response()->json([
                    'fail' => 'fail',
                    'text' => trans('app.no_permission')
                ], 200);
            }
            $phone = preg_replace('/[^0-9]/', '', $request->phone);
            if( !$phone )
            {
                return response()->json([
                    'fail' => 'fail',
                    'text' => __('app.phone_empty')
                ], 200);
            }
            $inviter = \VanguardLTE\Invite::where(['shop_id' => auth()->user()->shop_id])->first();
            if( !$inviter )
            {
                return response()->json([
                    'fail' => 'fail',
                    'text' => __('app.error')
                ], 200);
            }
            $sms = \VanguardLTE\SMS::where('user_id', auth()->user()->id)->where('status', '!=', 'DELIVERED')->count();
            if( config('smsto.max_invites') <= $sms )
            {
                return response()->json([
                    'fail' => 'fail',
                    'text' => __('app.max_invites_error', ['max' => config('smsto.max_invites')])
                ], 200);
            }
            $uniq = \VanguardLTE\User::where(['phone' => $phone])->count();
            if( $uniq )
            {
                return response()->json([
                    'fail' => 'fail',
                    'text' => __('validation.unique', ['attribute' => 'phone'])
                ], 200);
            }
            $username = rand(111111111, 999999999);
            $password = rand(111111111, 999999999);
            foreach( [
                'url' => route('frontend.auth.login'),
                'login' => $username,
                'password' => $password
            ] as $key => $value )
            {
                $inviter->message = str_replace(':' . $key, $value, $inviter->message);
            }
            $return = \VanguardLTE\Lib\SMS_sender::send('+' . $phone, $inviter->message);
            if( isset($return['error']) )
            {
                if( isset($return['text']) )
                {
                    return response()->json([
                        'fail' => 'fail',
                        'text' => $return['text']
                    ], 200);
                }
                return response()->json([
                    'fail' => 'fail',
                    'text' => __('app.something_went_wrong')
                ], 200);
            }
            if( !isset($return['success']) )
            {
                return response()->json([
                    'fail' => 'fail',
                    'text' => __('app.something_went_wrong')
                ], 200);
            }
            if( !$return['success'] )
            {
                return response()->json([
                    'fail' => 'fail',
                    'text' => $return['message']
                ], 200);
            }
            $user = $this->users->create([
                'phone' => $phone,
                'username' => $username,
                'password' => $password,
                'role_id' => 1,
                'parent_id' => auth()->user()->parent_id,
                'inviter_id' => auth()->user()->id,
                'shop_id' => auth()->user()->shop_id,
                'status' => \VanguardLTE\Support\Enum\UserStatus::UNCONFIRMED
            ]);
            $role = \jeremykenedy\LaravelRoles\Models\Role::where('name', '=', 'User')->first();
            $user->attachRole($role);
            \VanguardLTE\ShopUser::create([
                'shop_id' => auth()->user()->shop_id,
                'user_id' => $user->id
            ]);
            \VanguardLTE\SMS::create([
                'user_id' => auth()->user()->id,
                'new_user_id' => $user->id,
                'message' => $inviter->message,
                'message_id' => $return['message_id'],
                'shop_id' => auth()->user()->shop_id,
                'status' => 'Sent'
            ]);
            \VanguardLTE\Reward::create([
                'user_id' => $user->inviter_id,
                'referral_id' => $user->id,
                'sum' => $inviter->sum,
                'ref_sum' => $inviter->sum_ref,
                'until' => \Carbon\Carbon::now()->addDays($inviter->waiting_time),
                'shop_id' => $inviter->shop_id
            ]);
            if( isset($return['success']) )
            {
                return response()->json([
                    'success' => 'success',
                    'text' => __('app.sms_sent'),
                    'data' => [
                        'user_id' => $user,
                        'phone' => '+' . $user->phone,
                        'created' => $user->created_at->format(config('app.date_format')),
                        'until' => $user->created_at->addDays($inviter->waiting_time)->format(config('app.date_format'))
                    ]
                ], 200);
            }
            return response()->json([
                'fail' => 'fail',
                'text' => trans('app.sms_error')
            ], 200);
        }
        public function reward(\Illuminate\Http\Request $request)
        {
            if( !(auth()->user()->shop && auth()->user()->shop->invite_active) )
            {
                return response()->json([
                    'fail' => 'fail',
                    'text' => trans('app.no_permission')
                ], 200);
            }
            $reward_id = preg_replace('/[^0-9]/', '', $request->reward_id);
            if( !$reward_id )
            {
                return response()->json([
                    'fail' => 'fail',
                    'text' => __('app.empty_string')
                ], 200);
            }
            $inviter = \VanguardLTE\Invite::where(['shop_id' => auth()->user()->shop_id])->first();
            if( !$inviter )
            {
                return response()->json([
                    'fail' => 'fail',
                    'text' => __('app.error')
                ], 200);
            }
            $rewards = auth()->user()->rewards();
            if( !count($rewards) )
            {
                return response()->json([
                    'fail' => 'fail',
                    'text' => __('app.empty_string')
                ], 200);
            }
            $reward = false;
            foreach( $rewards as $item )
            {
                if( $item->id == $reward_id )
                {
                    $reward = $item;
                }
            }
            if( !$reward )
            {
                return response()->json([
                    'fail' => 'fail',
                    'text' => __('app.wrong_reward')
                ], 200);
            }
            if( !$reward->activated )
            {
                return response()->json([
                    'fail' => 'fail',
                    'text' => __('app.reward_is_not_activated')
                ], 200);
            }
            if( \Carbon\Carbon::parse($reward->until)->diffInMicroseconds(\Carbon\Carbon::now(), false) >= 0 )
            {
                return response()->json([
                    'fail' => 'fail',
                    'text' => __('app.reward_date_is_out')
                ], 200);
            }
            $sum = '';
            if( !$reward->user_received )
            {
                event(new \VanguardLTE\Events\User\MoneyIn($reward->user, $reward->sum));
                $reward->user->addBalance('add', $reward->sum, $reward->user->referral, false, 'invite', $inviter);
                $reward->user->increment('invite', $reward->sum);
                $reward->user->increment('count_invite', $reward->sum * $inviter->wager);
                $reward->user->increment('address', $reward->sum);
                $reward->update(['user_received' => 1]);
                \VanguardLTE\Message::create([
                    'user_id' => $reward->referral_id,
                    'type' => 'invite',
                    'value' => $reward->ref_sum,
                    'shop_id' => $reward->shop_id
                ]);
            }
            if( !$reward->referral_received )
            {
                event(new \VanguardLTE\Events\User\MoneyIn($reward->referral, $reward->ref_sum));
                $reward->referral->addBalance('add', $reward->ref_sum, $reward->referral->referral, false, 'invite', $inviter);
                $reward->referral->increment('invite', $reward->ref_sum);
                $reward->referral->increment('count_invite', $reward->ref_sum * $inviter->wager);
                $reward->referral->increment('address', $reward->ref_sum);
                $reward->update(['referral_received' => 1]);
                \VanguardLTE\Message::create([
                    'user_id' => $reward->user_id,
                    'type' => 'invite',
                    'value' => $reward->sum,
                    'shop_id' => $reward->shop_id
                ]);
            }
            if( $reward->user_id == auth()->user()->id )
            {
                $sum = $reward->sum;
            }
            else
            {
                $sum = $reward->ref_sum;
            }
            return response()->json([
                'success' => 'success',
                'value' => $sum
            ], 200);
        }
        public function refunds(\Illuminate\Http\Request $request)
        {
            $user = \VanguardLTE\User::find(auth()->user()->id);
            $shop = \VanguardLTE\Shop::find($user->shop_id);
            $sum = floatval($user->refunds);
            $refund = false;
            if( $shop && $shop->progress_active )
            {
                $refund = \VanguardLTE\Progress::where([
                    'shop_id' => $user->shop_id,
                    'rating' => $user->rating
                ])->first();
            }
            if( $sum )
            {
                if( $refund && $refund->min_balance < $user->balance )
                {
                    return response()->json([
                        'fail' => 'fail',
                        'value' => 0,
                        'balance' => $user->balance,
                        'text' => 'Min Balance "' . $refund->min_balance . '"'
                    ], 200);
                }
                $result = $user->addBalance('add', $sum, $user->referral, false, 'refund', false, $refund);
                $result = json_decode($result, true);
                if( isset($result['status']) && $result['status'] == 'error' )
                {
                    return response()->json([
                        'fail' => 'fail',
                        'value' => 0,
                        'balance' => $user->balance,
                        'text' => $result['message']
                    ], 200);
                }
                event(new \VanguardLTE\Events\User\MoneyIn($user, $sum));
                return response()->json([
                    'success' => 'success',
                    'value' => number_format($sum, 2, '.', ''),
                    'balance' => number_format($user->balance, 2, '.', ''),
                    'refunds' => number_format($user->refunds, 2, '.', ''),
                    'currency' => $shop->currency
                ], 200);
            }
            return response()->json([
                'success' => 'success',
                'value' => 0,
                'balance' => number_format($user->balance, 2, '.', ''),
                'currency' => $shop->currency
            ], 200);
        }
        public function ajax(\Illuminate\Http\Request $request)
        {
            $data = [
                'jackpots' => [],
                'jackpotSum' => 0,
                'profile' => [],
                'message' => '',
                'currency' => ''
            ];
            $user = \VanguardLTE\User::where('id', auth()->user()->id)->first();
            if( $user )
            {
                $sms_bonus = \VanguardLTE\SMSBonusItem::where([
                    'user_id' => auth()->user()->id,
                    'status' => 0
                ])->orderBy('id', 'DESC')->first();
                $refund = false;
                $daily_entry = false;
                if( $user->shop && $user->shop->progress_active )
                {
                    $refund = \VanguardLTE\Progress::where([
                        'shop_id' => auth()->user()->shop_id,
                        'rating' => auth()->user()->rating
                    ])->first();
                    $daily_entry = \VanguardLTE\Progress::where([
                        'shop_id' => auth()->user()->shop_id,
                        'day' => date('l'),
                        'rating' => auth()->user()->rating
                    ])->first();
                }
                $rewards = \VanguardLTE\Reward::where([
                    'user_id' => auth()->user()->id,
                    'user_received' => 0,
                    'activated' => 1
                ])->get();
                $data['currency'] = $user->shop->currency;
                $data['profile'] = [
                    'balance' => number_format($user->balance, 2, '.', ''),
                    'rating' => $user->badge()
                ];
                $bonus_tooltip = '';
                if( auth()->user()->tournaments > 0 )
                {
                    $bonus_tooltip .= ('<p>Tournaments = ' . number_format(auth()->user()->tournaments, 2, '.', '') . '</p>');
                }
                if( auth()->user()->happyhours > 0 )
                {
                    $bonus_tooltip .= ('<p>Happy Hours = ' . number_format(auth()->user()->happyhours, 2, '.', '') . '</p>');
                }
                if( auth()->user()->refunds > 0 )
                {
                    $bonus_tooltip .= ('<p>Refund = ' . number_format(auth()->user()->refunds, 2, '.', '') . '</p>');
                }
                if( auth()->user()->progress > 0 )
                {
                    $bonus_tooltip .= ('<p>Progress Bonus = ' . number_format(auth()->user()->progress, 2, '.', '') . '</p>');
                }
                if( auth()->user()->daily_entries > 0 )
                {
                    $bonus_tooltip .= ('<p>Daily Entries = ' . number_format(auth()->user()->daily_entries, 2, '.', '') . '</p>');
                }
                if( auth()->user()->invite > 0 )
                {
                    $bonus_tooltip .= ('<p>Invite Bonus= ' . number_format(auth()->user()->invite, 2, '.', '') . '</p>');
                }
                if( auth()->user()->welcomebonus > 0 )
                {
                    $bonus_tooltip .= ('<p>Welcome Bonus = ' . number_format(auth()->user()->welcomebonus, 2, '.', '') . '</p>');
                }
                if( auth()->user()->smsbonus > 0 )
                {
                    $bonus_tooltip .= ('<p>SMS Bonus = ' . number_format(auth()->user()->smsbonus, 2, '.', '') . '</p>');
                }
                if( auth()->user()->wheelfortune > 0 )
                {
                    $bonus_tooltip .= ('<p>Wheel Fortune = ' . number_format(auth()->user()->wheelfortune, 2, '.', '') . '</p>');
                }
                $data['profile']['bonus'] = [
                    'available' => (auth()->user()->tournaments > 0 || auth()->user()->happyhours > 0 || auth()->user()->refunds > 0 || auth()->user()->progress > 0 || auth()->user()->daily_entries > 0 || auth()->user()->invite > 0 || auth()->user()->welcomebonus > 0 || auth()->user()->smsbonus > 0 || auth()->user()->wheelfortune > 0 ? true : false),
                    'balance' => number_format(auth()->user()->tournaments + auth()->user()->happyhours + auth()->user()->refunds + auth()->user()->progress + auth()->user()->daily_entries + auth()->user()->invite + auth()->user()->welcomebonus + auth()->user()->smsbonus + auth()->user()->wheelfortune, 2, '.', ''),
                    'tooltip' => $bonus_tooltip
                ];
                $wager_tooltip = '';
                if( auth()->user()->count_tournaments > 0 )
                {
                    $wager_tooltip .= ('<p>Tournaments = ' . number_format(auth()->user()->count_tournaments, 2, '.', '') . '</p>');
                }
                if( auth()->user()->count_happyhours > 0 )
                {
                    $wager_tooltip .= ('<p>Happy Hours = ' . number_format(auth()->user()->count_happyhours, 2, '.', '') . '</p>');
                }
                if( auth()->user()->count_refunds > 0 )
                {
                    $wager_tooltip .= ('<p>Refund = ' . number_format(auth()->user()->count_refunds, 2, '.', '') . '</p>');
                }
                if( auth()->user()->count_progress > 0 )
                {
                    $wager_tooltip .= ('<p>Progress Bonus = ' . number_format(auth()->user()->count_progress, 2, '.', '') . '</p>');
                }
                if( auth()->user()->count_daily_entries > 0 )
                {
                    $wager_tooltip .= ('<p>Daily Entries = ' . number_format(auth()->user()->count_daily_entries, 2, '.', '') . '</p>');
                }
                if( auth()->user()->count_invite > 0 )
                {
                    $wager_tooltip .= ('<p>Invite Sum или Invite Sum Ref = ' . number_format(auth()->user()->count_invite, 2, '.', '') . '</p>');
                }
                if( auth()->user()->count_welcomebonus > 0 )
                {
                    $wager_tooltip .= ('<p>Welcome Bonus = ' . number_format(auth()->user()->count_welcomebonus, 2, '.', '') . '</p>');
                }
                if( auth()->user()->count_smsbonus > 0 )
                {
                    $wager_tooltip .= ('<p>SMS Bonus = ' . number_format(auth()->user()->count_smsbonus, 2, '.', '') . '</p>');
                }
                if( auth()->user()->count_wheelfortune > 0 )
                {
                    $wager_tooltip .= ('<p>Wheel Fortune = ' . number_format(auth()->user()->count_wheelfortune, 2, '.', '') . '</p>');
                }
                $data['profile']['wager'] = [
                    'available' => (auth()->user()->count_tournaments > 0 || auth()->user()->count_happyhours > 0 || auth()->user()->count_refunds > 0 || auth()->user()->count_progress > 0 || auth()->user()->count_daily_entries > 0 || auth()->user()->count_invite > 0 || auth()->user()->count_welcomebonus > 0 || auth()->user()->count_smsbonus > 0 || auth()->user()->count_wheelfortune > 0 ? true : false),
                    'balance' => number_format(auth()->user()->count_tournaments + auth()->user()->count_happyhours + auth()->user()->count_refunds + auth()->user()->count_progress + auth()->user()->count_daily_entries + auth()->user()->count_invite + auth()->user()->count_welcomebonus + auth()->user()->count_smsbonus + auth()->user()->count_wheelfortune, 2, '.', ''),
                    'tooltip' => $wager_tooltip
                ];
                $data['profile']['refunds'] = [
                    'available' => ($refund && auth()->user()->present()->refunds > 0 && auth()->user()->present()->balance <= $refund->min_balance ? true : false),
                    'balance' => number_format($user->refunds, 2, '.', '')
                ];
                $data['profile']['payments'] = ['available' => (settings('payment_interkassa') && \VanguardLTE\Lib\Setting::is_available('interkassa', auth()->user()->shop_id) || settings('payment_coinbase') && \VanguardLTE\Lib\Setting::is_available('coinbase', auth()->user()->shop_id) || settings('payment_btcpayserver') && \VanguardLTE\Lib\Setting::is_available('btcpayserver', auth()->user()->shop_id) || settings('payment_pin') ? true : false)];
                $invite_tooltip = '';
                if( count($rewards) )
                {
                    foreach( $rewards as $reward )
                    {
                        $invite_tooltip .= ('Bonus: ' . number_format($reward->sum, 2, '.', '') . '<br>');
                    }
                }
                $data['profile']['invites'] = [
                    'available' => ($user->shop && $user->shop->invite_active ? true : false),
                    'tooltip' => $invite_tooltip
                ];
                $data['profile']['daily_entry'] = ['available' => ($daily_entry && \Carbon\Carbon::now()->diffInDays(\Carbon\Carbon::parse(auth()->user()->last_daily_entry), false) || $sms_bonus ? true : false)];
            }
            $jackpots = \VanguardLTE\JPG::select([
                'id',
                'balance'
            ])->where('shop_id', auth()->user()->shop_id)->get();
            if( $jackpots )
            {
                $data['jackpots'] = $jackpots->toArray();
            }
            $data['jackpotSum'] = \VanguardLTE\JPG::where('shop_id', auth()->user()->shop_id)->sum('balance');
            $tournaments = \VanguardLTE\Tournament::where('shop_id', auth()->user()->shop_id)->where('start', '<=', \Carbon\Carbon::now())->where('end', '>=', \Carbon\Carbon::now()->subMinutes(3))->get();
            if( $tournaments )
            {
                $data['tournaments'] = [];
                foreach( $tournaments as $tournament )
                {
                    $data['tournaments'][$tournament->id] = [
                        'my_place' => ($tournament->my_place() ?: '---'),
                        'data'
                    ];
                    if( $tournament->stats )
                    {
                        foreach( $tournament->get_stats(0, 10, true) as $index => $stat )
                        {
                            $data['tournaments'][$tournament->id]['data'][] = [
                                'index' => $index,
                                'username' => $stat['username'],
                                'points' => $stat['points'],
                                'prize' => $stat['prize']
                            ];
                        }
                    }
                }
            }
            return json_encode($data);
        }
        public function message(\Illuminate\Http\Request $request)
        {
            $data = [
                'exist' => false,
                'message' => []
            ];
            $user = \VanguardLTE\User::where('id', auth()->user()->id)->first();
            if( $user )
            {
                $message = \VanguardLTE\Message::where([
                    'user_id' => auth()->user()->id,
                    'status' => 0
                ])->first();
                if( $message )
                {
                    $message->update(['status' => 1]);
                    $data['message'] = [
                        'text' => $message->value,
                        'type' => ($message->type != 'progress' ? __('app.' . $message->type) : $message->type),
                        'rating' => $user->badge(),
                        'currency' => $user->shop->currency
                    ];
                    $data['exist'] = true;
                }
            }
            return json_encode($data);
        }
        public function setlang($lang)
        {
            auth()->user()->update(['language' => $lang]);
            return redirect()->back();
        }
        public function agree()
        {
            auth()->user()->update(['agreed' => 1]);
            return redirect()->back();
        }
        public function contact_form(\Illuminate\Http\Request $request)
        {
            if( !$request->message )
            {
                return json_encode([
                    'fail' => true,
                    'text' => __('app.empty_message')
                ]);
            }
            $admin = \VanguardLTE\User::find(1);
            $admin->notify(new \VanguardLTE\Notifications\NewMessageFromContactForm($request->message));
            return json_encode([
                'success' => true,
                'text' => __('app.message_sent')
            ]);
        }
        public function success(\Illuminate\Http\Request $request)
        {
            return redirect()->route('frontend.profile.balance')->withSuccess(trans('app.payment_success'));
        }
        public function fail(\Illuminate\Http\Request $request)
        {
            return redirect()->route('frontend.profile.balance')->withSuccess(trans('app.payment_fail'));
        }
public function withdraw(\VanguardLTE\Http\Requests\User\WithdrawRequest $request)
{
    $user = auth()->user();

    $txtamount = $request->txtamount;
    $txtcurrency = $request->txtcurrency;

    if ((int)$user->balance < (int)$txtamount) {
        return redirect()->back()->withErrors([
            trans('app.not_enough_money_in_the_user_balance', [
                'name' => $user->username,
                'balance' => $user->balance
            ])
        ]);
    }

    $result = $user->addBalance('out', $txtamount);
    $result = json_decode($result, true);

    if ($result['status'] == 'error') {
        return redirect()->back()->withErrors([$result['message']]);
    }

    // Proceed with sending email if the user has an email
    if ($user->email) {
        $details = [
            'username' => $user->username,
            'email' => $user->email,
            'amount' => $txtamount,
            'currency' => $txtcurrency,
        ];

        Mail::to(env('APP_EMAIL'))->send(new UserWithdrawRequest($details));
    }

    $withdraw = new \VanguardLTE\Withdraw;
    $withdraw->user_id = $user->id;
    $withdraw->amount = $txtamount;
    $withdraw->currency = $txtcurrency;
    $withdraw->shop_id = $user->shop_id;
    $withdraw->wallet = $request->wallet;
    $withdraw->save();

    event(new \VanguardLTE\Events\User\UpdatedProfileDetails());

    return redirect()->back()->withSuccess([
        'title' => 'Thank you for your request the funds will be added to your wallet within 24 hours',
        'msg' => ''
    ]);
}

    }

}
