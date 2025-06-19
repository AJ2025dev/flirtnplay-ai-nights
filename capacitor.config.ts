
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.273ab87a8f3349d2b2558b7d836af1cb',
  appName: 'flirtnplay-ai-nights',
  webDir: 'dist',
  server: {
    url: 'https://273ab87a-8f33-49d2-b255-8b7d836af1cb.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#2D1B69',
      showSpinner: false
    }
  }
};

export default config;
