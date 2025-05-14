import React, { useCallback, useEffect, useState } from 'react';
import OfferwallSdk from 'offerwall-sdk';
import { Button, SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function App() {
  const [eventLog, setEventLog] = useState<string[]>([]);

  // Set app key and hash key on mount
  useEffect(() => {
    OfferwallSdk.setAppKey('YOUR_APP_KEY', 'YOUR_HASH_KEY');
  }, []);

  // Listen for Offerwall events
  useEffect(() => {
    const closedListener = OfferwallSdk.addListener('onOfferwallClosed', () => {
      setEventLog(log => [
        'Offerwall was closed',
        ...log,
      ]);
    });
    const completedListener = OfferwallSdk.addListener('onCampaignCompleted', (event) => {
      setEventLog(log => [
        `Campaign completed: ${event.campaignId}, reward: ${event.reward}`,
        ...log,
      ]);
    });
    return () => {
      closedListener.remove();
      completedListener.remove();
    };
  }, []);

  const openOfferwall = useCallback(async () => {
    await OfferwallSdk.openOfferwall();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Offerwall Example</Text>
        <Button title="Open Offerwall" onPress={openOfferwall} />
        <View style={styles.group}>
          <Text style={styles.groupHeader}>Event Log</Text>
          {eventLog.length === 0 ? (
            <Text>No events yet.</Text>
          ) : (
            eventLog.map((msg, idx) => <Text key={idx}>{msg}</Text>)
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  header: {
    fontSize: 30,
    margin: 20,
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 20,
  },
  group: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
};
