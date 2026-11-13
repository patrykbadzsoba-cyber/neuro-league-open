(() => {
const form=document.getElementById("contactForm");if(!form)return;
const status=document.getElementById("contactStatus");const button=form.querySelector('button[type="submit"]');
const messages={
pl:{sending:"Wysyłanie…",ok:"Dziękujemy. Wiadomość została przekazana do usługi pocztowej. Jeśli to pierwsza wiadomość, właściciel skrzynki może jeszcze wymagać aktywacji formularza.",error:"Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz bezpośrednio na adres zespołu.",spam:"Wiadomość nie została wysłana."},
en:{sending:"Sending…",ok:"Thank you. Your message was handed to the email form service. For the first submission, the mailbox owner may still need to activate the form.",error:"The message could not be sent. Please try again or contact the team directly.",spam:"The message was not sent."},
it:{sending:"Invio in corso…",ok:"Grazie. Il messaggio è stato inoltrato al servizio e-mail. Per il primo invio, il titolare della casella potrebbe dover ancora attivare il modulo.",error:"Impossibile inviare il messaggio. Riprova o contatta direttamente il team.",spam:"Il messaggio non è stato inviato."},
de:{sending:"Wird gesendet…",ok:"Danke. Deine Nachricht wurde an den E-Mail-Formulardienst übergeben. Beim ersten Versand muss der Postfachinhaber das Formular möglicherweise noch aktivieren.",error:"Die Nachricht konnte nicht gesendet werden. Bitte versuche es erneut oder kontaktiere das Team direkt.",spam:"Die Nachricht wurde nicht gesendet."}
};
form.addEventListener("submit",async e=>{
e.preventDefault();const lang=(document.documentElement.lang||"en").slice(0,2);const t=messages[lang]||messages.en;
if(form.elements._honey.value){status.textContent=t.spam;return}
button.disabled=true;status.textContent=t.sending;
try{
const data=new FormData(form);
const response=await fetch("https://formsubmit.co/ajax/patrykazazel212024@gmail.com",{method:"POST",headers:{Accept:"application/json"},body:data});
const result=await response.json();
if(!response.ok||result.success!== "true" && result.success!==true)throw new Error("submit failed");
form.reset();status.textContent=t.ok;
}catch(err){status.textContent=t.error}
finally{button.disabled=false}
});
})();