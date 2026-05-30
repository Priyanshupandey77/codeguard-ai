import { useState } from "react";
import Editor from "@monaco-editor/react";
import { reviewCode } from "../services/reviewService";
import DashboardLayout from "../layouts/DashboardLayout";
import ScoreCard from "../components/ScoreCard";
import ReviewSection from "../components/ReviewSection";

const Dashboard = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState(null);

  const handleReview = async () => {
    try {
      setLoading(true);

      const result = await reviewCode(code);

      setReview(result.review.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">CodeGuard AI</h1>

        <Editor
          height="500px"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value)}
        />

        <button
          onClick={handleReview}
          disabled={loading}
          className="mt-4 bg-blue-600 px-6 py-3 rounded-lg"
        >
          {loading ? "Analyzing..." : "Analyze Code"}
        </button>

        {review && (
          <div className="mt-8 space-y-6">
            <div className="bg-zinc-900 p-4 rounded-lg">
              <h2 className="text-xl font-bold">
                <div className="grid lg:grid-cols-4 gap-6 mt-8">
                  <div className="lg:col-span-1">
                    <ScoreCard score={review.score} />
                  </div>

                  <div className="lg:col-span-3 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-3">Summary</h2>

                    <p className="text-zinc-400">{review.summary}</p>
                  </div>
                </div>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mt-6">
              <ReviewSection title="Bugs" icon="🐛" items={review.bugs} />

              <ReviewSection
                title="Performance"
                icon="⚡"
                items={review.performance}
              />

              <ReviewSection
                title="Security"
                icon="🔒"
                items={review.security}
              />

              <ReviewSection
                title="Clean Code"
                icon="🧹"
                items={review.cleanCode}
              />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
