const express = require("express");
const router = express.Router();
const {
  getProducts,
  askProducts
} = require("../controllers/productController");

router.get("/products", getProducts);
router.post("/ask", askProducts);

module.exports = router;