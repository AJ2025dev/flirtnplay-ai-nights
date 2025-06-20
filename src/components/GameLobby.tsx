
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins, Star, Play, Crown, Heart, Sparkles } from "lucide-react";
import GameInterface from "./GameInterface";

interface GameLobbyProps {
  user: any;
}

const GameLobby = ({ user }: GameLobbyProps) => {
  const [selectedCompanion, setSelectedCompanion] = useState(null);
  const [isInGame, setIsInGame] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState('beginner');

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
      name: "Raven",
      personality: "Bold & Confident",
      specialty: "Strategic Advice",
      avatar: "🖤",
      description: "A fierce competitor who never backs down from a challenge",
      difficulty: "Intermediate",
      unlockCost: 500
    },
    {
      id: 4,
      name: "Luna",
      personality: "Sweet & Supportive",
      specialty: "Beginner Friendly",
      avatar: "🌙",
      description: "Gentle and patient, she'll guide you through every hand",
      difficulty: "Beginner",
      unlockCost: 0
    },
    {
      id: 5,
      name: "Phoenix",
      personality: "Fiery & Passionate",
      specialty: "High Stakes",
      avatar: "🔥",
      description: "Loves high-stakes games and isn't afraid to take risks",
      difficulty: "Expert",
      unlockCost: 1000
    },
    {
      id: 6,
      name: "Jade",
      personality: "Elegant & Sophisticated",
      specialty: "VIP Experience",
      avatar: "💎",
      description: "Premium companion with exclusive interactions and rewards",
      difficulty: "VIP",
      unlockCost: 2500
    }
  ];

  const difficultySettings = {
    beginner: { name: "Beginner", startingBet: 50, description: "Easy wins, learn the basics" },
    intermediate: { name: "Intermediate", startingBet: 100, description: "Balanced gameplay" },
    expert: { name: "Expert", startingBet: 200, description: "Challenging AI, high rewards" }
  };

  const handleStartGame = () => {
    if (!selectedCompanion) return;
    setIsInGame(true);
  };

  const handleExitGame = () => {
    setIsInGame(false);
    setSelectedCompanion(null);
  };

  const canAffordCompanion = (companion) => {
    return user?.chips >= companion.unlockCost;
  };

  if (isInGame && selectedCompanion) {
    return (
      <GameInterface 
        user={user} 
        companion={selectedCompanion}
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* AI Companions Selection */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
              <Heart className="w-8 h-8 mr-3 text-red-500" />
              Choose Your AI Companion
            </h3>
            
            {/* Difficulty Selection */}
            <div className="mb-6">
              <h4 className="text-xl font-bold text-white mb-4">Game Difficulty</h4>
              <div className="flex space-x-4">
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
              <p className="text-gray-300 mt-2">
                {difficultySettings[selectedDifficulty].description} • Starting bet: {difficultySettings[selectedDifficulty].startingBet} chips
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {aiCompanions.map((companion) => (
                <Card
                  key={companion.id}
                  className={`bg-black/40 backdrop-blur-lg border-purple-500/30 hover:bg-black/60 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                    selectedCompanion?.id === companion.id ? 'ring-2 ring-red-500' : ''
                  } ${!canAffordCompanion(companion) ? 'opacity-60' : ''}`}
                  onClick={() => canAffordCompanion(companion) && setSelectedCompanion(companion)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white flex items-center">
                        <span className="text-2xl mr-3">{companion.avatar}</span>
                        {companion.name}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant={companion.difficulty === 'VIP' ? 'default' : 'secondary'}>
                          {companion.difficulty}
                        </Badge>
                        {companion.difficulty === 'VIP' && <Crown className="w-4 h-4 text-gold-400" />}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-2">{companion.personality}</p>
                    <p className="text-gray-400 text-sm mb-4">{companion.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-purple-400">
                        Specialty: {companion.specialty}
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

            {selectedCompanion && (
              <div className="mt-8 text-center">
                <Button
                  onClick={handleStartGame}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold px-12 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 text-xl"
                >
                  <Play className="w-6 h-6 mr-3" />
                  Start Game with {selectedCompanion.name}
                </Button>
              </div>
            )}
          </div>

          {/* Game Info & Quick Actions */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Sparkles className="w-6 h-6 mr-2 text-purple-400" />
              Game Information
            </h3>
            
            <Card className="bg-black/40 backdrop-blur-lg border-purple-500/30 mb-6">
              <CardContent className="p-6">
                <h4 className="text-lg font-bold text-white mb-4">How to Play</h4>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Choose your AI companion and difficulty</li>
                  <li>• Place your bet to start each round</li>
                  <li>• Get dealt 5 cards for poker</li>
                  <li>• Win hands to progress with your companion</li>
                  <li>• Lose hands and face the consequences</li>
                  <li>• Enjoy unique AI interactions and responses</li>
                </ul>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-white">Quick Actions</h4>
              <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 rounded-full">
                <Coins className="w-5 h-5 mr-2" />
                Buy More Chips
              </Button>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-full">
                <Star className="w-5 h-5 mr-2" />
                View Achievements
              </Button>
              <Button className="w-full bg-gradient-to-r from-gold-500 to-yellow-500 hover:from-gold-600 hover:to-yellow-600 text-white font-semibold py-3 rounded-full">
                <Crown className="w-5 h-5 mr-2" />
                Upgrade to Premium
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameLobby;
