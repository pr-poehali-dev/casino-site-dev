import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { CreditCard, Loader2 } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (amount: number) => void;
}

const PaymentModal = ({
  isOpen,
  onClose,
  onPaymentSuccess,
}: PaymentModalProps) => {
  const [amount, setAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) {
      return v.slice(0, 2) + "/" + v.slice(2, 4);
    }
    return v;
  };

  const handlePayment = async () => {
    if (!amount || !cardNumber || !expiryDate || !cvv) {
      alert("Заполните все поля");
      return;
    }

    const amountNum = parseInt(amount);
    if (amountNum < 100 || amountNum > 100000) {
      alert("Сумма должна быть от 100 до 100,000 рублей");
      return;
    }

    setIsProcessing(true);

    // Симуляция обработки платежа
    setTimeout(() => {
      // 90% успешных платежей
      if (Math.random() > 0.1) {
        onPaymentSuccess(amountNum);
        onClose();
        setAmount("");
        setCardNumber("");
        setExpiryDate("");
        setCvv("");
      } else {
        alert("Ошибка обработки платежа. Попробуйте еще раз.");
      }
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-yellow-400/30">
        <DialogHeader>
          <DialogTitle className="text-yellow-400 flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Пополнение баланса
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <Label htmlFor="amount" className="text-gray-300">
              Сумма пополнения (₽)
            </Label>
            <Select value={amount} onValueChange={setAmount}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue placeholder="Выберите сумму" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="500">500 ₽</SelectItem>
                <SelectItem value="1000">1,000 ₽</SelectItem>
                <SelectItem value="2500">2,500 ₽</SelectItem>
                <SelectItem value="5000">5,000 ₽</SelectItem>
                <SelectItem value="10000">10,000 ₽</SelectItem>
                <SelectItem value="25000">25,000 ₽</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="bg-gray-800 border-gray-600 p-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardNumber" className="text-gray-300">
                  Номер карты
                </Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(formatCardNumber(e.target.value))
                  }
                  maxLength={19}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry" className="text-gray-300">
                    Срок действия
                  </Label>
                  <Input
                    id="expiry"
                    placeholder="ММ/ГГ"
                    value={expiryDate}
                    onChange={(e) =>
                      setExpiryDate(formatExpiryDate(e.target.value))
                    }
                    maxLength={5}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="cvv" className="text-gray-300">
                    CVV
                  </Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) =>
                      setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))
                    }
                    maxLength={3}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
            </div>
          </Card>

          <div className="flex space-x-3">
            <Button
              onClick={handlePayment}
              disabled={isProcessing}
              className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Обработка...
                </>
              ) : (
                `Пополнить на ${amount ? parseInt(amount).toLocaleString() : "0"} ₽`
              )}
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Отмена
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
