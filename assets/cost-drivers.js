/* Cost Drivers page — wire-up */
(function () {
  const D = window.RPData;

  // Cost donut
  const donutData = D.costs.tree.map(t => ({ label: t.label, value: t.b, color: t.color }));
  RPCharts.donut('#cost-donut', donutData, { size: 280, inner: 80, centerText: '$9.4B', centerSub: 'Total OpEx · FY-26 Q2' });

  // Cost bars (horizontal)
  const rows = D.costs.tree.map(t => ({ label: t.label, value: t.b, color: t.color, valueLabel: '$' + t.b.toFixed(1) + 'B' }));
  RPCharts.hBarList('#cost-bars', rows, { max: 3.5, width: 560, labelWidth: 200 });

  // Tool table
  document.getElementById('tool-tbl').innerHTML = D.costs.toolEngagement.map(t => {
    const opp = t.usage < 60 ? 'Under-adopted · review seat pool' : t.usage > 80 ? 'Strong adoption' : 'Room to grow';
    const c = t.usage < 60 ? 'bad' : t.usage > 80 ? 'good' : 'warn';
    return `<tr>
      <td class="strong">${t.tool}</td>
      <td class="mono">${t.cost}</td>
      <td><div style="display:flex; align-items:center; gap:10px;"><div style="width:140px; background:#0B1020; height: 8px; border-radius: 4px; overflow:hidden;"><div style="width:${t.usage}%; height:100%; background: ${t.usage < 60 ? '#EF4444' : t.usage > 80 ? '#22C55E' : '#FFC857'}"></div></div><span class="mono">${t.usage}%</span></div></td>
      <td class="muted">${t.device}</td>
      <td class="right ${c}">${opp}</td>
    </tr>`;
  }).join('');

  // CX by Segment cards
  const segs = D.costs.cxBySegment;
  const moodPill = { 'Positive': 'pill-good', 'Neutral': 'pill-warn', 'At Risk': 'pill-bad' };
  document.getElementById('cx-segments').innerHTML = segs.map(s => `
    <div class="panel dense hollow" style="border:1px solid var(--brand-hairline);">
      <div class="row-between">
        <span class="strong">${s.seg}</span>
        <span class="pill ${moodPill[s.mood]}">${s.mood}</span>
      </div>
      <div class="row gap-14 mt-8" style="flex-wrap:wrap;">
        <div><div class="muted uc" style="font-size:10px;">NPS</div><div class="mono" style="font-size:17px; font-weight:700;">${s.nps}</div></div>
        <div><div class="muted uc" style="font-size:10px;">CSAT</div><div class="mono" style="font-size:17px; font-weight:700;">${s.csat}/5</div></div>
        <div><div class="muted uc" style="font-size:10px;">Avg CLV</div><div class="mono" style="font-size:17px; font-weight:700;">${s.clv}</div></div>
        <div><div class="muted uc" style="font-size:10px;">n (M)</div><div class="mono" style="font-size:17px; font-weight:700;">${s.n}</div></div>
      </div>
    </div>`).join('');

  // Channel ROI — grouped bar chart
  const categories = D.costs.channelROI.map(c => c.ch);
  RPCharts.bars('#channel-roi',
    categories,
    [
      { name: 'ROI %',      color: '#4DE5FF', values: D.costs.channelROI.map(c => c.roi) },
      { name: 'Revenue ($M)', color: '#FF2D5A', values: D.costs.channelROI.map(c => c.rev * 2) } // scaled for visual parity
    ],
    { yMax: 500, width: 700, height: 280 }
  );

  // Product NPS line
  RPCharts.line('#productnps', D.costs.productNps.series, { yMin: -10, yMax: 70, yDecimals: 0, width: 660, height: 240 });
})();
