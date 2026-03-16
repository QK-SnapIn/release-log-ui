import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, KeyRound } from 'lucide-react';
import toast from 'react-hot-toast';
import { authApi } from '../../lib/api';
import SEO from '../../components/SEO';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return toast.error('Email is required');

    setLoading(true);
    try {
      await authApi.post('/auth/forgot-password', { email: email.trim() });
      setSent(true);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    navigate(`/reset-password?email=${encodeURIComponent(email.trim().toLowerCase())}`);
  };

  return (
    <div className="forgot-wrapper">
      <SEO title="Forgot Password" description="Reset your Releaslyy account password." />
      <button className="back-btn" onClick={() => navigate('/login')}>
        <ArrowLeft size={20} /> Back to Login
      </button>

      <div className="forgot-card">
        <div className="forgot-icon"><KeyRound size={28} /></div>
        <h1>Forgot password?</h1>
        <p className="forgot-subtitle">
          {sent
            ? "If an account exists, we've sent a reset code."
            : "Enter your email and we'll send you a reset code."}
        </p>

        {sent ? (
          <>
            <div className="forgot-success">
              Check your inbox for a 6-digit code sent to <strong>{email}</strong>
            </div>
            <button onClick={handleContinue} className="signup-submit-btn">
              Enter reset code
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="forgot-form">
            <div className="form-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
              />
            </div>
            <button type="submit" className="signup-submit-btn" disabled={loading}>
              {loading ? 'Sending...' : 'Send reset code'}
            </button>
          </form>
        )}

        <div className="auth-links" style={{ marginTop: '24px' }}>
          <Link to="/login">Back to login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
