import React, { useRef } from 'react';
import { Clipboard, Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { getPlainText } from '../utils/textFormatter';

interface FormattedSegment {
  type: 'text' | 'code';
  content: string;
}

interface FormattedOutputProps {
  content: string;
  onCopy: () => void;
}

export function FormattedOutput({ content, onCopy }: FormattedOutputProps) {
  const outputRef = useRef<HTMLDivElement>(null);
  const segments: FormattedSegment[] = JSON.parse(content);

  const handleCopy = async () => {
    const plainText = getPlainText(segments);
    await navigator.clipboard.writeText(plainText);
    onCopy();
  };

  const handleDownloadPDF = () => {
    if (!outputRef.current) return;

    const element = outputRef.current;
    const opt = {
      margin: 1,
      filename: 'formatted-text.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  const renderSegment = (segment: FormattedSegment, index: number) => {
    if (segment.type === 'code') {
      return (
        <pre key={index} className="my-2 p-3 bg-[#1e1e1e] rounded border border-gray-700 font-mono text-sm text-[#d4d4d4] overflow-x-auto">
          <code>{segment.content}</code>
        </pre>
      );
    }
    return (
      <p key={index} className="whitespace-pre-wrap font-sans text-gray-100">
        {segment.content}
      </p>
    );
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium">Formatted Output:</label>
        <div className="flex gap-4">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
          >
            <Clipboard size={16} />
            Copy to clipboard
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
          >
            <Download size={16} />
            Download PDF
          </button>
        </div>
      </div>
      <div 
        ref={outputRef}
        className="w-full min-h-48 p-4 rounded-lg bg-[#40414f] border border-gray-600 space-y-2"
      >
        {segments.map((segment, index) => renderSegment(segment, index))}
      </div>
    </div>
  );
}