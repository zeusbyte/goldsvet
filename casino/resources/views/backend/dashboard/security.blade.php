@extends('backend.layouts.app')

@section('page-title', trans('app.security'))
@section('page-heading', trans('app.security'))

@section('content')

    <section class="content-header">
        @include('backend.partials.messages')
    </section>

    <section class="content">


        <form action="" method="GET" id="securities-form" >
            <div class="box box-danger collapsed-box securities_show">

                <div class="box-header with-border">
                    <h3 class="box-title">@lang('app.filter')</h3>
                    <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i></button>
                    </div>
                </div>
                <div class="box-body">
                    <div class="row">
                        <div class="col-md-6">
                            <label>@lang('app.type')</label>
                            {!! Form::select('type', ['' => '---', 'user' => 'User', 'game' => 'Game', 'shop' => 'Shop'], Request::get('type'), ['class' => 'form-control']) !!}
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label> @lang('app.date')</label>
                                <div class="input-group">
                                    <button type="button" class="btn btn-default pull-right" id="daterange-btn">
                                        <span><i class="fa fa-calendar"></i> {{ Request::get('dates_view') ?: __('app.date_start_picker') }}</span>
                                        <i class="fa fa-caret-down"></i>
                                    </button>
                                </div>
                                <input type="hidden" id="dates_view" name="dates_view" value="{{ Request::get('dates_view') }}">
                                <input type="hidden" id="dates" name="dates" value="{{ Request::get('dates') }}">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box-footer">
                    <button type="submit" class="btn btn-primary">
                        @lang('app.filter')
                    </button>
                </div>

            </div>
        </form>

        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">@lang('app.security')</h3>
            </div>
            <div class="box-body">


                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>@lang('app.name')</th>
                            <th>@lang('app.in')</th>
                            <th>@lang('app.out')</th>
                            <th>@lang('app.total')</th>
                            <th>@lang('app.balance')</th>
                            <th>@lang('app.rtp')</th>
                            <th>@lang('app.win')</th>

                            <th>@lang('app.count2')</th>
                            <th>@lang('app.shop')</th>
                            <th>@lang('app.date')</th>
                        </tr>
                        </thead>
                        <tbody>
                        @if (count($securities))
                            @foreach ($securities as $security)
                                @if($security->shop)
                                    <tr>
                                        <td>
                                            @if( strripos($security->type, 'user')  !== false )
                                                <a href="{{ route('backend.user.edit', $security->item_id) }}">
                                                    @if ($security->user)
                                                    <a href="{{ route('backend.user.edit', $security->item_id) }}">
                                                        {{ $security->user->username }}
                                                    </a>
                                                @endif
                                                </a>
                                            @elseif( strripos($security->type, 'shop')  !== false )
                                                <a href="{{ route('backend.shop.edit', $security->item_id) }}">
                                                    {{ $security->shop->name }}
                                                </a>
                                            @else
                                                <a href="{{ route('backend.game.edit', $security->item_id) }}">
                                                    {{ $security->game->name }}
                                                </a>
                                            @endif
                                            <br>
                                            {{ $security->category }}
                                        </td>
                                        <td>{{ $security->pay_in }}</td>
                                        <td>{{ $security->pay_out }}</td>
                                        <td>{{ $security->pay_total }}</td>
                                        <td>{{ $security->balance }}</td>
                                        <td>{{ $security->rtp }}</td>
                                        <td>{{ $security->win }}</td>
                                        <td>{{ $security->count }}</td>
                                        <td>
                                            @if( $security->shop )
                                                <a href="{{ route('backend.shop.edit', $security->shop_id) }}">
                                                    {{ $security->shop->name }}
                                                </a>
                                            @endif
                                        </td>
                                        <td>{{ \Carbon\Carbon::parse($security->created_at)->format(config('app.time_format')) }}</td>
                                    </tr>
                                @endif
                            @endforeach
                        @else
                            <tr><td colspan="10">@lang('app.no_data')</td></tr>
                        @endif
                        </tbody>
                        <thead>
                        <tr>
                            <th>@lang('app.name')</th>
                            <th>@lang('app.in')</th>
                            <th>@lang('app.out')</th>
                            <th>@lang('app.total')</th>
                            <th>@lang('app.balance')</th>
                            <th>@lang('app.rtp')</th>
                            <th>@lang('app.win')</th>
                            <th>@lang('app.count2')</th>
                            <th>@lang('app.shop')</th>
                            <th>@lang('app.date')</th>
                        </tr>
                        </thead>
                    </table>

                    {{ $securities->links() }}

                </div>
            </div>
        </div>



    </section>

@stop

@section('scripts')

    <script>

        $("#filter").detach().appendTo("div.toolbar");

        $('.btn-box-tool').click(function(event){
            if( $('.securities_show').hasClass('collapsed-box') ){
                $.cookie('securities_show', '1');
            } else {
                $.removeCookie('securities_show');
            }
        });

        if( $.cookie('securities_show') ){
            $('.securities_show').removeClass('collapsed-box');
            $('.securities_show .btn-box-tool i').removeClass('fa-plus').addClass('fa-minus');
        }


    </script>
@stop
