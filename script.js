const API_URL = "https://shalanda-edacious-nonphenomenally.ngrok-free.dev";
const API_KEY = "0789"; // la même clé que dans server.js

async function startBot(botName) {
    const res = await fetch(`${API_URL}/start`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY
        },
        body: JSON.stringify({ bot: botName })
    });

    const data = await res.json();
    alert(data.message || data.error);
}

async function restartBot(botName) {
    const res = await fetch(`${API_URL}/restart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY
        },
        body: JSON.stringify({ bot: botName })
    });

    const data = await res.json();
    alert(data.message || data.error);
}
