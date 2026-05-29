import { useState } from "react";
import Editor from "@monaco-editor/react";
import { reviewCode } from "../services/reviewService";

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
            <h2 className="text-xl font-bold">Score: {review.score}/10</h2>
          </div>

          <div className="bg-zinc-900 p-4 rounded-lg">
            <h2 className="font-bold mb-2">🐛 Bugs</h2>

            {review.bugs.map((bug, index) => (
              <p key={index}>{bug.message}</p>
            ))}
          </div>

          <div className="bg-zinc-900 p-4 rounded-lg">
            <h2 className="font-bold mb-2">⚡ Performance</h2>

            {review.performance.map((item, index) => (
              <p key={index}>{item.message}</p>
            ))}
          </div>

          <div className="bg-zinc-900 p-4 rounded-lg">
            <h2 className="font-bold mb-2">🔒 Security</h2>

            {review.security.map((item, index) => (
              <p key={index}>{item.message}</p>
            ))}
          </div>

          <div className="bg-zinc-900 p-4 rounded-lg">
            <h2 className="font-bold mb-2">🧹 Clean Code</h2>

            {review.cleanCode.map((item, index) => (
              <p key={index}>{item.message}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
