# Meridian One × EY Revenue Pulse — Parity Spec

Reference: https://chipper-crostata-c15a80.netlify.app/
Meridian live: https://cro-telco-demo.netlify.app/
Audited: 2026-04-18

## Style decisions (locked)

- Meridian keeps its **dark theme**. Coral (#FF2D5A), cyan (#4DE5FF), gold (#FFC857), purple (#A78BFA), green (#22C55E).
- Meridian's **narrative pivot stays**: "Churn & ARPU defense is a CX problem" for a US Tier-1 quad-play telco CRO. No switching away from telco content.
- **Structural parity** with reference where reference is clearly better; **narrative uniqueness** for everything else.

## Global deltas

1. **Responsive chart fill.** Reference charts scale to panel width. Meridian currently pins SVGs at 560×N, leaving dead space. Fix: SVG gets `width:100%; height:auto; preserveAspectRatio='xMidYMid meet'` and `.chart-wrap` has no fixed height. Charts scale cleanly on wide screens.
2. **Agent color tokens.** Reference assigns a color to each XM agent and carries it through: tile border, thread icon, message sender chip, callout tint. Meridian today uses generic brand colors. Add `--agent-churn`, `--agent-sales`, `--agent-support`, `--agent-onboarding`, `--agent-expansion`, `--agent-research` and use them consistently.
3. **Callout patterns.** Reference uses tinted "insight / synthesis / action taken" cards for narrative emphasis inside content. Meridian has `.attn`, but needs subtypes with clearer visual differentiation.
4. **Master-detail layout primitive.** Only used on Agent Network. Add `.master-detail` / `.master-list` / `.thread-card` / `.thread-card.active` / `.detail-panel` / `.convo-panel` / `.convo-msg` / `.msg-callout` CSS blocks.

## Per-tab deltas

### Summary (index.html) — Polish only
Reference has: 6-stat top bar (already have), forecast radial + bands, deal risk radar table, revenue leakage breakdown, scenario sliders, causal chain visualization, churn evidence, XM agent grid, journey friction by segment table, value chain cards, account watchlist cards, actions list, board-ready block.

Meridian is already dense and telco-flavored. **Change set**: responsive charts, agent colors in any agent grid, widen label columns on wide screens, better `.attn` subtype usage.

### Executive Overview — Polish only
Similar to Summary. **Change set**: responsive charts, consistent panel rhythm.

### Revenue Drivers — Polish only
Already close. **Change set**: responsive charts, legends (in prior patch), widen B2B composition chart width.

### Cost Drivers — Polish only
**Change set**: responsive charts.

### Agent Network — **Structural rewrite (Pass 2)**
Current: grid of agent cards + grid of thread cards + inline detail. Target: 6-agent tile row at top, then master-detail split (left rail = thread list, right = selected thread's full conversation). Conversation = vertical message stream with sender chip, recipient arrow + icons, timestamp, colored callout card.

### My People — Polish + minor restructure (Pass 3)
Reference is NOT master-detail. It's: Top/Bottom 10 table + Mood Monitor + WLB line chart + Manager radar + Sales Rep radar + Training completion. Meridian's current structure is actually close. **Change set**: responsive charts, radar label fix, mood thermometer row polish.

### Board Summary — Polish only
**Change set**: intro-band (already in prior patch), responsive charts.

### Ecosystem — Polish only
**Change set**: spacing, column gaps, layer label weight.

## Build order

- **Pass 1 (now)**: parity-spec, app.css foundations (tokens, master-detail primitives, responsive chart wrap, callout subtypes), charts.js responsive (remove fixed width/height attrs), fold in prior alignment patch. Ship patch zip.
- **Pass 2**: Agent Network rewrite — agent-network/index.html + assets/agent-network.js. Ship patch zip.
- **Pass 3**: My People polish + Summary narrative polish. Ship patch zip.
- **Pass 4**: Revenue Drivers + Cost Drivers + Board Summary + Ecosystem final polish. Ship patch zip.
