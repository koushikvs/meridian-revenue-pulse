/* Revenue Drivers page — charts wire-up */
(function () {
  // Small helper to render a color-swatch legend into a DOM element
  function renderLegend(selector, entries) {
    const host = document.querySelector(selector);
    if (!host) return;
    host.innerHTML = entries.map(e => `
      <span class="legend-item">
        <span class="legend-swatch" style="background:${e.color};"></span>
        <span>${e.name}</span>
      </span>`).join('');
  }

  // ARPU by segment over 6 quarters
  const arpuSeries = [
    { name: 'Premium Unlimited', color: '#4DE5FF', points: [['Q1',83.2],['Q2',84.0],['Q3',84.6],['Q4',85.1],['Q5',85.9],['Q6',86.6]].map(p=>({x:p[0],y:p[1]})) },
    { name: 'Standard Postpaid', color: '#FFC857', points: [['Q1',57.9],['Q2',58.0],['Q3',58.2],['Q4',58.3],['Q5',58.1],['Q6',58.0]].map(p=>({x:p[0],y:p[1]})) },
    { name: 'Prepaid',           color: '#A78BFA', points: [['Q1',34.6],['Q2',34.1],['Q3',33.8],['Q4',33.4],['Q5',33.0],['Q6',32.6]].map(p=>({x:p[0],y:p[1]})) },
    { name: 'Fiber HH',          color: '#22C55E', points: [['Q1',66.2],['Q2',67.5],['Q3',68.8],['Q4',70.1],['Q5',70.9],['Q6',71.2]].map(p=>({x:p[0],y:p[1]})) }
  ];
  RPCharts.line('#arpu-chart', arpuSeries, { yMin: 30, yMax: 90, yDecimals: 0, width: 560, height: 240 });
  renderLegend('#arpu-legend', arpuSeries.map(s => ({ name: s.name, color: s.color })));

  // Net adds by product (last 6 quarters, K)
  const netAddsSeries = [
    { name: 'Postpaid Phone', color: '#FF2D5A', values: [180, 220, 145, 110, 85, 140] },
    { name: 'Fiber',           color: '#22C55E', values: [180, 210, 230, 250, 240, 260] },
    { name: 'FWA',             color: '#FFC857', values: [90,  110, 130, 145, 140, 152] },
    { name: 'Prepaid',         color: '#A78BFA', values: [-20, -40, -18, -8,  5,   18] }
  ];
  RPCharts.bars('#netadds-chart',
    ['Q1','Q2','Q3','Q4','Q5','Q6'],
    netAddsSeries,
    { yMax: 320, width: 560, height: 240 }
  );
  renderLegend('#netadds-legend', netAddsSeries.map(s => ({ name: s.name, color: s.color })));

  // B2B pipeline composition
  RPCharts.bars('#b2b-comp',
    ['Connectivity Only','SASE + SD-WAN','Private 5G','Cloud / UCaaS','Security Mgd.','Public Safety'],
    [
      { name: 'Pipeline ($B)', color: '#4DE5FF', values: [1.40, 0.95, 0.80, 0.55, 0.35, 0.15] }
    ],
    { yMax: 1.6, width: 560, height: 180 }
  );

  // Port-out reasons horizontal bars
  RPCharts.hBarList('#port-reasons',
    window.RPData.churnReasons.map(r => ({
      label: r.label, value: r.pct, color: r.color, valueLabel: r.pct + '%'
    })),
    { max: 30, width: 560 }
  );
})();
