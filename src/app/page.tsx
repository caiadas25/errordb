"use client";

import { useState, useMemo } from "react";
import { errors, ErrorEntry } from "@/data/errors";
import Fuse from "fuse.js";

const fuse = new Fuse(errors, {
  keys: [
    { name: "errorMessage", weight: 3 },
    { name: "language", weight: 2 },
    { name: "category", weight: 1 },
    { name: "explanation", weight: 0.5 },
  ],
  threshold: 0.4,
  includeScore: true,
});

const languages = [...new Set(errors.map((e) => e.language))].sort();

function ErrorCard({ error }: { error: ErrorEntry }) {
  return (
    <a
      href={`/error/${error.id}`}
      className="block p-4 rounded-lg border border-gray-800 hover:border-gray-600 hover:bg-gray-900/50 transition-all group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <code className="text-sm text-red-300 font-mono break-all line-clamp-2">
            {error.errorMessage}
          </code>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-300">
              {error.language}
            </span>
            <span className="text-xs text-gray-500">{error.category}</span>
          </div>
        </div>
        <span className="text-gray-600 group-hover:text-gray-400 transition-colors shrink-0 text-lg">
          →
        </span>
      </div>
    </a>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedLang, setSelectedLang] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let results: ErrorEntry[];
    if (query.trim()) {
      results = fuse.search(query).map((r) => r.item);
    } else {
      results = [...errors];
    }
    if (selectedLang) {
      results = results.filter((e) => e.language === selectedLang);
    }
    return results;
  }, [query, selectedLang]);

  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">
          Find that <span className="text-red-400">error</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Searchable database of programming error messages. Plain-English
          explanations, common causes, and working fixes.
        </p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder='Search errors... e.g. "TypeError", "cannot find module", "syntax error"'
            className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 font-mono text-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedLang(null)}
          className={`text-xs px-3 py-1 rounded-full border transition-colors ${
            selectedLang === null
              ? "bg-red-500/20 border-red-500/50 text-red-300"
              : "border-gray-700 text-gray-400 hover:border-gray-500"
          }`}
        >
          All ({errors.length})
        </button>
        {languages.map((lang) => {
          const count = errors.filter((e) => e.language === lang).length;
          return (
            <button
              key={lang}
              onClick={() =>
                setSelectedLang(selectedLang === lang ? null : lang)
              }
              className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                selectedLang === lang
                  ? "bg-red-500/20 border-red-500/50 text-red-300"
                  : "border-gray-700 text-gray-400 hover:border-gray-500"
              }`}
            >
              {lang} ({count})
            </button>
          );
        })}
      </div>

      <div className="text-sm text-gray-500 mb-4">
        {filtered.length} error{filtered.length !== 1 ? "s" : ""} found
      </div>

      <div className="grid gap-3">
        {filtered.map((error) => (
          <ErrorCard key={error.id} error={error} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No errors matching &quot;{query}&quot;. Try a different search.
          </div>
        )}
      </div>
    </div>
  );
}
