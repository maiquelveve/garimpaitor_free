import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

export default function LoadingSystemSimple({ text = 'Carregando....', showTextLoading = true }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
      <ActivityIndicator size={35} />
      {showTextLoading &&
        <Text style={{ marginTop: 20, fontSize: 12 }}>{text}</Text>
      }
    </View>
  );
}