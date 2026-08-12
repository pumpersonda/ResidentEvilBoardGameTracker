# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.1.0-alpha] - 2026-08-12

### Added

- Initial project scaffold with Expo, React Native, and TypeScript
- Gluestack UI component library integrated locally (Button, Card, Modal, Input, Select, Checkbox, Slider, Toast, AlertDialog, etc.)
- UniWind (Tailwind CSS v4) styling engine with runtime-switchable **light**, **dark**, and **red** themes (`store/themeStore.ts`, persisted as `re-theme-store`)
- Core domain types in `types/index.ts`: `Campaign`, `Card`, `CardType`, `Item`, `ItemType`, `ActiveCharacter`, `CharacterHealth`, `Scenario`, `ScenarioStatus`, `GameVersion`, `GameExpansion`, `Player`
- Zustand `campaignStore` with `persist` middleware backed by AsyncStorage (`re-campaign-store`) as the single source of truth for all campaign data, enabling full offline usage
- Campaign lifecycle actions: `createCampaign`, `updateCampaign`, `deleteCampaign`, `setCurrentCampaignId`, `resetCampaign`
- Character management actions: `addActiveCharacter`, `removeActiveCharacter`, `moveCharacterToReserve`, `addReserveCharacter`, `updateActiveCharacterHealth`, `updateActiveCharacterPlayerName`
- Character inventory actions: `addItemToActiveCharacter`, `removeItemFromActiveCharacter`, `updateActiveCharacterInventory`, `resetActiveCharacterInventory`
- Shared item box actions: `addItemToBox`, `removeFromItemsBox`, `updateItemAmmunition`
- Card pile actions: `addedCard`, `discardCard`, `removeFromAddedCards`, `removeFromDiscardedCard` (quantity-aware, supports Item/Encounter/Narrative/Mission/Tension/Map/Boss/CharacterProfile types)
- Scenario actions: `updateScenarioStatus`, `unlockScenario`, `toggleExpansion` (per-campaign expansion enablement)
- Danger level tracking via `setDangerLevel`
- RE1 static game data: characters, encounter cards, mission cards, narrative cards, tension cards, items, and scenarios (`data/RE1/`)
- Dashboard screen listing all campaigns with create/edit/delete flows and a floating action button
- `CreateCampaignModal` for campaign creation and editing (name, game version, difficulty)
- Current Campaign screen with tabbed navigation: Overview (Summary), Characters, Item Box, Cards, Scenarios (`CampaignTabBar`)
- `SummaryTab` overview cards (active roster, items in box, added/discarded card counts) and campaign completion helper (`utils/campaignProgress.ts`)
- `CharactersTab`, `CharacterDetailsModal`, `EditCharacterModal`, `AssignItemModal`, `SelectCharacterModal` for roster and inventory management
- `ItemBoxTab` and `AddItemModal` for shared item box management
- `DiscardedCardsTab`, `DiscardCardModal`, `SelectCardCategoryModal` for card pile tracking
- `ScenariosTab` with scenario unlock functionality gated by expansion and danger level
- `DangerLevelControl` component and `constants/dangerLevel.ts` definitions
- `DisclaimerModal` with legal/fan-made disclaimer, shown from the Dashboard
- React Navigation stack (`AppNavigator`) wiring Dashboard and Current Campaign screens
- Character avatar image assets (`assets/character_avatars`)
- Jest unit tests for health track mechanics (`tests/healthMechanics.test.ts`)
- ESLint and Prettier tooling configuration
- Project `README.md` with feature overview, tech stack, and legal disclaimer

### Changed

- Restricted the "add game version" feature flag so only RE1 is currently selectable when creating a campaign, reflecting current data coverage
- Store persistence upgraded to schema `version: 1` with a `migrate` step that backfills `enabledExpansions` (defaulting to `['Core Box']`) on existing persisted campaigns

### Fixed

- Corrected item box quantity aggregation so existing items are incremented instead of duplicated
- Corrected danger level updates to target only the currently active campaign
