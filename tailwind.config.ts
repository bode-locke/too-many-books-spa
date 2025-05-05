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
              DEFAULT: '#10b981', // Muted green
              light: '#34d399',   // Lighter green
              dark: '#059669',    // Darker green
            },
            secondary: {
              DEFAULT: '#a1a1a1', // Neutral gray
              light: '#d1d1d1',   // Light gray
              dark: '#717171',    // Dark gray
            },
            background: {
              DEFAULT: '#2d2d2d', // Soft dark gray
              light: '#3d3d3d',   // Slightly lighter
              dark: '#1d1d1d',    // Darker shade
            },
            text: {
              DEFAULT: '#e0e0e0', // Soft white
              light: '#f0f0f0',   // Light white
              dark: '#b0b0b0',    // Muted white
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
  