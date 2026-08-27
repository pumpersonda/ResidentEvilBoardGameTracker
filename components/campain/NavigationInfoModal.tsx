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

interface NavigationInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavigationInfoModal(props: NavigationInfoModalProps) {
  return (
    <AlertDialog isOpen={props.isOpen} onClose={props.onClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent className="bg-card">
        <AlertDialogHeader>
          <Text className="text-foreground text-xl font-semibold">Expansions</Text>
        </AlertDialogHeader>
        <AlertDialogBody className="p-3s">
          <VStack space="sm">
            <Text className="text-muted-foreground">
              Enable the expansion to unlock the scenarios and content associated with that
              expansion below.
            </Text>
          </VStack>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button className="flex-1 bg-secondary active:opacity-90" onPress={props.onClose}>
            <ButtonText className="text-secondary-foreground">Got it</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
