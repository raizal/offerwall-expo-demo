import type { StyleProp, ViewStyle } from 'react-native';

export type OnLoadEventPayload = {
  url: string;
};

export type OfferwallSdkModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
};

export type ChangeEventPayload = {
  value: string;
};

export type OfferwallSdkViewProps = {
  url: string;
  onLoad: (event: { nativeEvent: OnLoadEventPayload }) => void;
  style?: StyleProp<ViewStyle>;
};

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
export interface OfferwallModule {
  setAppKey(appKey: string, hashKey: string): void;
  openOfferwall(): Promise<void>;
}
