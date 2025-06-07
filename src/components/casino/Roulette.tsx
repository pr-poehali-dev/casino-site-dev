import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RotateCcw } from "lucide-react";

const Roulette = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [selectedBet, setSelectedBet] = useState<
    "red" | "black" | "green" | null
  >(null);

  const spin = () => {
    if (!selectedBet) return;

    setSpinning(true);
    setResult(null);

    setTimeout(() => {
      const number = Math.floor(Math.random() * 37); // 0-36
      setResult(number);
      setSpinning(false);
    }, 3000);
  };

  const getColor = (num: number) => {
    if (num === 0) return "green";
    const reds = [
      1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
    ];
    return reds.includes(num) ? "red" : "black";
  };

  const isWin = result !== null && getColor(result) === selectedBet;

  return (
    <Card className="bg-gradient-to-b from-green-900 to-green-800 border-yellow-400/50 p-6">
      <div className="text-center">
        <h3 className="text-2xl font-oswald font-bold text-yellow-400 mb-4">
          РУЛЕТКА
        </h3>

        <div className="bg-black/50 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center relative">
          <div
            className={`absolute inset-2 rounded-full border-4 border-yellow-400 ${spinning ? "animate-spin" : ""}`}
          >
            <div className="w-full h-full rounded-full bg-gradient-conic from-red-500 via-black to-red-500"></div>
          </div>
          {result !== null && (
            <div className="absolute text-2xl font-bold text-white z-10">
              {result}
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <Button
            variant={selectedBet === "red" ? "default" : "outline"}
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => setSelectedBet("red")}
          >
            Красное
          </Button>
          <Button
            variant={selectedBet === "black" ? "default" : "outline"}
            className="bg-gray-800 hover:bg-gray-900 text-white"
            onClick={() => setSelectedBet("black")}
          >
            Черное
          </Button>
          <Button
            variant={selectedBet === "green" ? "default" : "outline"}
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => setSelectedBet("green")}
          >
            Зеро
          </Button>
        </div>

        {result !== null && (
          <div
            className={`text-lg font-bold mb-2 ${isWin ? "text-yellow-400" : "text-red-400"}`}
          >
            {isWin ? "ВЫИГРЫШ!" : "ПРОИГРЫШ"} Выпало: {result} (
            {getColor(result) === "red"
              ? "красное"
              : getColor(result) === "black"
                ? "черное"
                : "зеро"}
            )
          </div>
        )}

        <Button
          onClick={spin}
          disabled={spinning || !selectedBet}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold px-6 py-2"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          {spinning ? "КРУТИМ..." : "КРУТИТЬ"}
        </Button>
      </div>
    </Card>
  );
};

export default Roulette;
