export class NeuroBus {
  constructor(state) { this.state = state; }
  async fetch(request) {
    const url = new URL(request.url);
    if (request.method === "POST") {
      const body = await request.json();
      if (!body || !/^[a-zA-Z0-9_-]{1,64}$/.test(body.agent || "") || typeof body.message !== "string" || body.message.length > 12000 || typeof body.sessionId !== "string" || body.sessionId.length > 100) return Response.json({error:"Invalid payload"},{status:400});
      const key = "messages";
      const items = await this.state.storage.get(key) || [];
      const item = {id: crypto.randomUUID(), agent: body.agent, message: body.message, sessionId: body.sessionId, createdAt: new Date().toISOString()};
      items.push(item);
      await this.state.storage.put(key, items.slice(-500));
      return Response.json({ok:true, message:item},{status:201});
    }
    if (request.method === "GET") {
      const sessionId = url.searchParams.get("sessionId");
      if (!sessionId) return Response.json({error:"sessionId required"},{status:400});
      const items = await this.state.storage.get("messages") || [];
      return Response.json({messages:items.filter(x=>x.sessionId===sessionId)});
    }
    return new Response("Method not allowed",{status:405});
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
  if(url.pathname==="/health") return Response.json({ok:true,service:"NEURO LEAGUE OPEN AI"},{headers});
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
  if(url.pathname==="/api/bus"){
    if(!env.NEURO_BUS_TOKEN || request.headers.get("x-neuro-token")!==env.NEURO_BUS_TOKEN) return Response.json({error:"Unauthorized"},{status:401,headers});
    const id=env.NEURO_BUS.idFromName("global");
    return env.NEURO_BUS.get(id).fetch(request);
  }
  return new Response("Not found",{status:404,headers});
 }
};