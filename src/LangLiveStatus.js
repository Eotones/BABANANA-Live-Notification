const EventEmitter = require('events');
const https = require('https');
//const fs = require("fs");

class LangLiveStatus extends EventEmitter {
    constructor(chat_room_id){
        super();
        
        this.chat_room_id = chat_room_id;

        this.lang_api = `https://api.kingkongapp.com/webapi/v1/room/info?room_id=${this.chat_room_id}`;
        this.lang_user_page = `https://play.lang.live/${this.chat_room_id}`;

        this.http_options = {
            method: 'GET',
            host: 'api.kingkongapp.com',
            headers: {
                referer: this.lang_user_page
            }
        };
    }

    _getLangPlayLiveRoomInfo(){
        https.get(this.lang_api, this.http_options, (res) => {
            let rawData = '';

            console.log('[Lang API] statusCode:', res.statusCode);
            //console.log('headers:', res.headers);

            res.on('data', (chunk) => {
                //process.stdout.write(chunk);
                rawData += chunk;
            });

            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    //console.log(parsedData);

                    //console.log(parsedData.data.live_info.live_status);
                    //console.log(parsedData.data.live_info.live_id);

                    if(parsedData.data.live_info.live_status == 1){
                        // console.log({
                        //     room_id: this.chat_room_id,
                        //     online: true,
                        //     live_id: parsedData.data.live_info.live_id
                        // });
                        
                        this.emit('status', 'online');
                    }else{
                        //hook.send("[目前沒在開台]");
                        //return false;
                        this.emit('status', 'offline');
                    }
                } catch (e) {
                    console.error(e.message);
                    //return false;
                    this.emit('status', 'unknown');
                }
            });

        }).on('error', (e) => {
            console.error(e);
            //return false;
            this.emit('status', 'unknown');
        });
    }

    _OnlineCheck(){
        //return false;
        setTimeout(() => {
            this._getLangPlayLiveRoomInfo();

            this._OnlineCheck();
        },60000);
    }

    start(){
        this._OnlineCheck();
    }
}

module.exports = LangLiveStatus;