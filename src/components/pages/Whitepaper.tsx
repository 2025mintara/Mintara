import { Card } from '../ui/card';
import { 
  Sparkles, 
  Shield, 
  Zap, 
  Bot, 
  Coins, 
  Award,
  Users,
  CheckCircle2,
  Network,
  Rocket,
  TrendingUp,
  Vote,
  Server,
  Twitter,
  Send,
  Github
} from 'lucide-react';
import { Logo } from '../Logo';
import { Badge } from '../ui/badge';
import { motion } from 'framer-motion';

const SectionDivider = () => (
  <div className="h-px bg-mintara-border opacity-40"></div>
);

const FadeInSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

export function Whitepaper() {
  const tokenInfo = [
    { param: 'Name', value: 'Mintara Token' },
    { param: 'Symbol', value: 'MINTA' },
    { param: 'Network', value: 'Base' },
    { param: 'Standard', value: 'ERC-20' },
    { param: 'Total Supply', value: '100,000,000 MINTA' },
    { param: 'Decimals', value: '18' },
    { param: 'Presale Date', value: 'December 2025' },
    { param: 'Airdrop Date', value: 'Q2 2026' },
    { param: 'Contract Address', value: 'TBA (post-audit)' },
  ];

  const tokenomics = [
    { allocation: 'Airdrop', percent: 15, description: 'Community & Base user rewards' },
    { allocation: 'Presale', percent: 15, description: 'Initial liquidity & marketing' },
    { allocation: 'Dev & Infrastructure', percent: 25, description: 'AI modules, audits, backend' },
    { allocation: 'Ecosystem & Partnerships', percent: 20, description: 'Integrations & user incentives' },
    { allocation: 'Team', percent: 15, description: '24-month linear vesting' },
    { allocation: 'Liquidity', percent: 7, description: 'BaseDEX & CEX pools' },
    { allocation: 'Treasury', percent: 3, description: 'Strategic reserves' },
  ];

  const utilities = [
    { icon: Sparkles, label: 'AI Credits' },
    { icon: Coins, label: 'Transaction Fees' },
    { icon: Award, label: 'Staking Rewards' },
    { icon: Zap, label: 'Premium Access' },
    { icon: Vote, label: 'Governance' },
    { icon: Server, label: 'Node Rewards' },
  ];

  const roadmap = [
    { quarter: 'Q4 2025', title: 'Beta Launch on Base Testnet', icon: CheckCircle2, status: 'completed' },
    { quarter: 'Dec 2025', title: 'Presale (IVO) + Final Audit', icon: TrendingUp, status: 'upcoming' },
    { quarter: 'Q2 2026', title: 'Airdrop + Full AI NFT Builder', icon: Rocket, status: 'upcoming' },
    { quarter: 'Q3 2026', title: 'IVO Launchpad Public Release', icon: Bot, status: 'upcoming' },
    { quarter: 'Q4 2026', title: 'Staking & Validator Rewards', icon: Coins, status: 'upcoming' },
    { quarter: '2027', title: 'Governance + Cross-Chain Expansion', icon: Network, status: 'future' },
  ];

  const innovations = [
    {
      icon: Bot,
      title: 'Mintara AI Engine',
      description: 'Scans bytecode, optimizes gas, learns from Base data.',
    },
    {
      icon: Network,
      title: 'DePIN Verification Layer',
      description: 'Distributed nodes perform AI micro-audits, rewarded in MINTA.',
    },
    {
      icon: TrendingUp,
      title: 'IVO Launchpad',
      description: 'Verified fundraising via escrow smart contracts.',
    },
  ];

  const security = [
    'Pre-audited ERC-20 templates',
    'AI risk analysis database',
    'External audits before CEX',
    'Proof-of-Deploy registry',
    'BaseScan verification',
  ];

  const coreValues = [
    { icon: Users, title: 'Accessibility', desc: 'Token and NFT creation available to everyone' },
    { icon: Shield, title: 'Security', desc: 'Complete AI audit prior to deployment' },
    { icon: CheckCircle2, title: 'Transparency', desc: 'All processes verifiable on-chain' },
    { icon: Coins, title: 'Sustainability', desc: '35% revenue allocated to buyback & burn' },
    { icon: Network, title: 'Autonomy', desc: 'Fully decentralized deployments on Base' },
  ];

  const platformModules = [
    { 
      number: '1', 
      icon: Coins, 
      title: 'No-Code Token Builder', 
      desc: "Create custom ERC-20 tokens on Base instantly. Mintara's AI automatically audits smart contracts, detects vulnerabilities, and optimizes gas efficiency prior to deployment." 
    },
    { 
      number: '2', 
      icon: Shield, 
      title: 'AI Audit & Optimization', 
      desc: 'The AI Audit Engine performs real-time code analysis, identifies security risks, and assigns a Smart Score before launch — ensuring maximum trust and compliance.' 
    },
    { 
      number: '3', 
      icon: Sparkles, 
      title: 'AI NFT Builder', 
      desc: 'An integrated system enabling users to generate and mint AI-created NFTs, including AI-generated artwork, automatic metadata generation, on-chain minting with BaseScan verification, and batch minting with rarity configuration.' 
    },
    { 
      number: '4', 
      icon: TrendingUp, 
      title: 'IVO Launchpad', 
      desc: 'The Intelligent Verified Offering (IVO) module provides a secure, AI-verified presale system with escrow protection. Investor funds remain locked until predefined audit conditions are met.' 
    },
    { 
      number: '5', 
      icon: Network, 
      title: 'Distributed AI Verification', 
      desc: 'A network of distributed AI validators independently verifies contract safety and performance — ensuring a trustless and decentralized validation process.' 
    },
  ];

  return (
    <div className="min-h-screen pt-32 px-6 py-16">
      <div className="max-w-[1000px] mx-auto space-y-20">
        
        {/* Executive Summary */}
        <FadeInSection>
          <section id="executive-summary" className="relative">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-semibold text-mintara-text-primary mb-6">
                Mintara Whitepaper
              </h1>
              <p className="text-xl text-mintara-accent mb-8">
                Executive Summary
              </p>
            </div>

            <Card className="relative p-12 bg-mintara-surface/50 border-mintara-border backdrop-blur-sm overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
                <div className="w-full h-full rounded-full border-4 border-mintara-accent animate-pulse"></div>
              </div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-semibold text-mintara-text-primary mb-6 text-center">
                  Executive Summary
                </h2>
                <div className="space-y-4 text-mintara-text-secondary leading-relaxed">
                  <p>
                    <strong className="text-mintara-text-primary">Mintara</strong> is an AI-powered, no-code token and NFT creation platform built exclusively on the <strong className="text-mintara-accent">Base Network</strong>.
                  </p>
                  <p>
                    The platform empowers users to create and deploy fully secure ERC-20 tokens and AI-generated NFTs within minutes — without requiring any coding skills.
                  </p>
                  <p>
                    <strong className="text-mintara-text-primary">$MINTA</strong> is the native utility token that fuels all ecosystem operations, including AI audits, deployment fees, staking, governance, and premium access.
                  </p>
                  <div className="pt-4 space-y-2">
                    <p className="text-mintara-accent font-semibold text-center">
                      Mission: To simplify tokenization and NFT creation on Base — making it secure, accessible, and intelligent.
                    </p>
                    <p className="text-mintara-text-primary text-center">
                      Vision: To build the foundation for AI-driven decentralized creation and automation across the Web3 ecosystem.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        </FadeInSection>

        <SectionDivider />

        {/* Core Values */}
        <FadeInSection delay={0.1}>
          <section id="core-values">
            <h2 className="text-4xl font-semibold text-mintara-text-primary mb-12 text-center">
              Core Values
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreValues.map((value, index) => (
                <Card key={index} className="p-6 bg-mintara-surface/30 border-mintara-border hover:border-mintara-accent/50 transition-all duration-300 hover:scale-105 group">
                  <div className="w-14 h-14 rounded-xl bg-mintara-primary/20 flex items-center justify-center mb-4 group-hover:bg-mintara-primary/30 transition-colors">
                    <value.icon className="w-7 h-7 text-mintara-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-mintara-text-primary mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-mintara-text-secondary">
                    {value.desc}
                  </p>
                </Card>
              ))}
            </div>
          </section>
        </FadeInSection>

        <SectionDivider />

        {/* Platform Overview */}
        <FadeInSection delay={0.1}>
          <section id="platform-overview">
            <h2 className="text-4xl font-semibold text-mintara-text-primary mb-12 text-center">
              Platform Overview
            </h2>

            <div className="space-y-6">
              {platformModules.map((module, index) => (
                <Card key={index} className="relative p-6 bg-mintara-surface/40 border-2 border-mintara-border hover:border-mintara-accent/70 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,224,198,0.2)] group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-mintara-accent/20 flex items-center justify-center group-hover:bg-mintara-accent/30 transition-colors">
                      <module.icon className="w-7 h-7 text-mintara-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-mintara-text-primary mb-2">
                        {module.number}. {module.title}
                      </h3>
                      <p className="text-sm text-mintara-text-secondary leading-relaxed">
                        {module.desc}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-mintara-accent italic">
                <span className="font-medium">Ecosystem Flow:</span> → Token/NFT Creation → AI Audit → IVO Presale → Airdrop → Verification → Launch
              </p>
            </div>
          </section>
        </FadeInSection>

        <SectionDivider />

        {/* Token Information */}
        <FadeInSection delay={0.1}>
          <section id="token-information">
            <h2 className="text-4xl font-semibold text-mintara-text-primary mb-12 text-center">
              Token Information
            </h2>

            <Card className="p-8 bg-mintara-surface/50 border-mintara-border backdrop-blur-sm overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-mintara-border">
                    <th className="text-left py-4 px-4 text-mintara-text-primary font-semibold">
                      Parameter
                    </th>
                    <th className="text-left py-4 px-4 text-mintara-text-primary font-semibold">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tokenInfo.map((row, index) => (
                    <tr key={index} className="border-b border-mintara-border/50 hover:bg-mintara-surface/30 transition-colors">
                      <td className="py-3 px-4 text-mintara-text-secondary font-medium">
                        {row.param}
                      </td>
                      <td className="py-3 px-4 text-mintara-text-primary">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </section>
        </FadeInSection>

        <SectionDivider />

        {/* Tokenomics */}
        <FadeInSection delay={0.1}>
          <section id="tokenomics">
            <h2 className="text-4xl font-semibold text-mintara-text-primary mb-12 text-center">
              Tokenomics
            </h2>

            <Card className="p-8 bg-mintara-surface/50 border-mintara-border backdrop-blur-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-mintara-border">
                      <th className="text-left py-4 px-4 text-mintara-text-primary font-semibold">
                        Allocation
                      </th>
                      <th className="text-center py-4 px-4 text-mintara-text-primary font-semibold">
                        %
                      </th>
                      <th className="text-left py-4 px-4 text-mintara-text-primary font-semibold">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokenomics.map((row, index) => (
                      <tr key={index} className="border-b border-mintara-border/50 hover:bg-mintara-surface/30 transition-colors">
                        <td className="py-4 px-4 text-mintara-text-primary font-medium">
                          {row.allocation}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="inline-block px-3 py-1 rounded-full bg-mintara-primary/20 text-mintara-accent font-semibold">
                            {row.percent}%
                          </span>
                        </td>
                        <td className="py-4 px-4 text-mintara-text-secondary">
                          {row.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-mintara-text-secondary text-center mt-6 italic">
                All tokens verifiable via BaseScan.
              </p>
            </Card>
          </section>
        </FadeInSection>

        <SectionDivider />

        {/* MINTA Utility */}
        <FadeInSection delay={0.1}>
          <section id="minta-utility">
            <h2 className="text-4xl font-semibold text-mintara-text-primary mb-12 text-center">
              MINTA Utility
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {utilities.map((util, index) => (
                <Card key={index} className="p-6 bg-mintara-surface/40 border-mintara-border hover:border-mintara-accent hover:bg-mintara-accent/5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,224,198,0.3)] cursor-pointer group">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="w-12 h-12 rounded-xl bg-mintara-primary/20 flex items-center justify-center group-hover:bg-mintara-primary/40 transition-colors">
                      <util.icon className="w-6 h-6 text-mintara-accent group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-sm text-mintara-text-primary font-medium">
                      {util.label}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </FadeInSection>

        <SectionDivider />

        {/* Roadmap */}
        <FadeInSection delay={0.1}>
          <section id="roadmap">
            <h2 className="text-4xl font-semibold text-mintara-text-primary mb-4 text-center">
              Roadmap
            </h2>
            <p className="text-mintara-text-secondary mb-12 text-center">2025 – 2027 Timeline</p>

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-mintara-border"></div>
              
              <div className="space-y-8">
                {roadmap.map((item, index) => (
                  <div key={index} className="relative pl-20">
                    <div className={`absolute left-6 top-2 w-5 h-5 rounded-full border-4 ${
                      item.status === 'completed' ? 'bg-mintara-primary border-mintara-primary' :
                      item.status === 'upcoming' ? 'bg-mintara-accent border-mintara-accent animate-pulse' :
                      'bg-mintara-border border-mintara-border'
                    }`}></div>

                    <Card className={`p-6 bg-mintara-surface/40 border-mintara-border hover:border-mintara-accent/50 transition-all ${
                      item.status === 'completed' ? 'opacity-75' : ''
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-mintara-accent font-semibold">
                          {item.quarter}
                        </span>
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-mintara-primary to-mintara-accent border border-mintara-accent/50 shadow-[0_0_12px_rgba(0,224,198,0.3)]">
                          <item.icon className="w-5 h-5 text-mintara-text-primary" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-mintara-text-primary">
                        {item.title}
                      </h3>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeInSection>

        <SectionDivider />

        {/* Core Innovations */}
        <FadeInSection delay={0.1}>
          <section id="core-innovations">
            <h2 className="text-4xl font-semibold text-mintara-text-primary mb-12 text-center">
              Core Innovations
            </h2>

            <div className="space-y-6">
              {innovations.map((innovation, index) => (
                <Card key={index} className="relative p-8 bg-mintara-surface/40 border-2 border-mintara-border hover:border-mintara-accent/50 transition-all duration-300 group overflow-hidden">
                  <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-mintara-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative flex items-start gap-6">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-mintara-primary to-mintara-accent border-2 border-mintara-accent/50 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(0,224,198,0.3)] group-hover:shadow-[0_0_25px_rgba(0,224,198,0.5)] transition-all">
                      <innovation.icon className="w-8 h-8 text-mintara-text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-mintara-text-primary mb-3">
                        {innovation.title}
                      </h3>
                      <p className="text-mintara-text-secondary">
                        {innovation.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-mintara-text-secondary italic">
                AI → DePIN → IVO
              </p>
            </div>
          </section>
        </FadeInSection>

        <SectionDivider />

        {/* Security & Compliance */}
        <FadeInSection delay={0.1}>
          <section id="security-compliance">
            <h2 className="text-4xl font-semibold text-mintara-text-primary mb-12 text-center">
              Security & Compliance
            </h2>

            <Card className="relative p-12 bg-mintara-surface/50 border-mintara-border backdrop-blur-sm overflow-hidden">
              <div className="absolute top-1/2 right-8 -translate-y-1/2 opacity-5">
                <Shield className="w-64 h-64 text-mintara-accent" />
              </div>

              <div className="relative z-10 space-y-4">
                {security.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-mintara-background/30 border border-mintara-border/50 hover:border-mintara-accent/30 transition-colors">
                    <CheckCircle2 className="w-6 h-6 text-mintara-accent flex-shrink-0 mt-0.5" />
                    <span className="text-mintara-text-primary">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </FadeInSection>

        <SectionDivider />

        {/* Legal Disclaimer */}
        <FadeInSection delay={0.1}>
          <section id="legal-disclaimer">
            <h2 className="text-4xl font-semibold text-mintara-text-primary mb-12 text-center">
              Legal Disclaimer
            </h2>

            <Card className="p-8 bg-mintara-background/80 border-mintara-border/50">
              <div className="space-y-3 text-sm text-mintara-text-secondary">
                <p>
                  This document is for <strong className="text-mintara-text-primary">informational purposes only</strong> and does not constitute investment, legal, or financial advice.
                </p>
                <p>
                  Participation in the Mintara ecosystem is <strong className="text-mintara-text-primary">voluntary</strong> and subject to local laws and regulations in your jurisdiction.
                </p>
                <p>
                  The Mintara team reserves the right to adjust the roadmap, tokenomics, and platform features as the ecosystem evolves.
                </p>
                <p className="pt-2 text-xs text-mintara-text-secondary/70">
                  By accessing this whitepaper, you acknowledge that you have read and understood this disclaimer.
                </p>
              </div>
            </Card>
          </section>
        </FadeInSection>

        <SectionDivider />

        {/* Summary & Tagline */}
        <FadeInSection delay={0.1}>
          <section id="summary">
            <Card className="relative p-12 md:p-16 bg-gradient-to-br from-mintara-surface/90 to-mintara-primary/10 border-2 border-mintara-accent/30 backdrop-blur-sm text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-mintara-accent/5 via-transparent to-mintara-primary/5"></div>
              
              <div className="relative z-10 space-y-8">
                <div className="flex justify-center mb-6">
                  <Logo className="w-20 h-20" />
                </div>

                <h2 className="text-3xl md:text-4xl font-semibold text-mintara-text-primary leading-relaxed">
                  Mintara Token (MINTA) powers the first AI-driven no-code ecosystem on Base Network.
                </h2>

                <p className="text-xl text-mintara-text-secondary max-w-3xl mx-auto">
                  Through AI intelligence, DePIN verification and IVO transparency, Mintara builds a safer and smarter Web3 future.
                </p>

                <div className="pt-6">
                  <p className="text-2xl text-mintara-accent font-semibold italic">
                    "Mintara — Building the Future of Intelligent Tokenization."
                  </p>
                </div>

                <div className="pt-8">
                  <Badge className="px-4 py-2 bg-mintara-primary/20 text-mintara-accent border-mintara-accent/30 text-sm">
                    Built on Base Network
                  </Badge>
                </div>

                <div className="flex items-center justify-center gap-4 pt-8">
                  <a
                    href="https://x.com/mintaratoken"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-mintara-border flex items-center justify-center text-mintara-text-primary hover:text-mintara-accent hover:border-mintara-accent hover:scale-110 hover:shadow-[inset_0_0_12px_rgba(0,224,198,0.2)] transition-all duration-250"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="https://t.me/mintaratoken"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-mintara-border flex items-center justify-center text-mintara-text-primary hover:text-mintara-accent hover:border-mintara-accent hover:scale-110 hover:shadow-[inset_0_0_12px_rgba(0,224,198,0.2)] transition-all duration-250"
                  >
                    <Send className="w-5 h-5" />
                  </a>
                  <a
                    href="https://github.com/2025mintara/Mintara"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-mintara-border flex items-center justify-center text-mintara-text-primary hover:text-mintara-accent hover:border-mintara-accent hover:scale-110 hover:shadow-[inset_0_0_12px_rgba(0,224,198,0.2)] transition-all duration-250"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </Card>
          </section>
        </FadeInSection>

        <div className="h-24"></div>
      </div>
    </div>
  );
}
