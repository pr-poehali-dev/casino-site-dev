import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, Plus, Minus } from "lucide-react";
import { useState } from "react";

const Balance = () => {
  const [balance, setBalance] = useState(10000);
  const [bet, setBet] = useState(100);

  const adjustBet = (amount: number) => {
    const newBet = Math.max(10, Math.min(balance, bet + amount));
    setBet(newBet);
  };

  return (
    <Card className="bg-gradient-to-r from-gray-900 to-gray-800 border-yellow-400/30 p-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-yellow-400">
            <Coins className="w-6 h-6 mr-2" />
            <span className="text-2xl font-bold">
              ₽{balance.toLocaleString()}
            </span>
          </div>
          <div className="text-gray-300">
            <span className="text-sm">Баланс</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-gray-300">Ставка:</span>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              className="border-red-500 text-red-400 hover:bg-red-500/20"
              onClick={() => adjustBet(-50)}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="text-xl font-bold text-white min-w-20 text-center">
              ₽{bet}
            </span>
            <Button
              size="sm"
              variant="outline"
              className="border-green-500 text-green-400 hover:bg-green-500/20"
              onClick={() => adjustBet(50)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Balance;
