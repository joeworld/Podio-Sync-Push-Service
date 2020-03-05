const PushRepo = require('../Repository/PushRepository');

exports.Process = async (req, res) => {
    try {
        if(!req.body.item_id) return await res.status(422).json({ status: 422, data: {message: "item_id is required"} });
        let element = await PushRepo.Push(req.body);
        return await res.status(200).json({ status: 200, data: element });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }
};