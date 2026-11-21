(() => {
  "use strict";
  const KEY = "neural-link-network-v01";
  const CONNECTIONS = "neural-link-connections-v01";
  const starter = {
    id: "TAR-001",
    name: "TAR-001 — Tarpenbek",
    place: "Norderstedt / Hamburg, Niemcy",
    category: "Regeneracja przyrody",
    stage: "Diagnoza — DRAFT 0.1 do weryfikacji",
    description: "Pilotażowa inicjatywa dotycząca diagnozy i możliwej regeneracji obszaru zlewni Tarpenbek. Zakładany proces: diagnoza, plan regeneracji, transparentność zasobów, rejestr działań i weryfikacja rezultatów. Wyniki terenowe wymagają udokumentowania i niezależnej weryfikacji.",
    offer: "Model dokumentowania diagnozy i przejrzystości działań (projektowany)",
    need: "Wiedza lokalna, partnerzy terenowi, metody pomiarowe",
    source: "starter"
  };
  const $ = id => document.getElementById(id);
  let nodes = [];\n  let remoteNodes = [];\n  let apiBase = "";
  let connections = [];
  try { nodes = JSON.parse(localStorage.getItem(KEY) || "[]"); if (!Array.isArray(nodes)) nodes = []; } catch { nodes = []; }
  try { connections = JSON.parse(localStorage.getItem(CONNECTIONS) || "[]"); if (!Array.isArray(connections)) connections = []; } catch { connections = []; }
  const allNodes = () => [starter, ...remoteNodes, ...nodes];
  const safeSave = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch { return false; }
  };
  function make(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }
  function render() {
    const query = $("nodeSearch").value.trim().toLocaleLowerCase("pl");
    const category = $("nodeCategory").value;
    const visible = allNodes().filter(n => (!category || n.category === category) &&
      [n.name,n.place,n.description,n.category,n.offer,n.need].join(" ").toLocaleLowerCase("pl").includes(query));
    const grid = $("nodeGrid");
    grid.replaceChildren();
    if (!visible.length) grid.append(make("div","network-empty","Nie znaleziono węzłów. Możesz zgłosić nową inicjatywę poniżej."));
    visible.forEach(n => {
      const card = make("article","node-card");
      card.append(make("span","node-meta", n.id === "TAR-001" ? "WĘZEŁ PILOTAŻOWY · OPIS PROJEKTU" : "LOKALNY SZKIC · TYLKO W TEJ PRZEGLĄDARCE"));
      card.append(make("h3","",n.name));
      card.append(make("div","node-tags",n.category + " · " + n.stage));
      card.append(make("p","",n.place));
      card.append(make("p","",n.description));
      if (n.offer) card.append(make("p","", "Może wnieść: " + n.offer));
      if (n.need) card.append(make("p","", "Poszukuje: " + n.need));
      const button = make("button","network-btn","Zaproponuj połączenie");
      button.type = "button";
      button.addEventListener("click", () => {
        $("connectTarget").value = n.id;
        $("connectMessage").focus();
        $("connectForm").scrollIntoView({behavior:"smooth",block:"center"});
      });
      card.append(button);
      grid.append(card);
    });
    const select = $("connectTarget");
    const current = select.value;
    select.replaceChildren();
    allNodes().forEach(n => {
      const option = document.createElement("option");
      option.value = n.id;
      option.textContent = n.name;
      select.append(option);
    });
    if (allNodes().some(n => n.id === current)) select.value = current;
  }
  function download(name, data) {
    const blob = new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href=url; a.download=name; a.click();
    URL.revokeObjectURL(url);
  }
  async function connectBackend() {
    const input = $("apiBase");
    const status = $("serverStatus");
    const candidate = (input.value || "").trim().replace(/\\/$/, "");
    if (!candidate || !/^https:\\/\\//i.test(candidate)) { status.textContent="Wpisz pełny adres HTTPS Workera."; return; }
    status.textContent="Sprawdzam połączenie…";
    try {
      const health = await fetch(candidate + "/health");
      if (!health.ok) throw new Error("Serwer zwrócił HTTP " + health.status);
      const healthData = await health.json();
      const response = await fetch(candidate + "/api/network/nodes");
      if (!response.ok) throw new Error("Nie udało się pobrać katalogu: HTTP " + response.status);
      const data = await response.json();
      if (!Array.isArray(data.nodes)) throw new Error("Nieprawidłowa odpowiedź katalogu.");
      apiBase = candidate;
      localStorage.setItem("neural-link-api-base-v1", apiBase);
      remoteNodes = data.nodes.map(n=>({...n,source:"server"}));
      render();
      status.textContent="Połączono. Publiczne węzły: " + remoteNodes.length + ". Serwer: " + (healthData.service || "NEURAL LINK API") + ".";
    } catch (error) {
      apiBase="";
      remoteNodes=[];
      status.textContent="Brak połączenia: " + error.message + ". Formularze pozostają lokalne.";
      render();
    }
  }
  $("connectServer").addEventListener("click",connectBackend);
  $("nodeSearch").addEventListener("input",render);
  $("nodeCategory").addEventListener("change",render);
  $("nodeForm").addEventListener("submit",event => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const node = {
      id:"LOCAL-"+Date.now().toString(36).toUpperCase(),
      name:data.name.trim(),place:data.place.trim(),category:data.category,
      stage:data.stage,description:data.description.trim(),offer:(data.offer||"").trim(),
      need:(data.need||"").trim(),source:"local",createdAt:new Date().toISOString()
    };
    if (apiBase) {
      fetch(apiBase + "/api/network/nodes", {method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(node)})
        .then(async response=>{const data=await response.json();if(!response.ok)throw new Error(data.error||"HTTP "+response.status);$("nodeStatus").textContent=data.message||"Zgłoszenie przyjęte do moderacji.";form.reset();})
        .catch(error=>{$("nodeStatus").textContent="Nie udało się wysłać zgłoszenia: "+error.message;});
      return;
    }
    nodes.unshift(node);
    if (!safeSave(KEY,nodes)) { nodes.shift(); $("nodeStatus").textContent="Brak miejsca na zapis w przeglądarce. Wyeksportuj dane lub zwolnij miejsce."; return; }
    form.reset(); $("nodeStatus").textContent="Karta została zapisana lokalnie na tym urządzeniu. Nie jest publicznie widoczna.";
    render();
  });
  $("connectForm").addEventListener("submit",event => {
    event.preventDefault();
    const form = event.currentTarget;\n    const data=Object.fromEntries(new FormData(form).entries());
    const item={id:"CON-"+Date.now().toString(36).toUpperCase(),target:data.target,purpose:data.purpose,message:data.message.trim(),createdAt:new Date().toISOString(),status:"Lokalny szkic — niewysłany"};
    if (apiBase) {
      fetch(apiBase + "/api/network/connections", {method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(item)})
        .then(async response=>{const data=await response.json();if(!response.ok)throw new Error(data.error||"HTTP "+response.status);$("connectStatus").textContent=data.message||"Propozycja przyjęta do moderacji.";event.currentTarget.reset();})
        .catch(error=>{$("connectStatus").textContent="Nie udało się wysłać propozycji: "+error.message;});
      return;
    }
    connections.unshift(item);
    if (!safeSave(CONNECTIONS,connections)) { connections.shift(); $("connectStatus").textContent="Nie udało się zapisać szkicu. Wyeksportuj dane lub zwolnij miejsce."; return; }
    form.reset(); $("connectStatus").textContent="Propozycja zapisana lokalnie. Nie została wysłana do właścicieli węzła.";
  });
  $("exportData").addEventListener("click",()=>download("neural-link-wezly.json",{starter,nodes,exportedAt:new Date().toISOString()}));
  $("exportConnections").addEventListener("click",()=>download("neural-link-propozycje-polaczen.json",{connections,exportedAt:new Date().toISOString()}));
  render();
})();