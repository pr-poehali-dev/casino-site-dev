import { Sparkles, Star } from "lucide-react";

const Hero = () => {
  return (
    <div className="text-center py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-red-500/10 to-purple-600/10 animate-pulse"></div>
      <div className="relative z-10">
        <div className="flex justify-center items-center mb-6">
          <Star className="text-yellow-400 w-8 h-8 animate-spin mr-2" />
          <h1 className="text-6xl font-oswald font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
            ROYAL CASINO
          </h1>
          <Sparkles className="text-yellow-400 w-8 h-8 animate-bounce ml-2" />
        </div>
        <p className="text-2xl text-gray-300 font-light">
          Добро пожаловать в мир больших выигрышей!
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
          <div
            className="w-3 h-3 bg-yellow-400 rounded-full animate-ping"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-3 h-3 bg-green-500 rounded-full animate-ping"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
