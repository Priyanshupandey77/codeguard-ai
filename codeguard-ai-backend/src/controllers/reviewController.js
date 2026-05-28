import Review from "../models/review.js";
import { reviewCodeWithAI } from "../services/aiService.js";

export const reviewCode = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Code is required",
      });
    }

    // AI review
    const aiResponse = await reviewCodeWithAI(code);

    // save review
    const savedReview = await Review.create({
      user: req.user._id,
      code,
      result: aiResponse,
      score: aiResponse.score,
    });

    res.status(200).json({
      success: true,
      review: savedReview,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
