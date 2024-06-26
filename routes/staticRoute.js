const express = require("express");
const router = express.Router();
const Url = require("../models/url");
const {restrictToLoggedinUserOnly} = require("../middlewares/auth");

router.get('/', restrictToLoggedinUserOnly, async(req, res) => {
    const urls = await Url.find({createdBy: req.user._id});
    return res.render("home", {
        urls
    });
})

router.get('/about', restrictToLoggedinUserOnly, (req, res) => {
    return res.render("about");
})

router.get('/signup', (req, res) => {
    return res.render("signup");
})

router.get('/login', (req, res) => {
    return res.render("login");
})



module.exports = router;