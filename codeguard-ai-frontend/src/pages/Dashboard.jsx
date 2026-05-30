import { useState } from "react";
import Editor from "@monaco-editor/react";
import { reviewCode } from "../services/reviewService";
import DashboardLayout from "../layouts/DashboardLayout";
import ScoreCard from "../components/ScoreCard";
import ReviewSection from "../components/ReviewSection";
import { Bot } from "lucide-react";

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

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-400 text-sm">Reviews</p>

            <h2 className="text-3xl font-bold">24</h2>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-400 text-sm">Avg Score</p>

            <h2 className="text-3xl font-bold">7.2</h2>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-400 text-sm">Issues Found</p>

            <h2 className="text-3xl font-bold">61</h2>
          </div>
        </div>

        <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 border-b-0 rounded-t-2xl px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
          </div>

          <div className="text-sm text-zinc-400">JavaScript</div>

          <div className="text-sm text-zinc-500">
            {code.split("\n").length} Lines
          </div>
        </div>

        <div className="overflow-hidden rounded-b-2xl border border-zinc-800">
          <Editor
            height="500px"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
          />
        </div>

        <button
          onClick={handleReview}
          disabled={loading}
          className="
            mt-6
            flex
            items-center
            gap-2
           bg-blue-600
           hover:bg-blue-700
            hover:scale-105
            transition-all
            px-6
            py-3
            rounded-xl
            font-medium
            shadow-lg
            shadow-blue-500/20
          "
        >
          <Bot size={18} />

          {loading ? "Analyzing..." : "AI Review Code"}
        </button>

        {!review && (
          <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-10">
            <h2 className="text-2xl font-bold mb-4">🚀 Ready to review code</h2>

            <p className="text-zinc-400 mb-6">
              Paste your code into the editor and get instant AI-powered
              feedback.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-800 rounded-xl p-4">🐛 Bug Detection</div>

              <div className="bg-zinc-800 rounded-xl p-4">
                🔒 Security Review
              </div>

              <div className="bg-zinc-800 rounded-xl p-4">
                ⚡ Performance Analysis
              </div>

              <div className="bg-zinc-800 rounded-xl p-4">
                🧹 Clean Code Suggestions
              </div>
            </div>
          </div>
        )}

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
