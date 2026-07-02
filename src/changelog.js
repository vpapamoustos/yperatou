export const APP_VERSION = "0.8a3";
export const APP_CHANGELOG = [
{
  version: "0.8a3",
  changes: [
    "Added profile edit and delete actions to Profile Management.",
    "Profile rename now updates related game history player names and uniqueness keys.",
    "Profile deletion now removes related game history records.",
    "Added a clear filters icon button to Game History.",
    "Updated Home menu icons with larger cards, list, users and refresh symbols."
  ]
},{
  version: "0.8a2-fix1",
  changes: [
    "Updated the Home menu to use square icon cards instead of stacked text buttons."
  ]
},{
  version: "0.8a2",
  changes: [
    "Reworked the Home screen into a central menu hub.",
    "Moved New Game setup into its own screen.",
    "Moved Game History into its own screen.",
    "Added Game History filters for player name, game status and deck.",
    "Added a dedicated Profiles screen for profile listing and creation.",
    "Moved Version Changes into its own screen.",
    "Updated navigation so future Leaderboards, Decks and Settings screens can be added cleanly."
  ]
},{
  version: "0.8a1",
  changes: [
    "Added unified local game history for active, paused, completed, abandoned and superseded games.",
    "Every started game now creates a history record, including guest games.",
    "Added player identity metadata for profile, guest and bot players in game history records.",
    "Added automatic active-game snapshots after round selection and round continuation.",
    "Added Pause Game for profile-only matches against the bot or another profile.",
    "Paused games store deck, match type, player identities, card order, pending pile, round state, turn order, score and Time Attack time left.",
    "Added duplicate paused-game detection per deck and player pairing.",
    "Added an in-app confirmation screen for replacing an existing paused game.",
    "Replaced the Home saved-games idea with a collapsed Game History panel.",
    "Game History shows all statuses and allows Resume for paused and active auto-saved games.",
    "Exit Match now records abandoned games for future leaderboard and history features."
  ]
},{
  version: "0.7a5",
  changes: [
    "Added local player profiles stored in localStorage.",
    "Added profile dropdowns, inline profile creation and guest play for Player 1 and Player 2.",
    "Profile, profile creation and guest setup modes now show only their relevant fields.",
    "Match setup now resolves player identities before starting the game engine.",
    "Profile storage is isolated behind a small service layer for future online persistence."
  ]
},{
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
