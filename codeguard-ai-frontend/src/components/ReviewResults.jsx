import ScoreCard from "../components/ScoreCard";
import ReviewSection from "../components/ReviewSection";
import CodeComparison from "../components/CodeComparison";

const ReviewResults = ({ review, originalCode, onReplace }) => {
  return (
    <div>
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

            <ReviewSection title="Security" icon="🔒" items={review.security} />

            <ReviewSection
              title="Clean Code"
              icon="🧹"
              items={review.cleanCode}
            />
          </div>
        </div>
      )}
      {review?.refactoredCode && (
        <CodeComparison
          originalCode={originalCode}
          refactoredCode={review.refactoredCode}
          onReplace={onReplace}
        />
      )}
    </div>
  );
};

export default ReviewResults;
