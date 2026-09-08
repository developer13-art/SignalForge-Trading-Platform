import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { ClerkProvider, Show, SignIn, SignUp, useClerk } from '@clerk/react';
import { publishableKeyFromHost } from '@clerk/react/internal';
import { shadcn } from '@clerk/themes';
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Bot,
  Check,
  ChevronDown,
  CircleHelp,
  CircleSlash,
  Command,
  Database,
  Gauge,
  KeyRound,
  Layers3,
  LineChart,
  LockKeyhole,
  Menu,
  MoreHorizontal,
  Plus,
  Radio,
  RefreshCw,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  SquareArrowOutUpRight,
  TriangleAlert,
  UserRound,
  WalletCards,
  X,
  Zap,
} from 'lucide-react';
import {
  getGetRiskProfileQueryKey,
  getListSignalSourcesQueryKey,
  useCreateSignalSource,
  useGetAnalyticsOverview,
  useGetDashboardSummary,
  useGetRiskProfile,
  useListActivity,
  useListBrokerAccounts,
  useListProviders,
  useListSignalSources,
  useListSignals,
  useUpdateRiskProfile,
  useUpdateSignalSource,
} from '@workspace/api-client-react';
import { Link, Redirect, Route, Router as WouterRouter, Switch, useLocation } from 'wouter';
import NotFound from '@/pages/not-found';
import '@/index.css';

const queryClient = new QueryClient();
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const clerkPubKey = publishableKeyFromHost(window.location.hostname, import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;
const clerkAppearance = {
  theme: shadcn,
  cssLayerName: 'clerk',
  options: {
    logoPlacement: 'inside' as const,
    logoLinkUrl: basePath || '/',
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
  },
  variables: {
    colorPrimary: '#c9f24b',
    colorForeground: '#252a3b',
    colorMutedForeground: '#6f7180',
    colorDanger: '#d65350',
    colorBackground: '#fffdf8',
    colorInput: '#fffdf8',
    colorInputForeground: '#252a3b',
    colorNeutral: '#dfddd3',
    fontFamily: 'Manrope, sans-serif',
    borderRadius: '0.75rem',
  },
  elements: {
    rootBox: 'w-full flex justify-center',
    cardBox: 'bg-[#fffdf8] rounded-[24px] w-[440px] max-w-full overflow-hidden !shadow-[0_24px_70px_rgba(37,42,59,0.1)]',
    card: '!shadow-none !border-0 !bg-transparent !rounded-none',
    footer: '!shadow-none !border-0 !bg-transparent !rounded-none',
    headerTitle: 'font-display !text-[#252a3b]',
    headerSubtitle: '!text-[#6f7180]',
    socialButtonsBlockButtonText: '!text-[#252a3b]',
    formFieldLabel: '!text-[#252a3b]',
    footerActionLink: '!text-[#252a3b] !font-bold',
    footerActionText: '!text-[#6f7180]',
    dividerText: '!text-[#6f7180]',
    identityPreviewEditButton: '!text-[#252a3b]',
    formFieldSuccessText: '!text-[#34737a]',
    alertText: '!text-[#d65350]',
    logoBox: 'mb-4',
    logoImage: 'max-h-10',
    socialButtonsBlockButton: 'border-[#dfddd3] !bg-[#fffdf8] hover:!bg-[#f1efe7]',
    formButtonPrimary: '!bg-[#c9f24b] !text-[#252a3b] hover:!bg-[#b9e438]',
    formFieldInput: '!bg-[#fffdf8] !border-[#dfddd3] !text-[#252a3b]',
    footerAction: '!bg-transparent',
    dividerLine: '!bg-[#dfddd3]',
    alert: '!bg-[#fff0ee] !border-[#f0c8c3]',
    otpCodeFieldInput: '!bg-[#fffdf8] !border-[#dfddd3]',
    formFieldRow: 'mb-4',
    main: 'px-2',
  },
};

type SourceType = 'TELEGRAM' | 'DISCORD' | 'WHATSAPP' | 'TRADINGVIEW' | 'REST' | 'EMAIL';
type RiskForm = {
  riskPerTrade: string;
  maxDailyLoss: string;
  maxOpenTrades: string;
  minimumConfidence: string;
  emergencyStop: boolean;
};

const sourceOptions: { value: SourceType; label: string; hint: string }[] = [
  { value: 'TELEGRAM', label: 'Telegram', hint: 'Channels and private groups' },
  { value: 'DISCORD', label: 'Discord', hint: 'Servers and private channels' },
  { value: 'TRADINGVIEW', label: 'TradingView', hint: 'Webhook alerts' },
  { value: 'REST', label: 'REST endpoint', hint: 'Signed provider requests' },
  { value: 'EMAIL', label: 'Email', hint: 'Forwarded provider messages' },
  { value: 'WHATSAPP', label: 'WhatsApp', hint: 'Business inbox bridge' },
];

const navGroups = [
  {
    label: 'Workspace',
    items: [
      { href: '/dashboard', label: 'Overview', icon: Gauge },
      { href: '/signals', label: 'Signal center', icon: Radio },
      { href: '/sources', label: 'Signal sources', icon: Database },
    ],
  },
  {
    label: 'Controls',
    items: [
      { href: '/brokers', label: 'Broker accounts', icon: WalletCards },
      { href: '/risk', label: 'Risk controls', icon: ShieldCheck },
      { href: '/analytics', label: 'Analytics', icon: LineChart },
    ],
  },
  {
    label: 'Network',
    items: [
      { href: '/marketplace', label: 'Provider marketplace', icon: Sparkles },
      { href: '/settings', label: 'Settings', icon: Settings2 },
    ],
  },
];

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

function formatDate(value?: string | null, fallback = 'Not yet') {
  if (!value) return fallback;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallback;
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(date);
}

function formatCurrency(value?: number | null) {
  if (value === null || value === undefined) return '—';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(value);
}

function PageIntro({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div className="max-w-2xl animate-rise">
        <div className="mb-3 flex items-center gap-2 text-[11px] font-mono-ui uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]">
          <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" />
          {eyebrow}
        </div>
        <h1 className="font-display text-4xl font-semibold tracking-[-0.045em] text-[hsl(var(--foreground))] md:text-5xl">{title}</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[hsl(var(--muted-foreground))]">{description}</p>
      </div>
      {action}
    </div>
  );
}

function Panel({ children, className = '', dark = false }: { children: ReactNode; className?: string; dark?: boolean }) {
  return (
    <section className={cn('rounded-[22px] border p-5 shadow-[0_12px_35px_hsl(225_28%_17%/0.045)]', dark ? 'border-[hsl(225_22%_26%)] bg-[hsl(var(--sidebar))] text-[hsl(var(--sidebar-foreground))]' : 'border-[hsl(var(--card-border))] bg-[hsl(var(--card))]', className)}>
      {children}
    </section>
  );
}

function StatusBadge({ value, tone }: { value: string; tone?: 'lime' | 'coral' | 'teal' | 'slate' }) {
  const styles = {
    lime: 'bg-[hsl(73_87%_56%/0.18)] text-[hsl(90_58%_29%)]',
    coral: 'bg-[hsl(13_81%_64%/0.18)] text-[hsl(9_58%_37%)]',
    teal: 'bg-[hsl(184_42%_45%/0.14)] text-[hsl(184_42%_31%)]',
    slate: 'bg-[hsl(225_20%_84%/0.5)] text-[hsl(225_20%_38%)]',
  };
  const selected = tone ?? (value === 'CONNECTED' || value === 'VALIDATED' || value === 'ACTIVE' ? 'lime' : value === 'ERROR' || value === 'REJECTED' ? 'coral' : 'slate');
  return <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-mono-ui uppercase tracking-[0.1em]', styles[selected])}>{value.replaceAll('_', ' ')}</span>;
}

function EmptyState({ icon: Icon, title, description, action }: { icon: typeof Database; title: string; description: string; action?: ReactNode }) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center rounded-[18px] border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--background)/0.5)] px-6 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--muted))] text-[hsl(var(--primary-foreground))]">
        <Icon size={21} strokeWidth={1.7} />
      </div>
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-sm text-xs leading-5 text-[hsl(var(--muted-foreground))]">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

function QueryNotice({ loading, error, onRetry }: { loading?: boolean; error?: boolean; onRetry?: () => void }) {
  if (loading) return <div className="space-y-3" data-testid="state-loading"><div className="h-14 animate-pulse rounded-xl bg-[hsl(var(--muted))]" /><div className="h-14 animate-pulse rounded-xl bg-[hsl(var(--muted))]" /></div>;
  if (!error) return null;
  return <div className="rounded-2xl border border-[hsl(1_72%_53%/0.25)] bg-[hsl(1_72%_53%/0.06)] p-5" data-testid="state-error"><div className="flex items-start gap-3"><TriangleAlert size={18} className="mt-0.5 text-[hsl(var(--destructive))]" /><div><p className="font-semibold">The workspace could not be reached.</p><p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">The API may be waking up or your session may need attention.</p><button type="button" data-testid="button-retry" onClick={onRetry} className="mt-3 text-xs font-semibold underline underline-offset-4">Try again</button></div></div></div>;
}

function Logo({ inverse = false }: { inverse?: boolean }) {
  return <Link href="/" data-testid="link-logo" className="flex items-center gap-2.5"><span className={cn('flex h-8 w-8 items-center justify-center rounded-xl', inverse ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]' : 'bg-[hsl(var(--foreground))] text-[hsl(var(--background))]')}><Command size={17} strokeWidth={2.6} /></span><span className={cn('font-display text-[17px] font-bold tracking-[-0.04em]', inverse ? 'text-[hsl(var(--sidebar-foreground))]' : 'text-[hsl(var(--foreground))]')}>Signal<span className="text-[hsl(var(--accent))]">Forge</span></span></Link>;
}

function Sidebar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <>
      <button type="button" data-testid="button-mobile-menu" onClick={() => setMobileOpen(true)} className="fixed left-4 top-4 z-30 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-2.5 md:hidden"><Menu size={18} /></button>
      {mobileOpen && <button aria-label="Close menu" type="button" data-testid="button-close-menu" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-[hsl(225_32%_16%/0.3)] md:hidden" />}
      <aside className={cn('fixed inset-y-0 left-0 z-50 flex w-[252px] flex-col bg-[hsl(var(--sidebar))] px-4 py-5 text-[hsl(var(--sidebar-foreground))] transition-transform duration-300 md:translate-x-0', mobileOpen ? 'translate-x-0' : '-translate-x-full')}>
        <div className="px-2"><Logo inverse /></div>
        <div className="mt-9 flex items-center gap-2 rounded-xl border border-[hsl(225_22%_26%)] bg-[hsl(225_27%_17%)] px-3 py-2.5"><span className="h-2 w-2 animate-pulse-soft rounded-full bg-[hsl(var(--primary))]" /><div className="min-w-0"><p className="text-[10px] font-mono-ui uppercase tracking-[0.1em] text-[hsl(225_10%_64%)]">Environment</p><p className="truncate text-xs font-semibold">Demo workspace</p></div><ChevronDown size={14} className="ml-auto text-[hsl(225_10%_64%)]" /></div>
        <nav className="mt-8 flex-1 space-y-7">
          {navGroups.map((group) => <div key={group.label}><p className="mb-2 px-2 text-[10px] font-mono-ui uppercase tracking-[0.18em] text-[hsl(225_10%_55%)]">{group.label}</p><div className="space-y-1">{group.items.map((item) => { const active = location === item.href; const Icon = item.icon; return <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`} className={cn('group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] transition-colors', active ? 'bg-[hsl(var(--sidebar-accent))] font-semibold text-[hsl(var(--sidebar-foreground))]' : 'text-[hsl(225_10%_68%)] hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-foreground))]')}><Icon size={16} strokeWidth={active ? 2.2 : 1.8} /><span>{item.label}</span>{active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" />}</Link>; })}</div></div>)}
        </nav>
        <div className="border-t border-[hsl(225_22%_26%)] pt-4"><div className="flex items-center gap-3 px-2"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--accent))] text-xs font-bold text-[hsl(var(--accent-foreground))]">SF</div><div className="min-w-0"><p className="truncate text-xs font-semibold">Your workspace</p><p className="truncate text-[10px] text-[hsl(225_10%_62%)]">Control room access</p></div><MoreHorizontal size={16} className="ml-auto text-[hsl(225_10%_62%)]" /></div></div>
      </aside>
    </>
  );
}

function Topbar({ title }: { title: string }) {
  const [, setLocation] = useLocation();
  return <header className="sticky top-0 z-20 flex h-[74px] items-center justify-between border-b border-[hsl(var(--border))] bg-[hsl(var(--background)/0.9)] px-5 backdrop-blur-md md:px-10"><div className="flex items-center gap-3 md:pl-0 pl-12"><span className="text-sm font-semibold">{title}</span><span className="hidden text-[hsl(var(--muted-foreground))] md:inline">/</span><span className="hidden text-xs text-[hsl(var(--muted-foreground))] md:inline">Decision workspace</span></div><div className="flex items-center gap-2"><button type="button" data-testid="button-search" onClick={() => setLocation('/signals')} className="hidden items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 text-xs text-[hsl(var(--muted-foreground))] sm:flex"><Search size={14} />Search <span className="ml-4 font-mono-ui text-[10px]">⌘K</span></button><button type="button" data-testid="button-notifications" onClick={() => setLocation('/dashboard')} className="relative rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-2.5"><Bell size={16} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" /></button><button type="button" data-testid="button-profile" onClick={() => setLocation('/settings')} className="flex h-9 w-9 items-center justify-center rounded-xl bg-[hsl(var(--foreground))] text-xs font-bold text-[hsl(var(--background))]">SF</button></div></header>;
}

function AppShell({ children, title }: { children: ReactNode; title: string }) {
  return <div className="noise-overlay min-h-[100dvh] bg-[hsl(var(--background))]"><Sidebar /><div className="min-h-[100dvh] md:pl-[252px]"><Topbar title={title} /><main className="mx-auto max-w-[1500px] px-5 py-8 md:px-10 md:py-10">{children}</main></div></div>;
}

function Landing() {
  return <div className="noise-overlay min-h-[100dvh] overflow-hidden bg-[hsl(var(--background))]"><header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-10"><Logo /><div className="flex items-center gap-2"><Link href="/sign-in" data-testid="link-landing-sign-in" className="rounded-xl px-4 py-2.5 text-xs font-semibold text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">Sign in</Link><Link href="/sign-up" data-testid="link-landing-sign-up" className="rounded-xl bg-[hsl(var(--foreground))] px-4 py-2.5 text-xs font-semibold text-[hsl(var(--background))] transition-transform hover:-translate-y-0.5">Request access <ArrowRight size={14} className="ml-1 inline" /></Link></div></header><main className="mx-auto max-w-7xl px-5 pb-20 pt-10 md:px-10 md:pt-20"><div className="grid items-center gap-14 lg:grid-cols-[1.04fr_.96fr]"><div className="animate-rise"><div className="mb-6 flex items-center gap-2 text-[11px] font-mono-ui uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]"><span className="h-2 w-2 rounded-full bg-[hsl(var(--primary))]" />Signal intelligence, under control</div><h1 className="max-w-3xl font-display text-5xl font-semibold leading-[.96] tracking-[-0.065em] md:text-7xl">Make every signal earn its way to the <span className="relative whitespace-nowrap">trade<span className="absolute -bottom-2 left-0 h-1 w-full bg-[hsl(var(--accent))]" /></span>.</h1><p className="mt-7 max-w-xl text-base leading-7 text-[hsl(var(--muted-foreground))]">SignalForge turns noisy provider messages into normalized, validated decisions — then puts a deliberate boundary between insight and execution.</p><div className="mt-9 flex flex-wrap gap-3"><Link href="/sign-up" data-testid="link-hero-start" className="rounded-xl bg-[hsl(var(--primary))] px-5 py-3.5 text-sm font-bold text-[hsl(var(--primary-foreground))] shadow-[0_10px_25px_hsl(73_87%_56%/0.2)] transition-transform hover:-translate-y-0.5">Enter the workspace <ArrowRight size={16} className="ml-2 inline" /></Link><Link href="/dashboard" data-testid="link-hero-demo" className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-5 py-3.5 text-sm font-semibold">Explore the command center</Link></div><div className="mt-12 flex gap-8 border-t border-[hsl(var(--border))] pt-5"><div><p className="font-mono-ui text-xl font-semibold">01</p><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">Ingest cleanly</p></div><div><p className="font-mono-ui text-xl font-semibold">02</p><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">Validate visibly</p></div><div><p className="font-mono-ui text-xl font-semibold">03</p><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">Execute deliberately</p></div></div></div><div className="signal-grid relative rounded-[30px] border border-[hsl(var(--border))] bg-[hsl(43_42%_99%)] p-4 shadow-[0_30px_80px_hsl(225_28%_17%/0.12)] md:p-6"><div className="rounded-[22px] border border-[hsl(225_22%_26%)] bg-[hsl(var(--sidebar))] p-5 text-[hsl(var(--sidebar-foreground))]"><div className="flex items-center justify-between border-b border-[hsl(225_22%_26%)] pb-4"><div><p className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-[hsl(225_10%_62%)]">Live pipeline</p><p className="mt-1 font-display text-xl font-semibold">Signal control room</p></div><span className="flex items-center gap-1.5 rounded-full bg-[hsl(73_87%_56%/0.14)] px-2.5 py-1 text-[10px] text-[hsl(73_87%_72%)]"><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" />Monitoring</span></div><div className="mt-5 space-y-3">{['Provider message', 'Normalized payload', 'Risk gate'].map((step, index) => <div key={step} className="flex items-center gap-3 rounded-xl bg-[hsl(225_27%_17%)] p-3"><div className={cn('flex h-8 w-8 items-center justify-center rounded-lg', index === 2 ? 'bg-[hsl(13_81%_64%/0.2)] text-[hsl(var(--accent))]' : 'bg-[hsl(73_87%_56%/0.16)] text-[hsl(var(--primary))]')}>{index === 0 ? <Radio size={15} /> : index === 1 ? <Layers3 size={15} /> : <ShieldCheck size={15} />}</div><div className="flex-1"><p className="text-xs font-semibold">{step}</p><p className="mt-0.5 text-[10px] text-[hsl(225_10%_62%)]">{index === 0 ? 'Message received' : index === 1 ? 'Fields verified' : 'Awaiting your policy'}</p></div><Check size={14} className={index === 2 ? 'text-[hsl(225_10%_48%)]' : 'text-[hsl(var(--primary))]'} /></div>)}</div><div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-xl border border-[hsl(225_22%_26%)] p-3"><p className="text-[10px] text-[hsl(225_10%_62%)]">Execution mode</p><p className="mt-2 font-mono-ui text-sm">MANUAL</p></div><div className="rounded-xl border border-[hsl(225_22%_26%)] p-3"><p className="text-[10px] text-[hsl(225_10%_62%)]">Broker link</p><p className="mt-2 font-mono-ui text-sm text-[hsl(var(--accent))]">NOT SET</p></div></div></div><div className="absolute -bottom-7 -left-5 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 shadow-xl md:-left-8"><div className="flex items-center gap-2"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[hsl(var(--accent))]"><Zap size={14} /></span><span className="font-mono-ui text-[10px] uppercase tracking-wider">Signal integrity</span></div><div className="mt-3 flex items-end gap-2"><span className="font-display text-2xl font-semibold">Guarded</span><span className="mb-1 text-[10px] text-[hsl(var(--muted-foreground))]">by design</span></div></div></div></div><div className="mt-24 border-y border-[hsl(var(--border))] py-12"><div className="grid gap-8 md:grid-cols-3"><div><p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-[hsl(var(--accent-foreground))]">01 / Normalize</p><h2 className="mt-3 font-display text-2xl font-semibold tracking-[-.04em]">One language for every provider.</h2><p className="mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">Map the incoming chaos to the same symbol, direction, levels, and timestamps your controls understand.</p></div><div><p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-[hsl(var(--accent-foreground))]">02 / Validate</p><h2 className="mt-3 font-display text-2xl font-semibold tracking-[-.04em]">See the gate before the order.</h2><p className="mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">Confidence thresholds, drawdown limits, and emergency stops stay visible at the moment they matter.</p></div><div><p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-[hsl(var(--accent-foreground))]">03 / Automate</p><h2 className="mt-3 font-display text-2xl font-semibold tracking-[-.04em]">Automation is a permission, not a default.</h2><p className="mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">Start in demo. Keep the final decision yours. Turn on controlled execution only when the system is ready.</p></div></div></div></main></div>;
}

function SignScreen({ signUp = false }: { signUp?: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };
  return <div className="noise-overlay grid min-h-[100dvh] bg-[hsl(var(--sidebar))] text-[hsl(var(--sidebar-foreground))] lg:grid-cols-[1fr_480px]"><div className="relative hidden overflow-hidden p-10 lg:block"><div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 70% 35%, hsl(73 87% 56% / .32), transparent 28%), linear-gradient(135deg, transparent 0 48%, hsl(225 22% 26% / .8) 48% 49%, transparent 49% 100%)' }} /><div className="relative flex h-full flex-col justify-between"><Logo inverse /><div className="max-w-lg pb-8"><div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"><LockKeyhole size={21} /></div><h1 className="font-display text-6xl font-semibold leading-[.95] tracking-[-.06em]">Trade with a<br /><span className="text-[hsl(var(--primary))]">clear head.</span></h1><p className="mt-6 max-w-sm text-sm leading-6 text-[hsl(225_10%_68%)]">The workspace for signals that need to be understood before they are acted on.</p></div><p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-[hsl(225_10%_52%)]">SignalForge / controlled intelligence</p></div></div><div className="flex items-center justify-center bg-[hsl(var(--background))] px-5 py-10 text-[hsl(var(--foreground))]"><div className="w-full max-w-[390px]"><div className="mb-9 lg:hidden"><Logo /></div><div className="mb-8"><p className="mb-3 font-mono-ui text-[10px] uppercase tracking-[.18em] text-[hsl(var(--muted-foreground))]">Secure access</p><h2 className="font-display text-4xl font-semibold tracking-[-.05em]">{signUp ? 'Open your control room.' : 'Welcome back.'}</h2><p className="mt-3 text-sm text-[hsl(var(--muted-foreground))]">{signUp ? 'Create an account to begin configuring signal intelligence.' : 'Sign in to continue to your decision workspace.'}</p></div><form onSubmit={submit} className="space-y-4">{signUp && <label className="block"><span className="mb-2 block text-xs font-semibold">Your name</span><input required data-testid="input-name" className="h-12 w-full rounded-xl border border-[hsl(var(--input))] bg-[hsl(var(--card))] px-4 text-sm outline-none ring-[hsl(var(--primary))] transition focus:ring-2" placeholder="How should we address you?" /></label>}<label className="block"><span className="mb-2 block text-xs font-semibold">Email address</span><input required type="email" data-testid="input-email" className="h-12 w-full rounded-xl border border-[hsl(var(--input))] bg-[hsl(var(--card))] px-4 text-sm outline-none ring-[hsl(var(--primary))] transition focus:ring-2" placeholder="you@desk.com" /></label><label className="block"><div className="mb-2 flex items-center justify-between"><span className="text-xs font-semibold">Password</span>{!signUp && <button type="button" data-testid="button-forgot-password" onClick={() => setSubmitted(true)} className="text-xs text-[hsl(var(--muted-foreground))] underline underline-offset-4">Forgot password?</button>}</div><input required type="password" data-testid="input-password" className="h-12 w-full rounded-xl border border-[hsl(var(--input))] bg-[hsl(var(--card))] px-4 text-sm outline-none ring-[hsl(var(--primary))] transition focus:ring-2" placeholder="At least 8 characters" /></label><button type="submit" data-testid="button-auth-submit" className="h-12 w-full rounded-xl bg-[hsl(var(--primary))] text-sm font-bold text-[hsl(var(--primary-foreground))] transition-transform hover:-translate-y-0.5">{signUp ? 'Create account' : 'Sign in'}</button></form>{submitted && <div className="mt-4 rounded-xl border border-[hsl(var(--accent)/.35)] bg-[hsl(var(--accent)/.1)] p-3 text-xs leading-5" data-testid="status-auth"><strong>Authentication is ready to connect.</strong> The Clerk session will take over this screen once configured for the workspace.</div>}<div className="my-7 flex items-center gap-3 text-[10px] font-mono-ui uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]"><span className="h-px flex-1 bg-[hsl(var(--border))]" />or<span className="h-px flex-1 bg-[hsl(var(--border))]" /></div><button type="button" data-testid="button-sso" onClick={() => setSubmitted(true)} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-sm font-semibold"><KeyRound size={15} />Continue with SSO</button><p className="mt-8 text-center text-xs text-[hsl(var(--muted-foreground))]">{signUp ? 'Already have access?' : 'New to SignalForge?'} <Link href={signUp ? '/sign-in' : '/sign-up'} data-testid="link-auth-switch" className="font-bold text-[hsl(var(--foreground))] underline underline-offset-4">{signUp ? 'Sign in' : 'Request access'}</Link></p><Link href="/" data-testid="link-auth-home" className="mt-5 flex items-center justify-center gap-2 text-xs text-[hsl(var(--muted-foreground))]"><ArrowRight size={13} className="rotate-180" /> Back to SignalForge</Link></div></div></div>;
}

function Dashboard() {
  const summary = useGetDashboardSummary();
  const activity = useListActivity();
  const signals = useListSignals({ limit: 5 });
  const account = summary.data?.account;
  const metrics = summary.data?.metrics;
  return <AppShell title="Overview"><PageIntro eyebrow="Workspace overview" title={`Good to see you${account?.name ? `, ${account.name.split(' ')[0]}` : ''}.`} description="A measured view of your account readiness, signal flow, and the controls standing between insight and execution." action={<Link href="/signals" data-testid="link-overview-signals" className="rounded-xl bg-[hsl(var(--foreground))] px-4 py-3 text-xs font-bold text-[hsl(var(--background))]">Open signal center <ArrowRight size={14} className="ml-1 inline" /></Link>} /><QueryNotice loading={summary.isLoading} error={!!summary.error} onRetry={() => summary.refetch()} />{!summary.isLoading && !summary.error && <><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[{ label: 'Available balance', value: formatCurrency(metrics?.balance), icon: WalletCards, note: metrics?.balance === null ? 'Connect a broker to sync' : 'Broker reported' }, { label: 'Account equity', value: formatCurrency(metrics?.equity), icon: BarChart3, note: metrics?.equity === null ? 'Waiting for broker data' : 'Current snapshot' }, { label: 'Open positions', value: metrics?.openPositions ?? '—', icon: Activity, note: 'Across connected accounts' }, { label: 'Today P&L', value: formatCurrency(metrics?.todayPnl), icon: ArrowUpRight, note: metrics?.todayPnl === null ? 'No trading data yet' : 'Session performance' }].map((metric, index) => { const Icon = metric.icon; return <Panel key={metric.label} className={cn('animate-rise', index > 1 && 'delay-100')}><div className="flex items-center justify-between"><span className="text-xs text-[hsl(var(--muted-foreground))]">{metric.label}</span><Icon size={16} className="text-[hsl(var(--muted-foreground))]" /></div><p className="mt-5 font-display text-3xl font-semibold tracking-[-.05em]">{metric.value}</p><p className="mt-2 text-[11px] text-[hsl(var(--muted-foreground))]">{metric.note}</p></Panel>; })}</div><div className="mt-5 grid gap-5 xl:grid-cols-[1.18fr_.82fr]"><Panel><div className="mb-5 flex items-start justify-between"><div><p className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">Readiness</p><h2 className="mt-1 font-display text-xl font-semibold">Account path to automation</h2></div><Link href="/risk" data-testid="link-dashboard-risk" className="text-xs font-semibold text-[hsl(var(--muted-foreground))]">Review controls <ArrowRight size={13} className="ml-1 inline" /></Link></div><div className="grid gap-3 md:grid-cols-3">{[{ label: 'Identity', value: summary.data?.kyc?.label ?? 'Not started', icon: UserRound, link: '/settings' }, { label: 'Broker connection', value: summary.data?.trading?.brokerStatus?.replaceAll('_', ' ') ?? 'Not connected', icon: WalletCards, link: '/brokers' }, { label: 'Automation mode', value: summary.data?.trading?.automation ?? 'OFF', icon: Bot, link: '/risk' }].map((item) => { const Icon = item.icon; return <Link href={item.link} key={item.label} data-testid={`card-readiness-${item.label.toLowerCase().replaceAll(' ', '-')}`} className="group rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background)/.55)] p-4 transition-transform hover:-translate-y-0.5"><div className="flex items-center justify-between"><Icon size={16} className="text-[hsl(var(--accent-foreground))]" /><ArrowRight size={14} className="text-[hsl(var(--muted-foreground))] opacity-0 transition-opacity group-hover:opacity-100" /></div><p className="mt-7 text-[10px] font-mono-ui uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))]">{item.label}</p><p className="mt-2 truncate text-sm font-semibold capitalize">{item.value}</p></Link>; })}</div><div className="mt-5 rounded-xl bg-[hsl(var(--muted))] p-4"><div className="flex items-start gap-3"><CircleHelp size={17} className="mt-0.5 text-[hsl(var(--accent-foreground))]" /><div><p className="text-xs font-bold">Your next decision</p><p className="mt-1 text-xs leading-5 text-[hsl(var(--muted-foreground))]">{summary.data?.trading?.brokerStatus === 'CONNECTED' ? 'Review your risk profile before moving beyond demo mode.' : 'Connect a broker account to begin syncing account readiness. Nothing will be automated without an explicit policy.'}</p></div></div></div></Panel><Panel dark><div className="flex items-start justify-between"><div><p className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-[hsl(225_10%_62%)]">Recent activity</p><h2 className="mt-1 font-display text-xl font-semibold">Signal log</h2></div><Activity size={17} className="text-[hsl(var(--primary))]" /></div>{activity.isLoading ? <div className="mt-5"><QueryNotice loading /></div> : activity.data?.length ? <div className="mt-5 space-y-4">{activity.data.slice(0, 5).map((item) => <div key={item.id} data-testid={`activity-item-${item.id}`} className="flex gap-3 border-b border-[hsl(225_22%_26%)] pb-4 last:border-0 last:pb-0"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--primary))]" /><div><p className="text-xs font-semibold">{item.title}</p><p className="mt-1 text-[11px] leading-5 text-[hsl(225_10%_67%)]">{item.description}</p><p className="mt-1 font-mono-ui text-[9px] uppercase tracking-wider text-[hsl(225_10%_48%)]">{formatDate(item.createdAt)}</p></div></div>)}</div> : <div className="mt-5"><p className="text-sm font-semibold">No activity yet.</p><p className="mt-2 text-xs leading-5 text-[hsl(225_10%_67%)]">Once a source receives a message or a control changes, the trail will appear here.</p></div>}</Panel></div><Panel className="mt-5"><div className="mb-5 flex items-end justify-between"><div><p className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">Pipeline preview</p><h2 className="mt-1 font-display text-xl font-semibold">Latest normalized signals</h2></div><Link href="/signals" data-testid="link-dashboard-all-signals" className="text-xs font-semibold">View all <ArrowRight size={13} className="ml-1 inline" /></Link></div>{signals.isLoading ? <QueryNotice loading /> : signals.data?.length ? <SignalTable signals={signals.data} compact /> : <EmptyState icon={Radio} title="The pipeline is quiet." description="Connect a source and send a provider message to see your first normalized signal here." action={<Link href="/sources" data-testid="link-empty-sources" className="rounded-xl bg-[hsl(var(--foreground))] px-4 py-2.5 text-xs font-bold text-[hsl(var(--background))]">Connect a source</Link>} />}</Panel></>}</AppShell>;
}

function SignalTable({ signals, compact = false }: { signals: any[]; compact?: boolean }) {
  return <div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left"><thead><tr className="border-b border-[hsl(var(--border))] text-[10px] font-mono-ui uppercase tracking-[.14em] text-[hsl(var(--muted-foreground))]"><th className="pb-3 pl-1 font-medium">Instrument</th><th className="pb-3 font-medium">Direction</th><th className="pb-3 font-medium">Levels</th><th className="pb-3 font-medium">Confidence</th><th className="pb-3 font-medium">Status</th><th className="pb-3 pr-1 text-right font-medium">Received</th></tr></thead><tbody>{signals.map((signal) => <tr key={signal.id} data-testid={`row-signal-${signal.id}`} className="border-b border-[hsl(var(--border))] last:border-0"><td className="py-4 pl-1"><p className="font-display text-sm font-semibold">{signal.symbol}</p><p className="mt-1 text-[10px] text-[hsl(var(--muted-foreground))]">{signal.source}</p></td><td className="py-4"><span className={cn('inline-flex items-center gap-1.5 text-xs font-semibold', signal.direction === 'BUY' ? 'text-[hsl(184_42%_31%)]' : 'text-[hsl(9_58%_37%)]')}>{signal.direction === 'BUY' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{signal.direction}</span></td><td className="py-4 font-mono-ui text-[11px] text-[hsl(var(--muted-foreground))]">{signal.entry ?? '—'} <span className="mx-1 text-[hsl(var(--border))]">/</span> {signal.stopLoss ?? '—'} <span className="mx-1 text-[hsl(var(--border))]">/</span> {signal.takeProfit ?? '—'}</td><td className="py-4 font-mono-ui text-xs">{signal.confidence === null || signal.confidence === undefined ? '—' : `${signal.confidence}%`}</td><td className="py-4"><StatusBadge value={signal.status} /></td><td className="py-4 pr-1 text-right text-[11px] text-[hsl(var(--muted-foreground))]">{formatDate(signal.receivedAt)}</td></tr>)}</tbody></table>{compact && <p className="mt-4 text-[10px] text-[hsl(var(--muted-foreground))]">Showing the five most recent signals.</p>}</div>;
}

function Signals() {
  const [filter, setFilter] = useState<'all' | 'live' | 'validated' | 'rejected' | 'archived'>('all');
  const query = useListSignals({ status: filter, limit: 100 });
  return <AppShell title="Signal center"><PageIntro eyebrow="Normalized signal center" title="Read the signal, then decide." description="Every provider message lands here only after it has been normalized into a consistent, inspectable shape." action={<button type="button" data-testid="button-refresh-signals" onClick={() => query.refetch()} className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-3 text-xs font-semibold"><RefreshCw size={14} className="mr-2 inline" />Refresh feed</button>} /><Panel><div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center"><div><p className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">Signal ledger</p><p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">Filter by where each signal sits in the decision pipeline.</p></div><div className="flex flex-wrap gap-1.5">{(['all', 'live', 'validated', 'rejected', 'archived'] as const).map((item) => <button key={item} type="button" data-testid={`button-filter-${item}`} onClick={() => setFilter(item)} className={cn('rounded-lg px-3 py-2 text-[10px] font-mono-ui uppercase tracking-[.1em] transition-colors', filter === item ? 'bg-[hsl(var(--foreground))] text-[hsl(var(--background))]' : 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]')}>{item}</button>)}</div></div><QueryNotice loading={query.isLoading} error={!!query.error} onRetry={() => query.refetch()} />{!query.isLoading && !query.error && (query.data?.length ? <SignalTable signals={query.data} /> : <EmptyState icon={Radio} title={filter === 'all' ? 'No signals have arrived.' : `No ${filter} signals yet.`} description="Signals appear after a connected source receives a provider message. This workspace does not fabricate pipeline activity." action={<Link href="/sources" data-testid="link-signals-empty-sources" className="rounded-xl bg-[hsl(var(--foreground))] px-4 py-2.5 text-xs font-bold text-[hsl(var(--background))]">Manage sources</Link>} />)}</Panel></AppShell>;
}

function Sources() {
  const query = useListSignalSources();
  const create = useCreateSignalSource();
  const update = useUpdateSignalSource();
  const client = useQueryClient();
  const [dialog, setDialog] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<SourceType>('TELEGRAM');
  const submit = (event: FormEvent) => { event.preventDefault(); create.mutate({ data: { name, type } }, { onSuccess: () => { client.invalidateQueries({ queryKey: getListSignalSourcesQueryKey() }); setName(''); setDialog(false); } }); };
  return <AppShell title="Signal sources"><PageIntro eyebrow="Ingestion layer" title="Connect the signal stream." description="Name each provider path clearly. Keep the source boundary visible before any message can become a trade." action={<button type="button" data-testid="button-add-source" onClick={() => setDialog(true)} className="rounded-xl bg-[hsl(var(--foreground))] px-4 py-3 text-xs font-bold text-[hsl(var(--background))]"><Plus size={15} className="mr-1.5 inline" />Add source</button>} /><div className="grid gap-5 xl:grid-cols-[1.15fr_.85fr]"><Panel><div className="mb-5 flex items-start justify-between"><div><p className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">Connected paths</p><h2 className="mt-1 font-display text-xl font-semibold">Your sources</h2></div><span className="rounded-full bg-[hsl(var(--muted))] px-2.5 py-1 text-[10px] font-mono-ui">{query.data?.length ?? 0} configured</span></div><QueryNotice loading={query.isLoading} error={!!query.error} onRetry={() => query.refetch()} />{!query.isLoading && !query.error && (query.data?.length ? <div className="space-y-3">{query.data.map((source) => <div key={source.id} data-testid={`card-source-${source.id}`} className="group rounded-2xl border border-[hsl(var(--border))] p-4 transition-colors hover:bg-[hsl(var(--muted)/.45)]"><div className="flex items-start gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--muted))] text-[hsl(var(--accent-foreground))]"><Radio size={18} /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className="font-semibold">{source.name}</p><StatusBadge value={source.status} /></div><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{source.type} · {source.channelCount} channel{source.channelCount === 1 ? '' : 's'}</p></div><button type="button" data-testid={`button-toggle-source-${source.id}`} onClick={() => update.mutate({ id: source.id, data: { status: source.status === 'PAUSED' ? 'CONNECTED' : 'PAUSED' } }, { onSuccess: () => client.invalidateQueries({ queryKey: getListSignalSourcesQueryKey() }) })} className="rounded-lg border border-[hsl(var(--border))] px-2.5 py-1.5 text-[10px] font-semibold">{source.status === 'PAUSED' ? 'Resume' : 'Pause'}</button></div><div className="mt-4 flex items-center justify-between border-t border-[hsl(var(--border))] pt-3 text-[10px] text-[hsl(var(--muted-foreground))]"><span className="font-mono-ui uppercase tracking-[.08em]">{source.lastMessageAt ? `Last message ${formatDate(source.lastMessageAt)}` : 'Awaiting first message'}</span><span className="flex items-center gap-1"><CircleHelp size={12} /> Routing configured by provider</span></div></div>)}</div> : <EmptyState icon={Database} title="No sources connected." description="Start with the path your provider already uses. SignalForge will keep its connection state explicit." action={<button type="button" data-testid="button-empty-add-source" onClick={() => setDialog(true)} className="rounded-xl bg-[hsl(var(--foreground))] px-4 py-2.5 text-xs font-bold text-[hsl(var(--background))]">Add your first source</button>} />)}</Panel><Panel dark><p className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-[hsl(225_10%_62%)]">Ingestion protocol</p><h2 className="mt-2 font-display text-2xl font-semibold">Make the handoff legible.</h2><p className="mt-3 text-sm leading-6 text-[hsl(225_10%_68%)]">A connected source does not grant execution permissions. It only gives the normalizer a message to inspect.</p><div className="mt-7 space-y-4">{[['01', 'Receive', 'Capture the provider message with its source context.'], ['02', 'Normalize', 'Extract symbol, direction, levels, and confidence.'], ['03', 'Gate', 'Apply your risk policy before any broker action.']].map(([number, title, copy]) => <div key={number} className="flex gap-3"><span className="font-mono-ui text-xs text-[hsl(var(--primary))]">{number}</span><div><p className="text-sm font-semibold">{title}</p><p className="mt-1 text-xs leading-5 text-[hsl(225_10%_62%)]">{copy}</p></div></div>)}</div></Panel></div>{dialog && <div role="dialog" aria-modal="true" className="fixed inset-0 z-[60] flex items-center justify-center bg-[hsl(225_32%_16%/0.38)] p-5"><div className="w-full max-w-lg rounded-[24px] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-2xl"><div className="flex items-start justify-between"><div><p className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">New source</p><h2 className="mt-2 font-display text-2xl font-semibold">Name the connection.</h2></div><button type="button" data-testid="button-close-source-dialog" onClick={() => setDialog(false)} className="rounded-lg p-2 text-[hsl(var(--muted-foreground))]"><X size={17} /></button></div><form onSubmit={submit} className="mt-6 space-y-4"><label className="block"><span className="mb-2 block text-xs font-semibold">Source name</span><input required value={name} onChange={(event) => setName(event.target.value)} data-testid="input-source-name" className="h-11 w-full rounded-xl border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 text-sm outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]" placeholder="e.g. London open desk" /></label><label className="block"><span className="mb-2 block text-xs font-semibold">Connection type</span><select value={type} onChange={(event) => setType(event.target.value as SourceType)} data-testid="select-source-type" className="h-11 w-full rounded-xl border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 text-sm outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]">{sourceOptions.map((option) => <option key={option.value} value={option.value}>{option.label} — {option.hint}</option>)}</select></label><div className="rounded-xl bg-[hsl(var(--muted))] p-3 text-xs leading-5 text-[hsl(var(--muted-foreground))]">The source will be created as not connected. Provider credentials and channel mapping are configured outside this first step.</div><button disabled={create.isPending} type="submit" data-testid="button-submit-source" className="h-11 w-full rounded-xl bg-[hsl(var(--foreground))] text-xs font-bold text-[hsl(var(--background))] disabled:opacity-50">{create.isPending ? 'Creating source…' : 'Create source'}</button></form></div></div>}</AppShell>;
}

function Brokers() {
  const query = useListBrokerAccounts();
  return <AppShell title="Broker accounts"><PageIntro eyebrow="Execution boundary" title="Know what is connected." description="Keep demo and live accounts visually distinct. SignalForge will never imply a broker is ready when the API says otherwise." action={<button type="button" data-testid="button-connect-broker" className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-3 text-xs font-semibold"><Plus size={15} className="mr-1.5 inline" />Connect broker</button>} /><Panel><div className="mb-6 flex items-center justify-between"><div><p className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">Broker registry</p><h2 className="mt-1 font-display text-xl font-semibold">Accounts & environments</h2></div><span className="flex items-center gap-1.5 text-[10px] font-mono-ui uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))]"><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" />No implied readiness</span></div><QueryNotice loading={query.isLoading} error={!!query.error} onRetry={() => query.refetch()} />{!query.isLoading && !query.error && (query.data?.length ? <div className="grid gap-4 md:grid-cols-2">{query.data.map((account) => <div key={account.id} data-testid={`card-broker-${account.id}`} className="rounded-2xl border border-[hsl(var(--border))] p-5"><div className="flex items-start justify-between"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--muted))]"><WalletCards size={18} /></div><div><p className="font-semibold">{account.name}</p><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{account.platform} account</p></div></div><StatusBadge value={account.status} /></div><div className="mt-6 flex gap-2"><span className={cn('rounded-lg px-2.5 py-1.5 text-[10px] font-mono-ui uppercase', account.mode === 'LIVE' ? 'bg-[hsl(var(--accent)/.16)] text-[hsl(9_58%_37%)]' : 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]')}>{account.mode} environment</span><span className="rounded-lg bg-[hsl(var(--muted))] px-2.5 py-1.5 text-[10px] font-mono-ui uppercase">Execution gated</span></div></div>)}</div> : <EmptyState icon={WalletCards} title="No broker accounts connected." description="Connect a demo account first. This registry stays empty until an external broker integration is configured." action={<button type="button" data-testid="button-empty-connect-broker" className="rounded-xl bg-[hsl(var(--foreground))] px-4 py-2.5 text-xs font-bold text-[hsl(var(--background))]">Connect a demo account</button>} />)}</Panel><div className="mt-5 grid gap-4 md:grid-cols-3"><Panel><p className="font-mono-ui text-[10px] uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">Demo mode</p><p className="mt-3 text-sm font-semibold">Safe rehearsal</p><p className="mt-2 text-xs leading-5 text-[hsl(var(--muted-foreground))]">Test normalized signals without touching live capital.</p></Panel><Panel><p className="font-mono-ui text-[10px] uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">Live mode</p><p className="mt-3 text-sm font-semibold">Explicit permission</p><p className="mt-2 text-xs leading-5 text-[hsl(var(--muted-foreground))]">Requires a connected live account and a deliberate policy.</p></Panel><Panel><p className="font-mono-ui text-[10px] uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">Transport</p><p className="mt-3 text-sm font-semibold">External integration</p><p className="mt-2 text-xs leading-5 text-[hsl(var(--muted-foreground))]">If a connector is not configured, it will be stated—not simulated.</p></Panel></div></AppShell>;
}

function Risk() {
  const query = useGetRiskProfile();
  const update = useUpdateRiskProfile();
  const client = useQueryClient();
  const [form, setForm] = useState<RiskForm>({ riskPerTrade: '', maxDailyLoss: '', maxOpenTrades: '', minimumConfidence: '', emergencyStop: false });
  useEffect(() => { if (query.data) setForm({ riskPerTrade: String(query.data.riskPerTrade), maxDailyLoss: String(query.data.maxDailyLoss), maxOpenTrades: String(query.data.maxOpenTrades), minimumConfidence: String(query.data.minimumConfidence), emergencyStop: query.data.emergencyStop }); }, [query.data]);
  const change = (key: keyof RiskForm, value: string | boolean) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event: FormEvent) => { event.preventDefault(); update.mutate({ data: { riskPerTrade: Number(form.riskPerTrade), maxDailyLoss: Number(form.maxDailyLoss), maxOpenTrades: Number(form.maxOpenTrades), minimumConfidence: Number(form.minimumConfidence), emergencyStop: form.emergencyStop } }, { onSuccess: () => client.invalidateQueries({ queryKey: getGetRiskProfileQueryKey() }) }); };
  return <AppShell title="Risk controls"><PageIntro eyebrow="Policy layer" title="Put a boundary around risk." description="Your risk profile is the final visible gate before SignalForge can prepare anything for a broker. Tune it with the same care as a strategy." action={<div className={cn('flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold', form.emergencyStop ? 'bg-[hsl(var(--accent)/.16)] text-[hsl(9_58%_37%)]' : 'bg-[hsl(var(--muted))]')}><span className={cn('h-2 w-2 rounded-full', form.emergencyStop ? 'bg-[hsl(var(--accent))]' : 'bg-[hsl(184_42%_45%)]')} />{form.emergencyStop ? 'Emergency stop active' : 'Risk gate available'}</div>} /><QueryNotice loading={query.isLoading} error={!!query.error} onRetry={() => query.refetch()} />{!query.isLoading && !query.error && <div className="grid gap-5 xl:grid-cols-[1.05fr_.95fr]"><Panel><div className="mb-6"><p className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">Active profile</p><h2 className="mt-1 font-display text-xl font-semibold">Guardrails for preparation</h2></div><form onSubmit={submit} className="space-y-5">{[['riskPerTrade', 'Risk per trade', 'Percent of account equity', '%'], ['maxDailyLoss', 'Maximum daily loss', 'Absolute loss threshold', '$'], ['maxOpenTrades', 'Maximum open trades', 'Concurrent position count', ''], ['minimumConfidence', 'Minimum confidence', 'Signal confidence required', '%']].map(([key, label, hint, unit]) => <label key={key} className="block"><div className="mb-2 flex items-center justify-between"><span className="text-sm font-semibold">{label}</span><span className="text-[10px] text-[hsl(var(--muted-foreground))]">{hint}</span></div><div className="relative"><input required type="number" min="0" value={form[key as keyof RiskForm] as string} onChange={(event) => change(key as keyof RiskForm, event.target.value)} data-testid={`input-risk-${key}`} className="h-12 w-full rounded-xl border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-4 pr-12 font-mono-ui text-sm outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]" />{unit && <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono-ui text-xs text-[hsl(var(--muted-foreground))]">{unit}</span>}</div></label>)}<label className="flex cursor-pointer items-center justify-between rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background)/.6)] p-4"><div><p className="text-sm font-semibold">Emergency stop</p><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">Block all automation preparation immediately.</p></div><input type="checkbox" checked={form.emergencyStop} onChange={(event) => change('emergencyStop', event.target.checked)} data-testid="input-emergency-stop" className="h-5 w-5 accent-[hsl(var(--accent))]" /></label><button disabled={update.isPending} type="submit" data-testid="button-save-risk" className="h-12 w-full rounded-xl bg-[hsl(var(--foreground))] text-xs font-bold text-[hsl(var(--background))] disabled:opacity-50">{update.isPending ? 'Saving policy…' : 'Save risk profile'}</button></form></Panel><Panel dark><p className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-[hsl(225_10%_62%)]">Control philosophy</p><h2 className="mt-2 font-display text-2xl font-semibold">Quiet systems make safer decisions.</h2><p className="mt-3 text-sm leading-6 text-[hsl(225_10%_68%)]">Risk is not a badge. It is a contract between the signal, your account, and the execution boundary.</p><div className="mt-8 space-y-5">{[['Minimum confidence', 'Signals below this threshold stay out of the preparation queue.', Gauge], ['Daily loss ceiling', 'A hard stop that keeps one session from becoming a new strategy.', TriangleAlert], ['Emergency stop', 'The fastest path to zero automation when the context changes.', CircleSlash]].map(([title, copy, Icon]) => { const I = Icon as typeof Gauge; return <div key={title as string} className="flex gap-3"><I size={17} className="mt-0.5 text-[hsl(var(--primary))]" /><div><p className="text-sm font-semibold">{title as string}</p><p className="mt-1 text-xs leading-5 text-[hsl(225_10%_62%)]">{copy as string}</p></div></div>; })}</div></Panel></div>}</AppShell>;
}

function Analytics() {
  const query = useGetAnalyticsOverview();
  const data = query.data;
  const hasTrades = !!data?.totalTrades;
  return <AppShell title="Analytics"><PageIntro eyebrow="Performance ledger" title="Measure what actually happened." description="Analytics stays honest: no trades means no invented curve, no implied win rate, and no flattering placeholders." action={<button type="button" data-testid="button-export-analytics" className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-3 text-xs font-semibold"><SquareArrowOutUpRight size={14} className="mr-2 inline" />Export report</button>} /><QueryNotice loading={query.isLoading} error={!!query.error} onRetry={() => query.refetch()} />{!query.isLoading && !query.error && <>{hasTrades ? <><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{[['Total trades', data?.totalTrades ?? '—'], ['Win rate', data?.winRate === null ? '—' : `${data?.winRate}%`], ['Profit factor', data?.profitFactor ?? '—'], ['Net P&L', formatCurrency(data?.netPnl)], ['Max drawdown', data?.maxDrawdown === null ? '—' : `${data?.maxDrawdown}%`]].map(([label, value]) => <Panel key={label as string}><p className="text-xs text-[hsl(var(--muted-foreground))]">{label as string}</p><p className="mt-5 font-display text-3xl font-semibold tracking-[-.05em]">{value as string}</p></Panel>)}</div><Panel className="mt-5"><div className="flex h-[300px] items-center justify-center rounded-2xl border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--background)/.5)]"><div className="text-center"><LineChart size={22} className="mx-auto text-[hsl(var(--muted-foreground))]" /><p className="mt-3 text-sm font-semibold">Performance curve will appear here.</p><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">The analytics endpoint has summary data; detailed curve data is not configured.</p></div></div></Panel></> : <Panel><EmptyState icon={LineChart} title="Your performance ledger is empty." description="Analytics will become meaningful after the first broker-confirmed trade. Connect a broker and keep execution in demo until your controls are ready." action={<Link href="/brokers" data-testid="link-analytics-brokers" className="rounded-xl bg-[hsl(var(--foreground))] px-4 py-2.5 text-xs font-bold text-[hsl(var(--background))]">Review broker readiness</Link>} /></Panel>}</>}</AppShell>;
}

function Marketplace() {
  const query = useListProviders();
  return <AppShell title="Provider marketplace"><PageIntro eyebrow="Signal network" title="Find a source worth hearing." description="Provider discovery is intentionally separate from execution. Explore when the network is ready; connect only when the source fits your process." action={<button type="button" data-testid="button-marketplace-filter" className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-3 text-xs font-semibold"><SlidersHorizontal size={14} className="mr-2 inline" />Filter providers</button>} /><Panel><div className="mb-6 flex items-center justify-between"><div><p className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">Available providers</p><h2 className="mt-1 font-display text-xl font-semibold">The network, when you need it</h2></div><span className="font-mono-ui text-[10px] uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))]">{query.data?.length ?? 0} listed</span></div><QueryNotice loading={query.isLoading} error={!!query.error} onRetry={() => query.refetch()} />{!query.isLoading && !query.error && (query.data?.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{query.data.map((provider) => <div key={provider.id} data-testid={`card-provider-${provider.id}`} className="rounded-2xl border border-[hsl(var(--border))] p-5 transition-transform hover:-translate-y-0.5"><div className="flex items-start justify-between"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--muted))] font-display font-bold">{provider.name.slice(0, 1)}</div><StatusBadge value={provider.status} /></div><h3 className="mt-5 font-display text-lg font-semibold">{provider.name}</h3><p className="mt-2 min-h-10 text-xs leading-5 text-[hsl(var(--muted-foreground))]">{provider.description}</p><div className="mt-5 flex items-end justify-between border-t border-[hsl(var(--border))] pt-4"><div><p className="text-[10px] text-[hsl(var(--muted-foreground))]">Followers</p><p className="mt-1 font-mono-ui text-sm">{provider.followers.toLocaleString()}</p></div><div className="text-right"><p className="text-[10px] text-[hsl(var(--muted-foreground))]">Win rate</p><p className="mt-1 font-mono-ui text-sm">{provider.winRate === null || provider.winRate === undefined ? '—' : `${provider.winRate}%`}</p></div></div><button type="button" data-testid={`button-provider-${provider.id}`} className="mt-5 h-10 w-full rounded-xl bg-[hsl(var(--muted))] text-xs font-bold">View provider</button></div>)}</div> : <EmptyState icon={Sparkles} title="The marketplace is being assembled." description="No providers are currently listed for this workspace. When availability is configured, discovery will happen here without pretending the network is populated." action={<button type="button" data-testid="button-marketplace-notify" className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-2.5 text-xs font-semibold">Notify me when available</button>} />)}</Panel></AppShell>;
}

function Settings() {
  const summary = useGetDashboardSummary();
  const [saved, setSaved] = useState(false);
  return <AppShell title="Settings"><PageIntro eyebrow="Workspace settings" title="Keep the workspace yours." description="Account, security, and operational preferences live here. Authentication and broker credentials remain outside this surface." action={<button type="button" data-testid="button-save-settings" onClick={() => setSaved(true)} className="rounded-xl bg-[hsl(var(--foreground))] px-4 py-3 text-xs font-bold text-[hsl(var(--background))]">{saved ? <><Check size={14} className="mr-1.5 inline" />Saved</> : 'Save changes'}</button>} /><div className="grid gap-5 xl:grid-cols-[1fr_.8fr]"><Panel><div className="mb-6 flex items-center gap-4"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[hsl(var(--accent))] font-display text-xl font-bold">{summary.data?.account?.initials ?? 'SF'}</div><div><p className="font-display text-xl font-semibold">{summary.data?.account?.name ?? 'Workspace account'}</p><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{summary.data?.account?.role ?? 'Account owner'}</p></div></div><div className="space-y-4"><label className="block"><span className="mb-2 block text-xs font-semibold">Display name</span><input defaultValue={summary.data?.account?.name ?? ''} data-testid="input-settings-name" className="h-11 w-full rounded-xl border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 text-sm outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]" placeholder="Your workspace name" /></label><label className="block"><span className="mb-2 block text-xs font-semibold">Workspace role</span><input disabled value={summary.data?.account?.role ?? 'Account owner'} data-testid="input-settings-role" className="h-11 w-full rounded-xl border border-[hsl(var(--input))] bg-[hsl(var(--muted))] px-3 text-sm text-[hsl(var(--muted-foreground))]" readOnly /></label></div></Panel><div className="space-y-5"><Panel><div className="flex items-start gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[hsl(var(--muted))]"><LockKeyhole size={16} /></div><div><h2 className="font-display text-lg font-semibold">Security</h2><p className="mt-1 text-xs leading-5 text-[hsl(var(--muted-foreground))]">Authentication is handled by the configured identity provider. No secrets are stored in this form.</p><button type="button" data-testid="button-manage-security" onClick={() => setSaved(true)} className="mt-4 text-xs font-semibold underline underline-offset-4">Manage security settings <ArrowRight size={13} className="ml-1 inline" /></button></div></div></Panel><Panel><div className="flex items-start gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[hsl(var(--muted))]"><Bell size={16} /></div><div className="flex-1"><h2 className="font-display text-lg font-semibold">Notifications</h2><p className="mt-1 text-xs leading-5 text-[hsl(var(--muted-foreground))]">Receive a clear note when a signal is rejected or a risk control changes.</p><label className="mt-4 flex items-center justify-between text-xs font-semibold"><span>Workspace alerts</span><input type="checkbox" defaultChecked data-testid="input-notifications" className="h-5 w-5 accent-[hsl(var(--accent))]" /></label></div></div></Panel></div></div></AppShell>;
}

function SignInPage() {
  return <div className="noise-overlay flex min-h-[100dvh] items-center justify-center bg-[hsl(var(--background))] px-4 py-8"><div className="absolute left-5 top-5 md:left-10 md:top-8"><Logo /></div><SignIn routing="path" path={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} /></div>;
}

function SignUpPage() {
  return <div className="noise-overlay flex min-h-[100dvh] items-center justify-center bg-[hsl(var(--background))] px-4 py-8"><div className="absolute left-5 top-5 md:left-10 md:top-8"><Logo /></div><SignUp routing="path" path={`${basePath}/sign-up`} signInUrl={`${basePath}/sign-in`} /></div>;
}

function HomeRedirect() {
  return <><Show when="signed-in"><Redirect to="/dashboard" /></Show><Show when="signed-out"><Landing /></Show></>;
}

function RequireAuth({ children }: { children: ReactNode }) {
  return <><Show when="signed-in">{children}</Show><Show when="signed-out"><Redirect to="/sign-in" /></Show></>;
}

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const client = useQueryClient();
  const previousUserId = useRef<string | null | undefined>(undefined);
  useEffect(() => {
    const unsubscribe = addListener(({ user }) => {
      const userId = user?.id ?? null;
      if (previousUserId.current !== undefined && previousUserId.current !== userId) client.clear();
      previousUserId.current = userId;
    });
    return unsubscribe;
  }, [addListener, client]);
  return null;
}

function Router() {
  return <Switch><Route path="/" component={HomeRedirect} /><Route path="/sign-in/*?" component={SignInPage} /><Route path="/sign-up/*?" component={SignUpPage} /><Route path="/dashboard"><RequireAuth><Dashboard /></RequireAuth></Route><Route path="/signals"><RequireAuth><Signals /></RequireAuth></Route><Route path="/sources"><RequireAuth><Sources /></RequireAuth></Route><Route path="/brokers"><RequireAuth><Brokers /></RequireAuth></Route><Route path="/risk"><RequireAuth><Risk /></RequireAuth></Route><Route path="/analytics"><RequireAuth><Analytics /></RequireAuth></Route><Route path="/marketplace"><RequireAuth><Marketplace /></RequireAuth></Route><Route path="/settings"><RequireAuth><Settings /></RequireAuth></Route><Route path="/workspace"><Redirect to="/dashboard" /></Route><Route component={NotFound} /></Switch>;
}

function ClerkApp() {
  const [, setLocation] = useLocation();
  const stripBase = (path: string) => basePath && path.startsWith(basePath) ? path.slice(basePath.length) || '/' : path;
  return <ClerkProvider publishableKey={clerkPubKey} proxyUrl={clerkProxyUrl} appearance={clerkAppearance} signInUrl={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} localization={{ signIn: { start: { title: 'Welcome back', subtitle: 'Sign in to access your control room' } }, signUp: { start: { title: 'Open your control room', subtitle: 'Configure your signal workspace' } } }} routerPush={(to) => setLocation(stripBase(to))} routerReplace={(to) => setLocation(stripBase(to), { replace: true })}><ClerkQueryClientCacheInvalidator /><Router /></ClerkProvider>;
}

function App() {
  if (!clerkPubKey) return <Landing />;
  return <QueryClientProvider client={queryClient}><WouterRouter base={basePath}><ClerkApp /></WouterRouter></QueryClientProvider>;
}

export default App;