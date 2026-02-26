"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  description: string;
  applyLabel: string;
  applyingLabel: string;
  successLabel: string;
  errorLabel: string;
};

export default function AffiliateApplyCard({
  title,
  description,
  applyLabel,
  applyingLabel,
  successLabel,
  errorLabel,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleApply() {
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/affiliate/apply", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Apply failed");
      }

      setMessage(successLabel);
      router.refresh();
    } catch {
      setMessage(errorLabel);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <p className="mt-2 text-sm text-gray-600">{description}</p>

      <button
        type="button"
        onClick={handleApply}
        disabled={loading}
        className="mt-5 inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? applyingLabel : applyLabel}
      </button>

      {message ? <p className="mt-3 text-sm text-gray-600">{message}</p> : null}
    </div>
  );
}
