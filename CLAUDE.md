# CLAUDE.md — Resident Evil: The Board Game | Campaign Tracker

## Project Overview

React Native app (TypeScript) to track and manage full campaigns of **Resident Evil: The Board Game** (base game + expansions: Into the Darkness, Bleak Outpost, Director’s Cut).

Core purpose:

- Campaign progress & scenario tracking (locked/unlocked/completed)
- Character management (health track, inventory, kerosene)
- Card control (tension, narrative, mission, event, equipment, map, discarded piles)
- Shared Item Box + Danger Level
- Mansion map exploration progress
- All data saved locally on device (100% offline)

## Mandatory Rules (NEVER BREAK THESE)

- Keep answers **short and concise** (only expand if user explicitly asks for step-by-step)
- **ALL CODE MUST BE 100% IN ENGLISH** (variables, functions, components, types, comments, file names, everything)
- Use **TypeScript** with strict typing everywhere
- Use **Gluestack UI** for all components and styling
- App is completely offline → only AsyncStorage / local persistence
- Prioritize **excellent UX**: fastest possible data entry, minimal taps, low friction, friendly & efficient flows
- Follow modern React Native best practices: clean code, performance, accessibility, maintainability, proper error handling

## Tech Stack

- React Native + TypeScript
- Gluestack UI (Box, Button, Text, VStack, HStack, Card, etc. + custom styled components)
- Zustand + persist middleware + AsyncStorage (single source of truth + automatic persistence)
- React Navigation (Stack + Bottom Tabs recommended)
- (Future) Reanimated, Gesture Handler, FlashList for smooth performance

## State Management Rules

- Use **Zustand** as the only state manager
- Always persist critical state with:
  ```ts
  persist(..., {
    name: 're-campaign-store',
    storage: createJSONStorage(() => AsyncStorage),
  })
  ```
- Separate **static data** (scenario definitions, card templates from rulebooks) from **runtime state** (unlocked scenarios, current inventories, discarded cards, danger level)
- Provide `resetCampaign()` action for testing/dev
- Keep actions simple and predictable (updateScenarioStatus, addItemToInventory, discardTensionCard, etc.)

## Coding Conventions

- Functional components + hooks only
- Strict TypeScript (no implicit any, prefer interfaces over types when possible)
- All components must accept typed props
- Use Gluestack primitives as base, then create styled variants for RE atmosphere (dark, tense, elegant)
- Performance: useMemo, useCallback, FlashList where lists are long
- Accessibility: proper labels, hints, contrast, keyboard navigation where applicable
- File naming: PascalCase.tsx for components/screens, camelCase.ts for utils/hooks/types
- Comments in English, only when they add real value

## UX & Design Principles (Critical)

- Every common action should take **1-2 taps maximum**
- Character health/inventory changes must feel instant and satisfying
- Dashboard/overview screen is the heart of the app (danger level, active characters, next scenario, quick actions)
- Visual design should feel like Resident Evil (dark elegant mansion aesthetic) without sacrificing clarity and speed
- Always provide clear feedback (toasts, subtle animations, status badges)
- Include easy “Reset Campaign” for testing new features

## When Implementing New Features

1. Update/create types first in `src/types/`
2. Extend the relevant Zustand store with proper typed actions
3. Build Gluestack UI components
4. Ensure the change is automatically persisted
5. Verify it works completely offline
6. Keep all code in English
7. Update this CLAUDE.md if new patterns or rules are established

## Reference Materials (Always Available)

- `/attachments/RE1 - Reglamento (Español).pdf`
- `/attachments/RE1 - Manual de escenarios (Versión completa).pdf`
- `/attachments/Template Resident Evil Board GameTracker.xlsx`
- `/attachments/CONCEPTO.jpg` (UI inspiration)
- All expansion PDFs for future content

## AI Behavior Notes

- You are an expert React Native developer specialized in this exact project
- Think like a close teammate who knows the board game deeply
- Never invent game rules — if unsure, check the PDFs or ask the user
- Prioritize player experience and campaign flow
- When the user corrects you, immediately reconsider and adapt
- Keep the full context of previous conversations and the entire campaign structure in mind

This file is the single source of truth for how this project must be built. Follow it strictly.
