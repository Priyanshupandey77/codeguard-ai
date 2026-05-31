import { useEffect, useState } from "react";
import { getHistory } from "../services/historyService";
import DashboardLayout from "../layouts/DashboardLayout";

const History = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getHistory();
      setReviews(data.reviews);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold mb-8">Review History</h1>

      {loading ? (
        <p>Loading...</p>
      ) : reviews.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold mb-3">No Reviews Yet</h2>

          <p className="text-zinc-400">
            Analyze some code to build your review history.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Score {review.score}/10</h2>

                <span className="text-zinc-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="text-zinc-400 mt-3">{review.result.summary}</p>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default History;
