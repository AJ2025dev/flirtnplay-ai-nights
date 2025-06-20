
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayerCard, GamePhase } from "@/types/game";
import { difficultySettings } from "@/utils/gameLogic";

interface GameAreaProps {
  gamePhase: GamePhase;
  playerCards: PlayerCard[];
  currentBet: number;
  setCurrentBet: (bet: number) => void;
  playerChips: number;
  difficulty: string;
  environment: any;
  onBet: () => void;
  onReveal: () => void;
  onNewRound: () => void;
}

const GameArea = ({
  gamePhase,
  playerCards,
  currentBet,
  setCurrentBet,
  playerChips,
  difficulty,
  environment,
  onBet,
  onReveal,
  onNewRound
}: GameAreaProps) => {
  return (
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
                onClick={onBet}
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
                onClick={onReveal}
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
                onClick={onNewRound}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold px-8 py-3 rounded-full text-xl"
              >
                Next Round
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GameArea;
