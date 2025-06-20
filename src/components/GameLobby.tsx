
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins, Star, Play, Crown, Heart, Sparkles, Home } from "lucide-react";
import GameInterface from "./GameInterface";

interface GameLobbyProps {
  user: any;
}

const GameLobby = ({ user }: GameLobbyProps) => {
  const [selectedCompanion, setSelectedCompanion] = useState(null);
  const [selectedEnvironment, setSelectedEnvironment] = useState(null);
  const [isInGame, setIsInGame] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState('beginner');

  const gameEnvironments = [
    {
      id: 1,
      name: "Luxury Bedroom",
      icon: "🛏️",
      description: "Intimate setting with dim lighting and silk sheets",
      mood: "romantic",
      unlockCost: 0,
      background: "from-purple-900 to-pink-900"
    },
    {
      id: 2,
      name: "Dining Table",
      icon: "🍽️",
      description: "Elegant dining room with candles and wine",
      mood: "sophisticated",
      unlockCost: 0,
      background: "from-amber-900 to-red-900"
    },
    {
      id: 3,
      name: "Private Lounge",
      icon: "🛋️",
      description: "Cozy living room with fireplace and soft music",
      mood: "relaxed",
      unlockCost: 200,
      background: "from-orange-900 to-yellow-900"
    },
    {
      id: 4,
      name: "Penthouse Suite",
      icon: "🏙️",
      description: "Luxury penthouse with city views and champagne",
      mood: "glamorous",
      unlockCost: 500,
      background: "from-blue-900 to-indigo-900"
    }
  ];

  const aiCompanions = [
    {
      id: 1,
      name: "Scarlett",
      personality: "Mysterious & Seductive",
      specialty: "Mind Games",
      avatar: "💃",
      description: "A sultry temptress who loves psychological warfare at the poker table",
      difficulty: "Expert",
      unlockCost: 0
    },
    {
      id: 2,
      name: "Victoria",
      personality: "Playful & Flirty",
      specialty: "Encouragement",
      avatar: "👸",
      description: "Sweet and encouraging, perfect for beginners learning the game",
      difficulty: "Beginner",
      unlockCost: 0
    },
    {
      id: 3,
      name: "Luna",
      personality: "Sweet & Supportive",
      specialty: "Beginner Friendly",
      avatar: "🌙",
      description: "Gentle and patient, she'll guide you through every hand",
      difficulty: "Beginner",
      unlockCost: 0
    },
    {
      id: 4,
      name: "Phoenix",
      personality: "Fiery & Passionate",
      specialty: "High Stakes",
      avatar: "🔥",
      description: "Loves high-stakes games and isn't afraid to take risks",
      difficulty: "Expert",
      unlockCost: 1000
    }
  ];

  const difficultySettings = {
    beginner: { name: "Beginner", startingBet: 50, description: "Easy wins, learn the basics" },
    intermediate: { name: "Intermediate", startingBet: 100, description: "Balanced gameplay" },
    expert: { name: "Expert", startingBet: 200, description: "Challenging AI, high rewards" }
  };

  const handleStartGame = () => {
    if (!selectedCompanion || !selectedEnvironment) return;
    setIsInGame(true);
  };

  const handleExitGame = () => {
    setIsInGame(false);
    setSelectedCompanion(null);
    setSelectedEnvironment(null);
  };

  const canAffordCompanion = (companion) => {
    return user?.chips >= companion.unlockCost;
  };

  const canAffordEnvironment = (environment) => {
    return user?.chips >= environment.unlockCost;
  };

  if (isInGame && selectedCompanion && selectedEnvironment) {
    return (
      <GameInterface 
        user={user} 
        companion={selectedCompanion}
        environment={selectedEnvironment}
        difficulty={selectedDifficulty}
        onExit={handleExitGame} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-6">
      <div className="container mx-auto max-w-7xl">
        {/* User Stats Header */}
        <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-purple-500/30">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {user?.username?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{user?.username}</h2>
                <p className="text-gray-300">Level {user?.level} Player</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gold-400 flex items-center">
                  <Coins className="w-6 h-6 mr-1" />
                  {user?.chips?.toLocaleString()}
                </div>
                <div className="text-sm text-gray-300">Chips</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{user?.wins || 0}</div>
                <div className="text-sm text-gray-300">Wins</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{user?.gamesPlayed || 0}</div>
                <div className="text-sm text-gray-300">Games</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Game Setup */}
          <div className="lg:col-span-2 space-y-8">
            {/* Environment Selection */}
            <div>
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
                <Home className="w-8 h-8 mr-3 text-purple-500" />
                Choose Your Setting
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {gameEnvironments.map((environment) => (
                  <Card
                    key={environment.id}
                    className={`bg-black/40 backdrop-blur-lg border-purple-500/30 hover:bg-black/60 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                      selectedEnvironment?.id === environment.id ? 'ring-2 ring-purple-500 bg-purple-500/20' : ''
                    } ${!canAffordEnvironment(environment) ? 'opacity-60' : ''}`}
                    onClick={() => canAffordEnvironment(environment) && setSelectedEnvironment(environment)}
                  >
                    <CardHeader>
                      <CardTitle className="text-white flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-3xl mr-3">{environment.icon}</span>
                          {environment.name}
                        </div>
                        {environment.unlockCost > 0 && (
                          <div className="flex items-center text-gold-400">
                            <Coins className="w-4 h-4 mr-1" />
                            {environment.unlockCost}
                          </div>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 text-sm mb-3">{environment.description}</p>
                      <Badge variant="secondary" className="text-xs">
                        {environment.mood}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* AI Companion Selection */}
            <div>
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
                <Heart className="w-8 h-8 mr-3 text-red-500" />
                Choose Your AI Companion
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {aiCompanions.map((companion) => (
                  <Card
                    key={companion.id}
                    className={`bg-black/40 backdrop-blur-lg border-purple-500/30 hover:bg-black/60 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                      selectedCompanion?.id === companion.id ? 'ring-2 ring-red-500 bg-red-500/20' : ''
                    } ${!canAffordCompanion(companion) ? 'opacity-60' : ''}`}
                    onClick={() => canAffordCompanion(companion) && setSelectedCompanion(companion)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white flex items-center">
                          <span className="text-3xl mr-3">{companion.avatar}</span>
                          {companion.name}
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge variant={companion.difficulty === 'Expert' ? 'destructive' : 'secondary'}>
                            {companion.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 text-sm mb-3">{companion.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-purple-400">
                          {companion.specialty}
                        </div>
                        {companion.unlockCost > 0 && (
                          <div className="flex items-center text-gold-400">
                            <Coins className="w-4 h-4 mr-1" />
                            {companion.unlockCost}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Difficulty Selection */}
            <div>
              <h4 className="text-xl font-bold text-white mb-4">Game Difficulty</h4>
              <div className="flex flex-wrap gap-3">
                {Object.entries(difficultySettings).map(([key, setting]) => (
                  <Button
                    key={key}
                    onClick={() => setSelectedDifficulty(key)}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                      selectedDifficulty === key
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                        : 'bg-black/40 text-gray-300 hover:bg-black/60'
                    }`}
                  >
                    {setting.name}
                  </Button>
                ))}
              </div>
              <p className="text-gray-300 mt-3 text-sm">
                {difficultySettings[selectedDifficulty].description} • Starting bet: {difficultySettings[selectedDifficulty].startingBet} chips
              </p>
            </div>

            {/* Start Game Button */}
            {selectedCompanion && selectedEnvironment && (
              <div className="text-center mt-8">
                <Button
                  onClick={handleStartGame}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold px-12 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 text-xl"
                >
                  <Play className="w-6 h-6 mr-3" />
                  Start Game with {selectedCompanion.name} in {selectedEnvironment.name}
                </Button>
              </div>
            )}
          </div>

          {/* Info Panel */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Sparkles className="w-6 h-6 mr-2 text-purple-400" />
              Strip Poker Guide
            </h3>
            
            <Card className="bg-black/40 backdrop-blur-lg border-purple-500/30 mb-6">
              <CardContent className="p-6">
                <h4 className="text-lg font-bold text-white mb-4">How to Play</h4>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Choose your perfect setting and AI companion</li>
                  <li>• Place bets to start each poker round</li>
                  <li>• Win hands to see your companion strip</li>
                  <li>• Lose hands and face the consequences</li>
                  <li>• Experience unique AI reactions and flirtation</li>
                  <li>• Different environments unlock special interactions</li>
                </ul>
              </CardContent>
            </Card>

            {/* Selection Status */}
            <div className="space-y-4">
              <div className="bg-black/40 backdrop-blur-lg rounded-xl p-4 border border-purple-500/30">
                <h4 className="text-white font-bold mb-3">Your Selection</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Environment:</span>
                    <span className="text-white">
                      {selectedEnvironment ? selectedEnvironment.name : 'None selected'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Companion:</span>
                    <span className="text-white">
                      {selectedCompanion ? selectedCompanion.name : 'None selected'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Difficulty:</span>
                    <span className="text-white capitalize">{selectedDifficulty}</span>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 rounded-full">
                <Coins className="w-5 h-5 mr-2" />
                Buy More Chips
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameLobby;
