// components/TermsLayout.tsx
export default function TermsLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 px-4 py-10">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">{title}</h1>
        <div className="prose prose-gray max-w-none">{children}</div>
      </div>
    </main>
  );
}
