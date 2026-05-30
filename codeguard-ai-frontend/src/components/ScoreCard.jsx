const ScoreCard = ({ score }) => {
  const getColor = () => {
    if (score <= 3) return "text-red-500";
    if (score <= 6) return "text-yellow-500";
    if (score <= 8) return "text-blue-500";

    return "text-green-500";
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <p className="text-zinc-400 mb-2">Code Quality</p>

      <h1 className={`text-6xl font-bold ${getColor()}`}>{score}</h1>

      <p className="text-zinc-500">out of 10</p>
    </div>
  );
};

export default ScoreCard;
