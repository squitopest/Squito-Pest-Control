import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Squito Pest Control",
  description: "Read the terms and conditions for using Squito Pest Control services and website.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight">
          Terms of Service
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
            <h2 className="text-xl font-display font-bold text-white mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing or using the Squito Pest Control website (getsquito.com) and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white mb-3">2. Services</h2>
            <p>
              Squito Pest Control provides residential and commercial pest control services across Long Island, New York, including but not limited to mosquito control, termite treatment, rodent removal, bed bug treatment, and general pest management.
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-white/60">
              <li>All services are subject to availability in your service area.</li>
              <li>Service plans are offered on a month-to-month basis with no long-term contracts.</li>
              <li>We reserve the right to refuse service at our discretion.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white mb-3">3. Pricing & Payment</h2>
            <ul className="list-disc list-inside space-y-2 text-white/60">
              <li>All prices shown on our website are in US Dollars and include applicable taxes where noted.</li>
              <li>Payment is processed securely through Stripe at the time of booking.</li>
              <li>We reserve the right to modify pricing at any time. Existing bookings are honored at the price shown at checkout.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white mb-3">4. Cancellations & Refunds</h2>
            <p>
              All plans are month-to-month with zero cancellation fees. You may cancel your service at any time. If you need to reschedule an appointment, please contact us at least 24 hours in advance. Refund requests are handled on a case-by-case basis.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white mb-3">5. Satisfaction Guarantee</h2>
            <p>
              We stand behind our work. If pests return between scheduled visits, we will re-treat your property at no additional cost. This guarantee applies to active plan members only.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white mb-3">6. Website Use</h2>
            <ul className="list-disc list-inside space-y-2 text-white/60">
              <li>You may not use this website for any unlawful purpose or in violation of any applicable laws.</li>
              <li>The Pest Identifier AI tool is provided for informational purposes only and should not replace a professional inspection.</li>
              <li>All content on this website, including text, images, and logos, is the property of Squito Pest Control and may not be reproduced without permission.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white mb-3">7. Limitation of Liability</h2>
            <p>
              Squito Pest Control shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or services. Our total liability is limited to the amount paid for the specific service in question.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white mb-3">8. Changes to Terms</h2>
            <p>
              We may update these Terms of Service from time to time. Continued use of our website and services after changes constitutes acceptance of the updated terms. We encourage you to review this page periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white mb-3">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="mt-4 space-y-2 text-white/60">
              <p>📞 <a href="tel:6312031000" className="text-green-400 hover:underline">(631) 203-1000</a></p>
              <p>📧 <a href="mailto:service@getsquito.com" className="text-green-400 hover:underline">service@getsquito.com</a></p>
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
