
# Mobile Application Development - Assignment 02

[cite_start]A functional React Native mobile application built using the **Expo** framework and **file-based routing (`expo-router`)**[cite: 2, 11]. [cite_start]This project fulfills the requirements for Assignment 02 by implementing user authentication, dynamic data fetching from a public API, state-managed click tracking, and a responsive card-view layout[cite: 6, 7, 14, 15, 20, 21].

---

## 📌 Project Overview

[cite_start]This application is built based on the assigned domain corresponding to the last digit of the student index[cite: 3]. 

### Key Features Implemented:
* [cite_start]**User Authentication System:** Secure and validated User Registration and Login forms utilizing React Hooks for state handling[cite: 7, 8, 9, 10].
* [cite_start]**Dynamic Navigation:** Seamless page transitions using `expo-router`[cite: 11, 12]. [cite_start]Successfully passes the authenticated username to the Home screen top bar[cite: 13].
* [cite_start]**Public API Integration:** Fetching and rendering a live dataset displayed in a structured Card View containing images, titles, descriptions, and status tags[cite: 14, 15].
* [cite_start]**Global State Management:** A persistent floating action button at the bottom of the screen tracking and displaying the total item clicks across the session[cite: 20, 21].

---

## ⚙️ Tech Stack & Libraries

* [cite_start]**Framework:** [Expo](https://expo.dev/) (React Native) [cite: 2]
* [cite_start]**Routing & Navigation:** `expo-router` (File-based routing) [cite: 11]
* [cite_start]**State Management:** Context API / Zustand / Redux (for click-count tracking) [cite: 21]
* [cite_start]**Form Handling:** React Hooks with native validation [cite: 10]

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Installation
Clone the repository and install the project dependencies:

```bash
npm install

```

### 3. Running the Application

Start the Expo development server:

```bash
npx expo start

```

Once the server is running, you can open the application via:

* **Android Emulator:** Press `a` in the terminal or configure via Android Studio.
* **iOS Simulator:** Press `i` in the terminal (macOS required).
* **Expo Go App:** Scan the QR code printed in the terminal using your physical mobile device.

---

## 📁 Directory Structure

The core codebase is organized within the `app` directory utilizing Expo's file-based routing architecture:

```text
app/
├── index.tsx          - Initial route (Redirects to Login/Registration)
├── (auth)/
│   ├── login.tsx      - Authenticated Login Form with Validation
│   └── register.tsx   - User Registration Form with Validation
├── (tabs)/
│   └── home.tsx       - Main Item List Home Page (Fetches Public API)
└── _layout.tsx        - Global Layout Provider & State Context

```

---

## 📝 Deliverables Checklist

* [x] Public GitHub Repository Link 


* [x] Screenshots of all implemented pages (Login, Registration, Home Screen with Username and Floating Button) 


* [x] Screen-recorded video demonstration (Under 2 minutes) 


<img width="604" height="570" alt="Screenshot 2026-05-25 022051" src="https://github.com/user-attachments/assets/9a651c77-8b31-44a7-8cc8-c3e0c199e798" />

<img width="645" height="582" alt="Screenshot 2026-05-25 022010" src="https://github.com/user-attachments/assets/1a362cac-8566-4a58-bfe4-c3ea7bf4c0db" />

