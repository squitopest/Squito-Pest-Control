import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Squito Pest Control",
  description: "Learn how Squito Pest Control collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-white/40 text-sm mb-8">Last updated: April 2026</p>

        <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          <img 
            src="/team-action.jpg" 
            alt="Squito Pest Control Team" 
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="space-y-10 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-display font-bold text-white mb-3">1. Information We Collect</h2>
            <p>When you use our website or book a service, we may collect the following information:</p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-white/60">
              <li><strong className="text-white/80">Contact Information:</strong> Name, email address, phone number, and service address.</li>
              <li><strong className="text-white/80">Payment Information:</strong> Processed securely through Stripe. We never store your credit card details on our servers.</li>
              <li><strong className="text-white/80">Service Details:</strong> Information about your property, pest concerns, and appointment preferences.</li>
              <li><strong className="text-white/80">Usage Data:</strong> Browser type, pages visited, and general interaction data to improve our website experience.</li>
              <li><strong className="text-white/80">Photos:</strong> Images submitted through our Pest Identifier tool are processed in real-time and are never stored.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 text-white/60">
              <li>To provide and schedule pest control services at your property.</li>
              <li>To process payments and send booking confirmations.</li>
              <li>To communicate with you about your service, including reminders and follow-ups.</li>
              <li>To improve our website, services, and customer experience.</li>
              <li>To comply with legal obligations and protect our rights.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white mb-3">3. Information Sharing</h2>
            <p>
              We do not sell, rent, or trade your personal information to third parties. We may share limited data with trusted service providers who assist with payment processing (Stripe), email delivery, and website hosting — solely to operate our business.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white mb-3">4. Data Security</h2>
            <p>
              We implement industry-standard security measures including SSL encryption, secure payment processing, and access controls to protect your personal information. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white mb-3">5. Cookies</h2>
            <p>
              Our website may use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from. You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white mb-3">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-white/60">
              <li>Request access to the personal data we hold about you.</li>
              <li>Request correction or deletion of your personal data.</li>
              <li>Opt out of marketing communications at any time.</li>
              <li>Withdraw consent where processing is based on consent.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white mb-3">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or how we handle your data, please contact us:
            </p>
            <div className="mt-4 space-y-2 text-white/60">
              <p>📞 <a href="tel:6312031000" className="text-green-400 hover:underline">(631) 203-1000</a></p>
              <p>📧 <a href="mailto:service@squitopestcontrol.com" className="text-green-400 hover:underline">service@squitopestcontrol.com</a></p>
            </div>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <Link href="/" className="text-green-400 hover:text-green-300 text-sm font-semibold transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
