import { useMatchmaking } from "@/hooks/useMatchmaking";

const MatchmakingButton = ({ userId }: { userId: string }) => {
  const { status, match, findMatch } = useMatchmaking();

  const handleClick = () => {
    findMatch(userId);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={status === "searching" || status === "waiting"}
      >
        {status === "idle" ? "Find Match" : status === "searching" ? "Searching..." : "Waiting..."}
      </button>
      {match && (
        <div>
          <p>Match Found!</p>
          <p>Player 1: {match.player1}</p>
          <p>Player 2: {match.player2}</p>
        </div>
      )}
    </div>
  );
};

export default MatchmakingButton;
