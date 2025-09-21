const Review = require("../modles/Review");

// יצירת ביקורת חדשה
const createNewReview = async (req, res) => {
  const { productId, user, rating, comment } = req.body;

  if (!productId || !user || !rating || !comment) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const review = await Review.create({ productId, user, rating, comment });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// קבלת כל הביקורות של מוצר
const getReviewsByProductId = async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.find({ productId }).lean();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// מחיקת ביקורת
const deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findById(id);
    if (!review) return res.status(400).json({ message: "Review not found" });
    await review.deleteOne();
    res.json({ message: `Review ${id} deleted` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createNewReview, getReviewsByProductId, deleteReview };
