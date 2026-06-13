const StatsCard = ({ stats }) => {
  return (
    <div className="grid md:grid-cols-3 gap-4 mb-6">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        <p className="text-zinc-400 text-sm">Reviews</p>

        <h2 className="text-3xl font-bold">{stats.reviews}</h2>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        <p className="text-zinc-400 text-sm">Avg Score</p>

        <h2 className="text-3xl font-bold">{stats.averageScore}</h2>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        <p className="text-zinc-400 text-sm">Issues Found</p>

        <h2 className="text-3xl font-bold">{stats.issues}</h2>
      </div>
    </div>
  );
};

export default StatsCard;
