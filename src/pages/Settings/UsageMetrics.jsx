import { useState, useEffect } from 'react';
import { Sparkles, FileText, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../lib/api';
import { providerColors, CustomTooltip } from './settingsData.jsx';

export default function UsageMetrics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/user/token-usage')
      .then(res => setData(res.data))
      .catch(() => toast.error('Failed to load usage data'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="tab-content">
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>Loading usage data...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="tab-content">
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>Failed to load usage data.</div>
      </div>
    );
  }

  const { allTime, thisMonth, byProvider, recent } = data;
  const avgTokens = thisMonth.generations > 0 ? Math.round(thisMonth.total_tokens / thisMonth.generations) : 0;
  const totalProviderTokens = byProvider.reduce((sum, p) => sum + p.total_tokens, 0);

  return (
    <div className="tab-content">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label"><Sparkles size={14} /> Total Tokens Used</div>
          <div className="stat-value">{thisMonth.total_tokens.toLocaleString()}</div>
          <div className="stat-sub">This month</div>
        </div>
        <div className="stat-card">
          <div className="stat-label"><FileText size={14} /> Generations</div>
          <div className="stat-value">{thisMonth.generations}</div>
          <div className="stat-sub">This month</div>
        </div>
        <div className="stat-card">
          <div className="stat-label"><TrendingUp size={14} /> Avg Tokens / Gen</div>
          <div className="stat-value">{avgTokens.toLocaleString()}</div>
          <div className="stat-sub">Per generation</div>
        </div>
      </div>

      {/* Provider breakdown */}
      {byProvider.length > 0 && (
        <div className="s-card" style={{ marginBottom: 20 }}>
          <div className="section-title">Usage by Provider</div>
          <div className="section-desc">Token distribution across AI providers (all time: {allTime.total_tokens.toLocaleString()} tokens)</div>
          {totalProviderTokens > 0 && (
            <div className="provider-bar-track">
              {byProvider.map(p => (
                <div key={p.provider} className="provider-bar-seg" style={{ width: `${(p.total_tokens / totalProviderTokens) * 100}%`, background: providerColors[p.provider] || 'var(--muted)' }} />
              ))}
            </div>
          )}
          <div className="provider-legend">
            {byProvider.map(p => (
              <div className="provider-legend-item" key={p.provider}>
                <span className="provider-dot" style={{ background: providerColors[p.provider] || 'var(--muted)' }} />
                {p.provider}: {p.total_tokens.toLocaleString()} tokens ({p.generations} gen{p.generations !== 1 ? 's' : ''})
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Generation Log */}
      <div className="s-card">
        <div className="section-title">Recent Generations</div>
        <div className="section-desc">Last 10 AI generation token usage</div>
        {recent.length === 0 ? (
          <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--muted)', fontSize: '0.875rem' }}>
            No generations yet. Generate your first release notes to see usage here.
          </div>
        ) : (
          <div className="s-table-wrap">
            <table>
              <thead><tr><th>Date</th><th>Provider</th><th>Model</th><th>Prompt</th><th>Completion</th><th>Total</th></tr></thead>
              <tbody>{recent.map((r, i) => (
                <tr key={i}>
                  <td style={{ whiteSpace: 'nowrap' }}>{new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                      <span className="provider-dot" style={{ background: providerColors[r.provider] || 'var(--muted)' }} />
                      {r.provider}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}>{r.model}</td>
                  <td style={{ fontFamily: 'var(--mono)', fontSize: 12 }}>{r.prompt_tokens.toLocaleString()}</td>
                  <td style={{ fontFamily: 'var(--mono)', fontSize: 12 }}>{r.completion_tokens.toLocaleString()}</td>
                  <td style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 600 }}>{r.total_tokens.toLocaleString()}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
