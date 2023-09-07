const express = require("express")
const router = express.Router();
const v1=require("./v1")
router.get("/",(req, res) => {
    res.send("index")
})

router.use("/api/v1",v1)

module.exports=router;