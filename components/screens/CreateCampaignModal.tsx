import React from 'react';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@/components/ui/modal';

import { Button, ButtonText } from '@/components/ui/button';

import { Input, InputField } from '@/components/ui/input';

import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from '@/components/ui/select';

import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';

import { X } from 'lucide-react-native';

// Zod Schema
const createCampaignSchema = z.object({
  name: z.string().min(3, 'The name should have at least 3 characters'),
  gameVersion: z.enum(['RE1', 'RE2', 'RE3']),
  difficulty: z.enum(['Easy', 'Normal', 'Hard']),
});

export type CreateCampaignForm = z.infer<typeof createCampaignSchema>;

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: CreateCampaignForm) => void;
}

export default function CreateCampaignModal({
  isOpen,
  onClose,
  onCreate,
}: CreateCampaignModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CreateCampaignForm>({
    resolver: zodResolver(createCampaignSchema),
    defaultValues: {
      name: '',
      gameVersion: 'RE1',
      difficulty: 'Normal',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: CreateCampaignForm) => {
    onCreate(data);
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalBackdrop />
      <ModalContent className="bg-zinc-900">
        <ModalHeader>
          <Text className="text-white text-xl font-semibold">Create New Campaign</Text>
          <ModalCloseButton>
            <X color="#a1a1aa" size={20} />
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody>
          <VStack space="lg">
            {/* Name */}
            <VStack space="xs">
              <Text className="text-zinc-400 text-sm">Campaign Name</Text>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input className="bg-zinc-950 border-zinc-700 border">
                    <InputField
                      placeholder="Enter campaign name"
                      value={value}
                      onChangeText={onChange}
                      className="text-white"
                    />
                  </Input>
                )}
              />
              {errors.name && <Text className="text-red-500 text-sm">{errors.name.message}</Text>}
            </VStack>

            {/* Game Version */}
            <VStack space="xs">
              <Text className="text-zinc-400 text-sm">Game Version</Text>
              <Controller
                control={control}
                name="gameVersion"
                render={({ field: { onChange, value } }) => (
                  <Select selectedValue={value} onValueChange={onChange}>
                    <SelectTrigger className="bg-zinc-950 border-zinc-700">
                      <SelectInput placeholder="Select version" className="text-white" />
                      <SelectIcon />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent className="bg-zinc-900">
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <SelectItem label="Resident Evil 1" value="RE1" />
                        <SelectItem label="Resident Evil 2" value="RE2" />
                        <SelectItem label="Resident Evil 3" value="RE3" />
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                )}
              />
            </VStack>

            {/* Difficulty */}
            <VStack space="xs">
              <Text className="text-zinc-400 text-sm">Difficulty</Text>
              <Controller
                control={control}
                name="difficulty"
                render={({ field: { onChange, value } }) => (
                  <Select selectedValue={value} onValueChange={onChange}>
                    <SelectTrigger className="bg-zinc-950 border-zinc-700">
                      <SelectInput placeholder="Select difficulty" className="text-white" />
                      <SelectIcon />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent className="bg-zinc-900">
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <SelectItem label="Easy" value="Easy" />
                        <SelectItem label="Normal" value="Normal" />
                        <SelectItem label="Hard" value="Hard" />
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                )}
              />
            </VStack>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <HStack space="md" className="w-full">
            <Button variant="outline" className="flex-1 border-zinc-700" onPress={onClose}>
              <ButtonText className="text-zinc-400">Cancel</ButtonText>
            </Button>
            <Button
              className="flex-1 bg-red-600"
              onPress={handleSubmit(onSubmit)}
              isDisabled={!isValid}
            >
              <ButtonText>Create Campaign</ButtonText>
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
