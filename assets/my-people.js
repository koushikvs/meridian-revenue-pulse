/* My People page — wire-up */
(function () {
  const D = window.RPData;
  const P = D.people;

  // ---- Top performers table
  const accountsByRep = {
    'Amara Washington': 'Delta Energy · Allegiance Fin.',
    'Ravi Mendez':      'NorthState Health · 4 more',
    'Keshawn Oyelade':  'Pacific Logistics · SMB book',
    'Sophia Marchetti': 'Fortune-500 renewals · 6',
    'Duante Lewis':     'Metro USD · PubSec book'
  };
  document.getElementById('rep-tbl').innerHTML = P.topReps.map(r => {
    const tvs = parseInt(r.tvsA, 10);
    const tvsClass = tvs >= 100 ? 'good' : tvs >= 95 ? 'warn' : 'bad';
    const collabClass = r.collab >= 90 ? 'good' : r.collab >= 80 ? 'warn' : 'bad';
    const expClass = r.exp >= 90 ? 'good' : r.exp >= 80 ? 'warn' : 'bad';
    return `<tr>
      <td class="strong">${r.name}</td>
      <td class="right mono ${tvsClass}">${r.tvsA}</td>
      <td class="right mono">${r.rev}</td>
      <td class="right mono ${collabClass}">${r.collab}</td>
      <td class="right mono ${expClass}">${r.exp}</td>
      <td class="muted" style="font-size:12px;">${accountsByRep[r.name] || '—'}</td>
    </tr>`;
  }).join('');

  // ---- Mood monitor (5 thermometers)
  const moodGrid = document.getElementById('mood-grid');
  moodGrid.innerHTML = P.mood.map((m, i) => `<div id="mood-${i}" class="panel dense hollow" style="border:1px solid var(--brand-hairline);"></div>`).join('');
  P.mood.forEach((m, i) => RPCharts.thermo('#mood-' + i, m.v, m.label));

  // ---- Work-life balance line chart
  RPCharts.line('#wlb-chart', P.wlb.series, {
    yMin: 0, yMax: 60, yDecimals: 0,
    width: 780, height: 240,
    xTicks: P.wlb.months
  });

  // ---- Manager radar (3 series: top/middle/bottom)
  RPCharts.radar('#mgr-radar',
    P.managerRadar.axes,
    [P.managerRadar.top, P.managerRadar.middle, P.managerRadar.bottom],
    { size: 380, levels: 4 }
  );
})();
