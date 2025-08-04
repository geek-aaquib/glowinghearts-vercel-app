// app/terms/page.tsx
import { Container } from '@/components/container';
import { Footer } from '@/components/footer';
import { GradientBackground } from '@/components/gradient';
import { Navbar } from '@/components/navbar';
import TermsLayout from '@/components/TermsLayout';

export default function TermsPage() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>
      <TermsLayout title="Glowing Hearts Fundraising Terms of Use">
        <p className="text-sm text-gray-600 mb-6">
          <strong>Effective Date:</strong> 12 July 2025
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">1. Introduction</h2>
        <p className="mb-4">
          Glowing Hearts Fundraising (“Glowing Hearts”, “we”, “us”, or “our”) is a fundraising platform designed to facilitate the operation and participation in licensed 50/50 raffles held by eligible Ontario-based charitable organizations (the “Platform”).
          These Terms of Use (“Terms”) govern your access to and use of the Platform and related services.
        </p>
        <p className="mb-4">
          We only offer services within Ontario, Canada. If you are located outside of Ontario or where our services are prohibited by law, you may not access or use the Platform.
        </p>
        <p className="mb-4">
          Your use of the Platform signifies your agreement to be bound by these Terms and our Privacy Policy, which explains how we collect and manage your personal information.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">2. Eligibility and Acceptance of Terms</h2>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li>You are at least 18 years old.</li>
          <li>You are a resident of Ontario.</li>
          <li>You are legally eligible to participate in licensed charitable gaming, including 50/50 raffles.</li>
        </ul>
        <p className="mb-4">
          If you do not agree to these Terms, you must not use the Platform.
        </p>
        <p className="mb-4">
          We may modify these Terms at any time without notice. Your continued use of the Platform means you accept any updates.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">3. Use of the Platform</h2>
        <p className="mb-4">
          You may use the Platform solely to view and participate in 50/50 raffles offered by registered Ontario-based charities. You are not permitted to access the backend system or administrative tools. No user or charity account creation is available on this Platform.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">4. Raffle Participation and Payment</h2>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li>You authorize us and our payment processor, Stripe, to charge your selected payment method for the ticket purchase amount, including any applicable taxes or fees.</li>
          <li>All transactions are processed by Stripe. Glowing Hearts does not store your payment details. Stripe’s Privacy Policy is available at: <a href="https://stripe.com/en-ca/privacy-center/legal" className="text-blue-600 underline" target="_blank">stripe.com/en-ca/privacy-center/legal</a>.</li>
        </ul>
        <p className="mb-4">
          All purchases are final and non-refundable unless required by applicable law or the terms of the specific raffle license.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">5. Raffle Management</h2>
        <p className="mb-2">Raffles listed on the Platform are conducted by licensed Ontario charities under the oversight of the Alcohol and Gaming Commission of Ontario (AGCO). Glowing Hearts is a service provider and is not responsible for:</p>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li>Verifying eligibility of raffle participants;</li>
          <li>Delivering raffle prizes;</li>
          <li>Ensuring raffle license compliance.</li>
        </ul>
        <p className="mb-4">Each charity is solely responsible for the lawful execution of their raffle, including drawing winners and issuing prizes. Participants should consult the raffle rules linked on each raffle page before purchasing.</p>

        <h2 className="text-xl font-semibold mt-8 mb-2">6. Intellectual Property</h2>
        <p className="mb-4">
          All trademarks, content, software, designs, and data on the Platform are owned by or licensed to Glowing Hearts and are protected by Canadian intellectual property laws.
        </p>
        <p className="mb-4">
          You may not reproduce, distribute, modify, or use our content for commercial purposes without our prior written consent.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">7. Disclaimers</h2>
        <p className="mb-4">
          The Platform is provided “as is” and “as available.” We do not warrant that the Platform will be error-free, uninterrupted, or secure. We disclaim all warranties, including those of merchantability and fitness for a particular purpose.
        </p>
        <p className="mb-4">
          Glowing Hearts is not responsible for any errors, omissions, delays, or failures in raffle operations, prize delivery, or charity performance.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">8. Limitation of Liability</h2>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li>Glowing Hearts will not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Platform.</li>
          <li>Our total liability to you for any claims under these Terms will not exceed five Canadian dollars ($5 CAD).</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">9. Indemnity</h2>
        <p className="mb-2">You agree to indemnify and hold harmless Glowing Hearts and its officers, employees, and contractors from any claims, damages, liabilities, and expenses (including legal fees) arising out of:</p>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li>Your breach of these Terms;</li>
          <li>Your violation of any applicable laws;</li>
          <li>Your participation in any raffle.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">10. External Links</h2>
        <p className="mb-4">
          The Platform may contain links to third-party websites or charity pages. We are not responsible for their content, privacy practices, or terms of use. Access such websites at your own risk.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">11. Governing Law</h2>
        <p className="mb-4">
          These Terms are governed by the laws of the Province of Ontario and applicable federal laws of Canada. You agree that any dispute will be resolved exclusively in the courts located in Toronto, Ontario.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">12. Suspension and Termination</h2>
        <p className="mb-2">We may suspend or terminate your access to the Platform at any time if:</p>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li>You breach these Terms;</li>
          <li>We suspect fraud or unlawful activity;</li>
          <li>Required by legal or regulatory authorities.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">13. Miscellaneous</h2>
        <p className="mb-4">
          If any part of these Terms is deemed invalid or unenforceable, the remaining provisions will remain in effect. These Terms represent the entire agreement between you and Glowing Hearts concerning your use of the Platform.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">14. Contact</h2>
        <p className="mb-4">
          If you have any questions about these Terms, please contact us at <a href="mailto:info@glowingheartsfundraising.com" className="text-blue-600 underline">info@glowingheartsfundraising.com</a>.
        </p>
      </TermsLayout>
      <Footer />
    </main>
  );
}
