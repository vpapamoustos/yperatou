import { playerPairKey } from "../domain/players.js";

const GAME_HISTORY_STORAGE_KEY = "yperatou.gameHistory.v1";

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

  attachProfileIds(profiles = []) {
    const games = this.list().map(game => {
      const players = (game.players || []).map(player => {
        if (player.type !== "profile" || player.profileId) return player;

        const matches = profiles.filter(profile => profile.name === player.name);

        if (matches.length !== 1) return player;

        return {
          ...player,
          id: matches[0].id,
          profileId: matches[0].id,
          email: matches[0].email || ""
        };
      });

      return {
        ...game,
        players,
        uniquenessKey: gameRecordUniquenessKey(game, players)
      };
    });

    this.save(games);
    return games;
  },

  updateProfile(profileId, updates = {}) {
    const games = this.list().map(game => {
      const players = (game.players || []).map(player => (
        player.type === "profile"
          && (player.profileId === profileId || (!player.profileId && player.name === updates.currentName))
          ? {
              ...player,
              id: profileId,
              profileId,
              name: updates.name,
              profileName: updates.name,
              email: updates.email || ""
            }
          : player
      ));

      return {
        ...game,
        players,
        playerNames: (game.playerNames || []).map(name => (
          name === updates.currentName ? updates.name : name
        )),
        uniquenessKey: gameRecordUniquenessKey(game, players)
      };
    });

    this.save(games);
    return games;
  },

  deleteByProfile(profileId, fallbackName = "") {
    const games = this.list().filter(game => !(game.players || []).some(player => (
      player.type === "profile"
      && (player.profileId === profileId || (!player.profileId && player.name === fallbackName))
    )));

    this.save(games);
    return games;
  }
};
