
import { Card, CardContent } from "@/components/ui/card";

interface GameChatProps {
  gameHistory: string[];
}

const GameChat = ({ gameHistory }: GameChatProps) => {
  return (
    <Card className="bg-black/40 backdrop-blur-lg border-purple-500/30 mt-6">
      <CardContent className="p-4">
        <h4 className="text-white font-bold mb-3">Game Chat</h4>
        <div className="max-h-32 overflow-y-auto space-y-1">
          {gameHistory.slice(-5).map((message, index) => (
            <div key={index} className="text-gray-300 text-sm">
              {message}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GameChat;
