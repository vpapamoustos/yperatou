import { DECKS } from "../data.js";

export function getDeck(deckId, fallbackDeckId = "europe") {
  return DECKS[deckId] || DECKS[fallbackDeckId];
}

export function listDecks() {
  return Object.values(DECKS);
}

export function getDeckAttrs(deck) {
  return deck.attrs;
}

export function getDefaultDeck() {
  return getDeck("europe");
}
