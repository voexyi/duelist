import React, { useEffect, useMemo, useState } from "react";
import { ShieldCheck, Crosshair, Eye, Grid2X2, Settings, Gem, Globe2, Home, ChevronDown, ChevronRight, Check, Monitor, SlidersHorizontal, Save, RotateCcw, KeyRound, LogOut } from "lucide-react";
const Card = ({ children, className = "" }: any) => (
  <div className={className}>{children}</div>
);

const CardContent = ({ children, className = "" }: any) => (
  <div className={className}>{children}</div>
);

const Button = ({
  children,
  className = "",
  onClick,
  disabled,
}: any) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={className}
  >
    {children}
  </button>
);



const menu = [
  { label: "Dashboard", icon: Home },
  { label: "Aimassist", icon: Crosshair },
  { label: "Triggerbot", icon: Crosshair },
  { label: "Visuals", icon: Eye },
  { label: "Misc", icon: Grid2X2 },
  { label: "Config", icon: Settings },
  { label: "Settings", icon: Settings },
];

const VALID_KEYS = [
  "DUELIST-1041-QX7M",
  "DUELIST-1042-LP2A",
  "DUELIST-1043-ZK8Q",
  "DUELIST-1044-TM5X",
  "DUELIST-1045-HQ1P",
  "DUELIST-7XK2-91QP",
  "DUELIST-2LM9-AKQ1",
  "DUELIST-8QPW-7ZMX",
  "DUELIST-11XZ-QPL9",
  "DUELIST-91AA-XK72",
  ...Array.from({ length: 520 }, (_, i) => `DUELIST-${String(i + 1000).slice(-4)}-${Math.random().toString(36).substring(2,6).toUpperCase()}`)
];

const initialFeatures = {
  Aimassist: true,
  Triggerbot: true,
  Visuals: true,
  Misc: true,
};

function Toggle({ enabled, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`h-7 w-14 rounded-full p-1 transition ${enabled ? "bg-zinc-950 border border-red-600/70" : "bg-zinc-800 border border-white/10"}`}
    >
      <div className={`h-5 w-5 rounded-full bg-white shadow transition ${enabled ? "ml-auto" : "ml-0"}`} />
    </button>
  );
}

function SliderRow({ label, value, onChange, min = 0, max = 100 }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm text-zinc-300">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-red-600 transition-all" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function SettingsPanel({ title, subtitle, children }) {
  return (
    <Card className="border-white/10 bg-black/80 text-white">
      <CardContent className="p-7">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold">{title}</h3>
            <p className="mt-1 text-zinc-400">{subtitle}</p>
          </div>
          <SlidersHorizontal className="h-8 w-8 text-red-500" />
        </div>
        <div className="my-6 h-px bg-white/10" />
        <div className="space-y-5">{children}</div>
      </CardContent>
    </Card>
  );
}

export default function DuelistWebGui() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [features, setFeatures] = useState(initialFeatures);
  const [toast, setToast] = useState("Ready.");
  const [checking, setChecking] = useState(false);
  const [aimSettings, setAimSettings] = useState({ smoothness: 68, fov: 42, delay: 24 });
  const [triggerSettings, setTriggerSettings] = useState({ delay: 31, burst: 56, accuracy: 74 });
  const [appSettings, setAppSettings] = useState({ scale: 82, accent: 76 });
  const [licenseKey, setLicenseKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const savedKey = localStorage.getItem("duelist_license");
    if (savedKey && (VALID_KEYS.includes(savedKey) || /^DUELIST-[0-9]{4}-[A-Z0-9]{4}$/.test(savedKey))) {
      setAuthenticated(true);
      setLicenseKey(savedKey);
    }
  }, []);

  const enabledCount = useMemo(() => Object.values(features).filter(Boolean).length, [features]);

  function notify(message) {
    setToast(message);
    window.clearTimeout((window as any).duelistToastTimer);
    (window as any).duelistToastTimer = window.setTimeout(() => setToast("Ready."), 2200);
  }

  function toggleFeature(feature) {
    setFeatures((prev) => ({ ...prev, [feature]: !prev[feature] }));
    notify(`${feature} toggled.`);
  }

  function authenticateKey() {
    const cleaned = licenseKey.trim().toUpperCase();
    const keyFormat = new RegExp('^DUELIST-[0-9]{4}-[A-Z0-9]{4}$');

    if (VALID_KEYS.includes(cleaned) || keyFormat.test(cleaned)) {
      localStorage.setItem("duelist_license", cleaned);
      setAuthenticated(true);
      setAuthError("");
      notify("License authenticated.");
    } else {
      setAuthError("Invalid license key.");
    }
  }

  function logout() {
    localStorage.removeItem("duelist_license");
    setAuthenticated(false);
    setLicenseKey("");
    setAuthError("");
  }

  

  function checkUpdates() {
    setChecking(true);
    setToast("Checking for updates...");
    setTimeout(() => {
      setChecking(false);
      notify("Duelist is up to date.");
    }, 900);
  }

  const pageContent = {
    Aimassist: (
      <SettingsPanel title="Aimassist" subtitle="Precision and target assistance settings.">
        <SliderRow label="Smoothness" value={aimSettings.smoothness} onChange={(value) => setAimSettings((prev) => ({ ...prev, smoothness: value }))} />
        <SliderRow label="Field of View" value={aimSettings.fov} onChange={(value) => setAimSettings((prev) => ({ ...prev, fov: value }))} />
        <SliderRow label="Reaction Delay" value={aimSettings.delay} onChange={(value) => setAimSettings((prev) => ({ ...prev, delay: value }))} />
        <div className="grid gap-3 md:grid-cols-2">
          <Button onClick={() => notify("Aimassist profile saved.")} className="bg-zinc-800 border border-white/10 hover:bg-zinc-700"><Save className="mr-2 h-4 w-4" />Save Aimassist</Button>
          <Button onClick={() => { setAimSettings({ smoothness: 68, fov: 42, delay: 24 }); notify("Aimassist reset."); }} className="border-white/10 bg-transparent text-white hover:bg-white/10"><RotateCcw className="mr-2 h-4 w-4" />Reset</Button>
        </div>
      </SettingsPanel>
    ),
    Triggerbot: (
      <SettingsPanel title="Triggerbot" subtitle="Trigger timing and response settings.">
        <SliderRow label="Trigger Delay" value={triggerSettings.delay} onChange={(value) => setTriggerSettings((prev) => ({ ...prev, delay: value }))} />
        <SliderRow label="Burst Control" value={triggerSettings.burst} onChange={(value) => setTriggerSettings((prev) => ({ ...prev, burst: value }))} />
        <SliderRow label="Accuracy Window" value={triggerSettings.accuracy} onChange={(value) => setTriggerSettings((prev) => ({ ...prev, accuracy: value }))} />
        <div className="rounded-xl border border-white/10 bg-zinc-950 p-4 text-zinc-300">Mode: Hold Key · Safety: Enabled · Response: External</div>
      </SettingsPanel>
    ),
    Visuals: (
      <SettingsPanel title="Visuals" subtitle="Clean interface and overlay appearance.">
        {['Box Overlay', 'Name Display', 'Distance Display', 'Minimal Glow'].map((name) => (
          <div key={name} className="flex items-center justify-between rounded-xl border border-white/10 bg-zinc-950 p-4">
            <span>{name}</span><Toggle enabled={true} onClick={() => notify(`${name} toggled.`)} />
          </div>
        ))}
      </SettingsPanel>
    ),
    Misc: (
      <SettingsPanel title="Misc" subtitle="Extra utility options.">
        {['Auto Start', 'Low CPU Mode', 'Compact UI', 'Notification Sounds'].map((name, i) => (
          <div key={name} className="flex items-center justify-between rounded-xl border border-white/10 bg-zinc-950 p-4">
            <span>{name}</span><Toggle enabled={i !== 3} onClick={() => notify(`${name} toggled.`)} />
          </div>
        ))}
      </SettingsPanel>
    ),
    Config: (
      <SettingsPanel title="Config" subtitle="Profiles and saved presets.">
        {['Default', 'Legit', 'Performance'].map((name) => (
          <button key={name} onClick={() => notify(`${name} config loaded.`)} className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-zinc-950 p-4 text-left hover:border-white/20">
            <span>{name} Profile</span><ChevronRight className="h-5 w-5 text-zinc-300" />
          </button>
        ))}
      </SettingsPanel>
    ),
    Settings: (
      <SettingsPanel title="Settings" subtitle="Application preferences.">
        <SliderRow label="UI Scale" value={appSettings.scale} onChange={(value) => setAppSettings((prev) => ({ ...prev, scale: value }))} />
        <SliderRow label="Red Accent Strength" value={appSettings.accent} onChange={(value) => setAppSettings((prev) => ({ ...prev, accent: value }))} />
        <div className="rounded-xl border border-white/10 bg-zinc-950 p-4 text-zinc-300">Theme: Matte Black · Accent: Duelist Red · Version: 2.4.1</div>
      </SettingsPanel>
    ),
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black text-white antialiased flex items-center justify-center overflow-hidden">
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_45%_20%,rgba(120,0,0,.12),transparent_34%),radial-gradient(circle_at_80%_80%,rgba(255,0,0,.08),transparent_28%)]" />

        <Card className="relative w-full max-w-lg border border-white/10 bg-black/90 backdrop-blur-xl text-white shadow-2xl shadow-red-950/20">
          <CardContent className="p-10">
            <div className="mb-8 flex items-center gap-4">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-zinc-950 text-3xl font-black tracking-tight text-white shadow-inner shadow-white/5">
                <span className="relative z-10">D</span>
                <div className="absolute inset-0 rounded-xl ring-1 ring-red-600/20" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold uppercase tracking-[.22em]">Duelist</h1>
                <p className="mt-1 text-zinc-500">Premium External Access</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5">
              <div className="mb-4 flex items-center gap-3 text-zinc-300">
                <KeyRound className="h-5 w-5 text-red-500" />
                <span>Enter your license key</span>
              </div>

              <input
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value.toUpperCase())}
                placeholder="DUELIST-XXXX-XXXX"
                className="h-14 w-full rounded-xl border border-white/10 bg-black px-5 text-lg outline-none transition focus:border-red-600/60"
              />

              {authError && (
                <div className="mt-4 rounded-lg border border-red-600/20 bg-red-600/10 px-4 py-3 text-sm text-red-400">
                  {authError}
                </div>
              )}

              <div className="mt-5">
                <Button onClick={authenticateKey} className="h-12 w-full border border-red-600/30 bg-zinc-950 hover:bg-zinc-900 text-white">
                  Authenticate
                </Button>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between text-sm text-zinc-500">
              <span>discord.gg/duelistgg</span>
              <span className="flex items-center gap-2 text-green-500">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                500+ active users
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white antialiased">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_45%_20%,rgba(120,0,0,.12),transparent_34%),radial-gradient(circle_at_80%_80%,rgba(255,0,0,.08),transparent_28%)]" />
      <main className="relative mx-auto flex min-h-screen max-w-[1500px] p-4 md:p-7">
        <div className="flex w-full overflow-hidden rounded-2xl border border-white/10 bg-black/95 shadow-2xl shadow-red-950/10">
          <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-zinc-950/80 md:block">
            <div className="flex h-24 items-center gap-4 border-b border-white/10 px-9">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-zinc-950 text-3xl font-black tracking-tight text-white shadow-inner shadow-white/5">
                <span className="relative z-10">D</span>
                <div className="absolute inset-0 rounded-xl ring-1 ring-red-600/20" />
              </div>
              <div className="text-[2rem] font-semibold uppercase tracking-[.28em] leading-none">Duelist</div>
            </div>
            <nav className="py-8">
              {menu.map((item) => {
                const active = activePage === item.label;
                return (
                  <button key={item.label} onClick={() => { setActivePage(item.label); notify(`${item.label} opened.`); }} className={`group relative flex h-20 w-full items-center gap-5 px-11 text-left text-lg transition ${active ? "bg-white/[.04] text-white" : "text-zinc-300 hover:bg-white/[.03] hover:text-white"}`}>
                    {active && <span className="absolute left-0 top-0 h-full w-1 bg-red-600 shadow-[0_0_18px_rgba(255,0,0,.65)]" />}
                    <item.icon className={`h-7 w-7 ${active ? "text-red-500" : "text-zinc-200"}`} strokeWidth={1.8} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <section className="flex min-w-0 flex-1 flex-col">
            <header className="flex h-24 items-center justify-end border-b border-white/10 px-8">
              <div className="flex items-center gap-5 text-zinc-300">
                <button onClick={logout} className="flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-950 px-4 py-2 text-sm transition hover:border-red-600/40 hover:text-white">
                  <LogOut className="h-4 w-4" /> Logout
                </button>
                <button onClick={() => notify("Window minimized.")} className="px-3 text-3xl leading-none hover:text-white">−</button>
                <button onClick={() => notify("Close clicked.")} className="px-3 text-4xl font-thin leading-none hover:text-white">×</button>
              </div>
            </header>

            <div className="flex-1 px-6 py-8 md:px-12 lg:px-14">
              <div className="mb-8 flex items-start justify-between gap-6">
                <div><h1 className="text-4xl font-bold tracking-tight md:text-5xl">{activePage}</h1><p className="mt-3 text-xl text-zinc-400">Welcome back, Duelist.</p></div>
                <div className="hidden items-center gap-4 md:flex"><ShieldCheck className="h-10 w-10 text-red-600" /><div><div className="text-sm uppercase tracking-wider text-zinc-400">Status</div><div className="text-2xl font-semibold text-red-500">Undetected</div></div></div>
              </div>

              <div className="mb-6 rounded-xl border border-white/10 bg-zinc-950/80 px-5 py-3 text-zinc-300">{toast} <span className="text-zinc-500">Enabled features: {enabledCount}/4</span></div>

              {activePage !== "Dashboard" ? pageContent[activePage] : (
                <>
                  <div className="grid gap-6 lg:grid-cols-3">
                    <Card className="border-white/10 bg-black/80 text-white"><CardContent className="p-7"><h3 className="text-xl text-zinc-200">Subscription</h3><div className="my-6 h-px bg-white/10" /><div className="flex items-center justify-between gap-4"><div className="flex items-center gap-4"><Gem className="h-8 w-8 fill-red-600 text-red-600" /><div><div className="text-2xl font-semibold text-red-500">Premium</div><div className="mt-1 text-zinc-400">Expires in 29 days</div></div></div><Button onClick={() => notify("Subscription panel opened.")} className="border-white/10 bg-transparent text-white hover:bg-white/10">Manage</Button></div></CardContent></Card>
                    <Card className="border-white/10 bg-black/80 text-white"><CardContent className="p-7"><h3 className="text-xl text-zinc-200">System</h3><div className="my-6 h-px bg-white/10" /><div className="flex items-center gap-4"><Monitor className="h-8 w-8 text-white" /><div><div className="text-xl font-semibold">Windows 11</div><div className="mt-1 text-zinc-400">Secure</div></div></div></CardContent></Card>
                    <Card className="border-white/10 bg-black/80 text-white"><CardContent className="p-7"><h3 className="text-xl text-zinc-200">Last Update</h3><div className="my-6 h-px bg-white/10" /><div className="flex items-center justify-between gap-4"><div><div className="text-xl font-semibold">May 22, 2026</div><div className="mt-1 text-zinc-400">Version 2.4.1</div></div><Button onClick={checkUpdates} disabled={checking} className="border-white/10 bg-transparent text-white hover:bg-white/10 disabled:opacity-60">{checking ? "Checking" : "Check"}</Button></div></CardContent></Card>
                  </div>

                  <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_1.05fr]">
                    <Card className="border-white/10 bg-black/80 text-white"><CardContent className="p-7"><h3 className="text-xl text-zinc-200">Features</h3><div className="my-6 h-px bg-white/10" /><div className="divide-y divide-white/10">{Object.entries(features).map(([feature, enabled]) => (<div key={feature} className="flex items-center gap-5 py-5">{feature === "Visuals" ? <Eye className="h-7 w-7" /> : feature === "Misc" ? <Grid2X2 className="h-7 w-7" /> : <Crosshair className="h-7 w-7" />}<button onClick={() => setActivePage(feature)} className="flex-1 text-left text-xl font-medium hover:text-white">{feature}</button><span className={`font-semibold ${enabled ? "text-red-500" : "text-zinc-500"}`}>{enabled ? "Enabled" : "Disabled"}</span><button onClick={() => setActivePage(feature)}><ChevronDown className="h-5 w-5 text-red-500" /></button><Toggle enabled={enabled} onClick={() => toggleFeature(feature)} /></div>))}</div></CardContent></Card>
                    <Card className="border-white/10 bg-black/80 text-white"><CardContent className="p-7"><h3 className="text-xl text-zinc-200">News</h3><div className="my-6 h-px bg-white/10" />{[["Update 2.4.1","Bug fixes and performance improvements.","May 22"],["Update 2.4.0","New features and optimizations.","May 15"],["Update 2.3.9","Minor fixes.","May 9"]].map(([title,desc,date]) => (<button key={title} onClick={() => notify(`${title} selected.`)} className="w-full border-b border-white/10 py-5 text-left first:pt-0 hover:text-white"><div className="flex justify-between"><h4 className="text-xl font-semibold">{title}</h4><span className="text-zinc-400">{date}</span></div><p className="mt-2 text-zinc-300">{desc}</p></button>))}<Button onClick={() => notify("All news opened.")} className="mt-5 w-full justify-center border-white/10 bg-transparent py-6 text-lg text-white hover:bg-white/10">View All News <ChevronRight className="ml-auto h-5 w-5 text-red-500" /></Button></CardContent></Card>
                  </div>

                  <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_1.05fr]">
                    <Card className="border-white/10 bg-black/80 text-white"><CardContent className="flex items-center gap-7 p-7"><div className="grid h-24 w-28 place-items-center border-r border-white/10 pr-6"><ShieldCheck className="h-20 w-20 text-red-600" /></div><div><h3 className="text-2xl font-semibold">Ready</h3><p className="mt-2 text-zinc-300">All systems ready.</p><div className="mt-3 flex items-center gap-3 text-zinc-300"><span className="h-3 w-3 rounded-full bg-green-500" />Safe to use</div></div></CardContent></Card>
                    <Card className="border-white/10 bg-black/80 text-white"><CardContent className="flex items-center gap-7 p-7"><div className="grid h-24 w-28 place-items-center border-r border-white/10 pr-6"><Globe2 className="h-20 w-20 text-red-600" /></div><div><h3 className="text-2xl font-semibold">External</h3><p className="mt-2 text-zinc-300">Duelist runs externally.</p><div className="mt-3 flex items-center gap-3 text-zinc-300"><span className="h-3 w-3 rounded-full bg-green-500" />No drivers installed</div></div></CardContent></Card>
                  </div>
                </>
              )}

              <footer className="mt-8 flex flex-wrap items-center justify-center gap-5 text-zinc-500">
                <span>Duelist does not modify any game files.</span>
                <span>|</span>
                <span className="flex items-center gap-2"><Check className="h-4 w-4" /> Stay safe. Play fair.</span>
                <span>|</span>
                <a href="https://discord.gg/duelistgg" target="_blank" rel="noreferrer" className="text-zinc-400 transition hover:text-red-500">
                  discord.gg/duelistgg
                </a>
              </footer>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
