import React from 'react';
import { Send } from 'lucide-react';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function TextEditor({ value, onChange, onSubmit }: TextEditorProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="input" className="block text-sm font-medium">
          Paste your text here:
        </label>
        <textarea
          id="input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-48 p-4 rounded-lg bg-[#40414f] border border-gray-600 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition"
          placeholder="Paste your ChatGPT text here..."
        />
      </div>
      
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-[#10a37f] hover:bg-[#0e916f] text-white font-medium py-2 px-4 rounded-lg transition"
      >
        <Send size={20} />
        Format Text
      </button>
    </form>
  );
}