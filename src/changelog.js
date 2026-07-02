export const APP_VERSION = "0.7a4-fix1";
export const APP_CHANGELOG = [
{
  version: "0.7a4-fix1",
  changes: [
    "Version Changes panel now starts collapsed and expands on tap."
  ]
},{
  version: "0.7a4",
  changes: [
    "Added configurable Quick Match card count from 1 to 15 cards per player.",
    "Added configurable Time Attack duration from 1 to 20 minutes.",
    "Quick Match and Time Attack now open animated settings panels from the Home screen.",
    "Added helper text and automatic limit correction for match setting inputs."
  ]
},{
  version: "0.7a3",
  changes: [
    "Added European Nations deck.",
    "Added educational country info with capital, landmark and cultural fact.",
    "Added European Nations option to the deck selector.",
    "Updated card rendering to support optional info text.",
    "Updated value formatting for population and life expectancy."
  ]
},{
  version: "0.7a2",
  changes: [
    "Renamed Space Giants to Cosmic Legends.",
    "Rebuilt the space deck with planets, moons and stars only.",
    "Changed Cosmic Legends attributes to Diameter, Gravity, Temperature and Moons.",
    "Changed deck selection on Home screen from buttons to dropdown."
  ]
  },{
  version: "0.7a1",
  changes: [
    "Added multi-deck architecture.",
    "Added Space Giants deck with 30 cards.",
    "Added deck selection on Home screen.",
    "Deck titles now change dynamically during gameplay.",
    "Game attributes are now deck-specific instead of globally defined."
  ]
  },{
  version: "0.6a3",
  changes: [
    "Restored Yperatou label above the Performance Legends title.",
    "Added version changelog panel on the Home screen.",
    "Latest version changes now appear first."
  ]
  },
  {
    version: "0.6a2",
    changes: [
      "Debug card order panel now stays open during Time Attack countdown.",
      "Player 2 / Bot turn panel now uses opponent red styling.",
      "Restored version tracking for testing."
    ]
  },
  {
    version: "0.6a",
    changes: [
      "Added Time Attack mode with 3 minute countdown.",
      "Timer appears in the header and turns red in the final 30 seconds.",
      "Time Attack uses full deck shuffling.",
      "Quick Match changed to 7 vs 7 cards."
    ]
  },
  {
    version: "0.4",
    changes: [
      "Added Human vs Human mode.",
      "Added handoff screen between players.",
      "Added player names in setup and game UI."
    ]
  },
  {
    version: "0.3",
    changes: [
      "Bot keeps the turn after winning a round.",
      "Result screen appears after bot attribute selection.",
      "Winner takes cards in deterministic order."
    ]
  }
];
