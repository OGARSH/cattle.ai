# Design Guidelines for Cattle & Buffalo Breed Recognition App

## Design Approach
**Reference-Based Approach**: Drawing inspiration from agricultural and productivity applications like FarmLogs and modern mobile-first interfaces, combined with design patterns from Notion and Linear for clean, functional UI that works well for field workers.

## Core Design Elements

### A. Color Palette
**Light Mode:**
- Primary: 34 70% 45% (Forest Green - agricultural, trustworthy)
- Secondary: 210 15% 25% (Charcoal - professional text)
- Background: 0 0% 98% (Soft white)
- Surface: 0 0% 100% (Pure white cards)
- Accent: 45 90% 60% (Warm amber - sparingly for CTAs)

**Dark Mode:**
- Primary: 34 60% 55% (Lighter forest green)
- Secondary: 210 15% 85% (Light gray text)
- Background: 210 15% 8% (Deep charcoal)
- Surface: 210 15% 12% (Dark gray cards)

### B. Typography
- **Primary Font**: Inter (Google Fonts) - excellent readability for field conditions
- **Secondary Font**: Poppins (Google Fonts) - for headings and brand elements
- **Hierarchy**: Large headings (2xl-3xl), body text (base-lg), small labels (sm)

### C. Layout System
**Tailwind Spacing Units**: Primary use of 2, 4, 6, 8, and 12 for consistent spacing
- Tight spacing: p-2, m-2
- Standard spacing: p-4, m-4, gap-6
- Section spacing: p-8, my-12

### D. Component Library

**Navigation:**
- Sticky header with logo, dark/light mode toggle
- Mobile-first hamburger menu
- Breadcrumbs for deep navigation

**Forms:**
- Large, touch-friendly inputs (h-12 minimum)
- Clear labels with Hindi translations
- Drag-and-drop upload zones with dotted borders
- Ear tag ID input with validation

**Data Display:**
- Breed information cards with clear sections
- Language toggle buttons (EN/HI) positioned prominently
- History table with sortable columns
- Image thumbnails with metadata

**Core Components:**
- Primary buttons: Solid backgrounds with rounded corners
- Secondary buttons: Outline variants with blurred backgrounds when over images
- Loading states for AI recognition
- Toast notifications for feedback
- Modal overlays for detailed breed information

## Page-Specific Guidelines

### Homepage Hero
Large hero section (70vh) with:
- Background: Gradient from primary green to darker shade
- Hero image: Wide shot of Indian cattle in pastoral setting (placeholder for now)
- Call-to-action buttons with outline variants and blurred backgrounds

### About Us Team Grid
- 3x2 grid on desktop, single column on mobile
- Team member cards with placeholder profile images
- Consistent card heights with equal spacing (gap-6)

### Authentication Pages
- Centered forms with maximum width constraints
- Replit Auth integration styling
- Clear visual feedback for form states

## Images
- **Hero Image**: Panoramic shot of Indian cattle/buffalo in natural setting - pastoral landscape
- **Team Profile Images**: Placeholder circles with initials until actual photos provided
- **Breed Information**: Stock photos of various Indian cattle breeds
- **Upload Interface**: Visual drag-and-drop zone with cattle silhouette icon

## Accessibility & Usability
- High contrast ratios for outdoor visibility
- Large touch targets (44px minimum)
- Consistent dark mode implementation across all form inputs
- Loading indicators for AI processing
- Clear error messages in both languages
- Keyboard navigation support

The design prioritizes functionality and clarity for field workers while maintaining a modern, professional appearance suitable for agricultural technology applications.