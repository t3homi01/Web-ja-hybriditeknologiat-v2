import * as React from 'react';
import { Appbar } from 'react-native-paper';

export default function CustomAppBar({ navigation, back, title }) {
  return (
    <Appbar.Header>
      {back ? (
        <Appbar.BackAction onPress={navigation.goBack} />
      ) : (
        <Appbar.Action icon="arrow-right" onPress={() => navigation.navigate("Second")} />
      )}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}
