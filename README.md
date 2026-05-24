
# Mobile Application Development - Assignment 02

A functional React Native mobile application built using the **Expo** framework and **file-based routing (`expo-router`)**. This project fulfills the requirements for Assignment 02 by implementing user authentication, dynamic data fetching from a public API, state-managed click tracking, and a responsive card-view layout.

---

## 📌 Project Overview

This application is built based on the assigned domain corresponding to the last digit of the student index. 

### Key Features Implemented:
* **User Authentication System:** Secure and validated User Registration and Login forms utilizing React Hooks for state handling.
* **Dynamic Navigation:** Seamless page transitions using `expo-router`. Successfully passes the authenticated username to the Home screen top bar.
* **Public API Integration:** Fetching and rendering a live dataset displayed in a structured Card View containing images, titles, descriptions, and status tags.
* **Global State Management:** A persistent floating action button at the bottom of the screen tracking and displaying the total item clicks across the session.

---

## ⚙️ Tech Stack & Libraries

* **Framework:** [Expo](https://expo.dev/) (React Native)
* **Routing & Navigation:** `expo-router` (File-based routing)
* **State Management:** Context API / Zustand / Redux (for click-count tracking)
* **Form Handling:** React Hooks with native validation

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

## 📸 Screenshots

<img width="645" height="582" alt="Screenshot 2026-05-25 022010" src="https://github.com/user-attachments/assets/9993a78f-df8c-4d40-89ba-56e14d69944f" />

<img width="604" height="570" alt="Screenshot 2026-05-25 022051" src="https://github.com/user-attachments/assets/d87acb87-0781-4c01-9eff-f262d15eabf5" />

