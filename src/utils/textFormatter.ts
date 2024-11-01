interface FormattedSegment {
  type: 'text' | 'code';
  content: string;
}

export function formatText(text: string): string {
  const processText = (text: string): string => {
    return text
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .replace(/\r\n/g, '\n')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/#{1,6}\s/g, '')
      .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
      .replace(/^\s*[-*+]\s/gm, '• ')
      .replace(/^\s*\d+\.\s/gm, (match) => match)
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  };

  // Split text into segments of code and regular text
  const segments: FormattedSegment[] = [];
  let currentIndex = 0;
  const codeBlockRegex = /```[\s\S]*?```|`[^`]+`/g;
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    // Add text before code block
    if (match.index > currentIndex) {
      segments.push({
        type: 'text',
        content: processText(text.slice(currentIndex, match.index))
      });
    }

    // Add code block
    const code = match[0];
    segments.push({
      type: 'code',
      content: code.startsWith('```') 
        ? code.slice(3, -3).trim()
        : code.slice(1, -1).trim()
    });

    currentIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (currentIndex < text.length) {
    segments.push({
      type: 'text',
      content: processText(text.slice(currentIndex))
    });
  }

  return JSON.stringify(segments);
}

export function getPlainText(segments: FormattedSegment[]): string {
  return segments
    .map(segment => {
      if (segment.type === 'code') {
        return `\n${segment.content}\n`;
      }
      return segment.content;
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n');
}