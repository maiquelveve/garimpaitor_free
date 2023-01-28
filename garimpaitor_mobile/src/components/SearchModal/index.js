import React from 'react';
import { View } from 'react-native';
import { Modal, Portal, Text } from 'react-native-paper';

import styles from '../../styles';

export default function SearchModal({ open, handleClosedOpen, title, FormChildren, style }) {
  return (
    <Portal>
      <Modal
        visible={open}
        onDismiss={handleClosedOpen}
        style={{ ...styles.stylesModalsContainer, ...style?.modalStyleContainer }}
        contentContainerStyle={{ ...styles.stylesModalsContentContainer, ...style?.modalStyleContent }}
      >
        <View>
          <View style={{ ...styles.stylesSearchModalUsersViewContainer, ...style?.modalStyleTitleContainer }} >
            <Text style={{ ...styles.stylesSearchModalUsersTitle, ...style?.modalStyleTitle }} >
              {title}
            </Text>
          </View>
          {FormChildren}
        </View>
      </Modal>
    </Portal>
  );
}
