# Meridian One · Revenue Pulse (CRO Demo for US Tier-1 Telecom)

A tailored Revenue Intelligence demo for Chief Revenue Officers of US Tier-1 converged (quad-play) operators. Built as a static site — HTML, CSS, and vanilla JS with hand-rolled SVG charts — so it deploys anywhere (Netlify, Vercel, S3, or plain file hosting) with zero build step.

## Fictional brand

All names and numbers are fictional. The reference brand is **Meridian One Communications** (M1), a US Tier-1 quad-play with:

- **M1 Mobile** · consumer wireless (Premium Unlimited, Standard Postpaid, Prepaid)
- **M1 Fiber** · residential fiber broadband
- **M1 Air** · 5G fixed wireless access
- **M1 Stream** · video / CTV
- **M1 Business** · B2B (SMB, Mid-Market, Enterprise, Public Sector)

## Headline thesis

> **Churn & ARPU defense is a CX problem.**
> Every revenue lever at a mature Tier-1 — port-out, bill-shock, bundle attach, B2B renewal — is gated by customer experience 30–90 days upstream. Revenue Pulse makes that upstream signal visible, scored, and actionable.

## Narratives

The app tells four connected stories end-to-end:

1. Churn & ARPU Defense — postpaid port-out, first-30-day experience, bill-shock
2. 5G & Network Monetization ROI — VoLTE MOS → retention; private-5G pipeline
3. FMC Cross-Sell — 1.1M mobile-only households newly in fiber footprint
4. B2B Digital Services — SASE, private 5G, UCaaS; renewal-risk radar

## Pages

| Tab                       | Route                  | Purpose                                                        |
| ------------------------- | ---------------------- | -------------------------------------------------------------- |
| Revenue Pulse (Summary)   | `/`                    | Headline forecast + exposure + deal radar + XM agent snapshot  |
| Executive Overview        | `/executive-overview/` | Redirects to Summary (same canvas)                             |
| Revenue Drivers           | `/revenue-drivers/`    | Four revenue engines, ARPU, net adds, FMC, B2B pipeline        |
| Cost Drivers              | `/cost-drivers/`       | OpEx tree, tool ROI, CLV:CAC, channel ROI, care cost per case  |
| My People                 | `/my-people/`          | Rep performance, manager radar, mood, WLB, attrition risk      |
| Board Summary             | `/board-summary/`      | QBR scorecard, wins/challenges, bridge, risks, asks            |
| Agent Network             | `/agent-network/`      | Six XM agents + active cross-agent threads                     |
| Ecosystem                 | `/ecosystem/`          | 6-layer architecture (Sources → Personas) + governance         |

## Local preview

```bash
cd meridian-revenue-pulse
python3 -m http.server 8000
# open http://localhost:8000/
```

## Deploy to Netlify

**Option A — drag & drop**
1. Zip the `meridian-revenue-pulse` folder (or just drag the folder itself onto Netlify).
2. Netlify auto-detects this as a static site; `netlify.toml` sets clean-URL redirects and cache headers.

**Option B — CLI**
```bash
npm install -g netlify-cli
cd meridian-revenue-pulse
netlify deploy --prod --dir=.
```

## Directory layout

```
meridian-revenue-pulse/
├── index.html                      Summary / Revenue Pulse hero
├── executive-overview/index.html   Redirect to /
├── revenue-drivers/index.html
├── cost-drivers/index.html
├── my-people/index.html
├── board-summary/index.html
├── agent-network/index.html
├── ecosystem/index.html
├── netlify.toml
├── README.md
└── assets/
    ├── app.css          Design system (dark, signal-coral + cyan)
    ├── data.js          Single source of truth — swap numbers here
    ├── charts.js        Vanilla SVG charts (donut, line, bars, radar, heatmap, thermo)
    ├── nav.js           Shared top nav + KPI ribbon
    ├── summary.js       Summary page wire-up
    ├── revenue-drivers.js
    ├── cost-drivers.js
    ├── my-people.js
    ├── board-summary.js
    └── agent-network.js
```

## Tuning the demo

All numbers flow from `assets/data.js`. To repoint the demo at a different fictional carrier or re-tune for a specific CRO conversation:

- `RPData.brand` — carrier name, products, quarter label
- `RPData.forecast` — commit / target / best / worst in $B
- `RPData.exposure` — revenue at risk breakdown
- `RPData.dealRadar` — B2B account watchlist
- `RPData.agents` — XM agent signals
- `RPData.board` — QBR scorecard, wins, challenges, asks
- `RPData.costs` — OpEx tree, tool engagement, channel ROI

The rest of the site re-renders automatically.

## Data provenance shown in the UI

The demo names the following systems as data sources (all plausible for a Tier-1):

- Qualtrics XM · experience management
- Salesforce Comms Cloud · CRM
- Amdocs BSS · billing and charging
- ServiceNow CSM · care and field ops
- Snowflake · data warehouse
- Polystar / Cellwize · network performance
- SAP S/4HANA · finance
- Adobe Analytics, Gong, CallMiner · digital & voice
