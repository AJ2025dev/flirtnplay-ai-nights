
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Users, Sparkles, Crown, Heart, Star } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import GameLobby from "@/components/GameLobby";
import ProfileSetup from "@/components/ProfileSetup";
import SubscriptionPlans from "@/components/SubscriptionPlans";

const Index = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState("home");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulated login check
    const savedUser = localStorage.getItem("flirtnplay_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("flirtnplay_user", JSON.stringify(userData));
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("flirtnplay_user");
    setCurrentView("home");
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "lobby":
        return <GameLobby user={user} />;
      case "profile":
        return <ProfileSetup user={user} onSave={setUser} />;
      case "subscription":
        return <SubscriptionPlans />;
      default:
        return renderHomePage();
    }
  };

  const renderHomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-10 w-60 h-60 bg-red-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-10 left-1/3 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <Heart className="w-8 h-8 text-red-500 animate-pulse" />
          <h1 className="text-2xl font-bold text-white">FlirtnPlay</h1>
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Button
                variant="ghost"
                onClick={() => setCurrentView("profile")}
                className="text-white hover:bg-white/10"
              >
                Profile
              </Button>
              <Button
                variant="ghost"
                onClick={() => setCurrentView("subscription")}
                className="text-gold-400 hover:bg-gold-400/10"
              >
                <Crown className="w-4 h-4 mr-2" />
                Premium
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsAuthOpen(true)}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Sign In
            </Button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-red-500 to-pink-500 mb-6 animate-pulse">
            FlirtnPlay
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
            The most seductive strip poker experience with AI-powered interactions
            <br />
            <span className="text-gold-400 font-semibold">Play. Flirt. Win.</span>
          </p>
          
          {isLoggedIn ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => setCurrentView("lobby")}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold px-8 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center"
              >
                <Play className="w-6 h-6 mr-2" />
                Enter Game Lobby
              </Button>
              <Button
                onClick={() => setCurrentView("profile")}
                size="lg"
                variant="outline"
                className="border-2 border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-black font-bold px-8 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Sparkles className="w-6 h-6 mr-2" />
                Customize Profile
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setIsAuthOpen(true)}
              size="lg"
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold px-12 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 text-xl"
            >
              <Play className="w-8 h-8 mr-3" />
              Start Playing Now
            </Button>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          Why Choose <span className="text-gold-400">FlirtnPlay</span>?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-lg hover:bg-black/60 transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-8 text-center">
              <Users className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Live Multiplayer</h3>
              <p className="text-gray-300">
                Play against real opponents in real-time with our advanced matchmaking system
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-red-500/30 backdrop-blur-lg hover:bg-black/60 transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-8 text-center">
              <Sparkles className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">AI Companions</h3>
              <p className="text-gray-300">
                Flirtatious AI avatars that react to your moves and keep the game exciting
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-gold-500/30 backdrop-blur-lg hover:bg-black/60 transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-8 text-center">
              <Crown className="w-16 h-16 text-gold-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Premium Experience</h3>
              <p className="text-gray-300">
                Exclusive avatars, custom themes, and VIP tournaments for premium members
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 bg-black/30 backdrop-blur-lg py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gold-400 mb-2">100K+</div>
              <div className="text-gray-300">Active Players</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-400 mb-2">50M+</div>
              <div className="text-gray-300">Games Played</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
              <div className="text-gray-300">Live Action</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-400 mb-2">★ 4.8</div>
              <div className="text-gray-300">App Store Rating</div>
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );

  return (
    <div className="min-h-screen">
      {currentView !== "home" && (
        <nav className="bg-gradient-to-r from-purple-900 to-indigo-900 p-4 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <Button
              onClick={() => setCurrentView("home")}
              variant="ghost"
              className="text-white hover:bg-white/10 flex items-center"
            >
              <Heart className="w-6 h-6 mr-2 text-red-500" />
              FlirtnPlay
            </Button>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setCurrentView("lobby")}
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                Lobby
              </Button>
              <Button
                onClick={() => setCurrentView("profile")}
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                Profile
              </Button>
              <Button
                onClick={() => setCurrentView("subscription")}
                variant="ghost"
                className="text-gold-400 hover:bg-gold-400/10"
              >
                <Crown className="w-4 h-4 mr-2" />
                Premium
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Logout
              </Button>
            </div>
          </div>
        </nav>
      )}
      {renderCurrentView()}
    </div>
  );
};

export default Index;
