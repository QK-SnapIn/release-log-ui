import Nav from '../../components/landing/Nav';
import Hero from '../../components/landing/Hero';
import SocialProof from '../../components/landing/SocialProof';
import Features from '../../components/landing/Features';
import Integrations from '../../components/landing/Integrations';
import ProductDemo from '../../components/landing/ProductDemo';
import HowItWorks from '../../components/landing/HowItWorks';
import CTASection from '../../components/landing/CTASection';
import Footer from '../../components/landing/Footer';
import SEO from '../../components/SEO';
import './LandingPage.css';

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Releaslyy",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web",
  "description": "AI-powered release notes generator. Connect GitHub, Jira, or DevRev and generate polished release notes in seconds.",
  "url": "https://releaslyy.com",
  "image": "https://releaslyy.com/favicon-192x192.png",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "0",
    "offerCount": "4"
  },
  "featureList": [
    "GitHub integration",
    "Jira integration",
    "DevRev integration",
    "Multiple LLM providers",
    "Export to Markdown, PDF, DOCX",
    "Publish to GitHub Releases"
  ]
};

export default function LandingPage() {
  return (
    <div className="landing-root">
      <SEO
        title="AI-Powered Release Notes Generator"
        description="Automatically generate release notes from GitHub commits, Jira issues, and DevRev sprints. AI-powered changelog generator for dev teams. Free to start."
        keywords="release notes generator, AI release notes, automatic changelog, GitHub release notes generator, Jira release notes, changelog automation, DevRev release notes, software release notes tool, automated release notes, release notes from commits, sprint release notes, AI changelog generator, release management tool, product changelog, release notes template, generate release notes from git"
        canonical="https://releaslyy.com/"
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </SEO>
      <div className="land-noise" />
      <Nav />
      <Hero />
      <Features />
      <Integrations />
      <ProductDemo />
      <HowItWorks />
      <CTASection />
      <Footer />
    </div>
  );
}
