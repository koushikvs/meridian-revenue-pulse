/* Board Summary page — wire-up */
(function () {
  const B = window.RPData.board;

  // Assessment
  document.getElementById('board-assessment').textContent = B.assessment;

  // Metrics
  document.getElementById('board-metrics').innerHTML = B.metrics.map(m => `
    <div class="panel dense hollow" style="border:1px solid var(--brand-hairline);">
      <div class="muted uc" style="font-size:10.5px;">${m.l}</div>
      <div class="big mono" style="margin-top:4px;">${m.v}</div>
      <div class="muted" style="font-size:11.5px; margin-top:4px;">${m.d}</div>
    </div>`).join('');

  // Wins & challenges
  document.getElementById('board-wins').innerHTML = B.wins.map(w => `
    <div class="panel dense hollow" style="border-left: 3px solid var(--status-good); background: rgba(34,197,94,0.04);">
      <div style="font-size: 13.5px; line-height: 1.5;">${w}</div>
    </div>`).join('');

  document.getElementById('board-challenges').innerHTML = B.challenges.map(c => `
    <div class="panel dense hollow" style="border-left: 3px solid var(--status-bad); background: rgba(239,68,68,0.04);">
      <div style="font-size: 13.5px; line-height: 1.5;">${c}</div>
    </div>`).join('');

  // Revenue bridge — simple visual stack with arrows
  document.getElementById('board-bridge').innerHTML = B.bridge.map((b, i) => {
    const isAnchor = !b.dir;
    const color = b.dir === 'up' ? 'var(--status-good)' : b.dir === 'down' ? 'var(--status-bad)' : 'var(--brand-accent)';
    const bg    = b.dir === 'up' ? 'rgba(34,197,94,0.06)' : b.dir === 'down' ? 'rgba(239,68,68,0.06)' : 'rgba(77,229,255,0.06)';
    const arrow = b.dir === 'up' ? '▲' : b.dir === 'down' ? '▼' : '•';
    return `
      <div class="row-between panel dense hollow" style="border-left: 3px solid ${color}; background: ${bg};">
        <div class="row gap-10">
          <span style="color:${color}; font-size:16px;">${arrow}</span>
          <div>
            <div class="strong" style="font-size:14px;">${b.label}</div>
            ${b.pct ? `<div class="muted" style="font-size:11.5px;">${b.pct}</div>` : ''}
          </div>
        </div>
        <div class="mono strong" style="font-size:16px; color:${color};">${b.v}</div>
      </div>`;
  }).join('');

  // Risks table
  document.getElementById('board-risks').innerHTML = B.risks.map(r => `
    <tr>
      <td style="font-size: 13px; line-height: 1.5;">${r.risk}</td>
      <td class="muted" style="font-size: 12.5px; line-height: 1.5;">${r.mit}</td>
      <td style="font-size: 12.5px;">${r.owner}</td>
    </tr>`).join('');

  // Asks
  const pillClass = { 'CRITICAL': 'pill-bad', 'HIGH': 'pill-warn', 'MEDIUM': 'pill-info' };
  document.getElementById('board-asks').innerHTML = B.asks.map(a => `
    <div class="panel dense" style="border-left: 3px solid var(--brand-primary);">
      <div class="row-between">
        <div class="row gap-10"><span class="pill ${pillClass[a.p] || 'pill-info'}">${a.p}</span><span class="strong">${a.title}</span></div>
        <span class="mono strong" style="color: var(--brand-accent);">${a.invest}</span>
      </div>
      <div class="muted mt-8" style="font-size: 12.5px;">Impact: ${a.impact}</div>
    </div>`).join('');

  // Sources
  document.getElementById('board-sources').innerHTML = B.sources.map(s => `
    <div class="panel dense hollow" style="border:1px solid var(--brand-hairline);">
      <div class="strong" style="font-size:13.5px;">${s.t}</div>
      <div class="muted uc" style="font-size:10.5px; margin-top: 4px;">${s.s}</div>
    </div>`).join('');
})();
