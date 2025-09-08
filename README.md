# 🚀 Welcome to Your Expo App 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

Follow the instructions below to run the app locally **and share it with others** (including iPhone users via Expo Go).

---

## 📦 Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npx expo start
   ```
   This will open Expo Developer Tools in your browser.

---

## 📱 Run the App

You’ll see multiple options in the Dev Tools. The most common are:

- **Expo Go (iOS & Android phones)** – easiest way to preview the app.
- **Android Emulator** – requires Android Studio.
- **iOS Simulator** – requires macOS + Xcode.
- **Web Browser** – run in your browser.

---

### ▶️ For iPhone (Expo Go)

1. On your iPhone, install **Expo Go** from the [App Store](https://expo.dev/go).
2. Make sure you’re on the same Wi-Fi network as the computer running Expo.
3. In the Expo Dev Tools (or terminal), a **QR code** will appear.
4. Open **Expo Go** on your iPhone → tap **Scan QR Code** → scan the code.
5. The app will load instantly on your device.

💡 If your partner is remote or on a different Wi-Fi:

- Start the project with **tunnel mode**:
  ```bash
  npx expo start --tunnel
  ```
- Share the QR code or link (`exp://...`) with them.  
  They can open it directly in Expo Go on iPhone.

---

### ▶️ On Android (Expo Go)

1. Install **Expo Go** from Google Play.
2. Scan the QR code from the terminal/Dev Tools.
3. App loads instantly.

---

### ▶️ On Web

To preview the app in your browser:

```bash
npx expo start --web
```

---

## 🔄 Live Reload

- Any code changes you make will **auto-refresh** in Expo Go or the browser.
- If it doesn’t reload:
  - Press **r** in your terminal to refresh manually.
  - Or shake your phone → tap **Reload** in Expo Go.

---

## 🧹 Reset Project

Want to start fresh? Run:

```bash
npm run reset-project
```

This moves the starter code into `app-example/` and gives you a blank `app/` folder.

---

## 📚 Learn More

- [Expo documentation](https://docs.expo.dev/) – everything about Expo
- [Expo Router](https://docs.expo.dev/router/introduction/) – routing system used in this project
- [Expo Community](https://chat.expo.dev) – ask questions & get help

---

✅ With this setup, your partner can simply install **Expo Go** on iPhone, scan the QR, and preview the app instantly.
