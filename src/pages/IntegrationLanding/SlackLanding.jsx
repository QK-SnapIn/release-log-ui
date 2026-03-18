import { useNavigate } from 'react-router-dom';
import { Sparkles, Hash, MessageSquare, AtSign, Check, ChevronDown } from 'lucide-react';
import Nav from '../../components/landing/Nav';
import Footer from '../../components/landing/Footer';
import FadeIn from '../../components/landing/FadeIn';
import SEO from '../../components/SEO';
import { I } from '../../components/landing/Icons';
import githubLogo from '../../assets/github.png';
import jiraLogo from '../../assets/jira_logo.webp';
import devrevLogo from '../../assets/devrev-logo.webp';
import '../Landing/LandingPage.css';
import './IntegrationLanding.css';

/* ── Slack Config Mockup (Featured / Larger) ── */
function SlackConfigMockupFeatured() {
  return (
    <div style={{
      background: '#1e293b', borderRadius: 14, border: '1px solid rgba(255,255,255,.08)',
      padding: 28, maxWidth: 420, width: '100%',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(16,185,129,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Hash size={18} color="#10b981" />
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#f1f5f9' }}>Slack Configuration</div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>Auto-publish settings</div>
        </div>
      </div>

      {/* Channel selector */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 6 }}>Channel</div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px',
          background: 'rgba(255,255,255,.05)', borderRadius: 8, border: '1px solid rgba(255,255,255,.08)',
        }}>
          <span style={{ fontSize: 13, color: '#e2e8f0' }}># product-releases</span>
          <ChevronDown size={14} color="#64748b" />
        </div>
      </div>

      {/* Format options */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8 }}>Format</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['Summary', 'Detailed', 'Bullet'].map((f, i) => (
            <div key={f} style={{
              padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 500,
              background: i === 0 ? 'rgba(16,185,129,.15)' : 'rgba(255,255,255,.05)',
              color: i === 0 ? '#10b981' : '#94a3b8',
              border: i === 0 ? '1px solid rgba(16,185,129,.3)' : '1px solid rgba(255,255,255,.06)',
            }}>{f}</div>
          ))}
        </div>
      </div>

      {/* Mention config */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8 }}>Mentions</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['@product-team', '@engineering', '@qa-leads'].map((m, i) => (
            <div key={m} style={{
              padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 500,
              background: i < 2 ? 'rgba(16,185,129,.12)' : 'rgba(255,255,255,.05)',
              color: i < 2 ? '#10b981' : '#64748b',
              border: '1px solid ' + (i < 2 ? 'rgba(16,185,129,.25)' : 'rgba(255,255,255,.06)'),
            }}>{m}</div>
          ))}
        </div>
      </div>

      {/* Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <span style={{ fontSize: 13, color: '#cbd5e1' }}>Auto-post on publish</span>
        <div style={{
          width: 40, height: 22, borderRadius: 11, background: '#10b981', position: 'relative', cursor: 'pointer',
        }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: '#fff', position: 'absolute', top: 2, right: 2, transition: 'all .2s' }} />
        </div>
      </div>

      {/* Thread toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <span style={{ fontSize: 13, color: '#cbd5e1' }}>Post as thread</span>
        <div style={{
          width: 40, height: 22, borderRadius: 11, background: 'rgba(255,255,255,.15)', position: 'relative', cursor: 'pointer',
        }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: '#94a3b8', position: 'absolute', top: 2, left: 2, transition: 'all .2s' }} />
        </div>
      </div>
    </div>
  );
}

/* ── Dark Section Slack Config Mockup (reused from DevRev page) ── */
function SlackConfigMockup() {
  return (
    <div style={{
      background: '#1e293b', borderRadius: 14, border: '1px solid rgba(255,255,255,.08)',
      padding: 24, maxWidth: 380, width: '100%',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(16,185,129,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Hash size={16} color="#10b981" />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9' }}>Slack Configuration</div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>Auto-publish settings</div>
        </div>
      </div>

      {/* Channel selector */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 6 }}>Channel</div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px',
          background: 'rgba(255,255,255,.05)', borderRadius: 8, border: '1px solid rgba(255,255,255,.08)',
        }}>
          <span style={{ fontSize: 13, color: '#e2e8f0' }}># product-releases</span>
          <ChevronDown size={14} color="#64748b" />
        </div>
      </div>

      {/* Format options */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8 }}>Format</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['Summary', 'Detailed', 'Bullet'].map((f, i) => (
            <div key={f} style={{
              padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 500,
              background: i === 0 ? 'rgba(16,185,129,.15)' : 'rgba(255,255,255,.05)',
              color: i === 0 ? '#10b981' : '#94a3b8',
              border: i === 0 ? '1px solid rgba(16,185,129,.3)' : '1px solid rgba(255,255,255,.06)',
            }}>{f}</div>
          ))}
        </div>
      </div>

      {/* Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <span style={{ fontSize: 13, color: '#cbd5e1' }}>Auto-post on publish</span>
        <div style={{
          width: 40, height: 22, borderRadius: 11, background: '#10b981', position: 'relative', cursor: 'pointer',
        }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: '#fff', position: 'absolute', top: 2, right: 2, transition: 'all .2s' }} />
        </div>
      </div>
    </div>
  );
}

export default function SlackLanding() {
  const navigate = useNavigate();

  return (
    <div className="landing-root">
      <SEO
        title="Slack Integration — Auto-Publish Release Notes to Slack"
        description="Publish AI-generated release notes to Slack channels. Full notes or AI summaries with public changelog links. Available now on Releaslyy."
        keywords="slack release notes, slack changelog, slack integration, publish release notes to slack, slack release notifications, automated slack updates, release notes slack bot, slack release notes integration"
        canonical="https://releaslyy.com/integrations/slack"
      />
      <div className="land-noise" />
      <Nav />

      {/* ── Hero Section ── */}
      <section className="land-sec land-hero-sec integ-hero-gradient" style={{ paddingTop: 160, paddingBottom: 60, textAlign: 'center', overflow: 'hidden' }}>
        <div className="land-orb" style={{ width: 600, height: 600, opacity: 0.07, background: 'radial-gradient(circle,rgba(16,185,129,.5),transparent)', top: -100, left: '50%', marginLeft: -300, animation: 'land-pulse 6s ease-in-out infinite' }} />
        <div className="land-orb" style={{ width: 400, height: 400, opacity: 0.05, background: 'radial-gradient(circle,rgba(99,102,241,.4),transparent)', top: 200, right: -100, animation: 'land-pulse 8s ease-in-out infinite 2s' }} />

        <div className="land-con" style={{ position: 'relative', zIndex: 2 }}>
          <FadeIn>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 100,
              background: 'rgba(16,185,129,.06)', border: '1px solid rgba(16,185,129,.2)',
              fontSize: 13, color: 'var(--land-teal)', fontWeight: 500, marginBottom: 32,
            }}>
              <Sparkles size={14} />
              Now Available — Slack Integration
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 style={{
              fontSize: 'clamp(36px, 5.5vw, 68px)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-.035em',
              maxWidth: 820, margin: '0 auto 24px', color: 'var(--land-text)',
            }}>
              Auto-Publish Release Notes to{' '}
              <span style={{
                fontFamily: 'var(--land-serif)', fontStyle: 'italic', fontWeight: 400,
                background: 'linear-gradient(135deg, var(--land-teal), var(--land-accent))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Slack
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="land-hero-subtitle" style={{ fontSize: 18, color: 'var(--land-muted)', maxWidth: 580, margin: '0 auto 40px', lineHeight: 1.65 }}>
              Generate release notes from any source and publish to your Slack channels. Choose full notes or an AI-generated summary with a link to the public changelog.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="integ-hero-btns" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/signup')} className="land-btn land-btn-p">Get Started Free {I.arrow}</button>
              <button onClick={() => navigate('/docs')} className="land-btn land-btn-s">
                <span style={{ display: 'flex', color: 'var(--land-muted)' }}>{I.plug}</span>
                View Docs
              </button>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="integ-logos-row" style={{ display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
              {[
                { src: null, alt: 'Slack', label: 'Slack' },
                { src: githubLogo, alt: 'GitHub', label: 'GitHub' },
                { src: jiraLogo, alt: 'Jira', label: 'Jira' },
                { src: devrevLogo, alt: 'DevRev', label: 'DevRev' },
              ].map((logo) => (
                <div key={logo.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {logo.src ? (
                    <img src={logo.src} alt={logo.alt} style={{ width: 28, height: 28, objectFit: 'contain' }} />
                  ) : (
                    <div style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(16,185,129,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Hash size={16} color="var(--land-teal)" />
                    </div>
                  )}
                  <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--land-muted)' }}>{logo.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Slack Config Card in hero area */}
          <FadeIn delay={0.5}>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 48 }}>
              <SlackConfigMockupFeatured />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="land-sec" id="features" style={{ position: 'relative' }}>
        <div className="land-orb" style={{ width: 500, height: 500, opacity: 0.05, background: 'radial-gradient(circle,rgba(16,185,129,.4),transparent)', bottom: -100, left: -100 }} />
        <div className="land-con" style={{ position: 'relative', zIndex: 2 }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--land-teal)', textTransform: 'uppercase', letterSpacing: '.12em' }}>Features</span>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-.03em', marginTop: 12, color: 'var(--land-text)' }}>
                Everything you need for{' '}
                <span style={{ fontFamily: 'var(--land-serif)', fontStyle: 'italic', fontWeight: 400 }}>Slack</span>
                {' '}publishing
              </h2>
              <p style={{ fontSize: 16, color: 'var(--land-muted)', maxWidth: 520, margin: '16px auto 0', lineHeight: 1.6 }}>
                Route release notes to the right channels, with the right format.
              </p>
            </div>
          </FadeIn>
          <div className="integ-features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            {[
              { icon: <Hash size={20} />, title: 'Channel Targeting', desc: 'Route release notes to specific Slack channels based on product area, team, or release type.', color: 'var(--land-accent)' },
              { icon: <MessageSquare size={20} />, title: 'Rich Formatting', desc: 'Release notes are formatted with rich Slack blocks — headers, bullet points, code blocks, and emoji support.', color: 'var(--land-sky)' },
              { icon: <AtSign size={20} />, title: 'Smart Mentions', desc: 'Automatically @mention team leads, PMs, or user groups based on work item ownership.', color: 'var(--land-teal)' },
            ].map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.08}>
                <div style={{
                  padding: 28, borderRadius: 14, background: 'var(--land-card)', border: '1px solid var(--land-border)',
                  transition: 'all .3s ease', cursor: 'default', height: '100%',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#d0d0d6'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,.06)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--land-border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: f.color + '12', display: 'flex', alignItems: 'center', justifyContent: 'center', color: f.color, marginBottom: 16 }}>{f.icon}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-.02em', marginBottom: 8, color: 'var(--land-text)' }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--land-muted)', lineHeight: 1.65 }}>{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Slack Integration Section (Dark) — Featured ── */}
      <section className="land-sec integ-dark-section">
        <div className="land-con">
          <div className="integ-slack-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <FadeIn>
              <div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 100,
                  background: 'rgba(16,185,129,.1)', border: '1px solid rgba(16,185,129,.2)',
                  fontSize: 12, color: '#10b981', fontWeight: 600, marginBottom: 24,
                }}>
                  How It Works
                </div>
                <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 700, letterSpacing: '-.03em', marginBottom: 16, color: '#f1f5f9' }}>
                  Automatically Send Release Notes to{' '}
                  <span style={{ fontFamily: 'var(--land-serif)', fontStyle: 'italic', fontWeight: 400, color: '#10b981' }}>Slack</span>
                </h2>
                <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.65, marginBottom: 32 }}>
                  Configure once, publish forever. Every time you generate release notes, Releaslyy can automatically post a formatted summary to your chosen Slack channels.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    'Choose channels for different audiences (dev, product, customers)',
                    'Pick a summary format that fits your team culture',
                    'Toggle auto-publish per release or per channel',
                  ].map((text) => (
                    <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{ width: 22, height: 22, borderRadius: 11, background: 'rgba(16,185,129,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                        <Check size={13} color="#10b981" />
                      </div>
                      <span style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 1.6 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <SlackConfigMockup />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── How It Works Section ── */}
      <section className="land-sec">
        <div className="land-con">
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--land-sky)', textTransform: 'uppercase', letterSpacing: '.12em' }}>How it works</span>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-.03em', marginTop: 12, color: 'var(--land-text)' }}>
                Three steps to{' '}
                <span style={{ fontFamily: 'var(--land-serif)', fontStyle: 'italic', fontWeight: 400 }}>effortless</span>
                {' '}Slack publishing
              </h2>
            </div>
          </FadeIn>
          <div className="integ-steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {[
              { num: '01', title: 'Connect Slack', desc: 'Authorize Releaslyy to post to your Slack workspace. Select which channels should receive release updates.', color: 'var(--land-sky)' },
              { num: '02', title: 'Configure Channels', desc: 'Map release types to channels, set formatting preferences, and configure which teams get @mentioned.', color: 'var(--land-accent)' },
              { num: '03', title: 'Auto-Publish', desc: 'Every time you generate release notes, Releaslyy automatically posts a beautifully formatted summary to your configured channels.', color: 'var(--land-warm)' },
            ].map((s, i) => (
              <FadeIn key={s.num} delay={i * 0.12}>
                <div style={{
                  padding: 32, borderRadius: 14, background: 'var(--land-card)', border: '1px solid var(--land-border)',
                  position: 'relative', overflow: 'hidden', height: '100%',
                }}>
                  <div className="integ-step-number">{s.num}</div>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: s.color + '12', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    <span style={{ fontFamily: 'var(--land-mono)', fontSize: 14, fontWeight: 700, color: s.color }}>{s.num}</span>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-.02em', marginBottom: 8, color: 'var(--land-text)' }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--land-muted)', lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="land-sec">
        <div className="land-con">
          <FadeIn>
            <div className="land-cta-box" style={{
              textAlign: 'center', padding: '64px 32px', borderRadius: 20, position: 'relative', overflow: 'hidden',
              background: 'linear-gradient(135deg,rgba(24,24,27,.02) 0%,rgba(16,185,129,.04) 100%)',
              border: '1px solid rgba(24,24,27,.08)',
            }}>
              <div className="land-orb" style={{ width: 400, height: 400, opacity: 0.06, background: 'radial-gradient(circle,rgba(16,185,129,.4),transparent)', top: -150, left: '50%', marginLeft: -200 }} />
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-.03em', marginBottom: 16, color: 'var(--land-text)' }}>
                  Start publishing to Slack today
                </h2>
                <p style={{ fontSize: 16, color: 'var(--land-muted)', maxWidth: 460, margin: '0 auto 32px', lineHeight: 1.6 }}>
                  Generate from GitHub, Jira, or DevRev — and broadcast to Slack in one click. Full notes or AI summaries. Free to start.
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button onClick={() => navigate('/signup')} className="land-btn land-btn-p">Get Started Free {I.arrow}</button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
