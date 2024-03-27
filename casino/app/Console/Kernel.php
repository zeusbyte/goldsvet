<?php 
namespace VanguardLTE\Console
{
    class Kernel extends \Illuminate\Foundation\Console\Kernel
    {
        protected $commands = [];
        protected function schedule(\Illuminate\Console\Scheduling\Schedule $schedule)
        {
            $schedule->command('queue:work --daemon > /dev/null 2>&1')->everyMinute()->withoutOverlapping();
            $schedule->call(function()
            {
                \Spatie\DbDumper\Databases\MySql::create()->setDbName(config('database.connections.mysql.database'))->setUserName(config('database.connections.mysql.username'))->setPassword(config('database.connections.mysql.password'))->dumpToFile(base_path() . '/backups/' . date('Hi_dmY') . '.sql');
            })->daily();
            $_obf_0D2F242F2D052B0938193F2D0D2F192F27160616153332 = 45;
            $schedule->call(new Schedules\Tournaments($_obf_0D2F242F2D052B0938193F2D0D2F192F27160616153332))->everyMinute();
            $schedule->call(new Schedules\SMSBonuses($_obf_0D2F242F2D052B0938193F2D0D2F192F27160616153332))->everyMinute();
            $schedule->call(new Schedules\Securities($_obf_0D2F242F2D052B0938193F2D0D2F192F27160616153332))->everyFiveMinutes();
            $schedule->call(new Schedules\ShopCreates($_obf_0D2F242F2D052B0938193F2D0D2F192F27160616153332))->everyMinute();
            $schedule->call(new Schedules\ShopDeletes($_obf_0D2F242F2D052B0938193F2D0D2F192F27160616153332))->everyMinute();
            $schedule->call(new Schedules\Synchronization($_obf_0D2F242F2D052B0938193F2D0D2F192F27160616153332))->everyMinute();
            $schedule->call(new Schedules\QuickShops($_obf_0D2F242F2D052B0938193F2D0D2F192F27160616153332))->everyMinute();
            $schedule->call(new Schedules\HierarchyUsersCache($_obf_0D2F242F2D052B0938193F2D0D2F192F27160616153332))->everyFiveMinutes();
            $schedule->call(new Schedules\TreeCache($_obf_0D2F242F2D052B0938193F2D0D2F192F27160616153332))->everyFiveMinutes();
            $schedule->call(new Schedules\HotGamesCache($_obf_0D2F242F2D052B0938193F2D0D2F192F27160616153332))->everyThreeHours();
            $schedule->call(new Schedules\BankDecrease($_obf_0D2F242F2D052B0938193F2D0D2F192F27160616153332))->everyThreeHours();
            $schedule->call(new Schedules\Notifications($_obf_0D2F242F2D052B0938193F2D0D2F192F27160616153332))->everyMinute();
            $schedule->call(new Schedules\ClearLogs($_obf_0D2F242F2D052B0938193F2D0D2F192F27160616153332))->everyMinute();
            $schedule->call(new Schedules\GameEvents($_obf_0D2F242F2D052B0938193F2D0D2F192F27160616153332))->everyFiveMinutes();
            $schedule->call(new Schedules\RemoveGamesWithoutFolder($_obf_0D2F242F2D052B0938193F2D0D2F192F27160616153332))->everyMinute();
            $schedule->call(new Schedules\SMSMailings($_obf_0D2F242F2D052B0938193F2D0D2F192F27160616153332))->everyMinute();
            $schedule->call(new Schedules\EveryFiveMinutesCleanUp($_obf_0D2F242F2D052B0938193F2D0D2F192F27160616153332))->everyFiveMinutes();
            $schedule->call(new Schedules\EveryMinuteCleanUp($_obf_0D2F242F2D052B0938193F2D0D2F192F27160616153332))->everyMinute();
        }
        protected function commands()
        {
            require(base_path('routes/console.php'));
        }
    }

}
