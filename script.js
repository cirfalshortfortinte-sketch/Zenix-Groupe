// === CONFIGURE ICI ===
// Remplace par ton URL ngrok (ex: https://shalanda-edacious-nonphenomenally.ngrok-free.dev)
const API_URL = "https://shalanda-edacious-nonphenomenally.ngrok-free.dev";
const API_KEY = "MA_SUPER_CLE"; // remplace par ta cle serveur

// ---- Ne change pas en-dessous ----
document.getElementById("api-url").textContent = API_URL;
const statusEl = document.getElementById("api-status");
const respEl = document.getElementById("response");
const botSelect = document.getElementById("bot-select");

async function apiFetch(path, method = "GET", body = null) {
  try {
    const res = await fetch(API_URL + path, {
      method,
      headers: {
        "Content-Type":"application/json",
        "x-api-key": API_KEY
      },
      body: body ? JSON.stringify(body) : null
    });
    const txt = await res.text();
    try { return JSON.parse(txt); } catch { return txt; }
  } catch (err) {
    return { error: "Impossible de joindre l'API", detail: err.message };
  }
}

async function refreshStatus(){
  statusEl.textContent = "Chargement…";
  const r = await apiFetch("/status");
  if (r && r.online) {
    statusEl.textContent = "API en ligne — bots: " + (r.bots ? r.bots.join(", ") : "aucun");
  } else {
    statusEl.textContent = "API hors-ligne";
  }
  respEl.textContent = JSON.stringify(r, null, 2);
}

document.getElementById("refresh").addEventListener("click", refreshStatus);

document.getElementById("start-btn").addEventListener("click", async () => {
  const bot = botSelect.value;
  respEl.textContent = "Lancement…";
  const r = await apiFetch("/start", "POST", { bot });
  respEl.textContent = JSON.stringify(r, null, 2);
});

document.getElementById("restart-btn").addEventListener("click", async () => {
  const bot = botSelect.value;
  respEl.textContent = "Redémarrage…";
  const r = await apiFetch("/restart", "POST", { bot });
  respEl.textContent = JSON.stringify(r, null, 2);
});

document.getElementById("stop-btn").addEventListener("click", async () => {
  const bot = botSelect.value;
  respEl.textContent = "Arrêt…";
  // si tu as une route /stop côté serveur, l'appelle ici. Exemple :
  const r = await apiFetch("/stop", "POST", { bot });
  respEl.textContent = JSON.stringify(r, null, 2);
});

// auto-refresh initial
refreshStatus();
// option: actualiser toutes les 30s
setInterval(refreshStatus, 30000);
