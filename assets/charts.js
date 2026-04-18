/* Lightweight SVG chart helpers — no dependencies. */
(function (w) {
  const NS = 'http://www.w3.org/2000/svg';
  function el(tag, attrs) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }
  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }
  function fmtM(v) { return '$' + (Math.round(v)) + 'M'; }

  // ---- Horizontal bar list (used for revenue leakage, churn reasons, etc.)
  function hBarList(target, items, opts) {
    opts = opts || {};
    const node = typeof target === 'string' ? document.querySelector(target) : target;
    if (!node) return;
    const max = opts.max || Math.max.apply(null, items.map(i => i.value));
    const w  = opts.width || 480;
    const rowH = opts.rowHeight || 34;
    const labelW = opts.labelWidth || 230;
    const valueW = 70;
    const barW = w - labelW - valueW - 20;
    const h = items.length * rowH;
    const svg = el('svg', { viewBox: `0 0 ${w} ${h}`, preserveAspectRatio: 'xMidYMid meet' });
    items.forEach((it, i) => {
      const y = i * rowH + 6;
      const pct = it.value / max;
      svg.appendChild(el('text', { x: 0, y: y + 14, fill: 'rgba(185,192,212,0.95)', 'font-size': 12.5 })).textContent = it.label;
      const trackW = barW;
      const track = el('rect', { x: labelW, y: y + 4, width: trackW, height: 12, rx: 4, fill: '#0B1020' });
      svg.appendChild(track);
      const fg = el('rect', { x: labelW, y: y + 4, width: Math.max(4, trackW * pct), height: 12, rx: 4, fill: it.color || 'url(#grad-cr)' });
      svg.appendChild(fg);
      const val = el('text', { x: w - 6, y: y + 14, fill: '#F5F7FB', 'font-size': 12.5, 'font-weight': 600, 'text-anchor': 'end' });
      val.textContent = it.valueLabel || it.value;
      svg.appendChild(val);
    });
    // Gradient def
    const defs = el('defs');
    const grad = el('linearGradient', { id: 'grad-cr', x1: 0, x2: 1 });
    const s1 = el('stop', { offset: 0, 'stop-color': '#FF2D5A' });
    const s2 = el('stop', { offset: 1, 'stop-color': '#4DE5FF' });
    grad.appendChild(s1); grad.appendChild(s2); defs.appendChild(grad); svg.appendChild(defs);
    clear(node); node.appendChild(svg);
  }

  // ---- Donut chart (used for churn reason pie, etc.)
  function donut(target, items, opts) {
    opts = opts || {};
    const node = typeof target === 'string' ? document.querySelector(target) : target;
    if (!node) return;
    const size = opts.size || 200;
    const inner = opts.inner || 58;
    const outer = size / 2 - 4;
    const cx = size / 2, cy = size / 2;
    const total = items.reduce((a, b) => a + b.value, 0);
    let angle = -Math.PI / 2;
    const svg = el('svg', { viewBox: `0 0 ${size} ${size}` });
    items.forEach((it) => {
      const a = (it.value / total) * 2 * Math.PI;
      const large = a > Math.PI ? 1 : 0;
      const x1 = cx + outer * Math.cos(angle);
      const y1 = cy + outer * Math.sin(angle);
      const x2 = cx + outer * Math.cos(angle + a);
      const y2 = cy + outer * Math.sin(angle + a);
      const xi2 = cx + inner * Math.cos(angle + a);
      const yi2 = cy + inner * Math.sin(angle + a);
      const xi1 = cx + inner * Math.cos(angle);
      const yi1 = cy + inner * Math.sin(angle);
      const d = `M ${x1} ${y1} A ${outer} ${outer} 0 ${large} 1 ${x2} ${y2} L ${xi2} ${yi2} A ${inner} ${inner} 0 ${large} 0 ${xi1} ${yi1} Z`;
      const p = el('path', { d, fill: it.color });
      svg.appendChild(p);
      angle += a;
    });
    if (opts.centerText) {
      const t = el('text', { x: cx, y: cy - 2, 'text-anchor': 'middle', fill: '#F5F7FB', 'font-size': 18, 'font-weight': 700 });
      t.textContent = opts.centerText;
      svg.appendChild(t);
    }
    if (opts.centerSub) {
      const t = el('text', { x: cx, y: cy + 16, 'text-anchor': 'middle', fill: '#6E7792', 'font-size': 11 });
      t.textContent = opts.centerSub;
      svg.appendChild(t);
    }
    clear(node); node.appendChild(svg);
  }

  // ---- Line chart (multi-series)
  function line(target, series, opts) {
    opts = opts || {};
    const node = typeof target === 'string' ? document.querySelector(target) : target;
    if (!node) return;
    const w = opts.width || 520, h = opts.height || 220;
    const padL = 36, padR = 12, padT = 14, padB = 28;
    const xs = series[0].points.map(p => p.x);
    const allYs = series.reduce((a, s) => a.concat(s.points.map(p => p.y)), []);
    const ymin = opts.yMin != null ? opts.yMin : Math.min.apply(null, allYs);
    const ymax = opts.yMax != null ? opts.yMax : Math.max.apply(null, allYs);
    const ySpan = (ymax - ymin) || 1;
    const xN = xs.length;
    const xStep = (w - padL - padR) / Math.max(1, xN - 1);
    const y2 = v => padT + (h - padT - padB) * (1 - (v - ymin) / ySpan);
    const x2 = i => padL + i * xStep;

    const svg = el('svg', { viewBox: `0 0 ${w} ${h}`, preserveAspectRatio: 'xMidYMid meet' });

    // gridlines
    const gridCount = 4;
    for (let g = 0; g <= gridCount; g++) {
      const yy = padT + (h - padT - padB) * (g / gridCount);
      svg.appendChild(el('line', { x1: padL, x2: w - padR, y1: yy, y2: yy, stroke: 'rgba(255,255,255,0.05)' }));
      const val = ymax - (ymax - ymin) * (g / gridCount);
      const t = el('text', { x: padL - 6, y: yy + 4, 'text-anchor': 'end', fill: '#6E7792', 'font-size': 10 });
      t.textContent = val.toFixed(opts.yDecimals || 0);
      svg.appendChild(t);
    }

    // x labels
    xs.forEach((x, i) => {
      const t = el('text', { x: x2(i), y: h - 8, 'text-anchor': 'middle', fill: '#6E7792', 'font-size': 10 });
      t.textContent = x;
      svg.appendChild(t);
    });

    // series lines
    series.forEach((s, si) => {
      const d = s.points.map((p, i) => `${i ? 'L' : 'M'} ${x2(i)} ${y2(p.y)}`).join(' ');
      svg.appendChild(el('path', { d, fill: 'none', stroke: s.color, 'stroke-width': 2 }));
      s.points.forEach((p, i) => {
        svg.appendChild(el('circle', { cx: x2(i), cy: y2(p.y), r: 3, fill: s.color }));
      });
    });

    clear(node); node.appendChild(svg);
  }

  // ---- Grouped / stacked bar
  function bars(target, categories, series, opts) {
    opts = opts || {};
    const node = typeof target === 'string' ? document.querySelector(target) : target;
    if (!node) return;
    const w = opts.width || 520, h = opts.height || 220;
    const padL = 36, padR = 12, padT = 10, padB = 26;
    const nCat = categories.length;
    const groupW = (w - padL - padR) / nCat;
    const barGap = 4;
    const nSer = series.length;
    const barW = Math.max(6, (groupW - barGap * (nSer + 1)) / nSer);
    const allYs = series.reduce((a, s) => a.concat(s.values), []);
    const ymax = opts.yMax || Math.max.apply(null, allYs) * 1.1;
    const y2 = v => padT + (h - padT - padB) * (1 - v / ymax);

    const svg = el('svg', { viewBox: `0 0 ${w} ${h}`, preserveAspectRatio: 'xMidYMid meet' });
    for (let g = 0; g <= 4; g++) {
      const yy = padT + (h - padT - padB) * (g / 4);
      svg.appendChild(el('line', { x1: padL, x2: w - padR, y1: yy, y2: yy, stroke: 'rgba(255,255,255,0.05)' }));
    }

    categories.forEach((c, ci) => {
      const gx = padL + ci * groupW + barGap;
      series.forEach((s, si) => {
        const v = s.values[ci];
        const bx = gx + si * (barW + barGap);
        const by = y2(v);
        svg.appendChild(el('rect', { x: bx, y: by, width: barW, height: Math.max(1, y2(0) - by), rx: 2, fill: s.color }));
      });
      const t = el('text', { x: padL + ci * groupW + groupW / 2, y: h - 8, 'text-anchor': 'middle', fill: '#6E7792', 'font-size': 10 });
      t.textContent = c;
      svg.appendChild(t);
    });

    clear(node); node.appendChild(svg);
  }

  // ---- Radar chart (manager attributes)
  function radar(target, axes, series, opts) {
    opts = opts || {};
    const node = typeof target === 'string' ? document.querySelector(target) : target;
    if (!node) return;
    const size = opts.size || 280;
    const cx = size / 2, cy = size / 2;
    const R = size / 2 - 30;
    const n = axes.length;
    // Expand viewBox to include padding for axis labels that extend outside size.
    const pad = 52;
    const svg = el('svg', { viewBox: `${-pad} ${-pad} ${size + pad * 2} ${size + pad * 2}`, preserveAspectRatio: 'xMidYMid meet' });
    // grid
    for (let r = 1; r <= 4; r++) {
      const rr = R * (r / 4);
      const pts = [];
      for (let i = 0; i < n; i++) {
        const a = -Math.PI / 2 + i * (2 * Math.PI / n);
        pts.push(`${cx + rr * Math.cos(a)},${cy + rr * Math.sin(a)}`);
      }
      svg.appendChild(el('polygon', { points: pts.join(' '), fill: 'none', stroke: 'rgba(255,255,255,0.06)' }));
    }
    // axis labels — dynamic text-anchor keeps labels aligned inward from the ring
    axes.forEach((label, i) => {
      const a = -Math.PI / 2 + i * (2 * Math.PI / n);
      const lx = cx + (R + 20) * Math.cos(a);
      const ly = cy + (R + 20) * Math.sin(a) + 3;
      const cosA = Math.cos(a);
      let anchor = 'middle';
      if (cosA > 0.3) anchor = 'start';
      else if (cosA < -0.3) anchor = 'end';
      const t = el('text', { x: lx, y: ly, 'text-anchor': anchor, fill: '#B9C0D4', 'font-size': 10.5 });
      t.textContent = label;
      svg.appendChild(t);
    });
    // series
    series.forEach((s) => {
      const pts = [];
      s.values.forEach((v, i) => {
        const a = -Math.PI / 2 + i * (2 * Math.PI / n);
        const rr = R * (v / (s.max || 100));
        pts.push(`${cx + rr * Math.cos(a)},${cy + rr * Math.sin(a)}`);
      });
      svg.appendChild(el('polygon', { points: pts.join(' '), fill: s.fill || 'rgba(77,229,255,0.12)', stroke: s.color, 'stroke-width': 2 }));
    });
    clear(node); node.appendChild(svg);
  }

  // ---- Heatmap (journey friction by segment)
  function heatmap(target, rows, cols, values, opts) {
    opts = opts || {};
    const node = typeof target === 'string' ? document.querySelector(target) : target;
    if (!node) return;
    function color(v) {
      // v in 0-10; we color low values red, high green
      const t = Math.max(0, Math.min(1, (v - 2) / 7));
      const r = Math.round(239 - (239 - 34) * t);
      const g = Math.round(68 + (197 - 68) * t);
      const b = Math.round(68 + (94 - 68) * t);
      return `rgba(${r},${g},${b},0.28)`;
    }
    function tc(v) {
      const t = Math.max(0, Math.min(1, (v - 2) / 7));
      const r = Math.round(239 - (239 - 34) * t);
      const g = Math.round(68 + (197 - 68) * t);
      const b = Math.round(68 + (94 - 68) * t);
      return `rgb(${r},${g},${b})`;
    }
    const table = document.createElement('table');
    table.className = 'tbl';
    table.style.tableLayout = 'fixed';
    const thead = document.createElement('thead');
    const trh = document.createElement('tr');
    trh.innerHTML = `<th style="width:140px">Segment</th><th class="right" style="width:80px">Avg CLV</th>` + cols.map(c => `<th class="right">${c}</th>`).join('');
    thead.appendChild(trh); table.appendChild(thead);
    const tbody = document.createElement('tbody');
    rows.forEach((rName, ri) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td class="strong">${rName}</td><td class="right">${opts.clv[ri]}</td>` +
        values[ri].map(v => `<td class="right"><span class="heat" style="background:${color(v)}; color:${tc(v)}">${v.toFixed(1)}</span></td>`).join('');
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    clear(node); node.appendChild(table);
  }

  // ---- Sentiment thermometer (used in mood monitor)
  function thermo(target, value, label, opts) {
    opts = opts || {};
    const node = typeof target === 'string' ? document.querySelector(target) : target;
    if (!node) return;
    const v = Math.max(0, Math.min(100, value));
    const t = v / 100;
    let color = '#6E7792';
    let tag = 'COLD';
    if (t >= 0.8) { color = '#EF4444'; tag = 'VERY HOT'; }
    else if (t >= 0.6) { color = '#F59E0B'; tag = 'HOT'; }
    else if (t >= 0.4) { color = '#FFC857'; tag = 'WARM'; }
    else if (t >= 0.2) { color = '#60A5FA'; tag = 'COOL'; }
    node.innerHTML = `
      <div style="font-size:11px; color: var(--text-lo); text-transform:uppercase; letter-spacing:.1em; font-weight:600;">${label}</div>
      <div style="font-size:22px; font-weight:700; margin-top:2px;">${v}%</div>
      <div style="font-size:11px; font-weight:700; color:${color}; letter-spacing:.1em;">${tag}</div>
      <div style="background:#0B1020; height:6px; border-radius:3px; margin-top:6px;">
        <div style="width:${v}%; height:100%; border-radius:3px; background: ${color};"></div>
      </div>
    `;
  }

  w.RPCharts = { hBarList, donut, line, bars, radar, heatmap, thermo };
})(window);
