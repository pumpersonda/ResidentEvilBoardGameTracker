// Enum for the "type" attribute
export enum ItemType {
  Weapon = 'weapon',
  Ammunition = 'ammunition',
  Key = 'key',
  Item = 'item',
  Defensive = 'defensive',
}

// Enum for the "cardType" attribute
export enum CardType {
  S = 'S',
  A = 'A',
  B = 'B',
  C = 'C',
}

// Interface for the objects
export interface Item {
  title: string;
  type: ItemType;
  cardType: CardType;
  ammunition?: number;
  specialId?: number;
}

export const ITEMS: Item[] = [
  // S type
  { title: 'Handgun', type: ItemType.Weapon, ammunition: 15, cardType: CardType.S },
  { title: 'First-Aid Spray', type: ItemType.Item, cardType: CardType.S },
  { title: 'Green Herb', type: ItemType.Item, cardType: CardType.S },
  { title: 'Grenade', type: ItemType.Defensive, cardType: CardType.S },
  { title: 'Handgun Bullets', type: ItemType.Ammunition, cardType: CardType.S },
  { title: 'Knife (Knife Only)', type: ItemType.Weapon, cardType: CardType.S },
  { title: 'Knife', type: ItemType.Weapon, cardType: CardType.S },
  { title: 'Lighter', type: ItemType.Item, cardType: CardType.S },
  { title: 'Master of Knifing', type: ItemType.Weapon, cardType: CardType.S },

  // A type
  { title: 'Blue Gemstone', type: ItemType.Item, cardType: CardType.A },
  { title: 'Blue Herb', type: ItemType.Item, cardType: CardType.A },
  { title: 'Dagger', type: ItemType.Defensive, cardType: CardType.A },
  { title: 'Grenade Rounds', type: ItemType.Ammunition, cardType: CardType.A },
  { title: 'Kerosene Container', type: ItemType.Item, cardType: CardType.A },
  { title: 'Magnum Bullets', type: ItemType.Ammunition, cardType: CardType.A },
  { title: 'MO Disk', type: ItemType.Item, cardType: CardType.A },
  { title: 'Red Herb', type: ItemType.Item, cardType: CardType.A },
  { title: 'Shotgun Shells', type: ItemType.Ammunition, cardType: CardType.A },
  { title: 'Stone & Metal Object', type: ItemType.Item, cardType: CardType.A },
  { title: 'Stun Gun', type: ItemType.Defensive, cardType: CardType.A },
  { title: 'Yellow Gemstone', type: ItemType.Item, cardType: CardType.A },

  // B type
  { title: '003 Key', type: ItemType.Key, specialId: 1, cardType: CardType.B },
  { title: 'Acid Rounds', type: ItemType.Ammunition, cardType: CardType.B },
  { title: 'Aqua Ring Key', type: ItemType.Key, cardType: CardType.B },
  {
    title: 'Assault Shotgun',
    type: ItemType.Weapon,
    ammunition: 6,
    specialId: 2,
    cardType: CardType.B,
  },
  { title: 'Broken Shotgun', type: ItemType.Weapon, cardType: CardType.B },
  { title: 'Charged Battery', type: ItemType.Item, cardType: CardType.B },
  { title: 'Crank', type: ItemType.Item, cardType: CardType.B },
  { title: 'Emblem Key', type: ItemType.Key, cardType: CardType.B },
  {
    title: 'Flame Thrower',
    type: ItemType.Weapon,
    ammunition: 6,
    specialId: 2,
    cardType: CardType.B,
  },
  { title: 'Fuel Capsule', type: ItemType.Item, cardType: CardType.B },
  { title: 'Golden Emblem', type: ItemType.Item, cardType: CardType.B },
  { title: 'Grenade Launcher', type: ItemType.Weapon, ammunition: 6, cardType: CardType.B },
  { title: 'Helmet Key', type: ItemType.Key, cardType: CardType.B },
  { title: 'Imitation Key', type: ItemType.Key, cardType: CardType.B },
  { title: 'Incendiary Rounds', type: ItemType.Ammunition, cardType: CardType.B },
  { title: 'Insect Spray', type: ItemType.Item, cardType: CardType.B },
  { title: 'Magnum', type: ItemType.Weapon, ammunition: 6, specialId: 4, cardType: CardType.B },
  { title: 'Metal Object', type: ItemType.Item, cardType: CardType.B },
  { title: 'Moon File', type: ItemType.Item, cardType: CardType.B },
  { title: 'Moon Tome', type: ItemType.Item, cardType: CardType.B },
  { title: 'Old Key', type: ItemType.Key, cardType: CardType.B },
  { title: 'Power Key', type: ItemType.Key, cardType: CardType.B },
  {
    title: 'Rocket Launcher',
    type: ItemType.Weapon,
    ammunition: 6,
    specialId: 2,
    cardType: CardType.B,
  },
  { title: 'Self-Defence Gun', type: ItemType.Defensive, cardType: CardType.B },
  { title: 'Shotgun', type: ItemType.Weapon, ammunition: 6, specialId: 2, cardType: CardType.B },
  { title: 'Solution', type: ItemType.Item, cardType: CardType.B },
  { title: 'Star File', type: ItemType.Item, cardType: CardType.B },
  { title: 'Star Tome', type: ItemType.Item, cardType: CardType.B },
  { title: 'Sun File', type: ItemType.Item, cardType: CardType.B },
  { title: 'Sun Tome', type: ItemType.Item, cardType: CardType.B },
  { title: 'Unprinted Book', type: ItemType.Item, cardType: CardType.B },
  { title: 'V-Jolt', type: ItemType.Item, cardType: CardType.B },
  { title: 'Wind Crest', type: ItemType.Item, cardType: CardType.B },
  { title: 'Wooden Emblem', type: ItemType.Item, cardType: CardType.B },

  // C type
  { title: 'Armour Key', type: ItemType.Key, cardType: CardType.C },
  { title: 'Battery', type: ItemType.Item, cardType: CardType.C },
  { title: 'Death Mask', type: ItemType.Item, cardType: CardType.C },
  { title: 'Dog Whistle', type: ItemType.Item, cardType: CardType.C },
  { title: 'Eagle Medallion', type: ItemType.Item, cardType: CardType.C },
  { title: 'Herbicide', type: ItemType.Item, cardType: CardType.C },
  { title: 'Music Notes', type: ItemType.Item, cardType: CardType.C },
  { title: 'Shield Key', type: ItemType.Key, cardType: CardType.C },
  { title: 'Stone Ring', type: ItemType.Item, cardType: CardType.C },
  { title: 'Sword Key', type: ItemType.Key, cardType: CardType.C },
  { title: 'Wolf Medallion', type: ItemType.Item, cardType: CardType.C },
];
