import { normalizeProfileName } from "../storage/profile-store.js";

export function findProfileById(profiles, profileId) {
  return profiles.find(profile => profile.id === profileId) || null;
}

export function firstProfileId(profiles) {
  return profiles[0]?.id || "";
}

export function profileDisplayLabel(profile) {
  if (!profile) return "";

  return profile.email
    ? `${profile.name} · ${profile.email}`
    : `${profile.name} · ID: ${profile.id.slice(0, 8)}`;
}

export function playerDisplayName(playerNumber, setup, profiles) {
  const profile = findProfileById(profiles, setup.profileId);

  if (setup.mode === "profile" && profile) {
    return profile.name;
  }

  return normalizeProfileName(setup.guestName) || `Player ${playerNumber}`;
}

export function profileIdentity(profile) {
  return {
    type: "profile",
    id: profile.id,
    profileId: profile.id,
    name: profile.name,
    profileName: profile.name,
    email: profile.email || ""
  };
}

export function guestIdentity(name) {
  return {
    type: "guest",
    name: normalizeProfileName(name) || "Guest"
  };
}

export function botIdentity() {
  return {
    type: "bot",
    name: "Υπολογιστής"
  };
}

export function playerIdentity(playerNumber, setup, profiles) {
  const profile = findProfileById(profiles, setup.profileId);

  if (setup.mode === "profile" && profile) {
    return profileIdentity(profile);
  }

  return guestIdentity(playerDisplayName(playerNumber, setup, profiles));
}

export function playerIdentityKey(identity) {
  if (identity?.type === "profile" && identity.profileId) {
    return `profile:${identity.profileId}`;
  }

  return `${identity?.type || "unknown"}:${normalizeProfileName(identity?.profileName || identity?.name).toLocaleLowerCase("el-GR")}`;
}

export function playerPairKey(identities = []) {
  return identities.map(playerIdentityKey).sort().join("|");
}

export function canPauseIdentities(identities = [], mode = "bot") {
  const humanPlayers = mode === "human" ? identities : [identities[0]];

  return humanPlayers.every(identity => identity?.type === "profile" && identity.profileId);
}
