# SilverHealth Companion - Requirements Specification

## Functional Requirements

### FR1: Health Metrics Collection
- **FR1.1**: Collect user weight (in kg or lbs) - anonymous collection
- **FR1.2**: Collect user height (in cm or inches) - anonymous collection
- **FR1.3**: Collect waist circumference (in cm or inches) - anonymous collection
- **FR1.4**: Collect medical conditions (diabetes, hypertension, etc.) via checkbox/multi-select - anonymous collection
- **FR1.5**: Data stored only in memory during wizard process (no persistent storage)
- **FR1.6**: All personal data automatically deleted after summary/diet plans are generated

### FR2: Wizard Interface
- **FR2.1**: Implement step-by-step wizard UI for data collection
- **FR2.2**: Display one question/metric per screen
- **FR2.3**: Provide clear "Next" and "Back" navigation buttons
- **FR2.4**: Show progress indicator (e.g., "Step 2 of 5")
- **FR2.5**: Validate input before allowing progression to next step
- **FR2.6**: Maintain data only in component state during wizard flow
- **FR2.7**: Include option to skip wizard and go directly to diet plans from main screen

### FR3: Doctor Summary Generation
- **FR3.1**: Generate a printable/downloadable summary document
- **FR3.2**: Include all collected health metrics in organized format
- **FR3.3**: Include listed medical conditions
- **FR3.4**: Format summary in clear, readable layout
- **FR3.5**: Include disclaimer that summary is non-medical and informational only
- **FR3.6**: Automatically delete all collected data from memory after summary generation

### FR4: Diet Plans & Recipes
- **FR4.1**: Suggest diet plans based on user's medical conditions (from wizard)
- **FR4.2**: Provide recipe recommendations aligned with conditions
- **FR4.3**: Display dietary suggestions in accessible format
- **FR4.4**: Include general nutrition guidance (not medical advice)
- **FR4.5**: Automatically delete all collected data from memory after diet plans are displayed
- **FR4.6**: Display diet plans as daily meal plans (breakfast, lunch, dinner, snacks)
- **FR4.7**: Allow generation of custom meal plans for 1, 2, or 3 days based on existing plans
- **FR4.8**: Store predefined diet plans in static database (JSON/data files)

### FR5: Direct Diet Plan Access (Without Questionnaire)
- **FR5.1**: Provide link on main/home screen to access diet plans without completing questionnaire
- **FR5.2**: Display available predefined diet plans for browsing
- **FR5.3**: Allow users to select and view any diet plan directly
- **FR5.4**: Support filtering/browsing by condition or plan type
- **FR5.5**: Generate custom 1, 2, or 3-day meal plans from selected base plans
- **FR5.6**: Display generated meal plans in daily format (day-by-day breakdown)

### FR6: Usage Tracking
- **FR6.1**: Maintain anonymous usage counter in localStorage
- **FR6.2**: Increment counter each time a summary/diet plan is generated
- **FR6.3**: Counter contains no personal information or identifiers
- **FR6.4**: Counter persists across sessions for analytics purposes only

## Non-Functional Requirements

### NFR1: Accessibility (WCAG AAA)
- **NFR1.1**: Minimum font size of 18px for body text
- **NFR1.2**: High contrast ratio (minimum 7:1 for normal text, 4.5:1 for large text)
- **NFR1.3**: Keyboard navigation support for all interactive elements
- **NFR1.4**: Screen reader compatibility (ARIA labels, semantic HTML)
- **NFR1.5**: Focus indicators visible and clear
- **NFR1.6**: Color not used as sole indicator of information

### NFR2: Privacy & Data Storage
- **NFR2.1**: All health data collected anonymously and stored only in memory (session state)
- **NFR2.2**: No personal data persisted - all health metrics deleted immediately after generating summary/diet plans
- **NFR2.3**: No data transmitted to external servers
- **NFR2.4**: No third-party analytics or tracking
- **NFR2.5**: Only anonymous usage counter stored in localStorage (no personal identifiers)
- **NFR2.6**: Clear privacy policy explaining anonymous collection and automatic data deletion

### NFR3: User Experience
- **NFR3.1**: Simple, intuitive interface requiring minimal learning
- **NFR3.2**: Reassuring and friendly tone in all text/copy
- **NFR3.3**: Large, easily clickable buttons (minimum 44x44px touch targets)
- **NFR3.4**: Clear error messages and validation feedback
- **NFR3.5**: Responsive design for various screen sizes

### NFR4: Performance
- **NFR4.1**: Fast page load times (< 2 seconds on standard connection)
- **NFR4.2**: Smooth transitions between wizard steps
- **NFR4.3**: Efficient localStorage operations

## Technical Constraints

- **TC1**: Web-based application (no native app requirements)
- **TC2**: Must work in modern browsers (Chrome, Firefox, Safari, Edge)
- **TC3**: No backend server required (static hosting sufficient)
- **TC4**: No external API dependencies for core functionality

## Out of Scope

- Medical diagnosis or treatment recommendations
- Integration with health devices or wearables
- Cloud synchronization or multi-device access
- User accounts or authentication
- Social features or sharing capabilities

---

*This document is part of the GSD Protocol documentation structure.*
