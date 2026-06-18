# Full stack TODO web app

## Backend: FastAPI

TO BE ADDED SOON...

## Alpine.js & Axios Todo Frontend

A lightweight, modern single-page frontend built to consume a Todo REST API (provided by  **FastAPI**, see backend reference above). This section demonstrates state management using **Alpine.js** global stores coupled with **Axios** for asynchronous data fetching.

### 🚀 Features

* **Global State Management:** Uses `Alpine.store('todoStore')` wrapped safely in an `alpine:init` event listener to manage state globally, ensuring zero race conditions during initialization.

* **Asynchronous API Fetching:** Integrated with **Axios** to fetch data smoothly from `http://localhost:8000/api/v1/todos`.

* **Dynamic UI States:** Includes built-in handling for **Loading** states (smooth CSS pulse animations), **Error handling** (graceful backend failure warnings), and **Empty states** (when no todos exist).

* **Modern Utility Styling:** Styled with **Tailwind CSS** for a clean, fully responsive, and accessible card interface.

* **Multi-Page Scalability:** Architecture is primed for expansion—demonstrating how global stores can easily be modularized and persisted across multiple pages using browser storage (`localStorage`).

### 🛠️ Development with Vite

This project is bundled and served using **Vite**, ensuring blazing-fast Hot Module Replacement (HMR) and an optimized development experience.

#### 📦 Installation & Setup

1. **Once you have the repository ready (see Backend section), navigate into it:**

```bash
   cd frontend

   npm run dev
   ```

   Vite will spin up the frontend. Point your browser to: **`http://localhost:5173`**
