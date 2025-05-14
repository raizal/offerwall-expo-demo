# Offerwall Expo Module

A native bridge module for integrating an Offerwall into your React Native or Expo app. This module provides a simple API to display a fullscreen offerwall modal and receive events when the offerwall is closed or a campaign is completed.

## What is Offerwall?

An Offerwall is a fullscreen modal that presents users with offers or ads. Users can interact with these offers to earn rewards. This module provides a demo implementation that shows a fullscreen modal with the text "Offerwall Demo" for 1 second, then fires events to JavaScript.

## Installation

### For Managed Expo Projects

Follow the [Expo documentation for the Offerwall module](https://docs.expo.dev/versions/latest/sdk/offerwall/). If documentation is not available, this module may not yet be supported in managed projects.

### For Bare React Native Projects

1. Ensure you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/).
2. Add the package to your dependencies:

```sh
npm install offerwall
```

3. For iOS, run:

```sh
npx pod-install
```

## Usage (TypeScript)

> All examples below use TypeScript. This module provides full TypeScript support out of the box.

### Import and Initialize

```ts
import {OfferwallSdk} from 'offerwall';

// Set your app key and hash key (required before opening the offerwall)
OfferwallSdk.setAppKey('YOUR_APP_KEY', 'YOUR_HASH_KEY');
```

### Open the OfferwallSdk

```ts
await OfferwallSdk.openOfferwall();
```

This will display a fullscreen modal with the text "OfferwallSdk Demo" for 1 second.

### Listen for Events

You can subscribe to events using the Expo event system or your preferred event handler:

```ts
// Listen for events using addListener
const initializedListener = OfferwallSdk.addListener('onOfferwallInitialized', () => {
  console.log('OfferwallSdk was initialized');
});

const closedListener = OfferwallSdk.addListener('onOfferwallClosed', () => {
  console.log('OfferwallSdk was closed');
});

const completedListener = OfferwallSdk.addListener('onCampaignCompleted', (event) => {
  console.log('Campaign completed:', event.campaignId, event.reward);
});

// Remember to remove listeners when no longer needed:
// initializedListener.remove();
// closedListener.remove();
// completedListener.remove();
```

#### Event Types
- `onOfferwallInitialized`: Called when the offerwall is initialized (after setAppKey is called).
- `onOfferwallClosed`: Called when the offerwall modal is closed.
- `onCampaignCompleted`: Called when a campaign is completed. Payload: `{ campaignId: string, reward: number }`

## TypeScript Declarations

The module provides full TypeScript support. Here are the main types:

```ts
// Event payload for campaign completion
export type CampaignCompletedPayload = {
  campaignId: string;
  reward: number;
};

// Event map for Offerwall events
export type OfferwallModuleEvents = {
  onOfferwallInitialized: () => void;
  onOfferwallClosed: () => void;
  onCampaignCompleted: (params: CampaignCompletedPayload) => void;
};

// Main Offerwall API
interface OfferwallModule {
  setAppKey(appKey: string, hashKey: string): void;
  openOfferwall(): Promise<void>;
}
```

## API

- `setAppKey(appKey: string, hashKey: string): void` — Set your app and hash keys before opening the offerwall.
- `openOfferwall(): Promise<void>` — Show the offerwall modal.

## Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide](https://github.com/expo/expo#contributing).