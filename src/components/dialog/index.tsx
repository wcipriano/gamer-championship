import React from 'react';
import { Button, HStack, Text, VStack } from 'native-base';
import { styles } from './styles';

interface ExcluirItemDialogProps {
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  msg: string;
}

export const ExcluirItemDialog: React.FC<ExcluirItemDialogProps> = ({ isVisible, onCancel, onConfirm, msg }) => {
  if (!isVisible) return null;

  return (
    <VStack  style={styles.container}>
      <Text style={styles.text}>{msg}</Text>
      <HStack style={styles.content}>
        <Button style={[styles.button, styles.buttonIgn]} onPress={onCancel}>Cancelar</Button>
        <Button style={[styles.button, styles.buttonDan]} onPress={onConfirm}>Confirmar</Button>
      </HStack>
    </VStack>
  );
};
