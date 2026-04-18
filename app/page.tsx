'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
      subject: '',
      gradelevel: '',
      learningobjectives: '',
      availableperiods: '',
      studentabilities: ''
  });
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setOutput(data.result || data.error || 'No response');
    } catch {
      setOutput('Error generating response.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3" style={{ color: `hsl(185,60%,55%)` }}>
            AI Education Tool
          </h1>
          <p className="text-gray-400">Fill in the fields below and click Generate</p>
        </div>

        <div className="space-y-5 mb-8">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: `hsl(185,60%,55%)` }}>Subject</label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/30"
              placeholder={"Enter subject"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: `hsl(185,60%,55%)` }}>Grade Level</label>
            <input
              type="text"
              value={formData.gradelevel}
              onChange={(e) => setFormData({ ...formData, gradelevel: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/30"
              placeholder={"Enter grade level"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: `hsl(185,60%,55%)` }}>Learning Objectives</label>
            <input
              type="text"
              value={formData.learningobjectives}
              onChange={(e) => setFormData({ ...formData, learningobjectives: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/30"
              placeholder={"Enter learning objectives"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: `hsl(185,60%,55%)` }}>Available Periods</label>
            <input
              type="text"
              value={formData.availableperiods}
              onChange={(e) => setFormData({ ...formData, availableperiods: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/30"
              placeholder={"Enter available periods"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: `hsl(185,60%,55%)` }}>Student Abilities</label>
            <input
              type="text"
              value={formData.studentabilities}
              onChange={(e) => setFormData({ ...formData, studentabilities: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/30"
              placeholder={"Enter student abilities"}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 px-6 rounded-lg font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: `hsl(185,60%,55%)` }}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>

        {output && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3" style={{ color: `hsl(185,60%,55%)` }}>Result</h2>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-gray-300 whitespace-pre-wrap">
              {output}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
