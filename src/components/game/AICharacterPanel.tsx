
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AICharacter } from "@/types/game";

interface AICharacterPanelProps {
  aiCharacter: AICharacter;
  environment: any;
  difficulty: string;
  isAITalking: boolean;
}

const AICharacterPanel = ({ aiCharacter, environment, difficulty, isAITalking }: AICharacterPanelProps) => {
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
  );
};

export default AICharacterPanel;
