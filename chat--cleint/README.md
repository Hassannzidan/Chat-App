# Chat Client

A real-time chat application built with React and Socket.IO. Join rooms by name and Room ID, send messages instantly, and see when others are typing—all with a clean, modern interface.

---

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Usage](#usage)
- [Scripts](#scripts)
- [Backend](#backend)
- [License](#license)

---

## Features

- **Room-based chat** — Join any room with a Room ID; everyone in the same room sees the same messages.
- **Real-time messaging** — Messages are delivered instantly via WebSockets (Socket.IO).
- **Typing indicators** — See when someone in the room is typing (with debouncing).
- **Consistent author colors** — Each participant gets a stable color so messages are easy to follow.
- **Responsive UI** — Join form and chat layout work on different screen sizes.
- **Keyboard shortcuts** — Press **Enter** to join a room or send a message.

---

## Screenshots

| Join screen | Chat room |
|-------------|-----------|
| Enter your name and Room ID to join. | Messages, typing indicators, and leave option. |

*(Add your own screenshots here by placing images in a `/docs` or `/screenshots` folder and linking them.)*

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **UI** | React 19, JSX |
| **Build** | Vite 8 |
| **Real-time** | Socket.IO Client |
| **Styling** | CSS (App.css, Chat.css) |
| **Lint** | ESLint (React Hooks, React Refresh) |

---

## Project Structure

```
chat--cleint/
├── index.html          # HTML entry
├── package.json
├── vite.config.js      # Vite config (if present)
├── src/
│   ├── main.jsx        # React entry, mounts App
│   ├── App.jsx         # Join form, socket connection, room state
│   ├── App.css         # Global & join-screen styles
│   ├── Chat.jsx        # Chat UI: messages, typing, send
│   └── Chat.css        # Chat layout & message styles
└── README.md
```

---

## Prerequisites

- **Node.js** (v18 or later recommended)
- **npm** or **yarn**
- The **Chat App Backend** running (see [Backend](#backend))

---

## Getting Started

### 1. Install dependencies

```bash
cd chat--cleint
npm install
```

### 2. Start the backend

From the project root:

```bash
cd Backend
npm install
npm start
```

The server should run on **port 3001** (or the port configured in the backend).

### 3. Start the client

In a separate terminal:

```bash
cd chat--cleint
npm run dev
```

The app will be available at **http://localhost:5173** (or the port Vite prints).

### 4. Use the app

1. Open http://localhost:5173 in your browser.
2. Enter your **name** and a **Room ID** (e.g. `general`).
3. Click **Join room** (or press Enter).
4. Send messages; open another tab/window with the same Room ID to see real-time updates and typing indicators.

---

## Configuration

- **Backend URL** — The client connects to the Socket.IO server in `App.jsx`:

  ```js
  const socket = io.connect("http://localhost:3001");
  ```

  Change this URL if your backend runs on a different host or port (e.g. in production).

- **Port** — Vite’s dev server port is set in `vite.config.js` or via:

  ```bash
  npm run dev -- --port 3000
  ```

---

## Usage

- **Join:** Fill in “Your name” and “Room ID”, then click **Join room** or press Enter.
- **Send message:** Type in the input and click the send button or press Enter.
- **Leave:** Click **Leave room** in the chat header to return to the join screen.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server (HMR) |
| `npm run build` | Production build (output in `dist/`) |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

---

## Backend

This client is designed to work with the **Chat App Backend** in the `Backend` folder of this repo. It expects:

- **Socket.IO** server (e.g. on port **3001**).
- **CORS** allowing the client origin (e.g. `http://localhost:5173`).
- Events: `join_room`, `send_message`, `receive_message`, `typing`, `stop_typing`, `user_typing`, `user_stop_typing`.

See the Backend’s README (if present) or `Backend/index.js` for server setup and event handling.

---

## License

This project is private. Use and modification are at your discretion.
