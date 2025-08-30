# Privacy Notice Implementation

This document describes the privacy notice popup/modal implementation added to the portfolio website.

## Features

- **Multi-language Support**: Available in English, Spanish, and Italian
- **Responsive Design**: Adapts to different screen sizes
- **Accessibility**: Proper ARIA attributes and keyboard navigation
- **Persistent Storage**: Remembers user's acknowledgment using localStorage
- **Theme Integration**: Matches the existing design system (dark/light mode)
- **TypeScript**: Fully typed with proper interfaces

## Components

### CookieConsent Component

- **Location**: `src/components/CookieConsent/`
- **Props**:
  - `show`: boolean - Controls visibility
  - `onAccept`: function - Called when user acknowledges the notice
  - `onClose`: function - Called when user closes without acknowledging

### useCookieConsent Hook

- **Location**: `src/hooks/useCookieConsent.ts`
- **Returns**:
  - `showConsent`: boolean - Whether to show the privacy notice
  - `hasConsented`: boolean | null - User's acknowledgment status
  - `acceptCookies`: function - Acknowledge notice handler
  - `closeConsent`: function - Close notice handler

## Translation Files

The privacy notice supports three languages:

- **English**: `public/locales/en/cookie-consent.json`
- **Spanish**: `public/locales/es/cookie-consent.json`
- **Italian**: `public/locales/it/cookie-consent.json`

## Styling

The component uses SCSS with:

- BEM methodology for class naming
- Responsive design with mobile-first approach
- Theme-aware styling (dark/light mode)
- Smooth animations and transitions
- Proper focus states for accessibility

## Integration

The privacy notice is integrated into the main app via:

- `src/router/Routes.tsx` - Main integration point
- `src/language/i18n.ts` - Translation namespace added
- `src/components/index.ts` - Component export

## Testing

Comprehensive test coverage includes:

- Component rendering and interactions
- Hook state management
- localStorage persistence
- Accessibility attributes
- User interactions (acknowledge/close)

## Usage

The privacy notice automatically appears for new visitors and respects previous acknowledgments. Users can:

1. **I Understand**: Acknowledges the privacy notice and stores the choice
2. **Close**: Dismisses without acknowledging (will show again on next visit)

## Technical Details

- **Storage**: Uses localStorage with key 'cookie-consent'
- **Values**: 'accepted' or null
- **Z-index**: 9999 to ensure it appears above other content
- **Animation**: Slide-up animation from bottom
- **Position**: Fixed to bottom of viewport

## Privacy Information

This implementation provides clear information about:

- **Interaction Tracking**: Anonymous tracking of user interactions (pages visited, time spent) to improve functionality and user experience
- **Local Storage**: Theme preferences (light/dark mode) and language selection stored locally on the user's device
- **No Personal Data**: No personal or sensitive data is collected or stored
- **Local Processing**: All data remains on the user's device and is not transmitted to servers

## Compliance

This implementation provides:

- Clear information about data usage
- Transparency about what data is collected
- Emphasis on local storage and anonymity
- Accessible interface
- Legal-compliant language

## Future Enhancements

Potential improvements could include:

- More detailed privacy policy link
- Cookie preference management page
- Analytics integration based on acknowledgment
- A/B testing capabilities
- GDPR-specific features
