import { useState } from "react";

const C = {
  navy:"#1B2A4A", navyDeep:"#0F1E36",
  teal:"#0D9488", tealMid:"#14B8A6", tealLight:"#CCFBF1", tealBg:"#ECFDF5",
  amber:"#D97706", amberLight:"#FEF3C7", amberBorder:"#FCD34D",
  slate:"#F8FAFC", border:"#E2E8F0",
  text:"#0F172A", muted:"#64748B",
  white:"#FFFFFF",
  green:"#059669", greenLight:"#D1FAE5",
  blue:"#2563EB", blueBg:"#EFF6FF", blueBorder:"#93C5FD",
  red:"#DC2626", redLight:"#FEE2E2",
  purple:"#7C3AED",
};

const DOCTORS = [
  { id:1, name:"Dr. Priya Sharma", emoji:"👩‍⚕️", specialty:"General Physician", exp:"12 yrs",
    hospital:"Apollo Health Hub, Connaught Place", languages:["English","Hindi","Tamil"],
    rating:4.9, reviews:312, verified:true, fee:800, onlineFee:400,
    distance:"1.2 km", nextSlot:"Today 3:30 PM", accepts:["Insurance","Cash","Card"],
    about:"Expert in travel medicine. Regularly sees international patients and provides clear cost estimates upfront.", city:"New Delhi" },
  { id:2, name:"Dr. Arjun Mehta", emoji:"👨‍⚕️", specialty:"Emergency Medicine", exp:"9 yrs",
    hospital:"Max Super Speciality Hospital", languages:["English","Hindi"],
    rating:4.8, reviews:198, verified:true, fee:1200, onlineFee:600,
    distance:"2.8 km", nextSlot:"Today 5:00 PM", accepts:["Insurance","Cash","Intl. Card"],
    about:"Handles tourist emergencies including food poisoning, injuries, and acute conditions. Fluent in English.", city:"New Delhi" },
  { id:3, name:"Dr. Kavitha Nair", emoji:"👩‍⚕️", specialty:"Gastroenterology", exp:"15 yrs",
    hospital:"Fortis Healthcare, Vasant Kunj", languages:["English","Malayalam","Hindi"],
    rating:4.7, reviews:445, verified:true, fee:1500, onlineFee:750,
    distance:"4.1 km", nextSlot:"Tomorrow 10:00 AM", accepts:["Insurance","Cash","Card"],
    about:"Specialist in travel GI issues. Treats dietary allergies and food poisoning common in tourists.", city:"New Delhi" },
  { id:4, name:"Dr. Rahul Gupta", emoji:"👨‍⚕️", specialty:"General Physician", exp:"7 yrs",
    hospital:"Columbia Asia Hospital, Hebbal", languages:["English","Hindi","Kannada"],
    rating:4.6, reviews:287, verified:true, fee:600, onlineFee:300,
    distance:"0.8 km", nextSlot:"Today 2:00 PM", accepts:["Cash","Card"],
    about:"Quick consultations for travel ailments. Known for clear communication with out-of-town patients.", city:"Bangalore" },
  { id:5, name:"Dr. Sunita Patel", emoji:"👩‍⚕️", specialty:"Dermatology", exp:"18 yrs",
    hospital:"Kokilaben Ambani Hospital", languages:["English","Hindi","Gujarati"],
    rating:4.9, reviews:521, verified:true, fee:1800, onlineFee:900,
    distance:"3.5 km", nextSlot:"Today 6:30 PM", accepts:["Insurance","Cash","Intl. Card"],
    about:"Expert in travel skin conditions, allergic reactions, and tropical insect bites.", city:"Mumbai" },
];

const SPECS = ["All Specialties","General Physician","Emergency Medicine","Gastroenterology","Dermatology","Orthopedics","Pediatrics"];
const CITIES = ["All Cities","New Delhi","Mumbai","Bangalore","Chennai","Jaipur","Hyderabad"];
const LANGS = ["All Languages","English","Hindi","Tamil","Malayalam","Kannada","Gujarati"];

function Sel({ label, val, set, opts }) {
  return (
    <div>
      <div style={{ fontSize:10, fontWeight:600, color:C.muted, letterSpacing:"1.2px", textTransform:"uppercase", marginBottom:5 }}>{label}</div>
      <select value={val} onChange={e => set(e.target.value)}
        style={{ width:"100%", padding:"9px 10px", border:`1.5px solid ${C.border}`, borderRadius:8, fontSize:13, color:C.text, background:C.slate, cursor:"pointer" }}>
        {opts.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Tag({ children, bg, col }) {
  return <span style={{ background:bg||C.slate, color:col||C.muted, fontSize:11, padding:"3px 8px", borderRadius:6, fontWeight:500 }}>{children}</span>;
}

function Card({ children, style={} }) {
  return <div style={{ background:C.white, borderRadius:14, padding:"22px", border:`1.5px solid ${C.border}`, ...style }}>{children}</div>;
}

export default function MediRoam() {
  const [view, setView] = useState("home");
  const [city, setCity] = useState("All Cities");
  const [spec, setSpec] = useState("All Specialties");
  const [lang, setLang] = useState("All Languages");
  const [doc, setDoc] = useState(null);
  const [sosDone, setSosDone] = useState(false);
  const [booked, setBooked] = useState(false);

  const filtered = DOCTORS.filter(d =>
    (city === "All Cities" || d.city === city) &&
    (spec === "All Specialties" || d.specialty === spec) &&
    (lang === "All Languages" || d.languages.includes(lang))
  );

  function openDoc(d) { setDoc(d); setBooked(false); setView("detail"); }

  return (
    <div style={{ fontFamily:"'Inter',-apple-system,sans-serif", minHeight:"100vh", background:C.slate, color:C.text }}>
      {/* NAVBAR */}
      <nav style={{ background:C.navy, height:54, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 20px", position:"sticky", top:0, zIndex:99, boxShadow:"0 2px 16px rgba(0,0,0,0.28)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }} onClick={() => setView("home")}>
          <div style={{ width:30, height:30, borderRadius:8, background:`linear-gradient(135deg,${C.teal},${C.tealMid})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15 }}>⛑️</div>
          <div>
            <span style={{ fontWeight:800, fontSize:16, color:"white", letterSpacing:"-0.5px" }}>MediRoam</span>
            <span style={{ fontSize:9, color:"#5EEAD4", display:"block", letterSpacing:"2px", textTransform:"uppercase", lineHeight:1 }}>Travel Medical Care</span>
          </div>
        </div>
        <div style={{ display:"flex", gap:4 }}>
          {[{id:"home",label:"🔍 Find Care"},{id:"sos",label:"🆘 Emergency"},{id:"blueprint",label:"📋 Startup Kit"}].map(t => (
            <button key={t.id} onClick={() => setView(t.id)} style={{ padding:"5px 13px", borderRadius:7, border:"none", cursor:"pointer", fontSize:12, fontWeight:600,
              background: view===t.id ? (t.id==="sos"?"#D97706":C.teal) : "transparent",
              color: view===t.id ? "white" : "#94A3B8", transition:"all 0.15s" }}>{t.label}</button>
          ))}
        </div>
      </nav>

      {/* VIEWS */}
      {view==="home" && <HomeView city={city} setCity={setCity} spec={spec} setSpec={setSpec} lang={lang} setLang={setLang} onSearch={() => setView("results")} />}
      {view==="results" && <ResultsView docs={filtered} city={city} spec={spec} onSelect={openDoc} onBack={() => setView("home")} />}
      {view==="detail" && doc && <DetailView doc={doc} booked={booked} setBooked={setBooked} onBack={() => setView("results")} />}
      {view==="sos" && <SOSView done={sosDone} setDone={setSosDone} />}
      {view==="blueprint" && <BlueprintView />}
    </div>
  );
}

/* ─── HOME ─────────────────────────────────────────────────── */
function HomeView({ city, setCity, spec, setSpec, lang, setLang, onSearch }) {
  return (
    <div>
      <div style={{ background:`linear-gradient(140deg,${C.navy} 0%,${C.teal} 100%)`, padding:"56px 20px 72px", textAlign:"center" }}>
        <div style={{ maxWidth:600, margin:"0 auto" }}>
          <div style={{ fontSize:10, letterSpacing:"3px", color:"#5EEAD4", textTransform:"uppercase", fontWeight:700, marginBottom:14 }}>Trusted Care · Any City · Transparent Pricing</div>
          <h1 style={{ fontSize:40, fontWeight:900, color:"white", lineHeight:1.1, letterSpacing:"-1.5px", margin:"0 0 14px" }}>
            Find a doctor.<br /><span style={{ color:"#FCD34D" }}>Know the cost first.</span>
          </h1>
          <p style={{ color:"#94A3B8", fontSize:15, lineHeight:1.7, margin:"0 0 36px" }}>
            Verified English-speaking doctors with upfront pricing — for travelers who need care, not confusion.
          </p>
          <div style={{ background:"white", borderRadius:16, padding:20, boxShadow:"0 20px 56px rgba(0,0,0,0.3)", textAlign:"left" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:12 }}>
              <Sel label="📍 City" val={city} set={setCity} opts={CITIES} />
              <Sel label="🏥 Specialty" val={spec} set={setSpec} opts={SPECS} />
              <Sel label="🗣️ Language" val={lang} set={setLang} opts={LANGS} />
            </div>
            <button onClick={onSearch} style={{ width:"100%", padding:"13px", background:`linear-gradient(135deg,${C.teal},${C.tealMid})`, color:"white", border:"none", borderRadius:10, fontSize:15, fontWeight:700, cursor:"pointer" }}>
              Search Verified Doctors →
            </button>
          </div>
        </div>
      </div>

      <div style={{ background:C.white, borderBottom:`1px solid ${C.border}`, padding:"18px 20px", display:"flex", justifyContent:"center", gap:52 }}>
        {[["2,400+","Verified Doctors"],["85+","Cities"],["12","Languages"],["4.8★","Avg Rating"]].map(([n,l]) => (
          <div key={l} style={{ textAlign:"center" }}>
            <div style={{ fontSize:22, fontWeight:900, color:C.teal, letterSpacing:"-0.5px" }}>{n}</div>
            <div style={{ fontSize:11, color:C.muted, marginTop:1 }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth:860, margin:"44px auto", padding:"0 20px" }}>
        <h2 style={{ textAlign:"center", fontSize:24, fontWeight:800, letterSpacing:"-0.5px", marginBottom:28 }}>
          Built for travelers, <span style={{ color:C.teal }}>not locals.</span>
        </h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
          {[
            {icon:"💰",title:"Price Before You Go",desc:"See exact fees before booking. No billing surprises after treatment."},
            {icon:"✅",title:"Verified Providers",desc:"Background-checked, licensed, reviewed by real travelers like you."},
            {icon:"🗣️",title:"Language Match",desc:"Filter by language. Find doctors who communicate clearly with you."},
            {icon:"⚡",title:"Same-Day Slots",desc:"Book instantly. No 3-week wait to see a specialist in an unfamiliar city."},
            {icon:"🆘",title:"24/7 SOS Line",desc:"Emergency coordinator connects you to verified help within minutes."},
            {icon:"🌍",title:"Travel-Friendly",desc:"International cards accepted. Digital prescriptions. Telehealth available."},
          ].map(f => (
            <div key={f.title} style={{ background:C.white, borderRadius:12, padding:"18px 16px", border:`1.5px solid ${C.border}` }}>
              <div style={{ fontSize:26, marginBottom:10 }}>{f.icon}</div>
              <div style={{ fontWeight:700, fontSize:14, marginBottom:6 }}>{f.title}</div>
              <div style={{ fontSize:12, color:C.muted, lineHeight:1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── RESULTS ───────────────────────────────────────────────── */
function ResultsView({ docs, city, spec, onSelect, onBack }) {
  return (
    <div style={{ maxWidth:760, margin:"0 auto", padding:"28px 20px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
        <div>
          <h2 style={{ fontSize:20, fontWeight:800, letterSpacing:"-0.4px", margin:"0 0 4px" }}>
            {docs.length} verified {city!=="All Cities" ? `doctors in ${city}` : "doctors"}
          </h2>
          <div style={{ fontSize:13, color:C.muted }}>{spec!=="All Specialties"?spec:"All specialties"} · Sorted by availability</div>
        </div>
        <button onClick={onBack} style={{ background:"none", border:`1.5px solid ${C.border}`, borderRadius:8, padding:"6px 12px", cursor:"pointer", fontSize:13, color:C.muted }}>← Refine</button>
      </div>
      {docs.length===0 ? (
        <div style={{ background:C.white, borderRadius:16, padding:"56px 20px", textAlign:"center", border:`1.5px solid ${C.border}` }}>
          <div style={{ fontSize:40, marginBottom:12 }}>🔍</div>
          <div style={{ fontWeight:700, fontSize:17, marginBottom:6 }}>No doctors found</div>
          <div style={{ color:C.muted, marginBottom:20 }}>Try a different city, specialty, or language filter.</div>
          <button onClick={onBack} style={{ padding:"10px 24px", background:C.teal, color:"white", border:"none", borderRadius:8, fontWeight:600, cursor:"pointer" }}>← Change Filters</button>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {docs.map(d => <DocCard key={d.id} doc={d} onSelect={() => onSelect(d)} />)}
        </div>
      )}
    </div>
  );
}

function DocCard({ doc, onSelect }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onSelect} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ background:C.white, borderRadius:14, padding:"20px", border:`1.5px solid ${hov?C.teal:C.border}`, boxShadow:hov?"0 8px 28px rgba(13,148,136,0.1)":"0 1px 6px rgba(0,0,0,0.04)", cursor:"pointer", transition:"all 0.18s" }}>
      <div style={{ display:"flex", gap:14 }}>
        <div style={{ width:50, height:50, borderRadius:12, background:`linear-gradient(135deg,#E0F2FE,${C.tealLight})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>{doc.emoji}</div>
        <div style={{ flex:1 }}>
          <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:3 }}>
            <span style={{ fontWeight:800, fontSize:16 }}>{doc.name}</span>
            {doc.verified && <span style={{ background:C.greenLight, color:C.green, fontSize:10, fontWeight:700, padding:"2px 7px", borderRadius:20 }}>✓ Verified</span>}
          </div>
          <div style={{ fontSize:12, color:C.teal, fontWeight:600, marginBottom:4 }}>{doc.specialty} · {doc.exp}</div>
          <div style={{ fontSize:12, color:C.muted, marginBottom:8 }}>📍 {doc.hospital} · {doc.distance}</div>
          <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
            {doc.languages.map(l => <Tag key={l}>{l}</Tag>)}
          </div>
        </div>
        <div style={{ textAlign:"right", flexShrink:0 }}>
          <div style={{ background:`linear-gradient(135deg,${C.tealBg},${C.tealLight})`, border:`1.5px solid #6EE7B7`, borderRadius:10, padding:"10px 14px", marginBottom:7 }}>
            <div style={{ fontSize:9, color:C.green, fontWeight:700, letterSpacing:"1px", textTransform:"uppercase" }}>Consult Fee</div>
            <div style={{ fontSize:20, fontWeight:900, color:"#065F46", letterSpacing:"-0.5px" }}>₹{doc.fee}</div>
            <div style={{ fontSize:10, color:C.green }}>Online ₹{doc.onlineFee}</div>
          </div>
          <div style={{ fontSize:11, color:C.amber, fontWeight:600 }}>⏰ {doc.nextSlot}</div>
          <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>★ {doc.rating} ({doc.reviews})</div>
        </div>
      </div>
      <div style={{ marginTop:14, paddingTop:14, borderTop:`1px solid ${C.slate}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", gap:5 }}>{doc.accepts.map(a => <Tag key={a}>{a}</Tag>)}</div>
        <button style={{ background:C.teal, color:"white", border:"none", padding:"7px 16px", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer" }}>Book →</button>
      </div>
    </div>
  );
}

/* ─── DETAIL ────────────────────────────────────────────────── */
function DetailView({ doc, booked, setBooked, onBack }) {
  return (
    <div style={{ maxWidth:680, margin:"0 auto", padding:"28px 20px" }}>
      <button onClick={onBack} style={{ background:"none", border:"none", color:C.teal, cursor:"pointer", fontSize:13, fontWeight:600, marginBottom:18, padding:0 }}>← Back to results</button>
      <div style={{ background:C.white, borderRadius:20, overflow:"hidden", border:`1.5px solid ${C.border}` }}>
        <div style={{ background:`linear-gradient(135deg,${C.navy},${C.teal})`, padding:"28px", color:"white", display:"flex", gap:18, alignItems:"center" }}>
          <div style={{ width:68, height:68, borderRadius:18, background:"rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:34 }}>{doc.emoji}</div>
          <div>
            <h2 style={{ fontWeight:900, fontSize:22, letterSpacing:"-0.5px", margin:"0 0 4px" }}>{doc.name}</h2>
            <div style={{ color:"#5EEAD4", fontWeight:600, marginBottom:4, fontSize:13 }}>{doc.specialty} · {doc.exp}</div>
            <div style={{ color:"rgba(255,255,255,0.65)", fontSize:12 }}>📍 {doc.hospital}</div>
          </div>
        </div>
        <div style={{ padding:"28px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:24 }}>
            <div style={{ background:`linear-gradient(135deg,${C.tealBg},${C.tealLight})`, border:"2px solid #6EE7B7", borderRadius:14, padding:"18px", textAlign:"center" }}>
              <div style={{ fontSize:10, color:C.green, fontWeight:700, letterSpacing:"1px", textTransform:"uppercase", marginBottom:7 }}>In-Person Visit</div>
              <div style={{ fontSize:32, fontWeight:900, color:"#065F46", letterSpacing:"-1px" }}>₹{doc.fee}</div>
              <div style={{ fontSize:11, color:C.green, marginTop:4 }}>Final price — no hidden fees</div>
            </div>
            <div style={{ background:`linear-gradient(135deg,${C.blueBg},#DBEAFE)`, border:`2px solid ${C.blueBorder}`, borderRadius:14, padding:"18px", textAlign:"center" }}>
              <div style={{ fontSize:10, color:C.blue, fontWeight:700, letterSpacing:"1px", textTransform:"uppercase", marginBottom:7 }}>Online / Video</div>
              <div style={{ fontSize:32, fontWeight:900, color:"#1E40AF", letterSpacing:"-1px" }}>₹{doc.onlineFee}</div>
              <div style={{ fontSize:11, color:C.blue, marginTop:4 }}>Available 24 hrs</div>
            </div>
          </div>
          <div style={{ marginBottom:20 }}>
            <div style={{ fontWeight:700, fontSize:14, marginBottom:8 }}>About</div>
            <p style={{ color:"#475569", fontSize:13, lineHeight:1.7, margin:0 }}>{doc.about}</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:20 }}>
            <div>
              <div style={{ fontWeight:700, fontSize:13, marginBottom:8 }}>Languages Spoken</div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>{doc.languages.map(l => <Tag key={l}>{l}</Tag>)}</div>
            </div>
            <div>
              <div style={{ fontWeight:700, fontSize:13, marginBottom:8 }}>Accepts</div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>{doc.accepts.map(a => <Tag key={a}>{a}</Tag>)}</div>
            </div>
          </div>
          <div style={{ background:C.amberLight, border:`1.5px solid ${C.amberBorder}`, borderRadius:10, padding:"14px 16px", display:"flex", gap:10, alignItems:"center", marginBottom:20 }}>
            <span style={{ fontSize:22 }}>⏰</span>
            <div>
              <div style={{ fontWeight:700, color:"#92400E", fontSize:13 }}>Next Available</div>
              <div style={{ color:"#B45309", fontSize:12 }}>{doc.nextSlot}</div>
            </div>
          </div>
          {booked ? (
            <div style={{ background:C.greenLight, border:`1.5px solid #6EE7B7`, borderRadius:12, padding:"22px", textAlign:"center" }}>
              <div style={{ fontSize:32, marginBottom:8 }}>✅</div>
              <div style={{ fontWeight:800, fontSize:17, color:"#065F46", marginBottom:4 }}>Appointment Confirmed!</div>
              <div style={{ color:C.green, fontSize:13 }}>Directions and a digital receipt have been sent to your phone.</div>
            </div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              <button onClick={() => setBooked(true)} style={{ padding:"13px", background:`linear-gradient(135deg,${C.teal},${C.tealMid})`, color:"white", border:"none", borderRadius:10, fontSize:14, fontWeight:700, cursor:"pointer" }}>📅 Book In-Person</button>
              <button onClick={() => setBooked(true)} style={{ padding:"13px", background:C.navy, color:"white", border:"none", borderRadius:10, fontSize:14, fontWeight:700, cursor:"pointer" }}>💻 Book Online</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── SOS ───────────────────────────────────────────────────── */
function SOSView({ done, setDone }) {
  return (
    <div style={{ maxWidth:680, margin:"0 auto", padding:"40px 20px" }}>
      <div style={{ textAlign:"center", marginBottom:36 }}>
        <h2 style={{ fontSize:26, fontWeight:900, letterSpacing:"-0.6px", marginBottom:6 }}>Emergency Medical Help</h2>
        <p style={{ color:C.muted, fontSize:14 }}>24/7 helpline for travelers in medical distress</p>
      </div>
      <div style={{ textAlign:"center", marginBottom:36 }}>
        <button onClick={() => setDone(true)} style={{
          width:160, height:160, borderRadius:"50%",
          background: done ? `linear-gradient(135deg,#10B981,#059669)` : `linear-gradient(135deg,#EF4444,#DC2626)`,
          border: `6px solid ${done?"#6EE7B7":"#FCA5A5"}`,
          boxShadow: done ? "0 0 0 16px rgba(16,185,129,0.12)" : "0 0 0 16px rgba(239,68,68,0.12),0 0 0 32px rgba(239,68,68,0.06)",
          color:"white", cursor:"pointer", display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center", gap:6, margin:"0 auto", transition:"all 0.4s",
        }}>
          <span style={{ fontSize:36 }}>{done?"✅":"🆘"}</span>
          <span style={{ fontSize:13, fontWeight:800 }}>{done?"CONNECTED":"TAP FOR SOS"}</span>
        </button>
        {done && (
          <div style={{ marginTop:16, background:C.greenLight, border:`1.5px solid #6EE7B7`, borderRadius:12, padding:"14px 20px", maxWidth:340, margin:"16px auto 0", textAlign:"left" }}>
            <div style={{ fontWeight:700, color:"#065F46", marginBottom:4 }}>✅ Coordinator Connected</div>
            <div style={{ color:C.green, fontSize:13 }}>A MediRoam coordinator is contacting the nearest verified doctor. Response in 2–4 minutes.</div>
          </div>
        )}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
        {[
          {icon:"🏥",title:"Nearest ER",val:"Apollo Hospitals — 0.8 km",sub:"Open 24/7 · Emergency Wing"},
          {icon:"🚑",title:"Ambulance",val:"Dial 108 (Free, National)",sub:"Also: 1066 Tourist Helpline"},
          {icon:"💊",title:"24hr Pharmacy",val:"MedPlus — 500m",sub:"Open now · Intl. cards accepted"},
          {icon:"📞",title:"MediRoam Helpline",val:"+91-1800-MED-ROAM",sub:"Free for all users · 24/7"},
        ].map(i => (
          <Card key={i.title}>
            <div style={{ fontSize:22, marginBottom:8 }}>{i.icon}</div>
            <div style={{ fontSize:10, color:C.muted, textTransform:"uppercase", letterSpacing:"1px", marginBottom:3 }}>{i.title}</div>
            <div style={{ fontWeight:700, fontSize:14, marginBottom:2 }}>{i.val}</div>
            <div style={{ fontSize:11, color:C.muted }}>{i.sub}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ─── BLUEPRINT ─────────────────────────────────────────────── */
function BlueprintView() {
  const [tab, setTab] = useState("model");
  const tabs = [{id:"model",label:"Business Model"},{id:"mvp",label:"MVP Roadmap"},{id:"tech",label:"Tech Stack"},{id:"revenue",label:"Revenue"},{id:"gtm",label:"Go-to-Market"}];
  return (
    <div style={{ maxWidth:860, margin:"0 auto", padding:"28px 20px" }}>
      <div style={{ background:`linear-gradient(135deg,${C.navy},${C.teal})`, borderRadius:16, padding:"26px", color:"white", textAlign:"center", marginBottom:24 }}>
        <div style={{ fontSize:10, color:"#5EEAD4", letterSpacing:"3px", textTransform:"uppercase", fontWeight:700, marginBottom:10 }}>Founder Dashboard</div>
        <h2 style={{ fontSize:24, fontWeight:900, letterSpacing:"-0.6px", margin:"0 0 6px" }}>MediRoam Startup Kit</h2>
        <p style={{ color:"#94A3B8", fontSize:13, margin:0 }}>Everything you need to launch this startup, fast.</p>
      </div>
      <div style={{ display:"flex", gap:8, marginBottom:24, flexWrap:"wrap" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ padding:"7px 14px", borderRadius:8, border:`1.5px solid ${tab===t.id?C.teal:C.border}`, background:tab===t.id?"#ECFDF5":C.white, color:tab===t.id?C.teal:C.muted, fontWeight:600, fontSize:13, cursor:"pointer", transition:"all 0.15s" }}>{t.label}</button>
        ))}
      </div>
      {tab==="model" && <ModelTab />}
      {tab==="mvp" && <MVPTab />}
      {tab==="tech" && <TechTab />}
      {tab==="revenue" && <RevenueTab />}
      {tab==="gtm" && <GTMTab />}
    </div>
  );
}

function ModelTab() {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <Card>
        <div style={{ fontWeight:800, fontSize:16, marginBottom:18 }}>🎯 Problem → Solution</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 32px 1fr", gap:16, alignItems:"center" }}>
          <div style={{ background:C.redLight, borderRadius:10, padding:16 }}>
            <div style={{ fontWeight:700, color:C.red, marginBottom:10, fontSize:13 }}>❌ Traveler Pain Points</div>
            {["No idea which clinic to trust","Can't predict treatment costs","Language barriers with doctors","Fear of being overcharged","No fast help in emergencies"].map(p => (
              <div key={p} style={{ fontSize:12, color:"#7F1D1D", marginBottom:6, paddingLeft:10, borderLeft:"2px solid #FCA5A5" }}>{p}</div>
            ))}
          </div>
          <div style={{ textAlign:"center", fontSize:22, color:C.muted }}>→</div>
          <div style={{ background:C.greenLight, borderRadius:10, padding:16 }}>
            <div style={{ fontWeight:700, color:C.green, marginBottom:10, fontSize:13 }}>✅ MediRoam Solution</div>
            {["Verified, background-checked doctors","Price locked before you book","Language-based doctor filter","Transparent fee display","24/7 SOS coordinator hotline"].map(s => (
              <div key={s} style={{ fontSize:12, color:"#064E3B", marginBottom:6, paddingLeft:10, borderLeft:"2px solid #6EE7B7" }}>{s}</div>
            ))}
          </div>
        </div>
      </Card>
      <Card>
        <div style={{ fontWeight:800, fontSize:16, marginBottom:18 }}>👥 Target Customers</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
          {[{icon:"✈️",title:"International Tourists",desc:"Foreign visitors in India",stat:"~30M visitors/year"},{icon:"🏠",title:"Domestic Travelers",desc:"Indians in unfamiliar cities",stat:"~1.4B trips/year"},{icon:"💼",title:"Business Travelers",desc:"Professionals away from home",stat:"~20M travelers"}].map(u => (
            <div key={u.title} style={{ background:C.slate, borderRadius:10, padding:16 }}>
              <div style={{ fontSize:24, marginBottom:8 }}>{u.icon}</div>
              <div style={{ fontWeight:700, fontSize:13, marginBottom:4 }}>{u.title}</div>
              <div style={{ fontSize:12, color:C.muted, marginBottom:6 }}>{u.desc}</div>
              <div style={{ fontSize:11, color:C.teal, fontWeight:700 }}>{u.stat}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function MVPTab() {
  const phases = [
    {label:"Month 1–2",title:"Launch MVP Fast",color:C.teal,items:["Doctor search by city + specialty","Language filter for English speakers","Price shown before booking","WhatsApp-based booking (no app!)","Doctor profile pages with ratings","SOS emergency number display"]},
    {label:"Month 3–4",title:"Product Growth",color:C.navy,items:["In-app booking + confirmation","Real-time slot availability","Multilingual interface (5 languages)","Insurance verification module","Digital prescription sharing","Push notifications + reminders"]},
    {label:"Month 5–6",title:"Scale Up",color:C.purple,items:["Telehealth video consultations","24/7 live SOS coordinator team","Travel insurance integrations","Hospital fast-track partnerships","AI symptom checker (triage)","B2B API for hotels + travel agencies"]},
  ];
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      {phases.map(p => (
        <Card key={p.label}>
          <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:14 }}>
            <div style={{ width:10, height:10, borderRadius:"50%", background:p.color, flexShrink:0 }} />
            <div>
              <div style={{ fontSize:10, color:C.muted, fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase" }}>{p.label}</div>
              <div style={{ fontWeight:800, fontSize:15 }}>{p.title}</div>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:7 }}>
            {p.items.map(it => (
              <div key={it} style={{ display:"flex", gap:7, fontSize:12, color:"#475569", alignItems:"flex-start" }}>
                <span style={{ color:p.color, flexShrink:0 }}>✓</span>{it}
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

function TechTab() {
  const stack = [
    {cat:"Frontend / App",col:C.tealMid,items:["React Native (iOS + Android)","Expo for fast deployment","Web version in Tailwind CSS"]},
    {cat:"Backend API",col:C.navy,items:["Node.js + Express","PostgreSQL (doctor data)","Redis (caching + sessions)"]},
    {cat:"Core Integrations",col:C.amber,items:["Twilio (SMS + WhatsApp)","Google Maps (location)","Razorpay (India payments)"]},
    {cat:"Hosting & Ops",col:C.purple,items:["AWS or Render.com","Supabase (auth + DB)","SendGrid (email)"]},
    {cat:"Doctor Verification",col:C.teal,items:["NMC license check","KYC document workflow","Trust scoring algorithm"]},
    {cat:"🚀 Launch Fast (No-Code)",col:"#10B981",items:["Webflow + Airtable for V1","WhatsApp bot for MVP booking","Google Forms to onboard doctors"]},
  ];
  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:13 }}>
      {stack.map(s => (
        <Card key={s.cat}>
          <div style={{ fontSize:11, fontWeight:700, color:s.col, letterSpacing:"0.5px", textTransform:"uppercase", marginBottom:10 }}>{s.cat}</div>
          {s.items.map(i => (
            <div key={i} style={{ fontSize:12, color:"#475569", marginBottom:7, paddingLeft:9, borderLeft:`2px solid ${s.col}33` }}>{i}</div>
          ))}
        </Card>
      ))}
    </div>
  );
}

function RevenueTab() {
  return (
    <div>
      <div style={{ background:`linear-gradient(135deg,${C.tealBg},${C.tealLight})`, borderRadius:14, padding:22, marginBottom:18, border:`1.5px solid #6EE7B7` }}>
        <div style={{ fontWeight:800, fontSize:18, color:"#065F46", marginBottom:4 }}>Revenue Potential</div>
        <div style={{ color:C.green, fontSize:13, marginBottom:16 }}>5,000 listed doctors + 10,000 bookings/month by Month 12</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
          {[["Year 1 ARR","₹1.2 Cr+"],["Year 2 ARR","₹6 Cr+"],["Year 3 ARR","₹20 Cr+"]].map(([l,v]) => (
            <div key={l} style={{ background:C.white, borderRadius:10, padding:14, textAlign:"center" }}>
              <div style={{ fontSize:20, fontWeight:900, color:"#065F46" }}>{v}</div>
              <div style={{ fontSize:11, color:C.green }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        {[
          {icon:"💎",title:"Doctor Subscriptions",desc:"₹2,000–₹8,000/month to be listed + verified",earn:"₹24L–₹96L ARR per 1,000 doctors"},
          {icon:"📊",title:"Booking Commission",desc:"5–10% fee on every in-person or online booking",earn:"₹200–₹500 per booking"},
          {icon:"🏢",title:"B2B API for Hotels",desc:"Hotels embed MediRoam to serve sick guests",earn:"₹50K–₹5L/month per client"},
          {icon:"🌐",title:"Insurance Referrals",desc:"Referral fee from travel insurance partners",earn:"₹500–₹2,000 per referral"},
          {icon:"⭐",title:"Premium Traveler Plans",desc:"₹999/year — priority slots + SOS coordinator",earn:"₹10L per 1,000 subscribers"},
          {icon:"💊",title:"Pharmacy Referrals",desc:"Commission from MedPlus on prescription fills",earn:"₹50–₹200 per prescription"},
        ].map(s => (
          <Card key={s.title}>
            <div style={{ display:"flex", gap:10, marginBottom:8 }}>
              <span style={{ fontSize:20 }}>{s.icon}</span>
              <span style={{ fontWeight:700, fontSize:14, alignSelf:"center" }}>{s.title}</span>
            </div>
            <div style={{ fontSize:12, color:C.muted, lineHeight:1.5, marginBottom:8 }}>{s.desc}</div>
            <div style={{ fontSize:11, color:C.teal, fontWeight:700 }}>{s.earn}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function GTMTab() {
  const phases = [
    {day:"Day 1–30",title:"Soft Launch in 1 City",steps:["Target Jaipur — tourism + medical hub","Onboard 50 verified English-speaking doctors","WhatsApp booking bot (no app needed)","Partner with 3 hotels to refer sick guests","Facebook/Instagram ads targeting tourists"]},
    {day:"Day 31–60",title:"Prove & Iterate",steps:["Hit 500 bookings, collect NPS reviews","Expand to 2 more cities (Delhi + Goa)","Referral program: ₹200 credit per referral","Apply to Startup India + tourism incubators"]},
    {day:"Day 61–90",title:"Scale & Fundraise",steps:["Sign B2B deals with 5 hotels/agencies","Launch iOS + Android app","PR: Times Travel, NDTV, Economic Times","10 cities, 500 doctors, 5,000 bookings/month"]},
  ];
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <Card>
        <div style={{ fontWeight:800, fontSize:16, marginBottom:18 }}>📣 Key Marketing Channels</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
          {[{icon:"🏨",ch:"Hotel Partnerships",desc:"Concierge desks refer sick guests"},{icon:"✈️",ch:"OTA Integrations",desc:"MakeMyTrip/Booking.com checkout"},{icon:"📲",ch:"Social Ads",desc:"Target tourists arriving in city"},{icon:"📰",ch:"Travel Media PR",desc:"Times Travel, Lonely Planet India"},{icon:"🤝",ch:"Embassy Tie-ups",desc:"Recommended to visiting citizens"},{icon:"💬",ch:"Expat Communities",desc:"Facebook groups, Reddit India"}].map(m => (
            <div key={m.ch} style={{ background:C.slate, borderRadius:9, padding:14 }}>
              <div style={{ fontSize:20, marginBottom:6 }}>{m.icon}</div>
              <div style={{ fontWeight:700, fontSize:12, marginBottom:4 }}>{m.ch}</div>
              <div style={{ fontSize:11, color:C.muted }}>{m.desc}</div>
            </div>
          ))}
        </div>
      </Card>
      {phases.map(p => (
        <Card key={p.day}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
            <span style={{ background:C.teal, color:"white", fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:20 }}>{p.day}</span>
            <span style={{ fontWeight:800, fontSize:14 }}>{p.title}</span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
            {p.steps.map(s => (
              <div key={s} style={{ fontSize:12, color:"#475569", display:"flex", gap:6 }}>
                <span style={{ color:C.teal, flexShrink:0 }}>→</span>{s}
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
