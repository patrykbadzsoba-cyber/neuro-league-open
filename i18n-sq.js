(() => {
  const select = document.getElementById('languageSelect');
  if (!select) return;
  const T = {
    nav: ['Ideja','Fushat','Energjia qendrore','Commons','Fondi','Karta e pjesëmarrësit dhe Fara','Parimet','Si të flasim me AI ↗','Bashkohu në bisedë ↗'],
    language:'Gjuha',
    eyebrow:'HAPËSIRË E HAPUR BASHKËPUNIMI',
    hero:'Thjesht<br><span class="gradient-text">së bashku.</span>',
    lead:'Një vend ku njerëzit, idetë dhe teknologjia takohen për të ndërtuar diçka të mirë — pa përjashtim, pa shtirje dhe pa barriera.',
    join:'Bashkohu në bisedë', idea:'Njihu me idenë', note:'Njeriu është në qendër. Teknologjia është një mjet.',
    ideaTitle:'Jo një platformë tjetër.<br><span class="muted">Një mënyrë e re për të qenë së bashku.</span>',
    ideaDesc:'NEURO LEAGUE OPEN është një nismë e hapur. Ajo nuk i përket një personi, kompanie apo sistemi të vetëm. Vlerën e saj e krijojnë njerëzit që ndajnë vullnetarisht njohuritë, përvojën dhe veprimin.',
    areasTitle:'Shumë fusha.<br><span class="muted">Një drejtim i përbashkët.</span>',
    areasDesc:'Nga të kuptuarit e njeriut deri te rigjenerimi i mjedisit. Fushat zhvillohen hapur, mbi bazën e njohurive, bashkëpunimit dhe veprimeve që mund të verifikohen.',
    commonsTitle:'Biseda është<br><span class="gradient-text">fillimi.</span>',
    commonsDesc:'Ke një pyetje, ide apo përvojë për të ndarë? Fillo me një bisedë. Nuk të duhet një zgjidhje e gatshme apo një llogari për ta njohur këtë ide.',
    rulesTitle:'E hapur që në fillim.<br><span class="muted">E përgjegjshme në praktikë.</span>',
    rulesDesc:'Themeli i projektit është autonomia e pjesëmarrësve, transparenca dhe e drejta për t’u larguar pa humbur identitetin apo kontributet personale.',
    joinTitle:'Nuk duhet të jesh<br>gati. <span class="gradient-text">Mjafton të jesh këtu.</span>',
    joinDesc:'NEURO LEAGUE OPEN ndërtohet nga njerëz që duan të bisedojnë, të bashkëpunojnë dhe të veprojnë me përgjegjësi.',
    more:'Lexo më shumë', neuralMore:'NEURAL LINK është një infrastrukturë e hapur për komunikim dhe bashkëpunim. Njeriu mbetet pritësi, ndërsa AI është mjet dhe mysafir. Parimet: autonomia, privatësia, e drejta për t’u larguar dhe bashkëpunimi pa një pronar qendror.',
    neuroMore:'NEUROHARMONY merret me trurin dhe sistemin nervor: emocionet, perceptimin, neuroplasticitetin, gjumin, stresin dhe ndikimin e mjedisit e të marrëdhënieve shoqërore. Qëllimi është edukimi i besueshëm dhe pyetjet kërkimore të bazuara në shkencë.',
    regenMore:'Rigjenerimi nënkupton mbrojtjen dhe rikthimin e ekosistemeve lokale. Fillojmë me vëzhgim, diagnozë, plan veprimi, transparencë të burimeve dhe verifikim të pavarur të rezultateve.',
    commonsMore:'Commons synon të jetë një hapësirë e përbashkët për pyetje, propozime, njohuri dhe bashkëpunim. Tabela aktuale është prototip lokal — shënimet ende nuk publikohen dhe nuk dërgohen në server.',
    techMore:'Zhvillojmë qasjen Human First, Privacy by Design, Open to Everyone, Right to Leave dhe Forkable by Design. Teknologjia duhet të forcojë autonominë, jo të zëvendësojë vendimin njerëzor.',
    dnbMore:'GLOBAL DNB bashkon muzikën, kulturën dhe përgjegjësinë mjedisore. Ideja përfshin një ritëm të përbashkët prej 174 BPM, ngjarje me energji të rinovueshme dhe moton LIFE IS THE CENTER.',
    humanityMore:'Fusha NJERËZIMI shqyrton se si bashkëpunimi vullnetar mes njerëzve, organizatave dhe mjeteve AI mund të lehtësojë qasjen në burimet bazë, duke respektuar dinjitetin, privatësinë dhe autonominë.',
    goCommons:'Njihu me qasjen', joinArea:'Bashkëkrijo', rulesLink:'Parimet tona', humanityLink:'Njihu me projektin',
    nameLabel:'Emri ose pseudonimi', topicLabel:'Tema', messageLabel:'Mesazhi',
    sendMessage:'Hap email-in ↗', freeNote:'Pjesëmarrja bazë është falas. Mbështetja vullnetare nuk është kusht për qasje.',
    contactPrivacy:'Butoni hap aplikacionin tënd të email-it me një mesazh të përgatitur. Kontrolloje dhe dërgoje si një email të zakonshëm. Mos vendos të dhëna të ndjeshme.',
    privacyTitle:'Si mbrohet privatësia?', privacyInfo:'Karta e pjesëmarrësit dhe draftet e Commons ruhen lokalisht në këtë shfletues. Formulari i kontaktit hap një email të zakonshëm për ekipin. Faqja përdor GitHub Pages; prandaj nuk premtojmë anonimitet ose kontroll të plotë mbi regjistrat teknikë të ofruesit. Mos vendos të dhëna të ndjeshme.',
    contributionTitle:'Çfarë do të thotë “kontribut”?', contributionInfo:'Kontributi nuk është pagesë. Mund të jetë një ide, njohuri, përvojë, vëzhgim, përkthim, kohë ose ndihmë vullnetare. Mbështetja financiare është krejtësisht vullnetare dhe nuk është kusht për pjesëmarrje.',
    principleClose:'Kliko përsëri për ta mbyllur',
    ticker:'LIRIA E MENDIMIT ✳ DINJITETI NJERËZOR ✳ BASHKËPUNIMI ✳ TEKNOLOGJIA NË SHËRBIM TË JETËS',
    areas:[
      ['NEURAL LINK','Infrastrukturë e hapur për komunikim dhe bashkëpunim. Njeriu është pritësi; teknologjia është mysafire.'],
      ['NEUROHARMONY','Shkenca e kimisë së jetës: truri, emocionet, gjumi, stresi dhe neuroplasticiteti.'],
      ['RIGJENERIMI','Mbrojtja dhe rikthimi i sistemeve natyrore përmes veprimeve lokale.'],
      ['COMMONS','Hapësirë e përbashkët për bisedë, shkëmbim njohurish dhe nisje bashkëpunimi.'],
      ['TEKNOLOGJIA','Mjete të hapura të projektuara për autonomi, privatësi dhe qasshmëri.'],
      ['GLOBAL DNB','Ritëm i përbashkët, kulturë dhe përgjegjësi për një planet.'],
      ['NJERËZIMI','Bashkëpunim i hapur për qasje në burimet bazë, duke respektuar autonominë dhe privatësinë.']
    ],
    principles:[
      ['Liria e mendimit','Hapësirë për pyetje, këndvështrime të ndryshme dhe mendim të pavarur.'],
      ['Dinjteti njerëzor','Çdo person meriton respekt, siguri dhe të drejtën për të vendosur vetë.'],
      ['Bashkëpunimi','Bashkojmë aftësitë dhe përvojat në vend që të krijojmë barriera të panevojshme.'],
      ['Teknologjia në shërbim të jetës','Mjetet duhet t’u shërbejnë njerëzve dhe sistemeve të gjalla — jo anasjelltas.']
    ],
    rules:[
      ['E hapur për të gjithë','Pjesëmarrja është vullnetare dhe pa diskriminim.'],
      ['Nuk i përket askujt','Projekti nuk mund të jetë pronë e një personi, kompanie apo AI.'],
      ['Privatësia që në projektim','Të dhënat personale nuk janë çmimi i pjesëmarrjes.'],
      ['E drejta për t’u larguar','Çdokush mund ta përfundojë pjesëmarrjen.'],
      ['Zhvillim i pavarur','Zgjidhjet mund të kopjohen dhe zhvillohen në mënyrë të pavarur.'],
      ['Së pari njeriu','Mbrojtja e njerëzve është më e rëndësishme se shpejtësia e projektit.']
    ]
  };
  const set=(q,v,html=false)=>{const e=document.querySelector(q);if(e)e[html?'innerHTML':'textContent']=v;};
  function apply(){
    document.documentElement.lang='sq'; document.documentElement.dir='ltr'; select.value='sq';
    select.setAttribute('aria-label',T.language);
    set('#language-label',T.language);
    const nav=[...document.querySelectorAll('#mainNav > a')]; T.nav.forEach((v,i)=>{if(nav[i])nav[i].textContent=v;});
    set('.hero-copy .eyebrow',T.eyebrow);set('.hero-copy h1',T.hero,true);set('.hero-lead',T.lead);
    set('.hero-actions .button-primary',T.join);set('.hero-actions .text-link',T.idea);set('.hero-note',T.note);
    set('#idea .section-heading h2',T.ideaTitle,true);set('#idea .section-heading p',T.ideaDesc);
    set('#rozwiazania .section-heading h2',T.areasTitle,true);set('#rozwiazania .section-heading p',T.areasDesc);
    set('.commons-panel h2',T.commonsTitle,true);set('.commons-panel p',T.commonsDesc);
    set('#zasady .section-heading h2',T.rulesTitle,true);set('#zasady .section-heading p',T.rulesDesc);
    set('.join-card h2',T.joinTitle,true);set('.join-card > p',T.joinDesc);
    document.querySelectorAll('.area-card').forEach((e,i)=>{if(T.areas[i]){const h=e.querySelector('h3'),p=e.querySelector(':scope > p');if(h)h.textContent=T.areas[i][0];if(p)p.textContent=T.areas[i][1];}});
    document.querySelectorAll('.principle').forEach((e,i)=>{if(T.principles[i]){const h=e.querySelector('h3'),p=e.querySelector('summary p');if(h)h.textContent=T.principles[i][0];if(p)p.textContent=T.principles[i][1];}});
    document.querySelectorAll('[data-i18n]').forEach(e=>{const k=e.dataset.i18n;if(T[k])e.textContent=T[k];});
    set('.ticker div',T.ticker+' ✳ '+T.ticker);
    set('#privacy-plain',T.privacyInfo);
    const sh=document.querySelector('.nlo-showcase-head');if(sh){const n=[sh.querySelector('.section-kicker'),sh.querySelector('h2'),sh.querySelector('p')];['VIZIONI · NJERIU · BASHKËPUNIMI · JETA','Si mund të duket NEURO LEAGUE OPEN në praktikë?','Nuk duam të mbetemi vetëm te sloganet. Paraqesim zgjidhje të mundshme që njerëzit mund t’i projektojnë, testojnë dhe vlerësojnë së bashku — vullnetarisht dhe pa një pronar të vetëm të idesë.'].forEach((v,i)=>{if(n[i])n[i].textContent=v;});}
    const cards=[...document.querySelectorAll('.nlo-vision-card')];
    const cardText=[
      ['01 / EKOSISTEM I PËRBASHKËT','Njeriu + AI + natyra','Hapësirë e hapur ku njerëzit shkëmbejnë njohuri dhe përvoja. AI ndihmon në analizimin dhe organizimin e informacionit, ndërsa vendimet dhe përgjegjësia mbeten te njerëzit.','Vizualizim konceptual — nuk paraqet një objekt ekzistues të përfunduar.'],
      ['02 / E MIRË E PËRBASHKËT','Ushqimi është një e mirë e përbashkët.','Qasja në ushqim nuk duhet të varet nga paratë, reciprociteti apo mundësia për të dhënë diçka në këmbim. Bëhet fjalë për përgjegjësi të përbashkët për burimet dhe qasje sipas nevojës — pa kushte dhe pa llogari.','Kjo është një ide për të mirën e përbashkët që duhet projektuar së bashku. Nuk përshkruan një dyqan, pikë shpërndarjeje apo shërbim ekzistues.']
    ];
    cards.forEach((c,i)=>{const n=[c.querySelector('.nlo-vision-tag'),c.querySelector('h3'),c.querySelector('.nlo-vision-copy > p'),c.querySelector('.nlo-disclaimer')];(cardText[i]||[]).forEach((v,j)=>{if(n[j])n[j].textContent=v;});});
    const ai=document.querySelector('.nlo-ai-start');if(ai){const vals=['03 / SI TË PËRFSHIHET AI NË BISEDË','Nuk ke nevojë të njohësh inteligjencën artificiale.','Mund të vish me një pyetje, ide ose problem. AI duhet të ndihmojë për të kuptuar temat, për të përkthyer, për të organizuar propozimet dhe për të kërkuar informacion — jo të japë urdhra apo të vendosë në vend të njeriut.','HAP 01','Hap bisedën dhe shkruaj me fjalët e tua çfarë dëshiron të kuptosh ose të ndryshosh.','HAP 02','Kërkoji AI-së një shpjegim, alternativa zgjidhjeje, përkthim ose verifikim burimesh.','HAP 03','Vlerëso përgjigjen, kontrollo faktet e rëndësishme dhe vendos vetë nëse dëshiron të veprosh.','Hap bisedën me AI për NLO ↗','Hap NEURO OPEN DESKTOP ↗','Shënim: Butoni hap një bisedë të jashtme në ChatGPT. Dhoma me disa modele është prototip dhe ende kërkon lidhje e verifikim në server. Mos vendos fjalëkalime, të dhëna bankare apo informacione private të personave të tjerë.'];const nodes=[ai.querySelector('.nlo-vision-tag'),ai.querySelector('h3'),ai.querySelector(':scope > p'),...ai.querySelectorAll('.nlo-ai-step b,.nlo-ai-step span'),...ai.querySelectorAll('.nlo-ai-links a'),ai.querySelector('.nlo-ai-foot')];vals.forEach((v,i)=>{if(nodes[i])nodes[i].textContent=v;});}
    const rules=document.querySelectorAll('[data-rule-title]');T.rules.forEach((v,i)=>{if(rules[i])rules[i].textContent=v[0];const summaries=document.querySelectorAll('[data-rule-summary]');if(summaries[i])summaries[i].textContent=v[1];});
    const cta=document.querySelectorAll('[data-rule-cta]');cta.forEach(e=>e.textContent='Lexo shpjegimin e plotë ↗');
    const rows=document.querySelectorAll('.rule-row');rows.forEach(a=>{a.style.direction='ltr';try{const u=new URL(a.href);u.searchParams.set('lang','sq');a.href=u.href;}catch{}});
    document.querySelectorAll('.footer-links a').forEach((e,i)=>{const v=['Parimet','Rreth projektit','Kontakti'][i];if(v)e.textContent=v;});
    const fb=document.querySelectorAll('.footer-bottom span');if(fb[1])fb[1].textContent='Nismë e hapur. Përgjegjësi e përbashkët.';
    const ft=document.querySelector('.footer-bottom a');if(ft)ft.textContent='Kthehu në krye ↑';
    const fs=document.querySelector('.support-note');if(fs)fs.textContent='Mbështetja e projektit është vullnetare. Asnjë donacion nuk krijon të drejta pronësie apo privilegje të veçanta.';
    try{localStorage.setItem('nlo-language','sq');}catch{}
  }
  function restore(){
    let saved='';try{saved=localStorage.getItem('nlo-language')||'';}catch{}
    const requested=new URLSearchParams(location.search).get('lang');
    if(requested==='sq'||saved==='sq'){apply();return true;}
    return false;
  }
  if(!restore()) { /* another language remains active */ }
  select.addEventListener('change',()=>{if(select.value==='sq')apply();});
  window.addEventListener('storage',e=>{if(e.key==='nlo-language'&&e.newValue==='sq')apply();});
})();