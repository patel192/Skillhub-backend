const Schema = require("mongoose").Schema;
const EventSchema = Schema({
    title:{
        type:String,
        required:[true, "Event title is required"]
    },
    description:{
        type:String,
        required:[true, "Event description is required"],
    },
        date:{
            type:Date,
            required:[true, "Event date is required"]
        },
        location:{
            type:String,
            required:[true, "Event location is required"]
        },
        hostId:{
            type:Schema.Types.OnjectId,
            ref:"User"
        },
        banner:{
            type:String,
            required:[true, "Event banner is required"]
        },
        registeredUsers:[{
            type:Schema.Types.ObjectId,
            ref:"User"
        }]
},{
    timestamps:trueq
})