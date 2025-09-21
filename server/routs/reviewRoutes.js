const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.post("/", reviewController.createNewReview);          // יצירת ביקורת חדשה
router.get("/:productId", reviewController.getReviewsByProductId); // קבלת ביקורות לפי מוצר
router.delete("/:id", reviewController.deleteReview);        // מחיקת ביקורת

module.exports = router;
