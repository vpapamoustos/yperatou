export const QUICK_MATCH_MIN_CARDS = 1;
export const QUICK_MATCH_MAX_CARDS = 15;
export const QUICK_MATCH_DEFAULT_CARDS = 7;
export const TIME_ATTACK_MIN_MINUTES = 1;
export const TIME_ATTACK_MAX_MINUTES = 20;
export const TIME_ATTACK_DEFAULT_MINUTES = 3;

export function clampInt(value, min, max, fallback) {
  const parsed = Number.parseInt(value, 10);
  const safeValue = Number.isFinite(parsed) ? parsed : fallback;

  return Math.min(max, Math.max(min, safeValue));
}

export function maxQuickCardsPerPlayer(deck) {
  return Math.min(QUICK_MATCH_MAX_CARDS, Math.floor(deck.cards.length / 2));
}

export function quickCardsPerPlayer(value, deck) {
  return clampInt(
    value,
    QUICK_MATCH_MIN_CARDS,
    maxQuickCardsPerPlayer(deck),
    QUICK_MATCH_DEFAULT_CARDS
  );
}

export function timeAttackMinutes(value) {
  return clampInt(
    value,
    TIME_ATTACK_MIN_MINUTES,
    TIME_ATTACK_MAX_MINUTES,
    TIME_ATTACK_DEFAULT_MINUTES
  );
}

export function timeAttackSeconds(value) {
  return timeAttackMinutes(value) * 60;
}
