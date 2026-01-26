# SilverHealth Companion - Architecture & Design

## Technology Stack

### Frontend Framework
- **Recommendation**: React or Vue.js for component-based architecture
- **Alternative**: Vanilla JavaScript with modern ES6+ features
- **Rationale**: Need for interactive wizard UI and state management

### Styling
- **CSS Framework**: Custom CSS with focus on accessibility
- **Design System**: High-contrast color palette, large typography scale
- **Responsive**: Mobile-first approach with breakpoints for tablets/desktop

### Data Storage
- **Session State**: Health metrics stored only in component state during wizard process
- **localStorage**: Only anonymous usage counter stored (no personal data)
- **Data Lifecycle**: All health data deleted immediately after summary/diet generation
- **Privacy**: No persistent storage of personal health information

### Build Tools
- **Bundler**: Vite or Webpack for development and production builds
- **Package Manager**: npm or yarn

## Application Architecture

### Component Structure

```
SilverHealth Companion
├── App (Root Component)
│   ├── Home/Main Screen
│   │   ├── Start Wizard Button
│   │   └── Browse Diet Plans Link (direct access)
│   ├── Wizard Component
│   │   ├── Step 1: Welcome/Introduction
│   │   ├── Step 2: Weight Input
│   │   ├── Step 3: Height Input
│   │   ├── Step 4: Waist Circumference Input
│   │   ├── Step 5: Medical Conditions Selection
│   │   └── Step 6: Review & Confirm
│   ├── Summary Component
│   │   ├── Summary Display
│   │   └── Print/Download Functionality
│   ├── Diet Plans Browser Component
│   │   ├── Plan List/Grid View
│   │   ├── Plan Filtering (by condition/type)
│   │   └── Plan Selection
│   └── Diet Plan Display Component
│       ├── Daily Meal Plan View
│       ├── Recipe Details
│       ├── Plan Duration Selector (1, 2, or 3 days)
│       └── Custom Plan Generator
```

### Data Model

#### Session State (Memory Only - Deleted After Use)
```javascript
// Stored only in component state during wizard
{
  metrics: {
    weight: {
      value: number,
      unit: "kg" | "lbs"
    },
    height: {
      value: number,
      unit: "cm" | "inches"
    },
    waist: {
      value: number,
      unit: "cm" | "inches"
    }
  },
  conditions: string[] // e.g., ["diabetes", "hypertension"]
}
// This data is DELETED immediately after summary/diet generation
```

#### Static Diet Plans Database (Predefined Plans)
```javascript
// Stored in static JSON files or constants
// File: data/dietPlans.json
[
  {
    id: "diabetes-plan-001",
    name: "Plan para Diabetes",
    description: "Plan de alimentación balanceado para personas con diabetes",
    targetConditions: ["diabetes"],
    dailyMeals: {
      breakfast: {
        name: "Desayuno",
        items: [
          { name: "Avena con frutas", portions: "1 taza", calories: 250 },
          { name: "Té verde", portions: "1 taza", calories: 2 }
        ]
      },
      lunch: {
        name: "Almuerzo",
        items: [
          { name: "Pollo a la plancha", portions: "150g", calories: 200 },
          { name: "Ensalada mixta", portions: "2 tazas", calories: 100 }
        ]
      },
      dinner: {
        name: "Cena",
        items: [
          { name: "Pescado al horno", portions: "120g", calories: 180 },
          { name: "Verduras al vapor", portions: "1.5 tazas", calories: 80 }
        ]
      },
      snacks: [
        { name: "Yogur griego", portions: "1 envase", calories: 100 }
      ]
    },
    totalDailyCalories: 812,
    notes: "Mantener horarios regulares de comida"
  },
  // ... more plans
]
```

#### Generated Meal Plan Structure
```javascript
// Generated from base plan for 1, 2, or 3 days
{
  basePlanId: "diabetes-plan-001",
  duration: 1 | 2 | 3, // days
  days: [
    {
      dayNumber: 1,
      date: ISO8601 string, // Optional: for planning ahead
      meals: {
        breakfast: { /* meal items */ },
        lunch: { /* meal items */ },
        dinner: { /* meal items */ },
        snacks: [ /* snack items */ ]
      },
      totalCalories: number
    },
    // ... more days if duration > 1
  ],
  generatedAt: ISO8601 string
}
```

### State Management

- **Session Component State**: For wizard step navigation, form inputs, and health metrics (deleted after use)
- **localStorage**: Only anonymous usage counter (no personal data)
- **No Global State Library Required**: Simple prop drilling or context API sufficient
- **Data Deletion**: Automatic cleanup of all health data after summary/diet generation

## Design Principles

### Accessibility-First Design
- Semantic HTML5 elements
- ARIA labels and roles where appropriate
- Focus management for keyboard navigation
- Skip links for main content
- Alt text for all images/icons

### Color Palette (High Contrast)
- **Background**: White (#FFFFFF) or very light gray (#F5F5F5)
- **Text**: Dark gray (#1A1A1A) or black (#000000)
- **Primary Actions**: High contrast blue (#0066CC) or dark blue (#003366)
- **Secondary Actions**: Medium gray (#666666)
- **Error States**: Dark red (#CC0000)
- **Success States**: Dark green (#006600)

### Typography
- **Body Text**: Minimum 18px (1.125rem)
- **Headings**: 24px (h3), 32px (h2), 40px (h1)
- **Line Height**: Minimum 1.5 for readability
- **Font Family**: Sans-serif, system fonts preferred (Arial, Helvetica, or system-ui)

### Layout
- **Max Content Width**: 800px for optimal readability
- **Padding**: Generous spacing (minimum 24px)
- **Button Size**: Minimum 44x44px touch targets
- **Input Fields**: Large, clearly labeled with visible borders

## Key Design Patterns

### Wizard Pattern
- Linear progression through steps
- Progress indicator
- Back/Next navigation
- Validation at each step
- Summary/review step before completion

### Session State Pattern
- Store data only in component state during wizard flow
- No persistent storage of health metrics
- Automatic data deletion after summary/diet generation
- Usage counter maintained separately in localStorage (anonymous)

### Home Screen Pattern
- Display main navigation options
- Prominent "Start Health Assessment" button (wizard)
- Clear "Browse Diet Plans" link for direct access
- Simple, uncluttered layout with large touch targets

### Diet Plan Browser Pattern
- Grid or list view of available plans
- Filter by medical condition or plan type
- Search functionality (optional)
- Plan preview cards with key information
- Direct selection without questionnaire requirement

### Meal Plan Generator Pattern
- Select base plan from predefined database
- Choose duration (1, 2, or 3 days)
- Generate daily meal breakdown
- Display day-by-day view with all meals
- Option to print or save generated plan

## Security Considerations

- **No External Data Transmission**: All processing client-side
- **XSS Prevention**: Sanitize any user inputs before display
- **No Persistent Health Data**: All health metrics deleted immediately after use
- **Anonymous Usage Only**: localStorage contains only usage counter, no personal data
- **Content Security Policy**: Implement CSP headers if hosting
- **Privacy by Design**: Data collection is anonymous and ephemeral

## Performance Considerations

- **Code Splitting**: Lazy load diet plans/recipes if large dataset
- **Minimal Dependencies**: Keep bundle size small
- **Efficient Rendering**: Use React.memo or Vue's computed properties
- **localStorage Optimization**: Batch reads/writes where possible

---

*This document is part of the GSD Protocol documentation structure.*
