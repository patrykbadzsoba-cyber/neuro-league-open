(() => {
const form=document.getElementById("contactForm");if(!form)return;
const status=document.getElementById("contactStatus");const button=form.querySelector('button[type="submit"]');
const messages={
pl:"Formularz jest gotowy, ale bezpieczne połączenie z pocztą zespołu nie zostało jeszcze skonfigurowane. Wiadomość nie została wysłana.",
en:"The form is ready, but the secure connection to the team's inbox has not been configured yet. Your message was not sent.",
it:"Il modulo è pronto, ma il collegamento sicuro alla casella del team non è ancora configurato. Il messaggio non è stato inviato.",
de:"Das Formular ist bereit, aber die sichere Verbindung zum Team-Postfach ist noch nicht eingerichtet. Deine Nachricht wurde nicht gesendet."
};
form.addEventListener("submit",e=>{
e.preventDefault();const lang=(document.documentElement.lang||"en").slice(0,2);
status.textContent=messages[lang]||messages.en;
});
})();