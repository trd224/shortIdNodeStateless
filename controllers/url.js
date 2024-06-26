const shortid = require("shortid");
const Url = require("../models/url");

async function generateNewShortUrl(req, res){
    const body = req.body;
    if(!body.redirectUrl) return res.status(400).json({error: 'url is required'})

    const shortID = shortid.generate()
    
    await Url.create({
        shortId: shortID,
        redirectUrl: body.redirectUrl,
        visitHistory: [],
        createdBy: req.user._id
    })
    return res.render("home", {
        id: shortID
    })
    //return res.json({id: shortID});
}

async function visitShortUrl(req, res){
    const shortId = req.params.shortId;
    const entry = await Url.findOneAndUpdate({
        shortId
    },{
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    })
    res.redirect(entry.redirectUrl);
}

async function getAllUrls(req, res){
    const urls = await Url.find({});
    return res.json(urls);
    
}

module.exports = {
    generateNewShortUrl,
    visitShortUrl,
    getAllUrls
}