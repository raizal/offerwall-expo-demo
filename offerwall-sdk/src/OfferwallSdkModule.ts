import { NativeModule, requireNativeModule } from 'expo';

import { OfferwallModuleEvents } from './OfferwallSdk.types';

declare class OfferwallSdkModule extends NativeModule<OfferwallModuleEvents> {
  setAppKey(appKey: string, hashKey: string): void;
  openOfferwall(): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<OfferwallSdkModule>('OfferwallSdk');
