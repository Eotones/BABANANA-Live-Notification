# BABANANA-Live-Notification
LangPlay unofficial live notification / LangPlay非官方版直播通知,目前支援:
* Discord Webhook

## Requirements
* Node.js >= v12

## Installation

```bash
$ git clone https://github.com/Eotones/BABANANA-Live-Notification.git
$ cd BABANANA-Live-Notification
$ npm i
```

then

* copy `config.json.example`
* change filename to `config.php`
    * edit your
        * `"LangPlayRoomId"` - LangPlay room id
        * `"DiscordWebhookLink"` - Discord webhook url
        * `"OnlineMsg"` - stream online message
        * `"OfflineMsg"` - stream offline message

```bash
$ npm start
```

## License
MIT