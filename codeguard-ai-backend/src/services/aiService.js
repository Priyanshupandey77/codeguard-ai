import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/* -----------------------------
   NORMALIZE ISSUES
------------------------------*/
function normalizeIssues(arr) {
  if (!Array.isArray(arr)) return [];

  return arr.map((item) => {
    if (typeof item === "string") {
      return {
        message: item,
        severity: "low",
      };
    }

    return {
      message: item.message || "Unknown issue",
      severity: item.severity || "low",
    };
  });
}

/* -----------------------------
   HYBRID SCORE CALCULATION
------------------------------*/
function calculateScore(review) {
  let score = 10;

  const bugs = review.bugs || [];
  const security = review.security || [];
  const performance = review.performance || [];

  const highBugs = bugs.filter((b) => b.severity === "high").length;
  const mediumBugs = bugs.filter((b) => b.severity === "medium").length;
  const lowBugs = bugs.filter((b) => b.severity === "low").length;

  score -= highBugs * 4;
  score -= mediumBugs * 2;
  score -= lowBugs * 1;

  score -= security.length * 3;
  score -= performance.length * 1;

  const hasCriticalError = bugs.some((b) =>
    ["syntax error", "unexpected", "missing", "undefined"].some((keyword) =>
      b.message.toLowerCase().includes(keyword),
    ),
  );

  if (hasCriticalError) {
    score = Math.min(score, 3);
  }

  return Math.max(0, Math.min(10, score));
}

/* -----------------------------
   MAIN FUNCTION
------------------------------*/
export const reviewCodeWithAI = async (code) => {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is missing in .env");
  }
  try {
    if (!code || typeof code !== "string") {
      throw new Error("Code input is required");
    }

    const prompt = `
You are a senior software engineer.

Perform a strict code review.

Return ONLY valid JSON.

Rules:
- No markdown
- No explanation text
- Must return JSON only

Severity levels:
- low
- medium
- high

Scoring rules:
- 0–3 very bad code
- 4–6 average code
- 7–8 good code
- 9–10 excellent production-ready code

Also generate a refactored version of the code.

The refactored code should:

- Fix identified issues
- Improve readability
- Follow best practices
- Maintain the same functionality

Return it in:
refactoredCode

Return format:
{
  "bugs": [
    { "message": "", "severity": "" }
  ],
  "performance": [],
  "security": [],
  "cleanCode": [],
  "score": 0,
  "summary": "",
   "refactoredCode": ""
}

Code:
${code}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
      response_format: { type: "json_object" },
    });

    const text = completion.choices[0].message.content;

    console.log("RAW AI RESPONSE:", text);

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch (err) {
      throw new Error("AI returned invalid JSON");
    }

    // Normalize AI response
    const review = {
      bugs: normalizeIssues(parsed.bugs),
      performance: normalizeIssues(parsed.performance),
      security: normalizeIssues(parsed.security),
      cleanCode: normalizeIssues(parsed.cleanCode),
      summary: typeof parsed.summary === "string" ? parsed.summary : "",
      refactoredCode:
    typeof parsed.refactoredCode === "string"
      ? parsed.refactoredCode
      : "",
      
    };

    // Hybrid scoring (AI + rules)
    const aiScore = typeof parsed.score === "number" ? parsed.score : 5;
    const ruleScore = calculateScore(review);

    const finalScore = Math.round(ruleScore * 0.7 + aiScore * 0.3);

    return {
      bugs: review.bugs,
      performance: review.performance,
      security: review.security,
      cleanCode: review.cleanCode,
      summary: review.summary,
      score: finalScore,
      refactoredCode: review.refactoredCode,
    };
  } catch (error) {
    console.error("AI Error:", error);
    throw new Error(`AI Review Failed: ${error.message}`);
  }
};
