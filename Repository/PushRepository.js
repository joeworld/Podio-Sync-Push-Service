const faye = require('faye');
const podio = require('podiojs');
const request = require('request');
const PushItem = require('../Models/PushItems');

podio.client.client_id = process.env.PODIO_CLIENT;
podio.client.client_secret = process.env.PODIO_SECRET;

const podioUser = {
    username: process.env.USER_NAME,
    password: process.env.PASS_WORD,
    user_id: process.env.USER_ID
};

exports.Push = async (_request) => {

    // Error handling for podiojs
    await podio.on('error', function(apiRequest, response, body){
        console.error('Podio Error:', body);
    });
    console.log("Starting Process!");
    // Initialize faye client
    const fayeClient = new faye.Client('https://push.podio.com/faye');
    // Extend faye client with signature and timestamp used for authentication
    await fayeClient.addExtension({
        'outgoing': function(message, callback) {
            message.ext = message.ext || {};
            message.ext = {private_pub_signature: push.channel.signature, private_pub_timestamp: push.channel.timestamp};
            callback(message);
        }
    });

    // Simple push object for handling a subscription
     const push = {
        subscription: null,
        channel: null,
        messageReceived: await async function(message) {
            console.log("New message received: ", message);
            // You probably want to filter out your own messages:
            if(message.data.created_by.type && message.data.created_by.type === 'user')
            {
                await request.post({
                    headers: {'content-type': 'application/json'},
                    url: 'https://in.thatapp.io/hook/5e261b10a46d287b2bf6446e',
                    body: JSON.stringify(message)
                }, function(error, response, body){
                        if (error) { return console.log("Post Error: ", error); }
                        console.log(body);
                        const Item = new PushItem({
                            'item_id': _request.item_id,
                            'event': (message.data.event ? message.data.event : "" )
                        });
                    Item.save();
                })
            }
        },
        addSubscription: await async function(channel) {
            this.channel = channel;
            this.subscription = fayeClient.subscribe(this.channel.channel, this.messageReceived);
            await this.subscription.then(function () {
                console.log('Subscription is now active');
            }, function (error) {
                console.error('Subscription failed: ', error.message, error);
            });
        }
    };

    // Authenticate with Podio
    // Locate push channel for user object
    // Add subscription to channel
    await podio.authenticate('password', {'username': podioUser.username, 'password': podioUser.password}, async function(response, body){
        await podio.get(`/item/${_request.item_id}`, {}, async function(response, body){
            await push.addSubscription(body.push);
        });
    });

    return {
        item_id: _request.item_id,
        message: "Subscribed Successfully"
    }

};