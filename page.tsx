"use client";
import React, { useState } from 'react';

export default function Platform() {
  const [view, setView] = useState('intro'); // 'intro', 'quiz', 'result', 'dashboard'
  const [scores, setScores] = useState<number[]>([]);
  const [step, setStep] = useState(0);

  const questions = [
    { text: "How organized is your current roster planning?", options: ["Manual/Paper", "Spreadsheets", "Digital/Automated"], values: [1, 2, 3] },
    { text: "How often do you use AI tools to help with work tasks?", options: ["Never", "Rarely", "Daily"], values: [1, 2, 3] },
    { text: "How much time do you spend on manual checklists?", options: ["A lot", "Some", "Very little"], values: [1, 2, 3] },
    { text: "How clear are your current step-by-step implementation routines?", options: ["Unclear", "Vague", "Very Clear"], values: [1, 2, 3] },
    { text: "Are you looking to integrate automated AI status analysis?", options: ["Not sure", "Maybe", "Definitely"], values: [1, 2, 3] },
  ];

  const handleAnswer = (value: number) => {
    const newScores = [...scores, value];
    setScores(newScores);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setView('result');
    }
  };

  const totalScore = scores.reduce((a, b) => a + b, 0);

  // --- VIEW 1: INTRO ---
  if (view === 'intro') {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">SmartPlatform</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-xl">Optimize your workflow with AI and smart planning.</p>
        <button onClick={() => setView('quiz')} className="bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg hover:scale-105 transition-transform">
          Start Assessment
        </button>
      </main>
    );
  }
// --- VIEW 2: QUIZ (Updated for better visibility) ---
  if (view === 'quiz') {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-3 rounded-full mb-8">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-500" 
              style={{ width: `${((step + 1) / questions.length) * 100}%` }}
            ></div>
          </div>

          {/* Question Text - Now Darker and Larger */}
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 leading-tight">
            {questions[step].text}
          </h2>

          {/* Answer Buttons - Now with darker text and better hover states */}
          <div className="space-y-4">
            {questions[step].options.map((opt, i) => (
              <button 
                key={i} 
                onClick={() => handleAnswer(questions[step].values[i])} 
                className="w-full p-5 text-left border-2 border-gray-200 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-all group"
              >
                <span className="text-lg font-semibold text-gray-900 group-hover:text-blue-700">
                  {opt}
                </span>
              </button>
            ))}
          </div>

          <p className="mt-8 text-center text-sm font-bold text-gray-400 uppercase tracking-widest">
            Step {step + 1} of {questions.length}
          </p>
        </div>
      </main>
    );
  }

  // --- VIEW 3: RESULT ---
  if (view === 'result') {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-5xl mb-4">📊</div>
          <h2 className="text-2xl font-bold mb-2">Analysis Complete!</h2>
          <p className="text-gray-600 mb-6 font-bold text-2xl text-blue-600">{totalScore} / 15</p>
          <button 
            onClick={() => setView('dashboard')} 
            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 shadow-md"
          >
            Enter Platform →
          </button>
        </div>
      </main>
    );
  }

  // --- VIEW 4: THE MAIN DASHBOARD (The "Home Page") ---
  return (
    <main className="min-h-screen bg-white">
      {/* Simple Sidebar/Nav Simulation */}
      <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <span className="font-bold text-xl">SmartPlatform Dashboard</span>
        <div className="space-x-4 text-sm">
          <button className="text-gray-300 hover:text-white">Checklists</button>
          <button className="text-gray-300 hover:text-white">Roster</button>
          <button className="text-gray-300 hover:text-white">AI Tools</button>
        </div>
      </nav>

      <div className="p-8 max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back!</h1>
          <p className="text-gray-500">Your readiness score: {totalScore}/15</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: AI Analysis */}
          <div className="p-6 border rounded-2xl bg-gradient-to-br from-blue-50 to-white shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-blue-800 mb-2">AI Status Analysis</h3>
            <p className="text-sm text-gray-600 mb-4">Get personalized tips based on your score.</p>
            <button className="text-blue-600 font-semibold text-sm hover:underline">Open AI Assistant →</button>
          </div>

          {/* Card 2: Checklists */}
          <div className="p-6 border rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-gray-800 mb-2">Implementation Checklists</h3>
            <p className="text-sm text-gray-600 mb-4">Next step: Setup your digital roster.</p>
            <button className="text-blue-600 font-semibold text-sm hover:underline">View Tasks →</button>
          </div>

          {/* Card 3: Roster Help */}
          <div className="p-6 border rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-gray-800 mb-2">Roster Planning</h3>
            <p className="text-sm text-gray-600 mb-4">Upload your current file for optimization.</p>
            <button className="text-blue-600 font-semibold text-sm hover:underline">Go to Planner →</button>
          </div>
        </div>
      </div>
    </main>
  );
}