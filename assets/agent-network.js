/* Agent Network page — wire-up */
(function () {
  const D = window.RPData;

  // Threads
  document.getElementById('threads').innerHTML = D.threads.map(t => `
    <div class="panel dense" style="${t.active ? 'border-left: 3px solid var(--brand-primary);' : 'border-left: 3px solid var(--brand-hairline);'}">
      <div class="row-between">
        <div class="row gap-10">
          ${t.active ? '<span class="pill pill-bad">LIVE</span>' : '<span class="pill pill-info">SETTLED</span>'}
          <span class="strong" style="font-size: 14px;">${t.title}</span>
        </div>
        <div class="muted" style="font-size: 12px;">
          <span class="mono strong" style="color: var(--brand-accent);">${t.agents}</span> agents ·
          <span class="mono strong" style="color: var(--brand-accent);">${t.msgs}</span> exchanges
        </div>
      </div>
    </div>`).join('');

  // Agent roster
  const sevPill = { 'critical': 'pill-bad', 'warning': 'pill-warn', 'opportunity': 'pill-good' };
  const sevLabel = { 'critical': 'CRITICAL', 'warning': 'WARNING', 'opportunity': 'OPPORTUNITY' };
  document.getElementById('agent-roster').innerHTML = D.agents.map(a => `
    <div class="agent-card panel dense" style="border:1px solid var(--brand-hairline);">
      <div class="row-between">
        <div>
          <div class="strong" style="font-size: 14.5px;">${a.name}</div>
          <div class="muted" style="font-size: 12px; margin-top: 2px;">${a.where}</div>
        </div>
        <span class="pill ${sevPill[a.sev]}">${sevLabel[a.sev]}</span>
      </div>
      <hr class="divider" />
      <div style="font-size: 12.5px; line-height: 1.5;">${a.body}</div>
      <div class="row-between mt-8">
        <span class="muted" style="font-size: 12px;">${a.accts}</span>
        <span class="mono strong" style="color: var(--brand-primary); font-size: 13px;">${a.risk}</span>
      </div>
      <hr class="divider" />
      <div style="font-size: 12px;">
        <span class="muted uc" style="font-size: 10.5px; letter-spacing: 0.1em;">Recommended action</span>
        <div class="mt-4">${a.action}</div>
      </div>
      <div class="muted" style="font-size: 11px; margin-top: 8px;">Signal detected ${a.t}</div>
    </div>`).join('');
})();
