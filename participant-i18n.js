(() => {
  const langs = {
    pl: {label:"Polski"},
    en: {
      label:"English", title:"Participant card and Seed of Harmony — NEURO LEAGUE OPEN",
      h1:'Participant card<br><span class="grad">and Seed of Harmony.</span>',
      lead:"A place for voluntary participation, a personal card and a transparent record of a symbolic contribution.",
      cardEyebrow:"01 / YOUR CARD", cardCaption:"Digital participant card", nameLabel:"Name / pseudonym", cardName:"Not set", areaLabel:"Area", statusLabel:"Status", cardStatus:"Inactive",
      nicknameLabel:"Name or pseudonym (do not enter sensitive information)", nicknamePlaceholder:"e.g. Open Mind",
      createCard:"Create card locally", resetCard:"Delete data from this device",
      cardMessage:"The card is stored only in this browser. It does not verify identity or prove formal participation in a study.",
      walletEyebrow:"02 / SYMBOLIC WALLET", walletTitle:'SEED <span class="grad">OF HARMONY</span>',
      walletIntro:"A symbol of cooperation, knowledge and contribution to the common good.",
      typeLabel:"Type", typeValue:"Symbolic record", moneyLabel:"Monetary value", moneyValue:"None / not assigned",
      transferLabel:"Transfer / trading", transferValue:"Inactive", issuanceLabel:"Token issuance", issuanceValue:"Inactive",
      tokenNotice:"This is not cryptocurrency, money, a security or a promise of reward. No tokens are issued or granted at this stage.",
      contributionEyebrow:"03 / CONTRIBUTION RECORD", contributionTitle:"What can you contribute?",
      contributionIntro:"A contribution does not mean a payment. It can be an idea, knowledge, an observation, a skill, time or voluntary help. You do not have to pay anything. This note is private and stays in this browser; it creates no tokens or points.",
      contributionLabel:"Note (optional)", contributionPlaceholder:"e.g. an idea, observation, skill, time or help",
      saveContribution:"Save local note", ledgerEmpty:"No notes saved.",
      protectionEyebrow:"04 / PRINCIPLES AND PROTECTION", protectionTitle:"People first.",
      protect1:"Participation is voluntary.", protect2:"You can change your pseudonym or delete the local card.",
      protect3:"The card does not collect identity documents or health data.",
      protect4:"It does not automatically mean consent to participate in a scientific study.",
      protect5:"Separate information and informed consent will be required before research involving people.",
      privacyDetail:"The card and note are stored in this browser’s local storage, not on the NLO server. People using the same device and browser profile may be able to access them. Deleting the card removes these data from this device. Do not enter confidential information. This is not a security audit or a guarantee of anonymity.",
      back:"← Main portal", footer:"Back to the portal",
      dynamic:{
        "Karta lokalna":"Local card","Wpisz pseudonim lub nazwę.":"Enter a name or pseudonym.",
        "Karta została utworzona lokalnie na tym urządzeniu.":"The card was created locally on this device.",
        "Wpisz krótką notatkę.":"Enter a short note.",
        "Brak zapisanych notatek.":"No notes saved.",
        "Usuń lokalną kartę i notatkę z tej przeglądarki?":"Delete the local card and note from this browser?",
        "Lokalne dane zostały usunięte z tej przeglądarki.":"Local data has been deleted from this browser.",
        "Nie udało się zapisać szkicu w tej przeglądarce.":"The draft could not be saved in this browser.",
        "Zapis lokalny: ":"Saved locally: "
      }
    },
    it: {
      label:"Italiano", title:"Tessera del partecipante e Seme dell’Armonia — NEURO LEAGUE OPEN",
      h1:'Tessera del partecipante<br><span class="grad">e Seme dell’Armonia.</span>',
      lead:"Uno spazio per la partecipazione volontaria, una tessera personale e una registrazione trasparente del contributo simbolico.",
      cardEyebrow:"01 / LA TUA TESSERA", cardCaption:"Tessera digitale del partecipante", nameLabel:"Nome / pseudonimo", cardName:"Non impostato", areaLabel:"Area", statusLabel:"Stato", cardStatus:"Inattiva",
      nicknameLabel:"Nome o pseudonimo (non inserire informazioni sensibili)", nicknamePlaceholder:"es. Mente aperta",
      createCard:"Crea la tessera localmente", resetCard:"Elimina i dati da questo dispositivo",
      cardMessage:"La tessera viene salvata solo in questo browser. Non verifica l’identità né prova la partecipazione formale a uno studio.",
      walletEyebrow:"02 / PORTAFOGLIO SIMBOLICO", walletTitle:'SEME <span class="grad">DELL’ARMONIA</span>',
      walletIntro:"Simbolo di collaborazione, conoscenza e contributo al bene comune.",
      typeLabel:"Tipo", typeValue:"Registrazione simbolica", moneyLabel:"Valore monetario", moneyValue:"Nessuno / non assegnato",
      transferLabel:"Trasferimento / commercio", transferValue:"Non attivo", issuanceLabel:"Emissione di token", issuanceValue:"Non attiva",
      tokenNotice:"Non è una criptovaluta, denaro, titolo finanziario o promessa di ricompensa. In questa fase non vengono emessi né assegnati token.",
      contributionEyebrow:"03 / REGISTRO DEL CONTRIBUTO", contributionTitle:"Che cosa puoi offrire?",
      contributionIntro:"Il contributo non significa pagamento. Può essere un’idea, una conoscenza, un’osservazione, una competenza, del tempo o un aiuto volontario. Non devi pagare nulla. Questa nota è privata e resta in questo browser; non crea token né punti.",
      contributionLabel:"Nota (facoltativa)", contributionPlaceholder:"es. un’idea, un’osservazione, una competenza, tempo o aiuto",
      saveContribution:"Salva nota locale", ledgerEmpty:"Nessuna nota salvata.",
      protectionEyebrow:"04 / PRINCIPI E PROTEZIONE", protectionTitle:"Prima le persone.",
      protect1:"La partecipazione è volontaria.", protect2:"Puoi cambiare pseudonimo o eliminare la tessera locale.",
      protect3:"La tessera non raccoglie documenti d’identità né dati sanitari.",
      protect4:"Non costituisce automaticamente consenso a partecipare a uno studio scientifico.",
      protect5:"Prima di una ricerca con persone saranno necessarie informazioni separate e un consenso informato.",
      privacyDetail:"La tessera e la nota sono salvate nella memoria locale di questo browser, non sul server NLO. Chi usa lo stesso dispositivo e profilo del browser potrebbe accedervi. Eliminando la tessera, questi dati vengono rimossi da questo dispositivo. Non inserire informazioni riservate. Questo non è un audit di sicurezza né una garanzia di anonimato.",
      back:"← Portale principale", footer:"Torna al portale",
      dynamic:{
        "Karta lokalna":"Tessera locale","Wpisz pseudonim lub nazwę.":"Inserisci un nome o pseudonimo.",
        "Karta została utworzona lokalnie na tym urządzeniu.":"La tessera è stata creata localmente su questo dispositivo.",
        "Wpisz krótką notatkę.":"Inserisci una breve nota.",
        "Brak zapisanych notatek.":"Nessuna nota salvata.",
        "Usuń lokalną kartę i notatkę z tej przeglądarki?":"Eliminare la tessera e la nota locale da questo browser?",
        "Lokalne dane zostały usunięte z tej przeglądarki.":"I dati locali sono stati eliminati da questo browser.",
        "Nie udało się zapisać szkicu w tej przeglądarce.":"Impossibile salvare la bozza in questo browser.",
        "Zapis lokalny: ":"Salvato localmente: "
      }
    },
    de: {
      label:"Deutsch", title:"Teilnehmerkarte und Samen der Harmonie — NEURO LEAGUE OPEN",
      h1:'Teilnehmerkarte<br><span class="grad">und Samen der Harmonie.</span>',
      lead:"Ein Ort für freiwillige Teilnahme, eine persönliche Karte und eine transparente Aufzeichnung eines symbolischen Beitrags.",
      cardEyebrow:"01 / DEINE KARTE", cardCaption:"Digitale Teilnehmerkarte", nameLabel:"Name / Pseudonym", cardName:"Nicht festgelegt", areaLabel:"Bereich", statusLabel:"Status", cardStatus:"Inaktiv",
      nicknameLabel:"Name oder Pseudonym (keine sensiblen Informationen eingeben)", nicknamePlaceholder:"z. B. Offener Geist",
      createCard:"Karte lokal erstellen", resetCard:"Daten auf diesem Gerät löschen",
      cardMessage:"Die Karte wird nur in diesem Browser gespeichert. Sie bestätigt weder die Identität noch die formelle Teilnahme an einer Studie.",
      walletEyebrow:"02 / SYMBOLISCHE GELDBÖRSE", walletTitle:'SAMEN <span class="grad">DER HARMONIE</span>',
      walletIntro:"Symbol für Zusammenarbeit, Wissen und einen Beitrag zum Gemeinwohl.",
      typeLabel:"Art", typeValue:"Symbolischer Eintrag", moneyLabel:"Geldwert", moneyValue:"Keiner / nicht zugewiesen",
      transferLabel:"Übertragung / Handel", transferValue:"Inaktiv", issuanceLabel:"Token-Ausgabe", issuanceValue:"Inaktiv",
      tokenNotice:"Dies ist keine Kryptowährung, kein Geld, Wertpapier oder Belohnungsversprechen. Derzeit werden keine Token ausgegeben oder vergeben.",
      contributionEyebrow:"03 / BEITRAGSPROTOKOLL", contributionTitle:"Was kannst du beitragen?",
      contributionIntro:"Ein Beitrag bedeutet keine Zahlung. Er kann eine Idee, Wissen, eine Beobachtung, eine Fähigkeit, Zeit oder freiwillige Hilfe sein. Du musst nichts bezahlen. Diese Notiz ist privat und bleibt in diesem Browser; sie erzeugt keine Token oder Punkte.",
      contributionLabel:"Notiz (optional)", contributionPlaceholder:"z. B. eine Idee, Beobachtung, Fähigkeit, Zeit oder Hilfe",
      saveContribution:"Lokale Notiz speichern", ledgerEmpty:"Keine Notizen gespeichert.",
      protectionEyebrow:"04 / GRUNDSÄTZE UND SCHUTZ", protectionTitle:"Der Mensch zuerst.",
      protect1:"Die Teilnahme ist freiwillig.", protect2:"Du kannst dein Pseudonym ändern oder die lokale Karte löschen.",
      protect3:"Die Karte erfasst keine Ausweisdokumente oder Gesundheitsdaten.",
      protect4:"Sie bedeutet nicht automatisch die Zustimmung zur Teilnahme an einer wissenschaftlichen Studie.",
      protect5:"Vor Forschung mit Menschen sind gesonderte Informationen und eine informierte Einwilligung erforderlich.",
      privacyDetail:"Die Karte und die Notiz werden im lokalen Speicher dieses Browsers abgelegt, nicht auf dem NLO-Server. Personen, die dasselbe Gerät und Browserprofil nutzen, könnten darauf zugreifen. Beim Löschen der Karte werden diese Daten von diesem Gerät entfernt. Gib keine vertraulichen Informationen ein. Dies ist weder ein Sicherheitsaudit noch eine Garantie für Anonymität.",
      back:"← Hauptportal", footer:"Zurück zum Portal",
      dynamic:{
        "Karta lokalna":"Lokale Karte","Wpisz pseudonim lub nazwę.":"Gib einen Namen oder ein Pseudonym ein.",
        "Karta została utworzona lokalnie na tym urządzeniu.":"Die Karte wurde lokal auf diesem Gerät erstellt.",
        "Wpisz krótką notatkę.":"Gib eine kurze Notiz ein.",
        "Brak zapisanych notatek.":"Keine Notizen gespeichert.",
        "Usuń lokalną kartę i notatkę z tej przeglądarki?":"Lokale Karte und Notiz aus diesem Browser löschen?",
        "Lokalne dane zostały usunięte z tej przeglądarki.":"Lokale Daten wurden aus diesem Browser gelöscht.",
        "Nie udało się zapisać szkicu w tej przeglądarce.":"Der Entwurf konnte in diesem Browser nicht gespeichert werden.",
        "Zapis lokalny: ":"Lokal gespeichert: "
      }
    }
  };
  const select=document.createElement("select");
  select.className="sub-language";
  select.setAttribute("aria-label","Language");
  Object.entries(langs).forEach(([code,entry])=>{const option=document.createElement("option");option.value=code;option.textContent=entry.label;select.append(option)});
  const header=document.querySelector("header .wrap")||document.querySelector("header");
  if(header){const holder=document.createElement("span");holder.style.cssText="float:right;margin-left:14px";holder.append(select);header.append(holder)}
  let current="en";try{current=localStorage.getItem("nlo-language")||"en"}catch{}
  if(!langs[current])current="en";
  let observer=null;
  function set(id,value,html=false){const el=document.getElementById(id);if(el){if(html)el.innerHTML=value;else el.textContent=value}}
  function translate(code){
    current=langs[code]?code:"en";
    try{localStorage.setItem("nlo-language",current)}catch{}
    select.value=current;document.documentElement.lang=current;
    if(current==="pl"){location.reload();return}
    const d=langs[current];document.title=d.title;
    set("participantLead",d.lead);set("cardEyebrow",d.cardEyebrow);set("cardCaption",d.cardCaption);
    set("nameLabel",d.nameLabel);set("cardName",d.cardName);set("areaLabel",d.areaLabel);set("statusLabel",d.statusLabel);set("cardStatus",d.cardStatus);
    set("nicknameLabel",d.nicknameLabel);const nick=document.getElementById("nickname");if(nick)nick.placeholder=d.nicknamePlaceholder;
    set("createCard",d.createCard);set("resetCard",d.resetCard);set("cardMessage",d.cardMessage);
    set("walletEyebrow",d.walletEyebrow);set("walletTitle",d.walletTitle,true);set("walletIntro",d.walletIntro);
    set("typeLabel",d.typeLabel);set("typeValue",d.typeValue);set("moneyLabel",d.moneyLabel);set("moneyValue",d.moneyValue);
    set("transferLabel",d.transferLabel);set("transferValue",d.transferValue);set("issuanceLabel",d.issuanceLabel);set("issuanceValue",d.issuanceValue);set("tokenNotice",d.tokenNotice);
    set("contributionEyebrow",d.contributionEyebrow);set("contributionTitle",d.contributionTitle);set("contributionIntro",d.contributionIntro);
    set("contributionLabel",d.contributionLabel);const contribution=document.getElementById("contribution");if(contribution)contribution.placeholder=d.contributionPlaceholder;
    set("saveContribution",d.saveContribution);set("ledger",d.ledgerEmpty);
    set("protectionEyebrow",d.protectionEyebrow);set("protectionTitle",d.protectionTitle);
    for(let i=1;i<=5;i++)set("protect"+i,d["protect"+i]);
    set("privacyDetail",d.privacyDetail);
    const back=document.querySelector("header a[href='index.html']:not(.brand)");if(back)back.textContent=d.back;
    const foot=document.querySelector("footer a");if(foot)foot.textContent=d.footer;
    if(observer)observer.disconnect();
    observer=new MutationObserver(records=>records.forEach(record=>{
      const target=record.target.nodeType===Node.TEXT_NODE?record.target.parentElement:record.target;
      if(!target)return;
      const id=target.id;
      if(id==="cardMessage"||id==="ledger"||id==="cardStatus"){
        let value=target.textContent;
        for(const [from,to] of Object.entries(d.dynamic)){
          if(value===from){target.textContent=to;break}
          if(from.endsWith(": ")&&value.startsWith(from)){target.textContent=to+value.slice(from.length);break}
        }
      }
    }));
    ["cardMessage","ledger","cardStatus"].forEach(id=>{const el=document.getElementById(id);if(el)observer.observe(el,{childList:true,characterData:true,subtree:true})});
  }
  select.addEventListener("change",()=>{if(select.value==="pl"){try{localStorage.setItem("nlo-language","pl")}catch{}location.reload()}else translate(select.value)});
  translate(current);
})();