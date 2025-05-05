// tailwind.config.js
module.exports = {
    theme: {
      extend: {
        colors: {
          // Light mode colors
          primary: {
            DEFAULT: '#8b5a2b', // Warm brown
            light: '#a67c52',   // Lighter brown
            dark: '#6b4420',    // Darker brown
          },
          secondary: {
            DEFAULT: '#c9b58e', // Beige
            light: '#e6d9c2',   // Light beige
            dark: '#b3a07a',    // Dark beige
          },
          background: {
            DEFAULT: '#fffdf7', // Off-white
            light: '#f5f5f0',   // Light beige
            dark: '#f0ede5',    // Darker beige
          },
          text: {
            DEFAULT: '#4a4a4a', // Dark gray
            light: '#666666',   // Medium gray
            dark: '#333333',    // Very dark gray
          },
          // Dark mode colors
          dark: {
            primary: {
              DEFAULT: '#60a5fa', // Blue-400
              light: '#93c5fd',   // Blue-300
              dark: '#3b82f6',    // Blue-500
            },
            secondary: {
              DEFAULT: '#94a3b8', // Slate-400
              light: '#cbd5e1',   // Slate-300
              dark: '#64748b',    // Slate-500
            },
            background: {
              DEFAULT: '#0f172a', // Slate-900
              light: '#1e293b',   // Slate-800
              dark: '#020617',    // Slate-950
            },
            text: {
              DEFAULT: '#f1f5f9', // Slate-100
              light: '#e2e8f0',   // Slate-200
              dark: '#cbd5e1',    // Slate-300
            },
          },
          // Utility colors
          success: '#22c55e',    // Green-500
          warning: '#f59e0b',    // Amber-500
          error: '#ef4444',      // Red-500
          info: '#3b82f6',       // Blue-500
        }
      }
    }
  }
  