/* ============================================================
   CHRONICLES OF OAKHAVEN — FIREBASE GOOGLE SIGN-IN & CLOUD SAVE
   Syncs all 5 Hero Save Slots to Cloud Firestore (Free Spark Plan)
   under users/{uid}/saves/slots, with seamless offline localStorage.
   ============================================================ */
(function (global) {
  "use strict";

  const SAVE_SLOTS_KEY = "chronicles_of_oakhaven_slots_v1";
  const MAX_SAVE_SLOTS = 5;

  let auth = null;
  let db = null;
  let currentUser = null;
  let isConfigured = false;
  let syncStatus = "offline"; // "offline" | "syncing" | "synced" | "error"
  let onSlotsUpdatedCb = null;

  function hasValidConfig() {
    const cfg = global.OAKHAVEN_FIREBASE_CONFIG;
    return !!(cfg && cfg.apiKey && cfg.projectId && cfg.authDomain);
  }

  function initFirebase() {
    if (!hasValidConfig() || typeof global.firebase === "undefined") {
      isConfigured = false;
      renderCloudUi();
      return;
    }
    try {
      if (!global.firebase.apps.length) {
        global.firebase.initializeApp(global.OAKHAVEN_FIREBASE_CONFIG);
      }
      auth = global.firebase.auth();
      db = global.firebase.firestore();
      isConfigured = true;

      auth.onAuthStateChanged(async (user) => {
        currentUser = user || null;
        renderCloudUi();
        if (currentUser) {
          await syncSlotsFromCloud();
        }
      });
    } catch (err) {
      console.error("Firebase init error:", err);
      isConfigured = false;
      renderCloudUi();
    }
  }

  function readLocalSlots() {
    const slots = [null, null, null, null, null];
    try {
      const raw = localStorage.getItem(SAVE_SLOTS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          for (let i = 0; i < MAX_SAVE_SLOTS; i++) slots[i] = parsed[i] || null;
        }
      }
    } catch (_) {}
    return slots;
  }

  function parseTime(s) {
    const t = s ? Date.parse(s) : 0;
    return isNaN(t) ? 0 : t;
  }

  async function syncSlotsFromCloud() {
    if (!db || !currentUser) return;
    syncStatus = "syncing";
    renderCloudUi();
    try {
      const ref = db.collection("users").doc(currentUser.uid).collection("saves").doc("slots");
      const snap = await ref.get();
      const localSlots = readLocalSlots();

      if (snap.exists && Array.isArray(snap.data().slots)) {
        const cloudSlots = snap.data().slots;
        const merged = [null, null, null, null, null];
        let localHadNewer = false;

        for (let i = 0; i < MAX_SAVE_SLOTS; i++) {
          const loc = localSlots[i] || null;
          const cld = cloudSlots[i] || null;
          if (loc && !cld) {
            merged[i] = loc;
            localHadNewer = true;
          } else if (cld && !loc) {
            merged[i] = cld;
          } else if (loc && cld) {
            if (parseTime(loc.savedAt) > parseTime(cld.savedAt)) {
              merged[i] = loc;
              localHadNewer = true;
            } else {
              merged[i] = cld;
            }
          }
        }
        localStorage.setItem(SAVE_SLOTS_KEY, JSON.stringify(merged));
        if (localHadNewer) {
          await ref.set({ slots: merged, updatedAt: new Date().toISOString() }, { merge: true });
        }
      } else {
        // First time cloud user: upload any existing local slots
        const hasAny = localSlots.some(Boolean);
        if (hasAny) {
          await ref.set({ slots: localSlots, updatedAt: new Date().toISOString() }, { merge: true });
        }
      }

      syncStatus = "synced";
      renderCloudUi();
      if (typeof onSlotsUpdatedCb === "function") onSlotsUpdatedCb();
    } catch (err) {
      console.error("Cloud sync error:", err);
      syncStatus = "error";
      renderCloudUi();
    }
  }

  async function pushSlotsToCloud(slots) {
    if (!db || !currentUser) return;
    syncStatus = "syncing";
    renderCloudUi();
    try {
      const ref = db.collection("users").doc(currentUser.uid).collection("saves").doc("slots");
      await ref.set({
        slots: slots.slice(0, MAX_SAVE_SLOTS),
        updatedAt: new Date().toISOString()
      }, { merge: true });
      syncStatus = "synced";
      renderCloudUi();
    } catch (err) {
      console.error("Cloud push error:", err);
      syncStatus = "error";
      renderCloudUi();
    }
  }

  async function signInWithGoogle() {
    if (!isConfigured || !auth) {
      alert("Firebase Cloud Sync is not configured yet.\n\nAdd your free Firebase Web App config to js/firebase_config.js and enable Google Sign-In + Firestore in the Firebase Console.");
      return;
    }
    const provider = new global.firebase.auth.GoogleAuthProvider();
    try {
      await auth.signInWithPopup(provider);
    } catch (err) {
      // Fallback for mobile browsers that block popups
      if (err && (err.code === "auth/popup-blocked" || err.code === "auth/operation-not-supported-in-this-environment")) {
        await auth.signInWithRedirect(provider);
      } else if (err && err.code !== "auth/popup-closed-by-user") {
        console.error("Google Sign-In error:", err);
        alert("Google Sign-In failed: " + (err.message || err.code));
      }
    }
  }

  async function signOut() {
    if (!auth) return;
    try {
      await auth.signOut();
      syncStatus = "offline";
      renderCloudUi();
    } catch (err) {
      console.error("Sign out error:", err);
    }
  }

  function renderCloudUi() {
    const containers = [
      document.getElementById("launch-cloud-bar"),
      document.getElementById("menu-cloud-bar")
    ].filter(Boolean);

    containers.forEach(el => {
      if (!isConfigured) {
        el.innerHTML = `
          <div class="flex items-center justify-between gap-2 text-[11px] text-stone-400">
            <span>☁️ Cloud Save (Google): <strong class="text-amber-300/90">Setup Needed</strong></span>
            <button data-cloud="signin" class="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 border border-amber-600/40 text-[10px] font-semibold text-amber-200">Configure</button>
          </div>`;
      } else if (currentUser) {
        const statusTxt = syncStatus === "syncing" ? "Syncing..." : syncStatus === "error" ? "Sync Error" : "☁️ Cloud Synced";
        const statusCls = syncStatus === "error" ? "text-rose-300" : "text-emerald-300";
        el.innerHTML = `
          <div class="flex items-center justify-between gap-2 text-xs">
            <div class="flex items-center gap-2 min-w-0">
              ${currentUser.photoURL ? `<img src="${currentUser.photoURL}" alt="" class="w-6 h-6 rounded-full border border-amber-500/60 shrink-0" />` : ""}
              <div class="min-w-0 text-left">
                <div class="font-semibold text-amber-100 truncate text-[11px]">${currentUser.displayName || currentUser.email}</div>
                <div class="text-[10px] ${statusCls}">${statusTxt}</div>
              </div>
            </div>
            <button data-cloud="signout" class="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-[10px] text-stone-300 shrink-0">Sign Out</button>
          </div>`;
      } else {
        el.innerHTML = `
          <div class="flex items-center justify-between gap-2">
            <div class="text-left">
              <div class="text-xs font-semibold text-amber-200">☁️ Cloud Save (Free)</div>
              <div class="text-[10px] text-stone-400">Sign in with Google to play on any device</div>
            </div>
            <button data-cloud="signin" class="px-3 py-1.5 rounded-lg bg-white hover:bg-stone-100 text-stone-900 text-xs font-bold shadow shrink-0 flex items-center gap-1.5">
              <span>G</span> Sign in
            </button>
          </div>`;
      }

      const inBtn = el.querySelector('[data-cloud="signin"]');
      const outBtn = el.querySelector('[data-cloud="signout"]');
      if (inBtn) inBtn.onclick = signInWithGoogle;
      if (outBtn) outBtn.onclick = signOut;
    });
  }

  global.OAKHAVEN_CLOUD = {
    signInWithGoogle,
    signOut,
    syncSlotsFromCloud,
    pushSlotsToCloud,
    onSlotsUpdated(cb) { onSlotsUpdatedCb = cb; },
    isSignedIn: () => !!currentUser
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFirebase);
  } else {
    initFirebase();
  }
})(window);
