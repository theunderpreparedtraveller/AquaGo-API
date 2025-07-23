const {
    order,
    confirmorder
} = require("./service");
const router = require("express").Router();
const fs = require("fs");
router.get('/order', (req, res) => {
    const processed = order(req,res);

    //res.json(processed);
  });
router.get("/confirmorder",(req,res)=>{
  confirmorder(req,res)
})
//Middleware to store user kyc related images
module.exports = router;