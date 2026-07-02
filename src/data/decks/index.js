import { cosmicLegendsDeck } from "./cosmic-legends.js";
import { europeDeck } from "./europe.js";
import { performanceLegendsDeck } from "./performance-legends.js";

const deckConfigs = {
  performance: {
    source: performanceLegendsDeck,
    attrs: [
      { key: "speed", label: "Μέγιστη ταχύτητα", unit: "km/h", higherWins: true },
      { key: "hp", label: "Ιπποδύναμη", unit: "hp", higherWins: true },
      { key: "accel", label: "0-100", unit: "sec", higherWins: false },
      { key: "value", label: "Αξία αγοράς", unit: "€", higherWins: true }
    ]
  },
  space: {
    source: cosmicLegendsDeck,
    attrs: [
      { key: "diameter", label: "Διάμετρος", unit: "km", higherWins: true },
      { key: "gravity", label: "Βαρύτητα", unit: "m/s²", higherWins: true },
      { key: "temperature", label: "Θερμοκρασία", unit: "°C", higherWins: true },
      { key: "moons", label: "Δορυφόροι", unit: "", higherWins: true }
    ]
  },
  europe: {
    source: europeDeck,
    attrs: [
      { key: "population", label: "Πληθυσμός", unit: "εκ.", higherWins: true },
      { key: "area", label: "Έκταση", unit: "km²", higherWins: true },
      { key: "lifeExpectancy", label: "Προσδόκιμο ζωής", unit: "έτη", higherWins: true },
      { key: "distanceFromGreece", label: "Απόσταση από Αθήνα", unit: "km", higherWins: true }
    ]
  }
};

function toPlayableCard(card) {
  return {
    ...card,
    ...card.attributes,
    country: card.country || card.metadata?.category,
    rarity: card.rarity || card.metadata?.rarity,
    info: card.info || card.descriptionHtml || null
  };
}

function toPlayableDeck(id, config) {
  const activeCards = config.source.cards.filter(card => card.isActive !== false);

  return {
    id,
    name: config.source.name,
    title: config.source.title,
    version: config.source.version,
    description: config.source.description,
    cards: activeCards.map(toPlayableCard),
    attrs: config.attrs
  };
}

export const DECKS = Object.fromEntries(
  Object.entries(deckConfigs).map(([id, config]) => [id, toPlayableDeck(id, config)])
);

export const DECK_LIST = Object.values(DECKS);
