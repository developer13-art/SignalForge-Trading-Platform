signalforge/
│
├── README.md
├── LICENSE
├── .gitignore
├── .env.example
├── docker-compose.yml
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.json
├── turbo.json
│
├── docs/
│   ├── architecture/
│   │   ├── system-architecture.md
│   │   ├── signal-processing.md
│   │   ├── ai-architecture.md
│   │   ├── metaapi-architecture.md
│   │   ├── telegram-architecture.md
│   │   ├── risk-engine.md
│   │   ├── referral-system.md
│   │   ├── kyc-system.md
│   │   ├── payment-system.md
│   │   └── event-driven-architecture.md
│   │
│   ├── api/
│   │   ├── authentication.md
│   │   ├── users.md
│   │   ├── kyc.md
│   │   ├── signals.md
│   │   ├── providers.md
│   │   ├── trading.md
│   │   ├── brokers.md
│   │   ├── subscriptions.md
│   │   ├── referrals.md
│   │   └── admin.md
│   │
│   └── database/
│       ├── schema.md
│       ├── relationships.md
│       └── indexes.md
│
├── apps/
│   │
│   ├── web/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts
│   │   ├── index.html
│   │   │
│   │   └── src/
│   │       ├── main.tsx
│   │       ├── App.tsx
│   │       │
│   │       ├── assets/
│   │       │   ├── images/
│   │       │   ├── icons/
│   │       │   └── logos/
│   │       │
│   │       ├── components/
│   │       │   ├── ui/
│   │       │   ├── forms/
│   │       │   ├── tables/
│   │       │   ├── charts/
│   │       │   ├── modals/
│   │       │   ├── cards/
│   │       │   ├── navigation/
│   │       │   ├── notifications/
│   │       │   └── common/
│   │       │
│   │       ├── layouts/
│   │       │   ├── PublicLayout.tsx
│   │       │   ├── AuthLayout.tsx
│   │       │   ├── UserLayout.tsx
│   │       │   ├── ProviderLayout.tsx
│   │       │   ├── AdminLayout.tsx
│   │       │   ├── ComplianceLayout.tsx
│   │       │   ├── ExecutiveLayout.tsx
│   │       │   ├── SupportLayout.tsx
│   │       │   └── WhiteLabelLayout.tsx
│   │       │
│   │       ├── routes/
│   │       │   ├── index.tsx
│   │       │   ├── public.routes.tsx
│   │       │   ├── auth.routes.tsx
│   │       │   ├── user.routes.tsx
│   │       │   ├── provider.routes.tsx
│   │       │   ├── admin.routes.tsx
│   │       │   ├── compliance.routes.tsx
│   │       │   ├── executive.routes.tsx
│   │       │   └── support.routes.tsx
│   │       │
│   │       ├── pages/
│   │       │
│   │       │   ├── public/
│   │       │   │   ├── Home.tsx
│   │       │   │   ├── HowSignalForgeWorks.tsx
│   │       │   │   ├── Features.tsx
│   │       │   │   ├── Pricing.tsx
│   │       │   │   ├── Enterprise.tsx
│   │       │   │   ├── WhiteLabel.tsx
│   │       │   │   ├── APIPlatform.tsx
│   │       │   │   ├── Security.tsx
│   │       │   │   ├── About.tsx
│   │       │   │   ├── Contact.tsx
│   │       │   │   └── FAQ.tsx
│   │       │   │
│   │       │   ├── auth/
│   │       │   │   ├── Login.tsx
│   │       │   │   ├── Register.tsx
│   │       │   │   ├── EmailVerification.tsx
│   │       │   │   ├── PhoneVerification.tsx
│   │       │   │   ├── ForgotPassword.tsx
│   │       │   │   ├── ResetPassword.tsx
│   │       │   │   ├── TwoFactorAuthentication.tsx
│   │       │   │   ├── TwoFactorVerification.tsx
│   │       │   │   ├── AccountRecovery.tsx
│   │       │   │   └── DeviceVerification.tsx
│   │       │   │
│   │       │   ├── kyc/
│   │       │   │   ├── KYCIntroduction.tsx
│   │       │   │   ├── PersonalInformation.tsx
│   │       │   │   ├── IdentityDocument.tsx
│   │       │   │   ├── DocumentVerification.tsx
│   │       │   │   ├── SelfieVerification.tsx
│   │       │   │   ├── KYCReviewStatus.tsx
│   │       │   │   ├── VerificationResult.tsx
│   │       │   │   ├── KYCResubmission.tsx
│   │       │   │   ├── KYCReverification.tsx
│   │       │   │   ├── KYCHelp.tsx
│   │       │   │   └── KYCStatusDashboard.tsx
│   │       │   │
│   │       │   ├── dashboard/
│   │       │   │   ├── DashboardOverview.tsx
│   │       │   │   ├── AccountSummary.tsx
│   │       │   │   ├── PortfolioOverview.tsx
│   │       │   │   ├── LiveTradingStatus.tsx
│   │       │   │   ├── ActiveSignals.tsx
│   │       │   │   ├── RecentTrades.tsx
│   │       │   │   ├── ProfitLoss.tsx
│   │       │   │   ├── RiskOverview.tsx
│   │       │   │   ├── AccountHealth.tsx
│   │       │   │   ├── KYCStatus.tsx
│   │       │   │   ├── SubscriptionStatus.tsx
│   │       │   │   └── ReferralSummary.tsx
│   │       │   │
│   │       │   ├── signals/
│   │       │   │   ├── LiveSignals.tsx
│   │       │   │   ├── SignalHistory.tsx
│   │       │   │   ├── SignalDetails.tsx
│   │       │   │   ├── ProcessingTimeline.tsx
│   │       │   │   ├── SignalConfidence.tsx
│   │       │   │   ├── SignalRiskAnalysis.tsx
│   │       │   │   ├── ProviderSignals.tsx
│   │       │   │   ├── DuplicateSignals.tsx
│   │       │   │   ├── ConsensusSignals.tsx
│   │       │   │   ├── RejectedSignals.tsx
│   │       │   │   └── SignalReplay.tsx
│   │       │   │
│   │       │   ├── signal-sources/
│   │       │   │   ├── SignalSources.tsx
│   │       │   │   ├── AddSignalSource.tsx
│   │       │   │   ├── TelegramConnection.tsx
│   │       │   │   ├── TelegramChannels.tsx
│   │       │   │   ├── DiscordConnection.tsx
│   │       │   │   ├── WhatsAppConnection.tsx
│   │       │   │   ├── TradingViewWebhooks.tsx
│   │       │   │   ├── RESTAPISources.tsx
│   │       │   │   ├── EmailSources.tsx
│   │       │   │   ├── SourceMessageInbox.tsx
│   │       │   │   ├── SourceMessageDetails.tsx
│   │       │   │   └── SourceProcessingLogs.tsx
│   │       │   │
│   │       │   ├── ai-intelligence/
│   │       │   │   ├── AIIntelligenceOverview.tsx
│   │       │   │   ├── AISignalParser.tsx
│   │       │   │   ├── SignalInterpretation.tsx
│   │       │   │   ├── ProviderDNA.tsx
│   │       │   │   ├── ProviderDNARules.tsx
│   │       │   │   ├── AILearningActivity.tsx
│   │       │   │   ├── ConfidenceEngine.tsx
│   │       │   │   ├── RiskIntelligence.tsx
│   │       │   │   ├── MultiLanguageProcessing.tsx
│   │       │   │   ├── ConsensusEngine.tsx
│   │       │   │   ├── DuplicateDetection.tsx
│   │       │   │   ├── AIProcessingLogs.tsx
│   │       │   │   ├── AIModelPerformance.tsx
│   │       │   │   └── LearningHistory.tsx
│   │       │   │
│   │       │   ├── provider-dna/
│   │       │   │   ├── DNAOverview.tsx
│   │       │   │   ├── ProviderLanguageProfile.tsx
│   │       │   │   ├── SymbolMapping.tsx
│   │       │   │   ├── AbbreviationMapping.tsx
│   │       │   │   ├── TradeManagementRules.tsx
│   │       │   │   ├── RiskBehavior.tsx
│   │       │   │   ├── LearnedPatterns.tsx
│   │       │   │   ├── DNAConfidence.tsx
│   │       │   │   ├── DNAVersionHistory.tsx
│   │       │   │   ├── TrainingMessages.tsx
│   │       │   │   └── ProviderDNATest.tsx
│   │       │   │
│   │       │   ├── trading/
│   │       │   │   ├── TradingOverview.tsx
│   │       │   │   ├── OpenPositions.tsx
│   │       │   │   ├── TradeHistory.tsx
│   │       │   │   ├── TradeDetails.tsx
│   │       │   │   ├── PendingOrders.tsx
│   │       │   │   ├── ClosedTrades.tsx
│   │       │   │   ├── ManualInterventions.tsx
│   │       │   │   ├── TradeEvents.tsx
│   │       │   │   ├── TradeTimeline.tsx
│   │       │   │   ├── TradeShadow.tsx
│   │       │   │   ├── TradeReplay.tsx
│   │       │   │   └── ExecutionHistory.tsx
│   │       │   │
│   │       │   ├── risk-automation/
│   │       │   │   ├── RiskManagementOverview.tsx
│   │       │   │   ├── RiskProfile.tsx
│   │       │   │   ├── DailyLossLimits.tsx
│   │       │   │   ├── DrawdownProtection.tsx
│   │       │   │   ├── MaxOpenTrades.tsx
│   │       │   │   ├── TradingSessions.tsx
│   │       │   │   ├── TrailingStop.tsx
│   │       │   │   ├── BreakEven.tsx
│   │       │   │   ├── ProfitLock.tsx
│   │       │   │   ├── PartialClose.tsx
│   │       │   │   ├── CorrelationProtection.tsx
│   │       │   │   ├── NewsFilter.tsx
│   │       │   │   ├── EmergencyStop.tsx
│   │       │   │   ├── AutomationRules.tsx
│   │       │   │   ├── CreateIfThenRule.tsx
│   │       │   │   ├── ProviderSpecificRules.tsx
│   │       │   │   └── RiskEvents.tsx
│   │       │   │
│   │       │   ├── brokers/
│   │       │   │   ├── BrokerAccounts.tsx
│   │       │   │   ├── ConnectBroker.tsx
│   │       │   │   ├── MT4Connection.tsx
│   │       │   │   ├── MT5Connection.tsx
│   │       │   │   ├── AccountDetails.tsx
│   │       │   │   ├── ConnectionStatus.tsx
│   │       │   │   ├── AccountMetrics.tsx
│   │       │   │   ├── AccountSync.tsx
│   │       │   │   ├── ConnectionLogs.tsx
│   │       │   │   └── DisconnectBroker.tsx
│   │       │   │
│   │       │   ├── analytics/
│   │       │   │   ├── AnalyticsOverview.tsx
│   │       │   │   ├── PerformanceDashboard.tsx
│   │       │   │   ├── EquityCurve.tsx
│   │       │   │   ├── ProfitDrawdownAnalysis.tsx
│   │       │   │   ├── WinRate.tsx
│   │       │   │   ├── RiskRewardAnalysis.tsx
│   │       │   │   ├── SharpeSortino.tsx
│   │       │   │   ├── BestWorstSymbols.tsx
│   │       │   │   ├── ExecutionLatency.tsx
│   │       │   │   ├── RiskBehaviorAnalysis.tsx
│   │       │   │   ├── TradingCalendar.tsx
│   │       │   │   ├── PerformanceReports.tsx
│   │       │   │   └── ExportReports.tsx
│   │       │   │
│   │       │   ├── provider-marketplace/
│   │       │   │   ├── BrowseProviders.tsx
│   │       │   │   ├── ProviderCategories.tsx
│   │       │   │   ├── ProviderProfile.tsx
│   │       │   │   ├── ProviderPerformance.tsx
│   │       │   │   ├── ProviderSignals.tsx
│   │       │   │   ├── ProviderReviews.tsx
│   │       │   │   ├── ProviderRiskAnalysis.tsx
│   │       │   │   ├── ProviderSubscribers.tsx
│   │       │   │   ├── ProviderSubscriptionPlans.tsx
│   │       │   │   ├── SubscribeToProvider.tsx
│   │       │   │   ├── MyProviders.tsx
│   │       │   │   ├── ProviderComparison.tsx
│   │       │   │   └── ProviderConsensus.tsx
│   │       │   │
│   │       │   ├── trader-marketplace/
│   │       │   │   ├── BrowseTraders.tsx
│   │       │   │   ├── TraderCategories.tsx
│   │       │   │   ├── TraderProfile.tsx
│   │       │   │   ├── TraderPerformance.tsx
│   │       │   │   ├── TraderRisk.tsx
│   │       │   │   ├── TraderBehavior.tsx
│   │       │   │   ├── TraderIntelligence.tsx
│   │       │   │   ├── TradingStyle.tsx
│   │       │   │   ├── TraderReviews.tsx
│   │       │   │   ├── FollowTrader.tsx
│   │       │   │   ├── CopyTradingSettings.tsx
│   │       │   │   └── MyFollowedTraders.tsx
│   │       │   │
│   │       │   ├── trader-intelligence/
│   │       │   │   ├── IntelligenceOverview.tsx
│   │       │   │   ├── ConsistencyAnalysis.tsx
│   │       │   │   ├── AverageRR.tsx
│   │       │   │   ├── HoldingTime.tsx
│   │       │   │   ├── RiskBehavior.tsx
│   │       │   │   ├── MartingaleGridDetection.tsx
│   │       │   │   ├── NewsExposure.tsx
│   │       │   │   ├── RecoveryTrading.tsx
│   │       │   │   ├── TradingStyleClassification.tsx
│   │       │   │   └── BehaviorTimeline.tsx
│   │       │   │
│       │       │   ├── referrals/
│   │       │   │   ├── ReferralDashboard.tsx
│   │       │   │   ├── ReferralLink.tsx
│   │       │   │   ├── InviteFriends.tsx
│   │       │   │   ├── ReferralNetwork.tsx
│   │       │   │   ├── ReferredUsers.tsx
│   │       │   │   ├── ReferralPerformance.tsx
│   │       │   │   ├── ReferralEarnings.tsx
│   │       │   │   ├── PendingRewards.tsx
│   │       │   │   ├── ReferralWallet.tsx
│   │       │   │   ├── RewardHistory.tsx
│   │       │   │   ├── MonthlySettlement.tsx
│   │       │   │   ├── ReferralLeaderboard.tsx
│   │       │   │   └── ReferralTerms.tsx
│   │       │   │
│   │       │   ├── subscriptions/
│   │       │   │   ├── PricingPlans.tsx
│   │       │   │   ├── Subscription.tsx
│   │       │   │   ├── MySubscription.tsx
│   │       │   │   ├── UpgradePlan.tsx
│   │       │   │   ├── DowngradePlan.tsx
│   │       │   │   ├── BillingHistory.tsx
│   │       │   │   ├── Invoices.tsx
│   │       │   │   ├── PaymentMethods.tsx
│   │       │   │   ├── SubscriptionUsage.tsx
│   │       │   │   └── CancelSubscription.tsx
│   │       │   │
│   │       │   ├── wallet/
│   │       │   │   ├── WalletOverview.tsx
│   │       │   │   ├── AvailableBalance.tsx
│   │       │   │   ├── PendingBalance.tsx
│   │       │   │   ├── Transactions.tsx
│   │       │   │   ├── WithdrawalRequest.tsx
│   │       │   │   ├── WithdrawalStatus.tsx
│   │       │   │   ├── WithdrawalHistory.tsx
│   │       │   │   └── PaymentAccounts.tsx
│   │       │   │
│   │       │   ├── provider-business/
│   │       │   │   ├── ProviderDashboard.tsx
│   │       │   │   ├── ProfileManagement.tsx
│   │       │   │   ├── Subscribers.tsx
│   │       │   │   ├── Revenue.tsx
│   │       │   │   ├── Analytics.tsx
│   │       │   │   ├── Signals.tsx
│   │       │   │   ├── ProviderDNA.tsx
│   │       │   │   ├── Certification.tsx
│   │       │   │   ├── SubscriptionPlans.tsx
│   │       │   │   ├── Withdrawals.tsx
│   │       │   │   ├── IBManagement.tsx
│   │       │   │   ├── AffiliateManagement.tsx
│   │       │   │   ├── MarketingTools.tsx
│   │       │   │   ├── Promotions.tsx
│   │       │   │   ├── Reviews.tsx
│   │       │   │   └── ProviderSettings.tsx
│   │       │   │
│   │       │   ├── provider-certification/
│   │       │   │   ├── CertificationDashboard.tsx
│   │       │   │   ├── ImportHistoricalMessages.tsx
│   │       │   │   ├── TrainingDataset.tsx
│   │       │   │   ├── ParsingAccuracy.tsx
│   │       │   │   ├── Backtesting.tsx
│   │       │   │   ├── ExpectedPerformance.tsx
│   │       │   │   ├── RiskAssessment.tsx
│   │       │   │   ├── ConsistencyScore.tsx
│   │       │   │   ├── QualityScore.tsx
│   │       │   │   ├── CertificationResult.tsx
│   │       │   │   └── CertificationHistory.tsx
│   │       │   │
│   │       │   ├── affiliate-ib/
│   │       │   │   ├── AffiliateDashboard.tsx
│   │       │   │   ├── AffiliateLinks.tsx
│   │       │   │   ├── AffiliateReferrals.tsx
│   │       │   │   ├── AffiliateCommissions.tsx
│   │       │   │   ├── IBDashboard.tsx
│   │       │   │   ├── BrokerReferralLinks.tsx
│   │       │   │   ├── IBReferrals.tsx
│   │       │   │   ├── IBRevenue.tsx
│   │       │   │   └── CommissionHistory.tsx
│   │       │   │
│   │       │   ├── white-label/
│   │       │   │   ├── WhiteLabelDashboard.tsx
│   │       │   │   ├── BrandConfiguration.tsx
│   │       │   │   ├── LogoBranding.tsx
│   │       │   │   ├── DomainConfiguration.tsx
│   │       │   │   ├── ThemeConfiguration.tsx
│   │       │   │   ├── CustomPricing.tsx
│   │       │   │   ├── WhiteLabelAnalytics.tsx
│   │       │   │   ├── WhiteLabelUsers.tsx
│   │       │   │   ├── WhiteLabelRevenue.tsx
│   │       │   │   └── WhiteLabelSettings.tsx
│   │       │   │
│   │       │   ├── notifications/
│   │       │   │   ├── NotificationCenter.tsx
│   │       │   │   ├── TradeNotifications.tsx
│   │       │   │   ├── SignalNotifications.tsx
│   │       │   │   ├── KYCNotifications.tsx
│   │       │   │   ├── ReferralNotifications.tsx
│   │       │   │   ├── PaymentNotifications.tsx
│   │       │   │   ├── SecurityNotifications.tsx
│   │       │   │   ├── SystemNotifications.tsx
│   │       │   │   └── NotificationPreferences.tsx
│   │       │   │
│   │       │   ├── settings/
│   │       │   │   ├── ProfileSettings.tsx
│   │       │   │   ├── AccountSettings.tsx
│   │       │   │   ├── SecuritySettings.tsx
│   │       │   │   ├── TwoFactorSettings.tsx
│   │       │   │   ├── ConnectedDevices.tsx
│   │       │   │   ├── ConnectedAccounts.tsx
│   │       │   │   ├── BrokerSettings.tsx
│   │       │   │   ├── SignalSourceSettings.tsx
│   │       │   │   ├── TradingPreferences.tsx
│   │       │   │   ├── RiskPreferences.tsx
│   │       │   │   ├── NotificationSettings.tsx
│   │       │   │   ├── PrivacySettings.tsx
│   │       │   │   ├── APIKeys.tsx
│   │       │   │   ├── DataPrivacy.tsx
│   │       │   │   └── DeleteAccount.tsx
│   │       │   │
│   │       │   ├── admin/
│   │       │   │   ├── AdminDashboard.tsx
│   │       │   │   ├── Users.tsx
│   │       │   │   ├── UserDetails.tsx
│   │       │   │   ├── UserRestrictions.tsx
│   │       │   │   ├── KYCManagement.tsx
│   │       │   │   ├── ProviderManagement.tsx
│   │       │   │   ├── TraderManagement.tsx
│   │       │   │   ├── SignalSourceManagement.tsx
│   │       │   │   ├── BrokerManagement.tsx
│   │       │   │   ├── LiveTradeMonitor.tsx
│   │       │   │   ├── LiveSignalMonitor.tsx
│   │       │   │   ├── AIMonitoring.tsx
│   │       │   │   ├── ProviderDNAMonitoring.tsx
│   │       │   │   ├── RiskMonitoring.tsx
│   │       │   │   ├── ReferralManagement.tsx
│   │       │   │   ├── SubscriptionManagement.tsx
│   │       │   │   ├── PaymentManagement.tsx
│   │       │   │   ├── WithdrawalManagement.tsx
│   │       │   │   ├── AffiliateManagement.tsx
│   │       │   │   ├── MarketplaceModeration.tsx
│   │       │   │   ├── Reports.tsx
│   │       │   │   ├── SystemAnalytics.tsx
│   │       │   │   ├── AuditLogs.tsx
│   │       │   │   ├── SecurityCenter.tsx
│   │       │   │   └── SystemSettings.tsx
│   │       │   │
│   │       │   ├── compliance/
│   │       │   │   ├── ComplianceDashboard.tsx
│   │       │   │   ├── KYCQueue.tsx
│   │       │   │   ├── PendingKYC.tsx
│   │       │   │   ├── UnderReviewKYC.tsx
│   │       │   │   ├── VerifiedKYC.tsx
│   │       │   │   ├── RejectedKYC.tsx
│   │       │   │   ├── SuspendedKYC.tsx
│   │       │   │   ├── DocumentTypes.tsx
│   │       │   │   ├── VerificationProviders.tsx
│   │       │   │   ├── RiskFlags.tsx
│   │       │   │   ├── ComplianceReports.tsx
│   │       │   │   └── KYCAuditTrail.tsx
│   │       │   │
│   │       │   ├── executive/
│   │       │   │   ├── ExecutiveDashboard.tsx
│   │       │   │   ├── SubscriptionRevenue.tsx
│   │       │   │   ├── MarketplaceRevenue.tsx
│   │       │   │   ├── ProviderRevenue.tsx
│   │       │   │   ├── AffiliateRevenue.tsx
│   │       │   │   ├── IBRevenue.tsx
│   │       │   │   ├── ReferralCost.tsx
│   │       │   │   ├── NetPlatformRevenue.tsx
│   │       │   │   ├── UserGrowth.tsx
│   │       │   │   ├── ProviderGrowth.tsx
│   │       │   │   ├── TraderGrowth.tsx
│   │       │   │   ├── TradingVolume.tsx
│   │       │   │   ├── PlatformPerformance.tsx
│   │       │   │   ├── RetentionConversion.tsx
│   │       │   │   └── FinancialReports.tsx
│   │       │   │
│   │       │   ├── support/
│   │       │   │   ├── HelpCenter.tsx
│   │       │   │   ├── SupportDashboard.tsx
│   │       │   │   ├── Tickets.tsx
│   │       │   │   ├── CreateTicket.tsx
│   │       │   │   ├── TicketDetails.tsx
│   │       │   │   ├── KnowledgeBase.tsx
│   │       │   │   ├── TradingFAQ.tsx
│   │       │   │   ├── KYCFAQ.tsx
│   │       │   │   ├── BillingFAQ.tsx
│   │       │   │   └── TechnicalSupport.tsx
│   │       │   │
│   │       │   └── replay/
│   │       │       ├── ReplayCenter.tsx
│   │       │       ├── TradeReplay.tsx
│   │       │       ├── SignalReplay.tsx
│   │       │       ├── AIProcessingReplay.tsx
│   │       │       ├── RiskDecisionReplay.tsx
│   │       │       ├── ExecutionReplay.tsx
│   │       │       ├── ProviderMessageReplay.tsx
│   │       │       └── SystemEventTimeline.tsx
│   │       │
│   │       ├── hooks/
│   │       ├── stores/
│   │       ├── services/
│   │       ├── api/
│   │       ├── types/
│   │       ├── utils/
│   │       ├── constants/
│   │       ├── config/
│   │       └── styles/
│   │
│   │
│   └── api/
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
│           │
│           ├── server.ts
│           ├── app.ts
│           │
│           ├── config/
│           │   ├── env.ts
│           │   ├── database.ts
│           │   ├── redis.ts
│           │   ├── metaapi.ts
│           │   ├── telegram.ts
│           │   ├── ai.ts
│           │   ├── payment.ts
│           │   └── storage.ts
│           │
│           ├── middleware/
│           │   ├── auth.middleware.ts
│           │   ├── role.middleware.ts
│           │   ├── permission.middleware.ts
│           │   ├── kyc.middleware.ts
│           │   ├── subscription.middleware.ts
│           │   ├── validation.middleware.ts
│           │   ├── rateLimit.middleware.ts
│           │   ├── error.middleware.ts
│           │   ├── upload.middleware.ts
│           │   └── security.middleware.ts
│           │
│           ├── routes/
│           │   ├── auth.routes.ts
│           │   ├── users.routes.ts
│           │   ├── kyc.routes.ts
│           │   ├── dashboard.routes.ts
│           │   ├── signals.routes.ts
│           │   ├── signal-sources.routes.ts
│           │   ├── ai.routes.ts
│           │   ├── provider-dna.routes.ts
│           │   ├── trading.routes.ts
│           │   ├── risk.routes.ts
│           │   ├── brokers.routes.ts
│           │   ├── analytics.routes.ts
│           │   ├── provider-marketplace.routes.ts
│           │   ├── trader-marketplace.routes.ts
│           │   ├── trader-intelligence.routes.ts
│           │   ├── referrals.routes.ts
│           │   ├── subscriptions.routes.ts
│           │   ├── wallet.routes.ts
│           │   ├── provider-business.routes.ts
│           │   ├── certification.routes.ts
│           │   ├── affiliate.routes.ts
│           │   ├── white-label.routes.ts
│           │   ├── notifications.routes.ts
│           │   ├── settings.routes.ts
│           │   ├── admin.routes.ts
│           │   ├── compliance.routes.ts
│           │   ├── executive.routes.ts
│           │   ├── support.routes.ts
│           │   ├── replay.routes.ts
│           │   └── webhooks.routes.ts
│           │
│           ├── controllers/
│           │   ├── auth.controller.ts
│           │   ├── users.controller.ts
│           │   ├── kyc.controller.ts
│           │   ├── dashboard.controller.ts
│           │   ├── signals.controller.ts
│           │   ├── sources.controller.ts
│           │   ├── ai.controller.ts
│           │   ├── provider-dna.controller.ts
│           │   ├── trading.controller.ts
│           │   ├── risk.controller.ts
│           │   ├── brokers.controller.ts
│           │   ├── analytics.controller.ts
│           │   ├── marketplace.controller.ts
│           │   ├── referrals.controller.ts
│           │   ├── subscriptions.controller.ts
│           │   ├── wallet.controller.ts
│           │   ├── provider.controller.ts
│           │   ├── certification.controller.ts
│           │   ├── affiliate.controller.ts
│           │   ├── white-label.controller.ts
│           │   ├── notifications.controller.ts
│           │   ├── admin.controller.ts
│           │   ├── compliance.controller.ts
│           │   ├── executive.controller.ts
│           │   ├── support.controller.ts
│           │   └── replay.controller.ts
│           │
│           ├── services/
│           │   │
│           │   ├── auth/
│           │   │   ├── auth.service.ts
│           │   │   ├── token.service.ts
│           │   │   ├── password.service.ts
│           │   │   ├── verification.service.ts
│           │   │   ├── two-factor.service.ts
│           │   │   ├── recovery.service.ts
│           │   │   └── device.service.ts
│           │   │
│           │   ├── kyc/
│           │   │   ├── kyc.service.ts
│           │   │   ├── document.service.ts
│           │   │   ├── verification.service.ts
│           │   │   ├── liveness.service.ts
│           │   │   ├── risk.service.ts
│           │   │   └── review.service.ts
│           │   │
│           │   ├── signals/
│           │   │   ├── signal.service.ts
│           │   │   ├── detection.service.ts
│           │   │   ├── normalization.service.ts
│           │   │   ├── validation.service.ts
│           │   │   ├── duplicate.service.ts
│           │   │   ├── consensus.service.ts
│           │   │   ├── confidence.service.ts
│           │   │   └── fanout.service.ts
│           │   │
│           │   ├── sources/
│           │   │   ├── source.service.ts
│           │   │   ├── telegram.service.ts
│           │   │   ├── discord.service.ts
│           │   │   ├── whatsapp.service.ts
│           │   │   ├── tradingview.service.ts
│           │   │   ├── rest-api.service.ts
│           │   │   └── email.service.ts
│           │   │
│           │   ├── telegram/
│           │   │   ├── session.service.ts
│           │   │   ├── authentication.service.ts
│           │   │   ├── channel.service.ts
│           │   │   ├── message.service.ts
│           │   │   ├── listener.service.ts
│           │   │   └── parser.service.ts
│           │   │
│           │   ├── ai/
│           │   │   ├── ai.service.ts
│           │   │   ├── parser.service.ts
│           │   │   ├── interpretation.service.ts
│           │   │   ├── confidence.service.ts
│           │   │   ├── risk-intelligence.service.ts
│           │   │   ├── multilingual.service.ts
│           │   │   ├── learning.service.ts
│           │   │   └── model-performance.service.ts
│           │   │
│           │   ├── provider-dna/
│           │   │   ├── dna.service.ts
│           │   │   ├── language.service.ts
│           │   │   ├── symbol-mapping.service.ts
│           │   │   ├── abbreviation.service.ts
│           │   │   ├── pattern.service.ts
│           │   │   ├── risk-behavior.service.ts
│           │   │   ├── version.service.ts
│           │   │   └── training.service.ts
│           │   │
│           │   ├── trading/
│           │   │   ├── trading.service.ts
│           │   │   ├── order.service.ts
│           │   │   ├── position.service.ts
│           │   │   ├── trade.service.ts
│           │   │   ├── execution.service.ts
│           │   │   ├── intervention.service.ts
│           │   │   ├── event.service.ts
│           │   │   └── replay.service.ts
│           │   │
│           │   ├── risk/
│           │   │   ├── risk.service.ts
│           │   │   ├── profile.service.ts
│           │   │   ├── daily-loss.service.ts
│           │   │   ├── drawdown.service.ts
│           │   │   ├── exposure.service.ts
│           │   │   ├── correlation.service.ts
│           │   │   ├── session.service.ts
│           │   │   ├── news-filter.service.ts
│           │   │   ├── emergency-stop.service.ts
│           │   │   ├── automation.service.ts
│           │   │   └── rules-engine.service.ts
│           │   │
│           │   ├── metaapi/
│           │   │   ├── metaapi.service.ts
│           │   │   ├── account.service.ts
│           │   │   ├── deployment.service.ts
│           │   │   ├── synchronization.service.ts
│           │   │   ├── trading.service.ts
│           │   │   ├── positions.service.ts
│           │   │   ├── orders.service.ts
│           │   │   ├── streaming.service.ts
│           │   │   └── connection.service.ts
│           │   │
│           │   ├── brokers/
│           │   │   ├── broker.service.ts
│           │   │   ├── account.service.ts
│           │   │   ├── connection.service.ts
│           │   │   └── sync.service.ts
│           │   │
│           │   ├── analytics/
│           │   │   ├── analytics.service.ts
│           │   │   ├── performance.service.ts
│           │   │   ├── pnl.service.ts
│           │   │   ├── drawdown.service.ts
│           │   │   ├── ratios.service.ts
│           │   │   ├── symbol.service.ts
│           │   │   ├── latency.service.ts
│           │   │   └── reports.service.ts
│           │   │
│           │   ├── marketplace/
│           │   │   ├── provider.service.ts
│           │   │   ├── trader.service.ts
│           │   │   ├── subscription.service.ts
│           │   │   ├── review.service.ts
│           │   │   ├── ranking.service.ts
│           │   │   └── comparison.service.ts
│           │   │
│           │   ├── trader-intelligence/
│           │   │   ├── intelligence.service.ts
│           │   │   ├── consistency.service.ts
│           │   │   ├── discipline.service.ts
│           │   │   ├── behavior.service.ts
│           │   │   ├── style.service.ts
│           │   │   ├── martingale.service.ts
│           │   │   ├── grid.service.ts
│           │   │   ├── recovery.service.ts
│           │   │   └── news-exposure.service.ts
│           │   │
│           │   ├── referrals/
│           │   │   ├── referral.service.ts
│           │   │   ├── code.service.ts
│           │   │   ├── tracking.service.ts
│           │   │   ├── reward.service.ts
│           │   │   ├── calculation.service.ts
│           │   │   ├── settlement.service.ts
│           │   │   └── leaderboard.service.ts
│           │   │
│           │   ├── subscriptions/
│           │   │   ├── subscription.service.ts
│           │   │   ├── plan.service.ts
│           │   │   ├── billing.service.ts
│           │   │   ├── invoice.service.ts
│           │   │   └── usage.service.ts
│           │   │
│           │   ├── payments/
│           │   │   ├── payment.service.ts
│           │   │   ├── paystack.service.ts
│           │   │   ├── webhook.service.ts
│           │   │   └── verification.service.ts
│           │   │
│           │   ├── wallet/
│           │   │   ├── wallet.service.ts
│           │   │   ├── transaction.service.ts
│           │   │   ├── withdrawal.service.ts
│           │   │   └── payment-account.service.ts
│           │   │
│           │   ├── certification/
│           │   │   ├── certification.service.ts
│           │   │   ├── dataset.service.ts
│           │   │   ├── backtesting.service.ts
│           │   │   ├── accuracy.service.ts
│           │   │   ├── quality.service.ts
│           │   │   └── scoring.service.ts
│           │   │
│           │   ├── affiliate/
│           │   │   ├── affiliate.service.ts
│           │   │   ├── commission.service.ts
│           │   │   ├── ib.service.ts
│           │   │   └── tracking.service.ts
│           │   │
│           │   ├── white-label/
│           │   │   ├── white-label.service.ts
│           │   │   ├── branding.service.ts
│           │   │   ├── domain.service.ts
│           │   │   ├── theme.service.ts
│           │   │   └── pricing.service.ts
│           │   │
│           │   ├── notifications/
│           │   │   ├── notification.service.ts
│           │   │   ├── email.service.ts
│           │   │   ├── push.service.ts
│           │   │   └── preference.service.ts
│           │   │
│           │   ├── admin/
│           │   │   ├── admin.service.ts
│           │   │   ├── user-management.service.ts
│           │   │   ├── moderation.service.ts
│           │   │   ├── system.service.ts
│           │   │   └── security.service.ts
│           │   │
│           │   ├── compliance/
│           │   │   ├── compliance.service.ts
│           │   │   ├── queue.service.ts
│           │   │   ├── risk-flags.service.ts
│           │   │   └── reports.service.ts
│           │   │
│           │   ├── executive/
│           │   │   ├── executive.service.ts
│           │   │   ├── revenue.service.ts
│           │   │   ├── growth.service.ts
│           │   │   ├── retention.service.ts
│           │   │   └── financial.service.ts
│           │   │
│           │   ├── support/
│           │   │   ├── support.service.ts
│           │   │   ├── ticket.service.ts
│           │   │   ├── knowledge-base.service.ts
│           │   │   └── faq.service.ts
│           │   │
│           │   └── replay/
│           │       ├── replay.service.ts
│           │       ├── signal-replay.service.ts
│           │       ├── trade-replay.service.ts
│           │       ├── ai-replay.service.ts
│           │       ├── risk-replay.service.ts
│           │       ├── execution-replay.service.ts
│           │       └── event-timeline.service.ts
│           │
│           ├── integrations/
│           │   ├── metaapi/
│           │   │   ├── client.ts
│           │   │   ├── account.ts
│           │   │   ├── trading.ts
│           │   │   └── streaming.ts
│           │   │
│           │   ├── telegram/
│           │   │   ├── client.ts
│           │   │   ├── session.ts
│           │   │   └── events.ts
│           │   │
│           │   ├── paystack/
│           │   │   ├── client.ts
│           │   │   ├── payments.ts
│           │   │   └── webhooks.ts
│           │   │
│           │   └── ai/
│           │       ├── client.ts
│           │       └── models.ts
│           │
│           ├── queues/
│           │   ├── signal.queue.ts
│           │   ├── ai.queue.ts
│           │   ├── execution.queue.ts
│           │   ├── notification.queue.ts
│           │   ├── analytics.queue.ts
│           │   ├── referral.queue.ts
│           │   └── kyc.queue.ts
│           │
│           ├── workers/
│           │   ├── signal.worker.ts
│           │   ├── ai.worker.ts
│           │   ├── execution.worker.ts
│           │   ├── notification.worker.ts
│           │   ├── analytics.worker.ts
│           │   ├── referral.worker.ts
│           │   └── kyc.worker.ts
│           │
│           ├── events/
│           │   ├── event-bus.ts
│           │   ├── signal.events.ts
│           │   ├── trade.events.ts
│           │   ├── account.events.ts
│           │   ├── kyc.events.ts
│           │   ├── payment.events.ts
│           │   └── referral.events.ts
│           │
│           ├── websocket/
│           │   ├── websocket.server.ts
│           │   ├── signal.socket.ts
│           │   ├── trade.socket.ts
│           │   ├── account.socket.ts
│           │   ├── notification.socket.ts
│           │   └── admin.socket.ts
│           │
│           ├── validators/
│           │   ├── auth.validator.ts
│           │   ├── user.validator.ts
│           │   ├── kyc.validator.ts
│           │   ├── signal.validator.ts
│           │   ├── trading.validator.ts
│           │   ├── risk.validator.ts
│           │   ├── broker.validator.ts
│           │   ├── payment.validator.ts
│           │   └── referral.validator.ts
│           │
│           ├── types/
│           │   ├── auth.types.ts
│           │   ├── user.types.ts
│           │   ├── kyc.types.ts
│           │   ├── signal.types.ts
│           │   ├── provider.types.ts
│           │   ├── trading.types.ts
│           │   ├── risk.types.ts
│           │   ├── broker.types.ts
│           │   ├── payment.types.ts
│           │   ├── referral.types.ts
│           │   └── common.types.ts
│           │
│           ├── utils/
│           │   ├── logger.ts
│           │   ├── encryption.ts
│           │   ├── hashing.ts
│           │   ├── idempotency.ts
│           │   ├── pagination.ts
│           │   ├── date.ts
│           │   └── errors.ts
│           │
│           └── jobs/
│               ├── monthly-referral-settlement.job.ts
│               ├── subscription-renewal.job.ts
│               ├── account-sync.job.ts
│               ├── provider-dna-learning.job.ts
│               ├── analytics.job.ts
│               └── cleanup.job.ts
│
├── packages/
│   │
│   ├── database/
│   │   ├── package.json
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   ├── migrations/
│   │   │   └── seed.ts
│   │   └── src/
│   │       ├── client.ts
│   │       ├── models.ts
│   │       └── index.ts
│   │
│   ├── shared/
│   │   ├── package.json
│   │   └── src/
│   │       ├── types/
│   │       ├── enums/
│   │       ├── constants/
│   │       ├── schemas/
│   │       └── index.ts
│   │
│   ├── ui/
│   │   ├── package.json
│   │   └── src/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Modal.tsx
│   │       ├── Table.tsx
│   │       ├── Card.tsx
│   │       ├── Badge.tsx
│   │       ├── Dropdown.tsx
│   │       ├── Tabs.tsx
│   │       ├── Chart.tsx
│   │       └── index.ts
│   │
│   ├── config/
│   │   ├── package.json
│   │   └── src/
│   │       ├── permissions.ts
│   │       ├── roles.ts
│   │       ├── features.ts
│   │       └── index.ts
│   │
│   └── logger/
│       ├── package.json
│       └── src/
│           ├── logger.ts
│           └── index.ts
│
├── infrastructure/
│   ├── docker/
│   │   ├── Dockerfile.web
│   │   ├── Dockerfile.api
│   │   └── Dockerfile.worker
│   │
│   ├── nginx/
│   │   └── nginx.conf
│   │
│   └── monitoring/
│       ├── prometheus.yml
│       └── grafana/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   ├── security/
│   ├── signal-processing/
│   ├── metaapi/
│   ├── telegram/
│   ├── payments/
│   ├── kyc/
│   └── referrals/
│
└── scripts/
    ├── seed.ts
    ├── migrate.ts
    ├── cleanup.ts
    └── health-check.ts