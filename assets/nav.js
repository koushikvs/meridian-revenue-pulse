/* Shared nav shell — injected into every page. */
(function () {
  const path = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';

  // Primary tabs (top-level product tabs)
  const primary = [
    { id: 'hero',   label: 'Revenue Pulse', href: '/',                 tag: 'DEMO',  tagClass: 'tag-demo'  },
    { id: 'exec',   label: 'Executive Overview', href: '/executive-overview/' },
    { id: 'board',  label: 'Board Summary', href: '/board-summary/',   tag: 'CANVA', tagClass: 'tag-canva' },
    { id: 'agents', label: 'Agent Network', href: '/agent-network/',   tag: 'AI',    tagClass: 'tag-ai'    },
    { id: 'eco',    label: 'Ecosystem',     href: '/ecosystem/',       tag: 'AI',    tagClass: 'tag-ai'    }
  ];

  // Sub-tabs under Executive Overview
  const execSub = [
    { id: 'summary',  label: 'Summary',         href: '/executive-overview/' },
    { id: 'revenue',  label: 'Revenue Drivers', href: '/revenue-drivers/'    },
    { id: 'cost',     label: 'Cost Drivers',    href: '/cost-drivers/'       },
    { id: 'people',   label: 'My People',       href: '/my-people/'          }
  ];

  function isActivePrimary(href) {
    // Hero/DEMO tab: never visually active (branding only, matches original)
    if (href === '/') return false;
    if (href === '/executive-overview/') {
      return path === '/' || path === '' || path === '/executive-overview'
          || path === '/revenue-drivers' || path === '/cost-drivers'
          || path === '/my-people';
    }
    return path === href.replace(/\/$/, '');
  }
  function isActiveSub(href) {
    const p = path || '/';
    return p === href.replace(/\/$/, '') ||
           (href === '/executive-overview/' && (p === '/executive-overview' || p === '/'));
  }

  // Top brand bar
  const topbar = `
    <div class="topbar">
      <div class="shell topbar-inner">
        <a class="brand-mark" href="/">
          <span class="dot"></span>
          <span>
            Revenue Pulse
            <small>Meridian One · CRO Decision Engine</small>
          </span>
        </a>
        <div class="nav-spacer"></div>
        <button class="nav-icon" title="Alerts">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
        </button>
        <span class="nav-user">
          <span class="avatar">JM</span>
          Welcome, John
        </span>
        <button class="nav-icon" title="Menu">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </div>
    </div>`;

  // KPI ribbon — US Tier-1 converged quad-play KPIs
  const ribbon = `
    <div class="kpi-ribbon">
      <div class="shell kpi-ribbon-inner">
        <div class="kpi-label-anchor">DATA FOR<br/>FY-26 · Q2</div>
        <div class="kpi-cell"><div class="k-lbl">Service Revenue</div><div class="k-val mono">$11.8B <span class="k-delta up">▲ 4.2%</span></div></div>
        <div class="kpi-cell"><div class="k-lbl">Wireless ARPU</div>  <div class="k-val mono">$58.10 <span class="k-delta up">▲ 2.1%</span></div></div>
        <div class="kpi-cell"><div class="k-lbl">Postpaid Churn</div> <div class="k-val mono">1.14% <span class="k-delta down">▲ 14bps</span></div></div>
        <div class="kpi-cell"><div class="k-lbl">Broadband Net Adds</div><div class="k-val mono">+412K <span class="k-delta up">▲ 18%</span></div></div>
        <div class="kpi-cell"><div class="k-lbl">FMC Households</div> <div class="k-val mono">28.4% <span class="k-delta up">▲ 1.9pp</span></div></div>
        <div class="kpi-cell"><div class="k-lbl">Network NPS</div>    <div class="k-val mono">+51 <span class="k-delta down">▲ 2pts</span></div></div>
      </div>
    </div>`;

  // Primary tabs row
  const pTabs = primary.map(t => {
    const active = isActivePrimary(t.href) ? 'active' : '';
    const tag = t.tag ? `<span class="tag ${t.tagClass}">${t.tag}</span>` : '';
    return `<a class="${active}" href="${t.href}">${t.label}${tag}</a>`;
  }).join('');

  const tabbar = `
    <div class="tabbar">
      <div class="shell tabbar-inner">${pTabs}</div>
    </div>`;

  // Sub-tabs only on Executive Overview routes
  const execRoutes = ['/', '/executive-overview', '/revenue-drivers', '/cost-drivers', '/my-people'];
  let subtabs = '';
  if (execRoutes.includes(path)) {
    const sub = execSub.map(t => {
      const isActive = isActiveSub(t.href) ? 'active' : '';
      return `<a class="${isActive}" href="${t.href}">${t.label}</a>`;
    }).join('');
    subtabs = `<div class="shell"><div class="subtabs">${sub}</div></div>`;
  }

  document.getElementById('__nav__').innerHTML = topbar + ribbon + tabbar + subtabs;

  // Floating chat FAB (decorative)
  const fab = document.createElement('button');
  fab.className = 'chat-fab';
  fab.title = 'Ask the AI';
  fab.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  document.body.appendChild(fab);
})();
