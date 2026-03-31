const UserSettings =require("../models/UserSettingsModel");
 const getUserSettings = async (req, res) => {
  try {
    const { userId } = req.params;
    let settings = await UserSettings.findOne({ userId });
    if (!settings) {
      settings = new UserSettings.create({ userId });
    }
    res.json({
      success: true,
      data: settings,
    });
  } catch (err) {
    res.status(500).json({
        success:false,
        message:"Failed to get User Settings"
    })
  }
};

const updateUserSettings = async (req,res) => {
    try{
  const {userId} = req.params;
  const settings = await UserSettings.findOneAndUpdate({userId},req.body,{new:true,upsert:true});
  res.json({
    success:true,
    data:settings
  });
    }catch(err){
res.json({
    success:false,
    message:"Failed to update the user settings"
})
    }
}
module.exports = {
  getUserSettings,
  updateUserSettings
}
