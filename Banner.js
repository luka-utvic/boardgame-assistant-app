// Banner.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Banner as PaperBanner } from 'react-native-paper';

export default function Banner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <PaperBanner
        visible={visible}
        actions={[
          {
            label: 'Dismiss',
            onPress: () => setVisible(false),
          },
        ]}
      >
        Ad space - Integrate AdMob here for monetization
      </PaperBanner>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffe082',
  },
});
