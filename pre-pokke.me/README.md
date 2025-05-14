# pre-pokke.me

[![Demo Preview](./video/demo.gif)](https://youtube.com/shorts/GVAZb_KICpc?feature=share)

A React Native app (Expo SDK 53) demonstrating integration with a custom Offerwall SDK and Google AdMob, supporting both Android and iOS. The project uses a local native module (`offerwall-sdk`) with native code in `android/` and `ios/` folders.

---

## Setup Steps

### 1. Prerequisites

- Node.js (LTS recommended)
- Yarn
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [EAS CLI](https://docs.expo.dev/eas-update/getting-started/)

### 2. Install dependencies

```sh
yarn install
```

### 3. Local SDK linking

This project depends on a local SDK at `../offerwall-sdk`. Ensure the SDK is present at that path (sibling to this project directory).

### 4. Metro bundler configuration

The `metro.config.js` is set up to watch and resolve the local SDK. No extra steps are needed unless you move the SDK.

### 5. TypeScript paths

`tsconfig.json` is configured to resolve `offerwall-sdk` imports to the local SDK source.

### 6. Running the app

- **Start the Expo dev server:**
  ```sh
  expo start
  ```
- **Using Expo Dev Client (recommended for native modules):**
  - Build a custom dev client:
    ```sh
    eas build --profile development --platform android
    # or
    eas build --profile development --platform ios
    ```
  - Install the built app on your device/emulator.
  - Use the QR code or URL from `expo start` to open the project in the custom client.

### 7. Building for production

- **Android/iOS builds:**
  ```sh
  eas build --profile production --platform android
  eas build --profile production --platform ios
  ```

---

## SDK Integration Summary

- **Offerwall SDK** is integrated as a local module (`../offerwall-sdk`), with native code in both `android/` and `ios/`.
- The SDK is autolinked via Expo config plugin and Metro bundler settings.
- Usage example (see `src/screens/offerwall.screen.tsx`):
  ```ts
  import { OfferwallSdk } from 'offerwall-sdk';
  OfferwallSdk.setAppKey('YOUR_APP_KEY', 'YOUR_HASH_KEY');
  await OfferwallSdk.openOfferwall();
  ```
- Events such as `onOfferwallInitialized`, `onOfferwallClosed`, and `onCampaignCompleted` are handled via listeners.

- **Google AdMob** is integrated using `react-native-google-mobile-ads` and configured in `app.json` for both platforms.

---

## Assumptions and Limitations

- **Assumptions:**
  - The local SDK (`../offerwall-sdk`) is available and built as needed.
  - You are using a custom Expo Dev Client for development, as required for native modules.
  - The project is not intended for pure managed Expo workflow (bare or custom dev client is required).

- **Limitations:**
  - No `android/` or `ios/` folders in this project; native code is in the SDK at `../offerwall-sdk/android` and `../offerwall-sdk/ios`.
  - The Offerwall SDK is a demo and may need further implementation for production use.
  - The project expects the SDK to be at a specific relative path; moving the SDK requires updating Metro and TypeScript configs.
  - The app is not configured for web.

---

## Project Structure

- `App.tsx` — Entry point, sets up navigation and safe area.
- `src/screens/offerwall.screen.tsx` — Main screen, demonstrates Offerwall and AdMob integration.
- `metro.config.js` — Custom Metro config for local SDK.
- `eas.json` — EAS build profiles for dev, preview, and production.
- `app.json` — Expo app configuration, plugins, and permissions.
- `../offerwall-sdk/` — Local SDK with native code in `android/` and `ios/`.

---

## Native Code

- **Android:** `../offerwall-sdk/android/`
- **iOS:** `../offerwall-sdk/ios/`

---

## Main Dependencies

- `expo`, `expo-dev-client`, `expo-build-properties`, `expo-tracking-transparency`
- `react-native-google-mobile-ads`
- `nativewind` (Tailwind CSS for React Native)
- `@react-navigation/native`, `@react-navigation/stack`

---

## About Me

<img src="https://media.licdn.com/dms/image/v2/C5603AQE21F8fvQsaqg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1658900860986?e=1748476800&v=beta&t=LOsjpyHDfPzCBs41rKwsLjBKVeKJ1FoXZ1kVU6S4r7k" alt="Profile picture" width="90" style="border-radius: 50%;" />


[**Raizal I.N. Pregnanta**](https://raizal.dev)

A passionate Software Engineer with extensive experience building web and mobile applications, as well as web scrapers. Skilled in TypeScript, React.js, Node.js, React Native, Python, Laravel, and a variety of other powerful libraries and frameworks.
