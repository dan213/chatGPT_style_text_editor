import React, { useState } from 'react';
import { TextEditor } from './components/TextEditor';
import { FormattedOutput } from './components/FormattedOutput';
import { formatText } from './utils/textFormatter';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOutput(formatText(input));
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      alert('Copied to clipboard!');
    } catch (err) {
      alert('Failed to copy text');
    }
  };

  return (
    <div className="min-h-screen bg-[#343541] text-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">ChatGPT Text Formatter</h1>
        
        <TextEditor 
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
        />

        {output && (
          <FormattedOutput 
            content={output}
            onCopy={copyToClipboard}
          />
        )}
      </div>
    </div>
  );
}

export default App;