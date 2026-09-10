import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/auth.store';

// Layouts
import { PublicLayout } from '../layouts/PublicLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { UserLayout } from '../layouts/UserLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { ComplianceLayout } from '../layouts/ComplianceLayout';
import { ExecutiveLayout } from '../layouts/ExecutiveLayout';
import { SupportLayout } from '../layouts/SupportLayout';
import { ProviderLayout } from '../layouts/ProviderLayout';
import { WhiteLabelLayout } from '../layouts/WhiteLabelLayout';

// Public Pages
import {
  Home,
  HowSignalForgeWorks,
  Features,
  Pricing,
  Enterprise,
  WhiteLabel,
  APIPlatform,
  Security,
  About,
  Contact,
  FAQ,
} from '../pages/public';

// Auth Pages
import {
  Login,
  Register,
  EmailVerification,
  PhoneVerification,
  ForgotPassword,
  ResetPassword,
  TwoFactorAuthentication,
  TwoFactorVerification,
  AccountRecovery,
  DeviceVerification,
} from '../pages/auth';

// Dashboard
import { DashboardOverview } from '../pages/dashboard';

// KYC
import {
  KYCStatusDashboard,
  KYCIntroduction,
  PersonalInformation,
  IdentityDocument,
  DocumentVerification,
  SelfieVerification,
  KYCReviewStatus,
  VerificationResult,
  KYCResubmission,
  KYCReverification,
  KYCHelp,
} from '../pages/kyc';

// Signals
import {
  LiveSignals,
  SignalHistory,
  SignalDetails,
  ProcessingTimeline,
  SignalConfidence,
  SignalRiskAnalysis,
  ProviderSignals,
  DuplicateSignals,
  ConsensusSignals,
  RejectedSignals,
  SignalReplay,
} from '../pages/signals';

// Signal Sources
import {
  SignalSources,
  TelegramConnection,
  AddSignalSource,
  TelegramChannels,
  DiscordConnection,
  WhatsAppConnection,
  TradingViewWebhooks,
  RESTAPISources,
  EmailSources,
  SourceMessageInbox,
  SourceMessageDetails,
  SourceProcessingLogs,
} from '../pages/signal-sources';

// Trading
import {
  TradingOverview,
  OpenPositions,
  TradeHistory,
  TradeDetails,
  PendingOrders,
  ClosedTrades,
  ManualInterventions,
  TradeEvents,
  TradeTimeline,
  TradeShadow,
  TradeReplay,
  ExecutionHistory,
} from '../pages/trading';

// Risk & Automation
import {
  RiskManagementOverview,
  RiskProfile,
  DailyLossLimits,
  DrawdownProtection,
  MaxOpenTrades,
  TradingSessions,
  TrailingStop,
  BreakEven,
  ProfitLock,
  PartialClose,
  CorrelationProtection,
  NewsFilter,
  EmergencyStop,
  AutomationRules,
  CreateIfThenRule,
  ProviderSpecificRules,
  RiskEvents,
} from '../pages/risk-automation';

// Brokers
import {
  BrokerAccounts,
  ConnectBroker,
  MT4Connection,
  MT5Connection,
  AccountDetails,
  ConnectionStatus,
  AccountMetrics,
  AccountSync,
  ConnectionLogs,
  DisconnectBroker,
} from '../pages/brokers';

// Analytics
import {
  AnalyticsOverview,
  PerformanceDashboard,
  EquityCurve,
  ProfitDrawdownAnalysis,
  WinRate,
  RiskRewardAnalysis,
  SharpeSortino,
  BestWorstSymbols,
  ExecutionLatency,
  RiskBehaviorAnalysis,
  TradingCalendar,
  PerformanceReports,
  ExportReports,
} from '../pages/analytics';

// Referrals
import {
  ReferralDashboard,
  ReferralLink,
  InviteFriends,
  ReferralNetwork,
  ReferredUsers,
  ReferralPerformance,
  ReferralEarnings,
  PendingRewards,
  ReferralWallet,
  RewardHistory,
  MonthlySettlement,
  ReferralLeaderboard,
  ReferralTerms,
} from '../pages/referrals';

// Subscriptions
import {
  PricingPlans,
  MySubscription,
  UpgradePlan,
  DowngradePlan,
  BillingHistory,
  Invoices,
  PaymentMethods,
  SubscriptionUsage,
  CancelSubscription,
} from '../pages/subscriptions';

// Wallet
import {
  WalletOverview,
  AvailableBalance,
  PendingBalance,
  Transactions,
  WithdrawalRequest,
  WithdrawalStatus,
  WithdrawalHistory,
  PaymentAccounts,
} from '../pages/wallet';

// Settings
import {
  ProfileSettings,
  AccountSettings,
  SecuritySettings,
  TwoFactorSettings,
  ConnectedDevices,
  ConnectedAccounts,
  BrokerSettings,
  SignalSourceSettings,
  TradingPreferences,
  RiskPreferences,
  NotificationSettings,
  PrivacySettings,
  APIKeys,
  DataPrivacy,
  DeleteAccount,
} from '../pages/settings';

// Notifications
import {
  NotificationCenter,
  NotificationPreferences,
} from '../pages/notifications';

// Admin
import {
  AdminDashboard,
  Users,
  UserDetails,
  UserRestrictions,
  KYCManagement,
  ProviderManagement,
  TraderManagement,
  SignalSourceManagement,
  BrokerManagement,
  LiveTradeMonitor,
  LiveSignalMonitor,
  AIMonitoring,
  ProviderDNAMonitoring,
  RiskMonitoring,
  ReferralManagement,
  SubscriptionManagement,
  PaymentManagement,
  WithdrawalManagement,
  AffiliateManagement,
  MarketplaceModeration,
  Reports,
  SystemAnalytics,
  AuditLogs,
  SecurityCenter,
  SystemSettings,
} from '../pages/admin';

// Compliance
import {
  ComplianceDashboard,
  KYCQueue,
  PendingKYC,
  UnderReviewKYC,
  VerifiedKYC,
  RejectedKYC,
  SuspendedKYC,
  DocumentTypes,
  VerificationProviders,
  RiskFlags,
  ComplianceReports,
  KYCAuditTrail,
} from '../pages/compliance';

// Executive
import {
  ExecutiveDashboard,
  SubscriptionRevenue,
  MarketplaceRevenue,
  ProviderRevenue,
  AffiliateRevenue,
  IBRevenue,
  ReferralCost,
  NetPlatformRevenue,
  UserGrowth,
  ProviderGrowth,
  TraderGrowth,
  TradingVolume,
  PlatformPerformance,
  RetentionConversion,
  FinancialReports,
} from '../pages/executive';

// Support
import {
  HelpCenter,
  SupportDashboard,
  Tickets,
  CreateTicket,
  TicketDetails,
  KnowledgeBase,
  TradingFAQ,
  KYCFAQ,
  BillingFAQ,
  TechnicalSupport,
} from '../pages/support';

// Replay
import {
  ReplayCenter,
  TradeReplay as ReplayTradeReplay,
  SignalReplay as ReplaySignalReplay,
  AIProcessingReplay,
  RiskDecisionReplay,
  ExecutionReplay,
  ProviderMessageReplay,
  SystemEventTimeline,
} from '../pages/replay';

// ============================================
// ROUTE GUARDS
// ============================================

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.roles?.includes('ADMIN') && !user?.roles?.includes('SUPER_ADMIN')) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}

function RequireCompliance({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  const allowed = ['COMPLIANCE_OFFICER', 'ADMIN', 'SUPER_ADMIN'];
  if (!user?.roles?.some((r) => allowed.includes(r))) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}

function RequireExecutive({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.roles?.includes('ADMIN') && !user?.roles?.includes('SUPER_ADMIN')) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}

function RequireProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.roles?.includes('PROVIDER') && !user?.roles?.includes('ADMIN') && !user?.roles?.includes('SUPER_ADMIN')) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}

// ============================================
// ROUTES
// ============================================

export default function AppRoutes() {
  return (
    <Routes>
      {/* ============ PUBLIC ============ */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowSignalForgeWorks />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/enterprise" element={<Enterprise />} />
        <Route path="/white-label" element={<WhiteLabel />} />
        <Route path="/api-platform" element={<APIPlatform />} />
        <Route path="/security" element={<Security />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
      </Route>

      {/* ============ AUTH ============ */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/phone-verification" element={<PhoneVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/2fa" element={<TwoFactorAuthentication />} />
        <Route path="/2fa-verify" element={<TwoFactorVerification />} />
        <Route path="/account-recovery" element={<AccountRecovery />} />
        <Route path="/device-verification" element={<DeviceVerification />} />
      </Route>

      {/* ============ USER APP ============ */}
      <Route
        element={
          <RequireAuth>
            <UserLayout />
          </RequireAuth>
        }
      >
        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardOverview />} />

        {/* KYC */}
        <Route path="/kyc" element={<KYCStatusDashboard />} />
        <Route path="/kyc/introduction" element={<KYCIntroduction />} />
        <Route path="/kyc/personal-info" element={<PersonalInformation />} />
        <Route path="/kyc/identity-document" element={<IdentityDocument />} />
        <Route path="/kyc/document-verification" element={<DocumentVerification />} />
        <Route path="/kyc/selfie" element={<SelfieVerification />} />
        <Route path="/kyc/review" element={<KYCReviewStatus />} />
        <Route path="/kyc/result" element={<VerificationResult />} />
        <Route path="/kyc/resubmit" element={<KYCResubmission />} />
        <Route path="/kyc/reverify" element={<KYCReverification />} />
        <Route path="/kyc/help" element={<KYCHelp />} />

        {/* Signals */}
        <Route path="/signals" element={<LiveSignals />} />
        <Route path="/signals/history" element={<SignalHistory />} />
        <Route path="/signals/:id" element={<SignalDetails />} />
        <Route path="/signals/:id/timeline" element={<ProcessingTimeline />} />
        <Route path="/signals/:id/confidence" element={<SignalConfidence />} />
        <Route path="/signals/:id/risk" element={<SignalRiskAnalysis />} />
        <Route path="/signals/providers" element={<ProviderSignals />} />
        <Route path="/signals/duplicates" element={<DuplicateSignals />} />
        <Route path="/signals/consensus" element={<ConsensusSignals />} />
        <Route path="/signals/rejected" element={<RejectedSignals />} />
        <Route path="/signals/:id/replay" element={<SignalReplay />} />

        {/* Signal Sources */}
        <Route path="/signal-sources" element={<SignalSources />} />
        <Route path="/signal-sources/add" element={<AddSignalSource />} />
        <Route path="/signal-sources/telegram/connect" element={<TelegramConnection />} />
        <Route path="/signal-sources/telegram/channels" element={<TelegramChannels />} />
        <Route path="/signal-sources/discord/connect" element={<DiscordConnection />} />
        <Route path="/signal-sources/whatsapp/connect" element={<WhatsAppConnection />} />
        <Route path="/signal-sources/tradingview" element={<TradingViewWebhooks />} />
        <Route path="/signal-sources/rest-api" element={<RESTAPISources />} />
        <Route path="/signal-sources/email" element={<EmailSources />} />
        <Route path="/signal-sources/messages" element={<SourceMessageInbox />} />
        <Route path="/signal-sources/messages/:id" element={<SourceMessageDetails />} />
        <Route path="/signal-sources/logs" element={<SourceProcessingLogs />} />

        {/* Trading */}
        <Route path="/trading" element={<TradingOverview />} />
        <Route path="/trading/positions" element={<OpenPositions />} />
        <Route path="/trading/history" element={<TradeHistory />} />
        <Route path="/trading/:id" element={<TradeDetails />} />
        <Route path="/trading/pending" element={<PendingOrders />} />
        <Route path="/trading/closed" element={<ClosedTrades />} />
        <Route path="/trading/interventions" element={<ManualInterventions />} />
        <Route path="/trading/:id/events" element={<TradeEvents />} />
        <Route path="/trading/:id/timeline" element={<TradeTimeline />} />
        <Route path="/trading/:id/shadow" element={<TradeShadow />} />
        <Route path="/trading/:id/replay" element={<TradeReplay />} />
        <Route path="/trading/executions" element={<ExecutionHistory />} />

        {/* Risk & Automation */}
        <Route path="/risk" element={<RiskManagementOverview />} />
        <Route path="/risk/profile" element={<RiskProfile />} />
        <Route path="/risk/daily-loss" element={<DailyLossLimits />} />
        <Route path="/risk/drawdown" element={<DrawdownProtection />} />
        <Route path="/risk/max-trades" element={<MaxOpenTrades />} />
        <Route path="/risk/sessions" element={<TradingSessions />} />
        <Route path="/risk/trailing-stop" element={<TrailingStop />} />
        <Route path="/risk/break-even" element={<BreakEven />} />
        <Route path="/risk/profit-lock" element={<ProfitLock />} />
        <Route path="/risk/partial-close" element={<PartialClose />} />
        <Route path="/risk/correlation" element={<CorrelationProtection />} />
        <Route path="/risk/news-filter" element={<NewsFilter />} />
        <Route path="/risk/emergency-stop" element={<EmergencyStop />} />
        <Route path="/risk/automation" element={<AutomationRules />} />
        <Route path="/risk/automation/create" element={<CreateIfThenRule />} />
        <Route path="/risk/provider-rules" element={<ProviderSpecificRules />} />
        <Route path="/risk/events" element={<RiskEvents />} />

        {/* Brokers */}
        <Route path="/brokers" element={<BrokerAccounts />} />
        <Route path="/brokers/connect" element={<ConnectBroker />} />
        <Route path="/brokers/mt4" element={<MT4Connection />} />
        <Route path="/brokers/mt5" element={<MT5Connection />} />
        <Route path="/brokers/:id" element={<AccountDetails />} />
        <Route path="/brokers/:id/status" element={<ConnectionStatus />} />
        <Route path="/brokers/:id/metrics" element={<AccountMetrics />} />
        <Route path="/brokers/:id/sync" element={<AccountSync />} />
        <Route path="/brokers/:id/logs" element={<ConnectionLogs />} />
        <Route path="/brokers/:id/disconnect" element={<DisconnectBroker />} />

        {/* Analytics */}
        <Route path="/analytics" element={<AnalyticsOverview />} />
        <Route path="/analytics/performance" element={<PerformanceDashboard />} />
        <Route path="/analytics/equity-curve" element={<EquityCurve />} />
        <Route path="/analytics/profit-drawdown" element={<ProfitDrawdownAnalysis />} />
        <Route path="/analytics/win-rate" element={<WinRate />} />
        <Route path="/analytics/risk-reward" element={<RiskRewardAnalysis />} />
        <Route path="/analytics/sharpe-sortino" element={<SharpeSortino />} />
        <Route path="/analytics/symbols" element={<BestWorstSymbols />} />
        <Route path="/analytics/latency" element={<ExecutionLatency />} />
        <Route path="/analytics/risk-behavior" element={<RiskBehaviorAnalysis />} />
        <Route path="/analytics/calendar" element={<TradingCalendar />} />
        <Route path="/analytics/reports" element={<PerformanceReports />} />
        <Route path="/analytics/export" element={<ExportReports />} />

        {/* Referrals */}
        <Route path="/referrals" element={<ReferralDashboard />} />
        <Route path="/referrals/link" element={<ReferralLink />} />
        <Route path="/referrals/invite" element={<InviteFriends />} />
        <Route path="/referrals/network" element={<ReferralNetwork />} />
        <Route path="/referrals/users" element={<ReferredUsers />} />
        <Route path="/referrals/performance" element={<ReferralPerformance />} />
        <Route path="/referrals/earnings" element={<ReferralEarnings />} />
        <Route path="/referrals/pending" element={<PendingRewards />} />
        <Route path="/referrals/wallet" element={<ReferralWallet />} />
        <Route path="/referrals/history" element={<RewardHistory />} />
        <Route path="/referrals/settlement" element={<MonthlySettlement />} />
        <Route path="/referrals/leaderboard" element={<ReferralLeaderboard />} />
        <Route path="/referrals/terms" element={<ReferralTerms />} />

        {/* Subscriptions */}
        <Route path="/subscriptions/plans" element={<PricingPlans />} />
        <Route path="/subscriptions" element={<MySubscription />} />
        <Route path="/subscriptions/upgrade" element={<UpgradePlan />} />
        <Route path="/subscriptions/downgrade" element={<DowngradePlan />} />
        <Route path="/subscriptions/billing" element={<BillingHistory />} />
        <Route path="/subscriptions/invoices" element={<Invoices />} />
        <Route path="/subscriptions/payment-methods" element={<PaymentMethods />} />
        <Route path="/subscriptions/usage" element={<SubscriptionUsage />} />
        <Route path="/subscriptions/cancel" element={<CancelSubscription />} />

        {/* Wallet */}
        <Route path="/wallet" element={<WalletOverview />} />
        <Route path="/wallet/available" element={<AvailableBalance />} />
        <Route path="/wallet/pending" element={<PendingBalance />} />
        <Route path="/wallet/transactions" element={<Transactions />} />
        <Route path="/wallet/withdraw" element={<WithdrawalRequest />} />
        <Route path="/wallet/withdraw/status" element={<WithdrawalStatus />} />
        <Route path="/wallet/withdraw/history" element={<WithdrawalHistory />} />
        <Route path="/wallet/payment-accounts" element={<PaymentAccounts />} />

        {/* Notifications */}
        <Route path="/notifications" element={<NotificationCenter />} />
        <Route path="/notifications/preferences" element={<NotificationPreferences />} />

        {/* Settings */}
        <Route path="/settings" element={<ProfileSettings />} />
        <Route path="/settings/profile" element={<ProfileSettings />} />
        <Route path="/settings/account" element={<AccountSettings />} />
        <Route path="/settings/security" element={<SecuritySettings />} />
        <Route path="/settings/2fa" element={<TwoFactorSettings />} />
        <Route path="/settings/devices" element={<ConnectedDevices />} />
        <Route path="/settings/connected-accounts" element={<ConnectedAccounts />} />
        <Route path="/settings/brokers" element={<BrokerSettings />} />
        <Route path="/settings/signal-sources" element={<SignalSourceSettings />} />
        <Route path="/settings/trading" element={<TradingPreferences />} />
        <Route path="/settings/risk" element={<RiskPreferences />} />
        <Route path="/settings/notifications" element={<NotificationSettings />} />
        <Route path="/settings/privacy" element={<PrivacySettings />} />
        <Route path="/settings/api-keys" element={<APIKeys />} />
        <Route path="/settings/data-privacy" element={<DataPrivacy />} />
        <Route path="/settings/delete-account" element={<DeleteAccount />} />
      </Route>

      {/* ============ ADMIN ============ */}
      <Route
        element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }
      >
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/users/:id" element={<UserDetails />} />
        <Route path="/admin/users/:id/restrictions" element={<UserRestrictions />} />
        <Route path="/admin/kyc" element={<KYCManagement />} />
        <Route path="/admin/providers" element={<ProviderManagement />} />
        <Route path="/admin/traders" element={<TraderManagement />} />
        <Route path="/admin/signal-sources" element={<SignalSourceManagement />} />
        <Route path="/admin/brokers" element={<BrokerManagement />} />
        <Route path="/admin/live-trades" element={<LiveTradeMonitor />} />
        <Route path="/admin/live-signals" element={<LiveSignalMonitor />} />
        <Route path="/admin/ai-monitoring" element={<AIMonitoring />} />
        <Route path="/admin/provider-dna" element={<ProviderDNAMonitoring />} />
        <Route path="/admin/risk-monitoring" element={<RiskMonitoring />} />
        <Route path="/admin/referrals" element={<ReferralManagement />} />
        <Route path="/admin/subscriptions" element={<SubscriptionManagement />} />
        <Route path="/admin/payments" element={<PaymentManagement />} />
        <Route path="/admin/withdrawals" element={<WithdrawalManagement />} />
        <Route path="/admin/affiliates" element={<AffiliateManagement />} />
        <Route path="/admin/marketplace" element={<MarketplaceModeration />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/system-analytics" element={<SystemAnalytics />} />
        <Route path="/admin/audit-logs" element={<AuditLogs />} />
        <Route path="/admin/security" element={<SecurityCenter />} />
        <Route path="/admin/settings" element={<SystemSettings />} />
      </Route>

      {/* ============ COMPLIANCE ============ */}
      <Route
        element={
          <RequireCompliance>
            <ComplianceLayout />
          </RequireCompliance>
        }
      >
        <Route path="/compliance" element={<ComplianceDashboard />} />
        <Route path="/compliance/kyc-queue" element={<KYCQueue />} />
        <Route path="/compliance/pending" element={<PendingKYC />} />
        <Route path="/compliance/under-review" element={<UnderReviewKYC />} />
        <Route path="/compliance/verified" element={<VerifiedKYC />} />
        <Route path="/compliance/rejected" element={<RejectedKYC />} />
        <Route path="/compliance/suspended" element={<SuspendedKYC />} />
        <Route path="/compliance/document-types" element={<DocumentTypes />} />
        <Route path="/compliance/verification-providers" element={<VerificationProviders />} />
        <Route path="/compliance/risk-flags" element={<RiskFlags />} />
        <Route path="/compliance/reports" element={<ComplianceReports />} />
        <Route path="/compliance/kyc-audit-trail" element={<KYCAuditTrail />} />
      </Route>

      {/* ============ EXECUTIVE ============ */}
      <Route
        element={
          <RequireExecutive>
            <ExecutiveLayout />
          </RequireExecutive>
        }
      >
        <Route path="/executive" element={<ExecutiveDashboard />} />
        <Route path="/executive/subscription-revenue" element={<SubscriptionRevenue />} />
        <Route path="/executive/marketplace-revenue" element={<MarketplaceRevenue />} />
        <Route path="/executive/provider-revenue" element={<ProviderRevenue />} />
        <Route path="/executive/affiliate-revenue" element={<AffiliateRevenue />} />
        <Route path="/executive/ib-revenue" element={<IBRevenue />} />
        <Route path="/executive/referral-cost" element={<ReferralCost />} />
        <Route path="/executive/net-revenue" element={<NetPlatformRevenue />} />
        <Route path="/executive/user-growth" element={<UserGrowth />} />
        <Route path="/executive/provider-growth" element={<ProviderGrowth />} />
        <Route path="/executive/trader-growth" element={<TraderGrowth />} />
        <Route path="/executive/trading-volume" element={<TradingVolume />} />
        <Route path="/executive/platform-performance" element={<PlatformPerformance />} />
        <Route path="/executive/retention" element={<RetentionConversion />} />
        <Route path="/executive/financial-reports" element={<FinancialReports />} />
      </Route>

      {/* ============ SUPPORT ============ */}
      <Route
        element={
          <RequireAuth>
            <SupportLayout />
          </RequireAuth>
        }
      >
        <Route path="/support" element={<HelpCenter />} />
        <Route path="/support/dashboard" element={<SupportDashboard />} />
        <Route path="/support/tickets" element={<Tickets />} />
        <Route path="/support/tickets/new" element={<CreateTicket />} />
        <Route path="/support/tickets/:id" element={<TicketDetails />} />
        <Route path="/support/knowledge-base" element={<KnowledgeBase />} />
        <Route path="/support/trading-faq" element={<TradingFAQ />} />
        <Route path="/support/kyc-faq" element={<KYCFAQ />} />
        <Route path="/support/billing-faq" element={<BillingFAQ />} />
        <Route path="/support/technical" element={<TechnicalSupport />} />
      </Route>

      {/* ============ PROVIDER BUSINESS ============ */}
      <Route
        element={
          <RequireProvider>
            <ProviderLayout />
          </RequireProvider>
        }
      >
        <Route path="/provider" element={<div className="p-6">Provider Dashboard - coming soon</div>} />
      </Route>

      {/* ============ REPLAY ============ */}
      <Route
        element={
          <RequireAuth>
            <UserLayout />
          </RequireAuth>
        }
      >
        <Route path="/replay" element={<ReplayCenter />} />
        <Route path="/replay/trade/:id" element={<ReplayTradeReplay />} />
        <Route path="/replay/signal/:id" element={<ReplaySignalReplay />} />
        <Route path="/replay/ai/:messageId" element={<AIProcessingReplay />} />
        <Route path="/replay/risk/:signalId" element={<RiskDecisionReplay />} />
        <Route path="/replay/execution/:tradeId" element={<ExecutionReplay />} />
        <Route path="/replay/provider-message/:id" element={<ProviderMessageReplay />} />
        <Route path="/replay/events" element={<SystemEventTimeline />} />
      </Route>

      {/* ============ WHITE LABEL ============ */}
      <Route
        element={
          <RequireAdmin>
            <WhiteLabelLayout />
          </RequireAdmin>
        }
      >
        <Route path="/white-label-dashboard" element={<div className="p-6">White Label Dashboard</div>} />
      </Route>

      {/* ============ FALLBACK ============ */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}