// Reexport the native module. On web, it will be resolved to OfferwallSdkModule.web.ts
// and on native platforms to OfferwallSdkModule.ts
export { default as OfferwallSdk } from './OfferwallSdkModule';
export * from  './OfferwallSdk.types';
