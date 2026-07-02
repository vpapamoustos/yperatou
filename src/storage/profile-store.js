const PROFILE_STORAGE_KEY = "yperatou.playerProfiles.v1";

function profileId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();

  return `profile-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function normalizeProfileName(name) {
  return String(name || "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 32);
}

export function normalizeProfileEmail(email) {
  return String(email || "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, "")
    .trim()
    .toLocaleLowerCase("el-GR")
    .slice(0, 120);
}

function isValidProfileEmail(email) {
  return !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeProfileRecord(profile) {
  const now = new Date().toISOString();
  const name = normalizeProfileName(profile?.name ?? profile);
  const email = normalizeProfileEmail(profile?.email);

  if (!name) return null;

  return {
    id: String(profile?.id || profileId()),
    name,
    email,
    createdAt: profile?.createdAt || now,
    updatedAt: profile?.updatedAt || profile?.createdAt || now
  };
}

function sortProfiles(profiles) {
  return [...profiles].sort((a, b) => (
    a.name.localeCompare(b.name, "el-GR") || a.id.localeCompare(b.id, "el-GR")
  ));
}

export const profileStore = {
  list() {
    try {
      const savedProfiles = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) || "[]");

      if (!Array.isArray(savedProfiles)) return [];

      const profiles = savedProfiles
        .map(normalizeProfileRecord)
        .filter(Boolean);

      const migrated = profiles.some((profile, index) => (
        profile.id !== savedProfiles[index]?.id
        || profile.name !== savedProfiles[index]?.name
        || profile.email !== (savedProfiles[index]?.email || "")
        || profile.createdAt !== savedProfiles[index]?.createdAt
        || profile.updatedAt !== savedProfiles[index]?.updatedAt
      ));

      if (migrated) this.save(profiles);

      return sortProfiles(profiles);
    } catch {
      return [];
    }
  },

  save(profiles) {
    try {
      localStorage.setItem(
        PROFILE_STORAGE_KEY,
        JSON.stringify(sortProfiles(profiles).map(normalizeProfileRecord).filter(Boolean))
      );

      return true;
    } catch {
      return false;
    }
  },

  create(name, email = "") {
    const normalizedName = normalizeProfileName(name);
    const normalizedEmail = normalizeProfileEmail(email);

    if (!normalizedName) {
      return { ok: false, message: "Συμπλήρωσε όνομα προφίλ." };
    }

    if (!isValidProfileEmail(normalizedEmail)) {
      return { ok: false, message: "Συμπλήρωσε έγκυρο email ή άφησέ το κενό." };
    }

    const profiles = this.list();
    const now = new Date().toISOString();
    const profile = {
      id: profileId(),
      name: normalizedName,
      email: normalizedEmail,
      createdAt: now,
      updatedAt: now
    };
    const nextProfiles = sortProfiles([...profiles, profile]);

    if (!this.save(nextProfiles)) {
      return { ok: false, message: "Δεν ήταν δυνατή η αποθήκευση του προφίλ." };
    }

    return { ok: true, profile, profileId: profile.id, profileName: profile.name, profiles: nextProfiles };
  },

  update(id, updates = {}) {
    const profiles = this.list();
    const profile = profiles.find(item => item.id === id);

    if (!profile) {
      return { ok: false, message: "Το προφίλ δεν βρέθηκε." };
    }

    const normalizedName = normalizeProfileName(updates.name);
    const normalizedEmail = normalizeProfileEmail(updates.email);

    if (!normalizedName) {
      return { ok: false, message: "Συμπλήρωσε όνομα προφίλ." };
    }

    if (!isValidProfileEmail(normalizedEmail)) {
      return { ok: false, message: "Συμπλήρωσε έγκυρο email ή άφησέ το κενό." };
    }

    const updatedProfile = {
      ...profile,
      name: normalizedName,
      email: normalizedEmail,
      updatedAt: new Date().toISOString()
    };
    const nextProfiles = sortProfiles(profiles.map(item => (
      item.id === id ? updatedProfile : item
    )));

    if (!this.save(nextProfiles)) {
      return { ok: false, message: "Δεν ήταν δυνατή η αποθήκευση του προφίλ." };
    }

    return {
      ok: true,
      profile: updatedProfile,
      profileId: updatedProfile.id,
      profileName: updatedProfile.name,
      profiles: nextProfiles
    };
  },

  delete(id) {
    const profiles = this.list();
    const profile = profiles.find(item => item.id === id);

    if (!profile) {
      return { ok: false, message: "Το προφίλ δεν βρέθηκε." };
    }

    const nextProfiles = profiles.filter(item => item.id !== id);

    if (!this.save(nextProfiles)) {
      return { ok: false, message: "Δεν ήταν δυνατή η διαγραφή του προφίλ." };
    }

    return { ok: true, profile, profiles: nextProfiles };
  }
};
