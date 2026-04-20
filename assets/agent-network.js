/* Agent Network — master-detail wire-up (Pass 2).
   Renders the agent roster + active thread list in the left rail,
   and the selected thread as a structured conversation in the right pane. */
(function () {
  const D = window.RPData;
  const agents  = D.agents        || [];
  const threads = D.agentThreads  || [];

  /* Map long agent name → short key used for color tokens + chips */
  const agentKey = {
    'Churn Prevention Agent':       'churn',
    'Bill-Shock Prevention Agent':  'support',
    'Fiber Activation Agent':       'onboarding',
    'Network Experience Agent':     'research',
    'B2B Renewal Agent':            'expansion',
    'FMC Cross-Sell Agent':         'sales'
  };
  const agentInitials = {
    churn:      'CP',
    support:    'BS',
    onboarding: 'FA',
    research:   'NE',
    expansion:  'B2',
    sales:      'FM'
  };
  const agentSpeaker = {
    churn:      'Churn Prevention',
    support:    'Bill-Shock Prevention',
    onboarding: 'Fiber Activation',
    research:   'Network Experience',
    expansion:  'B2B Renewal',
    sales:      'FMC Cross-Sell'
  };

  const sevPill  = { 'critical': 'pill-bad',  'warning': 'pill-warn', 'opportunity': 'pill-good' };
  const sevLabel = { 'critical': 'CRITICAL',  'warning': 'WARNING',    'opportunity': 'OPPORTUNITY' };
  const priPill  = { 'high': 'pill-bad',       'medium': 'pill-warn',  'low': 'pill-info' };
  const statLbl  = { 'active': 'ACTIVE',       'resolved': 'RESOLVED' };

  /* ---------- 1. Agent roster tiles ---------- */
  const rosterHtml = agents.map(a => {
    const k = agentKey[a.name] || 'research';
    return `
      <div class="agent-tile ${k}">
        <div class="agent-row">
          <span class="agent-icon">${agentInitials[k]}</span>
          <span class="agent-name">${a.name.replace(' Agent','')}</span>
          <span class="agent-status"></span>
        </div>
        <div class="agent-desc">${a.where}</div>
        <div class="row-between" style="margin-top: 8px;">
          <span class="pill ${sevPill[a.sev]}" style="font-size: 10px;">${sevLabel[a.sev]}</span>
          <span class="mono strong" style="font-size: 12px; color: var(--brand-primary);">${a.risk}</span>
        </div>
      </div>
    `;
  }).join('');

  /* ---------- 2. Thread list (left rail, below roster) ---------- */
  const threadListHtml = threads.map((t, i) => {
    const chips = (t.participants || []).slice(0, 4).map(p =>
      `<span class="ag-chip ag-${p}">${agentInitials[p]}</span>`
    ).join('');
    const isActive = i === 0 ? 'active' : '';
    return `
      <div class="thread-card ${t.status} ${isActive}" data-idx="${i}">
        <div class="tc-title">${t.title}</div>
        <div class="tc-meta">
          <span class="tc-agents">${chips}</span>
          <span class="tc-count">${(t.messages || []).length} msgs</span>
          <span class="tc-status-dot"></span>
        </div>
        <div class="muted" style="font-size: 11.5px; margin-top: 6px;">${t.preview}</div>
      </div>
    `;
  }).join('');

  /* ---------- 3. Conversation detail (right pane) ---------- */
  function renderDetail(idx) {
    const t = threads[idx];
    if (!t) return '<div class="muted">Select a thread to view the conversation.</div>';

    const participantChips = (t.participants || []).map(p =>
      `<span class="ag-chip ag-${p}">${agentInitials[p]}</span>`
    ).join('');

    const msgs = (t.messages || []).map(m => {
      const recipients = (m.recipients || []).map(r =>
        `<span class="ag-chip ag-${r}">${agentInitials[r]}</span>`
      ).join('');
      const callouts = (m.callouts || []).map(c => `
        <div class="msg-callout ${c.type}">
          <div class="mc-title">${c.title}</div>
          <div class="mc-body">${c.body}</div>
        </div>
      `).join('');
      const metrics = (m.metrics && m.metrics.length) ? `
        <div class="msg-metrics">
          ${m.metrics.map(mm => `
            <div class="mm">
              <div class="mm-value">${mm.v}</div>
              <div class="mm-label">${mm.l}</div>
            </div>
          `).join('')}
        </div>
      ` : '';
      return `
        <div class="convo-msg ag-${m.sender}">
          <div class="msg-head">
            <span class="msg-sender">
              <span class="ag-dot"></span>
              ${agentSpeaker[m.sender]}
            </span>
            ${recipients ? `<span class="msg-arrow">→</span><span class="msg-recipients">${recipients}</span>` : ''}
            <span class="msg-time">${m.time}</span>
          </div>
          <div class="msg-body">${m.body}</div>
          ${metrics}
          ${callouts}
        </div>
      `;
    }).join('');

    return `
      <div class="convo-header">
        <div class="ch-title">${t.title}</div>
        <span class="ch-status ${t.status === 'active' ? 'inprog' : 'done'}">${statLbl[t.status]}</span>
      </div>
      <div class="row gap-10" style="margin-bottom: 14px; flex-wrap: wrap;">
        <span class="pill ${priPill[t.priority]}" style="font-size: 10.5px;">${t.priority.toUpperCase()} PRIORITY</span>
        <span class="muted" style="font-size: 12px;">Opened ${t.openedAt} · ${(t.messages || []).length} messages</span>
        <span class="nav-spacer"></span>
        <span class="tc-agents">${participantChips}</span>
      </div>
      <div class="convo-panel">${msgs}</div>
    `;
  }

  /* ---------- Mount + wire up click-to-switch ---------- */
  const rosterEl = document.getElementById('agent-roster');
  const listEl   = document.getElementById('thread-list');
  const detailEl = document.getElementById('detail-panel');

  if (rosterEl) rosterEl.innerHTML = rosterHtml;
  if (listEl)   listEl.innerHTML   = threadListHtml;
  if (detailEl) detailEl.innerHTML = renderDetail(0);

  if (listEl) {
    listEl.addEventListener('click', (e) => {
      const card = e.target.closest('.thread-card');
      if (!card) return;
      listEl.querySelectorAll('.thread-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      if (detailEl) detailEl.innerHTML = renderDetail(+card.dataset.idx);
      // On phones, scroll the detail pane into view
      if (window.matchMedia && window.matchMedia('(max-width: 900px)').matches) {
        detailEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
})();
