import { useState } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authApi } from '../../lib/api';
import SEO from '../../components/SEO';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [needsVerification, setNeedsVerification] = useState(false);
    const [verificationEmail, setVerificationEmail] = useState('');

    const handleGoogleLogin = () => {
        const redirectPath = searchParams.get('redirect') || '/dashboard';
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/google?redirect=${encodeURIComponent(redirectPath)}`;
    };

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        if (!email.trim() || !password) return toast.error('Email and password are required');

        setLoading(true);
        setNeedsVerification(false);
        try {
            await authApi.post('/auth/login', { email: email.trim(), password });
            const redirectPath = searchParams.get('redirect') || '/dashboard';
            navigate(redirectPath);
        } catch (err) {
            const data = err.response?.data;
            if (data?.needsVerification) {
                setNeedsVerification(true);
                setVerificationEmail(data.email);
            } else {
                toast.error(data?.error || 'Login failed');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <SEO
                title="Sign In"
                description="Sign in to Releaslyy with Google or email to start generating AI-powered release notes for your projects."
                keywords="Releaslyy login, sign in, Google OAuth"
                canonical="https://releaslyy.com/login"
            />
            <button className="back-btn" onClick={() => navigate('/')}>
                <ArrowLeft size={20} /> Back to Home
            </button>

            <div className="login-left">
                <h1 className="login-title">Welcome!</h1>
                <p className="login-subtitle">
                    Sign in to continue managing your release notes.
                </p>

                <div className="login-card-interactive">
                    <button onClick={handleGoogleLogin} className="google-login-btn">
                        <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="Google logo"
                        />
                        <span>Continue with Google</span>
                    </button>

                    <div className="divider">
                        <span>or</span>
                    </div>

                    {needsVerification && (
                        <div className="verification-banner">
                            <span>Please verify your email first.</span>
                            <Link to={`/verify-otp?email=${encodeURIComponent(verificationEmail)}`}>Verify now</Link>
                        </div>
                    )}

                    <form onSubmit={handleEmailLogin} className="email-login-form">
                        <div className="form-field">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                            />
                        </div>
                        <div className="form-field">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                        </div>
                        <button type="submit" className="email-login-btn" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>

                    <div className="login-links">
                        <Link to="/forgot-password">Forgot password?</Link>
                        <Link to="/signup">Create account</Link>
                    </div>

                    <p className="terms-text" style={{ marginTop: '16px' }}>
                        By clicking continue, you verify that you are an authorized user and agree to our <a href="/terms">Terms of Service</a>.
                    </p>
                </div>
            </div>

            <div className="login-right">
                <div className="feature-showcase">
                    <h2>Automate your workflow</h2>
                    <ul className="feature-list">
                        <li>
                            <CheckCircle2 className="check-icon" size={20} />
                            <span>Fetch commits from GitHub instantly</span>
                        </li>
                        <li>
                            <CheckCircle2 className="check-icon" size={20} />
                            <span>Generate AI summaries for stakeholders</span>
                        </li>
                        <li>
                            <CheckCircle2 className="check-icon" size={20} />
                            <span>Publish directly to Confluence</span>
                        </li>
                    </ul>

                    <div className="floating-card c1">
                        <span>feat: auth flow implementation</span>
                    </div>
                    <div className="floating-card c2">
                        <span>Release v1.2.0 is live!</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
