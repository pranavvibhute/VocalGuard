export default function ResultCard({ result }) {
    if (result.error) {
      return (
        <div className="bg-black ring-1 ring-gray-700 p-4 rounded font-semibold text-red-500 hover:shadow-[0_0_15px_#3b82f6] transition-shadow duration-300">
          ❌ Error: {result.error}
        </div>
      );
    }
  
    const isReal = result.label === "Real";
    const borderClass = isReal ? "border-green-500" : "border-red-500";
    const textClass = isReal ? "text-green-400" : "text-red-400";
  
    return (
      <div className={`p-6 rounded-lg bg-black ring-1 ring-gray-700 shadow border-l-4 hover:shadow-[0_0_15px_#3b82f6] transition-shadow duration-300 ${borderClass}`}>
        <h3 className="text-xl font-bold mb-2">{result.filename || "Audio File"}</h3>
        <p>
          <strong>Detected as:</strong>{" "}
          <span className={`${textClass} font-semibold`}>{result.label}</span>
        </p>
        <p>
          <strong>Confidence:</strong> {result.confidence.toFixed(2)}%
        </p>
      </div>
    );
  }
  