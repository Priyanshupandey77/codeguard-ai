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

    const result = await reviewCodeWithAI(code);

    res.json({
      success: true,
      review: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
