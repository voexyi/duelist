import React, { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Bell,
  Check,
  ChevronRight,
  CircleDot,
  Crosshair,
  Eye,
  Gem,
  Globe2,
  Grid2X2,
  Home,
  KeyRound,
  Layers,
  Lock,
  LogOut,
  Monitor,
  RotateCcw,
  Save,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Zap,
} from "lucide-react";

const Button = ({ children, className = "", onClick, disabled, type = "button" }: any) => (
  <button type={type} onClick={onClick} disabled={disabled} className={className}>
    {children}
  </button>
);

const menu = [
  { label: "Dashboard", icon: Home },
  { label: "Aimassist", icon: Crosshair },
  { label: "Triggerbot", icon: CircleDot },
  { label: "Visuals", icon: Eye },
  { label: "Color", icon: SlidersHorizontal },
  { label: "Misc", icon: Grid2X2 },
  { label: "Config", icon: Layers },
  { label: "Settings", icon: Settings },
];

const LIFETIME_KEYS = [
  "DUELIST-1251-QX7P",
  "DUELIST-1252-LM8A",
  "DUELIST-1253-ZP4Q",
  "DUELIST-1254-HX9L",
  "DUELIST-1255-RM2P",
  "DUELIST-1256-TQ7N",
  "DUELIST-1257-WL5X",
  "DUELIST-1258-BP3Q",
  "DUELIST-1259-KM8L",
  "DUELIST-1260-NX4P",
  "DUELIST-1261-YQ9A",
  "DUELIST-1262-VL2X",
  "DUELIST-1263-JP7Q",
  "DUELIST-1264-MT5L",
  "DUELIST-1265-ZX3P",
  "DUELIST-1266-HQ8N",
  "DUELIST-1267-RL4Q",
  "DUELIST-1268-WP9X",
  "DUELIST-1269-BM2L",
  "DUELIST-1270-KQ7P",
  "DUELIST-1271-NL5X",
  "DUELIST-1272-YP3Q",
  "DUELIST-1273-VM8L",
  "DUELIST-1274-JQ4P",
  "DUELIST-1275-MX9A",
  "DUELIST-1276-ZL2Q",
  "DUELIST-1277-HP7X",
  "DUELIST-1278-RQ5L",
  "DUELIST-1279-WM3P",
  "DUELIST-1280-BX8Q",
  "DUELIST-1281-KL4N",
  "DUELIST-1282-NP9L",
  "DUELIST-1283-YQ2X",
  "DUELIST-1284-VL7P",
  "DUELIST-1285-JM5Q",
  "DUELIST-1286-MX3L",
  "DUELIST-1287-ZQ8P",
  "DUELIST-1288-HL4X",
  "DUELIST-1289-RP9Q",
  "DUELIST-1290-WM2L",
  "DUELIST-1291-BQ7X",
  "DUELIST-1292-KL5P",
  "DUELIST-1293-NX3Q",
  "DUELIST-1294-YP8L",
  "DUELIST-1295-VQ4P",
  "DUELIST-1296-JL9X",
  "DUELIST-1297-MP2Q",
  "DUELIST-1298-ZX7L",
  "DUELIST-1299-HQ5P",
  "DUELIST-1300-RL3X",
  "DUELIST-1301-WP8Q",
  "DUELIST-1302-BM4L",
  "DUELIST-1303-KQ9P",
  "DUELIST-1304-NL2X",
  "DUELIST-1305-YP7Q",
  "DUELIST-1306-VM5L",
  "DUELIST-1307-JQ3P",
  "DUELIST-1308-MX8A",
  "DUELIST-1309-ZL4Q",
  "DUELIST-1310-HP9L"
];

const MONTHLY_KEYS = [
  "DUELIST-3001-QM7P",
  "DUELIST-3002-LX9A",
  "DUELIST-3003-ZP4N",
  "DUELIST-3004-HQ8L",
  "DUELIST-3005-RM2X",
  "DUELIST-3006-TL7Q",
  "DUELIST-3007-WP5N",
  "DUELIST-3008-BX3L",
  "DUELIST-3009-KQ8P",
  "DUELIST-3010-NM4X",
  "DUELIST-3011-YL9Q",
  "DUELIST-3012-VP2N",
  "DUELIST-3013-JX7L",
  "DUELIST-3014-MQ5P",
  "DUELIST-3015-ZL3X",
  "DUELIST-3016-HP8Q",
  "DUELIST-3017-RM4N",
  "DUELIST-3018-WQ9L",
  "DUELIST-3019-BP2X",
  "DUELIST-3020-KL7Q",
  "DUELIST-3021-NX5P",
  "DUELIST-3022-YQ3L",
  "DUELIST-3023-VM8X",
  "DUELIST-3024-JP4Q",
  "DUELIST-3025-MX9N",
  "DUELIST-3026-ZQ2L",
  "DUELIST-3027-HL7P",
  "DUELIST-3028-RP5X",
  "DUELIST-3029-WM3Q",
  "DUELIST-3030-BQ8L",
  "DUELIST-3031-KX4N",
  "DUELIST-3032-NL9P",
  "DUELIST-3033-YP2X",
  "DUELIST-3034-VQ7L",
  "DUELIST-3035-JM5P",
  "DUELIST-3036-MP3Q",
  "DUELIST-3037-ZX8L",
  "DUELIST-3038-HQ4P",
  "DUELIST-3039-RL9X",
  "DUELIST-3040-WP2Q",
  "DUELIST-3041-BM7L",
  "DUELIST-3042-KQ5X",
  "DUELIST-3043-NP3Q",
  "DUELIST-3044-YX8L",
  "DUELIST-3045-VL4P",
  "DUELIST-3046-JQ9X",
  "DUELIST-3047-ML2Q",
  "DUELIST-3048-ZP7L",
  "DUELIST-3049-HX5P",
  "DUELIST-3050-RQ3X",
  "DUELIST-3051-WL8Q",
  "DUELIST-3052-BP4L",
  "DUELIST-3053-KM9P",
  "DUELIST-3054-NQ2X",
  "DUELIST-3055-YL7Q",
  "DUELIST-3056-VP5L",
  "DUELIST-3057-JX3P",
  "DUELIST-3058-MQ8A",
  "DUELIST-3059-ZL4Q",
  "DUELIST-3060-HP9L"
];

const VALID_KEYS = [...LIFETIME_KEYS, ...MONTHLY_KEYS];

function getKeyPlan(key: string) {
  if (LIFETIME_KEYS.includes(key)) return "LIFE TIME";
  if (MONTHLY_KEYS.includes(key)) return "30 DAY";
  return "UNKNOWN";
}

function getDeviceId() {
  const saved = localStorage.getItem("duelist_device_id");
  if (saved) return saved;

  const raw = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    screen.colorDepth,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  ].join("|");

  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    hash = (hash << 5) - hash + raw.charCodeAt(i);
    hash |= 0;
  }

  const id = `DVC-${Math.abs(hash).toString(16).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  localStorage.setItem("duelist_device_id", id);
  return id;
}

function getKeyBindings() {
  try {
    return JSON.parse(localStorage.getItem("duelist_key_bindings") || "{}");
  } catch {
    return {};
  }
}

function saveKeyBindings(bindings: any) {
  localStorage.setItem("duelist_key_bindings", JSON.stringify(bindings));
}

const initialFeatures: Record<string, boolean> = {
  Aimassist: true,
  Triggerbot: true,
  Visuals: true,
  Misc: true,
};

function GlassCard({ children, className = "" }: any) {
  return (
    <div className={`relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.035] shadow-[0_24px_80px_rgba(0,0,0,.45)] backdrop-blur-xl ${className}`}>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,.08),transparent_36%,rgba(255,0,0,.035))]" />
      <div className="relative">{children}</div>
    </div>
  );
}

function LogoMark() {
  return (
    <div className="relative grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-black shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_0_30px_rgba(225,29,46,.14)]">
      <span className="text-2xl font-black tracking-tighter text-white">D</span>
      <span className="absolute -right-1 top-2 h-8 w-[3px] rotate-45 rounded-full bg-red-600 shadow-[0_0_18px_rgba(239,68,68,.9)]" />
    </div>
  );
}

function Toggle({ enabled, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`relative h-7 w-[54px] rounded-full border p-1 transition-all duration-300 ${
        enabled ? "border-red-500/60 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,.18)]" : "border-white/10 bg-white/[.04]"
      }`}
    >
      <span className={`block h-5 w-5 rounded-full transition-all duration-300 ${enabled ? "translate-x-6 bg-red-500" : "translate-x-0 bg-zinc-500"}`} />
    </button>
  );
}

function SliderRow({ label, value, onChange, min = 0, max = 100 }: any) {
  return (
    <div className="space-y-3 rounded-2xl border border-white/[.06] bg-black/30 p-4">
      <div className="flex justify-between text-sm">
        <span className="text-zinc-300">{label}</span>
        <span className="font-semibold text-white">{value}%</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-red-500"
      />
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-red-700 via-red-500 to-white transition-all duration-300" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function StatusPill({ children, tone = "red" }: any) {
  const color = tone === "green" ? "bg-emerald-500" : "bg-red-500";
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 text-xs font-medium text-zinc-200">
      <span className={`h-2 w-2 rounded-full ${color} shadow-[0_0_14px_currentColor]`} />
      {children}
    </div>
  );
}

function SettingsPanel({ title, subtitle, children }: any) {
  return (
    <GlassCard className="animate-[fadeIn_.35s_ease]">
      <div className="flex items-center justify-between gap-4 border-b border-white/[.06] p-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.22em] text-red-400">Module</p>
          <h3 className="mt-2 text-3xl font-bold text-white">{title}</h3>
          <p className="mt-2 text-zinc-400">{subtitle}</p>
        </div>
        <div className="grid h-14 w-14 place-items-center rounded-2xl border border-red-500/20 bg-red-500/10">
          <SlidersHorizontal className="h-7 w-7 text-red-400" />
        </div>
      </div>
      <div className="space-y-5 p-7">{children}</div>
    </GlassCard>
  );
}

export default function DuelistWebGui() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [features, setFeatures] = useState(initialFeatures);
  const [toast, setToast] = useState("System online.");
  const [checking, setChecking] = useState(false);
  const [aimSettings, setAimSettings] = useState({ smoothness: 68, fov: 42, delay: 24 });
  const [triggerSettings, setTriggerSettings] = useState({ delay: 31, burst: 56, accuracy: 74 });
  const [appSettings, setAppSettings] = useState({ scale: 82, accent: 76 });
  const [colorSettings, setColorSettings] = useState({ hex: "#ffcc00", tolerance: 64, speed: 72, preset: "Yellow" });
  const [scanning, setScanning] = useState(false);
  const [licenseKey, setLicenseKey] = useState("");
  const [subscriptionPlan, setSubscriptionPlan] = useState("30 DAY");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [modal, setModal] = useState<any>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [authStage, setAuthStage] = useState<"idle" | "checking" | "success">("idle");
  const [deviceId, setDeviceId] = useState("");
  const [showApp, setShowApp] = useState(false);
  const [activityLog, setActivityLog] = useState<string[]>([
    "Secure session initialized.",
    "External mode enabled.",
    "Scanner ready.",
  ]);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    setDeviceId(getDeviceId());
    const timer = setTimeout(() => setBooting(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const savedKey = localStorage.getItem("duelist_license");
    const currentDevice = getDeviceId();
    const bindings = getKeyBindings();
    if (savedKey && VALID_KEYS.includes(savedKey) && bindings[savedKey] === currentDevice) {
      setAuthenticated(true);
      setLicenseKey(savedKey);
      setSubscriptionPlan(getKeyPlan(savedKey));
      setTimeout(() => setShowApp(true), 120);
    }
  }, []);

  const enabledCount = useMemo(() => Object.values(features).filter(Boolean).length, [features]);

  function playSound(type: "click" | "success" | "error" = "click") {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audio = new AudioContextClass();
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.connect(gain);
      gain.connect(audio.destination);
      osc.type = "triangle";
      osc.frequency.value = type === "success" ? 620 : type === "error" ? 160 : 320;
      gain.gain.setValueAtTime(0.12, audio.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.16);
      osc.start();
      osc.stop(audio.currentTime + 0.16);
    } catch {}
  }

  function addLog(message: string) {
    setActivityLog((prev) => [message, ...prev].slice(0, 6));
  }

  function notify(message: string, type: "click" | "success" | "error" = "click") {
    playSound(type);
    setToast(message);
    addLog(message);
    window.clearTimeout((window as any).duelistToastTimer);
    (window as any).duelistToastTimer = window.setTimeout(() => setToast("System online."), 2400);
  }

  function toggleFeature(feature: string) {
    setFeatures((prev) => ({ ...prev, [feature]: !prev[feature] }));
    notify(`${feature} updated.`);
  }

  function authenticateKey() {
    const cleaned = licenseKey.trim().toUpperCase();

    if (authStage !== "idle") return;

    if (VALID_KEYS.includes(cleaned)) {
      const currentDevice = getDeviceId();
      const bindings = getKeyBindings();

      if (bindings[cleaned] && bindings[cleaned] !== currentDevice) {
        setAuthError("This license is already bound to another browser/device.");
        playSound("error");
        return;
      }

      if (!bindings[cleaned]) {
        bindings[cleaned] = currentDevice;
        saveKeyBindings(bindings);
      }

      setAuthError("");
      setAuthStage("checking");
      playSound("click");

      setTimeout(() => {
        setAuthStage("success");
        playSound("success");
      }, 850);

      setTimeout(() => {
        localStorage.setItem("duelist_license", cleaned);
        setSubscriptionPlan(getKeyPlan(cleaned));
        setAuthenticated(true);
        setShowApp(false);
        notify("License authenticated.", "success");
        setAuthStage("idle");
        setTimeout(() => setShowApp(true), 60);
      }, 1650);
    } else {
      setAuthError("Invalid license key.");
      playSound("error");
    }
  }

  function logout() {
    localStorage.removeItem("duelist_license");
    setAuthenticated(false);
    setShowApp(false);
    setLicenseKey("");
    setAuthError("");
  }

  function openModal(title: string, body: string) {
    setModal({ title, body });
    playSound("click");
  }

  function startColorScan() {
    setScanning(true);
    notify(`Screen color scan started for ${colorSettings.hex}.`, "success");
    openModal("Color Scan Active", `Duelist is now scanning for ${colorSettings.preset} outline color (${colorSettings.hex}).

Mode: External screen analysis
Tolerance: ${colorSettings.tolerance}%
Scan Speed: ${colorSettings.speed}%

No injection mode enabled.`);
  }

  function stopColorScan() {
    setScanning(false);
    notify("Screen color scan stopped.");
  }

  function setColorPreset(name: string, hex: string) {
    setColorSettings((prev) => ({ ...prev, preset: name, hex }));
    notify(`${name} outline preset selected.`);
  }

  function checkUpdates() {
    setChecking(true);
    setToast("Checking build status...");
    setTimeout(() => {
      setChecking(false);
      notify("Duelist is up to date.");
    }, 900);
  }

  const pageContent: any = {
    Aimassist: (
      <SettingsPanel title="Aimassist" subtitle="Smooth targeting behaviour with precise tuning.">
        <SliderRow label="Smoothness" value={aimSettings.smoothness} onChange={(value: number) => setAimSettings((prev) => ({ ...prev, smoothness: value }))} />
        <SliderRow label="Field of View" value={aimSettings.fov} onChange={(value: number) => setAimSettings((prev) => ({ ...prev, fov: value }))} />
        <SliderRow label="Reaction Delay" value={aimSettings.delay} onChange={(value: number) => setAimSettings((prev) => ({ ...prev, delay: value }))} />
        <div className="grid gap-3 md:grid-cols-2">
          <Button onClick={() => notify("Aimassist profile saved.")} className="flex h-12 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10 font-semibold text-white transition hover:bg-red-500/15"><Save className="mr-2 h-4 w-4" />Save Profile</Button>
          <Button onClick={() => { setAimSettings({ smoothness: 68, fov: 42, delay: 24 }); notify("Aimassist reset."); }} className="flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[.03] font-semibold text-white transition hover:bg-white/[.06]"><RotateCcw className="mr-2 h-4 w-4" />Reset</Button>
        </div>
      </SettingsPanel>
    ),
    Triggerbot: (
      <SettingsPanel title="Triggerbot" subtitle="Timing response and fire discipline controls.">
        <SliderRow label="Trigger Delay" value={triggerSettings.delay} onChange={(value: number) => setTriggerSettings((prev) => ({ ...prev, delay: value }))} />
        <SliderRow label="Burst Control" value={triggerSettings.burst} onChange={(value: number) => setTriggerSettings((prev) => ({ ...prev, burst: value }))} />
        <SliderRow label="Accuracy Window" value={triggerSettings.accuracy} onChange={(value: number) => setTriggerSettings((prev) => ({ ...prev, accuracy: value }))} />
        <div className="rounded-2xl border border-white/10 bg-black/35 p-5 text-zinc-300">Mode: Hold Key · Safety: Enabled · Response: External</div>
      </SettingsPanel>
    ),
    Color: (
      <SettingsPanel title="Color Scanner" subtitle="External color detection settings for outline-based screen scanning.">
        <div className="grid gap-5 xl:grid-cols-[1fr_.75fr]">
          <div className="space-y-5">
            <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <div className="font-semibold text-white">Target Outline Color</div>
                  <div className="mt-1 text-sm text-zinc-500">Choose a preset or paste your own HEX color.</div>
                </div>
                <div className="h-12 w-12 rounded-2xl border border-white/10 shadow-[0_0_22px_rgba(255,255,255,.12)]" style={{ backgroundColor: colorSettings.hex }} />
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <button onClick={() => setColorPreset("Yellow", "#ffcc00")} className="rounded-2xl border border-white/10 bg-black/40 p-4 text-left transition hover:border-yellow-400/40">
                  <span className="mb-3 block h-8 w-full rounded-xl bg-yellow-400" />
                  <span className="font-semibold text-white">Yellow</span>
                </button>
                <button onClick={() => setColorPreset("Red", "#ff2d2d")} className="rounded-2xl border border-white/10 bg-black/40 p-4 text-left transition hover:border-red-500/40">
                  <span className="mb-3 block h-8 w-full rounded-xl bg-red-500" />
                  <span className="font-semibold text-white">Red</span>
                </button>
                <button onClick={() => setColorPreset("Purple", "#a855f7")} className="rounded-2xl border border-white/10 bg-black/40 p-4 text-left transition hover:border-purple-500/40">
                  <span className="mb-3 block h-8 w-full rounded-xl bg-purple-500" />
                  <span className="font-semibold text-white">Purple</span>
                </button>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-[auto_1fr] md:items-center">
                <input type="color" value={colorSettings.hex} onChange={(e) => setColorSettings((prev) => ({ ...prev, hex: e.target.value, preset: "Custom" }))} className="h-14 w-20 cursor-pointer rounded-2xl border border-white/10 bg-black p-1" />
                <input value={colorSettings.hex} onChange={(e) => setColorSettings((prev) => ({ ...prev, hex: e.target.value, preset: "Custom" }))} placeholder="#ffcc00" className="h-14 rounded-2xl border border-white/10 bg-black/60 px-5 text-white outline-none transition focus:border-red-500/50" />
              </div>
            </div>

            <SliderRow label="Color Tolerance" value={colorSettings.tolerance} onChange={(value: number) => setColorSettings((prev) => ({ ...prev, tolerance: value }))} />
            <SliderRow label="Scan Speed" value={colorSettings.speed} onChange={(value: number) => setColorSettings((prev) => ({ ...prev, speed: value }))} />
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">Scanner Status</div>
                <div className="mt-1 text-sm text-zinc-500">External mode · No injection</div>
              </div>
              <StatusPill tone={scanning ? "green" : "red"}>{scanning ? "Scanning" : "Idle"}</StatusPill>
            </div>

            <div className="mb-5 rounded-3xl border border-white/10 bg-black/50 p-5">
              <div className="relative mx-auto grid h-44 w-44 place-items-center rounded-full border border-white/10 bg-white/[.03]">
                <div className={`absolute inset-4 rounded-full border ${scanning ? "animate-ping border-emerald-400/50" : "border-white/10"}`} />
                <div className="grid h-24 w-24 place-items-center rounded-full border border-white/10" style={{ boxShadow: `0 0 38px ${colorSettings.hex}55` }}>
                  <SlidersHorizontal className="h-10 w-10" style={{ color: colorSettings.hex }} />
                </div>
              </div>
            </div>

            <Button onClick={scanning ? stopColorScan : startColorScan} className={`flex w-full items-center justify-center rounded-2xl border px-5 py-4 font-semibold text-white transition ${scanning ? "border-white/10 bg-white/[.04] hover:bg-white/[.07]" : "border-emerald-500/35 bg-emerald-500/10 hover:bg-emerald-500/15"}`}>
              {scanning ? "Stop Scanning" : "Start Screen Scan"}
            </Button>
          </div>
        </div>
      </SettingsPanel>
    ),
    Visuals: (
      <SettingsPanel title="Visuals" subtitle="Clean overlay styling and readability options.">
        {["Box Overlay", "Name Display", "Distance Display", "Minimal Glow"].map((name) => (
          <div key={name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/35 p-5 transition hover:border-red-500/25">
            <span>{name}</span><Toggle enabled={true} onClick={() => notify(`${name} updated.`)} />
          </div>
        ))}
      </SettingsPanel>
    ),
    Misc: (
      <SettingsPanel title="Misc" subtitle="Extra utility and interface behaviour.">
        {["Auto Start", "Low CPU Mode", "Compact UI", "Notification Sounds"].map((name, i) => (
          <div key={name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/35 p-5 transition hover:border-red-500/25">
            <span>{name}</span><Toggle enabled={i !== 3} onClick={() => notify(`${name} updated.`)} />
          </div>
        ))}
      </SettingsPanel>
    ),
    Config: (
      <SettingsPanel title="Config" subtitle="Profiles and saved presets.">
        {["Default", "Legit", "Performance"].map((name) => (
          <button key={name} onClick={() => notify(`${name} config loaded.`)} className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-black/35 p-5 text-left transition hover:border-red-500/30 hover:bg-white/[.04]">
            <span>{name} Profile</span><ChevronRight className="h-5 w-5 text-red-400" />
          </button>
        ))}
      </SettingsPanel>
    ),
    Settings: (
      <SettingsPanel title="Settings" subtitle="Application appearance and client preferences.">
        <SliderRow label="UI Scale" value={appSettings.scale} onChange={(value: number) => setAppSettings((prev) => ({ ...prev, scale: value }))} />
        <SliderRow label="Red Accent Strength" value={appSettings.accent} onChange={(value: number) => setAppSettings((prev) => ({ ...prev, accent: value }))} />
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/35 p-5 text-zinc-300">
          <span>Sound Effects</span>
          <Toggle enabled={soundEnabled} onClick={() => { setSoundEnabled((prev) => !prev); notify(soundEnabled ? "Sound effects disabled." : "Sound effects enabled."); }} />
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/35 p-5 text-zinc-300">
          <div className="text-sm text-zinc-500">Device Binding ID</div>
          <div className="mt-1 break-all font-mono text-sm text-white">{deviceId || "Loading..."}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/35 p-5 text-zinc-300">Theme: Obsidian Glass · Accent: Duelist Red · Version: 2.4.1</div>
      </SettingsPanel>
    ),
  };

  if (booting) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
        <style>{`@keyframes bootPulse{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}} @keyframes loadingBar{0%{width:0%}100%{width:100%}}`}</style>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,.18),transparent_38%),linear-gradient(135deg,#020202,#090909,#130202)]" />

        <div className="relative w-full max-w-xl px-8">
          <div className="mb-10 flex items-center justify-center gap-5">
            <div className="animate-[bootPulse_2s_ease-in-out_infinite]"><LogoMark /></div>
            <div>
              <div className="text-5xl font-black uppercase tracking-[.35em]">Duelist</div>
              <div className="mt-2 text-sm uppercase tracking-[.35em] text-zinc-500">Initializing External Environment</div>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[.03] p-6 backdrop-blur-xl">
            <div className="space-y-3 text-sm text-zinc-400">
              <div className="flex justify-between"><span>Loading modules</span><span className="text-emerald-400">OK</span></div>
              <div className="flex justify-between"><span>Initializing scanner</span><span className="text-emerald-400">OK</span></div>
              <div className="flex justify-between"><span>Authenticating environment</span><span className="text-emerald-400">OK</span></div>
            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-red-600 via-red-500 to-white animate-[loadingBar_2.1s_linear_forwards]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030303] px-5 text-white">
        <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}`}</style>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(239,68,68,.16),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,.06),transparent_30%),linear-gradient(135deg,#030303,#070707_42%,#130303)]" />
        <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-red-600/10 blur-[90px] animate-[float_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-white/5 blur-[120px]" />

        <GlassCard className="w-full max-w-[520px] animate-[fadeIn_.5s_ease]">
          <div className="p-9 md:p-10">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <LogoMark />
                <div>
                  <h1 className="text-3xl font-bold uppercase tracking-[.25em]">Duelist</h1>
                  <p className="mt-1 text-sm text-zinc-500">External Web Console</p>
                </div>
              </div>
              <StatusPill tone="green">500+ active users</StatusPill>
            </div>

            <div className="mb-6 rounded-3xl border border-white/10 bg-black/40 p-5">
              <div className="mb-4 flex items-center gap-3 text-zinc-300">
                <div className="grid h-10 w-10 place-items-center rounded-2xl border border-red-500/20 bg-red-500/10">
                  <KeyRound className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <div className="font-semibold text-white">License Authentication</div>
                  <div className="text-sm text-zinc-500">Enter your access key to continue.</div>
                </div>
              </div>
              <input
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && authenticateKey()}
                placeholder="DUELIST-XXXX-XXXX"
                className="h-14 w-full rounded-2xl border border-white/10 bg-black/70 px-5 text-lg text-white outline-none transition placeholder:text-zinc-700 focus:border-red-500/60 focus:ring-4 focus:ring-red-500/10"
              />
              {authError && <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{authError}</div>}
              <Button onClick={authenticateKey} disabled={authStage !== "idle"} className={`mt-5 flex h-13 w-full items-center justify-center rounded-2xl border px-5 py-4 font-semibold text-white transition ${authStage === "success" ? "border-emerald-500/40 bg-emerald-500/15" : "border-red-500/35 bg-red-500/10 hover:bg-red-500/15"}`}>
                {authStage === "checking" && (
                  <>
                    <span className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-red-400" />
                    Verifying License...
                  </>
                )}
                {authStage === "success" && (
                  <>
                    <Check className="mr-2 h-5 w-5 text-emerald-400" />
                    Authenticated
                  </>
                )}
                {authStage === "idle" && (
                  <>
                    Authenticate <ChevronRight className="ml-2 h-5 w-5 text-red-400" />
                  </>
                )}
              </Button>

              {authStage !== "idle" && (
                <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-4">
                  <div className="mb-3 flex items-center justify-between text-sm">
                    <span className={authStage === "success" ? "text-emerald-400" : "text-zinc-400"}>{authStage === "success" ? "Access granted" : "Validating encrypted session"}</span>
                    <span className="text-zinc-600">{authStage === "success" ? "100%" : "64%"}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className={`h-full rounded-full transition-all duration-700 ${authStage === "success" ? "w-full bg-emerald-500" : "w-2/3 bg-red-500"}`} />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-sm text-zinc-500">
              <span>discord.gg/duelistgg</span>
              <span className="flex items-center gap-2"><Lock className="h-4 w-4" /> Bound: {deviceId || "Checking"}</span>
            </div>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030303] text-white antialiased">
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} @keyframes pulseSoft{0%,100%{opacity:.45}50%{opacity:.9}} @keyframes appReveal{0%{opacity:0;transform:scale(.965) translateY(22px);filter:blur(14px)}55%{opacity:1;filter:blur(0);transform:scale(1.008) translateY(-2px)}100%{opacity:1;transform:scale(1) translateY(0);filter:blur(0)}} @keyframes sideReveal{from{opacity:0;transform:translateX(-24px)}to{opacity:1;transform:translateX(0)}} @keyframes panelReveal{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(239,68,68,.12),transparent_32%),radial-gradient(circle_at_85%_82%,rgba(255,255,255,.05),transparent_30%),linear-gradient(135deg,#030303,#080808_45%,#120202)]" />
      <div className="fixed left-0 top-0 h-96 w-96 rounded-full bg-red-600/10 blur-[110px] animate-[pulseSoft_5s_ease-in-out_infinite]" />

      <main className={`relative mx-auto flex min-h-screen max-w-[95vw] gap-5 p-4 md:p-6 transition-all duration-700 ${showApp ? "opacity-100" : "opacity-0"}`} style={{ animation: showApp ? "appReveal .75s cubic-bezier(.16,1,.3,1) both" : undefined }}>
        <aside className="hidden w-[290px] shrink-0 overflow-hidden rounded-[32px] border border-white/[.08] bg-white/[.035] backdrop-blur-xl lg:block">
          <div className="flex h-24 items-center gap-4 border-b border-white/[.07] px-7">
            <LogoMark />
            <div>
              <div className="text-2xl font-bold uppercase tracking-[.28em]">Duelist</div>
              <div className="mt-1 text-xs uppercase tracking-[.22em] text-zinc-600">Control Center</div>
            </div>
          </div>

          <nav className="space-y-2 p-4">
            {menu.map((item) => {
              const active = activePage === item.label;
              return (
                <button key={item.label} onClick={() => { setActivePage(item.label); notify(`${item.label} opened.`); }} className={`group relative flex h-14 w-full items-center gap-4 rounded-2xl px-4 text-left transition-all duration-300 ${active ? "bg-white/[.07] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.08)]" : "text-zinc-500 hover:bg-white/[.035] hover:text-zinc-200"}`}>
                  {active && <span className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-red-500 shadow-[0_0_16px_rgba(239,68,68,.8)]" />}
                  <item.icon className={`h-5 w-5 transition ${active ? "text-red-400" : "text-zinc-500 group-hover:text-zinc-300"}`} />
                  <span className="font-semibold">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 border-t border-white/[.07] p-5">
            <div className="space-y-4">
              <div className="rounded-[26px] border border-white/10 bg-black/35 p-4 shadow-[0_10px_40px_rgba(0,0,0,.35)]">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[.22em] text-zinc-600">Session</div>
                    <div className="mt-1 text-lg font-bold text-white">Secure Connection</div>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-md" />
                    <div className="relative h-3 w-3 rounded-full bg-emerald-400" />
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-white/[.06] bg-white/[.03] px-4 py-3">
                  <div>
                    <div className="text-xs text-zinc-600">Status</div>
                    <div className="mt-1 font-semibold text-white">Encrypted · Online</div>
                  </div>
                  <StatusPill tone="green">Active</StatusPill>
                </div>
              </div>

              
            </div>
          </div>
        </aside>

        <section className="min-w-0 flex-1 overflow-hidden rounded-[32px] border border-white/[.08] bg-black/55 backdrop-blur-xl">
          <header className="flex h-24 items-center justify-between border-b border-white/[.07] px-6 md:px-9">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.25em] text-red-400">Premium Interface</p>
              <h1 className="mt-1 text-2xl font-bold md:text-3xl">{activePage}</h1>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => openModal("Notifications", "No critical alerts. Client status is stable, external mode is active, and all enabled modules are synced.")} className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[.035] transition hover:bg-white/[.07]"><Bell className="h-5 w-5 text-zinc-300" /></button>
              <button onClick={logout} className="flex h-11 items-center gap-2 rounded-2xl border border-white/10 bg-white/[.035] px-4 text-sm font-semibold text-zinc-300 transition hover:border-red-500/30 hover:text-white"><LogOut className="h-4 w-4" /> Logout</button>
            </div>
          </header>

          <div className="space-y-6 p-5 md:p-8">
            <div className="flex flex-col justify-between gap-5 rounded-[28px] border border-white/[.08] bg-white/[.035] p-6 md:flex-row md:items-center">
              <div>
                <h2 className="text-3xl font-black tracking-tight md:text-5xl">Welcome back, Duelist.</h2>
                <p className="mt-3 text-zinc-400">{toast} <span className="text-zinc-600">· Enabled features: {enabledCount}/4</span></p>
              </div>
              <div className="flex flex-wrap gap-3">
                <StatusPill>Undetected</StatusPill>
                <StatusPill tone="green">External</StatusPill>
              </div>
            </div>

            {activePage !== "Dashboard" ? pageContent[activePage] : (
              <>
                <div className="grid gap-5 xl:grid-cols-3">
                  <GlassCard className="p-6">
                    <div className="mb-8 flex items-center justify-between"><span className="text-zinc-400">Subscription</span><Gem className="h-6 w-6 fill-red-500 text-red-500" /></div>
                    <div className="text-3xl font-bold text-white">Premium</div>
                    <p className="mt-2 text-zinc-500">{subscriptionPlan === "LIFE TIME" ? "LIFE TIME" : "Expires in 29 days"}</p>
                    <Button onClick={() => openModal("Subscription", subscriptionPlan === "LIFE TIME" ? "Premium LIFE TIME plan active. This license does not expire. Manage device sessions and account status from this panel." : "Premium 30 DAY plan active. License expires in 29 days. Manage renewals, device sessions, and account status from this panel.")} className="mt-6 rounded-2xl border border-white/10 bg-white/[.035] px-5 py-3 text-sm font-semibold transition hover:bg-white/[.07]">Manage</Button>
                  </GlassCard>

                  <GlassCard className="p-6">
                    <div className="mb-8 flex items-center justify-between"><span className="text-zinc-400">System</span><Monitor className="h-6 w-6 text-zinc-300" /></div>
                    <div className="text-3xl font-bold text-white">Windows 11</div>
                    <p className="mt-2 text-zinc-500">Secure environment</p>
                    <div className="mt-6"><StatusPill tone="green">Stable</StatusPill></div>
                  </GlassCard>

                  <GlassCard className="p-6">
                    <div className="mb-8 flex items-center justify-between"><span className="text-zinc-400">Last Update</span><Activity className="h-6 w-6 text-red-400" /></div>
                    <div className="text-3xl font-bold text-white">May 22, 2026</div>
                    <p className="mt-2 text-zinc-500">Version 2.4.1</p>
                    <Button onClick={checkUpdates} disabled={checking} className="mt-6 rounded-2xl border border-white/10 bg-white/[.035] px-5 py-3 text-sm font-semibold transition hover:bg-white/[.07] disabled:opacity-60">{checking ? "Checking" : "Check"}</Button>
                  </GlassCard>
                </div>

                <div className="grid gap-5 xl:grid-cols-[1fr_1.05fr]">
                  <GlassCard className="p-6">
                    <div className="mb-6 flex items-center justify-between">
                      <div><h3 className="text-xl font-bold">Features</h3><p className="mt-1 text-sm text-zinc-500">Fast access modules</p></div>
                      <Sparkles className="h-6 w-6 text-red-400" />
                    </div>
                    <div className="space-y-3">
                      {Object.entries(features).map(([feature, enabled]) => (
                        <div key={feature} className="group flex items-center gap-4 rounded-2xl border border-white/[.06] bg-black/30 p-4 transition hover:border-red-500/25 hover:bg-white/[.035]">
                          {feature === "Visuals" ? <Eye className="h-5 w-5 text-zinc-300" /> : feature === "Misc" ? <Grid2X2 className="h-5 w-5 text-zinc-300" /> : <Crosshair className="h-5 w-5 text-zinc-300" />}
                          <button onClick={() => setActivePage(feature)} className="flex-1 text-left font-semibold text-white">{feature}</button>
                          <span className={`text-sm font-semibold ${enabled ? "text-red-400" : "text-zinc-600"}`}>{enabled ? "Enabled" : "Disabled"}</span>
                          <Toggle enabled={enabled} onClick={() => toggleFeature(feature)} />
                        </div>
                      ))}
                    </div>
                  </GlassCard>

                  <GlassCard className="p-6">
                    <div className="mb-6 flex items-center justify-between">
                      <div><h3 className="text-xl font-bold">News</h3><p className="mt-1 text-sm text-zinc-500">Latest client notes</p></div>
                      <Zap className="h-6 w-6 text-red-400" />
                    </div>
                    <div className="space-y-3">
                      {[["Update 2.4.1", "Bug fixes and performance improvements.", "May 22"], ["Update 2.4.0", "New features and optimizations.", "May 15"], ["Update 2.3.9", "Minor fixes.", "May 9"]].map(([title, desc, date]) => (
                        <button key={title} onClick={() => openModal(title, desc)} className="w-full rounded-2xl border border-white/[.06] bg-black/30 p-4 text-left transition hover:border-red-500/25 hover:bg-white/[.035]">
                          <div className="flex justify-between gap-3"><h4 className="font-bold text-white">{title}</h4><span className="text-sm text-zinc-500">{date}</span></div>
                          <p className="mt-2 text-sm text-zinc-400">{desc}</p>
                        </button>
                      ))}
                    </div>
                    <Button onClick={() => openModal("All News", `Update 2.4.1: Bug fixes and performance improvements.
Update 2.4.0: New features and optimizations.
Update 2.3.9: Minor fixes and stability patches.`)} className="mt-5 flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/[.035] py-4 font-semibold transition hover:bg-white/[.07]">View All News <ChevronRight className="ml-2 h-5 w-5 text-red-400" /></Button>
                  </GlassCard>
                </div>

                <div className="grid gap-5 xl:grid-cols-[1fr_.8fr]">
                  <GlassCard className="p-6">
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold">Activity Log</h3>
                        <p className="mt-1 text-sm text-zinc-500">Live system actions</p>
                      </div>
                      <Activity className="h-5 w-5 text-red-400" />
                    </div>

                    <div className="space-y-3">
                      {activityLog.map((log, index) => (
                        <div key={index} className="flex items-center gap-3 rounded-2xl border border-white/[.06] bg-black/30 px-4 py-3 animate-[panelReveal_.35s_ease]">
                          <div className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_14px_rgba(239,68,68,.8)]" />
                          <span className="text-sm text-zinc-300">{log}</span>
                        </div>
                      ))}
                    </div>
                  </GlassCard>

                  <div className="grid gap-5">
                  <GlassCard className="p-6">
                    <div className="flex items-center gap-5"><div className="grid h-16 w-16 place-items-center rounded-3xl border border-red-500/20 bg-red-500/10"><ShieldCheck className="h-9 w-9 text-red-400" /></div><div><h3 className="text-2xl font-bold">Ready</h3><p className="mt-1 text-zinc-400">All systems ready.</p><div className="mt-2"><StatusPill tone="green">Safe to use</StatusPill></div></div></div>
                  </GlassCard>
                  <GlassCard className="p-6">
                    <div className="flex items-center gap-5">
                      <div className="grid h-16 w-16 place-items-center rounded-3xl border border-red-500/20 bg-red-500/10">
                        <Globe2 className="h-9 w-9 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">External</h3>
                        <p className="mt-1 text-zinc-400">Duelist runs externally.</p>
                        <div className="mt-2">
                          <StatusPill tone="green">No drivers installed</StatusPill>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>
            </>
            )}

            {modal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm" onClick={() => setModal(null)}>
                <div className="w-full max-w-lg rounded-[28px] border border-white/10 bg-[#070707] p-6 shadow-[0_30px_100px_rgba(0,0,0,.65)]" onClick={(e) => e.stopPropagation()}>
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <h3 className="text-2xl font-bold text-white">{modal.title}</h3>
                    <button onClick={() => setModal(null)} className="rounded-xl border border-white/10 px-3 py-1 text-zinc-400 transition hover:text-white">×</button>
                  </div>
                  <p className="whitespace-pre-line text-zinc-400">{modal.body}</p>
                  <Button onClick={() => setModal(null)} className="mt-6 w-full rounded-2xl border border-red-500/30 bg-red-500/10 py-3 font-semibold text-white transition hover:bg-red-500/15">Close</Button>
                </div>
              </div>
            )}

            <footer className="relative flex flex-wrap items-center justify-center gap-5 pt-2 text-sm text-zinc-600">
              <span>Duelist does not modify any game files.</span>
              <span>|</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4" /> Stay safe. Play fair.</span>
              <span>|</span>
              <a href="https://discord.gg/duelistgg" target="_blank" rel="noreferrer" className="text-zinc-500 transition hover:text-red-400">discord.gg/duelistgg</a>
            <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 items-center gap-2 rounded-full border border-pink-500/10 bg-pink-500/[0.05] px-4 py-2 text-xs font-medium text-pink-200 shadow-[0_0_24px_rgba(236,72,153,.08)] md:flex">
                <span className="h-2 w-2 animate-pulse rounded-full bg-pink-400" />
                Slotted
              </div>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
