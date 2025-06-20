
export interface AICharacter {
  id: string;
  name: string;
  personality: string;
  avatar: string;
  clothingLevel: number;
  maxClothing: number;
  mood: 'flirty' | 'confident' | 'nervous' | 'excited' | 'playful' | 'seductive';
  currentAction: string;
  voiceStyle: 'sultry' | 'playful' | 'confident' | 'sweet';
}

export class AICharacterManager {
  private character: AICharacter;

  constructor(character: AICharacter) {
    this.character = character;
  }

  // Generate contextual responses based on game state
  generateResponse(context: 'betting' | 'cards' | 'winning' | 'losing' | 'flirting', playerAction?: string): string {
    const responses = this.getResponsesByContext(context);
    const personalityModifier = this.getPersonalityModifier();
    
    let baseResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Add personality flavor
    if (this.character.mood === 'flirty') {
      baseResponse = this.addFlirtyTouch(baseResponse);
    } else if (this.character.mood === 'confident') {
      baseResponse = this.addConfidentTouch(baseResponse);
    }
    
    return baseResponse;
  }

  private getResponsesByContext(context: string): string[] {
    const responseMap: Record<string, string[]> = {
      betting: [
        "I'm feeling lucky tonight... are you brave enough to match my confidence?",
        "Such an interesting bet... I wonder what you're thinking behind those eyes.",
        "Mmm, playing it safe or just getting warmed up?",
        "Your move, darling. Don't keep me waiting too long.",
        "That's a bold choice... I like that in a player.",
        "Are you sure you want to risk that much? I might surprise you."
      ],
      cards: [
        "Let's see what fate has dealt us...",
        "The cards never lie, but I might be bluffing.",
        "I have a good feeling about this hand.",
        "Your poker face is... adorable.",
        "This hand is going to be interesting...",
        "I can already tell this will be fun."
      ],
      winning: [
        "Better luck next time, sweetheart.",
        "Don't look so disappointed, we're just getting started.",
        "I told you I was feeling lucky tonight.",
        "Maybe you'll have better luck with the next hand?",
        "Oh my... looks like I win this round.",
        "Don't worry, I'll try to go easy on you... maybe."
      ],
      losing: [
        "Well played... I underestimated you.",
        "Enjoy the view while it lasts.",
        "You're more skilled than I thought.",
        "This just got more interesting...",
        "Impressive... but I'm just getting warmed up.",
        "Lucky hand... but can you do it again?"
      ],
      flirting: [
        "You know, you're quite charming when you're concentrating.",
        "Is it getting warm in here, or is it just the game heating up?",
        "I love a player who knows how to take risks.",
        "You have such interesting eyes... are you always this focused?",
        "The way you handle those cards... very impressive.",
        "I'm starting to enjoy this more than I expected."
      ]
    };

    return responseMap[context] || responseMap.betting;
  }

  private getPersonalityModifier(): string {
    switch (this.character.name.toLowerCase()) {
      case 'scarlett':
        return 'mysterious';
      case 'victoria':
        return 'playful';
      case 'raven':
        return 'bold';
      case 'luna':
        return 'sweet';
      default:
        return 'neutral';
    }
  }

  private addFlirtyTouch(response: string): string {
    const flirtyAdditions = [
      " *winks*",
      " *smiles seductively*",
      " *bites lip playfully*",
      " *leans in closer*"
    ];
    
    if (Math.random() > 0.7) {
      return response + flirtyAdditions[Math.floor(Math.random() * flirtyAdditions.length)];
    }
    
    return response;
  }

  private addConfidentTouch(response: string): string {
    const confidentAdditions = [
      " *crosses arms confidently*",
      " *smirks*",
      " *raises eyebrow*",
      " *chuckles softly*"
    ];
    
    if (Math.random() > 0.7) {
      return response + confidentAdditions[Math.floor(Math.random() * confidentAdditions.length)];
    }
    
    return response;
  }

  // Update character state based on game events
  updateMood(event: 'win' | 'loss' | 'flirt' | 'challenge'): void {
    switch (event) {
      case 'win':
        this.character.mood = Math.random() > 0.5 ? 'confident' : 'excited';
        break;
      case 'loss':
        this.character.mood = Math.random() > 0.5 ? 'nervous' : 'playful';
        this.character.clothingLevel = Math.max(0, this.character.clothingLevel - 1);
        break;
      case 'flirt':
        this.character.mood = 'flirty';
        break;
      case 'challenge':
        this.character.mood = 'confident';
        break;
    }
  }

  // Get character state for rendering
  getCharacterState(): AICharacter {
    return { ...this.character };
  }

  // Simulate voice characteristics for future TTS integration
  getVoiceSettings(): { pitch: number; speed: number; volume: number } {
    const voiceMap = {
      sultry: { pitch: 0.8, speed: 0.9, volume: 0.8 },
      playful: { pitch: 1.2, speed: 1.1, volume: 0.9 },
      confident: { pitch: 1.0, speed: 1.0, volume: 1.0 },
      sweet: { pitch: 1.3, speed: 0.95, volume: 0.85 }
    };

    return voiceMap[this.character.voiceStyle] || voiceMap.confident;
  }
}
