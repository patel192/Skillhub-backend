const eventEmitter = require("./EventEmitter")
const ActivityLog = require("../models/ActivityLogModel")
const Notification = require("../models/NotificationModel")
 eventEmitter.on("ENROLLMENT_CREATED",async(payload)=>{
    const {userId,courseId} = payload
     try{
      await ActivityLog.create({
        userId,
        action:"ENROLLED",
        targetType:"Course",
        targetId:courseId,
        message:`User enrolled in course ${courseId}`
      })
      await Notification.create({
        userId,
        type:"COURSE_ENROLLMENT",
        message:`You have successfully enrolled in course ${courseId}`,
        read:false
      })
     }catch(err){
     res.status(500).json({
      message:err.message || "Internal server error"
     })
     }
 })