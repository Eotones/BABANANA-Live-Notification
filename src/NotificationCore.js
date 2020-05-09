class NotificationCore {
    constructor(){
        // this.isPosted = false;
        // this.lastPostTime = '';

        this.loopCount = 0;
        this.lastOnlineStatus = 'unknown';
        this.thisTimeOnlineStatus = 'unknown';

        this.msgQueue = [];
        this.statusQueue = [];

        this.statusMsg = [];
        this.statusMsg['online'] = 'stream online';
        this.statusMsg['offline'] = 'stream offline';

        this.statusQueue.push('unknown');
    }

    setOnlineMsg(msg){
        this.statusMsg['online'] = msg;
    }

    setOfflineMsg(msg){
        this.statusMsg['offline'] = msg;
    }

    start(){
        this._autoPost();
    }
    
    _addStatusQueue(status){
        this.thisTimeOnlineStatus = status
        
        if(status !== this.statusQueue[this.statusQueue.length-1] || this.statusQueue.length <= 0){
            //
            this.statusQueue.push(status);
        }

        if(this.statusQueue.length > 1){
            this.statusQueue.shift();
        }

        console.log(this.statusQueue);
    }

    sendOnlineMsg(){
        this._addStatusQueue('online');
    }

    sendOfflineMsg(){
        this._addStatusQueue('offline');
    }

    _autoPost(){
        setTimeout(async () => {
            if(this.statusQueue.length > 0){
                try {
                    if(this._isFirstTimePost(this.statusQueue)){
                        await this._post(this.statusMsg[this.statusQueue[0]]);

                        this.lastOnlineStatus = this.statusQueue[0];
                        
                        this.statusQueue.shift();
                    }
                } catch (error) {
                    console.log(error);
                }
            }

            //this.lastOnlineStatus = this.thisTimeOnlineStatus;
            this.loopCount++;

            this._autoPost();
        }, 5000);
    }

    _post(msg){} /* extends 這個 class 然後 override 這個 function */

    _isFirstTimePost(statusQueue){
        if(statusQueue.length > 0 && statusQueue[0] !== 'unknown' && statusQueue[0] !== this.lastOnlineStatus){
            return true;
        }else{
            return false;
        }
    }
}

module.exports = NotificationCore;