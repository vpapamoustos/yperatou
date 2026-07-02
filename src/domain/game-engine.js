export function shuffle(arr) {
  const shuffled = [...arr];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export function dealCards(cards, cardCount) {
  const deck = shuffle(shuffle(cards).slice(0, cardCount));

  return {
    player1Cards: deck.slice(0, cardCount / 2),
    player2Cards: deck.slice(cardCount / 2)
  };
}

export function resolveRound({ attrs, player1Cards, player2Cards, attrKey, selectedBy }) {
  const attr = attrs.find(item => item.key === attrKey);
  const player1Card = player1Cards[0];
  const player2Card = player2Cards[0];
  const player1Value = player1Card[attrKey];
  const player2Value = player2Card[attrKey];

  let winner = "tie";

  if (attr.higherWins) {
    if (player1Value > player2Value) winner = "p";
    else if (player2Value > player1Value) winner = "b";
  } else {
    if (player1Value < player2Value) winner = "p";
    else if (player2Value < player1Value) winner = "b";
  }

  return {
    a: attr,
    pc: player1Card,
    bc: player2Card,
    w: winner,
    selectedBy
  };
}

export function continueRound({ round, player1Cards, player2Cards, pendingCards, log, currentTurn, mode }) {
  const nextPlayer1Cards = [...player1Cards];
  const nextPlayer2Cards = [...player2Cards];
  let nextPendingCards = [...pendingCards];
  const nextLog = [...log];
  const previousTurn = currentTurn;
  const player1Card = nextPlayer1Cards.shift();
  const player2Card = nextPlayer2Cards.shift();
  let nextTurn = "player1";

  if (round.w === "tie") {
    nextPendingCards.push(player1Card, player2Card);
    nextLog.unshift("Ισοπαλία");
    nextTurn = round.selectedBy;
  } else if (round.w === "p") {
    nextPlayer1Cards.push(player1Card, player2Card, ...nextPendingCards);
    nextPendingCards = [];
    nextTurn = "player1";
  } else {
    nextPlayer2Cards.push(player2Card, player1Card, ...nextPendingCards);
    nextPendingCards = [];
    nextTurn = mode === "bot" ? "bot" : "player2";
  }

  return {
    player1Cards: nextPlayer1Cards,
    player2Cards: nextPlayer2Cards,
    pendingCards: nextPendingCards,
    log: nextLog,
    nextTurn,
    turnChanged: previousTurn !== nextTurn
  };
}

export function nextScreenAfterRound({ player1Cards, player2Cards, matchType, timeExpired, mode, turnChanged }) {
  if (player1Cards.length === 0 || player2Cards.length === 0) return "over";
  if (matchType === "time" && timeExpired) return "over";
  if (mode === "human" && turnChanged) return "handoff";

  return "game";
}

export function matchWinnerText(player1Name, player2Name, player1Cards, player2Cards) {
  if (player1Cards.length > player2Cards.length) return `Κέρδισε ο/η ${player1Name} !`;
  if (player2Cards.length > player1Cards.length) return `Κέρδισε ο/η ${player2Name} !`;

  return "Ισοπαλία!";
}
