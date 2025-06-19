
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userData: any) => void;
}

const AuthModal = ({ isOpen, onClose, onLogin }: AuthModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (formData.email && formData.password) {
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        email: formData.email,
        username: formData.username || formData.email.split('@')[0],
        avatar: `/placeholder.svg?height=100&width=100`,
        level: 1,
        chips: 1000,
        gamesPlayed: 0,
        wins: 0
      };
      
      onLogin(userData);
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in to FlirtnPlay",
      });
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (formData.email && formData.password && formData.username) {
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords don't match",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        email: formData.email,
        username: formData.username,
        avatar: `/placeholder.svg?height=100&width=100`,
        level: 1,
        chips: 2000, // Bonus chips for new users
        gamesPlayed: 0,
        wins: 0
      };
      
      onLogin(userData);
      toast({
        title: "Welcome to FlirtnPlay!",
        description: "Your account has been created successfully. Enjoy 2000 bonus chips!",
      });
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-purple-900 to-indigo-900 border-purple-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center text-2xl font-bold">
            <Heart className="w-8 h-8 text-red-500 mr-2 animate-pulse" />
            FlirtnPlay
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-black/40">
            <TabsTrigger value="login" className="data-[state=active]:bg-purple-600">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-purple-600">
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              <div>
                <Label htmlFor="email" className="text-gray-200">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 bg-black/40 border-purple-500/30 text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-200">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 bg-black/40 border-purple-500/30 text-white placeholder-gray-400"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 h-6 w-6 p-0 text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 font-semibold py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4 mt-4">
              <div>
                <Label htmlFor="username" className="text-gray-200">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Choose your username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="pl-10 bg-black/40 border-purple-500/30 text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-200">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 bg-black/40 border-purple-500/30 text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-200">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 bg-black/40 border-purple-500/30 text-white placeholder-gray-400"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 h-6 w-6 p-0 text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-gray-200">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10 bg-black/40 border-purple-500/30 text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 font-semibold py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm text-gray-400 mt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
