import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CodeBlock from '../../components/shared/CodeBlock';
import TypeBadge, { type PyType } from '../../components/shared/TypeBadge';

// ══════════════════════════════════════════════════════════════════
//  开场动画：给数据贴标签
// ══════════════════════════════════════════════════════════════════

const INTRO_ITEMS: {
  label: string;
  value: string;
  badge: PyType;
  box: string;
  tag: string;
  val: string;
}[] = [
  { label: 'target_word', value: '"把"', badge: 'str', box: 'border-amber-300 bg-amber-50', tag: 'bg-amber-500', val: 'text-amber-700' },
  { label: 'word_count', value: '128', badge: 'int', box: 'border-blue-300 bg-blue-50', tag: 'bg-blue-500', val: 'text-blue-700' },
  { label: 'is_passive', value: 'True', badge: 'bool', box: 'border-purple-300 bg-purple-50', tag: 'bg-purple-500', val: 'text-purple-700' },
];

function LabelBoxIntro() {
  const [revealed, setRevealed] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) return;
    if (revealed >= INTRO_ITEMS.length) {
      setPlaying(false);
      return;
    }
    timer.current = window.setTimeout(() => setRevealed((r) => r + 1), 850);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [playing, revealed]);

  const play = () => {
    setRevealed(0);
    setPlaying(true);
  };

  return (
    <div className="my-8 rounded-2xl border-2 border-slate-200 bg-gradient-to-b from-slate-50 to-white p-6">
      <div className="flex flex-wrap gap-6 justify-center min-h-[13rem] items-end">
        {INTRO_ITEMS.map((item, i) => (
          <div key={item.label} className="flex flex-col items-center w-32">
            <AnimatePresence>
              {i < revealed && (
                <motion.div
                  initial={{ opacity: 0, y: -40, scale: 0.6 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 16 }}
                  className="flex flex-col items-center"
                >
                  <div className={`w-28 h-28 rounded-2xl border-2 shadow-sm flex items-center justify-center ${item.box}`}>
                    <span className={`text-xl font-mono font-bold ${item.val}`}>{item.value}</span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className={`mt-3 px-3 py-1.5 rounded-full text-white text-sm font-mono font-semibold shadow-sm ${item.tag}`}
                  >
                    {item.label}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 }}
                  >
                    <TypeBadge type={item.badge} size="sm" className="mt-2" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            {i >= revealed && <div className="w-28 h-28 rounded-2xl border-2 border-dashed border-slate-200" />}
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-3 mt-6">
        <button
          onClick={play}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors"
        >
          ▶ 重新播放
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
//  赋值机：= 是"把右边放进左边"
// ══════════════════════════════════════════════════════════════════

const ASSIGN_VALUES = ['128', '256', '5000'];

function AssignMachine() {
  const [value, setValue] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  const assign = (v: string) => {
    setValue(v);
    setCount((c) => c + 1);
  };

  const caption =
    count === 0 ? '点下面任意一个值，把它放进盒子里' : count === 1 ? '第一次赋值：值被放进了盒子' : '重新赋值：旧值被丢掉，换成了新值';

  return (
    <div className="my-6 rounded-2xl border-2 border-slate-200 bg-white overflow-hidden">
      <div className="grid md:grid-cols-2 gap-6 p-6 items-center">
        {/* 左：盒子 */}
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-40 rounded-2xl border-2 border-blue-300 bg-blue-50 shadow-sm flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              {value ? (
                <motion.span
                  key={value + count}
                  initial={{ opacity: 0, y: -50, scale: 0.5 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.5 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                  className="text-3xl font-mono font-bold text-blue-700"
                >
                  {value}
                </motion.span>
              ) : (
                <span className="text-slate-400 text-sm">（空盒子）</span>
              )}
            </AnimatePresence>
          </div>
          <div className="mt-3 px-4 py-1.5 rounded-full bg-blue-500 text-white font-mono font-semibold shadow-sm">
            count
          </div>
        </div>

        {/* 右：值选择器 */}
        <div>
          <p className="text-sm text-slate-500 mb-3">把哪个值放进 <code>count</code>？</p>
          <div className="flex flex-wrap gap-3">
            {ASSIGN_VALUES.map((v) => (
              <button
                key={v}
                onClick={() => assign(v)}
                className={`px-5 py-3 rounded-xl font-mono font-bold text-lg border-2 transition-all ${
                  value === v
                    ? 'border-purple-400 bg-purple-100 text-purple-700 scale-105'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-purple-300 hover:bg-purple-50'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <div className="mt-5 rounded-xl bg-slate-900 px-4 py-3 font-mono text-sm">
            <span className="text-slate-100">count</span>
            <span className="text-sky-300"> = </span>
            <span className="text-purple-400">{value ?? '?'}</span>
          </div>
        </div>
      </div>
      <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-center text-sm text-slate-600">
        {caption}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
//  四种类型可视化
// ══════════════════════════════════════════════════════════════════

const TYPE_CARDS: {
  type: PyType;
  title: string;
  desc: string;
  examples: string[];
  ring: string;
}[] = [
  { type: 'int', title: '整数', desc: '数东西，没有小数点', examples: ['word_freq = 128', 'num_speakers = 30'], ring: 'hover:border-blue-300' },
  { type: 'float', title: '浮点数', desc: '带小数点的精确量', examples: ['ttr = 0.67', 'mean_len = 15.3'], ring: 'hover:border-emerald-300' },
  { type: 'str', title: '字符串', desc: '文本，要用引号括起来', examples: ['word = "把"', 'lang = "汉语"'], ring: 'hover:border-amber-300' },
  { type: 'bool', title: '布尔值', desc: '只有真 / 假两种答案', examples: ['is_passive = True', 'has_neg = False'], ring: 'hover:border-purple-300' },
];

function FourTypes() {
  return (
    <div className="grid sm:grid-cols-2 gap-4 my-6">
      {TYPE_CARDS.map((card, i) => (
        <motion.div
          key={card.type}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className={`p-5 rounded-2xl border-2 border-slate-200 bg-white transition-all ${card.ring}`}
        >
          <div className="flex items-center gap-3 mb-3">
            <TypeBadge type={card.type} size="md" />
            <span className="font-semibold text-slate-700">{card.title}</span>
          </div>
          <p className="text-sm text-slate-500 mb-3">{card.desc}</p>
          <div className="space-y-1.5">
            {card.examples.map((ex) => (
              <div key={ex} className="font-mono text-sm text-slate-700 bg-slate-50 rounded-lg px-3 py-1.5">
                {ex}
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
//  类型侦探：识别类型的小游戏
// ══════════════════════════════════════════════════════════════════

const DECK: { value: string; type: PyType; why: string }[] = [
  { value: '"把"', type: 'str', why: '有引号 → 文本 → str' },
  { value: '128', type: 'int', why: '整数，没有小数点 → int' },
  { value: '0.67', type: 'float', why: '有小数点 → float' },
  { value: 'True', type: 'bool', why: '真 / 假 → bool' },
  { value: '"现代汉语语料库"', type: 'str', why: '有引号 → str' },
  { value: '15.3', type: 'float', why: '有小数点 → float' },
];

const OPTIONS: PyType[] = ['int', 'float', 'str', 'bool'];

function TypeDetective() {
  const [index, setIndex] = useState(0);
  const [pick, setPick] = useState<PyType | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const card = DECK[index];
  const answered = pick !== null;
  const correct = pick === card.type;

  const choose = (opt: PyType) => {
    if (answered) return;
    setPick(opt);
    if (opt === card.type) setScore((s) => s + 1);
  };

  const next = () => {
    if (index >= DECK.length - 1) {
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
    setPick(null);
  };

  const restart = () => {
    setIndex(0);
    setPick(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    return (
      <div className="my-6 rounded-2xl border-2 border-slate-200 bg-white p-8 text-center">
        <div className="text-4xl mb-3">{score === DECK.length ? '🏆' : '🎯'}</div>
        <p className="text-lg font-semibold text-slate-700 mb-1">
          你答对了 {score} / {DECK.length} 题
        </p>
        <p className="text-sm text-slate-500 mb-5">
          {score === DECK.length ? '全对，你已经是类型侦探啦' : '再来一遍就更熟练了'}
        </p>
        <button onClick={restart} className="px-5 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors">
          ↺ 再玩一次
        </button>
      </div>
    );
  }

  return (
    <div className="my-6 rounded-2xl border-2 border-slate-200 bg-white overflow-hidden">
      <div className="flex items-center justify-between px-5 py-2.5 bg-slate-50 border-b border-slate-200 text-sm">
        <span className="text-slate-500">第 {index + 1} / {DECK.length} 题</span>
        <span className="text-slate-600 font-medium">得分 {score}</span>
      </div>

      <div className="p-6">
        <p className="text-center text-sm text-slate-500 mb-2">这个值是什么类型？</p>
        <AnimatePresence mode="wait">
          <motion.div
            key={card.value}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center text-4xl font-mono font-bold text-slate-800 my-6"
          >
            {card.value}
          </motion.div>
        </AnimatePresence>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {OPTIONS.map((opt) => {
            const isAnswer = opt === card.type;
            const isPick = opt === pick;
            let cls = 'border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-300 hover:bg-blue-50';
            if (answered && isAnswer) cls = 'border-green-400 bg-green-100 text-green-700';
            else if (answered && isPick) cls = 'border-red-400 bg-red-100 text-red-700';
            else if (answered) cls = 'border-slate-200 bg-slate-50 text-slate-400';
            return (
              <button
                key={opt}
                onClick={() => choose(opt)}
                disabled={answered}
                className={`py-3 rounded-xl font-mono font-bold border-2 transition-all ${cls}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {answered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-5"
            >
              <div className={`rounded-xl px-4 py-3 text-sm ${correct ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {correct ? '✅ 答对了！' : '❌ 差一点'} {card.why}
              </div>
              <div className="mt-3 rounded-xl bg-slate-900 px-4 py-2.5 font-mono text-sm text-slate-100">
                <span className="text-cyan-300">type</span>({card.value}){' '}
                <span className="text-slate-500"># &lt;class '{card.type}'&gt;</span>
              </div>
              <div className="text-right mt-4">
                <button onClick={next} className="px-5 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors">
                  {index >= DECK.length - 1 ? '看结果 →' : '下一题 →'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
//  类型转换机
// ══════════════════════════════════════════════════════════════════

const CONV_INPUTS = ['"42"', '"3.14"', '"hello"'];
const CONV_FUNCS: PyType[] = ['int', 'float', 'str'];

function fmtFloat(n: number): string {
  return Number.isInteger(n) ? n.toFixed(1) : String(n);
}

function convert(fn: PyType, raw: string): { ok: boolean; out?: string; type?: PyType; err?: string } {
  const inner = raw.replace(/^"|"$/g, '');
  if (fn === 'str') return { ok: true, out: `"${inner}"`, type: 'str' };
  if (fn === 'int') {
    if (/^-?\d+$/.test(inner)) return { ok: true, out: inner, type: 'int' };
    return { ok: false, err: `ValueError: invalid literal for int() with base 10: '${inner}'` };
  }
  // float
  if (/^-?\d*\.?\d+$/.test(inner)) return { ok: true, out: fmtFloat(parseFloat(inner)), type: 'float' };
  return { ok: false, err: `ValueError: could not convert string to float: '${inner}'` };
}

function ConversionMachine() {
  const [input, setInput] = useState(CONV_INPUTS[0]);
  const [fn, setFn] = useState<PyType>('int');
  const result = convert(fn, input);

  return (
    <div className="my-6 rounded-2xl border-2 border-slate-200 bg-white p-6">
      <div className="flex flex-wrap gap-6 justify-center mb-6">
        <div>
          <p className="text-xs text-slate-400 mb-2 text-center">① 选一个字符串</p>
          <div className="flex gap-2">
            {CONV_INPUTS.map((v) => (
              <button
                key={v}
                onClick={() => setInput(v)}
                className={`px-3 py-2 rounded-lg font-mono text-sm border-2 transition-all ${
                  input === v ? 'border-amber-400 bg-amber-100 text-amber-700' : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-amber-300'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-slate-400 mb-2 text-center">② 选一台转换机</p>
          <div className="flex gap-2">
            {CONV_FUNCS.map((f) => (
              <button
                key={f}
                onClick={() => setFn(f)}
                className={`px-3 py-2 rounded-lg font-mono text-sm border-2 transition-all ${
                  fn === f ? 'border-blue-400 bg-blue-100 text-blue-700' : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-blue-300'
                }`}
              >
                {f}()
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 传送带 */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <span className="font-mono text-lg text-amber-600">{input}</span>
        <span className="text-slate-300 text-2xl">→</span>
        <div className="px-4 py-2 rounded-xl bg-slate-800 text-white font-mono text-sm shadow-md">⚙ {fn}()</div>
        <span className="text-slate-300 text-2xl">→</span>
        <AnimatePresence mode="wait">
          <motion.div
            key={fn + input}
            initial={{ opacity: 0, x: -20, scale: 0.7 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            {result.ok ? (
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg font-bold text-slate-800">{result.out}</span>
                {result.type && <TypeBadge type={result.type} size="sm" />}
              </div>
            ) : (
              <span className="text-3xl">💥</span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 rounded-xl bg-slate-900 px-4 py-3 font-mono text-sm">
        <div className="text-slate-100">
          <span className="text-cyan-300">{fn}</span>({input})
        </div>
        {result.ok ? (
          <div className="text-green-400 mt-1"># → {result.out}</div>
        ) : (
          <div className="text-red-400 mt-1"># {result.err}</div>
        )}
      </div>
      {!result.ok && (
        <p className="text-sm text-red-500 mt-3">
          只有"看起来像数字"的字符串才能转成 int 或 float，<code>"hello"</code> 转不了，Python 会报错。
        </p>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
//  命名检查器
// ══════════════════════════════════════════════════════════════════

const KEYWORDS = new Set([
  'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue',
  'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in',
  'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield',
]);

const NAME_PRESETS = ['word_count', '1st_word', 'class', 'my-var', 'wordCount'];

function NameValidator() {
  const [name, setName] = useState('word_count');

  const notEmpty = name.length > 0;
  const validChars = /^[A-Za-z_][A-Za-z0-9_]*$/.test(name);
  const notKeyword = !KEYWORDS.has(name);
  const isValid = notEmpty && validChars && notKeyword;
  const isSnake = /^[a-z_][a-z0-9_]*$/.test(name);

  const rules = [
    { ok: notEmpty && /^[A-Za-z_]/.test(name), text: '以字母或下划线开头' },
    { ok: validChars, text: '只包含字母、数字、下划线' },
    { ok: notKeyword, text: '不是 Python 保留字' },
  ];

  return (
    <div className="my-6 rounded-2xl border-2 border-slate-200 bg-white p-6">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="输入一个变量名试试…"
        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 font-mono text-lg focus:border-blue-400 focus:outline-none"
      />

      <div className="mt-4 space-y-2">
        {rules.map((r) => (
          <div key={r.text} className="flex items-center gap-2 text-sm">
            <span>{r.ok ? '✅' : '❌'}</span>
            <span className={r.ok ? 'text-slate-600' : 'text-red-500'}>{r.text}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <div className={`px-4 py-2 rounded-xl font-semibold text-sm ${isValid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {isValid ? '合法的变量名' : '不能用作变量名'}
        </div>
        {isValid && !isSnake && (
          <span className="text-xs text-amber-600">💡 能用，但推荐用小写下划线风格 snake_case</span>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="text-xs text-slate-400 self-center">点这些试试：</span>
        {NAME_PRESETS.map((p) => (
          <button
            key={p}
            onClick={() => setName(p)}
            className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-mono text-xs hover:bg-slate-200 transition-colors"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
//  语言学实战：被动句比例计算器
// ══════════════════════════════════════════════════════════════════

function PassiveRatioCalc() {
  const [passive, setPassive] = useState(42);
  const [total, setTotal] = useState(350);

  const pct = total > 0 ? (passive / total) * 100 : 0;

  return (
    <div className="my-6 rounded-2xl border-2 border-slate-200 bg-white p-6">
      <div className="space-y-5">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-600 font-mono">passive_count</span>
            <span className="font-mono font-bold text-blue-600">{passive}</span>
          </div>
          <input
            type="range"
            min={0}
            max={total}
            value={passive}
            onChange={(e) => setPassive(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-600 font-mono">total</span>
            <span className="font-mono font-bold text-blue-600">{total}</span>
          </div>
          <input
            type="range"
            min={1}
            max={1000}
            value={total}
            onChange={(e) => {
              const t = Number(e.target.value);
              setTotal(t);
              if (passive > t) setPassive(t);
            }}
            className="w-full accent-blue-500"
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <span className="text-slate-500">被动句占比</span>
        <motion.span
          key={pct.toFixed(1)}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-3xl font-mono font-bold text-emerald-600"
        >
          {pct.toFixed(1)}%
        </motion.span>
        <TypeBadge type="float" size="sm" />
      </div>

      <div className="mt-5 rounded-xl bg-slate-900 px-4 py-3 font-mono text-sm leading-relaxed">
        <div><span className="text-slate-100">passive_count</span><span className="text-sky-300"> = </span><span className="text-purple-400">{passive}</span> <span className="text-slate-500"># int</span></div>
        <div><span className="text-slate-100">total</span><span className="text-sky-300"> = </span><span className="text-purple-400">{total}</span> <span className="text-slate-500"># int</span></div>
        <div><span className="text-slate-100">percentage</span><span className="text-sky-300"> = </span><span className="text-slate-100">passive_count </span><span className="text-sky-300">/</span><span className="text-slate-100"> total </span><span className="text-sky-300">*</span> <span className="text-purple-400">100</span></div>
        <div className="text-green-400 mt-1"># → {pct.toFixed(1)} &nbsp;←&nbsp; 两个 int 相除，结果自动变成 float</div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
//  章节主体
// ══════════════════════════════════════════════════════════════════

export default function Section() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="content-prose"
    >
      {/* ===== 开场 ===== */}
      <h2>先想象一堆需要记住的东西</h2>
      <p>
        你正在做一个语言学分析。手边有一大堆信息：正在研究的目标词是 <code>"把"</code>，它在语料里出现了 128 次，你还想标记这句话是不是被动句……
      </p>
      <p>
        这些信息你得<b>存起来</b>，随用随取。Python 用的办法特别直观——找个盒子，把数据放进去，再贴上一个名字。这个贴了名字的盒子，就叫<strong>变量</strong>。
      </p>

      <LabelBoxIntro />

      <p>
        上面三个盒子，装的分别是<strong>字符串</strong>、<strong>整数</strong>和<strong>布尔值</strong>——这就是 Python 最常用的几种数据类型。别急，我们一个一个来玩。
      </p>

      {/* ===== 赋值 ===== */}
      <h2>= 不是"等于"，是"放进去"</h2>
      <p>
        在 Python 里，<code>=</code> 读作<b>"把右边的值，放进左边的盒子"</b>。方向是从右往左，跟数学里的等号完全是两回事。
      </p>
      <p>
        点点下面的值，看着它掉进 <code>count</code> 这个盒子里。再点一个不同的值试试——你会发现盒子里<b>只能装一个</b>，新值一进来，旧值就被丢掉了。
      </p>

      <AssignMachine />

      <p>
        这个"丢掉旧的、换成新的"叫<strong>重新赋值</strong>。做统计时经常用，比如把计数器加上 200：
      </p>

      <CodeBlock
        code={`count = 5000
count = count + 200   # 先读出旧值 5000，加 200，再放回盒子
print(count)          # 5200`}
        highlightLines={[2]}
      />

      {/* ===== 四种类型 ===== */}
      <h2>盒子里能装的四种东西</h2>
      <p>
        每个盒子装的数据都有自己的<strong>类型</strong>（type）。Python 靠类型来决定怎么处理这个数据。做语言学研究，你最常打交道的就是这四种：
      </p>

      <FourTypes />

      <p>
        记不住没关系，靠感觉就行：<b>数出来的是 int，量出来的是 float，写出来的是 str，判断出来的是 bool</b>。下面用个小游戏帮你练手感。
      </p>

      {/* ===== 类型侦探 ===== */}
      <h2>来当类型侦探</h2>
      <p>
        我给你看一个值，你来判断它是什么类型。看引号、看小数点、看真假——线索都在值本身里。
      </p>

      <TypeDetective />

      <p>
        游戏里每次揭晓，都用了 <code>type()</code> 这个工具。它就是 Python 里帮你查类型的"验钞机"——把变量丢给它，它告诉你是什么类型：
      </p>

      <CodeBlock
        code={`word = "把"
print(type(word))   # <class 'str'>

freq = 128
print(type(freq))   # <class 'int'>`}
      />

      {/* ===== 类型转换 ===== */}
      <h2>换个类型：转换机</h2>
      <p>
        有个坑你迟早会踩：<strong>从文件或 CSV 里读进来的数字，其实都是字符串</strong>。<code>"42"</code> 长得像数字，但它是 str，不能直接参与计算。得先送进"转换机"改造一下。
      </p>
      <p>
        试试下面：选一个字符串，再选一台机器，看它变成什么。特意选 <code>"hello"</code> 配 <code>int()</code> 看看会怎样。
      </p>

      <ConversionMachine />

      <p>
        <code>int()</code> 和 <code>float()</code> 把字符串变成数字，<code>str()</code> 反过来把数字变成字符串（方便拼接文本）：
      </p>

      <CodeBlock
        code={`corpus = "BNC"
year = 1994
label = corpus + "_" + str(year)   # 数字要先转成 str 才能拼
print(label)                        # BNC_1994`}
        highlightLines={[3]}
      />

      {/* ===== 命名规则 ===== */}
      <h2>给盒子取个好名字</h2>
      <p>
        变量名不能乱取，有几条硬规则。下面这个检查器是活的——你打字，它实时告诉你这个名字行不行。点那几个例子试试，看看哪里出了问题。
      </p>

      <NameValidator />

      <p>
        规则记住三条就够：<b>字母或下划线开头</b>、<b>只用字母数字下划线</b>、<b>别撞上保留字</b>。风格上推荐 <code>snake_case</code>（小写加下划线），而且名字要<strong>见名知意</strong>——<code>word_count</code> 永远比 <code>a</code> 好。
      </p>

      {/* ===== 语言学实战 ===== */}
      <h2>实战：算一算被动句比例</h2>
      <p>
        把学到的东西串起来用一次。假设你数完了语料：一共 <code>total</code> 个句子，其中 <code>passive_count</code> 个是被动句。要算被动句占多少百分比。
      </p>
      <p>
        拖动滑块改数字，看结果实时变。注意底下那行注释——<b>两个整数一除，结果自动变成了 float</b>，这是 Python 帮你做的：
      </p>

      <PassiveRatioCalc />

      <p>
        看到了吗？<code>passive_count</code> 和 <code>total</code> 都是 int，但除法的结果 <code>percentage</code> 自动成了 float。这样你才不会丢掉小数部分。
      </p>

      {/* ===== 小结 ===== */}
      <h2>一张表记住全部</h2>

      <table>
        <thead>
          <tr>
            <th>类型</th>
            <th>标识</th>
            <th>示例</th>
            <th>语言学里用来存</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="align-middle">整数</td>
            <td className="align-middle"><TypeBadge type="int" size="sm" /></td>
            <td className="align-middle font-mono">128</td>
            <td>词频、句子数、参与者人数</td>
          </tr>
          <tr>
            <td className="align-middle">浮点数</td>
            <td className="align-middle"><TypeBadge type="float" size="sm" /></td>
            <td className="align-middle font-mono">0.67</td>
            <td>类符形符比、平均句长、反应时</td>
          </tr>
          <tr>
            <td className="align-middle">字符串</td>
            <td className="align-middle"><TypeBadge type="str" size="sm" /></td>
            <td className="align-middle font-mono">"把"</td>
            <td>语料名、目标词、例句</td>
          </tr>
          <tr>
            <td className="align-middle">布尔值</td>
            <td className="align-middle"><TypeBadge type="bool" size="sm" /></td>
            <td className="align-middle font-mono">True</td>
            <td>是否被动、是否含否定</td>
          </tr>
        </tbody>
      </table>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-6">
        <h3 className="text-lg font-semibold text-amber-800 mb-3">✏️ 试试看</h3>
        <p className="text-amber-700 mb-3">
          在电脑上打开 Python，或者先在脑子里跑一遍。给下面这些东西各建一个变量：
        </p>
        <ol className="text-amber-800 space-y-2">
          <li>你的名字 → <code>name = "……"</code>（这是什么类型？）</li>
          <li>你读过的语言学论文数 → <code>papers_read = ?</code></li>
          <li>你最喜欢的语言 → <code>fav_lang = "?"</code></li>
          <li>"这句话是疑问句吗" → <code>is_question = ?</code></li>
          <li>
            进阶：<code>score = "88"</code> 是从文件读来的。把它转成整数，再加 10，打印结果。
          </li>
        </ol>
        <p className="text-amber-700 mt-3">
          每建一个，就用 <code>type()</code> 查一下它的类型，验证你猜得对不对。
        </p>
      </div>

      <p>
        搞定了变量和类型，你就有了存放数据的盒子。但一个盒子只能装一个值——要是有一整列词频、一整批句子呢？下一节我们学怎么把一堆数据装进同一个容器：<strong>列表与字典</strong>。
      </p>
    </motion.div>
  );
}
