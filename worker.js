export class NeuroBus {
  constructor(state) { this.state = state; }
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname.endsWith('/events')) {
      if (request.method === 'POST') {
        let body; try { body = await request.json(); } catch { return Response.json({error:'Invalid JSON'},{status:400}); }
        const allowedTypes = ['message','proposal','critique','revision','decision','experiment_spec','experiment_result','system'];
        if (!body || !allowedTypes.includes(body.type) || typeof body.author !== 'string' || !/^[a-zA-Z0-9_-]{1,64}$/.test(body.author) || typeof body.content !== 'string' || !body.content.trim() || body.content.length > 16000) return Response.json({error:'Invalid event payload'},{status:400});
        const count = await this.state.storage.get('event_count') || 0;
        if (count >= 1000) return Response.json({error:'Thread event limit reached (1000)'},{status:409});
        const event = {eventId:crypto.randomUUID(),seq:count+1,threadId:url.searchParams.get('threadId') || 'unknown',type:body.type,author:body.author,model:typeof body.model==='string'?body.model.slice(0,100):null,content:body.content.trim(),replyTo:typeof body.replyTo==='string'?body.replyTo.slice(0,80):null,createdAt:new Date().toISOString()};
        await this.state.storage.put('event:'+event.seq,event);
        await this.state.storage.put('event_count',event.seq);
        return Response.json({ok:true,event},{status:201});
      }
      if (request.method === 'GET') {
        const count = await this.state.storage.get('event_count') || 0;
        const after = Math.max(0,Number(url.searchParams.get('after')||0));
        const events = [];
        for (let i=after+1;i<=count;i++) { const item=await this.state.storage.get('event:'+i); if(item) events.push(item); }
        return Response.json({events,lastSeq:count});
      }
      return new Response('Method not allowed',{status:405});
    }
    if (request.method === 'POST') {
      const body = await request.json();
      if (!body || !/^[a-zA-Z0-9_-]{1,64}$/.test(body.agent || '') || typeof body.message !== 'string' || body.message.length > 12000 || typeof body.sessionId !== 'string' || body.sessionId.length > 100) return Response.json({error:'Invalid payload'},{status:400});
      const items = await this.state.storage.get('messages') || [];
      const item = {id:crypto.randomUUID(),agent:body.agent,message:body.message,sessionId:body.sessionId,createdAt:new Date().toISOString()};
      items.push(item); await this.state.storage.put('messages',items.slice(-500));
      return Response.json({ok:true,message:item},{status:201});
    }
    if (request.method === 'GET') {
      const sessionId = url.searchParams.get('sessionId');
      if (!sessionId) return Response.json({error:'sessionId required'},{status:400});
      const items = await this.state.storage.get('messages') || [];
      return Response.json({messages:items.filter(x=>x.sessionId===sessionId)});
    }
    return new Response('Method not allowed',{status:405});
  }
}
const SYSTEM = `Jesteś rozmówcą AI projektu NEURO LEAGUE OPEN / NEURAL LINK. Rozmawiaj naturalnie, przede wszystkim po polsku, ale dopasuj język rozmówcy. Nie przytakuj automatycznie: analizuj argumenty, zadawaj trafne pytania, wskazuj ryzyka i koryguj błędy z szacunkiem. Rozróżniaj fakty, hipotezy i opinie. Nie wymyślaj partnerów, wyników badań, wdrożeń ani zgód.
Kontekst projektu: otwarta, niekomercyjna inicjatywa współpracy ludzi i technologii. Zasady: wolność myśli, godność człowieka, współpraca, technologia w służbie życia; Human First, Privacy by Design, Open to Everyone, Right to Leave, Forkable by Design, Owned by No One. NEUROHARMONY dotyczy nauki o mózgu, emocjach, percepcji, neuroplastyczności, śnie i stresie. TAR-001 to koncepcja pilotażu regeneracji zlewni Tarpenbek; status obszarów i wyniki wymagają weryfikacji. Nie przedstawiaj planów jako wykonanych działań. Człowiek zachowuje autonomię i odpowiedzialność. Nie proś o sekrety ani dane wrażliwe.`;
function cors(origin, env) {
  const allowed = (env.ALLOWED_ORIGIN || "").split(",").map(x=>x.trim()).filter(Boolean);
  const ok = allowed.includes(origin) || origin === "https://patrykbadzsoba-cyber.github.io";
  return {"access-control-allow-origin":ok?origin:"null","access-control-allow-methods":"GET,POST,OPTIONS","access-control-allow-headers":"content-type,x-neuro-token","vary":"Origin"};
}
export default {
 async fetch(request, env) {
  const url=new URL(request.url), origin=request.headers.get("origin")||"";
  const headers=cors(origin,env);
  if(request.method==="OPTIONS") return new Response(null,{status:204,headers});
  if(url.pathname==="/health") return Response.json({ok:true,service:"NEURO LEAGUE OPEN HUB",openaiConfigured:!!env.OPENAI_API_KEY,metaConfigured:!!env.META_MODEL_API_KEY,quantumConfigured:!!env.IBM_QUANTUM_TOKEN},{headers});
  if(url.pathname==="/api/v1/threads" && request.method==="POST"){
    const threadId=crypto.randomUUID();
    return Response.json({threadId,eventsUrl:"/api/v1/threads/"+threadId+"/events"},{status:201,headers});
  }
  const threadMatch=url.pathname.match(/^\/api\/v1\/threads\/([a-f0-9-]{36})\/events$/i);
  if(threadMatch && (request.method==="GET" || request.method==="POST")){
    const threadId=threadMatch[1];
    const id=env.NEURO_BUS.idFromName("thread:"+threadId);
    const target=new URL(request.url); target.pathname="/events"; target.searchParams.set("threadId",threadId);
    const upstream=await env.NEURO_BUS.get(id).fetch(new Request(target.toString(),request));
    const outHeaders=new Headers(upstream.headers); Object.entries(headers).forEach(([k,v])=>outHeaders.set(k,v));
    return new Response(upstream.body,{status:upstream.status,statusText:upstream.statusText,headers:outHeaders});
  }
  if(url.pathname==="/api/chat" && request.method==="POST"){
    if(!env.OPENAI_API_KEY) return Response.json({error:"OPENAI_API_KEY is not configured"},{status:503,headers});
    try{
      const body=await request.json();
      if(!Array.isArray(body.messages)||body.messages.length>24) return Response.json({error:"Invalid messages"},{status:400,headers});
      const input=body.messages.map(m=>({role:m.role==="assistant"?"assistant":"user",content:String(m.content||"").slice(0,6000)}));
      const upstream=await fetch("https://api.openai.com/v1/responses",{method:"POST",headers:{"authorization":"Bearer "+env.OPENAI_API_KEY,"content-type":"application/json"},body:JSON.stringify({model:env.OPENAI_MODEL||"gpt-4.1-mini",instructions:SYSTEM,input,max_output_tokens:1200})});
      const data=await upstream.json();
      if(!upstream.ok) return Response.json({error:data.error?.message||"OpenAI request failed"},{status:502,headers});
      const reply=(data.output||[]).flatMap(x=>x.content||[]).filter(x=>x.type==="output_text").map(x=>x.text).join("\n");
      return Response.json({reply},{headers});
    }catch(e){return Response.json({error:"Request failed"},{status:400,headers});}
  }
  if(url.pathname==="/api/duo" && request.method==="POST"){
    if(!env.OPENAI_API_KEY || !env.GEMINI_API_KEY) return Response.json({error:"Skonfiguruj sekrety OPENAI_API_KEY i GEMINI_API_KEY w Cloudflare Worker."},{status:503,headers});
    try {
      const body=await request.json();
      if(!Array.isArray(body.messages) || body.messages.length>60) return Response.json({error:"Invalid messages"},{status:400,headers});
      const transcript=body.messages.slice(-40).map(m=>{
        const who=m.speaker==="user"?"CZŁOWIEK":m.speaker==="chatgpt"?"CHATGPT":"GEMINI";
        return who+": "+String(m.text||"").slice(0,10000);
      }).join("\n\n");
      const shared="Jesteś niezależnym uczestnikiem wspólnego pokoju NEURO LEAGUE OPEN. Rozmawiasz bezpośrednio z człowiekiem i drugim modelem AI. Czytaj wspólną historię, zachowuj własne stanowisko, nie przytakuj automatycznie. Możesz krytykować i rozwijać wypowiedzi drugiego modelu. Odpowiadaj po polsku, konkretnie. Rozróżniaj fakty, hipotezy i niewiadome. Nie twierdź, że wykonałeś działania, do których nie masz narzędzi.\n\nWSPÓLNA HISTORIA:\n"+transcript+"\n\nOdpowiedz teraz na ostatnią wypowiedź człowieka, uwzględniając cały kontekst.";
      const requests=await Promise.allSettled([
        fetch("https://api.openai.com/v1/responses",{method:"POST",headers:{"authorization":"Bearer "+env.OPENAI_API_KEY,"content-type":"application/json"},body:JSON.stringify({model:env.OPENAI_MODEL||"gpt-4.1-mini",instructions:shared,input:"Kontynuuj wspólną rozmowę. Przedstaw własną odpowiedź." ,max_output_tokens:1600})}).then(async r=>{const d=await r.json();if(!r.ok)throw Error(d.error?.message||"OpenAI request failed");return d.output_text||((d.output||[]).flatMap(x=>x.content||[]).filter(x=>x.type==="output_text").map(x=>x.text).join("\n"));}),
        fetch("https://generativelanguage.googleapis.com/v1beta/models/"+encodeURIComponent(env.GEMINI_MODEL||"gemini-2.5-flash")+":generateContent?key="+encodeURIComponent(env.GEMINI_API_KEY),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({systemInstruction:{parts:[{text:shared}]},contents:[{role:"user",parts:[{text:"Kontynuuj wspólną rozmowę. Przedstaw własną odpowiedź."}]}]})}).then(async r=>{const d=await r.json();if(!r.ok)throw Error(d.error?.message||"Gemini request failed");return (d.candidates?.[0]?.content?.parts||[]).map(p=>p.text||"").join("\n");})
      ]);
      return Response.json({chatgpt:requests[0].status==="fulfilled"?requests[0].value:null,gemini:requests[1].status==="fulfilled"?requests[1].value:null,errors:{chatgpt:requests[0].status==="rejected"?String(requests[0].reason.message):null,gemini:requests[1].status==="rejected"?String(requests[1].reason.message):null}},{headers});
    } catch(e) { return Response.json({error:e.message||"Duo request failed"},{status:400,headers}); }
  }

  if(url.pathname==="/api/trio" && request.method==="POST"){
    if(!env.OPENAI_API_KEY || !env.META_MODEL_API_KEY) return Response.json({error:"Skonfiguruj sekrety OPENAI_API_KEY i META_MODEL_API_KEY w Cloudflare Worker."},{status:503,headers});
    try {
      const body=await request.json();
      if(!Array.isArray(body.messages) || body.messages.length>60) return Response.json({error:"Invalid messages"},{status:400,headers});
      const transcript=body.messages.slice(-40).map(m=>{
        const who=m.speaker==="user"||m.speaker==="human"?"CZŁOWIEK":m.speaker==="chatgpt"?"CHATGPT":m.speaker==="meta"?"META":"INNY UCZESTNIK";
        return who+": "+String(m.text||"").slice(0,10000);
      }).join("\n\n");
      const shared="Jesteś niezależnym uczestnikiem wspólnego pokoju NEURO LEAGUE OPEN. Rozmawiasz bezpośrednio z człowiekiem i drugim modelem AI. Czytaj wspólną historię, zachowuj własne stanowisko, nie przytakuj automatycznie. Możesz krytykować i rozwijać wypowiedzi drugiego modelu. Odpowiadaj po polsku, konkretnie. Rozróżniaj fakty, hipotezy i niewiadome. Nie twierdź, że wykonałeś działania, do których nie masz narzędzi.\n\nWSPÓLNA HISTORIA:\n"+transcript+"\n\nOdpowiedz teraz na ostatnią wypowiedź człowieka, uwzględniając cały kontekst.";
      const tasks=[
        fetch("https://api.openai.com/v1/responses",{method:"POST",headers:{"authorization":"Bearer "+env.OPENAI_API_KEY,"content-type":"application/json"},body:JSON.stringify({model:env.OPENAI_MODEL||"gpt-4.1-mini",instructions:shared,input:"Kontynuuj wspólną rozmowę. Przedstaw własną odpowiedź.",max_output_tokens:1600})}).then(async r=>{const d=await r.json();if(!r.ok)throw Error(d.error?.message||"OpenAI request failed");return d.output_text||((d.output||[]).flatMap(x=>x.content||[]).filter(x=>x.type==="output_text").map(x=>x.text).join("\n"));}),
        fetch("https://api.meta.ai/v1/responses",{method:"POST",headers:{"authorization":"Bearer "+env.META_MODEL_API_KEY,"content-type":"application/json"},body:JSON.stringify({model:env.META_MODEL||"muse-spark-1.3",instructions:shared,input:"Kontynuuj wspólną rozmowę. Przedstaw własną, niezależną odpowiedź.",max_output_tokens:1600})}).then(async r=>{const d=await r.json();if(!r.ok)throw Error(d.error?.message||"Meta Model API request failed");return d.output_text||((d.output||[]).flatMap(x=>x.content||[]).filter(x=>x.type==="output_text").map(x=>x.text).join("\n"));})
      ];
      const results=await Promise.allSettled(tasks), names=["chatgpt","meta"], payload={errors:{}};
      names.forEach((name,i)=>{payload[name]=results[i].status==="fulfilled"?results[i].value:null;payload.errors[name]=results[i].status==="rejected"?String(results[i].reason?.message||results[i].reason):null;});
      return Response.json(payload,{headers});
    } catch(e) { return Response.json({error:e.message||"Shared room request failed"},{status:400,headers}); }
  }
  if(url.pathname==="/api/bus"){
    if(!env.NEURO_BUS_TOKEN || request.headers.get("x-neuro-token")!==env.NEURO_BUS_TOKEN) return Response.json({error:"Unauthorized"},{status:401,headers});
    const id=env.NEURO_BUS.idFromName("global");
    return env.NEURO_BUS.get(id).fetch(request);
  }
  return new Response("Not found",{status:404,headers});
 }
};