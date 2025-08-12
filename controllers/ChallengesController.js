const {VM} = require("vm2")
const ChallengesModel = require("../models/ChallengesModel");
const AddChallenge = async (req, res) => {
  try {
    const AddedChallenge = await ChallengesModel.create(req.body);
    res.status(201).json({
      Message: "Challenge Added successfully",
      data: AddedChallenge,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const GetChallengesByCoursId = async (req,res)=>{
  try{
    const Courses = await ChallengesModel.find({courseId:req.params.courseId})
    res.status(200).json({
      message:"Challenges Fetched Successfully",
      data:Courses
    })
  }catch(err){
   res.status(500).json({
    message:err.message
   })
  }
}
const VerifyChallenge = async (req, res) => {
  const { userCode } = req.body;
  const challenge = await ChallengesModel.findById(req.params.id);
  if (!challenge) {
    return res.status(404).json({ success: false, message: "Challenge Not Found" });
  }

  let funcName;
  try {
    funcName = challenge.starterCode.match(/function (\w+)/)[1];
  } catch {
    return res.status(400).json({ success: false, message: "Invalid starter code format." });
  }

  const vm = new VM({ timeout: 1000, sandbox: {} });

  try {
    vm.run(userCode);

    let allPassed = true;
    let results = [];

    for (const test of challenge.testCases) {
      let output;
      let passed = false;

      try {
        output = vm.run(`${funcName}(...${JSON.stringify(test.input)})`);
        passed = JSON.stringify(output) === JSON.stringify(test.expectedOutput);
      } catch (err) {
        output = `Error: ${err.message}`;
        passed = false;
      }

      results.push({ input: test.input, output, expected: test.expectedOutput, passed });
      if (!passed) allPassed = false;
    }

    res.json({ success: allPassed, results });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};


module.exports = { AddChallenge, GetChallengesByCoursId,VerifyChallenge}