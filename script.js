import { APP_VERSION, APP_CHANGELOG } from "./src/changelog.js";
import { DECKS } from "./src/data.js";
import { S } from "./src/state.js";

let ACTIVE_DECK = DECKS.europe;

function attrs() {
  return ACTIVE_DECK.attrs;
}

const app = document.getElementById("app");

function money(n) {
  return "€" + Number(n).toLocaleString("el-GR");
}

function fmt(c, a) {
  const v = c[a.key];

  if (a.key === "value") return money(v);
  if (a.key === "accel") return Number(v).toFixed(1) + " " + a.unit;

  if (a.key === "population") {
    return Number(v).toLocaleString("el-GR") + " " + a.unit;
  }

  if (a.key === "lifeExpectancy") {
    return Number(v).toFixed(1).replace(".", ",") + " " + a.unit;
  }

  if (a.key === "gravity") {
    return Number(v).toLocaleString("el-GR") + " " + a.unit;
  }

  if (a.key === "temperature") {
    return Number(v).toLocaleString("el-GR") + " " + a.unit;
  }

  if (a.unit === "") {
    return Number(v).toLocaleString("el-GR");
  }

  return Number(v).toLocaleString("el-GR") + " " + a.unit;
}

function shuffle(arr) {
  const a = [...arr];

  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [a[i], a[j]] = [a[j], a[i]];
  }

  return a;
}

function formatTime(seconds) {
  if (seconds === null) return "";

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function startTimer() {
  stopTimer();

  if (S.matchType !== "time") return;

  S.timeLeft = 180;
  S.timeExpired = false;

  S.timerId = setInterval(() => {
    if (S.screen === "result") return;

    S.timeLeft--;

    if (S.timeLeft <= 0) {
      S.timeLeft = 0;
      S.timeExpired = true;
      stopTimer();
    }

    render();
  }, 1000);
}

function stopTimer() {
  if (S.timerId) {
    clearInterval(S.timerId);
    S.timerId = null;
  }
}

function start(type) {
  startMatch(S.mode, type);
}

function startMatch(mode, type) {
  stopTimer();

  S.mode = mode;
  S.matchType = type;

  const n =
    type === "quick"
      ? 14
      : 30;

  let deck = shuffle(ACTIVE_DECK.cards).slice(0, n);
  deck = shuffle(deck);

  S.p = deck.slice(0, n / 2);
  S.b = deck.slice(n / 2);

  S.pending = [];
  S.round = null;
  S.log = [];

  S.currentTurn = "player1";
  S.screen = "game";

  S.timeLeft = type === "time" ? 180 : null;
  S.timeExpired = false;

  render();
  startTimer();
}

function h() {
  const showTimer = S.matchType === "time" && S.screen !== "home";
  const timerIsDanger = showTimer && S.timeLeft <= 30;
  const title = S.screen === "home" ? "Υπερατού Game" : ACTIVE_DECK.title;

  return `
    <header class="mb-3">
      <div class="mb-3 flex items-center justify-between gap-3">

        <div>
          ${
            S.screen !== "home"
              ? `
                <p class="text-[10px] font-black uppercase tracking-[.25em] text-amber-400">
                  Υπερατού
                </p>
              `
              : ""
          }

          <h1 class="text-xl font-black leading-none">
            ${title}
          </h1>
        </div>

        <div class="flex items-center gap-2">
          ${
            showTimer
              ? `
                <div class="rounded-lg border px-2 py-1 ${
                  timerIsDanger
                    ? "border-red-500 bg-red-500/20 text-red-300"
                    : "border-amber-500 bg-amber-500/10 text-amber-300"
                }">
                  <span class="text-xs font-black">
                    ${formatTime(S.timeLeft)}
                  </span>
                </div>
              `
              : ""
          }

          <div class="rounded-lg border border-slate-700 bg-slate-900 px-2 py-1">
            <span class="text-[10px] font-bold text-amber-400">
              v${APP_VERSION}
            </span>
          </div>
        </div>

      </div>

      ${
        S.screen !== "home"
          ? scoreBar()
          : ""
      }
    </header>
  `;
}

function badge(r) {
  const m = {
    Legendary: "bg-amber-500 text-slate-950",
    Epic: "bg-purple-500",
    Rare: "bg-sky-500",
    Uncommon: "bg-emerald-500",
    Common: "bg-slate-500"
  };

  return `<span class="rounded-full px-3 py-1 text-xs font-black ${m[r]}">${r}</span>`;
}

function card(c, active = true) {
  return `
    <div class="card-shadow overflow-hidden rounded-[2rem] border border-amber-400/40 bg-slate-900">
      <img src="${c.image}" alt="${c.name}" class="h-56 w-full object-cover" />

      <div class="p-5">
        <div class="mb-4 flex items-start justify-between gap-3">
          <div>
            <p class="text-xs uppercase tracking-[.25em] text-amber-300">
              ${c.country || ACTIVE_DECK.title}
            </p>

            <h2 class="text-2xl font-black leading-tight">
              ${c.name}
            </h2>
          </div>

          ${
            c.rarity
              ? badge(c.rarity)
              : ""
          }
        </div>

        ${
          c.info
            ? `
              <div class="mb-4 rounded-2xl border border-slate-700 bg-slate-950/70 p-3">
                <p class="text-sm leading-relaxed text-slate-300">
                  ${c.info}
                </p>
              </div>
            `
            : ""
        }

        <div class="grid gap-2">
          ${attrs().map(a => `
            <button
              ${active ? `onclick="pick('${a.key}')"` : ""}
              class="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-left ${active ? "hover:border-amber-400" : ""}"
            >
              <span class="text-sm font-bold text-slate-300">${a.label}</span>
              <span class="text-lg font-black text-amber-300">${fmt(c, a)}</span>
            </button>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

function scoreBar() {
  const leftName = S.player1Name;
  const rightName = S.player2Name;

  return `
    <section class="mb-4 grid grid-cols-3 gap-2">
      <div class="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-3">
        <p class="text-xs text-emerald-300">${leftName}</p>
        <p class="text-2xl font-black">${S.p.length}</p>
      </div>

      <div class="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-3 text-center">
        <p class="text-xs text-amber-300">Κάρτες σε αναμονή</p>
        <p class="text-2xl font-black">${S.pending.length}</p>
      </div>

      <div class="rounded-2xl border border-rose-400/30 bg-rose-500/10 p-3 text-right">
        <p class="text-xs text-rose-300">${rightName}</p>
        <p class="text-2xl font-black">${S.b.length}</p>
      </div>
    </section>
  `;
}

function debugDeckOrder() {
  const player1Cards = S.p
    .map((card, index) => `
      <li class="flex gap-2 border-b border-slate-800 py-1">
        <span class="w-6 shrink-0 text-slate-500">${index + 1}.</span>
        <span>${card.name}</span>
      </li>
    `)
    .join("");

  const player2Cards = S.b
    .map((card, index) => `
      <li class="flex gap-2 border-b border-slate-800 py-1">
        <span class="w-6 shrink-0 text-slate-500">${index + 1}.</span>
        <span>${card.name}</span>
      </li>
    `)
    .join("");

  return `
    <details
      ${S.debugOpen ? "open" : ""}
      ontoggle="S.debugOpen = this.open"
      class="mb-4 rounded-2xl border border-slate-700 bg-slate-900/80 p-4"
    >
      <summary class="cursor-pointer text-sm font-black text-amber-400">
        Debug: Card order
      </summary>

      <div class="mt-4 grid gap-4 text-sm">
        <div>
          <h3 class="mb-2 font-black text-emerald-300">
            ${S.player1Name} (${S.p.length})
          </h3>

          <ol class="max-h-56 overflow-auto rounded-xl bg-slate-950 p-3 text-slate-300">
            ${player1Cards}
          </ol>
        </div>

        <div>
          <h3 class="mb-2 font-black text-rose-300">
            ${S.player2Name} (${S.b.length})
          </h3>

          <ol class="max-h-56 overflow-auto rounded-xl bg-slate-950 p-3 text-slate-300">
            ${player2Cards}
          </ol>
        </div>
      </div>
    </details>
  `;
}

function changelogPanel() {
  return `
    <section class="mt-5 rounded-[2rem] border border-slate-800 bg-slate-900/60 p-5">
      <h3 class="font-black">Version Changes</h3>

      <div class="mt-4 grid gap-4">
        ${APP_CHANGELOG.map(item => `
          <div class="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
            <p class="mb-2 text-sm font-black text-amber-400">
              v${item.version}
            </p>

            <ul class="list-disc space-y-1 pl-5 text-sm text-slate-400">
              ${item.changes.map(change => `
                <li>${change}</li>
              `).join("")}
            </ul>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function home() {
  app.innerHTML = h() + `
    <section class="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-5">
      <h2 class="mb-4 text-xl font-black">Επιλογές</h2>

      <div class="mb-5">
        <label class="mb-2 block text-sm font-bold text-slate-300">
          Είδος καρτών
        </label>
      
        <select
          onchange="selectDeck(this.value)"
          class="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 font-bold text-white outline-none focus:border-amber-400"
        >
          <option value="europe" ${ACTIVE_DECK.id === "europe" ? "selected" : ""}>Χώρες της Ευρώπης</option>
          <option value="performance" ${ACTIVE_DECK.id === "performance" ? "selected" : ""}>Performance Legends</option>
          <option value="space" ${ACTIVE_DECK.id === "space" ? "selected" : ""}>Cosmic Legends</option>
        </select>
      </div>

      <div class="mb-5">
        <label class="mb-2 block text-sm font-bold text-slate-300">
          Είδος παιχνιδιού
        </label>

        <div class="grid grid-cols-2 gap-3">
          <button
            onclick="S.mode='bot'; S.player2Name='Υπολογιστής'; render()"
            class="rounded-2xl px-4 py-3 font-black ${
              S.mode === "bot"
                ? "bg-amber-500 text-slate-950"
                : "border border-slate-700 bg-slate-800 text-white"
            }"
          >
            1 Παίκτης
          </button>

          <button
            onclick="S.mode='human'; if(S.player2Name==='Υπολογιστής') S.player2Name='Παίκτης 2'; render()"
            class="rounded-2xl px-4 py-3 font-black ${
              S.mode === "human"
                ? "bg-amber-500 text-slate-950"
                : "border border-slate-700 bg-slate-800 text-white"
            }"
          >
            2 Παίκτες
          </button>
        </div>
      </div>

      <label class="mb-2 block text-sm font-bold text-slate-300">
        Όνομα παίκτη 1
      </label>

      <input
        id="p1Name"
        value="${S.player1Name}"
        class="mb-4 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
      />

      ${
        S.mode === "human"
          ? `
            <label class="mb-2 block text-sm font-bold text-slate-300">
              Όνομα παίκτη 2
            </label>

            <input
              id="p2Name"
              value="${S.player2Name}"
              class="mb-4 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
            />
          `
          : ""
      }

      <div class="grid gap-3">
        <button
          onclick="
            S.player1Name=document.getElementById('p1Name').value||'Player 1';
            S.player2Name=S.mode==='human'
              ? (document.getElementById('p2Name').value||'Player 2')
              : 'Υπολογιστής';
            startMatch(S.mode, 'quick');
          "
          class="rounded-2xl bg-amber-500 px-5 py-4 font-black text-slate-950"
        >
          Quick Match · 7 vs 7
        </button>

        <button
          onclick="
            S.player1Name=document.getElementById('p1Name').value||'Player 1';
            S.player2Name=S.mode==='human'
              ? (document.getElementById('p2Name').value||'Player 2')
              : 'Υπολογιστής';
            startMatch(S.mode, 'classic');
          "
          class="rounded-2xl border border-slate-700 bg-slate-800 px-5 py-4 font-black"
        >
          Classic Match · 15 vs 15
        </button>

        <button
          onclick="
            S.player1Name=document.getElementById('p1Name').value||'Player 1';
            S.player2Name=S.mode==='human'
              ? (document.getElementById('p2Name').value||'Player 2')
              : 'Υπολογιστής';
            startMatch(S.mode, 'time');
          "
          class="rounded-2xl border border-amber-500 bg-slate-950 px-5 py-4 font-black text-amber-400"
        >
          Time Attack · 3 min
        </button>
      </div>
    </section>

    <section class="mt-5 rounded-[2rem] border border-slate-800 bg-slate-900/60 p-5">
      <h3 class="font-black">Κανόνες</h3>
      <p class="mt-2 text-sm text-slate-400">
        1. Διάλεξε χαρακτηριστικό όταν είναι η σειρά σου.<br>
        2. Ο νικητής του γύρου παίζει στον επόμενο γύρο.<br>
        3. Σε ισοπαλία οι κάρτες πάνε στο pending pile και ο επόμενος νικητής τα παίρνει όλα.
      </p>
    </section>

    ${changelogPanel()}
  `;
}

function game() {
  if (S.mode === "bot" && S.currentTurn === "bot") {
    app.innerHTML = h() + `
      <section class="mb-4 rounded-3xl border border-rose-400/30 bg-rose-500/10 p-4 text-center">
        <p class="text-sm text-slate-300">Σειρά του υπολογιστή</p>
        <h2 class="mt-1 text-2xl font-black">Ο υπολογιστής επιλέγει χαρακτηριστικό</h2>
        <p class="mt-1 text-sm text-slate-400">Η επιλογή γίνεται τυχαία για το MVP.</p>
      </section>

      ${debugDeckOrder()}

      <div class="mb-8">
        <button
          onclick="botPickRandomAttribute()"
          class="w-full rounded-2xl bg-rose-500 px-4 py-4 font-black text-white"
        >
          Ο υπολογιστής επιλέγει χαρακτηριστικό
        </button>
      </div>

      <button
        onclick="S.screen='home';render()"
        class="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-bold text-slate-300"
      >
        Exit Match
      </button>
    `;
    return;
  }

  const activeDeck =
    S.currentTurn === "player2"
      ? S.b
      : S.p;

  const activeName =
    S.currentTurn === "player2"
      ? S.player2Name
      : S.player1Name;

  app.innerHTML = h() + `
    <section class="mb-4 rounded-3xl ${
      S.currentTurn === "player1"
        ? "border border-emerald-400/30 bg-emerald-500/10"
        : "border border-rose-400/30 bg-rose-500/10"
    } p-4">
      <p class="text-sm text-slate-300">${activeName} είναι η σειρά σου</p>
      <h2 class="mt-1 text-2xl font-black">Διάλεξε χαρακτηριστικό!</h2>
    </section>

    ${debugDeckOrder()}

    ${card(activeDeck[0], true)}

    <button
      onclick="S.screen='home';render()"
      class="mt-4 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-bold text-slate-300"
    >
      Exit Match
    </button>
  `;
}

function pick(k) {
  resolveRound(k, S.currentTurn);
}

function botPickRandomAttribute() {
  const randomAttr = attrs()[Math.floor(Math.random() * attrs().length)];
  resolveRound(randomAttr.key, "bot");
}

function resolveRound(k, selectedBy) {
  const a = attrs().find(x => x.key === k);
  const pc = S.p[0];
  const bc = S.b[0];
  const pv = pc[k];
  const bv = bc[k];

  let w = "tie";

  if (a.higherWins) {
    if (pv > bv) w = "p";
    else if (bv > pv) w = "b";
  } else {
    if (pv < bv) w = "p";
    else if (bv < pv) w = "b";
  }

  S.round = { a, pc, bc, w, selectedBy };
  S.screen = "result";

  render();
}

function cont() {
  const r = S.round;
  const previousTurn = S.currentTurn;

  const pc = S.p.shift();
  const bc = S.b.shift();

  let nextTurn = "player1";

  if (r.w === "tie") {
    S.pending.push(pc, bc);
    S.log.unshift("Ισοπαλία");
    nextTurn = r.selectedBy;

  } else if (r.w === "p") {
    S.p.push(pc, bc, ...S.pending);
    S.pending = [];
    nextTurn = "player1";

  } else {
    S.b.push(bc, pc, ...S.pending);
    S.pending = [];
    nextTurn = S.mode === "bot" ? "bot" : "player2";
  }

  S.round = null;
  S.currentTurn = nextTurn;

  const turnChanged = previousTurn !== nextTurn;

  if (S.p.length === 0 || S.b.length === 0) {
    stopTimer();
    S.screen = "over";
  } else if (S.matchType === "time" && S.timeExpired) {
    stopTimer();
    S.screen = "over";
  } else if (S.mode === "human" && turnChanged) {
    S.screen = "handoff";
  } else {
    S.screen = "game";
  }

  render();
}

function result() {
  const r = S.round;

  const winnerName =
    r.w === "p"
      ? S.player1Name
      : r.w === "b"
        ? S.player2Name
        : null;

  const selectedByName =
    r.selectedBy === "player1"
      ? S.player1Name
      : r.selectedBy === "player2"
        ? S.player2Name
        : "Bot";

  const txt =
    r.w === "tie"
      ? "Ισοπαλία"
      : `${winnerName} wins`;

  const selectedByText = `${selectedByName} selected`;

  app.innerHTML = h() + `
    <section class="mb-4 rounded-3xl border border-amber-400/30 bg-slate-900 p-4 text-center">
      <p class="text-sm text-slate-400">${selectedByText}: <b>${r.a.label}</b></p>
      <h2 class="mt-1 text-3xl font-black">${txt}</h2>
      <p class="mt-1 text-sm text-slate-400">
        ${S.player1Name}: ${fmt(r.pc, r.a)} · ${S.player2Name}: ${fmt(r.bc, r.a)}
      </p>
    </section>

    <div class="mb-8">
      <button onclick="cont()" class="w-full rounded-2xl bg-amber-500 px-4 py-4 font-black text-slate-950">
        Συνέχεια
      </button>
    </div>

    <div class="grid gap-4">
      <div>
        <p class="mb-2 text-sm font-black text-emerald-300">${S.player1Name}</p>
        ${card(r.pc, false)}
      </div>

      <div>
        <p class="mb-2 text-sm font-black text-rose-300">${S.player2Name}</p>
        ${card(r.bc, false)}
      </div>
    </div>
  `;
}

function handoff() {
  const nextPlayerName =
    S.currentTurn === "player2"
      ? S.player2Name
      : S.player1Name;

  app.innerHTML = h() + `
    <section class="rounded-[2rem] border border-slate-800 bg-slate-900 p-6 text-center">
      <p class="text-xs uppercase tracking-[.35em] text-amber-400">
        Human vs Human
      </p>

      <h2 class="mt-3 text-3xl font-black">
        Δώσε τη συσκευή στον/στην ${nextPlayerName}
      </h2>

      <p class="mt-3 text-sm text-slate-400">
        Η επόμενη κάρτα θα εμφανιστεί μόνο όταν πατηθεί συνέχεια.
      </p>

      <button
        onclick="S.screen='game'; render()"
        class="mt-6 w-full rounded-2xl bg-amber-500 px-4 py-4 font-black text-slate-950"
      >
        Είμαι ο/η ${nextPlayerName} - Συνέχεια
      </button>
    </section>
  `;
}

function over() {
  stopTimer();

  const p1Cards = S.p.length;
  const p2Cards = S.b.length;

  let winnerText = "";

  if (p1Cards > p2Cards) {
    winnerText = `${S.player1Name} wins!`;
  } else if (p2Cards > p1Cards) {
    winnerText = `${S.player2Name} wins!`;
  } else {
    winnerText = "Draw!";
  }

  app.innerHTML = h() + `
    <section class="rounded-[2rem] border border-slate-800 bg-slate-900 p-6 text-center">
      <p class="text-xs uppercase tracking-[.35em] text-amber-400">
        Game Over
      </p>

      <h2 class="mt-2 text-4xl font-black">
        ${winnerText}
      </h2>

      ${
        S.matchType === "time"
          ? `
            <p class="mt-3 text-sm font-bold text-slate-400">
              Time Attack finished
            </p>
          `
          : ""
      }

      <div class="mt-6 grid grid-cols-2 gap-3">
        <div class="rounded-2xl bg-emerald-500/10 p-4">
          <p class="text-sm text-emerald-300">${S.player1Name}</p>
          <p class="text-3xl font-black">${p1Cards}</p>
        </div>

        <div class="rounded-2xl bg-rose-500/10 p-4">
          <p class="text-sm text-rose-300">${S.player2Name}</p>
          <p class="text-3xl font-black">${p2Cards}</p>
        </div>
      </div>

      <button onclick="start(S.matchType)" class="mt-6 w-full rounded-2xl bg-amber-500 px-4 py-4 font-black text-slate-950">
        Play Again
      </button>

      <button onclick="stopTimer(); S.screen='home'; render()" class="mt-3 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-4 font-black">
        Home
      </button>
    </section>
  `;
}

function render() {
  if (S.screen === "home") home();
  if (S.screen === "game") game();
  if (S.screen === "result") result();
  if (S.screen === "handoff") handoff();
  if (S.screen === "over") over();
}

function selectDeck(deckId) {
  ACTIVE_DECK = DECKS[deckId];
  render();
}

window.S = S;
window.DECKS = DECKS;

window.render = render;
window.start = start;
window.startMatch = startMatch;
window.pick = pick;
window.cont = cont;
window.botPickRandomAttribute = botPickRandomAttribute;
window.stopTimer = stopTimer;
window.selectDeck = selectDeck;

render();
