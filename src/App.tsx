import { useState } from "react";
import { calculateChandragati } from "./lib/chandragati";

export default function App() {
  const [ghati, setGhati] = useState("60");
  const [pal, setPal] = useState("31");
  const [res, setRes] = useState<any>(null);
  const [err, setErr] = useState("");

  const handleCalc = () => {
    setErr("");
    const g = parseInt(ghati, 10);
    const p = parseInt(pal, 10);
    if (isNaN(g) || g < 0 || isNaN(p) || p < 0 || p >= 60) {
      setErr("पल का मान 0 से 59 के बीच होना चाहिए।");
      setRes(null);
      return;
    }
    try {
      const r = calculateChandragati(g, p);
      setRes(r);
    } catch (e: any) {
      setErr(e.message || "त्रुटि");
      setRes(null);
    }
  };

  const reset = () => { setGhati(""); setPal(""); setRes(null); setErr(""); };

  return (
    <div className="min-h-screen bg-[#FFF8E7] text-[#4A2C0A] font-sans selection:bg-[#D4AF37]/30">
      <header className="text-center pt-10 pb-6 px-4">
        <h1 className="text-4xl md:text-6xl font-serif text-[#4A2C0A] tracking-wide">चन्द्रगति गणना</h1>
        <p className="mt-3 text-lg md:text-xl text-[#D4AF37] font-medium">भभोग पलात्मक मान से चन्द्रगति की गणना</p>
      </header>

      <main className="max-w-3xl mx-auto px-4 pb-20 space-y-8">
        {/* Input Card */}
        <section aria-label="Input" className="bg-white/80 backdrop-blur rounded-3xl shadow-xl border border-[#D4AF37]/20 p-8 md:p-10">
          <h2 className="text-2xl font-serif text-[#4A2C0A] mb-6">भभोग का मान</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-4">
            <label className="block">
              <span className="block font-semibold mb-1">घटी</span>
              <input type="number" min={0} value={ghati} onChange={e=>setGhati(e.target.value)} onKeyDown={e=>{if(e.key==='Enter') document.getElementById('pal')?.focus()}} className="w-full rounded-xl border-2 border-[#D4AF37]/40 px-4 py-3 text-lg focus:outline-none focus:border-[#F97316] bg-[#FFF8E7]" />
            </label>
            <label className="block">
              <span className="block font-semibold mb-1">पल</span>
              <input id="pal" type="number" min={0} max={59} value={pal} onChange={e=>setPal(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();handleCalc()}}} className="w-full rounded-xl border-2 border-[#D4AF37]/40 px-4 py-3 text-lg focus:outline-none focus:border-[#F97316] bg-[#FFF8E7]" />
            </label>
          </div>
          <p className="text-sm text-[#F97316] mb-6">पल का मान 0 से 59 के बीच होना चाहिए।</p>
          <div className="flex gap-4">
            <button onClick={handleCalc} className="flex-1 bg-[#F97316] text-white font-bold py-3 rounded-xl hover:bg-[#ea580c] transition shadow-lg">चन्द्रगति निकालें</button>
            <button onClick={reset} className="px-6 bg-[#4A2C0A] text-[#D4AF37] font-bold py-3 rounded-xl hover:bg-[#2e1a05] transition">रीसेट</button>
          </div>
          {err && <p className="mt-4 text-red-700 font-medium">{err}</p>}
        </section>

        {res && (
          <>
            <section aria-label="Result" className="bg-gradient-to-br from-[#4A2C0A] to-[#2e1a05] text-[#FFF8E7] rounded-3xl shadow-2xl p-10 text-center border border-[#D4AF37]/30">
              <h2 className="text-3xl font-serif mb-6 text-[#D4AF37]">चन्द्रगति</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-2xl p-4"><div className="text-4xl font-bold">{res.ghati}</div><div className="text-lg">घटी</div></div>
                <div className="bg-white/10 rounded-2xl p-4"><div className="text-4xl font-bold">{res.pal}</div><div className="text-lg">पल</div></div>
                <div className="bg-white/10 rounded-2xl p-4"><div className="text-4xl font-bold">{res.vipal}</div><div className="text-lg">विपल</div></div>
              </div>
              <div className="mt-6 text-2xl font-serif">{res.ghati} घटी {res.pal} पल {res.vipal} विपल</div>
            </section>

            <section aria-label="Steps" className="bg-white rounded-3xl shadow-xl border border-[#D4AF37]/20 p-8 md:p-10">
              <h3 className="text-2xl font-serif mb-6">गणना विधि</h3>
              <ol className="space-y-4 text-lg leading-relaxed">
                <li>① पलात्मक भभोग: {parseInt(ghati)} × 60 + {parseInt(pal)} = {res.bhabhogPal}</li>
                <li>② चन्द्रगति: 48000 ÷ {res.bhabhogPal}</li>
                <li>③ घटी = {res.ghati}; पल = {res.pal}; विपल = {res.vipal}</li>
                <li>Final: {res.ghati} घटी {res.pal} पल {res.vipal} विपल</li>
              </ol>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
