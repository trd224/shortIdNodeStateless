const express = require("express");
const router = express.Router();
const {generateNewShortUrl, visitShortUrl, getAllUrls} = require("../controllers/url")

router.post("/", generateNewShortUrl);
router.get("/:shortId", visitShortUrl);
router.get("/", getAllUrls);

module.exports = router;