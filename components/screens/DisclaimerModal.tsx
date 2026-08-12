import React from 'react';
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DisclaimerModal({ isOpen, onClose }: DisclaimerModalProps) {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent className="bg-card">
        <AlertDialogHeader>
          <Text className="text-foreground text-xl font-semibold">Legal disclaimer</Text>
        </AlertDialogHeader>
        <AlertDialogBody>
          <VStack space="sm">
            <Text className="text-muted-foreground">
              This is an unofficial, fan-made companion app created to track personal campaign
              progress for the &quot;Resident Evil: The Board Game&quot; tabletop series.
            </Text>
            <Text className="text-muted-foreground">
              Resident Evil, all related characters, names, logos, and imagery are trademarks
              and/or copyrights of Capcom Co., Ltd. This app is not affiliated with, endorsed
              by, or sponsored by Capcom or the board game&apos;s publisher. No copyright
              infringement is intended.
            </Text>
            <Text className="text-muted-foreground">
              All data entered is stored locally on your device only; nothing is collected or
              shared.
            </Text>
          </VStack>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button className="flex-1 bg-destructive active:opacity-90" onPress={onClose}>
            <ButtonText>Got it</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
