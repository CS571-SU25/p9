/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* white-10 */
        input: "var(--color-input)", /* gray-800 */
        ring: "var(--color-ring)", /* hot-pink */
        background: "var(--color-background)", /* charcoal-900 */
        foreground: "var(--color-foreground)", /* gray-100 */
        primary: {
          DEFAULT: "var(--color-primary)", /* hot-pink */
          foreground: "var(--color-primary-foreground)", /* white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* medium-purple */
          foreground: "var(--color-secondary-foreground)", /* white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* crimson */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* gray-700 */
          foreground: "var(--color-muted-foreground)", /* gray-400 */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* gold */
          foreground: "var(--color-accent-foreground)", /* charcoal-900 */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* gray-800 */
          foreground: "var(--color-popover-foreground)", /* gray-100 */
        },
        card: {
          DEFAULT: "var(--color-card)", /* gray-800 */
          foreground: "var(--color-card-foreground)", /* gray-100 */
        },
        success: {
          DEFAULT: "var(--color-success)", /* forest-green */
          foreground: "var(--color-success-foreground)", /* white */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* dark-orange */
          foreground: "var(--color-warning-foreground)", /* white */
        },
        error: {
          DEFAULT: "var(--color-error)", /* crimson */
          foreground: "var(--color-error-foreground)", /* white */
        },
        "serene-blue": {
          DEFAULT: "var(--color-serene-blue)", /* royal-blue */
          foreground: "var(--color-serene-blue-foreground)", /* white */
        },
        "sunrise-orange": {
          DEFAULT: "var(--color-sunrise-orange)", /* orange-red */
          foreground: "var(--color-sunrise-orange-foreground)", /* white */
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        'headline': ['Noto Serif JP', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'cta': ['Zen Kaku Gothic New', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '13': '3.25rem',
        '21': '5.25rem',
        '34': '8.5rem',
        '55': '13.75rem',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 105, 180, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(255, 105, 180, 0.5)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        'mystical-gradient': 'linear-gradient(135deg, #FF69B4 0%, #9370DB 100%)',
        'dawn-gradient': 'linear-gradient(180deg, #FF69B4 0%, #FFD700 50%, #9370DB 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
      },
      boxShadow: {
        'mystical': '0 4px 20px rgba(255, 105, 180, 0.15)',
        'premium': '0 8px 32px rgba(147, 112, 219, 0.2)',
        'floating': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(255, 105, 180, 0.3)',
        'glow-intense': '0 0 30px rgba(255, 105, 180, 0.5)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      transitionTimingFunction: {
        'mystical': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '300': '300ms',
        '600': '600ms',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}