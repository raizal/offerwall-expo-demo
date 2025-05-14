import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {OfferwallSdk} from 'offerwall-sdk';
import { StatusBar, Text, View } from 'react-native';
import mobileAds, { AdEventType, RewardedAdEventType, RewardedAdReward } from 'react-native-google-mobile-ads';
import { RewardedAd, TestIds } from 'react-native-google-mobile-ads';

import { Button } from '../components/Button';
import { RootStackParamList } from '../navigation';
import { FlatList } from 'react-native-gesture-handler';

// type OfferwallScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Offerwall'>;

const adUnitId = TestIds.REWARDED;

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing'],
});

export default function OfferwallScreen() {
  const [logs, setLogs] = useState<string[]>([]);
  const [sdkStatus, setSdkStatus] = useState<string>('Initializing...');
  const [isAdReady, setIsAdReady] = useState(false);
  const [isOfferwallInitialized, setIsOfferwallInitialized] = useState(false);

  // Set app key and hash key on mount
  useEffect(() => {
    console.log('setting app key and hash key');
    OfferwallSdk.setAppKey('testing', 'hash');
  }, []);

  // Listen for Offerwall events
  useEffect(() => {
    const initializedListener = OfferwallSdk.addListener('onOfferwallInitialized', () => {
      setIsOfferwallInitialized(true);
      setLogs(log => [
        `${new Date().toLocaleString()} - OfferwallSDK: Offerwall is initialized`,
        ...log,
      ]);
    });
    const closedListener = OfferwallSdk.addListener('onOfferwallClosed', () => {
      setLogs(log => [
        `${new Date().toLocaleString()} - OfferwallSDK: Offerwall was closed`,
        ...log,
      ]);
    });
    const completedListener = OfferwallSdk.addListener('onCampaignCompleted', (event) => {
      setLogs(log => [
        `${new Date().toLocaleString()} - OfferwallSDK: Campaign completed: ${event.campaignId}, reward: ${event.reward}`,
        ...log,
      ]);
    });
    return () => {
      initializedListener.remove();
      closedListener.remove();
      completedListener.remove();
    };
  }, []);

  const openOfferwall = useCallback(async () => {
    await OfferwallSdk.openOfferwall();
  }, []);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventsListener((event) => {
      console.log(event);
      switch (event.type) {
        case RewardedAdEventType.LOADED:
          setIsAdReady(true);
          setLogs((logs) => [`${new Date().toLocaleString()} - AdMob: Ad loaded`, ...logs]);
          break;
        case RewardedAdEventType.EARNED_REWARD:
          const reward = event.payload as RewardedAdReward;
          setLogs((logs) => [`${new Date().toLocaleString()} - AdMob: User earned reward of ${reward.amount} ${reward.type}`, ...logs]);
          break;
        case AdEventType.CLOSED:
          setIsAdReady(false);
          setLogs((logs) => [`${new Date().toLocaleString()} - AdMob: Ad closed`, ...logs]);
          rewarded.load();
          break;
        case AdEventType.ERROR:
          setLogs((logs) => [`${new Date().toLocaleString()} - AdMob: Ad error: ${event.payload}`, ...logs]);
          break;
        case AdEventType.PAID:
          setLogs((logs) => [`${new Date().toLocaleString()} - AdMob: Ad paid`, ...logs]);
          break;
        case AdEventType.OPENED:
          setLogs((logs) => [`${new Date().toLocaleString()} - AdMob: Ad opened`, ...logs]);
          break;
        case AdEventType.CLICKED:
          setLogs((logs) => [`${new Date().toLocaleString()} - AdMob: Ad clicked`, ...logs]);
          break;
        case AdEventType.LOADED:
          setLogs((logs) => [`${new Date().toLocaleString()} - AdMob: Ad loaded`, ...logs]);
          break;
      }
    });

    setLogs((logs) => [`${new Date().toLocaleString()} - AdMob: Initializing...`, ...logs]);
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        if (adapterStatuses.length > 0 && adapterStatuses[0].state === 1) {
          setLogs((logs) => [`${new Date().toLocaleString()} - AdMob: SDK initialized`, ...logs]);
          setSdkStatus('Initialized');
          rewarded.load();
        } else {
          setLogs((logs) => [`${new Date().toLocaleString()} - AdMob: SDK not initialized`, ...logs]);
          setSdkStatus(`Error: ${adapterStatuses[0].description}`);
        }
      })
      .catch(error => {
        setSdkStatus(error.toString());
      });

    return () => {
      unsubscribeLoaded();
    }
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View className="flex flex-1 p-6">
        <View className='flex flex-row justify-between flex-1'>
          <View className="flex flex-1 items-center justify-center flex-col">
            <Text className="text-lg font-medium pb-2 pt-12 break-words text-center">GOOGLE ADMOB SDK STATUS:</Text>
            <Text className="text-md pb-10">{sdkStatus}</Text>
            <Button
              disabled={sdkStatus !== 'Initialized' || !isAdReady}
              className={` ${sdkStatus !== 'Initialized' || !isAdReady ? 'bg-gray-600' : 'bg-indigo-500'}`}
              onPress={() => {
                rewarded.show();
              }}
              title="Load Offerwall"
            />
          </View>
          <View className="flex flex-1 items-center justify-center flex-col">
            <Text className="text-lg font-medium pb-2 pt-12 break-words text-center">OFFERWALL SDK STATUS:</Text>
            <Text className="text-md pb-10">{isOfferwallInitialized ? 'Initialized' : 'Not Initialized'}</Text>
            <Button
              disabled={!isOfferwallInitialized}
              className={`${!isOfferwallInitialized ? 'bg-gray-600' : 'bg-indigo-500'}`}
              onPress={openOfferwall}
              title="Load Offerwall"
            />
          </View>
        </View>
        <Text className="text-lg font-medium pb-2">Logs :</Text>
        <FlatList
          className='flex-1 w-full'
          contentContainerStyle={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            paddingHorizontal: 8,
          }}
          data={logs}
          renderItem={({ item }) => (
            <Text key={item} className={`${styles.logText}`}>{item}</Text>
          )}
        />
      </View>
    </>
  );
}

const styles = {
  logText: 'text-md pb-3 leading-6',
}