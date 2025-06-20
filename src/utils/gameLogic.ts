
import { PlayerCard, DifficultySettings } from '@/types/game';

export const difficultySettings: Record<string, DifficultySettings> = {
  beginner: { winChance: 0.7, startingBet: 50, aiSkill: 0.3 },
  intermediate: { winChance: 0.5, startingBet: 100, aiSkill: 0.5 },
  expert: { winChance: 0.3, startingBet: 200, aiSkill: 0.8 }
};

export const generateCards = (): PlayerCard[] => {
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

export const getAIResponse = (companion: any, situation: string): string => {
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
