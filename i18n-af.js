(() => {
  const select = document.getElementById('languageSelect');
  if (!select) return;
  const packs = {
    'fa-AF': {
      label:'دری', nav:['ایده','بخش‌ها','انجمن','کارت اشتراک و بذر','اصول','گفت‌وگو با هوش مصنوعی','به گفت‌وگو بپیوندید'],
      eyebrow:'فضای باز برای همکاری', hero:'به سادگی<br><span class="gradient-text">با هم.</span>',
      lead:'جایی که مردم، ایده‌ها و فناوری برای ساختن چیزی نیک با هم دیدار می‌کنند؛ بدون排除، تظاهر یا مانع.',
      join:'به گفت‌وگو بپیوندید', idea:'با ایده آشنا شوید', note:'انسان در مرکز است. فناوری یک ابزار است.',
      ideaTitle:'نه یک پلتفرم دیگر.<br><span class="muted">راهی تازه برای با هم بودن.</span>',
      ideaDesc:'NEURO LEAGUE OPEN یک ابتکار باز است. این ابتکار به یک فرد، شرکت یا سیستم تعلق ندارد. ارزش آن را مردمی می‌سازند که داوطلبانه دانش، تجربه و عمل خود را شریک می‌سازند.',
      areasTitle:'بخش‌های گوناگون.<br><span class="muted">یک مسیر مشترک.</span>',
      areasDesc:'از شناخت انسان تا بازسازی محیط زیست. بخش‌ها بر پایه دانش، همکاری و اقدام قابل بررسی به‌گونه باز رشد می‌کنند.',
      commonsTitle:'گفت‌وگو<br><span class="gradient-text">آغاز راه است.</span>',
      commonsDesc:'پرسش، ایده یا تجربه‌ای برای شریک ساختن دارید؟ با یک گفت‌وگو آغاز کنید. برای آشنایی با این ایده به راه‌حل آماده یا حساب کاربری نیاز ندارید.',
      rulesTitle:'از آغاز باز.<br><span class="muted">در عمل مسئولانه.</span>',
      rulesDesc:'بنیاد پروژه بر خودمختاری اشتراک‌کنندگان، شفافیت و حق ترک کردن بدون از دست دادن هویت یا دستاوردهای شخصی استوار است.',
      joinTitle:'لازم نیست<br>آماده باشید. <span class="gradient-text">حضور شما کافی است.</span>',
      joinDesc:'NEURO LEAGUE OPEN با کمک مردمی شکل می‌گیرد که می‌خواهند گفت‌وگو، همکاری و مسئولانه عمل کنند.',
      language:'زبان', more:'بیشتر بخوانید', contributionTitle:'«مشارکت» چه معنا دارد؟',
      contributionInfo:'مشارکت به معنای پرداخت پول نیست. می‌تواند یک ایده، دانش، تجربه، مشاهده، ترجمه، وقت یا کمک داوطلبانه باشد. حمایت مالی کاملاً اختیاری است و شرط اشتراک نیست.',
      privacyTitle:'حریم خصوصی چگونه محافظت می‌شود؟',
      privacyInfo:'کارت اشتراک‌کننده و پیش‌نویس‌های Commons در همین مرورگر ذخیره می‌شوند. فرم تماس یک ایمیل عادی به تیم پروژه باز می‌کند. اطلاعات حساس را وارد نکنید.',
      nameLabel:'نام یا نام مستعار', topicLabel:'موضوع', messageLabel:'پیام',
      sendMessage:'باز کردن ایمیل ↗', freeNote:'اشتراک اساسی رایگان است. حمایت داوطلبانه شرط دسترسی نیست.',
      contactPrivacy:'دکمه، برنامه ایمیل شما را با یک پیام آماده باز می‌کند. پیش از فرستادن آن را بررسی کنید.',
      ticker:'آزادی اندیشه ✳ کرامت انسانی ✳ همکاری ✳ فناوری در خدمت زندگی',
      areas:[['NEURAL LINK','زیرساخت باز برای ارتباط و همکاری. انسان میزبان است و فناوری مهمان.'],['NEUROHARMONY','دانش شیمی زندگی: مغز، احساسات، خواب، فشار روانی و انعطاف‌پذیری عصبی.'],['بازسازی','حفاظت و احیای نظام‌های طبیعی از راه اقدام‌های محلی.'],['COMMONS','فضای مشترک برای گفت‌وگو، تبادل دانش و آغاز همکاری.'],['فناوری','ابزارهای باز با تمرکز بر خودمختاری، حریم خصوصی و دسترس‌پذیری.'],['GLOBAL DNB','ریتم مشترک، فرهنگ و مسئولیت در برابر یک سیاره.'],['بشریت','همکاری باز برای دسترسی به منابع اساسی با احترام به خودمختاری و حریم خصوصی.']],
      principles:[['آزادی اندیشه','فضایی برای پرسش‌ها، دیدگاه‌های گوناگون و تفکر مستقل.'],['کرامت انسان','هر فرد سزاوار احترام، امنیت و حق تصمیم‌گیری است.'],['همکاری','توانایی‌ها و تجربه‌ها را به هم پیوند می‌دهیم، نه این‌که مانع بسازیم.'],['فناوری در خدمت زندگی','ابزارها باید به انسان و نظام‌های زنده خدمت کنند، نه برعکس.']]
    },
    ps: {
      label:'پښتو', nav:['نظر','برخې','ګډه فضا','د ګډون کارت او تخم','اصول','له مصنوعي ځیرکتیا سره خبرې','خبرې اترې پیل کړئ'],
      eyebrow:'د همکارۍ پرانیستې فضا', hero:'یوازې<br><span class="gradient-text">په ګډه.</span>',
      lead:'هغه ځای چې خلک، نظرونه او ټکنالوژي سره یوځای کېږي، څو یو ښه کار جوړ کړي؛ پرته له محرومولو، دروغو او خنډونو.',
      join:'خبرې اترې پیل کړئ', idea:'له نظر سره بلد شئ', note:'انسان په مرکز کې دی. ټکنالوژي یوه وسیله ده.',
      ideaTitle:'یوه بله پلاتفورم نه ده.<br><span class="muted">د یوځای اوسېدو نوې لاره.</span>',
      ideaDesc:'NEURO LEAGUE OPEN یوه پرانیستې نوښت دی. دا د یوه کس، شرکت یا سیستم ملکیت نه دی. ارزښت یې هغه خلک جوړوي چې په خپله خوښه پوهه، تجربه او کار شریکوي.',
      areasTitle:'بېلابېلې برخې.<br><span class="muted">یو ګډ لوری.</span>',
      areasDesc:'د انسان له پېژندنې څخه د چاپېریال تر بیا رغونې پورې. برخې د پوهې، همکارۍ او د ارزونې وړ کړنو له لارې په پرانیستې توګه وده کوي.',
      commonsTitle:'خبرې اترې<br><span class="gradient-text">پیل دی.</span>',
      commonsDesc:'پوښتنه، نظر یا تجربه لرئ چې شریک یې کړئ؟ له خبرو پیل وکړئ. د دې نظر د پېژندلو لپاره بشپړ حل یا حساب ته اړتیا نشته.',
      rulesTitle:'له پیله پرانیستی.<br><span class="muted">په عمل کې مسؤل.</span>',
      rulesDesc:'د پروژې بنسټ د ګډونوالو خپلواکي، روڼتیا او دا حق دی چې څوک د خپل هویت او ونډې له لاسه ورکولو پرته ووځي.',
      joinTitle:'اړینه نه ده چې<br>چمتو اوسئ. <span class="gradient-text">ستاسو شتون بس دی.</span>',
      joinDesc:'NEURO LEAGUE OPEN د هغو خلکو په مرسته جوړېږي چې خبرې، همکاري او مسؤلانه عمل غواړي.',
      language:'ژبه', more:'نور ولولئ', contributionTitle:'«ونډه» څه معنا لري؟',
      contributionInfo:'ونډه د پیسو ورکول نه دي. دا یو نظر، پوهه، تجربه، مشاهده، ژباړه، وخت یا رضاکارانه مرسته کېدای شي. مالي ملاتړ بشپړ اختیاري دی او د ګډون شرط نه دی.',
      privacyTitle:'محرمیت څنګه ساتل کېږي؟',
      privacyInfo:'د ګډون کارت او د Commons مسودې په همدې براوزر کې ساتل کېږي. د اړیکې فورمه د پروژې ډلې ته عادي برېښنالیک پرانیزي. حساس معلومات مه لیکئ.',
      nameLabel:'نوم یا مستعار نوم', topicLabel:'موضوع', messageLabel:'پیغام',
      sendMessage:'برېښنالیک پرانیزئ ↗', freeNote:'بنسټیز ګډون وړیا دی. رضاکارانه ملاتړ د لاسرسي شرط نه دی.',
      contactPrivacy:'تڼۍ ستاسو د برېښنالیک اپلېکېشن کې چمتو پیغام پرانیزي. له لېږلو مخکې یې وګورئ.',
      ticker:'د فکر ازادي ✳ انساني کرامت ✳ همکاري ✳ د ژوند په خدمت کې ټکنالوژي',
      areas:[['NEURAL LINK','د اړیکو او همکارۍ پرانیستی جوړښت. انسان کوربه دی او ټکنالوژي مېلمه.'],['NEUROHARMONY','د ژوند د کیمیا پوهه: دماغ، احساسات، خوب، فشار او عصبي بدلون.'],['بیا رغونه','د طبیعي نظامونو ساتنه او د سیمه‌ییزو کړنو له لارې بیا رغونه.'],['COMMONS','د خبرو، پوهې د تبادلې او همکارۍ د پیل ګډ ځای.'],['ټکنالوژي','پرانیستې وسیلې چې خپلواکۍ، محرمیت او لاسرسي ته پام کوي.'],['GLOBAL DNB','ګډ ریتم، کلتور او د یوې سیارې پر وړاندې مسؤلیت.'],['بشریت','د خپلواکۍ او محرمیت په درناوي بنسټیزو سرچینو ته د لاسرسي لپاره پرانیستې همکاري.']],
      principles:[['د فکر ازادي','د پوښتنو، بېلابېلو لیدلورو او خپلواک فکر لپاره فضا.'],['انساني کرامت','هر انسان د درناوي، خوندیتوب او خپلواکې پرېکړې حق لري.'],['همکاري','وړتیاوې او تجربې سره یوځای کوو، نه دا چې غیرضروري خنډونه جوړ کړو.'],['د ژوند په خدمت کې ټکنالوژي','وسیلې باید د خلکو او ژوندیو نظامونو خدمت وکړي، نه برعکس.']]
    }
  };
  function apply() {
    const lang = select.value, p = packs[lang];
    if (!p) return;
    document.documentElement.lang = lang;
    document.documentElement.dir = 'rtl';
    const set=(q,v,html=false)=>{const e=document.querySelector(q);if(e)e[html?'innerHTML':'textContent']=v;};
    set('#language-label',p.language);
    const nav=[...document.querySelectorAll('#mainNav > a')];
    p.nav.forEach((v,i)=>{if(nav[i])nav[i].textContent=v;});
    set('.hero-copy .eyebrow',p.eyebrow);set('.hero-copy h1',p.hero,true);set('.hero-lead',p.lead);
    set('.hero-actions .button-primary',p.join);set('.hero-actions .text-link',p.idea);set('.hero-note',p.note);
    set('#idea .section-heading h2',p.ideaTitle,true);set('#idea .section-heading p',p.ideaDesc);
    set('#rozwiazania .section-heading h2',p.areasTitle,true);set('#rozwiazania .section-heading p',p.areasDesc);
    set('.commons-panel h2',p.commonsTitle,true);set('.commons-panel p',p.commonsDesc);
    set('#zasady .section-heading h2',p.rulesTitle,true);set('#zasady .section-heading p',p.rulesDesc);
    set('.join-card h2',p.joinTitle,true);set('.join-card > p',p.joinDesc);
    document.querySelectorAll('.area-card').forEach((e,i)=>{if(p.areas[i]){setCard(e,'h3',p.areas[i][0]);setCard(e,':scope > p',p.areas[i][1]);}});
    document.querySelectorAll('.principle').forEach((e,i)=>{if(p.principles[i]){setCard(e,'h3',p.principles[i][0]);setCard(e,'summary p',p.principles[i][1]);}});
    document.querySelectorAll('[data-i18n]').forEach(e=>{const k=e.dataset.i18n;if(p[k])e.textContent=p[k];});
    set('.ticker div',p.ticker+' ✳ '+p.ticker);
    const form=document.getElementById('contactForm');
    if(form){const labels=form.querySelectorAll('label');[p.nameLabel,p.topicLabel,p.messageLabel].forEach((v,i)=>{if(labels[i])labels[i].textContent=v;});set('button[type="submit"]',p.sendMessage);}
    set('.join-footnote',p.freeNote);set('#contact-note',p.contactPrivacy);
    document.querySelectorAll('.rule-row').forEach(a=>{a.style.direction='rtl';});
    select.setAttribute('aria-label',p.language);
  }
  function setCard(root,q,v){const e=root.querySelector(q);if(e)e.textContent=v;}
  select.addEventListener('change',apply);
  try { const saved=localStorage.getItem('nlo-language'); if(packs[saved]) {select.value=saved;apply();} } catch {}
  if (packs[select.value]) apply();
  window.addEventListener('storage',e=>{if(e.key==='nlo-language'&&packs[e.newValue]){select.value=e.newValue;apply();}});
})();