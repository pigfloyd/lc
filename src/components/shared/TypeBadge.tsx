import { motion } from 'framer-motion';

const TYPE_CONFIG: Record<string, { bg: string; text: string; border: string; label: string; emoji: string }> = {
  int: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', label: 'int', emoji: '🔢' },
  float: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-300', label: 'float', emoji: '🔢' },
  str: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300', label: 'str', emoji: '📝' },
  bool: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300', label: 'bool', emoji: '💡' },
};

type PyType = 'int' | 'float' | 'str' | 'bool';

interface TypeBadgeProps {
  type: PyType;
  size?: 'sm' | 'md' | 'lg';
  showEmoji?: boolean;
  className?: string;
}

export default function TypeBadge({ type, size = 'md', showEmoji = true, className = '' }: TypeBadgeProps) {
  const config = TYPE_CONFIG[type] ?? TYPE_CONFIG.str;
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : size === 'lg' ? 'text-base px-4 py-1.5' : 'text-sm px-3 py-1';

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-1 font-mono font-semibold rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClass} ${className}`}
    >
      {showEmoji && <span>{config.emoji}</span>}
      {config.label}
    </motion.span>
  );
}

export { TYPE_CONFIG };
export type { PyType };