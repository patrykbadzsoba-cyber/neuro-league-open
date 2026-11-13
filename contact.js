(() => {
const form=document.getElementById("contactForm");if(!form)return;
const status=document.getElementById("contactStatus");
const button=form.querySelector('button[type="submit"]');
const messages={
pl:"Otwieram GitHub z przygotowaną opinią. Sprawdź treść i naciśnij „Submit new issue”, aby ją opublikować. Zgłoszenie będzie publiczne.",
en:"Opening GitHub with your feedback prepared. Review it and select “Submit new issue” to publish. The report will be public.",
it:"Apro GitHub con il tuo feedback preparato. Controlla il testo e seleziona “Submit new issue” per pubblicarlo. La segnalazione sarà pubblica.",
de:"GitHub wird mit deinem vorbereiteten Feedback geöffnet. Prüfe den Text und wähle „Submit new issue“, um ihn zu veröffentlichen. Der Beitrag ist öffentlich."
};
form.addEventListener("submit",e=>{
e.preventDefault();
const data=new FormData(form);
const topic=String(data.get("topic")||"Opinia");
const name=String(data.get("name")||"").trim();
const message=String(data.get("message")||"").trim();
if(!message){status.textContent="Wpisz opinię przed wysłaniem.";return;}
const title="Opinia o stronie NLO: "+topic;
const body=["## Opinia użytkownika","**Kategoria:** "+topic,"**Podpis:** "+(name||"Anonimowo"),"","## Treść opinii",message,"","---","Przesłano przez formularz opinii na stronie NEURO LEAGUE OPEN."].join("\n");
const url="https://github.com/patrykbadzsoba-cyber/neuro-league-open/issues/new?"+new URLSearchParams({title,body,labels:"feedback"});
status.textContent=messages[(document.documentElement.lang||"en").slice(0,2)]||messages.en;
if(button)button.disabled=true;
window.location.assign(url);
});
})();