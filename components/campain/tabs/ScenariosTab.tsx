import React, { useMemo, useState } from 'react';
import { ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Pressable } from '@/components/ui/pressable';
import { Checkbox, CheckboxIcon, CheckboxIndicator } from '@/components/ui/checkbox';
import { Button, ButtonText } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { Campaign, GameExpansion, Scenario } from '@/types';
import { useCampaignStore } from '@/store/campaignStore';
import { getGameScenarios } from '@/data';
import { Check, Lock } from 'lucide-react-native';

interface ScenariosTabProps {
  campaign: Campaign;
}

const EXPANSION_ORDER: GameExpansion[] = ['Core Box', 'Bleak Outpost', 'Into The Darkness'];

const TOGGLEABLE_EXPANSIONS: Exclude<GameExpansion, 'Core Box'>[] = [
  'Bleak Outpost',
  'Into The Darkness',
];

export const ScenariosTab: React.FC<ScenariosTabProps> = ({ campaign }) => {
  const updateScenarioStatus = useCampaignStore(state => state.updateScenarioStatus);
  const unlockScenario = useCampaignStore(state => state.unlockScenario);
  const toggleExpansion = useCampaignStore(state => state.toggleExpansion);
  const [scenarioPendingUnlock, setScenarioPendingUnlock] = useState<Scenario | null>(null);

  const lockStatusById = useMemo(() => {
    const map = new Map<string, string>();
    for (const definition of getGameScenarios(campaign.game)) {
      map.set(definition.id, definition.lockStatus);
    }
    return map;
  }, [campaign.game]);

  const availableExpansions = TOGGLEABLE_EXPANSIONS.filter(expansion =>
    campaign.scenarios.some(s => s.expansion === expansion)
  );

  const groups = EXPANSION_ORDER.map(
    expansion =>
      [expansion, campaign.scenarios.filter(s => s.expansion === expansion)] as [
        GameExpansion,
        Scenario[],
      ]
  ).filter(
    ([expansion, scenarios]) =>
      scenarios.length > 0 && campaign.enabledExpansions.includes(expansion)
  );

  const onToggleComplete = (scenario: Scenario) => {
    updateScenarioStatus(scenario.id, scenario.status === 'Completed' ? 'Unlocked' : 'Completed');
  };

  const onConfirmUnlock = () => {
    if (!scenarioPendingUnlock) return;
    unlockScenario(scenarioPendingUnlock.id);
    setScenarioPendingUnlock(null);
  };

  return (
    <VStack className="flex-1">
      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {availableExpansions.length > 0 && (
          <VStack space="sm" className="pb-4 mb-2 border-b border-border">
            {availableExpansions.map(expansion => (
              <HStack key={expansion} space="sm" className="items-center justify-between">
                <Text className="text-foreground font-semibold">{expansion}</Text>
                <Checkbox
                  value={expansion}
                  isChecked={campaign.enabledExpansions.includes(expansion)}
                  onChange={() => toggleExpansion(expansion)}
                  accessibilityLabel={`Enable ${expansion}`}
                >
                  <CheckboxIndicator size="lg">
                    <CheckboxIcon as={Check} />
                  </CheckboxIndicator>
                </Checkbox>
              </HStack>
            ))}
          </VStack>
        )}

        {groups.length === 0 ? (
          <VStack className="flex-1 items-center justify-center py-12">
            <Text className="text-muted-foreground">No scenarios available for this game yet.</Text>
          </VStack>
        ) : (
          <VStack space="lg" className="pb-24">
            {groups.map(([expansion, scenarios]) => (
              <VStack key={expansion} space="sm">
                <Text className="text-foreground text-xl font-bold">{expansion}</Text>

                {scenarios.map(scenario => {
                  const isLocked = scenario.status === 'Locked';
                  const isCompleted = scenario.status === 'Completed';

                  return (
                    <Card
                      key={scenario.id}
                      className={`bg-card border border-border p-4 rounded-2xl ${
                        isLocked ? 'opacity-60' : ''
                      }`}
                    >
                      <HStack space="md" className="items-center justify-between">
                        <Text className="text-foreground font-semibold flex-1">
                          {scenario.name}
                        </Text>

                        {isLocked ? (
                          <Pressable
                            onPress={() => setScenarioPendingUnlock(scenario)}
                            className="flex-row items-center gap-1 px-3 py-1.5 rounded-full bg-muted active:opacity-70"
                            accessibilityLabel={`Unlock ${scenario.name}`}
                          >
                            <Lock color="gray" size={14} />
                            <Text className="text-muted-foreground text-xs font-semibold">
                              Unlock
                            </Text>
                          </Pressable>
                        ) : (
                          <Checkbox
                            value={scenario.id}
                            isChecked={isCompleted}
                            onChange={() => onToggleComplete(scenario)}
                            accessibilityLabel={`Mark ${scenario.name} as completed`}
                          >
                            <CheckboxIndicator size="lg">
                              <CheckboxIcon as={Check} />
                            </CheckboxIndicator>
                          </Checkbox>
                        )}
                      </HStack>
                    </Card>
                  );
                })}
              </VStack>
            ))}
          </VStack>
        )}
      </ScrollView>

      <AlertDialog
        isOpen={scenarioPendingUnlock !== null}
        onClose={() => setScenarioPendingUnlock(null)}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent className="bg-card">
          <AlertDialogHeader>
            <Text className="text-foreground text-xl font-semibold">Unlock scenario</Text>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text className="text-muted-foreground">
              {`Unlock "${scenarioPendingUnlock?.name}"?`}
            </Text>
            {scenarioPendingUnlock && lockStatusById.get(scenarioPendingUnlock.id) && (
              <Text className="text-muted-foreground text-sm mt-2 italic">
                {lockStatusById.get(scenarioPendingUnlock.id)}
              </Text>
            )}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              variant="outline"
              className="flex-1 border-border"
              onPress={() => setScenarioPendingUnlock(null)}
            >
              <ButtonText className="text-muted-foreground">Cancel</ButtonText>
            </Button>
            <Button className="flex-1 bg-destructive active:opacity-90" onPress={onConfirmUnlock}>
              <ButtonText>Unlock</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </VStack>
  );
};
