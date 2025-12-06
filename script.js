const API_URL = "https://shalanda-edacious-nonphenomenally.ngrok-free.dev/status"; // ← remplace ici

async function updateStatus() {
    const res = await fetch(`${API_URL}/status`);
    const data = await res.json();

    document.getElementById("status").innerText =
        data.online ? "API : EN LIGNE" : "API : OFFLINE";

    const list = document.getElementById("bots");
    list.innerHTML = "";

    data.bots.forEach(bot => {
        const item = document.createElement("div");
        item.className = "bot";

        item.innerHTML = `
            <h3>${bot}</h3>
            <button onclick="startBot('${bot}')">Démarrer</button>
            <button onclick="restartBot('${bot}')">Redémarrer</button>
        `;

        list.appendChild(item);
    });
}

async function startBot(name) {
    const res = await fetch(`${API_URL}/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bot: name })
    });

    const data = await res.json();
    alert(data.message || data.error);
}

async function restartBot(name) {
    const res = await fetch(`${API_URL}/restart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bot: name })
    });

    const data = await res.json();
    alert(data.message || data.error);
}

updateStatus();
setInterval(updateStatus, 3000);
