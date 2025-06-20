
import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Volume2, VolumeX, Home } from "lucide-react";
import { toast } from "sonner";

interface GameInterfaceProps {
  user: any;
  companion: any;
  environment: any;
  difficulty: string;
  onExit: () => void;
}

interface PlayerCard {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  value: string;
  id: string;
}

const GameInterface = ({ user, companion, environment, difficulty, onExit }: GameInterfaceProps) => {
  const [gamePhase, setGamePhase] = useState<'betting' | 'cards' | 'reveal' | 'result'>('betting');
  const [playerCards, setPlayerCards] = useState<PlayerCard[]>([]);
  const [playerChips, setPlayerChips] = useState(user?.chips || 1000);
  const [currentBet, setCurrentBet] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [isAITalking, setIsAITalking] = useState(false);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [playerWins, setPlayerWins] = useState(0);

  const [aiCharacter, setAiCharacter] = useState({
    ...companion,
    clothingLevel: 5,
    maxClothing: 5,
    mood: 'flirty' as 'flirty' | 'confident' | 'nervous' | 'excited',
    currentAction: `Welcome to the ${environment.name}... I'm ${companion.name}. Ready to play some strip poker?`
  });

  const [gameHistory, setGameHistory] = useState<string[]>([]);

  // Difficulty-based settings
  const difficultySettings = {
    beginner: { winChance: 0.7, startingBet: 50, aiSkill: 0.3 },
    intermediate: { winChance: 0.5, startingBet: 100, aiSkill: 0.5 },
    expert: { winChance: 0.3, startingBet: 200, aiSkill: 0.8 }
  };

  // AI responses based on companion personality and game state
  const getAIResponse = (situation: string) => {
    const responses = {
      scarlett: {
        betting: [
          "I'm feeling dangerous tonight... are you brave enough to match my confidence?",
          "Such an interesting choice... I wonder what's going through your mind.",
          "Mmm, playing it safe or just getting started?",
          "Your move, darling. Don't keep me waiting too long."
        ],
        winning: [
          "Better luck next time, sweetheart.",
          "Don't look so disappointed, we're just getting started.",
          "I told you I was feeling dangerous tonight.",
          "Maybe you'll have better luck with the next hand?"
        ],
        losing: [
          "Well played... I underestimated you.",
          "Enjoy the view while it lasts.",
          "You're more skilled than I thought.",
          "This just got more interesting..."
        ]
      },
      victoria: {
        betting: [
          "Ooh, this is exciting! What's your strategy?",
          "I love the thrill of not knowing what comes next!",
          "You look so focused... it's adorable!",
          "Let's see what fate has in store for us!"
        ],
        winning: [
          "Aww, don't worry! You'll get me next time!",
          "That was fun! Want to try again?",
          "You're such a good sport about this!",
          "I got lucky that time, I think!"
        ],
        losing: [
          "Oh my! You're really good at this!",
          "I should have seen that coming!",
          "You're full of surprises!",
          "Okay, okay, you win this round!"
        ]
      }
    };

    const companionName = companion.name.toLowerCase();
    const companionResponses = responses[companionName] || responses.victoria;
    const situationResponses = companionResponses[situation] || companionResponses.betting;
    
    return situationResponses[Math.floor(Math.random() * situationResponses.length)];
  };

  // Generate random poker hand
  const generateCards = (): PlayerCard[] => {
    const suits: ('hearts' | 'diamonds' | 'clubs' | 'spades')[] = ['hearts', 'diamonds', 'clubs', 'spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    
    const cards: PlayerCard[] = [];
    for (let i = 0; i < 5; i++) {
      cards.push({
        suit: suits[Math.floor(Math.random() * suits.length)],
        value: values[Math.floor(Math.random() * values.length)],
        id: `card-${i}`
      });
    }
    return cards;
  };

  // AI voice simulation
  const speakAI = (text: string) => {
    if (isMuted) return;
    
    setIsAITalking(true);
    setAiCharacter(prev => ({ ...prev, currentAction: text }));
    
    // Simulate speaking duration
    setTimeout(() => {
      setIsAITalking(false);
    }, text.length * 50);
    
    // Add to game history
    setGameHistory(prev => [...prev, `${aiCharacter.name}: ${text}`]);
  };

  // Handle betting phase
  const handleBet = () => {
    if (currentBet > playerChips) {
      toast.error("Not enough chips!");
      return;
    }
    
    setPlayerChips(prev => prev - currentBet);
    setGamePhase('cards');
    setPlayerCards(generateCards());
    
    const response = getAIResponse('betting');
    speakAI(response);
    
    // AI mood change based on bet size
    const betRatio = currentBet / playerChips;
    setAiCharacter(prev => ({
      ...prev,
      mood: betRatio > 0.3 ? 'excited' : 'flirty'
    }));
  };

  // Handle card reveal
  const handleReveal = () => {
    setGamePhase('reveal');
    
    const response = "Let's see what we both got...";
    speakAI(response);
    
    setTimeout(() => {
      const settings = difficultySettings[difficulty];
      const playerWins = Math.random() < settings.winChance;
      setGamePhase('result');
      setRoundsPlayed(prev => prev + 1);
      
      if (playerWins) {
        setPlayerWins(prev => prev + 1);
        setPlayerChips(prev => prev + (currentBet * 2));
        setAiCharacter(prev => ({
          ...prev,
          clothingLevel: Math.max(0, prev.clothingLevel - 1),
          mood: 'nervous'
        }));
        const response = getAIResponse('losing');
        speakAI(response);
        toast.success("You won! " + response);
      } else {
        setAiCharacter(prev => ({
          ...prev,
          mood: 'confident'
        }));
        const response = getAIResponse('winning');
        speakAI(response);
        toast.error("You lost! " + response);
      }
    }, 2000);
  };

  // Start new round
  const newRound = () => {
    setGamePhase('betting');
    const settings = difficultySettings[difficulty];
    setCurrentBet(settings.startingBet);
    setAiCharacter(prev => ({
      ...prev,
      currentAction: "Ready for another round?",
      mood: 'flirty'
    }));
  };

  // AI animation effects
  const getCharacterAnimation = () => {
    if (isAITalking) return 'animate-pulse';
    if (aiCharacter.mood === 'excited') return 'animate-bounce';
    if (aiCharacter.mood === 'nervous') return 'animate-pulse';
    return 'hover:scale-105 transition-transform duration-300';
  };

  const getCharacterColor = () => {
    switch (aiCharacter.mood) {
      case 'flirty': return 'from-pink-500 to-red-500';
      case 'confident': return 'from-purple-500 to-indigo-500';
      case 'nervous': return 'from-blue-500 to-cyan-500';
      case 'excited': return 'from-gold-500 to-yellow-500';
      default: return 'from-pink-500 to-red-500';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${environment.background} p-4`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Button onClick={onExit} variant="ghost" className="text-white hover:bg-white/10">
          <Home className="w-5 h-5 mr-2" />
          Exit Game
        </Button>
        <div className="flex items-center space-x-4">
          <div className="text-white text-lg font-bold">
            Chips: {playerChips.toLocaleString()}
          </div>
          <div className="text-white text-sm">
            Rounds: {roundsPlayed} | Wins: {playerWins}
          </div>
          <Button
            onClick={() => setIsMuted(!isMuted)}
            variant="ghost"
            className="text-white hover:bg-white/10"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* AI Character Panel */}
        <div className="lg:col-span-1">
          <Card className="bg-black/40 backdrop-blur-lg border-purple-500/30">
            <CardContent className="p-6">
              <div className={`text-center ${getCharacterAnimation()}`}>
                <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-r ${getCharacterColor()} flex items-center justify-center text-6xl mb-4 shadow-lg`}>
                  {aiCharacter.avatar}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{aiCharacter.name}</h3>
                <p className="text-gray-300 mb-4">{aiCharacter.personality}</p>
                
                {/* Environment Info */}
                <div className="mb-4 p-3 rounded-lg bg-black/30">
                  <div className="text-lg mb-1">{environment.icon}</div>
                  <div className="text-sm text-gray-300">{environment.name}</div>
                  <div className="text-xs text-gray-400">{environment.description}</div>
                </div>
                
                {/* Clothing Level */}
                <div className="mb-4">
                  <div className="text-sm text-gray-300 mb-2">Clothing Level</div>
                  <Progress 
                    value={(aiCharacter.clothingLevel / aiCharacter.maxClothing) * 100} 
                    className="h-3"
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    {aiCharacter.clothingLevel}/{aiCharacter.maxClothing} items remaining
                  </div>
                </div>
                
                {/* AI Speech */}
                <div className={`p-4 rounded-lg bg-black/30 min-h-[80px] flex items-center justify-center ${isAITalking ? 'animate-pulse border-2 border-pink-500' : ''}`}>
                  <p className="text-white text-center italic">
                    "{aiCharacter.currentAction}"
                  </p>
                </div>

                {/* Companion Info */}
                <div className="mt-4 text-sm text-gray-300">
                  <p>Specialty: {aiCharacter.specialty}</p>
                  <p>Difficulty: {difficulty}</p>
                  <p>Mood: {aiCharacter.mood}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Game Area */}
        <div className="lg:col-span-2">
          <Card className="bg-black/40 backdrop-blur-lg border-purple-500/30">
            <CardContent className="p-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Strip Poker in {environment.name}
                </h2>
                
                {gamePhase === 'betting' && (
                  <div className="space-y-6">
                    <div>
                      <label className="text-white text-lg mb-4 block">Place Your Bet</label>
                      <div className="flex items-center justify-center space-x-4">
                        <Button 
                          onClick={() => setCurrentBet(Math.max(difficultySettings[difficulty].startingBet, currentBet - 50))}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          -50
                        </Button>
                        <div className="text-2xl font-bold text-gold-400 min-w-[120px]">
                          {currentBet} chips
                        </div>
                        <Button 
                          onClick={() => setCurrentBet(Math.min(playerChips, currentBet + 50))}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          +50
                        </Button>
                      </div>
                    </div>
                    <Button 
                      onClick={handleBet}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold px-8 py-3 rounded-full text-xl"
                      disabled={currentBet > playerChips}
                    >
                      Deal Cards
                    </Button>
                  </div>
                )}

                {gamePhase === 'cards' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl text-white mb-4">Your Hand</h3>
                      <div className="flex justify-center space-x-2">
                        {playerCards.map((card) => (
                          <div key={card.id} className="w-16 h-24 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center text-black font-bold">
                            <div className="text-lg">{card.value}</div>
                            <div className="text-lg">
                              {card.suit === 'hearts' && '♥️'}
                              {card.suit === 'diamonds' && '♦️'}
                              {card.suit === 'clubs' && '♣️'}
                              {card.suit === 'spades' && '♠️'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button 
                      onClick={handleReveal}
                      className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold px-8 py-3 rounded-full text-xl"
                    >
                      Reveal & Compare
                    </Button>
                  </div>
                )}

                {gamePhase === 'reveal' && (
                  <div className="space-y-6">
                    <div className="text-white text-xl animate-pulse">
                      Comparing hands...
                    </div>
                  </div>
                )}

                {gamePhase === 'result' && (
                  <div className="space-y-6">
                    <Button 
                      onClick={newRound}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold px-8 py-3 rounded-full text-xl"
                    >
                      Next Round
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Game Chat */}
          <Card className="bg-black/40 backdrop-blur-lg border-purple-500/30 mt-6">
            <CardContent className="p-4">
              <h4 className="text-white font-bold mb-3">Game Chat</h4>
              <div className="max-h-32 overflow-y-auto space-y-1">
                {gameHistory.slice(-5).map((message, index) => (
                  <div key={index} className="text-gray-300 text-sm">
                    {message}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GameInterface;
