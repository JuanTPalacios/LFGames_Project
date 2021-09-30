
const User = require("../models/user");

// add some user functions here
// make changeUserNameOrEmail either nonexistent or practical
// tell ppl to fuck off if they want to change their email

const changeUserNameOrEmail = async (req, res) => {
        try {
          const { _id } = req.user;
        const {userName, userEmail } = req.body
        const user = await User.findById(userEmail)
        if(!user) return res.status(422).send({error: 'Must be signed in'})
        const updatedUser = User.findByIdAndUpdate(userEmail, {userName, userEmail})


        await updatedUser.save()
        return res.status(200).send({user});

        } catch (err) {
          console.log(err)
        }
}

module.exports = {
    changeUserNameOrEmail
}