const PROFILE_STORAGE_KEY = "yperatou.playerProfiles.v1";

export function normalizeProfileName(name) {
  return String(name || "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 32);
}

export const profileStore = {
  list() {
    try {
      const savedProfiles = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) || "[]");

      if (!Array.isArray(savedProfiles)) return [];

      return savedProfiles
        .map(profile => normalizeProfileName(profile?.name ?? profile))
        .filter(Boolean);
    } catch {
      return [];
    }
  },

  save(profiles) {
    try {
      localStorage.setItem(
        PROFILE_STORAGE_KEY,
        JSON.stringify(profiles.map(name => ({ name })))
      );

      return true;
    } catch {
      return false;
    }
  },

  create(name) {
    const normalizedName = normalizeProfileName(name);

    if (!normalizedName) {
      return { ok: false, message: "Συμπλήρωσε όνομα προφίλ." };
    }

    const profiles = this.list();
    const duplicate = profiles.some(profileName => (
      profileName.toLocaleLowerCase("el-GR") === normalizedName.toLocaleLowerCase("el-GR")
    ));

    if (duplicate) {
      return { ok: false, message: "Υπάρχει ήδη προφίλ με αυτό το όνομα." };
    }

    const nextProfiles = [...profiles, normalizedName].sort((a, b) => (
      a.localeCompare(b, "el-GR")
    ));

    if (!this.save(nextProfiles)) {
      return { ok: false, message: "Δεν ήταν δυνατή η αποθήκευση του προφίλ." };
    }

    return { ok: true, profileName: normalizedName, profiles: nextProfiles };
  },

  rename(currentName, nextName) {
    const normalizedCurrentName = normalizeProfileName(currentName);
    const normalizedNextName = normalizeProfileName(nextName);

    if (!normalizedNextName) {
      return { ok: false, message: "Συμπλήρωσε όνομα προφίλ." };
    }

    const profiles = this.list();

    if (!profiles.includes(normalizedCurrentName)) {
      return { ok: false, message: "Το προφίλ δεν βρέθηκε." };
    }

    const duplicate = profiles.some(profileName => (
      profileName !== normalizedCurrentName
      && profileName.toLocaleLowerCase("el-GR") === normalizedNextName.toLocaleLowerCase("el-GR")
    ));

    if (duplicate) {
      return { ok: false, message: "Υπάρχει ήδη προφίλ με αυτό το όνομα." };
    }

    const nextProfiles = profiles
      .map(profileName => profileName === normalizedCurrentName ? normalizedNextName : profileName)
      .sort((a, b) => a.localeCompare(b, "el-GR"));

    if (!this.save(nextProfiles)) {
      return { ok: false, message: "Δεν ήταν δυνατή η αποθήκευση του προφίλ." };
    }

    return { ok: true, profileName: normalizedNextName, profiles: nextProfiles };
  },

  delete(name) {
    const normalizedName = normalizeProfileName(name);
    const profiles = this.list();
    const nextProfiles = profiles.filter(profileName => profileName !== normalizedName);

    if (nextProfiles.length === profiles.length) {
      return { ok: false, message: "Το προφίλ δεν βρέθηκε." };
    }

    if (!this.save(nextProfiles)) {
      return { ok: false, message: "Δεν ήταν δυνατή η διαγραφή του προφίλ." };
    }

    return { ok: true, profiles: nextProfiles };
  }
};
