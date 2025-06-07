import Hero from "@/components/casino/Hero";
import SlotMachine from "@/components/casino/SlotMachine";
import Roulette from "@/components/casino/Roulette";
import Blackjack from "@/components/casino/Blackjack";
import Balance from "@/components/casino/Balance";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <Hero />
        <Balance />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <SlotMachine />
          <Roulette />
          <Blackjack />
        </div>
      </div>
    </div>
  );
};

export default Index;
