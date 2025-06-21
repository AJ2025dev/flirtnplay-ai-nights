
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { EnhancedAICharacter } from "@/types/aiCharacter";
import { getCharacterImageForClothingLevel } from "@/utils/enhancedGameLogic";

interface EnhancedAICharacterPanelProps {
  character: EnhancedAICharacter;
  environment: any;
  difficulty: string;
  isAITalking: boolean;
}

const EnhancedAICharacterPanel = ({ character, environment, difficulty, isAITalking }: EnhancedAICharacterPanelProps) => {
  const getCharacterAnimation = () => {
    if (isAITalking) return 'animate-pulse';
    
    switch (character.personality.type) {
      case 'playful': return 'animate-bounce';
      case 'shy': return 'animate-pulse';
      case 'dominant': return 'hover:scale-105 transition-transform duration-300';
      default: return 'hover:scale-105 transition-transform duration-300';
    }
  };

  const getPersonalityColor = () => {
    switch (character.personality.type) {
      case 'flirty': return 'from-pink-500 to-red-500';
      case 'dominant': return 'from-purple-500 to-indigo-500';
      case 'shy': return 'from-blue-500 to-cyan-500';
      case 'playful': return 'from-yellow-500 to-orange-500';
      default: return 'from-pink-500 to-red-500';
    }
  };

  const currentImage = getCharacterImageForClothingLevel(character, character.gameStats.clothingLevel);

  return (
    <Card className="bg-black/40 backdrop-blur-lg border-purple-500/30">
      <CardContent className="p-6">
        <div className={`text-center ${getCharacterAnimation()}`}>
          {/* Character Image */}
          <div className="relative mb-4">
            <div className={`w-40 h-56 mx-auto rounded-lg bg-gradient-to-r ${getPersonalityColor()} p-1 shadow-lg overflow-hidden`}>
              <img 
                src={currentImage} 
                alt={character.name}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  // Fallback to emoji avatar if image fails to load
                  const target = e.currentTarget as HTMLImageElement;
                  const fallback = target.nextElementSibling as HTMLDivElement;
                  target.style.display = 'none';
                  if (fallback) {
                    fallback.style.display = 'flex';
                  }
                }}
              />
              <div className="hidden w-full h-full bg-gradient-to-r from-pink-500 to-red-500 rounded-lg items-center justify-center text-6xl">
                👤
              </div>
            </div>
          </div>

          {/* Character Info */}
          <h3 className="text-2xl font-bold text-white mb-2">{character.name}</h3>
          <div className="flex justify-center gap-2 mb-4">
            <Badge variant="secondary" className="text-xs">
              {character.culturalBackground.ethnicity}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {character.personality.type}
            </Badge>
          </div>
          
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
              value={(character.gameStats.clothingLevel / character.gameStats.maxClothing) * 100} 
              className="h-3"
            />
            <div className="text-xs text-gray-400 mt-1">
              {character.gameStats.clothingLevel}/{character.gameStats.maxClothing} items remaining
            </div>
          </div>
          
          {/* AI Speech */}
          <div className={`p-4 rounded-lg bg-black/30 min-h-[80px] flex items-center justify-center ${isAITalking ? 'animate-pulse border-2 border-pink-500' : ''}`}>
            <p className="text-white text-center italic">
              "{character.gameStats.currentAction}"
            </p>
          </div>

          {/* Character Details */}
          <div className="mt-4 text-sm text-gray-300 space-y-1">
            <p>Personality: {character.personality.traits.join(', ')}</p>
            <p>Background: {character.culturalBackground.nationality}</p>
            <p>Outfit: {character.outfitTheme}</p>
            <p>Difficulty: {difficulty}</p>
            <p>Mood: {character.gameStats.mood}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedAICharacterPanel;
