## Birthday Greetings

**An immersive, JoJo-themed interactive birthday greeting platform** – featuring custom audio-visual effects, "Za Warudo" time stop mechanics, and personalized messages.

---

![Birthday Greetings](https://res.cloudinary.com/dynnapuco/image/upload/v1773569783/business_card_anding_001_cslvqi.png)

---

## About the Project

**Birthday Greetings** is a unique web application designed to deliver birthday wishes in an unforgettable way. Inspired by the iconic "JoJo's Bizarre Adventure" series, the project features Dio Brando and his legendary stand, "The World."

The application focuses on high-quality UX/UI, cinematic transitions, and synchronized audio effects. It serves as both a personalized gift and a demonstration of modern web technologies like React 19 and NestJS working together to create a seamless, interactive experience.

> [!NOTE]
> The **MVP** of this landing page was built from scratch in just **one day**. With additional refinements and polishing on the second day, the entire project was completed in a total of **two days**.

---

## Order a Greeting 🎁

You can order a similar personalized greeting by sending an email to: [andrii0383@gmail.com](mailto:andrii0383@gmail.com).

**What is needed for development:**

- Theme
- Text
- Photos
- Good mood

---

## Key Features

- 🎭 **Cinematic Opening** – A dramatic introduction to set the mood for the greeting.
- 🕒 **"Za Warudo" Time Stop** – A signature interactive effect that stops time on the site, accompanied by classic audio and visual distortion.
- 🔊 **Dynamic Audio System** – Synchronized background music and sound effects with a custom mute/unmute control.
- 📖 **Manga-Style Sections** – Visual storytelling inspired by anime and manga aesthetics.
- ✉️ **Greetings Engine** – Messages are dynamically fetched from the backend, allowing for easy updates and personalization.
- ⚡ **Modern UX** – Built with performance in mind using skeleton loading, smooth scrolling, and responsive layouts.

---

## Tech Stack

**Architecture**: Client ↔ Server ↔ Database

### Frontend

- **React 19** – Modern UI components and state management.
- **TypeScript** – Strict typing for reliability.
- **Redux Toolkit** – Efficient application state management.
- **Vite** – Fast development and build tool.
- **CSS Modules** – Scoped, maintainable styling.
- **React Loading Skeleton** – Polished loading states.

### Backend

- **NestJS** – Robust, scalable Node.js framework.
- **MongoDB (Mongoose)** – Flexible data storage for greetings.
- **Zod** – Schema-based validation for API and environment.

---

## Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/Sp1r1tual/birthday-greetings.git
```

### Server

### 2. Navigate to server directory

```bash
cd server
```

### 3. Install dependencies

```bash
yarn install
```

### 4. Configure environment variables

Copy `.env.example` to `.env` and fill in the values:

```dotenv
PORT=5000
CLIENT_URL=http://localhost:5173

# MongoDB connection string (local or Atlas)
DB_URL=mongodb://localhost:27017/birthday-greetings
```

### 5. Start the server

```bash
yarn dev
```

The server will be available at `http://localhost:5000`.

### Client

### 6. Create a new terminal and navigate to client directory

```bash
cd client
```

### 7. Install dependencies

```bash
yarn install
```

### 8. Configure environment variables

Copy `.env.example` to `.env` and fill in the values:

```dotenv
VITE_API_URL=http://localhost:5000
```

### 9. Start the client

```bash
yarn dev
```

The client will be available at `http://localhost:5173`.

---

## License

All rights reserved by the author.
If you plan to use, modify, or distribute this project, please contact the author for permission.
