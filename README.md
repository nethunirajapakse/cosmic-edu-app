
<!--# Mobile Application Development - Assignment

A functional React Native mobile application built using the **Expo** framework and **file-based routing (`expo-router`)**. This project fulfills the requirements for Assignment 02 by implementing user authentication, dynamic data fetching from a public API, state-managed click tracking, and a responsive card-view layout.-->

# CosmoPulse

## 📌 Key Features Implemented:
* **User Authentication System:** Secure and validated User Registration and Login forms utilizing React Hooks for state handling.
* **Dynamic Navigation:** Seamless page transitions using `expo-router`. Successfully passes the authenticated username to the Home screen top bar.
* **Public API Integration:** Fetching and rendering a live dataset displayed in a structured Card View containing images, titles, descriptions, and status tags.
* **Global State Management:** A persistent floating action button at the bottom of the screen tracking and displaying the total item clicks across the session.

---

## App Preview

<p align="center">
  <img width="30%" src="https://github.com/user-attachments/assets/934eadb0-5d88-4bdc-bdd8-35612e3e4b42" alt="App Screenshot 1" style="margin-right: 10px;" />
  <img width="30%" src="https://github.com/user-attachments/assets/6c28b2ca-b17e-4ba4-9e25-c90110b688c6" alt="App Screenshot 2" style="margin-right: 10px;" />
  <img width="30%" src="https://github.com/user-attachments/assets/e8d2567a-c9f1-48e7-bff0-5ac1e0ef1e6b" alt="App Screenshot 3" />
</p>


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

