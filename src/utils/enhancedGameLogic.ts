
import { EnhancedAICharacter } from '@/types/aiCharacter';
import { enhancedAICharacters } from '@/data/enhancedCharacters';

export const getEnhancedAIResponse = (character: EnhancedAICharacter, situation: string, context?: any): string => {
  const personality = character.personality;
  
  switch (situation) {
    case 'betting':
      return getBettingResponse(personality);
    case 'winning':
      return getWinningResponse(personality);
    case 'losing':
      return personality.stripReactions[Math.floor(Math.random() * personality.stripReactions.length)];
    case 'idle':
      return getIdleResponse(personality);
    default:
      return "Let's play some poker!";
  }
};

const getBettingResponse = (personality: any): string => {
  const responses = {
    flirty: [
      "I'm feeling dangerous tonight... are you brave enough?",
      "Such an interesting choice... what's going through your mind?",
      "Playing it safe or just getting started, darling?",
      "Your move, handsome. Don't keep me waiting."
    ],
    shy: [
      "I... I hope I'm doing this right...",
      "This is making me so nervous!",
      "Please be gentle with me...",
      "I'm not very good at this..."
    ],
    playful: [
      "Ooh, this is getting exciting!",
      "Let's see what surprises you have!",
      "I love games like this!",
      "Ready for some fun?"
    ],
    dominant: [
      "I hope you're prepared for what's coming.",
      "Let me show you how it's done.",
      "You're in my world now.",
      "Don't disappoint me."
    ]
  };
  
  const typeResponses = responses[personality.type] || responses.flirty;
  return typeResponses[Math.floor(Math.random() * typeResponses.length)];
};

const getWinningResponse = (personality: any): string => {
  const responses = {
    flirty: [
      "Better luck next time, sweetheart.",
      "Don't look so disappointed, we're just getting started.",
      "I told you I was feeling dangerous tonight.",
      "Maybe you'll have better luck next hand?"
    ],
    shy: [
      "Oh my! I actually won!",
      "I'm sorry... I didn't mean to...",
      "This is so embarrassing for you...",
      "I got lucky that time!"
    ],
    playful: [
      "Woohoo! That was fun!",
      "Better luck next time!",
      "Oops! Did I do that?",
      "This game is so exciting!"
    ],
    dominant: [
      "As expected.",
      "You need more practice.",
      "Is that all you've got?",
      "I'm just getting started."
    ]
  };
  
  const typeResponses = responses[personality.type] || responses.flirty;
  return typeResponses[Math.floor(Math.random() * typeResponses.length)];
};

const getIdleResponse = (personality: any): string => {
  const responses = {
    flirty: [
      "*plays with hair seductively*",
      "*winks at you*",
      "*leans forward slightly*",
      "*gives you a knowing smile*"
    ],
    shy: [
      "*adjusts clothing nervously*",
      "*looks away bashfully*",
      "*fidgets with hands*",
      "*blushes softly*"
    ],
    playful: [
      "*bounces excitedly*",
      "*giggles playfully*",
      "*makes a silly face*",
      "*does a little dance*"
    ],
    dominant: [
      "*stares intensely*",
      "*crosses arms confidently*",
      "*taps fingers impatiently*",
      "*smirks knowingly*"
    ]
  };
  
  const typeResponses = responses[personality.type] || responses.flirty;
  return typeResponses[Math.floor(Math.random() * typeResponses.length)];
};

export const getCharacterImageForClothingLevel = (character: EnhancedAICharacter, clothingLevel: number): string => {
  const availableImages = character.images.filter(img => img.clothingLevel <= clothingLevel);
  const closestImage = availableImages.reduce((prev, current) => 
    Math.abs(current.clothingLevel - clothingLevel) < Math.abs(prev.clothingLevel - clothingLevel) ? current : prev
  );
  return closestImage.url;
};

export const getCharacterByPersonality = (personalityType: string): EnhancedAICharacter | null => {
  return enhancedAICharacters.find(char => char.personality.type === personalityType) || null;
};

export const getAllCharacters = (): EnhancedAICharacter[] => {
  return enhancedAICharacters;
};
