# Math Island Adventure 🌴

Welcome to **Math Island Adventure**, a gamified learning platform designed to make elementary math education engaging and fun for students in grades 1-6.

## About The Project

Math Island Adventure transforms mathematics learning into an exciting journey through tropical islands. Each island represents different math concepts aligned with the Massachusetts Curriculum Framework, providing students with an interactive, game-based learning experience that adapts to their skill level.

## Tech Stack

- **Frontend:** React, Vite, TypeScript, Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **State Management:** TanStack Query, Zustand (planned)
- **Animations:** Framer Motion (planned)

## Features

- 🏝️ **Interactive World Map** - Explore themed islands representing different math domains
- 🎯 **Adaptive Learning** - Problems adjust to student skill levels
- ⭐ **Gamified Progress** - Earn stars, unlock achievements, and track progress
- 📚 **Standards-Aligned** - Content matched to Massachusetts math standards
- 🎨 **Engaging Visuals** - Beautiful, tropical-themed interface with animations

## Getting Started

### Prerequisites

- Node.js (v20+)
- npm or pnpm

### Installation

1. Clone the repository
   ```sh
   git clone <YOUR_GIT_URL>
   ```

2. Navigate to the project directory
   ```sh
   cd <YOUR_PROJECT_NAME>
   ```

3. Install dependencies
   ```sh
   npm install
   ```

4. Start the development server
   ```sh
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── game/          # Game-specific components
│   │   └── ui/            # Reusable UI components
│   ├── pages/             # Route pages
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   └── assets/            # Images and static assets
├── public/                # Public static files
└── index.html             # Entry HTML file
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

This project can be easily deployed using [Lovable](https://lovable.dev). Simply click on Share → Publish in your Lovable project.

Alternatively, you can deploy to any static hosting service (Vercel, Netlify, etc.) by running:

```sh
npm run build
```

## Roadmap

- [ ] Grade 1 content implementation
- [ ] Secure authentication system
- [ ] Progress tracking and analytics
- [ ] Interactive math tools (number lines, fraction bars)
- [ ] Daily missions and challenges
- [ ] Parent dashboard
- [ ] Multi-language support

## Contributing

This is an educational project. For suggestions or contributions, please open an issue or contact the project maintainer.

## License

This project is part of an educational initiative aligned with Massachusetts Curriculum Frameworks.

## Credits

**Made by: Amier Ibrahim**

---

Built with ❤️ using [Lovable](https://lovable.dev)
