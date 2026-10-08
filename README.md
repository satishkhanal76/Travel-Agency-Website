# Travel Agency Website

An interactive travel experience built with **HTML, CSS, and JavaScript**, featuring a responsive 3D globe, destination storytelling, scroll-driven animations, and data-driven content.

The project combines a geographic visualization with a traditional scrolling travel experience: as visitors move through the destinations, the globe focuses on the corresponding location and the page reveals its content with coordinated animations.

## ✨ Features

- 🌍 Interactive 3D Earth powered by **Globe.gl**
- 📍 Geographic destination markers and camera transitions
- 🗺️ Destination data loaded dynamically from CSV files
- 🎞️ Scroll-triggered animations using `IntersectionObserver`
- 📱 Responsive globe behavior for different screen sizes
- 🖼️ Lazy-loaded destination imagery with photography credits
- 🎨 Per-destination marker colors and transition configurations
- ⚡ Vite-powered development and production builds
- 📦 Static deployment support through `gh-pages`

## 🛠️ Tech Stack

- **HTML** — page structure
- **CSS** — layout, styling, and animations
- **JavaScript (ES Modules)** — application logic
- **Vite** — development server and build system
- **Globe.gl** — interactive 3D globe
- **Papa Parse** — CSV parsing
- **GitHub Pages** — deployment

## 🧭 How It Works

The homepage starts with an empty content container and initializes a Globe.gl instance. Destination information is then loaded from CSV files and transformed into sections dynamically.

Each destination contains information such as:

- Name and coordinates
- Title and description
- Destination imagery
- Marker color
- Animation configuration
- Camera transition configuration
- Photography attribution

As a destination section becomes visible, an `IntersectionObserver` triggers the corresponding animations and moves the globe toward that destination. After the transition, the globe returns to its resting altitude and resumes rotation.

This keeps the **content, geographic data, and animation configuration separate from the JavaScript that renders them**.

## 📂 Project Structure

```text
Travel-Agency-Website/
├── js/
│   ├── main.js
│   └── utils.js
├── public/
│   ├── assets/
│   ├── data/
│   │   ├── details.csv
│   │   └── transitions.csv
│   └── textures/
├── styles/
│   └── main.css
├── index.html
├── 404.html
├── package.json
└── vite.config.js
```

## 🚀 Getting Started

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Vite will provide a local development URL.

### Build for production

```bash
npm run build
```

### Deploy

The project also includes a deployment script for GitHub Pages:

```bash
npm run deploy
```

## 🎯 Design Approach

A major goal of the project is to make the visual experience **data-driven rather than hard-coded**.

Destination information lives in CSV files, while transition definitions are stored separately. JavaScript combines these sources at runtime to determine:

1. What content to display
2. Where the destination is located
3. Which image to display
4. How the content should animate
5. How the globe should move when the destination becomes active

This makes adding or modifying destinations primarily a matter of changing the underlying data rather than rewriting the rendering logic.

## 📱 Responsive Behavior

The globe adjusts its camera altitude and scale according to the available viewport. Mobile layouts use different globe distances and scaling so that the visualization remains usable alongside the scrolling content.

The globe is also resized when the browser window changes dimensions.
