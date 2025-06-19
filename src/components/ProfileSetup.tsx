
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { User, Camera, Star, Trophy, Coins, Heart, Crown } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ProfileSetupProps {
  user: any;
  onSave: (userData: any) => void;
}

const ProfileSetup = ({ user, onSave }: ProfileSetupProps) => {
  const [formData, setFormData] = useState({
    username: user?.username || "",
    bio: user?.bio || "",
    favoriteGame: user?.favoriteGame || "",
    playStyle: user?.playStyle || "Casual"
  });

  const avatars = [
    { id: 1, name: "Classic", image: "/placeholder.svg?height=80&width=80&text=👤" },
    { id: 2, name: "Mysterious", image: "/placeholder.svg?height=80&width=80&text=🎭" },
    { id: 3, name: "Glamorous", image: "/placeholder.svg?height=80&width=80&text=💎" },
    { id: 4, name: "Professional", image: "/placeholder.svg?height=80&width=80&text=🎩" },
    { id: 5, name: "Playful", image: "/placeholder.svg?height=80&width=80&text=😊" },
    { id: 6, name: "Seductive", image: "/placeholder.svg?height=80&width=80&text=😘" }
  ];

  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatarId || 1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...formData,
      avatarId: selectedAvatar,
      avatar: avatars.find(a => a.id === selectedAvatar)?.image
    };
    
    onSave(updatedUser);
    localStorage.setItem("flirtnplay_user", JSON.stringify(updatedUser));
    
    toast({
      title: "Profile Updated!",
      description: "Your profile has been saved successfully.",
    });
  };

  const achievements = [
    { id: 1, name: "First Win", description: "Won your first game", earned: user?.wins > 0 },
    { id: 2, name: "High Roller", description: "Bet over 1000 chips in a single game", earned: false },
    { id: 3, name: "Social Butterfly", description: "Played with 10 different players", earned: false },
    { id: 4, name: "Lucky Streak", description: "Won 5 games in a row", earned: false },
    { id: 5, name: "Heart Breaker", description: "Used charm to win a difficult hand", earned: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-8 text-center flex items-center justify-center">
          <User className="w-10 h-10 mr-3 text-purple-400" />
          Your Profile
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Profile Editor */}
          <Card className="bg-black/40 backdrop-blur-lg border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Camera className="w-6 h-6 mr-2 text-purple-400" />
                Customize Your Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Selection */}
              <div>
                <Label className="text-gray-200 text-lg mb-4 block">Choose Your Avatar</Label>
                <div className="grid grid-cols-3 gap-4">
                  {avatars.map((avatar) => (
                    <div
                      key={avatar.id}
                      className={`relative cursor-pointer transition-all duration-200 ${
                        selectedAvatar === avatar.id 
                          ? 'ring-4 ring-purple-500 transform scale-110' 
                          : 'hover:scale-105'
                      }`}
                      onClick={() => setSelectedAvatar(avatar.id)}
                    >
                      <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl">
                        {avatar.name.charAt(0)}
                      </div>
                      <p className="text-center text-xs text-gray-300 mt-2">{avatar.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Username */}
              <div>
                <Label htmlFor="username" className="text-gray-200">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="bg-black/40 border-purple-500/30 text-white"
                  placeholder="Enter your username"
                />
              </div>

              {/* Bio */}
              <div>
                <Label htmlFor="bio" className="text-gray-200">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="bg-black/40 border-purple-500/30 text-white resize-none"
                  placeholder="Tell others about yourself..."
                  rows={3}
                />
              </div>

              {/* Play Style */}
              <div>
                <Label className="text-gray-200">Play Style</Label>
                <div className="flex space-x-2 mt-2">
                  {['Casual', 'Competitive', 'Flirty', 'Strategic'].map((style) => (
                    <Button
                      key={style}
                      variant={formData.playStyle === style ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFormData({ ...formData, playStyle: style })}
                      className={`${
                        formData.playStyle === style
                          ? 'bg-purple-600 text-white'
                          : 'border-purple-500/30 text-purple-300 hover:bg-purple-600/20'
                      }`}
                    >
                      {style}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Save Profile
              </Button>
            </CardContent>
          </Card>

          {/* Stats & Achievements */}
          <div className="space-y-6">
            {/* Player Stats */}
            <Card className="bg-black/40 backdrop-blur-lg border-gold-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Trophy className="w-6 h-6 mr-2 text-gold-400" />
                  Player Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-purple-600/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">{user?.level || 1}</div>
                    <div className="text-sm text-gray-300">Level</div>
                  </div>
                  <div className="text-center p-4 bg-gold-600/20 rounded-lg">
                    <div className="text-2xl font-bold text-gold-400 flex items-center justify-center">
                      <Coins className="w-5 h-5 mr-1" />
                      {user?.chips?.toLocaleString() || 0}
                    </div>
                    <div className="text-sm text-gray-300">Chips</div>
                  </div>
                  <div className="text-center p-4 bg-green-600/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">{user?.wins || 0}</div>
                    <div className="text-sm text-gray-300">Wins</div>
                  </div>
                  <div className="text-center p-4 bg-blue-600/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">{user?.gamesPlayed || 0}</div>
                    <div className="text-sm text-gray-300">Games</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-black/40 backdrop-blur-lg border-red-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Star className="w-6 h-6 mr-2 text-red-400" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        achievement.earned 
                          ? 'bg-gold-600/20 border border-gold-500/30' 
                          : 'bg-gray-800/40'
                      }`}
                    >
                      <div>
                        <h4 className={`font-semibold ${
                          achievement.earned ? 'text-gold-400' : 'text-gray-400'
                        }`}>
                          {achievement.name}
                        </h4>
                        <p className="text-sm text-gray-300">{achievement.description}</p>
                      </div>
                      {achievement.earned ? (
                        <Crown className="w-6 h-6 text-gold-400" />
                      ) : (
                        <div className="w-6 h-6 border-2 border-gray-600 rounded-full"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
