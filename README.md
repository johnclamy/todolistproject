# Full stack TODO web app

## Backend: FastAPI

## Alpine.js & Axios Todo Frontend

A lightweight, modern single-page frontend built to consume a Todo REST API (provided by  **FastAPI**, see backend reference above). This project demonstrates state management using **Alpine.js** global stores coupled with **Axios** for asynchronous data fetching.

### 🚀 Features

* **Global State Management:** Uses `Alpine.store('todoStore')` wrapped safely in an `alpine:init` event listener to manage state globally, ensuring zero race conditions during initialization.

* **Asynchronous API Fetching:** Integrated with **Axios** to fetch data smoothly from `http://localhost:8000/api/v1/todos`.

* **Dynamic UI States:** Includes built-in handling for **Loading** states (smooth CSS pulse animations), **Error handling** (graceful backend failure warnings), and **Empty states** (when no todos exist).

* **Modern Utility Styling:** Styled with **Tailwind CSS** for a clean, fully responsive, and accessible card interface.

* **Multi-Page Scalability:** Architecture is primed for expansion—demonstrating how global stores can easily be modularized and persisted across multiple pages using browser storage (`localStorage`).

### 📦 Prerequisites

Ensure you have a backend server running locally on port 8000 (see backend section) that exposes the following endpoint:

* `GET http://localhost:8000/api/v1/todos`
