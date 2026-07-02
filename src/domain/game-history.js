import { playerPairKey } from "./players.js";

export const GAME_STATUSES = ["active", "paused", "completed", "abandoned", "superseded"];

export function gameUniquenessKey(deckId, identities = []) {
  return `${deckId}::${playerPairKey(identities)}`;
}

export function scoreSnapshot(state) {
  return {
    player1Cards: state.p.length,
    player2Cards: state.b.length,
    pendingCards: state.pending.length
  };
}

export function matchSnapshot(state, cloneStateValue) {
  return {
    p: cloneStateValue(state.p),
    b: cloneStateValue(state.b),
    pending: cloneStateValue(state.pending),
    round: cloneStateValue(state.round),
    log: cloneStateValue(state.log),
    currentTurn: state.currentTurn,
    screen: state.screen,
    timeLeft: state.timeLeft,
    timeExpired: state.timeExpired,
    score: scoreSnapshot(state)
  };
}

export function currentGameBase({ state, deck, status, now, cloneStateValue }) {
  return {
    id: state.currentGameId,
    status,
    statusUpdatedAt: now,
    startedAt: state.currentGameStartedAt,
    lastSavedAt: now,
    deckId: deck.id,
    deckTitle: deck.title,
    mode: state.mode,
    matchType: state.matchType,
    uniquenessKey: gameUniquenessKey(deck.id, state.playerIdentities),
    players: cloneStateValue(state.playerIdentities),
    playerNames: [state.player1Name, state.player2Name],
    snapshot: matchSnapshot(state, cloneStateValue)
  };
}

export function activeGameRecord({ state, deck, startedAt, cloneStateValue }) {
  return {
    ...currentGameBase({
      state,
      deck,
      status: "active",
      now: startedAt,
      cloneStateValue
    }),
    startedAt,
    createdAt: startedAt
  };
}

export function activeGameSnapshotUpdate({ game, state, deck, now, cloneStateValue }) {
  return {
    ...game,
    ...currentGameBase({
      state,
      deck,
      status: "active",
      now,
      cloneStateValue
    }),
    createdAt: game.createdAt || game.startedAt || state.currentGameStartedAt
  };
}

export function gameStatusUpdate({ game, state, deck, status, extra = {}, now, cloneStateValue }) {
  return {
    ...game,
    ...currentGameBase({
      state,
      deck,
      status,
      now,
      cloneStateValue
    }),
    ...extra,
    createdAt: game.createdAt || game.startedAt || state.currentGameStartedAt,
    status,
    statusUpdatedAt: now,
    lastSavedAt: now
  };
}

export function findConflictingPausedGame(games, currentGameId, uniquenessKey) {
  return games.find(game => (
    game.id !== currentGameId
    && game.status === "paused"
    && game.uniquenessKey === uniquenessKey
  )) || null;
}

export function canResumeGame(game) {
  return game?.status === "paused" || game?.status === "active";
}

export function statusLabel(status) {
  return {
    active: "Σε εξέλιξη",
    paused: "Σε παύση",
    completed: "Ολοκληρώθηκε",
    abandoned: "Εγκαταλείφθηκε",
    superseded: "Αντικαταστάθηκε"
  }[status] || status;
}

export function statusClass(status) {
  return {
    active: "bg-sky-500 text-white",
    paused: "bg-amber-500 text-slate-950",
    completed: "bg-emerald-500 text-slate-950",
    abandoned: "bg-slate-600 text-white",
    superseded: "bg-purple-500 text-white"
  }[status] || "bg-slate-600 text-white";
}
