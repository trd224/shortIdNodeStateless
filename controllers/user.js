const { v4: uuidv4 } = require('uuid');
const { setUser } = require("../services/auth");
const User = require("../models/user");

async function userSignUp(req, res){
    console.log(req)
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password
    })

    return res.redirect("/login");

}

// async function userLogin(req, res){
//     const {email, password} = req.body;
//     const user = await User.findOne({email, password});
//     console.log(user);
//     if(!user){
//         return res.render("login",{
//             error: "Invalid email or password"
//         });
//     }
//     return res.redirect("/");
    
// }

async function userLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    console.log(user);

    if (!user) {
        return res.render("login", {
            error: "Invalid email or password"
        });
    }
    
    const token = setUser(user);
    res.cookie("uid", token);
    return res.redirect("/");
}


module.exports = {
    userSignUp,
    userLogin
}