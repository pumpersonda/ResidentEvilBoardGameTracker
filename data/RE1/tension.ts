import { Card, GameVersion } from '@/types';

export type TensionColor = 'Green' | 'Amber' | 'Red';

export interface TensionCard extends Card {
  quote: string;
  description: string;
  color: TensionColor;
  hasSpecialEffect: boolean;
}

export const TENSION_CARDS: TensionCard[] = [
  {
    id: 'tension-fevered-assault',
    name: 'Fevered Assault',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Amber',
    quote:
      'Unnatural vigour possesses the undead, as they hurl themselves towards you in a stumbling run.',
    description: "During the next player's turn, increase enemy movement values by 1.",
    hasSpecialEffect: true,
  },
  {
    id: 'tension-frayed-nerves',
    name: 'Frayed Nerves',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Amber',
    quote: 'Movement chases through the shadows, enemies all around you...',
    description:
      'If the next character is on the same tile at the start of their Tension Phase as they began their turn on, they must draw two additional cards.',
    hasSpecialEffect: true,
  },
  {
    id: 'tension-tragic-echoes',
    name: 'Tragic Echoes',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Amber',
    quote:
      'Some of these fiends still possess trinkets from their former lives, tragic echoes of what used to be.',
    description:
      "Locate the closest Zombie to the active character, and place an Item A token underneath its base. When the Zombie moves or is pushed, the token moves with the model. Characters can't make a search action to remove the token while the Zombie is on the playing area. When the Zombie is killed, leave the token in the square it was on.",
    hasSpecialEffect: false,
  },
  {
    id: 'tension-gnawing-fear',
    name: 'Gnawing Fear',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Amber',
    quote: 'Bloody hands push at the windows and doors, a horde of foes waiting in ambush!',
    description:
      'If this character leaves their current tile during their next turn, they must draw two extra cards in the next Tension Phase.',
    hasSpecialEffect: true,
  },
  {
    id: 'tension-cornered',
    name: 'Cornered',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Amber',
    quote:
      'A vicious snarl sends a shiver down your spine, as you realise your foe has found you once more...',
    description:
      "Locate the tile closest to the active character where there are enemies but no characters. Remove the enemy on the tile with the highest threat level and place them on this character's tile, on the closest square.",
    hasSpecialEffect: false,
  },
  {
    id: 'tension-reanimate',
    name: 'Reanimate',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Amber',
    quote:
      'Dead eyes flicker open to reveal milky orbs, as the closest corpse rises unsteadily to its feet...',
    description:
      'Locate the corpse closest to the active character. Remove the corpse and spawn a Zombie in its square.',
    hasSpecialEffect: false,
  },
  {
    id: 'tension-mission-update',
    name: 'Mission Update',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Amber',
    quote:
      'Your radio sputters into life, an abrupt reminder you are not alone in this forsaken place.',
    description: 'Draw a mission card.',
    hasSpecialEffect: false,
  },
  {
    id: 'tension-unfolding-events',
    name: 'Unfolding Events',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Amber',
    quote: 'Something unusual awaits in the gloom ahead...',
    description:
      'Draw a narrative card, then remove this card from the deck for the rest of the scenario.',
    hasSpecialEffect: false,
  },
  {
    id: 'tension-virulent-blood',
    name: 'Virulent Blood',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Amber',
    quote:
      'A ghastly sense of animation possesses your foes, their bodies writhing unnaturally as they move...',
    description:
      'Place this card next to the tension deck, with six wound tokens on it. While this card is in play, always use the symbol printed on this card when resolving enemy reactions during the Reaction Phase. Each time an enemy is killed, discard a token from this card. When the final token is discarded, discard this card.',
    hasSpecialEffect: true,
  },
  {
    id: 'tension-sinister-echoes',
    name: 'Sinister Echoes',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Amber',
    quote:
      "Stumbling footsteps echo along the corridors, chasing your every move. Lay low, and don't let them find you!",
    description:
      "Place this card next to the tension deck, with four wound tokens on it. If a character makes an attack while this card is in play, after resolving the attack, draw a card from the encounter deck. At the end of each character's turn, discard a token. When the final token is discarded, discard this card.",
    hasSpecialEffect: true,
  },
  {
    id: 'tension-diseased-claws',
    name: 'Diseased Claws',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Amber',
    quote: "Filth crusts your foes' talons, and vile purple veins strain against their skin.",
    description:
      "Place this card next to the tension deck, with four wound tokens on it. If a character is hit by an enemy attack while this card is in play, they suffer an additional effect in addition to the attack's effects. At the end of each character's turn, discard a token. When the final token is discarded, discard this card.",
    hasSpecialEffect: true,
  },
  {
    id: 'tension-from-the-depths',
    name: 'From the Depths',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Amber',
    specialId: 18,
    quote:
      'A loud crash sounds from below, and the ground shudders violently. Moments later a bestial roar breaks the uneasy silence...',
    description:
      "Each character on the active character's tile must pass an evade roll. Each character that fails suffers damage.",
    hasSpecialEffect: false,
  },
  {
    id: 'tension-bee-swarm',
    name: 'Bee Swarm',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Amber',
    quote: 'A swarm floats towards you, hostile towards the intruders in their unusual lair.',
    description:
      'The active character must move 2 squares away from their current square. This movement ignores reactions from enemies. If the character has not moved onto a different tile with this movement, they must pass two evade rolls. The character suffers damage for each roll they fail.',
    hasSpecialEffect: false,
  },
  {
    id: 'tension-waterlogged',
    name: 'Waterlogged',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Amber',
    quote:
      'From the looks of things, a pipe burst here and doused everything in water, leaving it soaking wet.',
    description:
      "Place this card next to the active character's tile. It remains in play for the rest of the scenario. Characters can't use kerosene tokens to discard corpses on this tile or any tiles linked to this tile.",
    hasSpecialEffect: true,
  },
  {
    id: 'tension-flickering-lights',
    name: 'Flickering Lights',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Amber',
    quote: 'The lights flicker overhead, making it nigh on impossible to aim.',
    description:
      "Place this card next to the active character's tile. It remains in play for the rest of the scenario. If a character on this tile makes a successful attack, they must reroll the attack.",
    hasSpecialEffect: true,
  },
  {
    id: 'tension-treacherous-footing',
    name: 'Treacherous Footing',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Amber',
    quote:
      "The floor is slick with blood... you hope this doesn't belong to one of your teammates.",
    description:
      "Place this card next to the active character's tile. It remains in play for the rest of the scenario. If a character begins their turn on this tile, they can only make three actions during their turn.",
    hasSpecialEffect: true,
  },
  {
    id: 'tension-sinister-hiss',
    name: 'Sinister Hiss',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Amber',
    specialId: 15,
    quote:
      'Vicious hissing sounds from hidden places, deadly predators watching your every move...',
    description:
      "Place this card next to the active character's tile. It remains in play for the rest of the scenario. Each time a character ends their turn on this tile, add a wound token to this card. If a third token is added to this card, each character on this tile must pass an evade roll. Characters that fail suffer damage. After each character has rolled, discard all tokens on this card.",
    hasSpecialEffect: true,
  },
  {
    id: 'tension-sabotage',
    name: 'Sabotage!',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Amber',
    specialId: 22,
    quote: 'Someone has sabotaged your supplies...',
    description:
      "Search the item box for any special or plus Item cards, then shuffle them together and discard a card at random. If there aren't any, instead remove the closest Item A token to the active character. Remove this card from the deck for the rest of the scenario.",
    hasSpecialEffect: false,
  },
  {
    id: 'tension-foreboding-scene',
    name: 'Foreboding Scene',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Amber',
    specialId: 10,
    quote:
      'This is no safe place: dried blood stains the ground, the rank musk of rot and decay heavy in the air.',
    description:
      "Place this card next to the closest unexplored tile. When that tile's encounter token is removed, draw an additional encounter card, then discard this card.",
    hasSpecialEffect: true,
  },
  {
    id: 'tension-ominous-feeling',
    name: 'Ominous Feeling',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Amber',
    specialId: 11,
    quote:
      'The dead do not sleep easy, their bodies wracked with spasms and ticks, ready to awaken at any time.',
    description:
      "For one round, characters must reroll successful attacks if there are any corpses on their tile. At the start of each character's turn, roll for each corpse on their tile. If the result is a hit, replace the corpse with a Zombie.",
    hasSpecialEffect: true,
  },
  {
    id: 'tension-keep-quiet',
    name: 'Keep Quiet!',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Amber',
    specialId: 4,
    quote:
      "A horde of undead fiends prowl relentlessly nearby, hungry for flesh. Don't say a word, lest they descend upon you!",
    description:
      'During the next turn, if any player speaks, the active character must immediately draw an encounter card.',
    hasSpecialEffect: true,
  },
  {
    id: 'tension-no-escape',
    name: 'No Escape',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Amber',
    specialId: 2,
    quote:
      'The closest door rattles and shakes, the handle shuddering, before being suddenly thrown open.',
    description:
      'Open the closest non-locked closed door to the character. Enemies on the two tiles connected by the door perform a reaction.',
    hasSpecialEffect: true,
  },
  {
    id: 'tension-claws-from-the-ceiling',
    name: 'Claws from the Ceiling',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Red',
    specialId: 12,
    quote:
      'Spiny talons snake from the vents, threatening to hook you towards an untimely death...',
    description:
      'This character must pass an evade roll. If they fail they must discard an item or suffer damage. Any other characters that are the only character on their tile must pass an evade roll. If they fail they must discard an item or suffer damage.',
    hasSpecialEffect: true,
  },
  {
    id: 'tension-dragged-shackles',
    name: 'Dragged Shackles',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Red',
    specialId: 9,
    quote: 'An eerie groan scratches across your senses, a nail leaving a bloody trail...',
    description:
      'Spawn Lisa Trevor on the closest square to the next active character. Remove any wound tokens from her card. If Lisa Trevor is already in play, place her on the closest square to the next active character. After spawning or being placed, Lisa Trevor also performs a move reaction.',
    hasSpecialEffect: true,
  },
  {
    id: 'tension-countdown-to-explosion',
    name: 'Countdown to Explosion',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Red',
    specialId: 13,
    quote:
      'The self-destruct system has been activated. All personnel must evacuate immediately...',
    description: 'Refresh the tension deck, then remove this card from the game.',
    hasSpecialEffect: false,
  },
  {
    id: 'tension-keepers-diary',
    name: "Keeper's Diary",
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Red',
    specialId: 5,
    quote: '4// Itchy. Tasty.',
    description:
      'This card remains in play. The next time a character makes a search action, after the action is resolved, they draw an encounter card, then discard this card.',
    hasSpecialEffect: false,
  },
  {
    id: 'tension-hunters-prey',
    name: "Hunter's Prey",
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Red',
    specialId: 20,
    quote: "A call sounds, feral and dripping with murderous intent. They've found you.",
    description:
      "Spawn a Hunter in the active character's square. If all of the Hunters are already in play, remove the closest Hunter to the active character, and place it in their square. Then, the Hunter performs a reaction.",
    hasSpecialEffect: false,
  },
  {
    id: 'tension-overrun',
    name: 'Overrun',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Red',
    quote: "They're everywhere! There's no escape!",
    description:
      'Place this card next to the tension deck, with three wound tokens on it. Each time an enemy is killed or a corpse is removed by using a kerosene token, discard a token from this card. When the final token is discarded, discard this card. If a scenario ends with this card in play, increase the mansion danger level by 2, then remove this card from the game.',
    hasSpecialEffect: true,
  },
  {
    id: 'tension-infestation',
    name: 'Infestation',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Red',
    specialId: 19,
    quote:
      'The air is thick with vicious insects, an angry cloud of stingers and spiteful bites...',
    description:
      "The active character must pass an evade roll. If they fail, they suffer damage. Place this card next to the active character's tile. It remains in play for the rest of the scenario. If a character ends their turn on this tile, they must pass an evade roll. If they fail they suffer damage.",
    hasSpecialEffect: true,
  },
  {
    id: 'tension-waterway-open',
    name: 'Waterway Open',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Red',
    specialId: 16,
    quote: 'With a horrendous metallic grinding noise, the waterway opens.',
    description:
      'Replace the Waterway Gate with an archway. Draw and resolve an encounter card for each numbered tile. Shuffle up to ten tension cards of your choice from the discard pile into the tension deck. Then, remove this card from the game.',
    hasSpecialEffect: false,
  },
  {
    id: 'tension-shattering-glass',
    name: 'Shattering Glass',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Red',
    specialId: 1,
    quote: 'You jump at the sound of breaking glass, and prepare for the worst...',
    description:
      "Draw an additional tension card. Spawn a Cerberus on the active character's tile. Spawn an additional Cerberus on the active character's tile.",
    hasSpecialEffect: true,
  },
  {
    id: 'tension-crimson-rage',
    name: 'Crimson Rage',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Red',
    specialId: 3,
    quote:
      'A roar breaks the silence as a foe once dead violently drags itself to its feet, deadly talons raking the walls.',
    description: 'Remove the closest corpse and replace it with a Crimson Head.',
    hasSpecialEffect: false,
  },
  {
    id: 'tension-deathly-rasp',
    name: 'Deathly Rasp',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Red',
    quote:
      'A sinister growl echoes from the walls, dripping with malicious intent. But where is it coming from? Are you under attack?',
    description: 'Draw an encounter card. Draw an additional encounter card.',
    hasSpecialEffect: true,
  },
  {
    id: 'tension-smashed-asunder',
    name: 'Smashed Asunder',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Red',
    specialId: 6,
    quote:
      'A loud crack echoes through the rooms and corridors. Somewhere, a relentless foe has finally resumed the chase...',
    description:
      'Replace the closest non-locked door with an archway, then remove this card from the deck for the rest of the scenario. Spawn a Zombie in one of the squares containing the archway. After resolving this card remove it from the game.',
    hasSpecialEffect: true,
  },
  {
    id: 'tension-murder-of-crows',
    name: 'Murder of Crows',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Red',
    specialId: 7,
    quote: 'Death descends in a flurry of screeching calls and midnight black feathers!',
    description:
      'The active character must pass an evade roll. If they fail, they suffer damage. Each other character on the tile must pass an evade roll. Characters that fail suffer damage. After resolving this card, remove it from the game.',
    hasSpecialEffect: true,
  },
  {
    id: 'tension-out-of-the-shadows',
    name: 'Out of the Shadows',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Red',
    specialId: 8,
    quote:
      'A bestial roar is your only warning as the fiend lunges from the darkness, claws reaching for your throat!',
    description:
      'Place the Crimson Head Prototype in the same square as the next active character.',
    hasSpecialEffect: true,
  },
  {
    id: 'tension-three-minutes-until-explosion',
    name: 'Three Minutes Until Explosion',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Red',
    specialId: 14,
    quote: 'At last, a weapon you can use to defeat the tyrant! Quick, before you run out of time!',
    description:
      'Place the token in the indicated square. Add the Enraged Tyrant reference card to the T-002 Tyrant reference card.',
    hasSpecialEffect: false,
  },
  {
    id: 'tension-vigour-mortis',
    name: 'Vigour Mortis',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Red',
    quote:
      'Your enemies lunge forward unpredictably, nails clawing through the air as their teeth snap with bestial hunger.',
    description:
      "Enemies on the same tile as the active character immediately perform a reaction. If there are no enemies on the active character's tile, draw two tension cards instead. After resolving this card, remove it from the game.",
    hasSpecialEffect: false,
  },
  {
    id: 'tension-supply-cache',
    name: 'Supply Cache',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Green',
    quote:
      'There are plenty of supplies here, if only you can clear out some of the enemies and investigate properly.',
    description:
      "Place this card next to the tension deck, with five wound tokens on it. Each time an enemy is killed, or a corpse is discarded by using a kerosene token, discard a token from this card. If the final token is discarded, discard this card, then each character draws a card from the Item A deck. If a character's inventory is full, place their card in the item box.",
    hasSpecialEffect: true,
  },
  {
    id: 'tension-gunshots-in-the-distance',
    name: 'Gunshots in the Distance',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Green',
    quote:
      'Gunfire punctures the air ahead, accompanied by violent screeching. Then silence once more, as your unknown ally makes their escape.',
    description:
      'Draw cards from the encounter deck until a card with a spawn entry is drawn. Place the card in the encounter deck discard pile, then shuffle the other cards that were drawn back into the deck.',
    hasSpecialEffect: false,
  },
  {
    id: 'tension-respite',
    name: 'Respite',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Green',
    quote:
      'This place looks mercifully secure of enemies, but for how long? Best not push your luck...',
    description:
      "Place this card next to the active character's tile, with six wound tokens on it. If a character begins their Tension Phase on this tile, they discard a token instead of drawing from the tension deck. When the final token is discarded, discard this card.",
    hasSpecialEffect: true,
  },
  {
    id: 'tension-cleared-out',
    name: 'Cleared Out',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Green',
    specialId: 21,
    quote:
      'One of your compatriots seems to have passed through here, if the broken bodies of your foes are anything to go by...',
    description:
      'Place this card next to the tension deck, with four wound tokens on it. When a character draws an encounter card, they can choose to discard a token on this card to shuffle the encounter card back into the deck and draw a replacement. When the final token is discarded, or if the scenario ends, remove this card from the game.',
    hasSpecialEffect: true,
  },
  {
    id: 'tension-all-clear',
    name: 'All Clear',
    type: 'Tension',
    game: GameVersion.RE1,
    quantity: 1,
    color: 'Green',
    quote: '',
    description: '',
    hasSpecialEffect: false,
  },
];
