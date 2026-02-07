/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#05B084',
        secondary: '#015A84',
        cream: '#EFF5F0',
        mint: '#BADFCD',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'blink': 'blink 2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'idle-float-1': 'idleFloat1 6s ease-in-out infinite',
        'idle-float-2': 'idleFloat2 7s ease-in-out infinite',
        'idle-float-3': 'idleFloat3 8s ease-in-out infinite',
        'ring-pulse': 'ringPulse 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'bob': 'bob 3s ease-in-out infinite',
        'fade-pulse': 'fadePulse 1.5s ease-in-out infinite',
        'spin-slow': 'spin 1.5s linear infinite reverse',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 4px rgba(5,176,132,0.3)' },
          '50%': { boxShadow: '0 0 14px rgba(5,176,132,0.7)' },
        },
        idleFloat1: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(5deg)' },
        },
        idleFloat2: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(-4deg)' },
        },
        idleFloat3: {
          '0%, 100%': { transform: 'translateY(-50%) translateX(0) rotate(0deg)' },
          '50%': { transform: 'translateY(calc(-50% - 18px)) translateX(5px) rotate(3deg)' },
        },
        ringPulse: {
          '0%, 100%': { opacity: '0.1', transform: 'translate(-50%, -50%) scale(1)' },
          '50%': { opacity: '0.25', transform: 'translate(-50%, -50%) scale(1.05)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadePulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
