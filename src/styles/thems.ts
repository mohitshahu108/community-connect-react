import { extendTheme } from "@chakra-ui/react";

//Theme Concept: "Community Connect"
// Primary Colors:

// Blue (#007BFF): Represents trust, reliability, and a sense of community. It's often associated with trust and loyalty, making it a great choice for a community-focused app.
// Green (#28A745): Symbolizes growth, renewal, and positivity. It's a great color for highlighting success and achievements within the community.
// Secondary Colors:

// Gray (#6C757D): Used for text and backgrounds to provide a clean, modern look. It's versatile and works well with both blue and green.
// White (#FFFFFF): For backgrounds and cards to ensure high contrast and readability.
// Accent Colors:

// Yellow (#FFC107): Can be used for call-to-action buttons or to highlight important information. It's vibrant and attention-grabbing.
// Red (#DC3545): For error messages or warnings. It's a strong color that should be used sparingly to avoid overwhelming the user.
// Typography:

// Primary Font: A sans-serif font like "Roboto" or "Open Sans" for its readability and modern look.
// Secondary Font: A serif font like "Merriweather" or "Playfair Display" for headings and titles to add a touch of elegance.
// Icons:

// Use icons that are simple, recognizable, and relevant to the app's functionality. For example, use icons for user profiles, projects, messages, and settings.
// Spacing and Layout:

// Use a consistent spacing scale (e.g., 8px, 16px, 24px, etc.) to ensure a balanced and harmonious layout.
// For cards and modals, use a slight shadow to create depth and make them stand out from the background.
// Animations:

// Subtle animations can enhance the user experience without being distracting. Consider animations for loading states, transitions between pages, and hover effects on buttons and links.
// Accessibility:

// Ensure the theme is accessible, with sufficient color contrast, font sizes, and interactive elements that are easy to use for all users, including those with disabilities.

const theme = extendTheme({
  colors: {
    blue: {
      500: "#007BFF"
    },
    green: {
      500: "#28A745"
    },
    gray: {
      500: "#6C757D"
    },
    yellow: {
      500: "#FFC107"
    },
    red: {
      500: "#DC3545"
    }
  },
  initialColorMode: 'dark', // '
  fonts: {
    heading: "Merriweather, serif",
    body: "Roboto, sans-serif"
  }
  // Add other theme customizations here
});

export default theme;
