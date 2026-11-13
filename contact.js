(() => {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const status = document.getElementById("contactStatus");
  const button = form.querySelector('button[type="submit"]');
  const recipient = "patrykazazel212024@gmail.com";

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    if (String(data.get("_honey") || "").trim()) return;

    const topic = String(data.get("topic") || "Wiadomość");
    const name = String(data.get("name") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!message) {
      status.textContent = "Napisz wiadomość przed wysłaniem.";
      return;
    }

    const subject = "NEURO LEAGUE OPEN — " + topic;
    const body = [
      "Cześć,",
      "",
      "Piszę przez formularz kontaktowy NEURO LEAGUE OPEN.",
      "Temat: " + topic,
      "Podpis: " + (name || "Bez podpisu"),
      "",
      message,
      "",
      "Wysłano ze strony NEURO LEAGUE OPEN."
    ].join("\n");

    const mailto = "mailto:" + recipient + "?" + new URLSearchParams({
      subject,
      body
    }).toString();

    status.textContent = "Otwieram zwykłą wiadomość e-mail. Sprawdź ją i naciśnij „Wyślij” w swojej aplikacji pocztowej.";
    if (button) button.disabled = true;
    window.location.href = mailto;
    window.setTimeout(() => { if (button) button.disabled = false; }, 2500);
  });
})();