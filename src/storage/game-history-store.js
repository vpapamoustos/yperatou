import { normalizeProfileName } from "./profile-store.js";

const GAME_HISTORY_STORAGE_KEY = "yperatou.gameHistory.v1";

function playerPairKey(identities = []) {
  const pair = identities.map(identity => (
    `${identity.type}:${normalizeProfileName(identity.profileName || identity.name).toLocaleLowerCase("el-GR")}`
  ));

  return pair.sort().join("|");
}

export function gameRecordUniquenessKey(game, identities = game.players || []) {
  return `${game.deckId}::${playerPairKey(identities)}`;
}

export const gameHistoryStore = {
  list() {
    try {
      const savedGames = JSON.parse(localStorage.getItem(GAME_HISTORY_STORAGE_KEY) || "[]");

      if (!Array.isArray(savedGames)) return [];

      return savedGames.filter(game => game && game.id);
    } catch {
      return [];
    }
  },

  save(games) {
    try {
      localStorage.setItem(GAME_HISTORY_STORAGE_KEY, JSON.stringify(games));
      return true;
    } catch {
      return false;
    }
  },

  upsert(game) {
    const games = this.list();
    const existingIndex = games.findIndex(savedGame => savedGame.id === game.id);

    if (existingIndex >= 0) {
      games[existingIndex] = game;
    } else {
      games.unshift(game);
    }

    this.save(games);
    return game;
  },

  update(id, updater) {
    const games = this.list();
    const index = games.findIndex(game => game.id === id);

    if (index < 0) return null;

    const updatedGame = updater(games[index]);
    games[index] = updatedGame;
    this.save(games);

    return updatedGame;
  },

  find(id) {
    return this.list().find(game => game.id === id) || null;
  },

  renameProfile(currentName, nextName) {
    const games = this.list().map(game => {
      const players = (game.players || []).map(player => (
        player.type === "profile" && player.name === currentName
          ? { ...player, name: nextName, profileName: nextName }
          : player
      ));

      return {
        ...game,
        players,
        playerNames: (game.playerNames || []).map(name => (
          name === currentName ? nextName : name
        )),
        uniquenessKey: gameRecordUniquenessKey(game, players)
      };
    });

    this.save(games);
    return games;
  },

  deleteByProfile(name) {
    const games = this.list().filter(game => !(game.players || []).some(player => (
      player.type === "profile" && player.name === name
    )));

    this.save(games);
    return games;
  }
};
