module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            transform: 'translateY(0%)',
          },
          '50%': {
            transform: 'translateY(-100%)',
          },
        },
        'gradient-x': {
          '0%, 100%': {
            transform: 'translateX(0%)',
          },
          '50%': {
            transform: 'translateX(-100%)',
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            transform: 'translate(0%, 0%)',
          },
          '25%': {
            transform: 'translate(-100%, 0%)',
          },
          '50%': {
            transform: 'translate(-100%, -100%)',
          },
          '75%': {
            transform: 'translate(0%, -100%)',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        'pulse-glow': {
          '0%': {
            boxShadow: '0 0 5px #3b82f6, 0 0 10px #3b82f6, 0 0 15px #3b82f6',
          },
          '100%': {
            boxShadow: '0 0 10px #3b82f6, 0 0 20px #3b82f6, 0 0 30px #3b82f6',
          },
        },
      },
    },
  },
  plugins: [],
}