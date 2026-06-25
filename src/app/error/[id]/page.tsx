import { errors } from "@/data/errors";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

export function generateStaticParams() {
  return errors.map((e) => ({ id: e.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const error = errors.find((e) => e.id === id);
  if (!error) return {};

  const title = `${error.errorMessage} — Explained & Fixed | ErrorDB`;
  const description = `${error.explanation} Common causes and working solutions for this ${error.language} error.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      siteName: "ErrorDB",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function ErrorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const error = errors.find((e) => e.id === id);
  if (!error) notFound();

  const related = errors.filter((e) =>
    error.relatedErrors.includes(e.id)
  );

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: error.errorMessage,
            description: error.explanation,
            author: { "@type": "Organization", name: "ErrorDB" },
            publisher: {
              "@type": "Organization",
              name: "ErrorDB",
            },
          }),
        }}
      />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-300 transition-colors">
          All Errors
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-400">{error.language}</span>
        <span className="mx-2">›</span>
        <span className="text-gray-300">{error.category}</span>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300">
            {error.language}
          </span>
          <span className="text-xs text-gray-500">{error.category}</span>
        </div>
        <h1 className="text-2xl font-mono text-red-300 break-all mb-4 leading-relaxed">
          {error.errorMessage}
        </h1>
        <p className="text-gray-300 text-lg leading-relaxed">
          {error.explanation}
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-200 mb-3 flex items-center gap-2">
          <span className="text-yellow-400">●</span> Common Causes
        </h2>
        <ul className="space-y-2">
          {error.causes.map((cause, i) => (
            <li key={i} className="flex gap-3 text-gray-300">
              <span className="text-gray-600 shrink-0 mt-0.5">
                {i + 1}.
              </span>
              <span>{cause}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-200 mb-3 flex items-center gap-2">
          <span className="text-green-400">●</span> How to Fix
        </h2>
        <ul className="space-y-2">
          {error.solutions.map((solution, i) => (
            <li key={i} className="flex gap-3 text-gray-300">
              <span className="text-gray-600 shrink-0 mt-0.5">
                {i + 1}.
              </span>
              <span>{solution}</span>
            </li>
          ))}
        </ul>
      </section>

      {error.codeExample && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-200 mb-3 flex items-center gap-2">
            <span className="text-blue-400">●</span> Code Example
          </h2>
          <pre className="bg-gray-900 border border-gray-800 rounded-lg p-4 overflow-x-auto text-sm font-mono text-gray-300 leading-relaxed">
            {error.codeExample}
          </pre>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-10 pt-6 border-t border-gray-800">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
            Related Errors
          </h2>
          <div className="grid gap-2">
            {related.map((rel) => (
              <Link
                key={rel.id}
                href={`/error/${rel.id}`}
                className="p-3 rounded-lg border border-gray-800 hover:border-gray-600 transition-colors group"
              >
                <code className="text-sm text-red-300/80 group-hover:text-red-300 font-mono">
                  {rel.errorMessage}
                </code>
                <div className="text-xs text-gray-500 mt-1">
                  {rel.language} — {rel.category}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
