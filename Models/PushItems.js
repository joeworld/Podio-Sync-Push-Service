const mongoose = require('mongoose');

const PushItemSchema = new mongoose.Schema({
    item_id: String,
    event: String,
}, {timestamps: true});

const PushItemDB = mongoose.connection.useDb('Essentials');

const PushItem = PushItemDB.model('push_items', PushItemSchema);

module.exports = PushItem;