
import { EnhancedAICharacter } from '@/types/aiCharacter';

export const enhancedAICharacters: EnhancedAICharacter[] = [
  {
    id: 'scarlett_western',
    name: 'Scarlett',
    gender: 'female',
    culturalBackground: {
      ethnicity: 'western',
      nationality: 'American',
      culturalTraits: ['confident', 'direct', 'independent']
    },
    personality: {
      type: 'flirty',
      traits: ['Bold', 'Confident', 'Seductive'],
      responseStyle: 'Teasing, playful, often initiates flirty lines',
      stripReactions: [
        "Oops, guess I got carried away 😘",
        "Hope you're enjoying the view, darling",
        "This is what happens when you play with fire",
        "Don't get too distracted now..."
      ],
      idleBehavior: ['hair_flip', 'wink', 'lean_forward', 'smile_seductively'],
      dialogueTone: 'seductive'
    },
    outfitTheme: 'elegant',
    images: [
      {
        url: '/placeholder.svg',
        clothingLevel: 5,
        expression: 'confident',
        pose: 'standing'
      },
      {
        url: '/placeholder.svg',
        clothingLevel: 4,
        expression: 'flirty',
        pose: 'leaning'
      },
      {
        url: '/placeholder.svg',
        clothingLevel: 3,
        expression: 'playful',
        pose: 'gesture'
      }
    ],
    voiceConfig: {
      voiceId: 'Charlotte', // ElevenLabs voice
      pitch: 1.0,
      speed: 0.9,
      emotion: 'seductive'
    },
    gameStats: {
      clothingLevel: 5,
      maxClothing: 5,
      mood: 'confident',
      currentAction: 'Ready to play some poker, handsome?'
    }
  },
  {
    id: 'priya_indian',
    name: 'Priya',
    gender: 'female',
    culturalBackground: {
      ethnicity: 'indian',
      nationality: 'Indian',
      culturalTraits: ['graceful', 'traditional', 'elegant']
    },
    personality: {
      type: 'shy',
      traits: ['Gentle', 'Modest', 'Sweet'],
      responseStyle: 'Blushes, avoids direct eye contact, speaks softly',
      stripReactions: [
        "This is so embarrassing... *blushes*",
        "I can't believe I'm doing this...",
        "Please don't stare too much",
        "You're making me so nervous..."
      ],
      idleBehavior: ['adjust_saree', 'look_away_shyly', 'gentle_smile', 'fidget_with_jewelry'],
      dialogueTone: 'witty'
    },
    outfitTheme: 'saree',
    images: [
      {
        url: '/placeholder.svg',
        clothingLevel: 5,
        expression: 'shy',
        pose: 'standing'
      },
      {
        url: '/placeholder.svg',
        clothingLevel: 4,
        expression: 'surprised',
        pose: 'sitting'
      },
      {
        url: '/placeholder.svg',
        clothingLevel: 3,
        expression: 'neutral',
        pose: 'gesture'
      }
    ],
    voiceConfig: {
      voiceId: 'Aria', // ElevenLabs voice
      pitch: 1.1,
      speed: 0.8,
      emotion: 'gentle'
    },
    gameStats: {
      clothingLevel: 5,
      maxClothing: 5,
      mood: 'nervous',
      currentAction: 'I hope you\'ll be gentle with me...'
    }
  },
  {
    id: 'victoria_playful',
    name: 'Victoria',
    gender: 'female',
    culturalBackground: {
      ethnicity: 'western',
      nationality: 'British',
      culturalTraits: ['witty', 'charming', 'sophisticated']
    },
    personality: {
      type: 'playful',
      traits: ['Mischievous', 'Witty', 'Energetic'],
      responseStyle: 'Quick with puns and light-hearted teasing',
      stripReactions: [
        "Let's raise the stakes, shall we?",
        "Oops! Butterfingers! 😄",
        "This game just got more interesting!",
        "Hope you can handle what's coming next!"
      ],
      idleBehavior: ['playful_wink', 'giggle', 'bounce_slightly', 'tease_gesture'],
      dialogueTone: 'flirty'
    },
    outfitTheme: 'elegant',
    images: [
      {
        url: '/placeholder.svg',
        clothingLevel: 5,
        expression: 'playful',
        pose: 'standing'
      },
      {
        url: '/placeholder.svg',
        clothingLevel: 4,
        expression: 'flirty',
        pose: 'leaning'
      },
      {
        url: '/placeholder.svg',
        clothingLevel: 3,
        expression: 'confident',
        pose: 'gesture'
      }
    ],
    voiceConfig: {
      voiceId: 'Sarah', // ElevenLabs voice
      pitch: 1.05,
      speed: 1.0,
      emotion: 'playful'
    },
    gameStats: {
      clothingLevel: 5,
      maxClothing: 5,
      mood: 'excited',
      currentAction: 'This is going to be so much fun!'
    }
  },
  {
    id: 'luna_dominant',
    name: 'Luna',
    gender: 'female',
    culturalBackground: {
      ethnicity: 'latina',
      nationality: 'Spanish',
      culturalTraits: ['passionate', 'fiery', 'commanding']
    },
    personality: {
      type: 'dominant',
      traits: ['Assertive', 'Commanding', 'Intense'],
      responseStyle: 'Talks like she\'s in charge, direct commands',
      stripReactions: [
        "Your turn to lose something 😉",
        "I hope you're ready for what's next",
        "Don't think this changes who's in control",
        "Enjoying the show? Good."
      ],
      idleBehavior: ['commanding_pose', 'intense_stare', 'authoritative_gesture', 'smirk'],
      dialogueTone: 'competitive'
    },
    outfitTheme: 'formal',
    images: [
      {
        url: '/placeholder.svg',
        clothingLevel: 5,
        expression: 'confident',
        pose: 'standing'
      },
      {
        url: '/placeholder.svg',
        clothingLevel: 4,
        expression: 'flirty',
        pose: 'leaning'
      },
      {
        url: '/placeholder.svg',
        clothingLevel: 3,
        expression: 'playful',
        pose: 'gesture'
      }
    ],
    voiceConfig: {
      voiceId: 'Jessica', // ElevenLabs voice
      pitch: 0.95,
      speed: 0.9,
      emotion: 'commanding'
    },
    gameStats: {
      clothingLevel: 5,
      maxClothing: 5,
      mood: 'confident',
      currentAction: 'Let me show you how this game is really played.'
    }
  }
];
