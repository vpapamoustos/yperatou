import { APP_VERSION, APP_CHANGELOG } from "./src/changelog.js";
import { getDeck, getDeckAttrs, getDefaultDeck, listDecks } from "./src/domain/decks.js";
import {
  botIdentity,
  canPauseIdentities,
  findProfileById,
  firstProfileId,
  playerDisplayName as getPlayerDisplayName,
  playerIdentity as getPlayerIdentity,
  playerPairKey,
  profileDisplayLabel
} from "./src/domain/players.js";
import { S } from "./src/state.js";
import { gameHistoryStore } from "./src/storage/game-history-store.js";
import { profileStore } from "./src/storage/profile-store.js";
import { actionValue, escapeHtml, formatDateTime, readActionValue } from "./src/ui/html.js";
import { iconCards, iconList, iconRefresh, iconUsers } from "./src/ui/icons.js";

let ACTIVE_DECK = getDefaultDeck();

function attrs() {
  return getDeckAttrs(ACTIVE_DECK);
}
const app = document.getElementById("app");

function scrollToGameTop() {
  requestAnimationFrame(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

function gameId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();

  return `game-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function nowIso() {
  return new Date().toISOString();
}

function isGameScreen() {
  return ["game", "result", "handoff", "over", "pauseConfirm"].includes(S.screen);
}

function screenTitle() {
  const titles = {
    homeMenu: "Υπερατού Game",
    newGame: "Νέο παιχνίδι",
    gameHistory: "Ιστορικό παιχνιδιών",
    profiles: "Προφίλ παικτών",
    versionChanges: "Version Changes"
  };

  return isGameScreen() ? ACTIVE_DECK.title : titles[S.screen] || "Υπερατού Game";
}

function clearProfileFeedback() {
  S.profileMessage = "";
  S.editingProfileId = "";
  S.editingProfileName = "";
  S.editingProfileValue = "";
  S.editingProfileEmail = "";
}

function navigate(screen) {
  const leavingProfileContext = ["profiles", "newGame"].includes(S.screen)
    && !["profiles", "newGame"].includes(screen);

  if (screen === "homeMenu" || leavingProfileContext) {
    clearProfileFeedback();
  }

  S.screen = screen;
  render();
}

function backButton() {
  return `
    <button
      onclick="navigate('homeMenu')"
      class="mb-4 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-bold text-slate-300"
    >
      Πίσω
    </button>
  `;
}

function cloneStateValue(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadProfiles() {
  S.profiles = profileStore.list();

  if (S.profiles.length > 0) {
    if (!findProfileById(S.profiles, S.player1ProfileId)) S.player1ProfileId = firstProfileId(S.profiles);
    if (!findProfileById(S.profiles, S.player2ProfileId)) S.player2ProfileId = firstProfileId(S.profiles);
    if (S.player1SetupMode === "guest" && S.player1GuestName === "Παίκτης 1") {
      S.player1SetupMode = "profile";
    }
    if (S.player2SetupMode === "guest" && S.player2GuestName === "Παίκτης 2") {
      S.player2SetupMode = "profile";
    }
  }
}

loadProfiles();

function loadGameHistory() {
  S.gameHistory = gameHistoryStore.attachProfileIds(S.profiles);
}

loadGameHistory();

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

function clampInt(value, min, max, fallback) {
  const parsed = Number.parseInt(value, 10);
  const safeValue = Number.isFinite(parsed) ? parsed : fallback;

  return Math.min(max, Math.max(min, safeValue));
}

function maxQuickCardsPerPlayer() {
  return Math.min(15, Math.floor(ACTIVE_DECK.cards.length / 2));
}

function quickCardsPerPlayer() {
  return clampInt(S.quickCardsPerPlayer, 1, maxQuickCardsPerPlayer(), 7);
}

function timeAttackMinutes() {
  return clampInt(S.timeAttackMinutes, 1, 20, 3);
}

function timeAttackSeconds() {
  return timeAttackMinutes() * 60;
}

function clampNumberInput(input, min, max, fallback, allowEmpty = false) {
  if (allowEmpty && input.value === "") return fallback;

  const value = clampInt(input.value, min, max, fallback);

  input.value = value;

  return value;
}

function applyHomeSettings() {
  const quickInput = document.getElementById("quickCardsPerPlayer");
  const timeInput = document.getElementById("timeAttackMinutes");

  S.quickCardsPerPlayer = quickCardsPerPlayer();
  S.timeAttackMinutes = timeAttackMinutes();

  if (quickInput) {
    S.quickCardsPerPlayer = clampNumberInput(
      quickInput,
      1,
      maxQuickCardsPerPlayer(),
      S.quickCardsPerPlayer
    );
  }

  if (timeInput) {
    S.timeAttackMinutes = clampNumberInput(timeInput, 1, 20, S.timeAttackMinutes);
  }
}

function clampQuickCardsInput(input, allowEmpty = false) {
  S.quickCardsPerPlayer = clampNumberInput(
    input,
    1,
    maxQuickCardsPerPlayer(),
    quickCardsPerPlayer(),
    allowEmpty
  );
}

function clampTimeAttackInput(input, allowEmpty = false) {
  S.timeAttackMinutes = clampNumberInput(input, 1, 20, timeAttackMinutes(), allowEmpty);
}

function profileOptions(selectedId) {
  if (S.profiles.length === 0) {
    return `<option value="">Δεν υπάρχουν αποθηκευμένα προφίλ</option>`;
  }

  return S.profiles.map(profile => `
    <option value="${escapeHtml(profile.id)}" ${profile.id === selectedId ? "selected" : ""}>
      ${escapeHtml(profileDisplayLabel(profile))}
    </option>
  `).join("");
}

function ensurePlayerProfileSelection(playerNumber) {
  const profileKey = `player${playerNumber}ProfileId`;
  const modeKey = `player${playerNumber}SetupMode`;

  if (S.profiles.length === 0 && S[modeKey] !== "create") {
    S[modeKey] = "guest";
    S[profileKey] = "";
    return;
  }

  if (!findProfileById(S.profiles, S[profileKey])) {
    S[profileKey] = firstProfileId(S.profiles);
  }
}

function playerDisplayName(playerNumber) {
  const modeKey = `player${playerNumber}SetupMode`;
  const profileKey = `player${playerNumber}ProfileId`;
  const guestKey = `player${playerNumber}GuestName`;

  return getPlayerDisplayName(
    playerNumber,
    {
      mode: S[modeKey],
      profileId: S[profileKey],
      guestName: S[guestKey]
    },
    S.profiles
  );
}

function playerIdentity(playerNumber) {
  const modeKey = `player${playerNumber}SetupMode`;
  const profileKey = `player${playerNumber}ProfileId`;
  const guestKey = `player${playerNumber}GuestName`;

  return getPlayerIdentity(
    playerNumber,
    {
      mode: S[modeKey],
      profileId: S[profileKey],
      guestName: S[guestKey]
    },
    S.profiles
  );
}

function resolvePlayerIdentities() {
  const player1Identity = playerIdentity(1);
  const player2Identity = S.mode === "human"
    ? playerIdentity(2)
    : botIdentity();

  S.playerIdentities = [player1Identity, player2Identity];
}

function playerSetupPanel(playerNumber) {
  ensurePlayerProfileSelection(playerNumber);

  const modeKey = `player${playerNumber}SetupMode`;
  const profileKey = `player${playerNumber}ProfileId`;
  const guestKey = `player${playerNumber}GuestName`;
  const newProfileKey = `player${playerNumber}NewProfileName`;
  const newProfileEmailKey = `player${playerNumber}NewProfileEmail`;
  const isProfileMode = S[modeKey] === "profile";
  const isCreateMode = S[modeKey] === "create";
  const isGuestMode = S[modeKey] === "guest";
  const label = `Παίκτης ${playerNumber}`;

  return `
    <div class="mb-5 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
      <label class="mb-2 block text-sm font-bold text-slate-300">
        ${label}
      </label>

      <div class="grid gap-3">
        <button
          onclick="setPlayerSetupMode(${playerNumber}, 'profile')"
          ${S.profiles.length === 0 ? "disabled" : ""}
          class="rounded-2xl px-4 py-3 font-black disabled:border disabled:border-slate-800 disabled:bg-slate-900 disabled:text-slate-600 ${
            isProfileMode
              ? "bg-amber-500 text-slate-950"
              : "border border-slate-700 bg-slate-800 text-white"
          }"
        >
          Χρήση προφίλ
        </button>

        <button
          onclick="toggleCreateProfile(${playerNumber})"
          class="rounded-2xl px-4 py-3 font-black ${
            isCreateMode
              ? "bg-amber-500 text-slate-950"
              : "border border-amber-500 bg-slate-950 text-amber-400"
          }"
        >
          Δημιουργία προφίλ
        </button>

        <button
          onclick="setPlayerSetupMode(${playerNumber}, 'guest')"
          class="rounded-2xl px-4 py-3 font-black ${
            isGuestMode
              ? "bg-amber-500 text-slate-950"
              : "border border-slate-700 bg-slate-800 text-white"
          }"
        >
          Παιχνίδι ως επισκέπτης
        </button>
      </div>

      ${
        isProfileMode
          ? `
            <select
              onchange="selectPlayerProfile(${playerNumber}, this.value)"
              class="mt-3 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 font-bold text-white outline-none focus:border-amber-400"
            >
              ${profileOptions(S[profileKey])}
            </select>

            <p class="mt-3 text-xs font-bold text-slate-400">
              Επιλεγμένο προφίλ: ${escapeHtml(profileDisplayLabel(findProfileById(S.profiles, S[profileKey])))}
            </p>
          `
          : ""
      }

      ${
        isGuestMode
          ? `
            <input
              value="${escapeHtml(S[guestKey])}"
              oninput="setGuestName(${playerNumber}, this.value)"
              class="mt-3 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
            />
          `
          : ""
      }

      ${
        isCreateMode
          ? `
            <div class="mt-3 rounded-2xl border border-slate-700 bg-slate-900 p-4">
              <label class="mb-2 block text-sm font-bold text-slate-300">
                Όνομα νέου προφίλ
              </label>

              <input
                value="${escapeHtml(S[newProfileKey])}"
                oninput="setNewProfileName(${playerNumber}, this.value)"
                class="mb-3 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />

              <label class="mb-2 block text-sm font-bold text-slate-300">
                Email (προαιρετικό)
              </label>

              <input
                value="${escapeHtml(S[newProfileEmailKey])}"
                oninput="setNewProfileEmail(${playerNumber}, this.value)"
                class="mb-3 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />

              <button
                onclick="saveNewProfile(${playerNumber})"
                class="w-full rounded-2xl bg-amber-500 px-4 py-3 font-black text-slate-950"
              >
                Αποθήκευση προφίλ
              </button>
            </div>
          `
          : ""
      }

      ${
        S.profileMessage
          ? `
            <p class="mt-3 text-xs font-bold text-amber-300">
              ${escapeHtml(S.profileMessage)}
            </p>
          `
          : ""
      }
    </div>
  `;
}

function applyPlayerNames() {
  resolvePlayerIdentities();
  S.player1Name = escapeHtml(playerDisplayName(1));
  S.player2Name = S.mode === "human"
    ? escapeHtml(playerDisplayName(2))
    : "Υπολογιστής";
}

function gameUniquenessKey(identities = S.playerIdentities) {
  return `${ACTIVE_DECK.id}::${playerPairKey(identities)}`;
}

function scoreSnapshot() {
  return {
    player1Cards: S.p.length,
    player2Cards: S.b.length,
    pendingCards: S.pending.length
  };
}

function matchSnapshot() {
  return {
    p: cloneStateValue(S.p),
    b: cloneStateValue(S.b),
    pending: cloneStateValue(S.pending),
    round: cloneStateValue(S.round),
    log: cloneStateValue(S.log),
    currentTurn: S.currentTurn,
    screen: S.screen,
    timeLeft: S.timeLeft,
    timeExpired: S.timeExpired,
    score: scoreSnapshot()
  };
}

function currentGameBase(status) {
  const now = nowIso();

  return {
    id: S.currentGameId,
    status,
    statusUpdatedAt: now,
    startedAt: S.currentGameStartedAt,
    lastSavedAt: now,
    deckId: ACTIVE_DECK.id,
    deckTitle: ACTIVE_DECK.title,
    mode: S.mode,
    matchType: S.matchType,
    uniquenessKey: gameUniquenessKey(),
    players: cloneStateValue(S.playerIdentities),
    playerNames: [S.player1Name, S.player2Name],
    snapshot: matchSnapshot()
  };
}

function syncGameHistory() {
  S.gameHistory = gameHistoryStore.list();
}

function createActiveGameRecord() {
  const startedAt = nowIso();

  S.currentGameId = gameId();
  S.currentGameStartedAt = startedAt;

  gameHistoryStore.upsert({
    ...currentGameBase("active"),
    startedAt,
    createdAt: startedAt
  });

  syncGameHistory();
}

function saveActiveGameSnapshot() {
  if (!S.currentGameId) return;

  gameHistoryStore.update(S.currentGameId, game => ({
    ...game,
    ...currentGameBase("active"),
    createdAt: game.createdAt || game.startedAt || S.currentGameStartedAt
  }));

  syncGameHistory();
}

function updateCurrentGameStatus(status, extra = {}) {
  if (!S.currentGameId) return;

  const statusTime = nowIso();

  gameHistoryStore.update(S.currentGameId, game => ({
    ...game,
    ...currentGameBase(status),
    ...extra,
    createdAt: game.createdAt || game.startedAt || S.currentGameStartedAt,
    status,
    statusUpdatedAt: statusTime,
    lastSavedAt: statusTime
  }));

  syncGameHistory();
}

function canPauseCurrentGame() {
  if (!S.currentGameId) return false;

  return canPauseIdentities(S.playerIdentities, S.mode);
}

function conflictingPausedGame() {
  const key = gameUniquenessKey();

  return gameHistoryStore
    .list()
    .find(game => (
      game.id !== S.currentGameId
      && game.status === "paused"
      && game.uniquenessKey === key
    ));
}

function exitMatch() {
  stopTimer();
  updateCurrentGameStatus("abandoned", { endedAt: nowIso() });
  clearProfileFeedback();
  S.currentGameId = null;
  S.currentGameStartedAt = null;
  S.screen = "homeMenu";
  render();
}

function returnToHomeMenu() {
  stopTimer();
  clearProfileFeedback();
  S.currentGameId = null;
  S.currentGameStartedAt = null;
  S.screen = "homeMenu";
  render();
}

function completeCurrentGame() {
  const game = gameHistoryStore.find(S.currentGameId);

  if (!game || game.status === "completed") return;

  updateCurrentGameStatus("completed", { endedAt: nowIso() });
}

function pauseCurrentGame() {
  if (!canPauseCurrentGame()) return;

  stopTimer();

  const conflict = conflictingPausedGame();

  if (conflict) {
    S.pendingPauseGameId = conflict.id;
    S.pauseReturnScreen = S.screen;
    S.screen = "pauseConfirm";
    render();
    return;
  }

  savePausedGame();
}

function savePausedGame() {
  updateCurrentGameStatus("paused", { pausedAt: nowIso() });
  S.currentGameId = null;
  S.currentGameStartedAt = null;
  S.pendingPauseGameId = null;
  S.historyMessage = "Το παιχνίδι αποθηκεύτηκε σε παύση.";
  S.screen = "homeMenu";
  render();
}

function confirmReplacePausedGame() {
  if (S.pendingPauseGameId) {
    gameHistoryStore.update(S.pendingPauseGameId, game => ({
      ...game,
      status: "superseded",
      statusUpdatedAt: nowIso(),
      supersededAt: nowIso()
    }));
  }

  savePausedGame();
}

function cancelReplacePausedGame() {
  S.pendingPauseGameId = null;
  S.screen = S.pauseReturnScreen || "game";

  render();
  startTimer();
}

function resumeGame(id) {
  const game = gameHistoryStore.find(id);

  if (!game || !["active", "paused"].includes(game.status)) return;

  stopTimer();

  ACTIVE_DECK = getDeck(game.deckId, ACTIVE_DECK.id);
  S.currentGameId = game.id;
  S.currentGameStartedAt = game.startedAt;
  S.mode = game.mode;
  S.matchType = game.matchType;
  S.playerIdentities = cloneStateValue(game.players || []);
  S.player1Name = escapeHtml(game.playerNames?.[0] || game.players?.[0]?.name || "Player 1");
  S.player2Name = escapeHtml(game.playerNames?.[1] || game.players?.[1]?.name || "Player 2");

  const snapshot = game.snapshot || {};

  S.p = cloneStateValue(snapshot.p || []);
  S.b = cloneStateValue(snapshot.b || []);
  S.pending = cloneStateValue(snapshot.pending || []);
  S.round = cloneStateValue(snapshot.round || null);
  S.log = cloneStateValue(snapshot.log || []);
  S.currentTurn = snapshot.currentTurn || "player1";
  S.timeLeft = snapshot.timeLeft ?? null;
  S.timeExpired = Boolean(snapshot.timeExpired);
  S.screen = ["game", "result", "handoff"].includes(snapshot.screen)
    ? snapshot.screen
    : "game";
  S.historyMessage = "";

  gameHistoryStore.update(game.id, savedGame => ({
    ...savedGame,
    status: "active",
    statusUpdatedAt: nowIso(),
    resumedAt: nowIso(),
    lastSavedAt: nowIso()
  }));
  syncGameHistory();
  saveActiveGameSnapshot();

  render();
  startTimer();
}

function startHomeMatch(type) {
  applyPlayerNames();
  applyHomeSettings();
  startMatch(S.mode, type);
}

function setMatchSettingsPanel(type, isOpen) {
  const stateKey = type === "quick" ? "quickSettingsOpen" : "timeSettingsOpen";
  const panelId = type === "quick" ? "quickMatchSettings" : "timeAttackSettings";
  const buttonId = type === "quick" ? "quickMatchToggle" : "timeAttackToggle";
  const panel = document.getElementById(panelId);
  const button = document.getElementById(buttonId);

  S[stateKey] = isOpen;
  panel?.classList.toggle("is-open", isOpen);
  button?.setAttribute("aria-expanded", String(isOpen));
}

function toggleMatchSettings(type) {
  applyHomeSettings();

  if (type === "quick") {
    setMatchSettingsPanel("quick", !S.quickSettingsOpen);
    return;
  }

  setMatchSettingsPanel("time", !S.timeSettingsOpen);
}

function setGameMode(mode) {
  S.mode = mode;

  if (mode === "bot") {
    S.player2Name = "Υπολογιστής";
  }

  render();
}

function setPlayerSetupMode(playerNumber, mode) {
  S[`player${playerNumber}SetupMode`] = mode;

  if (mode === "profile") {
    ensurePlayerProfileSelection(playerNumber);
  }

  render();
}

function selectPlayerProfile(playerNumber, profileId) {
  S[`player${playerNumber}ProfileId`] = profileId;
  S[`player${playerNumber}SetupMode`] = "profile";
  render();
}

function setGuestName(playerNumber, name) {
  S[`player${playerNumber}GuestName`] = name;
}

function toggleCreateProfile(playerNumber) {
  S[`player${playerNumber}SetupMode`] = "create";
  S.profileMessage = "";
  render();
}

function setNewProfileName(playerNumber, name) {
  S[`player${playerNumber}NewProfileName`] = name;
}

function setNewProfileEmail(playerNumber, email) {
  S[`player${playerNumber}NewProfileEmail`] = email;
}

function saveNewProfile(playerNumber) {
  const newProfileKey = `player${playerNumber}NewProfileName`;
  const newProfileEmailKey = `player${playerNumber}NewProfileEmail`;
  const result = profileStore.create(S[newProfileKey], S[newProfileEmailKey]);

  if (!result.ok) {
    S.profileMessage = result.message;
    render();
    return;
  }

  S.profiles = result.profiles;
  S[`player${playerNumber}ProfileId`] = result.profileId;
  S[`player${playerNumber}SetupMode`] = "profile";
  S[newProfileKey] = "";
  S[newProfileEmailKey] = "";
  S.profileMessage = `Το προφίλ "${result.profileName}" δημιουργήθηκε.`;
  render();
}

function setProfileManagerName(name) {
  S.profileManagerName = name;
}

function setProfileManagerEmail(email) {
  S.profileManagerEmail = email;
}

function createManagedProfile() {
  const result = profileStore.create(S.profileManagerName, S.profileManagerEmail);

  if (!result.ok) {
    S.profileMessage = result.message;
    render();
    return;
  }

  S.profiles = result.profiles;
  S.profileManagerName = "";
  S.profileManagerEmail = "";
  S.profileMessage = `Το προφίλ "${result.profileName}" δημιουργήθηκε.`;
  render();
}

function startEditProfile(profileId) {
  profileId = readActionValue(profileId);
  const profile = findProfileById(S.profiles, profileId);

  if (!profile) return;

  S.editingProfileId = profile.id;
  S.editingProfileName = profile.name;
  S.editingProfileValue = profile.name;
  S.editingProfileEmail = profile.email || "";
  S.profileMessage = "";
  render();
}

function setEditingProfileValue(name) {
  S.editingProfileValue = name;
}

function setEditingProfileEmail(email) {
  S.editingProfileEmail = email;
}

function cancelEditProfile() {
  S.editingProfileId = "";
  S.editingProfileName = "";
  S.editingProfileValue = "";
  S.editingProfileEmail = "";
  S.profileMessage = "";
  render();
}

function saveProfileEdit() {
  const currentProfile = findProfileById(S.profiles, S.editingProfileId);
  const currentName = S.editingProfileName;
  const result = profileStore.update(S.editingProfileId, {
    name: S.editingProfileValue,
    email: S.editingProfileEmail
  });

  if (!result.ok) {
    S.profileMessage = result.message;
    render();
    return;
  }

  S.profiles = result.profiles;

  gameHistoryStore.updateProfile(result.profileId, {
    currentName: currentProfile?.name || currentName,
    name: result.profileName,
    email: result.profile.email
  });
  syncGameHistory();

  S.editingProfileId = "";
  S.editingProfileName = "";
  S.editingProfileValue = "";
  S.editingProfileEmail = "";
  S.profileMessage = `Το προφίλ μετονομάστηκε σε "${result.profileName}".`;
  render();
}

function deleteManagedProfile(profileId) {
  profileId = readActionValue(profileId);
  const profile = findProfileById(S.profiles, profileId);

  if (!profile) return;

  if (!confirm(`Να διαγραφεί το προφίλ "${profile.name}" και το σχετικό ιστορικό παιχνιδιών;`)) {
    return;
  }

  const result = profileStore.delete(profileId);

  if (!result.ok) {
    S.profileMessage = result.message;
    render();
    return;
  }

  S.profiles = result.profiles;
  S.gameHistory = gameHistoryStore.deleteByProfile(profileId, profile.name);

  if (S.player1ProfileId === profileId) S.player1ProfileId = firstProfileId(S.profiles);
  if (S.player2ProfileId === profileId) S.player2ProfileId = firstProfileId(S.profiles);

  if (S.profiles.length === 0) {
    S.player1SetupMode = "guest";
    S.player2SetupMode = "guest";
  }

  S.editingProfileId = "";
  S.editingProfileName = "";
  S.editingProfileValue = "";
  S.editingProfileEmail = "";
  S.profileMessage = `Το προφίλ "${profile.name}" διαγράφηκε.`;
  render();
}

function startTimer(reset = false) {
  stopTimer();

  if (S.matchType !== "time") return;

  if (reset || S.timeLeft === null) {
    S.timeLeft = timeAttackSeconds();
  }

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
      ? quickCardsPerPlayer() * 2
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

  S.timeLeft = type === "time" ? timeAttackSeconds() : null;
  S.timeExpired = false;
  S.historyMessage = "";

  createActiveGameRecord();

  render();
  startTimer(true);
}

function h() {
  const showTimer = S.matchType === "time" && isGameScreen();
  const timerIsDanger = showTimer && S.timeLeft <= 30;
  const title = screenTitle();

  return `
    <header class="mb-3">
      <div class="mb-3 flex items-center justify-between gap-3">

        <div>
          ${
            isGameScreen()
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
        isGameScreen()
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
    <details class="mt-5 rounded-[2rem] border border-slate-800 bg-slate-900/60 p-5">
      <summary class="cursor-pointer font-black">
        Version Changes
      </summary>

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
    </details>
  `;
}

function matchControls() {
  return `
    <div class="grid gap-3">
      ${
        canPauseCurrentGame()
          ? `
            <button
              onclick="pauseCurrentGame()"
              class="w-full rounded-2xl bg-amber-500 px-4 py-3 text-sm font-black text-slate-950"
            >
              Pause Game
            </button>
          `
          : ""
      }

      <button
        onclick="exitMatch()"
        class="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-bold text-slate-300"
      >
        Exit Match
      </button>
    </div>
  `;
}

function rulesPanel() {
  return `
    <section class="mt-5 rounded-[2rem] border border-slate-800 bg-slate-900/60 p-5">
      <h3 class="font-black">Κανόνες</h3>
      <p class="mt-2 text-sm text-slate-400">
        1. Διάλεξε χαρακτηριστικό όταν είναι η σειρά σου.<br>
        2. Ο νικητής του γύρου παίζει στον επόμενο γύρο.<br>
        3. Σε ισοπαλία οι κάρτες πάνε στο pending pile και ο επόμενος νικητής τα παίρνει όλα.
      </p>
    </section>
  `;
}

function statusLabel(status) {
  const labels = {
    active: "Σε εξέλιξη",
    paused: "Σε παύση",
    completed: "Ολοκληρώθηκε",
    abandoned: "Εγκαταλείφθηκε",
    superseded: "Αντικαταστάθηκε"
  };

  return labels[status] || status;
}

function statusClass(status) {
  const classes = {
    active: "bg-sky-500 text-white",
    paused: "bg-amber-500 text-slate-950",
    completed: "bg-emerald-500 text-slate-950",
    abandoned: "bg-slate-600 text-white",
    superseded: "bg-purple-500 text-white"
  };

  return classes[status] || "bg-slate-600 text-white";
}

function playerIdentityText(identity) {
  const typeLabels = {
    profile: "profile",
    guest: "guest",
    bot: "bot"
  };

  return `${escapeHtml(identity.name)} (${typeLabels[identity.type] || identity.type})`;
}

function historyPlayerNames(games) {
  return [...new Set(games
    .flatMap(game => game.players || [])
    .map(player => player.name)
    .filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, "el-GR"));
}

function optionHtml(value, label, selectedValue) {
  return `
    <option value="${escapeHtml(value)}" ${value === selectedValue ? "selected" : ""}>
      ${escapeHtml(label)}
    </option>
  `;
}

function filteredGameHistory(games) {
  return games.filter(game => {
    const matchesPlayer = S.historyPlayerFilter === "all"
      || (game.players || []).some(player => player.name === S.historyPlayerFilter);
    const matchesStatus = S.historyStatusFilter === "all"
      || game.status === S.historyStatusFilter;
    const matchesDeck = S.historyDeckFilter === "all"
      || game.deckId === S.historyDeckFilter;

    return matchesPlayer && matchesStatus && matchesDeck;
  });
}

function setHistoryFilter(filterName, value) {
  S[filterName] = value;
  render();
}

function clearHistoryFilters() {
  S.historyPlayerFilter = "all";
  S.historyStatusFilter = "all";
  S.historyDeckFilter = "all";
  render();
}

function gameHistory() {
  const games = gameHistoryStore.list();
  const filteredGames = filteredGameHistory(games);
  const playerOptions = [
    optionHtml("all", "Όλοι οι παίκτες", S.historyPlayerFilter),
    ...historyPlayerNames(games).map(name => optionHtml(name, name, S.historyPlayerFilter))
  ].join("");
  const statusOptions = [
    optionHtml("all", "Όλες οι καταστάσεις", S.historyStatusFilter),
    ...["active", "paused", "completed", "abandoned", "superseded"]
      .map(status => optionHtml(status, statusLabel(status), S.historyStatusFilter))
  ].join("");
  const deckOptions = [
    optionHtml("all", "Όλα τα decks", S.historyDeckFilter),
    ...listDecks().map(deck => optionHtml(deck.id, deck.title, S.historyDeckFilter))
  ].join("");

  app.innerHTML = h() + `
    ${backButton()}

    <section class="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-5">
      <div class="mb-4 flex items-center justify-between gap-3">
        <h2 class="text-xl font-black">Game History</h2>

        <button
          onclick="clearHistoryFilters()"
          class="grid h-10 w-10 place-items-center rounded-2xl border border-slate-700 bg-slate-950 text-amber-400"
          title="Clear filters"
        >
          ${iconRefresh("h-5 w-5")}
        </button>
      </div>

      ${
        S.historyMessage
          ? `
            <p class="mt-4 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-3 text-sm font-bold text-amber-300">
              ${escapeHtml(S.historyMessage)}
            </p>
          `
          : ""
      }

      <div class="grid gap-3">
        <select
          onchange="setHistoryFilter('historyPlayerFilter', this.value)"
          class="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 font-bold text-white outline-none focus:border-amber-400"
        >
          ${playerOptions}
        </select>

        <select
          onchange="setHistoryFilter('historyStatusFilter', this.value)"
          class="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 font-bold text-white outline-none focus:border-amber-400"
        >
          ${statusOptions}
        </select>

        <select
          onchange="setHistoryFilter('historyDeckFilter', this.value)"
          class="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 font-bold text-white outline-none focus:border-amber-400"
        >
          ${deckOptions}
        </select>
      </div>

      <div class="mt-4 grid gap-4">
        ${
          games.length === 0
            ? `
              <p class="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-400">
                Δεν υπάρχει ιστορικό παιχνιδιών ακόμα.
              </p>
            `
            : filteredGames.length === 0
              ? `
                <p class="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-400">
                  Δεν βρέθηκαν παιχνίδια για τα επιλεγμένα φίλτρα.
                </p>
              `
              : filteredGames.map(gameHistoryCard).join("")
        }
      </div>
    </section>
  `;
}

function gameHistoryCard(game) {
  const score = game.snapshot?.score || {};
  const players = game.players || [];
  const canResume = game.status === "paused" || game.status === "active";

  return `
    <div class="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
      <div class="mb-3 flex items-start justify-between gap-3">
        <div>
          <p class="text-sm font-black text-amber-400">
            ${escapeHtml(game.deckTitle || game.deckId)} · ${escapeHtml(game.matchType)}
          </p>
          <p class="mt-1 text-xs text-slate-400">
            ${players.map(playerIdentityText).join(" vs ")}
          </p>
        </div>

        <span class="rounded-full px-3 py-1 text-[10px] font-black ${statusClass(game.status)}">
          ${statusLabel(game.status)}
        </span>
      </div>

      <div class="grid grid-cols-3 gap-2 text-center text-xs">
        <div class="rounded-xl bg-emerald-500/10 p-2 text-emerald-300">
          <p>${escapeHtml(players[0]?.name || "P1")}</p>
          <p class="text-lg font-black">${score.player1Cards ?? 0}</p>
        </div>

        <div class="rounded-xl bg-amber-500/10 p-2 text-amber-300">
          <p>Pending</p>
          <p class="text-lg font-black">${score.pendingCards ?? 0}</p>
        </div>

        <div class="rounded-xl bg-rose-500/10 p-2 text-rose-300">
          <p>${escapeHtml(players[1]?.name || "P2")}</p>
          <p class="text-lg font-black">${score.player2Cards ?? 0}</p>
        </div>
      </div>

      <p class="mt-3 text-xs text-slate-500">
        Έναρξη: ${formatDateTime(game.startedAt)}
      </p>
      <p class="mt-1 text-xs text-slate-500">
        Τελευταία αποθήκευση: ${formatDateTime(game.lastSavedAt)}
      </p>

      ${
        canResume
          ? `
            <button
              onclick="resumeGame('${game.id}')"
              class="mt-4 w-full rounded-2xl bg-amber-500 px-4 py-3 font-black text-slate-950"
            >
              Resume
            </button>
          `
          : ""
      }
    </div>
  `;
}

function pauseConfirm() {
  const conflict = gameHistoryStore.find(S.pendingPauseGameId);

  app.innerHTML = h() + `
    <section class="rounded-[2rem] border border-slate-800 bg-slate-900 p-6 text-center">
      <p class="text-xs uppercase tracking-[.35em] text-amber-400">
        Pause Game
      </p>

      <h2 class="mt-3 text-3xl font-black">
        Υπάρχει ήδη παιχνίδι σε παύση
      </h2>

      <p class="mt-3 text-sm text-slate-400">
        Υπάρχει ήδη αποθηκευμένο παιχνίδι για αυτόν τον συνδυασμό παικτών και deck.
        Θέλεις να το αντικαταστήσεις με το τρέχον παιχνίδι;
      </p>

      ${
        conflict
          ? `
            <div class="mt-5 rounded-2xl border border-slate-700 bg-slate-950 p-4 text-left text-sm text-slate-300">
              <p class="font-black text-amber-400">${escapeHtml(conflict.deckTitle || conflict.deckId)}</p>
              <p class="mt-1">${(conflict.players || []).map(playerIdentityText).join(" vs ")}</p>
              <p class="mt-1 text-xs text-slate-500">Παύση: ${formatDateTime(conflict.pausedAt || conflict.lastSavedAt)}</p>
            </div>
          `
          : ""
      }

      <button
        onclick="confirmReplacePausedGame()"
        class="mt-6 w-full rounded-2xl bg-amber-500 px-4 py-4 font-black text-slate-950"
      >
        Ναι, αντικατάσταση
      </button>

      <button
        onclick="cancelReplacePausedGame()"
        class="mt-3 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-4 font-black"
      >
        Όχι, συνέχεια παιχνιδιού
      </button>
    </section>
  `;
}

function profiles() {
  app.innerHTML = h() + `
    ${backButton()}

    <section class="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-5">
      <h2 class="mb-4 text-xl font-black">Προφίλ παικτών</h2>

      <div class="rounded-2xl border border-slate-700 bg-slate-950 p-4">
        <label class="mb-2 block text-sm font-bold text-slate-300">
          Νέο προφίλ
        </label>

        <input
          value="${escapeHtml(S.profileManagerName)}"
          oninput="setProfileManagerName(this.value)"
          class="mb-3 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
        />

        <label class="mb-2 block text-sm font-bold text-slate-300">
          Email (προαιρετικό)
        </label>

        <input
          value="${escapeHtml(S.profileManagerEmail)}"
          oninput="setProfileManagerEmail(this.value)"
          class="mb-3 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
        />

        <button
          onclick="createManagedProfile()"
          class="w-full rounded-2xl bg-amber-500 px-4 py-3 font-black text-slate-950"
        >
          Δημιουργία προφίλ
        </button>
      </div>

      ${
        S.profileMessage
          ? `
            <p class="mt-4 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-3 text-sm font-bold text-amber-300">
              ${escapeHtml(S.profileMessage)}
            </p>
          `
          : ""
      }

      <div class="mt-4 grid gap-3">
        ${
          S.profiles.length === 0
            ? `
              <p class="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-400">
                Δεν υπάρχουν αποθηκευμένα προφίλ.
              </p>
            `
            : S.profiles.map(profile => `
              <div class="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                ${
                  S.editingProfileId === profile.id
                    ? `
                      <label class="mb-2 block text-sm font-bold text-slate-300">
                        Όνομα προφίλ
                      </label>

                      <input
                        value="${escapeHtml(S.editingProfileValue)}"
                        oninput="setEditingProfileValue(this.value)"
                        class="mb-3 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
                      />

                      <label class="mb-2 block text-sm font-bold text-slate-300">
                        Email (προαιρετικό)
                      </label>

                      <input
                        value="${escapeHtml(S.editingProfileEmail)}"
                        oninput="setEditingProfileEmail(this.value)"
                        class="mb-3 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
                      />

                      <div class="grid grid-cols-2 gap-3">
                        <button
                          onclick="saveProfileEdit()"
                          class="rounded-2xl bg-amber-500 px-4 py-3 font-black text-slate-950"
                        >
                          Save
                        </button>

                        <button
                          onclick="cancelEditProfile()"
                          class="rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 font-black"
                        >
                          Cancel
                        </button>
                      </div>
                    `
                    : `
                      <div class="flex items-center justify-between gap-3">
                        <div>
                          <p class="font-black text-amber-400">${escapeHtml(profile.name)}</p>
                          <p class="mt-1 text-xs font-bold text-slate-500">
                            ${profile.email ? escapeHtml(profile.email) : `ID: ${escapeHtml(profile.id.slice(0, 8))}`}
                          </p>
                        </div>

                        <div class="flex gap-2">
                          <button
                            onclick="startEditProfile('${actionValue(profile.id)}')"
                            class="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-black"
                          >
                            Edit
                          </button>

                          <button
                            onclick="deleteManagedProfile('${actionValue(profile.id)}')"
                            class="rounded-xl border border-rose-500/50 bg-rose-500/10 px-3 py-2 text-xs font-black text-rose-300"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    `
                }
              </div>
            `).join("")
        }
      </div>
    </section>
  `;
}

function versionChanges() {
  app.innerHTML = h() + `
    ${backButton()}

    <section class="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-5">
      <h2 class="mb-4 text-xl font-black">Version Changes</h2>

      <div class="grid gap-4">
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

function homeMenu() {
  app.innerHTML = h() + `
    <section class="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-5">
      <div class="grid grid-cols-2 gap-3">
        <button
          onclick="navigate('newGame')"
          class="flex aspect-square flex-col items-center justify-center gap-4 rounded-2xl bg-amber-500 p-4 text-center font-black text-slate-950"
        >
          <span class="grid h-16 w-16 place-items-center rounded-2xl bg-slate-950/10">
            ${iconCards("h-10 w-10")}
          </span>
          <span class="text-sm leading-tight">Νέο παιχνίδι</span>
        </button>

        <button
          onclick="navigate('gameHistory')"
          class="flex aspect-square flex-col items-center justify-center gap-4 rounded-2xl border border-slate-700 bg-slate-800 p-4 text-center font-black"
        >
          <span class="grid h-16 w-16 place-items-center rounded-2xl border border-amber-500/40 bg-slate-950 text-amber-400">
            ${iconList("h-10 w-10")}
          </span>
          <span class="text-sm leading-tight">Ιστορικό παιχνιδιών</span>
        </button>

        <button
          onclick="navigate('profiles')"
          class="flex aspect-square flex-col items-center justify-center gap-4 rounded-2xl border border-slate-700 bg-slate-800 p-4 text-center font-black"
        >
          <span class="grid h-16 w-16 place-items-center rounded-2xl border border-amber-500/40 bg-slate-950 text-amber-400">
            ${iconUsers("h-10 w-10")}
          </span>
          <span class="text-sm leading-tight">Διαχείριση προφίλ</span>
        </button>

        <button
          onclick="navigate('versionChanges')"
          class="flex aspect-square flex-col items-center justify-center gap-4 rounded-2xl border border-slate-700 bg-slate-800 p-4 text-center font-black"
        >
          <span class="grid h-16 w-16 place-items-center rounded-2xl border border-amber-500/40 bg-slate-950 text-amber-400">
            ${iconRefresh("h-10 w-10")}
          </span>
          <span class="text-sm leading-tight">Version Changes</span>
        </button>
      </div>
    </section>
  `;
}

function newGame() {
  const quickCards = quickCardsPerPlayer();
  const timeMinutes = timeAttackMinutes();
  const deckOptions = listDecks().map(deck => `
    <option value="${deck.id}" ${ACTIVE_DECK.id === deck.id ? "selected" : ""}>
      ${escapeHtml(deck.title)}
    </option>
  `).join("");

  app.innerHTML = h() + `
    ${backButton()}

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
          ${deckOptions}
        </select>
      </div>

      <div class="mb-5">
        <label class="mb-2 block text-sm font-bold text-slate-300">
          Είδος παιχνιδιού
        </label>

        <div class="grid grid-cols-2 gap-3">
          <button
            onclick="setGameMode('bot')"
            class="rounded-2xl px-4 py-3 font-black ${
              S.mode === "bot"
                ? "bg-amber-500 text-slate-950"
                : "border border-slate-700 bg-slate-800 text-white"
            }"
          >
            1 Παίκτης
          </button>

          <button
            onclick="setGameMode('human')"
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

      ${playerSetupPanel(1)}

      ${
        S.mode === "human"
          ? playerSetupPanel(2)
          : ""
      }

      <div class="grid gap-3">
        <div>
          <button
            id="quickMatchToggle"
            onclick="toggleMatchSettings('quick')"
            aria-expanded="${S.quickSettingsOpen}"
            class="w-full rounded-2xl bg-amber-500 px-5 py-4 font-black text-slate-950"
          >
            Quick Match
          </button>

          <div
            id="quickMatchSettings"
            class="match-settings ${S.quickSettingsOpen ? "is-open" : ""}"
          >
            <div class="mt-3 rounded-2xl border border-amber-500 bg-slate-950 p-4">
              <label
                for="quickCardsPerPlayer"
                class="mb-2 block text-sm font-bold text-slate-300"
              >
                Κάρτες ανά παίκτη
              </label>

              <input
                id="quickCardsPerPlayer"
                type="number"
                min="1"
                max="${maxQuickCardsPerPlayer()}"
                step="1"
                value="${quickCards}"
                oninput="clampQuickCardsInput(this, true)"
                onchange="clampQuickCardsInput(this)"
                onblur="clampQuickCardsInput(this)"
                class="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 font-bold outline-none focus:border-amber-400"
              />

              <p class="mt-2 mb-3 text-xs font-bold text-slate-400">
                Επίλεξε από 1 έως ${maxQuickCardsPerPlayer()} κάρτες
              </p>

              <button
                onclick="startHomeMatch('quick')"
                class="w-full rounded-2xl bg-amber-500 px-5 py-4 font-black text-slate-950"
              >
                Έναρξη Quick Match
              </button>
            </div>
          </div>
        </div>

        <button
          onclick="startHomeMatch('classic')"
          class="rounded-2xl border border-slate-700 bg-slate-800 px-5 py-4 font-black"
        >
          Classic Match · 15 vs 15
        </button>

        <div>
          <button
            id="timeAttackToggle"
            onclick="toggleMatchSettings('time')"
            aria-expanded="${S.timeSettingsOpen}"
            class="w-full rounded-2xl border border-amber-500 bg-slate-950 px-5 py-4 font-black text-amber-400"
          >
            Time Attack
          </button>

          <div
            id="timeAttackSettings"
            class="match-settings ${S.timeSettingsOpen ? "is-open" : ""}"
          >
            <div class="mt-3 rounded-2xl border border-amber-500 bg-slate-950 p-4">
              <label
                for="timeAttackMinutes"
                class="mb-2 block text-sm font-bold text-slate-300"
              >
                Λεπτά παιχνιδιού
              </label>

              <input
                id="timeAttackMinutes"
                type="number"
                min="1"
                max="20"
                step="1"
                value="${timeMinutes}"
                oninput="clampTimeAttackInput(this, true)"
                onchange="clampTimeAttackInput(this)"
                onblur="clampTimeAttackInput(this)"
                class="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 font-bold outline-none focus:border-amber-400"
              />

              <p class="mt-2 mb-3 text-xs font-bold text-slate-400">
                Επίλεξε από 1 έως 20 λεπτά
              </p>

              <button
                onclick="startHomeMatch('time')"
                class="w-full rounded-2xl border border-amber-500 bg-slate-950 px-5 py-4 font-black text-amber-400"
              >
                Έναρξη Time Attack
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    ${rulesPanel()}
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

      ${matchControls()}
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

    <div class="mt-4">
      ${matchControls()}
    </div>
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

  saveActiveGameSnapshot();
  render();
  scrollToGameTop();
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

  saveActiveGameSnapshot();
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
        : "Υπολογιστής";

  const txt =
    r.w === "tie"
      ? "Ισοπαλία"
      : `Κερδίζει ο/η ${winnerName}`;

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
        Επόμενη κάρτα
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
        Παιχνίδι 2 παικτών
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
  completeCurrentGame();

  const p1Cards = S.p.length;
  const p2Cards = S.b.length;

  let winnerText = "";

  if (p1Cards > p2Cards) {
    winnerText = `Κέρδισε ο/η ${S.player1Name} !`;
  } else if (p2Cards > p1Cards) {
    winnerText = `Κέρδισε ο/η ${S.player2Name} !`;
  } else {
    winnerText = "Ισοπαλία!";
  }

  app.innerHTML = h() + `
    <section class="rounded-[2rem] border border-slate-800 bg-slate-900 p-6 text-center">
      <p class="text-xs uppercase tracking-[.35em] text-amber-400">
        Τέλος παιχνιδιού
      </p>

      <h2 class="mt-2 text-4xl font-black">
        ${winnerText}
      </h2>

      ${
        S.matchType === "time"
          ? `
            <p class="mt-3 text-sm font-bold text-slate-400">
              Ολοκληρώθηκε το παιχνίδι Time Attack
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
        Παίξε ξανά
      </button>

      <button onclick="returnToHomeMenu()" class="mt-3 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-4 font-black">
        Αρχική σελίδα
      </button>
    </section>
  `;
}

function render() {
  if (S.screen === "homeMenu") homeMenu();
  if (S.screen === "newGame") newGame();
  if (S.screen === "gameHistory") gameHistory();
  if (S.screen === "profiles") profiles();
  if (S.screen === "versionChanges") versionChanges();
  if (S.screen === "game") game();
  if (S.screen === "result") result();
  if (S.screen === "handoff") handoff();
  if (S.screen === "pauseConfirm") pauseConfirm();
  if (S.screen === "over") over();
}

function selectDeck(deckId) {
  ACTIVE_DECK = getDeck(deckId, ACTIVE_DECK.id);
  S.quickCardsPerPlayer = quickCardsPerPlayer();
  render();
}

window.S = S;

window.navigate = navigate;
window.render = render;
window.start = start;
window.startMatch = startMatch;
window.startHomeMatch = startHomeMatch;
window.toggleMatchSettings = toggleMatchSettings;
window.resumeGame = resumeGame;
window.setHistoryFilter = setHistoryFilter;
window.clearHistoryFilters = clearHistoryFilters;
window.pauseCurrentGame = pauseCurrentGame;
window.confirmReplacePausedGame = confirmReplacePausedGame;
window.cancelReplacePausedGame = cancelReplacePausedGame;
window.exitMatch = exitMatch;
window.returnToHomeMenu = returnToHomeMenu;
window.setGameMode = setGameMode;
window.setPlayerSetupMode = setPlayerSetupMode;
window.selectPlayerProfile = selectPlayerProfile;
window.setGuestName = setGuestName;
window.toggleCreateProfile = toggleCreateProfile;
window.setNewProfileName = setNewProfileName;
window.setNewProfileEmail = setNewProfileEmail;
window.saveNewProfile = saveNewProfile;
window.setProfileManagerName = setProfileManagerName;
window.setProfileManagerEmail = setProfileManagerEmail;
window.createManagedProfile = createManagedProfile;
window.startEditProfile = startEditProfile;
window.setEditingProfileValue = setEditingProfileValue;
window.setEditingProfileEmail = setEditingProfileEmail;
window.cancelEditProfile = cancelEditProfile;
window.saveProfileEdit = saveProfileEdit;
window.deleteManagedProfile = deleteManagedProfile;
window.clampQuickCardsInput = clampQuickCardsInput;
window.clampTimeAttackInput = clampTimeAttackInput;
window.pick = pick;
window.cont = cont;
window.botPickRandomAttribute = botPickRandomAttribute;
window.stopTimer = stopTimer;
window.selectDeck = selectDeck;

render();
