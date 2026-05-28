import Review from "../models/review.js";

export const getReviewHistory = async (req, res) => {
  try {
    const reviews = await Review.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
