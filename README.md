# Rover CSS Library

Core CSS styles for the Rover interface. Extracted from the original `page.module.css` to be used as a standalone library.

## Installation

```bash
npm install rover
```

## Usage

Import the main entry point in your project:

```javascript
import 'rover/src/index.css';
```

Or import specific modules:

```javascript
import 'rover/src/variables.css';
import 'rover/src/components.css';
```

## Project Structure

- `src/variables.css`: Global CSS variables (Colors, Spacing, Shadows).
- `src/base.css`: Foundations and design tokens.
- `src/layout.css`: Shell and structural layout styles.
- `src/components.css`: Specific UI components (Buttons, Inputs, etc.).
- `src/overlays.css`: Popovers, tooltips, and feedback elements.
- `src/index.css`: Main bundle.
