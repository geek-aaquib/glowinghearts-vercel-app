// app/privacy/page.tsx
import { Container } from '@/components/container';
import { Footer } from '@/components/footer';
import { GradientBackground } from '@/components/gradient';
import { Navbar } from '@/components/navbar';
import TermsLayout from '@/components/TermsLayout';

export default function PrivacyPolicyPage() {
    return (
        <main className="overflow-hidden">
            <GradientBackground />
            <Container>
                <Navbar />
            </Container>
            <TermsLayout title="Glowing Hearts Fundraising Privacy Policy">
                <p className="text-sm text-gray-600 mb-6">
                    <strong>Effective Date:</strong> 12 July 2025
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-2">1. Introduction</h2>
                <p className="mb-4">
                    Glowing Hearts Fundraising (“Glowing Hearts”, “we”, “us”, or “our”) is committed to protecting your personal information and respecting your privacy.
                    This Privacy Policy outlines how we collect, use, disclose, and protect personal information through our online platform (the “Platform”) that facilitates charitable 50/50 raffles in Ontario.
                </p>
                <p className="mb-4">
                    By using our Platform, you agree to the practices outlined in this Privacy Policy. If you do not agree, please do not use the Platform.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-2">2. Scope</h2>
                <p className="mb-4">
                    This Privacy Policy applies only to our operations in Ontario, Canada. We do not provide services outside of Ontario and do not offer user or charity logins. All transactions are conducted by individuals participating in charitable 50/50 raffles through our Platform.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-2">3. What Is Personal Information?</h2>
                <p className="mb-4">
                    Personal information is any information that identifies or could be used to identify an individual, such as your name, email address, payment details, or IP address.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-2">4. Information We Collect</h2>
                <p className="font-medium mt-4">Participants/Players:</p>
                <ul className="list-disc list-inside mb-4 text-gray-700">
                    <li>Contact Information: Your name, email address, and province of residence (to confirm eligibility).</li>
                    <li>Payment Information: Your payment details are collected and processed securely by our third-party payment processor, Stripe. We do not store or process payment card information on our servers.</li>
                    <li>Purchase Information: Ticket quantity, pricing tier, and related transaction data.</li>
                    <li>Device and Technical Data: IP address, browser type and version, operating system, referral URLs, and clickstream behavior.</li>
                </ul>
                <p className="font-medium">Clients:</p>
                <ul className="list-disc list-inside mb-4 text-gray-700">
                    <li>Contact and identification information such as organization name, logo, contact person name, phone number, and email address.</li>
                    <li>Payment information, such as your Stripe account ID.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-8 mb-2">5. Cookies and Tracking Technologies</h2>
                <p className="mb-2">We use cookies and similar technologies to improve your experience on our Platform. These include:</p>
                <ul className="list-disc list-inside mb-4 text-gray-700">
                    <li><strong>Strictly Necessary Cookies:</strong> For core functionality like processing transactions.</li>
                    <li><strong>Performance Cookies:</strong> To monitor and improve the performance of our Platform.</li>
                    <li><strong>Marketing Cookies:</strong> To show relevant ads and measure their effectiveness.</li>
                </ul>
                <p className="mb-4">You may disable cookies via your browser settings, but this may impact the functionality of the Platform.</p>

                <h2 className="text-xl font-semibold mt-8 mb-2">6. Why We Collect Your Information</h2>
                <ul className="list-disc list-inside mb-4 text-gray-700">
                    <li>To facilitate ticket purchases and process payments.</li>
                    <li>To verify geographic eligibility (Ontario only).</li>
                    <li>To issue raffle entries and confirmations.</li>
                    <li>To contact you in connection with the raffle or for customer support.</li>
                    <li>To comply with legal obligations, including provincial gaming regulations.</li>
                    <li>To analyze and improve our Platform performance and marketing effectiveness.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-8 mb-2">7. Disclosure of Your Information</h2>
                <p className="mb-2">We may disclose your information to:</p>
                <ul className="list-disc list-inside mb-4 text-gray-700">
                    <li>Stripe, our payment processor, to handle transactions.</li>
                    <li>Government or regulatory bodies, if required by law or in connection with a legal process.</li>
                    <li>Service providers that support our operations (e.g., email services, analytics).</li>
                    <li>Charitable organizations that host the 50/50 raffles you participate in, limited to your name, email, and purchase details where required for regulatory or prize delivery purposes.</li>
                </ul>
                <p className="mb-4">We do not allow access to the Platform by charities or participants through login credentials.</p>

                <h2 className="text-xl font-semibold mt-8 mb-2">8. Data Transfers</h2>
                <p className="mb-4">
                    Although our focus is in Ontario, some of our service providers (e.g., Stripe) may process data outside of Canada. In such cases, your data may be subject to foreign laws and accessible to foreign governments.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-2">9. Data Retention</h2>
                <p className="mb-4">
                    We retain personal information only for as long as necessary to fulfill the purposes described in this Privacy Policy, or as required by law (e.g., AGCO requirements for raffle records).
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-2">10. Your Rights</h2>
                <ul className="list-disc list-inside mb-4 text-gray-700">
                    <li>Request access to the personal information we hold about you.</li>
                    <li>Request corrections to inaccurate or outdated information.</li>
                    <li>Withdraw your consent, subject to legal or contractual restrictions.</li>
                </ul>
                <p className="mb-4">To make any such requests, please contact our Privacy Officer at: <a href="mailto:info@glowingheartsfundraising.ca" className="text-blue-600 underline">info@glowingheartsfundraising.ca</a></p>

                <h2 className="text-xl font-semibold mt-8 mb-2">11. Security</h2>
                <p className="mb-4">
                    We employ industry-standard safeguards, including encryption, firewalls, and access restrictions, to protect your personal information from unauthorized access or disclosure.
                </p>
                <p className="mb-4">Despite our efforts, no method of data transmission or storage is completely secure.</p>

                <h2 className="text-xl font-semibold mt-8 mb-2">12. Children’s Privacy</h2>
                <p className="mb-4">
                    Our Platform is not intended for use by individuals under the age of 18. We do not knowingly collect information from minors. If you believe we have inadvertently collected information from a minor, please contact us and we will promptly delete it.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-2">13. Changes to This Privacy Policy</h2>
                <p className="mb-4">
                    We may update this Privacy Policy from time to time. If we make material changes, we will notify you through the Platform or other appropriate means. The date of the last update will always appear at the top of this document.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-2">14. Contact Us</h2>
                <p className="mb-4">
                    For questions or concerns about this Privacy Policy, please contact us at: <a href="mailto:info@glowingheartsfundraising.com" className="text-blue-600 underline">info@glowingheartsfundraising.com</a>
                </p>
            </TermsLayout>
            <Footer />
        </main>
    );
}


