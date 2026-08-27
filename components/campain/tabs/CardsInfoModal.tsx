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

interface CardsInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CardsInfoModal: React.FC<CardsInfoModalProps> = ({ isOpen, onClose }) => (
  <AlertDialog isOpen={isOpen} onClose={onClose}>
    <AlertDialogBackdrop />
    <AlertDialogContent className="bg-card">
      <AlertDialogHeader>
        <Text className="text-foreground text-xl font-semibold">Added vs. Discarded</Text>
      </AlertDialogHeader>
      <AlertDialogBody>
        <VStack space="sm">
          <Text className="text-muted-foreground">
            <Text className="text-foreground font-semibold">Added Cards</Text> are cards that have
            been drawn into the current campaign and are active in play.
          </Text>
          <Text className="text-muted-foreground">
            <Text className="text-foreground font-semibold">Discarded Cards</Text> are cards that
            have been used up and removed from play, placed in the discard pile.
          </Text>
        </VStack>
      </AlertDialogBody>
      <AlertDialogFooter>
        <Button className="flex-1 bg-secondary active:opacity-90" onPress={onClose}>
          <ButtonText className="text-secondary-foreground">Got it</ButtonText>
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
