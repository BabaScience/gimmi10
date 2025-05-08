# Gimmi10

Gimmi10 is a React Native mobile application that gamifies pushup competitions among friends, groups, and communities. It uses computer vision to count pushups in real-time via the device's camera, fostering social engagement, competition, and fitness tracking.

## Features
- Real-time pushup counting using your device's camera (TensorFlow/pose estimation)
- Daily, weekly, monthly, and all-time leaderboards
- Friend, group, and community challenges
- Analytics dashboard with charts and streaks
- Milestone badges and rewards
- Multi-tier subscription model (Free, Basic, Pro, Elite)
- Referral program for user growth

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/):
  ```sh
  npm install -g expo-cli
  ```

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/gimmi10.git
   cd gimmi10
   ```
2. Install dependencies:
   ```sh
   yarn install
   # or
   npm install
   ```

### Running the App
- Start the Expo development server:
  ```sh
  yarn dev
  # or
  npm run dev
  ```
- Use the Expo Go app on your phone, or an emulator/simulator, to run the app.

## Project Structure
- `app/` — Main app screens and navigation
- `components/` — Reusable UI components
- `constants/` — Theme and global styles
- `assets/` — Images and static files
- `types/` — TypeScript types

## Technologies
- React Native (Expo)
- TypeScript
- TensorFlow.js (for pose detection)
- Expo Camera
- React Navigation

## License
MIT

---

> See `spec.md` for the full product specification and feature roadmap. 