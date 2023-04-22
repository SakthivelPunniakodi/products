const express = require("express");
const router = express.Router();
const products = require("../controller/products.js")

router.get('/get', (req,res)=>{
    res.send("Welcome to product api.")
});

router.post('/product/create',products.CreateProduct);
router.delete('/product/delete',products.DeleteProduct);
router.get('/product/get',products.getProduct);
router.get('/product/mostviewed', products.ListMostViewed);

module.exports = router;