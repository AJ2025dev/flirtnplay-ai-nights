
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Home } from "lucide-react";
import { toast } from "sonner";
import { GameInterfaceProps, PlayerCard, AICharacter, GamePhase } from "@/types/game";
import { difficultySettings, generateCards, getAIResponse } from "@/utils/gameLogic";
import AICharacterPanel from "./game/AICharacterPanel";
import GameArea from "./game/GameArea";
import GameChat from "./game/GameChat";

const GameInterface = ({ user, companion, environment, difficulty, onExit }: GameInterfaceProps) => {
  const [gamePhase, setGamePhase] = useState<GamePhase>('betting');
  const [playerCards, setPlayerCards] = useState<PlayerCard[]>([]);
  const [playerChips, setPlayerChips] = useState(user?.chips || 1000);
  const [currentBet, setCurrentBet] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [isAITalking, setIsAITalking] = useState(false);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [playerWins, setPlayerWins] = useState(0);

  const [aiCharacter, setAiCharacter] = useState<AICharacter>({
    ...companion,
    clothingLevel: 5,
    maxClothing: 5,
    mood: 'flirty' as 'flirty' | 'confident' | 'nervous' | 'excited',
    currentAction: `Welcome to the ${environment.name}... I'm ${companion.name}. Ready to play some strip poker?`
  });

  const [gameHistory, setGameHistory] = useState<string[]>([]);

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
    
    const response = getAIResponse(companion, 'betting');
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
        const response = getAIResponse(companion, 'losing');
        speakAI(response);
        toast.success("You won! " + response);
      } else {
        setAiCharacter(prev => ({
          ...prev,
          mood: 'confident'
        }));
        const response = getAIResponse(companion, 'winning');
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
          <AICharacterPanel
            aiCharacter={aiCharacter}
            environment={environment}
            difficulty={difficulty}
            isAITalking={isAITalking}
          />
        </div>

        {/* Game Area */}
        <div className="lg:col-span-2">
          <GameArea
            gamePhase={gamePhase}
            playerCards={playerCards}
            currentBet={currentBet}
            setCurrentBet={setCurrentBet}
            playerChips={playerChips}
            difficulty={difficulty}
            environment={environment}
            onBet={handleBet}
            onReveal={handleReveal}
            onNewRound={newRound}
          />

          {/* Game Chat */}
          <GameChat gameHistory={gameHistory} />
        </div>
      </div>
    </div>
  );
};

export default GameInterface;
