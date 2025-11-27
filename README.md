<h1 align="center">OSS Casino 2K25</h1>
<h2 align="center">Formerly Goldsvet</h2>
<h2 align="center">Web Casino Server Configuration Guide</h2>
<p align="center">
<a href="https://t.me/osscasino" rel="nofollow"><strong>Official Telegram Community</strong></a>
</p>

<p align="center">
    <img src="https://raw.githubusercontent.com/zeusbyte/goldsvet/main/slot.png" alt="OSS Casino" width="60%">
</p>

<p align="center">
    <!-- <a href="https://cosmo-win.club/" title="DEMO"><strong>DEMO</strong></a> &nbsp; | &nbsp; -->
    <a href="https://t.me/osscasino" rel="nofollow"><strong>TELEGRAM GROUP</strong></a>
</p>

<h3 align="center" style="color: #ff0000;">BEWARE OF ANY FORK/LINK THAT IMPERSONATES OUR OFFICIAL ACCOUNT @goldsvetcasino1 this not our GROUP anymore. The new group USERNAME is @osscasino.</h3>

<p align="center">
    <span style="color:#ff0000"><strong>OSS Casino Latest 2025 release adds Laravel 10 and PHP 8.1+ support, Easy-Installer.</strong></span>
</p>

<p align="center">
     <img src="https://raw.githubusercontent.com/zeusbyte/goldsvet/main/2025.jpg" alt="OSS Casino1" width="80%">
</p>

<h2>This code is just a preview. Contact admin on Telegram for the full version.</h2>

<p><b>Currently, we provide the full source on my Telegram. There are approximately 1200 games totaling 45+ GB, including the latest Pragmatic games fixed & support mobile responsive.</b></p>
<p><b>You can message me on Telegram for the full source code, including installation into your VPS/Dedicated Server.</b></p>

<p style="color:#ff0000"><strong>Multiple fixes and merged single database.</strong></p>
<p>Demo USER /Demo Play games have been added and activated. Added 100 games, bringing the total to 1200 games now.</p>

### Server Setup Instructions

1. **Set up your server with the following components:**
    - OS: Almalinux 8 / CentOS 7 recommended
    - Apache
    - MySQL
    - PHP 8.0+
    - Laravel 10
    - Node.js 16
    - PM2
    - Redis

2. Enforce SSL for the domain.

3. Extract/Clone this repo into the public_html folder.

4. Enable PHP Extensions: Fileinfo, Imagick, Redis.

5. Create a new email and set a password.

6. Create a new database and grant full access.

7. Import the SQL file db.sql from the directory.

8. Ensure SSL is enforced for the domain.

9. Run the following command in the terminal under the public_html folder:
    

```bash
    composer install
```


10. Generate SSL CRT, KEY, and BUNDLE. Copy the contents of your CRT/KEY/BUNDLE to files in the /casino/PTwebsocket/ssl/ folder.

11. For file uploads:
    - **Additional Tip:** Since it includes demo user accounts, generate a new password hash for existing users. Execute the following in phpMyAdmin (replace the hash). If you need to hash a new word, run this in phpMyAdmin:
        - [bcrypt-generator.com](https://bcrypt-generator.com/)

### Minimal Installer

Upload/Clone all files from this repo and run yourdomain.com/setup.php. It will help you handle the installation.

### SSL Instructions

1. Delete any self-signed certificates.
2. Generate or install the Let's Encrypt certificate if available.
3. Save the text file via notepad or directly as follows:
    - Certificate (CRT) ==> crt.crt
    - Private Key (KEY) ==> key.key
4. Go to the folder PTWebSocket/ssl and replace those three files.
5. Edit .env and /config/app.php (URL line 65) for domain, database, user/password, email, and password.

### File Edits

Edit the / Socket File Changes in JSON files.

### PM2 Commands

PM2 COMMANDS: [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)

<p>SAMPLE USEFUL COMMANDS</p>

```bash
pm2 stop all
pm2 delete all
pm2 flush
pm2 logs
pm2 save
```

FROM INSIDE PTWEBSOCKET web folder COMMANDS:

```bash
pm2 start Arcade.js --watch
pm2 start Server.js --watch
pm2 start Slots.js --watch
```

### Allow Firewall Command

Set your port for websocket then run these on terminal:

```bash
firewall-cmd --zone=public --add-port=xxxx/tcp --permanent
firewall-cmd --zone=public --add-port=xxxx/tcp --permanent
firewall-cmd --zone=public --add-port=xxxx/tcp --permanent
firewall-cmd --reload
```

<h2>Interested or have a question?</h2>
<p><b>Contact me from the contact listed if you are interested in purchase/installation.</b></p>

<p dir="auto"><a href="https://t.me/chessmate77" rel="nofollow">Personal Telegram</a></p>
<p dir="auto"><a href="https://t.me/osscasino" rel="nofollow">Telegram Group</a></p>
<p dir="auto">&nbsp;</p>

<h3 align="center" style="color: #ff0000;">BEWARE OF ANY FORK/LINK THAT IMPERSONATES OUR OFFICIAL ACCOUNT @goldsvetcasino1 this not our GROUP anymore. The new group official name is t.me/osscasino</h3>
<!-- <h3 align="center" style="color: #ff0000;">SCAMMER CHANNEL</h3> -->
<p align="center">
<!-- <img src="https://raw.githubusercontent.com/zeusbyte/goldsvet/main/goldsvetcasino1scammer.png" alt="Scammer Report" width="80%"> -->
<a href="https://raw.githubusercontent.com/zeusbyte/goldsvet/main/goldsvetcasino1scammer.png" rel="nofollow"><strong>SCAMMER 1</strong></a>
</p>
