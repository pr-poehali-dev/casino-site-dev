import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Zap } from "lucide-react";

const SlotMachine = () => {
  const [slots, setSlots] = useState(["🍒", "🍋", "🍊"]);
  const [spinning, setSpinning] = useState(false);
  const [lastWin, setLastWin] = useState(0);

  const symbols = ["🍒", "🍋", "🍊", "🍇", "🔔", "💎", "7️⃣"];

  const spin = () => {
    setSpinning(true);
    setLastWin(0);

    // Анимация вращения
    const interval = setInterval(() => {
      setSlots([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ]);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const finalSlots = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ];
      setSlots(finalSlots);
      setSpinning(false);

      // Проверка выигрыша
      if (finalSlots[0] === finalSlots[1] && finalSlots[1] === finalSlots[2]) {
        setLastWin(5000);
      } else if (
        finalSlots[0] === finalSlots[1] ||
        finalSlots[1] === finalSlots[2]
      ) {
        setLastWin(500);
      }
    }, 2000);
  };

  return (
    <Card className="bg-gradient-to-b from-red-900 to-red-800 border-yellow-400/50 p-6">
      <div className="text-center">
        <h3 className="text-2xl font-oswald font-bold text-yellow-400 mb-4">
          СЛОТ-МАШИНА
        </h3>

        <div className="bg-black/50 rounded-lg p-6 mb-4">
          <div className="flex justify-center space-x-4 mb-4">
            {slots.map((symbol, index) => (
              <div
                key={index}
                className={`w-20 h-20 bg-white rounded-lg flex items-center justify-center text-4xl border-4 border-yellow-400 ${
                  spinning ? "animate-spin" : ""
                }`}
              >
                {symbol}
              </div>
            ))}
          </div>

          {lastWin > 0 && (
            <div className="text-yellow-400 font-bold text-xl animate-bounce">
              ВЫИГРЫШ: ₽{lastWin}!
            </div>
          )}
        </div>

        <Button
          onClick={spin}
          disabled={spinning}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg px-8 py-3 hover:from-yellow-300 hover:to-orange-400"
        >
          <Zap className="w-5 h-5 mr-2" />
          {spinning ? "КРУТИМ..." : "КРУТИТЬ"}
        </Button>
      </div>
    </Card>
  );
};

export default SlotMachine;
