const EventsController = require("../models/EventsModel")
const AddEvent = async (req, res) => {
    try{
        const AddedEvent = await EventsController.create(req.body)
        res.status(200).json({
            message: "Event Added Successfully",
            data: AddedEvent
        })
    }catch(err){
    res.status(500).json({
        message: err.message || "Internal Server Error"
    })
    }
}
module.exports = {
    AddEvent
}