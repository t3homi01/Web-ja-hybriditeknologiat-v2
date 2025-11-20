import * as React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import CustomAppBar from '../components/CustomAppBar';

export default function SecondScreen({ navigation }) {
  return (
    <>
      <CustomAppBar navigation={navigation} back={true} title="Second" />
      <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        <Text variant="titleLarge">Second Screen</Text>
      </View>
    </>
  );
}
