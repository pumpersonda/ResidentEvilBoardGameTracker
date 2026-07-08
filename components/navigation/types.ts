import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Dashboard: undefined;
  CurrentCampaign: undefined;
  // New screens here
  // CharacterDetail: { characterId: string };
  // AddCard: undefined;
  // ScenarioDetail: { scenarioId: string };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;
