const STORAGE_KEY = "auroraos.apps.v1";
const SETTINGS_KEY = "auroraos.settings.v1";
const starterApps = [
  {id:"music",name:"Aurora Music",url:"https://example.com",icon:"🎵",starter:true},
  {id:"code",name:"Code Studio",url:"https://github.com",icon:"💻",starter:true},
  {id:"web",name:"Webアプリ",url:"https://vercel.com",icon:"🌐",starter:true},
  {id:"files",name:"ファイル・プロジェクト",url:"https://drive.google.com",icon:"🗂️",starter:true}
];
const $ = (id) => document.getElementById(id);
let apps = loadApps();
let editingId = null;
function loadApps(){try{const value=JSON.parse(localStorage.getItem(STORAGE_KEY));return Array.isArray(value)?value:starterApps.map(x=>({...x}));}catch{return starterApps.map(x=>({...x}));}}
function saveApps(){localStorage.setItem(STORAGE_KEY,JSON.stringify(apps));}
function loadSettings(){try{return JSON.parse(localStorage.getItem(SETTINGS_KEY))||{};}catch{return {};}}
function saveSettings(value){localStorage.setItem(SETTINGS_KEY,JSON.stringify(value));}
function safeUrl(value){try{const u=new URL(value);return u.protocol==="https:"||u.protocol==="http:"?u:null;}catch{return null;}}
function render(){
 const q=$("searchInput").value.trim().toLocaleLowerCase();
 const visible=apps.filter(a=>(a.name+" "+a.url).toLocaleLowerCase().includes(q));
 $("appGrid").innerHTML="";
 visible.forEach(app=>{
  const card=document.createElement("article");card.className="app-card";
  const launch=document.createElement("button");launch.className="app-launch";launch.type="button";
  const icon=document.createElement("span");icon.className="app-icon";icon.textContent=app.icon||"🚀";
  const name=document.createElement("span");name.className="app-name";name.textContent=app.name;
  const domain=document.createElement("div");domain.className="app-domain";domain.textContent=new URL(app.url).hostname;
  launch.append(icon,name,domain);launch.addEventListener("click",()=>openApp(app));
  const actions=document.createElement("div");actions.className="card-actions";
  const edit=document.createElement("button");edit.className="small-btn";edit.textContent="編集";edit.addEventListener("click",()=>showAppDialog(app));
  const remove=document.createElement("button");remove.className="small-btn";remove.textContent="削除";remove.addEventListener("click",()=>deleteApp(app));
  actions.append(edit,remove);card.append(launch,actions);$("appGrid").append(card);
 });
 $("emptyState").classList.toggle("hidden",visible.length!==0);
}
function openApp(app){const url=safeUrl(app.url);if(!url){alert("有効なURLではありません。編集して確認してください。");return;}window.open(url.href,"_blank","noopener,noreferrer");}
function showAppDialog(app=null){
 editingId=app?.id||null;$("dialogTitle").textContent=app?"アプリを編集":"アプリを追加";
 $("appName").value=app?.name||"";$("appUrl").value=app?.url==="https://example.com"?"":(app?.url||"");$("appIcon").value=app?.icon||"🚀";
 $("appDialog").showModal();
}
function deleteApp(app){if(!confirm(`「${app.name}」を削除しますか？`))return;apps=apps.filter(a=>a.id!==app.id);saveApps();render();}
$("appForm").addEventListener("submit",e=>{
 e.preventDefault();const name=$("appName").value.trim();const url=safeUrl($("appUrl").value.trim());
 if(!url){alert("http:// または https:// から始まるURLを入力してください。");return;}
 if(!name){alert("アプリ名を入力してください。");return;}
 if(editingId){apps=apps.map(a=>a.id===editingId?{...a,name,url:url.href,icon:$("appIcon").value}:a);}
 else apps.push({id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),name,url:url.href,icon:$("appIcon").value});
 saveApps();$("appDialog").close();render();
});
$("addBtn").addEventListener("click",()=>showAppDialog());
$("closeDialog").addEventListener("click",()=>$("appDialog").close());
$("cancelBtn").addEventListener("click",()=>$("appDialog").close());
$("searchInput").addEventListener("input",render);
function updateClock(){const d=new Date();$("clock").textContent=d.toLocaleTimeString("ja-JP",{hour:"2-digit",minute:"2-digit"});$("dateText").textContent=d.toLocaleDateString("ja-JP",{month:"long",day:"numeric",weekday:"short"});}
setInterval(updateClock,1000);updateClock();
function applySettings(){
 const s=loadSettings();document.body.classList.remove("accent-purple","accent-green");
 if(s.accent==="purple"||s.accent==="green")document.body.classList.add("accent-"+s.accent);
 $("displayName").value=s.displayName||"";$("accentSelect").value=s.accent||"blue";
 $("welcomeName");const h=$(".welcome h1");h.textContent=s.displayName?`おかえりなさい、${s.displayName}。`:"おかえりなさい。";
}
$("settingsBtn").addEventListener("click",()=>{$("settingsDialog").showModal();});
$("closeSettings").addEventListener("click",()=>$("settingsDialog").close());
$("settingsForm").addEventListener("submit",e=>{e.preventDefault();saveSettings({displayName:$("displayName").value.trim(),accent:$("accentSelect").value});applySettings();$("settingsDialog").close();});
$("resetBtn").addEventListener("click",()=>{if(confirm("初期アプリ一覧に戻しますか？登録したアプリは削除されます。")){apps=starterApps.map(x=>({...x}));saveApps();render();}});
applySettings();render();
if("serviceWorker" in navigator && location.protocol.startsWith("http"))navigator.serviceWorker.register("./sw.js").catch(()=>{});
