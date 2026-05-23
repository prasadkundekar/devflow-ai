# DevFlow AI

<p align="center">
  <strong>A modern, interactive developer workspace — built as a SaaS-style dashboard UI.</strong>
</p>

<p align="center">
  <a href="https://github.com/prasadkundekar/devflow-ai">
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React" />
  </a>
  <a href="https://github.com/prasadkundekar/devflow-ai">
    <img src="https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  </a>
  <a href="https://github.com/prasadkundekar/devflow-ai">
    <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  </a>
  <a href="https://github.com/prasadkundekar/devflow-ai">
    <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  </a>
  <a href="https://github.com/prasadkundekar/devflow-ai/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" />
  </a>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Structure</a> •
  <a href="#roadmap">Roadmap</a>
</p>

---

## Overview

**DevFlow AI** is a fully client-side developer dashboard that combines task management, notes, code snippets, analytics, and an AI assistant in a single polished interface. It demonstrates modern frontend patterns—glassmorphism UI, drag-and-drop Kanban, persistent local state, and responsive layout—without requiring a backend.

Ideal for portfolios, UI/UX showcases, or as a starter shell for a real SaaS product.

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active%20Development-7c5cff?style=for-the-badge" alt="Status" />
</p>

---

## Features

### Dashboard
- Welcome hero with gradient accents and live workspace stats
- Activity feed and personalized AI suggestion panel
- Multi-project progress tracker (EV system, RAG pipeline, Flask JWT)

### Kanban Board
- Three columns: **Backlog**, **In Progress**, **Done**
- Drag-and-drop task cards with priority indicators, tags, and due dates
- Create new tasks via modal form
- Progress bars on active tasks

### Notes Workspace
- Card grid with accent-colored borders and tag chips
- Full create / edit / delete flow with modal editor
- Content previews with line clamping

### Code Snippets
- Dracula-inspired syntax highlighting
- One-click copy with toast feedback
- Filter by language tags (Python, TypeScript, Flask, and more)

### AI Assistant
- Chat interface with typing indicator
- Suggested prompt chips for common dev topics (FAISS, hooks, RAG, JWT)
- Conversation history persisted in the browser

### Analytics
- Weekly activity bar chart
- Task category breakdown
- GitHub-style contribution heatmap

### Settings & Personalization
- Profile name and email (persisted)
- Accent color themes (purple, blue, cyan, pink, green)
- Toggle AI features and dashboard suggestions
- Workspace reset (danger zone)

### Persistence
All core data is stored in **localStorage**—tasks, notes, settings, and chat history survive page refresh with no server required.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [React 19](https://react.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Build tool | [Vite 8](https://vite.dev/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Drag & drop | [@dnd-kit](https://dndkit.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Fonts | DM Sans, DM Mono (Google Fonts) |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (20+ recommended)
- npm, pnpm, or yarn

### Installation

```bash
git clone https://github.com/prasadkundekar/devflow-ai.git
cd devflow-ai
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production build

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

The static output is generated in the `dist/` folder—ready to deploy on Vercel, Netlify, GitHub Pages, or any static host.

### Lint

```bash
npm run lint
```

---

## Project Structure

```
devflow-ai/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── layout/         # Sidebar, shell layout
│   │   ├── sections/       # Dashboard, Tasks, Notes, etc.
│   │   ├── tasks/          # Task creation modal
│   │   └── ui/             # Modal, Toast, Toggle
│   ├── context/            # Global app state & persistence
│   ├── data/               # Mock seed data
│   ├── hooks/              # useLocalStorage
│   ├── lib/                # Storage keys & utilities
│   ├── App.tsx
│   ├── index.css           # Theme, glass effects, animations
│   └── types.ts
├── index.html
├── vite.config.ts
└── package.json
```

---

## Design Highlights

- **Glassmorphism** cards with gradient borders and backdrop blur
- **Purple / blue** accent system with user-selectable themes
- **Hover lift** micro-interactions and pulse animations on AI nav
- **Toast notifications** for copy, moves, saves, and resets
- **Dark-first** UI optimized for long coding sessions

---

## Roadmap

- [x] Edit and delete tasks from the Kanban board
- [x] Add and manage custom code snippets
- [x] Analytics driven by real task activity
- [ ] Optional backend API (auth, sync across devices)
- [ ] Live demo deployment (Vercel / Netlify)

---

## Contributing

Contributions are welcome. Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Author

**Prasad Kundekar**

- GitHub: [@prasadkundekar](https://github.com/prasadkundekar)
- Repository: [github.com/prasadkundekar/devflow-ai](https://github.com/prasadkundekar/devflow-ai)

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  If this project helped you, consider giving it a ⭐ on GitHub.
</p>
