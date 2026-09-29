"use client";

import { useState } from "react";

export default function BlogCommentForm({ articleTitle }: { articleTitle: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: "0400000000",
          service: `Blog: ${articleTitle}`,
          message: comment,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setName("");
        setEmail("");
        setComment("");
      } else {
        setError(data.message || "Failed to post comment.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-12 pt-8 border-t">
      <h3 className="text-xl font-bold mb-4">Leave a Reply or Question</h3>
      {success ? (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl">
          <p className="font-bold">Thank you for your comment!</p>
          <p className="text-sm mt-1">Our editorial and cleaning experts will review and reply shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-gray-700">Comment / Question *</label>
            <textarea
              required
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts or ask a cleaning question..."
              className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 mt-1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 mt-1"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-semibold px-8 py-3 rounded-xl transition shadow"
          >
            {submitting ? "Posting..." : "Post Comment →"}
          </button>
        </form>
      )}
    </div>
  );
}
