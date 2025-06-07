import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PlayCircle, Plus, Square } from "lucide-react";

const Blackjack = () => {
  const [playerCards, setPlayerCards] = useState([11, 7]);
  const [dealerCards, setDealerCards] = useState([10]);
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState<string>("");

  const getCardValue = () => Math.floor(Math.random() * 10) + 1;

  const calculateSum = (cards: number[]) =>
    cards.reduce((sum, card) => sum + card, 0);

  const hit = () => {
    if (gameOver) return;
    const newCard = getCardValue();
    const newPlayerCards = [...playerCards, newCard];
    setPlayerCards(newPlayerCards);

    const sum = calculateSum(newPlayerCards);
    if (sum > 21) {
      setResult("ПЕРЕБОР! Вы проиграли");
      setGameOver(true);
    } else if (sum === 21) {
      setResult("БЛЭКДЖЕК! Вы выиграли!");
      setGameOver(true);
    }
  };

  const stand = () => {
    if (gameOver) return;

    let newDealerCards = [...dealerCards];
    while (calculateSum(newDealerCards) < 17) {
      newDealerCards.push(getCardValue());
    }
    setDealerCards(newDealerCards);

    const playerSum = calculateSum(playerCards);
    const dealerSum = calculateSum(newDealerCards);

    if (dealerSum > 21) {
      setResult("Дилер перебрал! Вы выиграли!");
    } else if (dealerSum > playerSum) {
      setResult("Дилер выиграл");
    } else if (playerSum > dealerSum) {
      setResult("Вы выиграли!");
    } else {
      setResult("Ничья");
    }
    setGameOver(true);
  };

  const newGame = () => {
    setPlayerCards([getCardValue(), getCardValue()]);
    setDealerCards([getCardValue()]);
    setGameOver(false);
    setResult("");
  };

  return (
    <Card className="bg-gradient-to-b from-blue-900 to-blue-800 border-yellow-400/50 p-6">
      <div className="text-center">
        <h3 className="text-2xl font-oswald font-bold text-yellow-400 mb-4">
          БЛЭКДЖЕК
        </h3>

        <div className="space-y-4 mb-4">
          <div className="bg-black/30 rounded-lg p-3">
            <div className="text-sm text-gray-300 mb-1">
              Дилер ({calculateSum(dealerCards)})
            </div>
            <div className="flex justify-center space-x-1">
              {dealerCards.map((card, index) => (
                <div
                  key={index}
                  className="w-8 h-12 bg-white rounded text-black text-xs flex items-center justify-center font-bold"
                >
                  {card}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black/30 rounded-lg p-3">
            <div className="text-sm text-gray-300 mb-1">
              Вы ({calculateSum(playerCards)})
            </div>
            <div className="flex justify-center space-x-1">
              {playerCards.map((card, index) => (
                <div
                  key={index}
                  className="w-8 h-12 bg-white rounded text-black text-xs flex items-center justify-center font-bold"
                >
                  {card}
                </div>
              ))}
            </div>
          </div>
        </div>

        {result && (
          <div
            className={`text-lg font-bold mb-3 ${result.includes("выиграли") ? "text-yellow-400" : "text-red-400"}`}
          >
            {result}
          </div>
        )}

        <div className="space-x-2">
          {!gameOver ? (
            <>
              <Button onClick={hit} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-1" />
                Взять
              </Button>
              <Button onClick={stand} className="bg-red-600 hover:bg-red-700">
                <Square className="w-4 h-4 mr-1" />
                Стоп
              </Button>
            </>
          ) : (
            <Button
              onClick={newGame}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <PlayCircle className="w-4 h-4 mr-1" />
              Новая игра
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Blackjack;
