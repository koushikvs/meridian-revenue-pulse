/* Shared data layer — swap numbers here to re-tune the demo. */
window.RPData = {
  brand: {
    name: 'Meridian One Communications',
    nameShort: 'Meridian One',
    products: ['M1 Mobile', 'M1 Fiber', 'M1 Air (FWA)', 'M1 Stream', 'M1 Business'],
    quarter: 'FY-26 · Q2',
    partner: 'EY | Revenue Intelligence Platform',
  },

  /* Forecast hero — in $B */
  forecast: {
    commit: 12.10,
    target: 11.80,
    best:   12.35,
    worst:  11.55,
    attainment: 94,
    confidence: 79,
    accuracy:   83,
    narrative:
      "You are 79% likely to hit the $11.8B target. Risk is concentrated in three enterprise deals worth $42M combined that have stalled &gt;21 days, plus an elevated postpaid port-out trend in the Texas &amp; Florida regions. Commit of $12.10B provides a $300M cushion — but 2 of 3 at-risk enterprise accounts show <strong>declining network NPS in the 60 days prior</strong> to deal slippage. Fix the experience signal upstream, protect the number downstream."
  },

  /* Revenue exposure — $M net */
  exposure: {
    netM: 248,
    postPaidChurnM: 135,
    broadbandLeakageM: 85,
    b2bRenewalGapM: 72,
    overlapM: 44,
    qoqPct: 9,
    addressablePct: 62,
  },

  /* Deal Risk Radar — B2B enterprise watchlist */
  dealRadar: [
    { account: 'Delta Energy Co.',        segment: 'Enterprise', value: '$14M', stage: 'Negotiation',   days: 38, score: 41, signal: 'RFP reissued — procurement requesting 12% price-down after peer benchmark',     rep: 'A. Washington', next: 'Executive sponsor call + price-concession authority' },
    { account: 'NorthState Health System',segment: 'Enterprise', value: '$11M', stage: 'Proposal',       days: 31, score: 39, signal: 'Primary champion (CIO) left — interim reviewing 5 vendor contracts incl. ours',      rep: 'R. Mendez',     next: 'Identify new exec champion; escalate to CHRO' },
    { account: 'Allegiance Financial',    segment: 'Enterprise', value: '$9M',  stage: 'Discovery',      days: 26, score: 52, signal: 'Competitor (AT&T Business) engaged; presented private-5G POC last week',             rep: 'A. Washington', next: 'Private-5G competitive displacement deep-dive' },
    { account: 'Pacific Logistics Co.',   segment: 'Mid-Market', value: '$8M',  stage: 'Negotiation',    days: 34, score: 47, signal: 'No buyer activity — last meaningful email opened 16 days ago',                          rep: 'K. Oyelade',    next: 'Send breakup email; escalate to VP Logistics Tech' },
    { account: 'Metro Unified School Dist.', segment: 'Public Sector', value: '$6M', stage: 'Evaluation', days: 29, score: 54, signal: 'Decision pushed to next budget cycle — state appropriation delay',                     rep: 'D. Lewis',      next: 'Offer FY-26 Q3 incentive tier; dual-phase rollout' }
  ],

  /* Revenue leakage drivers ($M) */
  leakage: {
    totalM: 180,
    drivers: [
      { label: 'Customer Experience (port-outs)',       value: 68, pct: 38, color: '#FF2D5A' },
      { label: 'Fiber deployment backlog',              value: 40, pct: 22, color: '#FFC857' },
      { label: 'B2B contract churn & downgrades',       value: 32, pct: 18, color: '#A78BFA' },
      { label: 'Declining upgrade rate (legacy devices)', value: 27, pct: 15, color: '#4DE5FF' },
      { label: 'Competitor price pressure (prepaid)',   value: 13, pct:  7, color: '#60A5FA' }
    ]
  },

  /* 8-stage customer lifecycle (telco) */
  causalChain: [
    { stage: 'Awareness',       score: 7.8, note: 'Brand & demand gen',    tone: 'good' },
    { stage: 'Shop / Quote',    score: 7.6, note: 'Digital + retail flow', tone: 'good' },
    { stage: 'Activation',      score: 7.2, note: 'Port-in conversion',    tone: 'good' },
    { stage: 'First 30 Days',   score: 5.4, note: 'Onboarding friction',   tone: 'critical' },
    { stage: 'Bill Shock Window', score: 5.1, note: 'First-bill disputes',  tone: 'critical' },
    { stage: 'Care / Support',  score: 6.3, note: 'Call-handle + CX dip',  tone: 'warn' },
    { stage: 'Upgrade',         score: 7.1, note: 'Device promo uptake',   tone: 'good' },
    { stage: 'Renewal / Retain', score: 6.4, note: 'Port-out decision pt.', tone: 'warn' }
  ],

  /* Churn by CSAT */
  churnByCsat: [
    { band: 'Below 3.5',  n: 12,  pct: 42 },
    { band: '3.5 – 4.0',  n: 23,  pct: 24 },
    { band: '4.0 – 4.5',  n: 45,  pct:  9 },
    { band: 'Above 4.5',  n: 40,  pct:  3 }
  ],

  /* Port-out reasons */
  churnReasons: [
    { label: 'Network quality / coverage gaps', pct: 28, color: '#FF2D5A' },
    { label: 'First-bill surprise / pricing',    pct: 22, color: '#FFC857' },
    { label: 'Competitor promo (switcher $)',    pct: 18, color: '#A78BFA' },
    { label: 'Support experience friction',      pct: 15, color: '#4DE5FF' },
    { label: 'Device upgrade cycle elsewhere',   pct: 10, color: '#60A5FA' },
    { label: 'Household / life event',           pct:  7, color: '#22C55E' }
  ],

  /* XM Agent live signals */
  agents: [
    { name: 'Churn Prevention Agent',   where: 'First 30 Days · Postpaid', sev: 'critical', t: '2h ago',
      body: 'Postpaid CSAT for switchers collapsed to 2.3/5 in Texas (Houston DMA) and Florida (Tampa DMA). 14K switchers in the danger zone — historical cohort base rate says 38% port back within 60 days if CSAT &lt; 2.8.',
      risk: '$18M ARR at risk', accts: '14K switchers',
      action: 'Deploy first-30-day concierge for top 3K Houston/Tampa switchers. Est. recovery: $11.4M.' },
    { name: 'Bill-Shock Prevention Agent', where: 'Bill Shock Window · Consumer', sev: 'critical', t: '3h ago',
      body: 'First-bill dispute rate rising 22% YoY concentrated in family-plan conversions. Net lost revenue to credits + port-out: $9.2M this quarter. Correlation with port-out at 90 days: 0.71.',
      risk: '$14M ARR at risk', accts: '41K lines',
      action: 'Launch pre-bill explainer SMS + care-agent script change. Pilot group showed 34% dispute reduction.' },
    { name: 'Fiber Activation Agent',   where: 'Activation · M1 Fiber', sev: 'warning', t: '5h ago',
      body: 'Fiber install backlog in Southeast region crossed 11 days average (vs 6-day target). Activation-to-first-bill NPS dropped 9 pts. 2,400 orders in backlog = $34M annualized.',
      risk: '$9M ARR at risk', accts: '2.4K orders',
      action: 'Flex-deploy 18 technicians from Northeast; prioritize MDU builds (higher penetration yield).' },
    { name: 'Network Experience Agent', where: 'Care / Support · All', sev: 'warning', t: '1d ago',
      body: 'Cross-market analysis: every 1-point drop in Voice-over-LTE Mean Opinion Score reduces postpaid 90-day retention by 2.4%. Manila contact center handling 31% more drop-related calls than Atlanta.',
      risk: '$28M ARR at risk', accts: '112K postpaid',
      action: 'Prioritize VoLTE softswitch tuning in top 10 problem markets; scale self-serve troubleshooting.' },
    { name: 'B2B Renewal Agent',        where: 'Renewal · Enterprise', sev: 'warning', t: '6h ago',
      body: '7 enterprise accounts with NPS &lt; 60 and ≥2 open Sev-2 tickets are within 90 days of renewal — combined ACV $58M. 0% expansion probability at current CSAT.',
      risk: '$12M ARR at risk', accts: '7 accounts',
      action: 'Trigger executive save calls; fast-track ticket resolution; pre-position renewal with modernization credit.' },
    { name: 'FMC Cross-Sell Agent',     where: 'Upgrade · Consumer', sev: 'opportunity', t: '4h ago',
      body: 'Positive signal: 1.1M mobile-only households now sit in fiber footprint after Q2 build-out. Historical attach rate: 18% within 90 days when bundle discount is surfaced at care touchpoint.',
      risk: '$210M TAM unlocked', accts: '1.1M HH',
      action: 'Launch "One Meridian Bundle" motion across care + app nudge; predicted net adds: 198K.' }
  ],

  /* Journey friction by segment heatmap */
  journeyHeatmap: {
    cols: ['Awareness','Shop','Activation','1st 30d','Bill Shock','Care','Upgrade','Renewal'],
    rows: ['Premium Unlimited','Standard Postpaid','Prepaid','Fiber HH (FTTH)','FWA HH (5G Air)','SMB','Mid-Market','Enterprise'],
    clv: ['$4.2K','$2.6K','$0.9K','$3.8K','$2.4K','$7.4K','$41K','$312K'],
    values: [
      [8.3, 8.4, 8.1, 7.5, 7.2, 7.6, 8.0, 7.9],
      [7.9, 7.7, 7.4, 5.8, 5.3, 6.5, 7.0, 6.9],
      [7.5, 7.2, 6.9, 5.1, 4.6, 5.9, 6.3, 5.6],
      [8.2, 8.0, 6.8, 5.6, 5.2, 7.0, 7.8, 7.7],
      [8.0, 7.8, 5.9, 4.8, 4.3, 6.2, 7.4, 6.8],
      [7.7, 7.5, 7.1, 6.0, 5.4, 6.7, 7.6, 7.3],
      [7.9, 7.7, 7.4, 6.5, 6.2, 7.0, 7.9, 7.4],
      [8.2, 8.0, 7.8, 7.2, 7.0, 7.1, 8.0, 7.1]
    ]
  },

  /* Function-by-function value chain */
  valueChain: [
    { fn: 'Consumer Wireless',  owner: 'Priya Ramanathan · EVP Consumer Mobility',
      status: 'Needs Attention', metrics: [{k:'Postpaid Churn',v:'1.14%'},{k:'Gross Adds',v:'+820K'},{k:'ARPU',v:'$58.10'}], trend: 'Declined vs Q1' },
    { fn: 'Home Connectivity',  owner: 'Marco Velasquez · EVP Home & Broadband',
      status: 'On Track', metrics: [{k:'Fiber Net Adds',v:'+260K'},{k:'FWA Net Adds',v:'+152K'},{k:'FMC HHs',v:'28.4%'}], trend: 'Improved vs Q1' },
    { fn: 'Business',           owner: 'Alina Chen · EVP Business',
      status: 'Critical', metrics: [{k:'Enterprise ACV',v:'$2.9B'},{k:'Win Rate',v:'38%'},{k:'Renewal NRR',v:'104%'}], trend: 'Declined vs Q1' },
    { fn: 'Customer Care',      owner: 'Dion Okafor · SVP Customer Care',
      status: 'Needs Attention', metrics: [{k:'First-Call Res.',v:'71%'},{k:'Avg Handle',v:'7.4 min'},{k:'Cost / Contact',v:'$6.80'}], trend: 'Flat vs Q1' },
    { fn: 'Network Experience', owner: 'Kenji Yamamoto · EVP Network',
      status: 'On Track', metrics: [{k:'5G Cov. (Pop)',v:'96%'},{k:'Drop-Call Rate',v:'0.61%'},{k:'VoLTE MOS',v:'4.1/5'}], trend: 'Improved vs Q1' },
    { fn: 'Brand & Marketing',  owner: 'Jasmine Reyes · EVP Marketing',
      status: 'Needs Attention', metrics: [{k:'Qual. Traffic',v:'-4%'},{k:'Top Ch. ROAS',v:'6.1x'},{k:'Brand NPS',v:'+18'}], trend: 'Declined vs Q1' },
  ],

  /* Account watchlist — top 5 risk */
  watchlist: [
    { score: 92, name: 'Allegiance Financial',  seg: 'Enterprise',    reason: 'NPS decline + private-5G POC w/ competitor', acv: '$24M', nps: 62, npsDelta: -18, days: 41, renews: 'FY26 Q3' },
    { score: 88, name: 'Pacific Logistics Co.', seg: 'Mid-Market',    reason: 'Usage down 28% · 2 Sev-1 tickets last 30d',   acv: '$18M', nps: 60, npsDelta: -15, days: 34, renews: 'FY26 Q4' },
    { score: 85, name: 'Metro Unified SD',      seg: 'Public Sector', reason: 'Budget freeze + declining fiber attach',      acv: '$15M', nps: 64, npsDelta: -11, days: 46, renews: 'FY26 Q3' },
    { score: 79, name: 'NorthState Health',     seg: 'Enterprise',    reason: 'Champion departed · renewal approaches',      acv: '$31M', nps: 70, npsDelta:  -7, days: 22, renews: 'FY27 Q1' },
    { score: 74, name: 'Delta Energy Co.',      seg: 'Enterprise',    reason: 'Competitor engaged; price-down pressure',     acv: '$26M', nps: 74, npsDelta:  -4, days: 28, renews: 'FY27 Q2' },
  ],

  /* This week's actions */
  actions: [
    { title: 'Launch First-30-Day Concierge — Houston & Tampa',
      status: 'inprog', owner: 'Dion Okafor · SVP Customer Care', due: 'Apr 24',
      impact: '$18M', body: 'Concierge team + proactive outreach for top 3K Q2 switchers in Houston/Tampa DMAs. Sprint 2 of 3 complete — playbook validated at 34% CSAT lift in pilot.' },
    { title: 'Exec Escalation — Allegiance Financial + NorthState Health',
      status: 'notstart', owner: 'John Marlowe · CRO', due: 'Apr 19',
      impact: '$55M', body: 'Both accounts scored >85 with no executive touch in 30+ days. Combined ACV $55M and both inside renewal window.' },
    { title: 'Fiber Backlog Technician Flex — Southeast',
      status: 'inprog', owner: 'Marco Velasquez · EVP Home', due: 'Apr 30',
      impact: '$34M', body: 'Flex 18 technicians from NE to SE for 6 weeks to collapse 11-day backlog. MDU priority. 2,400 orders in queue.' },
    { title: 'One-Meridian Bundle — FMC Cross-sell to 1.1M HH',
      status: 'notstart', owner: 'Priya Ramanathan · EVP Consumer', due: 'May 7',
      impact: '$210M', body: 'Newly-in-footprint fiber households. Care + app nudge motion targeting 198K net adds. Bundle credit pre-authorized.' },
    { title: 'Prepaid Competitive Price Response',
      status: 'blocked', owner: 'Jasmine Reyes · EVP Marketing', due: 'May 1',
      impact: '$13M', body: 'Cricket + Mint aggressive $30 unlimited. Blocked: need Finance sign-off on sub-line margin floor before launching response.' }
  ],

  /* Board summary — financial scorecard */
  board: {
    assessment: 'On Track with Risks — $11.8B revenue growing 4.2% YoY driven by broadband net-adds and ARPU lift; postpaid port-out and enterprise renewal cycle are the structural risks.',
    wins: [
      'Service Revenue hit $11.8B milestone — 4.2% YoY; broadband net-adds +18% (+412K) driven by FWA and fiber build-out catch-up.',
      'FMC household penetration crossed 28% — first quarter where converged households grew at 3x mobile-only churn rate.',
      'XM Agent network detected 14K at-risk Houston/Tampa switchers 30 days before port-out wave materialized in Q1 cohort data.'
    ],
    challenges: [
      'Postpaid churn at 1.14% (target ≤ 1.00%) driven by First-30-Day experience collapse in switcher cohort — scoring 2.3/5 CSAT.',
      'Enterprise renewal NRR at 104% vs target 112% — 7 accounts ($58M ACV) in renewal window with NPS < 60.',
      'Fiber activation backlog eroding activation NPS by 9 points in Southeast — $34M ARR implications if left unfixed for 2 more quarters.'
    ],
    metrics: [
      { l: 'Service Revenue',    v: '$11.8B',  d: 'vs $11.32B LY · +4.2%' },
      { l: 'YoY Growth',         v: '+4.2%',   d: 'Target: 5.0%' },
      { l: 'Wireless ARPU',      v: '$58.10',  d: '+2.1% YoY' },
      { l: 'Postpaid Churn',     v: '1.14%',   d: 'Target: ≤1.00%' },
      { l: 'Broadband Net Adds', v: '+412K',   d: 'Best Q in 8 quarters' },
      { l: 'Enterprise NRR',     v: '104%',    d: 'Target: 112%' },
    ],
    bridge: [
      { label: 'Base (FY25 Q2)',    v: '$11.32B' },
      { label: 'Gross Adds & ARPU', v: '+$680M', dir: 'up',   pct: '+6.0%' },
      { label: 'Broadband / FMC',   v: '+$340M', dir: 'up',   pct: '+3.0%' },
      { label: 'Churn & Downgrade', v: '-$540M', dir: 'down', pct: '-4.8%' },
      { label: 'Final (FY26 Q2)',   v: '$11.80B' }
    ],
    risks: [
      { risk: 'Postpaid First-30-Day experience collapse eroding $18M ARR in Houston/Tampa cohort',
        mit: 'Concierge deployment (Sprint 2/3 complete · validated at 34% CSAT lift). XM Agent monitoring 14K at-risk switchers.',
        owner: 'Dion Okafor · SVP Customer Care' },
      { risk: 'Enterprise renewal book — $58M ACV across 7 accounts with NPS < 60 approaching renewal window',
        mit: 'Exec save-call program launching with modernization credit pre-authorized; fast-track Sev-2 resolution.',
        owner: 'Alina Chen · EVP Business' },
      { risk: 'Fiber activation backlog (11-day avg vs 6-day target) compressing NPS in Southeast',
        mit: 'Technician flex from Northeast; MDU prioritization; 60-day unwind plan reviewed by Operations.',
        owner: 'Marco Velasquez · EVP Home' }
    ],
    asks: [
      { p: 'HIGH',     title: 'Approve $7.5M for First-30-Day concierge program expansion (Houston, Tampa, Dallas, Orlando).',  impact: 'Protect $18M ARR, lift cohort CSAT 2.3→3.6', invest: '$7.5M' },
      { p: 'CRITICAL', title: 'Greenlight $28M modernization-credit pool for enterprise renewal save-calls (7 accounts).',       impact: 'Defend $58M ACV + unlock $22M expansion', invest: '$28M' },
      { p: 'HIGH',     title: 'Fund $12M fiber-technician flex + MDU surge across Southeast for 90 days.',                      impact: 'Collapse backlog, recover $34M ARR',  invest: '$12M' }
    ],
    sources: [
      { t: 'Qualtrics XM',        s: 'Experience Management' },
      { t: 'Salesforce Comms Cloud', s: 'CRM & Sales' },
      { t: 'Amdocs BSS',          s: 'Billing & Charging' },
      { t: 'ServiceNow CSM',      s: 'Care & Field Ops' },
      { t: 'Snowflake',           s: 'Data Warehouse' },
      { t: 'Polystar / Cellwize', s: 'Network Performance' }
    ]
  },

  /* My People */
  people: {
    topReps: [
      { name: 'Amara Washington',  tvsA: '108%', rev: '$68M', collab: 92, exp: 94 },
      { name: 'Ravi Mendez',       tvsA: '103%', rev: '$42M', collab: 88, exp: 86 },
      { name: 'Keshawn Oyelade',   tvsA:  '96%', rev: '$54M', collab: 83, exp: 79 },
      { name: 'Sophia Marchetti',  tvsA:  '94%', rev: '$37M', collab: 90, exp: 91 },
      { name: 'Duante Lewis',      tvsA:  '90%', rev: '$28M', collab: 81, exp: 82 }
    ],
    mood: [
      { label: 'Market Momentum',    v: 82 },
      { label: 'Commissions Policy', v: 42 },
      { label: 'Device Promo Depth', v: 68 },
      { label: 'Learning & Dev.',    v: 71 },
      { label: 'Tooling & Tech',     v: 58 }
    ],
    managerRadar: {
      axes: ['Delegation','Respect','Clear Direction','Balance','Recognition','Approachability','Bias Check','Listening','Motivational','Judgement','Comp Fairness','Feedback'],
      top:    { color: '#22C55E', fill: 'rgba(34,197,94,0.18)',  values: [85,92,88,78,90,86,72,84,88,82,70,86], max: 100 },
      middle: { color: '#60A5FA', fill: 'rgba(96,165,250,0.16)', values: [72,78,72,64,70,72,65,70,74,70,58,68], max: 100 },
      bottom: { color: '#EF4444', fill: 'rgba(239,68,68,0.16)',  values: [55,68,60,48,52,60,48,56,58,58,38,55], max: 100 }
    },
    wlb: {
      months: ['Oct','Nov','Dec','Jan','Feb','Mar','Apr'],
      series: [
        { name: 'Marketing',        color: '#A78BFA', points: [46,44,42,40,38,40,42].map((y,i)=>({x:'OCTNOVDECJANFEBMARAPR'.slice(i*3,i*3+3),y})) },
        { name: 'Sales',            color: '#FF2D5A', points: [36,32,28,22,18,16,18].map((y,i)=>({x:'OCTNOVDECJANFEBMARAPR'.slice(i*3,i*3+3),y})) },
        { name: 'Customer Success', color: '#4DE5FF', points: [40,38,36,34,30,28,30].map((y,i)=>({x:'OCTNOVDECJANFEBMARAPR'.slice(i*3,i*3+3),y})) },
        { name: 'Support',          color: '#FFC857', points: [50,48,42,34,28,24,26].map((y,i)=>({x:'OCTNOVDECJANFEBMARAPR'.slice(i*3,i*3+3),y})) }
      ]
    }
  },

  /* Cost Drivers page data */
  costs: {
    totalB: 9.4,  // $B
    tree: [
      { label: 'Network & CapEx OpEx',     b: 3.2, color: '#FF2D5A' },
      { label: 'Customer Care',            b: 1.6, color: '#A78BFA' },
      { label: 'Dealer Commissions & Devices', b: 1.5, color: '#FFC857' },
      { label: 'Marketing & Acquisition',  b: 0.9, color: '#4DE5FF' },
      { label: 'Billing / IT / Digital',   b: 1.2, color: '#60A5FA' },
      { label: 'G&A',                      b: 1.0, color: '#22C55E' }
    ],
    toolEngagement: [
      { tool: 'Salesforce Comms Cloud',       cost: '$1,100/user', usage: 72, device: 'Desktop' },
      { tool: 'LinkedIn Sales Nav. (B2B)',    cost: '$1,200/user', usage: 58, device: 'Mobile' },
      { tool: 'Tableau (Sales Ops)',          cost: '$900/user',   usage: 62, device: 'Desktop' },
      { tool: 'Gong · Call Intelligence',     cost: '$1,600/user', usage: 41, device: 'Desktop' },
      { tool: 'Mobile Retail POS (Stores)',   cost: '$420/device', usage: 89, device: 'Handheld' }
    ],
    channelROI: [
      { ch: 'Referral (Bring-a-Friend)', roi: 420, rev: 58 },
      { ch: 'CRM / Lifecycle Email',     roi: 310, rev: 46 },
      { ch: 'Retail Store',              roi: 220, rev: 74 },
      { ch: 'Paid Search (Brand)',       roi: 180, rev: 52 },
      { ch: 'Paid Search (Non-Brand)',   roi:  65, rev: 22 },
      { ch: 'Programmatic Display',      roi: -20, rev: 14 },
      { ch: 'Linear TV',                 roi: -55, rev: 18 },
      { ch: 'Cinema / OOH',              roi: -70, rev:  6 }
    ],
    careLocations: [
      { loc: 'Manila',   perCase: 4.8,  cases: 1800, vol: 'k cases' },
      { loc: 'New Delhi',perCase: 3.9,  cases: 1200, vol: 'k cases' },
      { loc: 'Atlanta',  perCase: 11.2, cases: 2200, vol: 'k cases' },
      { loc: 'Self-serve (App / KB)', perCase: 0.08, cases: 4600, vol: 'k cases' }
    ],
    productNps: {
      years: ['FY22','FY23','FY24','FY25','FY26Q2'],
      rd: [-6, -2, 4, 8, 2],  // 2-q lag
      series: [
        { name: 'M1 Mobile Core',   color: '#FF2D5A', points: [['FY22',22],['FY23',28],['FY24',32],['FY25',42],['FY26Q2',51]].map(p=>({x:p[0],y:p[1]})) },
        { name: 'M1 Fiber',         color: '#4DE5FF', points: [['FY22',4],['FY23',18],['FY24',36],['FY25',54],['FY26Q2',62]].map(p=>({x:p[0],y:p[1]})) },
        { name: 'M1 Air (FWA)',     color: '#FFC857', points: [['FY22',null],['FY23',12],['FY24',28],['FY25',38],['FY26Q2',44]].filter(p=>p[1]!=null).map(p=>({x:p[0],y:p[1]})) },
        { name: 'M1 Business',      color: '#A78BFA', points: [['FY22',38],['FY23',41],['FY24',40],['FY25',36],['FY26Q2',32]].map(p=>({x:p[0],y:p[1]})) }
      ]
    },
    cxBySegment: [
      { seg: 'Premium Unlimited', mood: 'Positive', n: 8.2, nps: 63,  csat: 4.4, clv: '$4.2K' },
      { seg: 'Standard Postpaid', mood: 'Neutral',  n: 21.4,nps: 41,  csat: 3.9, clv: '$2.6K' },
      { seg: 'Prepaid',           mood: 'At Risk',  n: 14.7,nps: 22,  csat: 3.4, clv: '$0.9K' },
      { seg: 'Fiber Households',  mood: 'Positive', n: 6.1, nps: 58,  csat: 4.3, clv: '$3.8K' },
      { seg: 'FWA Households',    mood: 'Neutral',  n: 4.2, nps: 37,  csat: 3.7, clv: '$2.4K' },
      { seg: 'SMB',               mood: 'Neutral',  n: 1.2, nps: 31,  csat: 3.6, clv: '$7.4K' },
      { seg: 'Mid-Market',        mood: 'At Risk',  n: 0.4, nps: 18,  csat: 3.3, clv: '$41K' },
      { seg: 'Enterprise',        mood: 'At Risk',  n: 0.08,nps: 12,  csat: 3.1, clv: '$312K' }
    ]
  },

  /* Agent Network threads — full master-detail conversations.
     participants / sender / recipients use agent keys that map to CSS color tokens:
       churn (Churn Prevention)   · support (Bill-Shock Prevention)
       onboarding (Fiber Activation) · research (Network Experience)
       expansion (B2B Renewal)    · sales (FMC Cross-Sell)               */
  agentThreads: [
    {
      id: 'fwa-dfw',
      status: 'active',
      priority: 'high',
      title: 'FWA churn spike in Dallas-Fort Worth — T-Mobile 5G Home displacement',
      preview: 'Churn Prevention flagged 3.2% churn vs 1.8% baseline. Cross-agent save motion under CRO review.',
      openedAt: 'Apr 18 · 10:14 AM',
      lastActivity: '2h ago',
      participants: ['churn', 'research', 'sales', 'support'],
      messages: [
        {
          sender: 'churn',
          body: 'Detected anomaly. FWA churn in Dallas-Fort Worth is 3.2% this month, up from a 1.8% baseline. 3,400 accounts are in the danger zone over the next six months if the spike holds.',
          metrics: [
            { v: '3.2%',  l: 'DFW FWA Churn' },
            { v: '1.8%',  l: '12-mo baseline' },
            { v: '3.4K',  l: 'At-risk accounts' }
          ],
          callouts: [
            { type: 'risk', title: 'ARR exposure', body: '$8.2M over six months if the spike holds and no intervention is taken.' }
          ],
          time: 'Apr 18 · 10:14 AM'
        },
        {
          sender: 'research',
          recipients: ['churn'],
          body: 'Pulled competitive and network telemetry. VoLTE MOS and drop-call rates in DFW actually improved this quarter — service is not the cause. T-Mobile launched 5G Home Internet in DFW on April 1 at $50/mo with a 12-month price lock. Six-week overlap with our churn spike is not coincidence.',
          metrics: [
            { v: '+4 pts', l: 'DFW NPS Δ' },
            { v: '$50/mo', l: 'Competitor price' },
            { v: '12 mo',  l: 'Price lock' }
          ],
          callouts: [
            { type: 'insight', title: 'Root cause isolated', body: 'Competitor displacement, not service failure. DFW NPS is up four points this quarter — customers are leaving despite an improving network experience.' }
          ],
          time: 'Apr 18 · 10:38 AM'
        },
        {
          sender: 'sales',
          recipients: ['churn', 'support'],
          body: 'Ran account-level segmentation on the 3,400 at-risk households. Two distinct populations emerged: 2,100 are >12-month tenured with multi-service (FWA + mobile), largely price-insensitive. 1,300 are <6-month tenured, single-service, highly price-sensitive.',
          callouts: [
            { type: 'synthesis', title: 'Two segments, two motions', body: 'Tenured customers respond to loyalty credit and concierge touch. Price-sensitive customers respond only to matched price-lock offers. Treating them as one cohort will waste spend.' }
          ],
          time: 'Apr 18 · 11:02 AM'
        },
        {
          sender: 'support',
          recipients: ['churn', 'research', 'sales'],
          body: 'Proposing response package. Tenured 2,100: retention concierge + $25/mo loyalty credit for 3 months. Price-sensitive 1,300: matched 12-month price-lock at $52/mo. Financed against the Q2 retention reserve.',
          metrics: [
            { v: '2.1K',  l: 'Tenured (concierge)' },
            { v: '1.3K',  l: 'Price-sensitive (lock)' },
            { v: '78%',   l: 'Modeled retention' }
          ],
          callouts: [
            { type: 'action', title: 'CRO approval required', body: 'Estimated save: $6.4M of the $8.2M at risk. Offer can deploy within 24h of sign-off.' }
          ],
          time: 'Apr 18 · 11:47 AM'
        },
        {
          sender: 'churn',
          body: 'Tracking. Reporting retention rate by cohort at day 14 and day 30.',
          time: 'Apr 18 · 11:49 AM'
        }
      ]
    },
    {
      id: 'prepaid-migration',
      status: 'resolved',
      priority: 'medium',
      title: 'Q1 prepaid → postpaid migration — campaign results',
      preview: '48K targeted · 9.2K converted · persona insights locked for Q2.',
      openedAt: 'Apr 8 · 9:22 AM',
      lastActivity: 'Apr 9 · 2:14 PM',
      participants: ['sales', 'churn'],
      messages: [
        {
          sender: 'sales',
          body: 'Closing out the Q1 prepaid-to-postpaid migration campaign. Targeted 48K heavy-usage prepaid customers with a structured upgrade offer.',
          metrics: [
            { v: '48K',   l: 'Targeted' },
            { v: '9.2K',  l: 'Converted' },
            { v: '19.2%', l: 'Conversion' }
          ],
          time: 'Apr 8 · 9:22 AM'
        },
        {
          sender: 'churn',
          recipients: ['sales'],
          body: 'Persona breakdown on the 9,200 conversions is sharp. Concentrated in two personas: gig workers with >8GB/month (28% conversion), and multi-line family-of-3+ households (24% conversion). Low-usage prepaid (<4GB) converted at under 8%.',
          callouts: [
            { type: 'insight', title: "Don't chase low-usage", body: 'Conversion correlates strongly with usage intensity. Low-usage prepaid customers converted at sub-8% and burned through most of the campaign spend. Drop them from Q2 targeting.' }
          ],
          time: 'Apr 8 · 10:05 AM'
        },
        {
          sender: 'sales',
          body: 'Confirmed downstream economics. ARPU lift on the converted cohort: $37 → $62 blended. 24-month LTV expansion: +$1,040 per conversion. Total Q1 ARR lift: $2.8M.',
          metrics: [
            { v: '$37→$62', l: 'Blended ARPU' },
            { v: '+$1,040', l: 'LTV per conversion' },
            { v: '$2.8M',   l: 'Q1 ARR lift' }
          ],
          callouts: [
            { type: 'synthesis', title: 'Q2 recommendation', body: 'Double targeting spend on gig + multi-line personas. Drop the low-usage segment. Model predicts $4.6M Q2 ARR lift at the same campaign budget.' }
          ],
          time: 'Apr 8 · 10:41 AM'
        },
        {
          sender: 'sales',
          body: 'Handoff to Marketing for Q2 campaign design. Closing thread.',
          time: 'Apr 9 · 2:14 PM'
        }
      ]
    }
  ]
};
