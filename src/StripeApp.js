import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';

const API_URL = "http://localhost:3000";

const StripeApp = props => {
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/
    create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    //Get Customer Info
    if (!cardDetails?.complete || !email) {
      Alert.alert("Please enter Complete card details and Email")
    };
    const billingDetails = {
      email: email,
    };
    //Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //Confirm the payment
      if (error) {
        console.log("Unable to press payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(
          clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          alert("Payment Successful");
          console.log("Payment successful", paymentIntent);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        keyboardType="email-address"
        onChange={value => setEmail(value.nativeEvent.text)}
        style={styles.input}
      />
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={cardDetails => {
          setCardDetails(cardDetails);
        }}
      />
      <Button onPress={handlePayPress} title="Pay" disabled={loading} />
    </View>
  )
}

export default StripeApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  input: {
    backgroundColor: "#efefef",
    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
})
