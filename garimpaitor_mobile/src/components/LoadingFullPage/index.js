import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

export default function LoadingFullPage({ text = 'Carregando....' }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size={35} />
      <Text style={{ marginTop: 20, fontSize: 12 }}>{text}</Text>
    </View>
  );
}