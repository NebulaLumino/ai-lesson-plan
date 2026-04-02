"use client";

import { useState } from "react";

const accent = "blue";

export default function LessonPlanPage() {
  const [form, setForm] = useState({
    subject: "",
    gradeLevel: "Grade 6",
    topic: "",
    duration: "50 minutes",
    learningStyle: "Visual",
    materials: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.subject.trim() || !form.topic.trim()) return;
    setLoading(true);
    setError("");
    setResult("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setResult(data.result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const btnClass = "bg-blue-600 hover:bg-blue-500 focus:ring-blue-500";

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">AI Lesson Plan Generator</h1>
            <p className="text-xs text-gray-400">Generate detailed lesson plans with activities &amp; assessments</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8">
        {/* Form */}
        <div className="lg:w-2/5">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Subject <span className="text-red-400">*</span>
              </label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="e.g. Mathematics, Science, English"
                required
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Topic <span className="text-red-400">*</span>
              </label>
              <input
                name="topic"
                value={form.topic}
                onChange={handleChange}
                placeholder="e.g. Photosynthesis, Quadratic Equations"
                required
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Grade Level</label>
                <select
                  name="gradeLevel"
                  value={form.gradeLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  {["Kindergarten","Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6","Grade 7","Grade 8","Grade 9","Grade 10","Grade 11","Grade 12"].map(g => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Duration</label>
                <select
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  {["30 minutes","45 minutes","50 minutes","60 minutes","90 minutes","Block schedule (90+ min)"].map(d => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Learning Style Focus</label>
              <select
                name="learningStyle"
                value={form.learningStyle}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                {["Visual","Auditory","Kinesthetic","Reading/Writing","Multimodal"].map(s => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Available Materials</label>
              <textarea
                name="materials"
                value={form.materials}
                onChange={handleChange}
                rows={3}
                placeholder="e.g. Whiteboard, projector, science lab equipment, worksheets"
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-200 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed ${btnClass}`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Generating Lesson Plan…
                </span>
              ) : (
                "Generate Lesson Plan"
              )}
            </button>

            {error && (
              <div className="p-3 bg-red-900/30 border border-red-700 rounded-xl text-red-300 text-sm">{error}</div>
            )}
          </form>
        </div>

        {/* Output */}
        <div className="lg:w-3/5">
          {result ? (
            <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-700 bg-gradient-to-r from-blue-900/40 to-blue-800/40 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-sm font-medium text-gray-300">Generated Lesson Plan</span>
              </div>
              <div className="p-6 overflow-auto max-h-[70vh]">
                <pre className="whitespace-pre-wrap text-sm text-gray-200 font-mono leading-relaxed">{result}</pre>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-gray-700 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-400 mb-2">Your lesson plan will appear here</h3>
              <p className="text-sm text-gray-500 max-w-xs">Fill out the form and click &ldquo;Generate Lesson Plan&rdquo; to create a complete classroom-ready lesson with hook, instruction, activities, and assessments.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
