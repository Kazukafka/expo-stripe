import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StripeApp from './src/StripeApp';
import { StripeProvider } from '@stripe/stripe-react-native';

export default function App() {
  return (
    <StripeProvider
      publishableKey="pk_test_51Jtt8eEMuY92pwAJwTDN6wHwGDfahYbjBZgoOHItmMOShWBRjKpvxQkUtaB9E7iz1iALR3is3AS5xpM3ipVfcbe700aAzTID2V"
    >
      <StripeApp />
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
