const ReviewSection = ({ title, icon, items = [] }) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
      <h2 className="font-semibold text-lg mb-4">
        {icon} {title}
      </h2>

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-green-400">No issues found</p>
        ) : (
          items.map((item, index) => (
            <div key={index} className="border border-zinc-800 rounded-xl p-3">
              <p>{item.message}</p>

              {item.severity && (
                <span
                  className={`
                    inline-block mt-2 px-2 py-1 rounded text-xs
                    ${
                      item.severity === "high"
                        ? "bg-red-500/20 text-red-400"
                        : item.severity === "medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-blue-500/20 text-blue-400"
                    }
                  `}
                >
                  {item.severity}
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
