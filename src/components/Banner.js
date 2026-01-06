import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Banner as PaperBanner } from 'react-native-paper';

export function Banner() {
  const [visible, setVisible] = useState(true);

  // This is a placeholder for AdMob banner
  // In production, replace with actual AdMob BannerAd component
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
