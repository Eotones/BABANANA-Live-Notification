const NotificationCore = require('./NotificationCore.js');
const webhook = require('discord-webhook-node');

class DiscordWebhook extends NotificationCore {
    constructor(webhook_link){
        super();
        
        this.webhook_link = webhook_link;

        this.hook = new webhook.Webhook(webhook_link);
    }

    _post(msg){ /* override */
        console.log(`[Discord Webhook] ${msg}`);
        return this.hook.send(msg);
    }

    post_test(msg){
        console.log(`[Discord Webhook] ${msg}`);
        this.hook.send(msg);
    }
}

module.exports = DiscordWebhook;