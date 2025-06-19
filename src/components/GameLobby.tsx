
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, Coins, Star, Lock, Play, Crown, Heart } from "lucide-react";

interface GameLobbyProps {
  user: any;
}

const GameLobby = ({ user }: GameLobbyProps) => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const gameRooms = [
    {
      id: 1,
      name: "Beginner's Paradise",
      players: 6,
      maxPlayers: 8,
      buyIn: 100,
      level: "Beginner",
      isPremium: false,
      description: "Perfect for new players to learn the ropes"
    },
    {
      id: 2,
      name: "High Roller Heaven",
      players: 4,
      maxPlayers: 6,
      buyIn: 1000,
      level: "Expert",
      isPremium: false,
      description: "For experienced players seeking big wins"
    },
    {
      id: 3,
      name: "VIP Exclusive",
      players: 2,
      maxPlayers: 4,
      buyIn: 2500,
      level: "VIP",
      isPremium: true,
      description: "Premium members only - luxury gaming experience"
    },
    {
      id: 4,
      name: "Midnight Madness",
      players: 8,
      maxPlayers: 10,
      buyIn: 500,
      level: "Intermediate",
      isPremium: false,
      description: "Late night thrills with special rewards"
    },
    {
      id: 5,
      name: "Tournament Arena",
      players: 12,
      maxPlayers: 20,
      buyIn: 250,
      level: "Tournament",
      isPremium: false,
      description: "Compete for the weekly championship"
    }
  ];

  const aiCompanions = [
    { name: "Scarlett", personality: "Mysterious & Seductive", specialty: "Mind Games" },
    { name: "Victoria", personality: "Playful & Flirty", specialty: "Encouragement" },
    { name: "Raven", personality: "Bold & Confident", specialty: "Strategic Advice" },
    { name: "Luna", personality: "Sweet & Supportive", specialty: "Beginner Friendly" }
  ];

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
          {/* Game Rooms */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
              <Play className="w-8 h-8 mr-3 text-purple-400" />
              Available Game Rooms
            </h3>
            <div className="space-y-6">
              {gameRooms.map((room) => (
                <Card
                  key={room.id}
                  className={`bg-black/40 backdrop-blur-lg border-purple-500/30 hover:bg-black/60 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                    selectedRoom === room.id ? 'ring-2 ring-purple-500' : ''
                  }`}
                  onClick={() => setSelectedRoom(room.id)}
                >
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-white flex items-center">
                        {room.isPremium && <Crown className="w-5 h-5 text-gold-400 mr-2" />}
                        {room.name}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant={room.level === 'VIP' ? 'default' : 'secondary'}>
                          {room.level}
                        </Badge>
                        {room.isPremium && <Lock className="w-4 h-4 text-gold-400" />}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">{room.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-blue-400">
                          <Users className="w-4 h-4 mr-1" />
                          {room.players}/{room.maxPlayers}
                        </div>
                        <div className="flex items-center text-gold-400">
                          <Coins className="w-4 h-4 mr-1" />
                          {room.buyIn} chips
                        </div>
                      </div>
                      <Button
                        className={`${
                          room.isPremium
                            ? 'bg-gradient-to-r from-gold-500 to-yellow-500 hover:from-gold-600 hover:to-yellow-600'
                            : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600'
                        } text-white font-semibold px-6 py-2 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200`}
                        disabled={room.isPremium && !user?.isPremium}
                      >
                        {room.isPremium && !user?.isPremium ? 'Premium Only' : 'Join Game'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* AI Companions Sidebar */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Heart className="w-6 h-6 mr-2 text-red-500" />
              AI Companions
            </h3>
            <div className="space-y-4">
              {aiCompanions.map((companion, index) => (
                <Card key={index} className="bg-black/40 backdrop-blur-lg border-red-500/30 hover:bg-black/60 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{companion.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{companion.name}</h4>
                        <p className="text-sm text-gray-400">{companion.specialty}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{companion.personality}</p>
                    <Button 
                      size="sm" 
                      className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold rounded-full"
                    >
                      Select Companion
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h4 className="text-xl font-bold text-white mb-4">Quick Actions</h4>
              <div className="space-y-3">
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
    </div>
  );
};

export default GameLobby;
