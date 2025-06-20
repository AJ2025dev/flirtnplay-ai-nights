
export interface GameInterfaceProps {
  user: any;
  companion: any;
  environment: any;
  difficulty: string;
  onExit: () => void;
}

export interface PlayerCard {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  value: string;
  id: string;
}

export interface AICharacter {
  name: string;
  personality: string;
  specialty: string;
  avatar: string;
  clothingLevel: number;
  maxClothing: number;
  mood: 'flirty' | 'confident' | 'nervous' | 'excited';
  currentAction: string;
}

export type GamePhase = 'betting' | 'cards' | 'reveal' | 'result';

export interface DifficultySettings {
  winChance: number;
  startingBet: number;
  aiSkill: number;
}
