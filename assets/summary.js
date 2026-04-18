/* Summary page wire-up — populates all dynamic panels from RPData. */
(function () {
  const D = window.RPData;

  /* -- AI forecast narrative -- */
  document.getElementById('forecast-narr').innerHTML = D.forecast.narrative;

  /* -- Gauges (target, confidence, accuracy) -- */
  function gauge(elId, value, color) {
    const v = value;
    const host = document.getElementById(elId);
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 100 60');
    // track
    const track = document.createElementNS(svgNS, 'path');
    track.setAttribute('d', 'M 8 55 A 42 42 0 0 1 92 55');
    track.setAttribute('stroke', 'rgba(255,255,255,0.06)');
    track.setAttribute('stroke-width', '10');
    track.setAttribute('stroke-linecap', 'round');
    track.setAttribute('fill', 'none');
    svg.appendChild(track);
    // arc
    const arc = document.createElementNS(svgNS, 'path');
    const total = Math.PI * 42;
    const dash = total * (v / 100);
    arc.setAttribute('d', 'M 8 55 A 42 42 0 0 1 92 55');
    arc.setAttribute('stroke', color);
    arc.setAttribute('stroke-width', '10');
    arc.setAttribute('stroke-linecap', 'round');
    arc.setAttribute('fill', 'none');
    arc.setAttribute('stroke-dasharray', `${dash} ${total}`);
    svg.appendChild(arc);
    // val text
    const t = document.createElementNS(svgNS, 'text');
    t.setAttribute('x', 50); t.setAttribute('y', 50);
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('fill', '#F5F7FB');
    t.setAttribute('font-size', 18); t.setAttribute('font-weight', 700);
    t.textContent = v + '%';
    svg.appendChild(t);
    host.innerHTML = ''; host.appendChild(svg);
  }
  gauge('g-attain', D.forecast.attainment, '#22C55E');
  gauge('g-conf',   D.forecast.confidence, '#FFC857');
  gauge('g-acc',    D.forecast.accuracy,   '#FFC857');

  /* -- Deal risk radar table -- */
  const tbody = document.querySelector('#deal-radar tbody');
  tbody.innerHTML = D.dealRadar.map(d => {
    const s = d.score >= 55 ? 'md' : (d.score >= 40 ? 'md' : 'lo');
    return `<tr>
      <td class="strong">${d.account}</td>
      <td><span class="seg seg-biz">${d.segment}</span></td>
      <td class="right strong">${d.value}</td>
      <td>${d.stage}</td>
      <td class="right">${d.days}d</td>
      <td class="right"><span class="score ${s}">${d.score}</span></td>
      <td style="max-width: 280px; color: var(--text-md);">${d.signal}</td>
      <td class="muted">${d.rep}</td>
      <td class="muted" style="max-width: 240px;">${d.next}</td>
    </tr>`;
  }).join('');

  /* -- Leakage bar list -- */
  const leakItems = D.leakage.drivers.map(d => ({
    label: d.label, value: d.value, color: d.color, valueLabel: '$' + d.value + 'M · ' + d.pct + '%'
  }));
  RPCharts.hBarList('#leakage-bars', leakItems, { max: 70, width: 560 });

  /* -- Scenario simulator -- */
  function recalc() {
    const churn = +document.querySelector('[data-sim="churn"]').value / 100;   // e.g. 1.14
    const arpu  = +document.querySelector('[data-sim="arpu"]').value / 100;    // e.g. 58.10
    const bb    = +document.querySelector('[data-sim="bb"]').value;             // e.g. 412 (k)
    const fmc   = +document.querySelector('[data-sim="fmc"]').value;            // 28
    const wr    = +document.querySelector('[data-sim="winrate"]').value;        // 38
    document.querySelector('[data-out="churn"]').textContent   = churn.toFixed(2);
    document.querySelector('[data-out="arpu"]').textContent    = arpu.toFixed(2);
    document.querySelector('[data-out="bb"]').textContent      = bb;
    document.querySelector('[data-out="fmc"]').textContent     = fmc;
    document.querySelector('[data-out="winrate"]').textContent = wr;

    // Toy model — sensitivities tuned to produce visible-but-plausible deltas.
    // Base forecast $11.80B
    const base = 11.80;
    const churnDelta = (1.14 - churn) * 0.30;        // 10bps => +$30M
    const arpuDelta  = (arpu - 58.10) * 0.055;       // $1 ARPU => +$55M
    const bbDelta    = (bb - 412) / 1000 * 0.22;     // 100k => +$22M
    const fmcDelta   = (fmc - 28) * 0.015;           // 1pp => +$15M
    const wrDelta    = (wr - 38) * 0.014;            // 1pp => +$14M
    const total = base + churnDelta + arpuDelta + bbDelta + fmcDelta + wrDelta;
    const delta = total - base;
    document.getElementById('sim-total').textContent = '$' + total.toFixed(2) + 'B';
    const el = document.getElementById('sim-delta');
    el.textContent = (delta >= 0 ? '+' : '') + '$' + delta.toFixed(2) + 'B';
    el.style.color = delta >= 0 ? 'var(--status-good)' : 'var(--status-bad)';
  }
  document.querySelectorAll('#sim-body input').forEach(i => i.addEventListener('input', recalc));
  recalc();

  /* -- Causal chain -- */
  const chain = document.getElementById('causal-chain');
  chain.innerHTML = D.causalChain.map(c => {
    let klass = '';
    if (c.tone === 'critical') klass = 'critical';
    else if (c.tone === 'warn') klass = 'warn';
    const color = c.score < 5.5 ? 'var(--status-bad)' : c.score < 6.5 ? 'var(--status-warn)' : 'var(--status-good)';
    return `<div class="chain-node ${klass}">
      <div class="stage">${c.stage}</div>
      <div class="score-num" style="color:${color}">${c.score.toFixed(1)}</div>
      <div class="muted" style="font-size: 11.5px; margin-top: 4px;">${c.note}</div>
    </div>`;
  }).join('');

  /* -- CSAT bars -- */
  const csatHtml = D.churnByCsat.map(row => `
    <div class="row gap-10" style="margin: 6px 0;">
      <div style="width: 110px; color: var(--text-md); font-size:12.5px;">${row.band}</div>
      <div style="flex:1; background: #0B1020; height: 16px; border-radius: 6px; overflow:hidden;">
        <div style="width:${row.pct * 2}%; height: 100%; background: ${row.pct > 20 ? '#FF2D5A' : row.pct > 10 ? '#FFC857' : '#22C55E'};"></div>
      </div>
      <div class="mono" style="width: 40px; text-align: right; color: var(--text-hi); font-weight:600;">${row.pct}%</div>
      <div class="muted mono" style="width: 66px; text-align: right; font-size: 11.5px;">${row.n} cohorts</div>
    </div>`).join('');
  document.getElementById('csat-bars').innerHTML = csatHtml;

  /* -- Churn donut -- */
  RPCharts.donut('#churn-donut', D.churnReasons.map(r => ({ value: r.pct, color: r.color })), {
    size: 180, inner: 58, centerText: '65%', centerSub: 'Experience-driven'
  });
  document.getElementById('churn-legend').innerHTML = D.churnReasons.map(r => `
    <div class="row" style="justify-content: space-between; padding: 3px 0; font-size: 12.5px;">
      <span class="row gap-6"><span class="legend-dot" style="background:${r.color}"></span>${r.label}</span>
      <span class="mono strong">${r.pct}%</span>
    </div>`).join('');

  /* -- Mini journey risk map -- */
  const mini = D.causalChain.map(c => {
    const color = c.score < 5.5 ? 'var(--status-bad)' : c.score < 6.5 ? 'var(--status-warn)' : 'var(--status-good)';
    return `<div style="background: var(--brand-elevated); border: 1px solid var(--brand-hairline); border-radius: 8px; padding: 10px;">
      <div class="muted" style="font-size: 11px; font-weight: 600;">${c.stage}</div>
      <div class="mono" style="font-size: 18px; font-weight: 700; color: ${color}; margin-top: 2px;">${c.score.toFixed(1)}</div>
    </div>`;
  }).join('');
  document.getElementById('journey-heat-mini').innerHTML = mini;

  /* -- Agent cards -- */
  const sevColor = { critical: 'var(--status-bad)', warning: 'var(--status-warn)', opportunity: 'var(--status-good)' };
  const sevPill  = { critical: 'pill-bad', warning: 'pill-warn', opportunity: 'pill-good' };
  document.getElementById('agent-grid').innerHTML = D.agents.map(a => `
    <div class="agent-card">
      <div class="meta">
        <span class="pill ${sevPill[a.sev]}">${a.sev.toUpperCase()}</span>
        <span class="muted">${a.where}</span>
        <span class="muted" style="margin-left:auto;">${a.t}</span>
      </div>
      <h4>${a.name}</h4>
      <div class="body">${a.body}</div>
      <div class="risk"><span style="color:${sevColor[a.sev]};">${a.risk}</span><span class="muted" style="margin-left:auto;">${a.accts}</span></div>
      <div class="action">▸ ${a.action}</div>
    </div>`).join('');

  /* -- Journey heatmap (full segment x lifecycle) -- */
  RPCharts.heatmap(
    '#journey-heat',
    D.journeyHeatmap.rows,
    D.journeyHeatmap.cols,
    D.journeyHeatmap.values,
    { clv: D.journeyHeatmap.clv }
  );

  /* -- Value chain tiles -- */
  const statusPill = { 'Critical': 'pill-bad', 'Needs Attention': 'pill-warn', 'On Track': 'pill-good', 'Improved vs Q1': 'pill-good' };
  document.getElementById('value-chain').innerHTML = D.valueChain.map(f => `
    <div class="panel dense">
      <div class="muted uc" style="font-size: 10.5px;">${f.fn}</div>
      <div class="row-between" style="margin-top: 6px;"><span class="pill ${statusPill[f.status] || 'pill-warn'}">${f.status}</span></div>
      <div class="stack" style="gap: 2px; margin-top: 10px;">
        ${f.metrics.map(m => `<div class="row-between" style="font-size:12.5px;"><span class="muted">${m.k}</span><span class="strong mono">${m.v}</span></div>`).join('')}
      </div>
      <div class="muted mt-12" style="font-size:11px; padding-top: 8px; border-top: 1px solid var(--brand-divider);">${f.owner}</div>
      <div class="muted" style="font-size: 10.5px;">${f.trend}</div>
    </div>`).join('');

  /* -- Watchlist -- */
  document.getElementById('watchlist').innerHTML = D.watchlist.map(w => {
    const klass = w.score >= 85 ? 'hi' : w.score >= 75 ? 'md' : 'lo';
    const segC = w.seg.includes('Enterprise') ? 'seg-biz' : w.seg.includes('Public') ? 'seg-home' : 'seg-prepaid';
    return `<div class="panel dense row" style="gap: 14px;">
      <div class="risk-tile ${klass}">${w.score}</div>
      <div style="flex: 1.3;">
        <div class="row gap-10"><strong>${w.name}</strong><span class="seg ${segC}">${w.seg}</span></div>
        <div class="muted" style="font-size: 12px; margin-top: 2px;">${w.reason}</div>
      </div>
      <div class="tar"><div class="muted" style="font-size:11px;">ACV</div><div class="mono strong">${w.acv}</div></div>
      <div class="tar"><div class="muted" style="font-size:11px;">NPS</div><div class="mono" style="font-weight:600;">${w.nps} <span class="bad" style="font-size:11px;">${w.npsDelta} pts</span></div></div>
      <div class="tar"><div class="muted" style="font-size:11px;">Last Contact</div><div class="mono">${w.days}d</div></div>
      <div class="tar"><div class="muted" style="font-size:11px;">Renews</div><div class="mono">${w.renews}</div></div>
      <button class="pill pill-info" style="border:none;">Call →</button>
    </div>`;
  }).join('');

  /* -- Actions -- */
  const aStatus = { inprog: ['In Progress','astat inprog'], notstart: ['Not Started','astat notstart'], blocked: ['Blocked','astat blocked'], done: ['Done','astat done'] };
  document.getElementById('actions').innerHTML = D.actions.map(a => {
    const s = aStatus[a.status];
    return `<div class="panel dense row" style="gap:14px;">
      <span class="${s[1]}">${s[0]}</span>
      <div style="flex: 1.5;">
        <div class="strong">${a.title}</div>
        <div class="muted" style="font-size: 12px; margin-top: 2px;">${a.body}</div>
      </div>
      <div class="tar"><div class="muted" style="font-size:11px;">Owner</div><div style="font-size: 12.5px;">${a.owner}</div></div>
      <div class="tar"><div class="muted" style="font-size:11px;">Due</div><div class="mono">${a.due}</div></div>
      <div class="tar"><div class="muted" style="font-size:11px;">Impact</div><div class="mono strong" style="color: var(--status-good);">${a.impact}</div></div>
    </div>`;
  }).join('');

  /* -- Board mini metrics -- */
  document.getElementById('board-mini').innerHTML = D.board.metrics.map(m => `
    <div class="board-metric">
      <div class="l">${m.l}</div>
      <div class="v mono">${m.v}</div>
      <div class="d">${m.d}</div>
    </div>`).join('');
})();
