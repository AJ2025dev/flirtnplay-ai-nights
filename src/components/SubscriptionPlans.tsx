
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Star, Zap, Heart, Sparkles, Trophy, Gift } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SubscriptionPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState("premium");

  const plans = [
    {
      id: "free",
      name: "Free Player",
      price: 0,
      period: "forever",
      color: "gray",
      icon: Heart,
      popular: false,
      features: [
        "Access to basic game rooms",
        "1 AI companion (Luna)",
        "Daily 100 bonus chips", 
        "Basic avatar customization",
        "Standard support"
      ]
    },
    {
      id: "premium",
      name: "Premium Player",
      price: 9.99,
      period: "month",
      color: "purple",
      icon: Crown,
      popular: true,
      features: [
        "Access to all game rooms",
        "All 4 AI companions available",
        "Daily 500 bonus chips",
        "Premium avatar collection",
        "Ad-free experience",
        "Priority customer support",
        "Exclusive tournaments",
        "Custom game themes"
      ]
    },
    {
      id: "vip",
      name: "VIP Elite",
      price: 19.99,
      period: "month", 
      color: "gold",
      icon: Trophy,
      popular: false,
      features: [
        "Everything in Premium",
        "VIP-only exclusive rooms",
        "Personal AI companion training",
        "Daily 1000 bonus chips",
        "Unlimited avatar customization",
        "Priority matchmaking",
        "Exclusive VIP tournaments",
        "Personal concierge support",
        "Beta feature access",
        "Custom room creation"
      ]
    }
  ];

  const handleSubscribe = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (planId === "free") {
      toast({
        title: "Already Free!",
        description: "You're currently on the free plan. Upgrade to unlock premium features!",
      });
    } else {
      toast({
        title: "Subscription Started!",
        description: `Welcome to ${plan?.name}! Your premium features are now active.`,
      });
      // Here you would integrate with actual payment processing
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-purple-400 to-pink-400 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Unlock the full FlirtnPlay experience with premium features, exclusive content, and enhanced gameplay
          </p>
        </div>

        {/* Subscription Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-black/40 backdrop-blur-lg rounded-full p-2 border border-purple-500/30">
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                className="rounded-full px-6 py-2 bg-purple-600 text-white"
              >
                Monthly
              </Button>
              <Button
                variant="ghost"
                className="rounded-full px-6 py-2 text-gray-300 hover:bg-white/10"
              >
                Yearly <Badge className="ml-2 bg-green-600">Save 20%</Badge>
              </Button>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            const isSelected = selectedPlan === plan.id;
            
            return (
              <Card
                key={plan.id}
                className={`relative bg-black/40 backdrop-blur-lg border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  plan.popular 
                    ? 'border-purple-500 ring-2 ring-purple-500/20' 
                    : plan.color === 'gold' 
                    ? 'border-gold-500/50 hover:border-gold-500' 
                    : 'border-gray-500/30 hover:border-gray-500'
                } ${isSelected ? 'ring-4 ring-purple-400' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 text-sm font-semibold">
                      MOST POPULAR
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${
                    plan.color === 'gold' 
                      ? 'from-gold-500 to-yellow-500' 
                      : plan.color === 'purple' 
                      ? 'from-purple-500 to-pink-500' 
                      : 'from-gray-500 to-gray-600'
                  } flex items-center justify-center`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <CardTitle className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </CardTitle>
                  
                  <div className="text-center">
                    <span className={`text-4xl font-bold ${
                      plan.color === 'gold' ? 'text-gold-400' : 
                      plan.color === 'purple' ? 'text-purple-400' : 'text-gray-400'
                    }`}>
                      ${plan.price}
                    </span>
                    <span className="text-gray-400">/{plan.period}</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <Check className={`w-5 h-5 mr-3 ${
                          plan.color === 'gold' ? 'text-gold-400' : 
                          plan.color === 'purple' ? 'text-purple-400' : 'text-gray-400'
                        }`} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleSubscribe(plan.id)}
                    className={`w-full font-semibold py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 ${
                      plan.color === 'gold'
                        ? 'bg-gradient-to-r from-gold-500 to-yellow-500 hover:from-gold-600 hover:to-yellow-600 text-black'
                        : plan.color === 'purple'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                        : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white'
                    }`}
                  >
                    {plan.price === 0 ? 'Current Plan' : 'Subscribe Now'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Premium Features Showcase */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-black/40 backdrop-blur-lg border-purple-500/30 text-center p-6">
            <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-white font-bold text-lg mb-2">AI Companions</h3>
            <p className="text-gray-300 text-sm">Four unique AI personalities to enhance your gaming experience</p>
          </Card>

          <Card className="bg-black/40 backdrop-blur-lg border-gold-500/30 text-center p-6">
            <Crown className="w-12 h-12 text-gold-400 mx-auto mb-4" />
            <h3 className="text-white font-bold text-lg mb-2">VIP Rooms</h3>
            <p className="text-gray-300 text-sm">Exclusive high-stakes games with premium rewards</p>
          </Card>

          <Card className="bg-black/40 backdrop-blur-lg border-red-500/30 text-center p-6">
            <Gift className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-white font-bold text-lg mb-2">Daily Bonuses</h3>
            <p className="text-gray-300 text-sm">Extra chips and rewards delivered daily to your account</p>
          </Card>

          <Card className="bg-black/40 backdrop-blur-lg border-green-500/30 text-center p-6">
            <Zap className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-white font-bold text-lg mb-2">No Ads</h3>
            <p className="text-gray-300 text-sm">Uninterrupted gaming experience without advertisements</p>
          </Card>
        </div>

        {/* Testimonials */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">What Our Players Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-black/40 backdrop-blur-lg border-purple-500/30 p-6">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">
                  "The AI companions make every game feel unique and exciting. Premium is totally worth it!"
                </p>
                <p className="text-purple-400 font-semibold">- Sarah M.</p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-lg border-gold-500/30 p-6">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">
                  "VIP Elite gives me access to the best games and players. The experience is unmatched!"
                </p>
                <p className="text-gold-400 font-semibold">- Marcus R.</p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-lg border-red-500/30 p-6">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">
                  "Love the customization options and exclusive tournaments. FlirtnPlay Premium rocks!"
                </p>
                <p className="text-red-400 font-semibold">- Jessica L.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
