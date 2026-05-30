import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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

      <div className="w-32 h-32 mx-auto">
        <CircularProgressbar
          value={score * 10}
          text={`${score}/10`}
          styles={{
            path: {
              stroke: getColor(),
            },
            text: {
              fill: getColor(),
              fontSize: "16px",
              fontWeight: "bold",
            },
            trail: {
              stroke: "#27272a",
            },
          }}
        />
      </div>
    </div>
  );
};

export default ScoreCard;
