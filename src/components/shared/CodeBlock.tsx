import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  highlightLines?: number[];
  showLineNumbers?: boolean;
}

const KEYWORDS = new Set([
  'def', 'return', 'if', 'elif', 'else', 'for', 'while', 'in', 'not', 'and', 'or',
  'True', 'False', 'None', 'import', 'from', 'as', 'class', 'try', 'except', 'finally',
  'with', 'raise', 'pass', 'break', 'continue', 'yield', 'lambda', 'global', 'is',
]);

const BUILTINS = new Set([
  'print', 'len', 'range', 'int', 'float', 'str', 'bool', 'list', 'dict', 'tuple',
  'set', 'type', 'input', 'open', 'enumerate', 'zip', 'map', 'filter', 'sorted',
  'abs', 'round', 'max', 'min', 'sum', 'any', 'all', 'isinstance', 'super',
]);

function tokenize(line: string): React.ReactNode[] {
  const tokens: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < line.length) {
    const ch = line[i];

    if (ch === '#') {
      tokens.push(
        <span key={key++} className="text-slate-500 italic">{line.slice(i)}</span>
      );
      break;
    }

    if (ch === '"' || ch === "'") {
      const quote = ch;
      let j = i + 1;
      while (j < line.length && line[j] !== quote) {
        if (line[j] === '\\') j++;
        j++;
      }
      tokens.push(
        <span key={key++} className="text-amber-300">{line.slice(i, j + 1)}</span>
      );
      i = j + 1;
      continue;
    }

    if (/\d/.test(ch)) {
      let j = i;
      while (j < line.length && /[\d.]/.test(line[j])) j++;
      tokens.push(
        <span key={key++} className="text-purple-400">{line.slice(i, j)}</span>
      );
      i = j;
      continue;
    }

    if (/[a-zA-Z_]/.test(ch)) {
      let j = i;
      while (j < line.length && /\w/.test(line[j])) j++;
      const word = line.slice(i, j);
      if (KEYWORDS.has(word)) {
        tokens.push(<span key={key++} className="text-pink-400 font-semibold">{word}</span>);
      } else if (BUILTINS.has(word)) {
        tokens.push(<span key={key++} className="text-cyan-300">{word}</span>);
      } else {
        tokens.push(<span key={key++}>{word}</span>);
      }
      i = j;
      continue;
    }

    if (ch === '=' && line[i + 1] !== '=') {
      tokens.push(<span key={key++} className="text-sky-300">=</span>);
      i++;
      continue;
    }

    if ('+-*/%<>!'.includes(ch)) {
      tokens.push(<span key={key++} className="text-sky-300">{ch}</span>);
      i++;
      continue;
    }

    if (ch === '(' || ch === ')' || ch === '[' || ch === ']' || ch === '{' || ch === '}') {
      tokens.push(<span key={key++} className="text-yellow-400">{ch}</span>);
      i++;
      continue;
    }

    tokens.push(<span key={key++}>{ch}</span>);
    i++;
  }

  return tokens;
}

export default function CodeBlock({ code, language = 'python', highlightLines = [], showLineNumbers = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const lines = code.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative group my-6 rounded-xl overflow-hidden bg-slate-900 shadow-lg">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800/60 border-b border-slate-700">
        <span className="text-xs text-slate-400 font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="text-xs text-slate-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-slate-700"
        >
          {copied ? '✓ 已复制' : '复制'}
        </button>
      </div>
      <div className="overflow-x-auto p-5">
        {lines.map((line, idx) => {
          const lineNum = idx + 1;
          const isHighlighted = highlightLines.includes(lineNum);
          return (
            <div
              key={idx}
              className={`flex leading-relaxed text-sm font-mono ${
                isHighlighted ? 'bg-blue-900/30 -mx-5 px-5 border-l-2 border-blue-400' : ''
              }`}
            >
              {showLineNumbers && (
                <span className="select-none text-slate-600 w-8 text-right mr-4 shrink-0">
                  {lineNum}
                </span>
              )}
              <span className="text-slate-100">{tokenize(line)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}