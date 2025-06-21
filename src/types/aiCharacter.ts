
export interface CharacterImage {
  url: string;
  clothingLevel: number;
  expression: 'neutral' | 'flirty' | 'surprised' | 'shy' | 'confident' | 'playful';
  pose: 'standing' | 'sitting' | 'leaning' | 'gesture';
}

export interface PersonalityConfig {
  type: 'flirty' | 'shy' | 'playful' | 'dominant';
  traits: string[];
  responseStyle: string;
  stripReactions: string[];
  idleBehavior: string[];
  dialogueTone: 'flirty' | 'witty' | 'seductive' | 'competitive';
}

export interface CulturalBackground {
  ethnicity: 'western' | 'indian' | 'japanese' | 'latina' | 'asian';
  nationality: string;
  culturalTraits: string[];
}

export interface EnhancedAICharacter {
  id: string;
  name: string;
  gender: 'female' | 'male';
  culturalBackground: CulturalBackground;
  personality: PersonalityConfig;
  outfitTheme: 'elegant' | 'traditional' | 'casual' | 'formal' | 'saree';
  images: CharacterImage[];
  voiceConfig: {
    voiceId: string;
    pitch: number;
    speed: number;
    emotion: string;
  };
  gameStats: {
    clothingLevel: number;
    maxClothing: number;
    mood: string;
    currentAction: string;
  };
}
