export const APP_VERSION = "0.8a7";
export const APP_CHANGELOG = [
{
  version: "0.8a7",
  changes: [
    "Extracted game history record builders, snapshots and status update helpers into a dedicated game history domain module.",
    "Moved paused-game conflict detection, resume eligibility and game status display helpers out of the main script.",
    "Extracted Quick Match and Time Attack limit calculations into a dedicated match settings domain module.",
    "Centralized match setting constants for quick match card limits and time attack duration limits.",
    "Reduced main script game-history and match-settings responsibilities in preparation for the next game engine refactor."
  ]
},{
  version: "0.8a6",
  changes: [
    "Added unique IDs to local player profiles while keeping existing localStorage profiles migratable.",
    "Added optional profile email fields for future online account support.",
    "Allowed multiple profiles to share the same display name by using profile IDs for identity checks.",
    "Extracted player identity helpers into a dedicated player domain module.",
    "Updated game history profile references to support profile IDs and safely migrate older name-based records.",
    "Cleared profile feedback messages when leaving profile-related screens so old edit messages do not remain visible.",
    "Updated the Apple touch icon asset."
  ]
},{
  version: "0.8a5",
  changes: [
    "Moved playable deck assembly into the src/data/decks index module.",
    "Changed src/data.js into a lightweight deck export aggregator.",
    "Added a deck list export so deck ordering is owned by the data layer.",
    "Kept the existing game engine compatible with the new deck module structure through a playable deck adapter.",
    "Added smooth scroll-to-top when a round result is shown, so the header, score and result are immediately visible."
  ]
},{
  version: "0.8a4",
  changes: [
    "Extracted profile storage into a dedicated local profile store module.",
    "Extracted game history persistence into a dedicated local game history store module.",
    "Moved shared HTML, action value and date formatting helpers into UI helper modules.",
    "Moved Home menu SVG icons into a dedicated UI icons module.",
    "Added an initial decks domain module for deck lookup, listing and active deck attributes.",
    "Reduced the size of the main script to prepare for future online storage, mobile support and deck-domain refactoring."
  ]
},{
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
