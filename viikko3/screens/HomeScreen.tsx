import * as React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import CustomAppBar from '../components/CustomAppBar';

export default function HomeScreen({ navigation }) {
  return (
    <>
      <CustomAppBar navigation={navigation} back={false} title="Home" />
      <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        <Text variant="titleLarge">Home Screen</Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Second')}
          style={{ marginTop: 16 }}
        >
          Go to Second Screen
        </Button>
      </View>
    </>
  );
}
