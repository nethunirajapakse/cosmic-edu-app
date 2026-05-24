
# Mobile Application Development - Assignment

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

## 🔌 API Reference

This application integrates with the **NASA Open APIs** to fetch real-time, public space data. The fetched dataset is dynamically rendered into the home screen's list view, showcasing imagery and descriptions directly from NASA's repositories.

* **API Provider:** [NASA Open APIs](https://api.nasa.gov/)
* **Data Fetched:** APOD (Astronomy Picture of the Day) / Media assets containing titles, dates, high-resolution imagery, and background descriptions.

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

## 📸 Screenshots
<img width="604" height="570" alt="Screenshot 2026-05-25 022051" src="https://github.com/user-attachments/assets/5b2b9824-79ae-4314-844c-8c9b6bec1987" />
<img width="645" height="582" alt="Screenshot 2026-05-25 022010" src="https://github.com/user-attachments/assets/08dc1379-6eed-4247-9a75-8b0b80db72e4" />
