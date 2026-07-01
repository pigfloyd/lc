import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CodeBlock from '../../components/shared/CodeBlock';

/* ═══════════════════════════════════════════════════════════════════
   开场：红绿灯路口
   ═══════════════════════════════════════════════════════════════════ */
function TrafficLightOpener() {
  const [isRed, setIsRed] = useState(true);

  return (
    <div className="bg-gradient-to-b from-slate-100 to-slate-200 border-2 border-slate-300 rounded-2xl p-6 my-6">
      <h3 className="text-center text-lg font-bold text-slate-800 mb-6">
        🚦 路口的小车
      </h3>

      <div className="flex items-center justify-center gap-8">
        {/* 红绿灯 */}
        <div className="flex flex-col items-center gap-2 bg-slate-800 rounded-2xl p-3 shadow-xl">
          <motion.div
            animate={{
              opacity: isRed ? 1 : 0.2,
              scale: isRed ? 1.1 : 1,
              boxShadow: isRed ? '0 0 24px 6px rgba(239,68,68,0.8)' : 'none',
            }}
            className="w-12 h-12 rounded-full bg-red-500"
          />
          <motion.div
            animate={{
              opacity: !isRed ? 1 : 0.2,
              scale: !isRed ? 1.1 : 1,
              boxShadow: !isRed ? '0 0 24px 6px rgba(34,197,94,0.8)' : 'none',
            }}
            className="w-12 h-12 rounded-full bg-green-500"
          />
        </div>

        {/* 小车与决策 */}
        <div className="flex flex-col items-center gap-3 min-w-[180px]">
          <motion.div
            animate={{ x: isRed ? 0 : 40, scale: isRed ? 1 : 1.15 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="text-5xl"
          >
            🚗
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.div
              key={isRed ? 'stop' : 'go'}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={`px-4 py-2 rounded-xl font-bold text-white ${
                isRed ? 'bg-red-500' : 'bg-green-500'
              }`}
            >
              {isRed ? '🛑 停下来' : '✅ 通过'}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 小车的"想法" */}
      <div className="mt-6 mx-auto max-w-md bg-white rounded-xl border border-slate-200 p-4 text-center shadow-sm">
        <span className="text-sm text-slate-500">小车心里在想：</span>
        <div className="mt-1 text-slate-800 font-medium">
          「灯是红的吗？」→{' '}
          <span className={isRed ? 'text-red-600' : 'text-green-600'}>
            {isRed ? '是 → 那就停' : '不是 → 那就走'}
          </span>
        </div>
      </div>

      <div className="mt-5 flex justify-center">
        <button
          onClick={() => setIsRed((v) => !v)}
          className="px-5 py-2 rounded-lg bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors"
        >
          切换灯色 🔄
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   比较运算符游乐场
   ═══════════════════════════════════════════════════════════════════ */
const OPERATORS = [
  { sym: '>', fn: (a: number, b: number) => a > b, name: '大于' },
  { sym: '<', fn: (a: number, b: number) => a < b, name: '小于' },
  { sym: '>=', fn: (a: number, b: number) => a >= b, name: '大于等于' },
  { sym: '<=', fn: (a: number, b: number) => a <= b, name: '小于等于' },
  { sym: '==', fn: (a: number, b: number) => a === b, name: '等于' },
  { sym: '!=', fn: (a: number, b: number) => a !== b, name: '不等于' },
];

function ComparisonPlayground() {
  const [a, setA] = useState(7);
  const [b, setB] = useState(5);
  const [opIndex, setOpIndex] = useState(0);
  const op = OPERATORS[opIndex];
  const result = op.fn(a, b);

  return (
    <div className="bg-white border-2 border-indigo-200 rounded-2xl p-6 my-6">
      <h3 className="text-center text-lg font-bold text-indigo-800 mb-5">
        🎚️ 比较运算符游乐场
      </h3>

      {/* 表达式展示 */}
      <div className="flex items-center justify-center gap-3 text-3xl font-mono font-bold mb-6">
        <span className="text-purple-600">{a}</span>
        <span className="text-sky-600">{op.sym}</span>
        <span className="text-purple-600">{b}</span>
        <span className="text-slate-400">→</span>
        <motion.span
          key={String(result)}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={result ? 'text-green-600' : 'text-red-500'}
        >
          {result ? 'True' : 'False'}
        </motion.span>
      </div>

      {/* 两个滑块 */}
      <div className="space-y-4 mb-5">
        <div className="flex items-center gap-3">
          <span className="w-16 text-sm text-slate-500 font-mono">左边 = {a}</span>
          <input
            type="range" min={0} max={10} value={a}
            onChange={(e) => setA(Number(e.target.value))}
            className="flex-1 accent-purple-500"
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="w-16 text-sm text-slate-500 font-mono">右边 = {b}</span>
          <input
            type="range" min={0} max={10} value={b}
            onChange={(e) => setB(Number(e.target.value))}
            className="flex-1 accent-purple-500"
          />
        </div>
      </div>

      {/* 运算符选择 */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {OPERATORS.map((o, i) => (
          <button
            key={o.sym}
            onClick={() => setOpIndex(i)}
            className={`py-2 rounded-lg font-mono font-bold text-sm transition-all ${
              i === opIndex
                ? 'bg-indigo-500 text-white scale-105 shadow'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {o.sym}
            <span className="block text-[10px] font-sans font-normal opacity-80">{o.name}</span>
          </button>
        ))}
      </div>

      <p className="mt-5 text-sm text-center text-slate-500">
        拖动滑块、换运算符，看结果在 <span className="text-green-600 font-bold">True</span> 和{' '}
        <span className="text-red-500 font-bold">False</span> 之间跳。这个 True/False 就是{' '}
        <code className="bg-slate-100 px-1 rounded">if</code> 要看的答案。
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   if / elif / else 瀑布 —— 打分演示
   ═══════════════════════════════════════════════════════════════════ */
const GRADE_GATES = [
  { cond: 'score >= 90', test: (s: number) => s >= 90, grade: 'A', condLine: 2, bodyLine: 3, color: 'emerald' },
  { cond: 'score >= 80', test: (s: number) => s >= 80, grade: 'B', condLine: 4, bodyLine: 5, color: 'sky' },
  { cond: 'score >= 60', test: (s: number) => s >= 60, grade: 'C', condLine: 6, bodyLine: 7, color: 'amber' },
];

const GRADE_CODE = `score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 60:
    grade = "C"
else:
    grade = "不及格"
print(grade)`;

function GradeWaterfall() {
  const [score, setScore] = useState(85);
  const matchIndex = GRADE_GATES.findIndex((g) => g.test(score));
  const isElse = matchIndex === -1;

  const finalGrade = isElse ? '不及格' : GRADE_GATES[matchIndex].grade;
  const highlight = isElse
    ? [8, 9]
    : [GRADE_GATES[matchIndex].condLine, GRADE_GATES[matchIndex].bodyLine];

  return (
    <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 my-6">
      <h3 className="text-center text-lg font-bold text-slate-800 mb-2">
        🏔️ 条件瀑布：分数从上往下流
      </h3>
      <p className="text-center text-sm text-slate-500 mb-5">
        分数从最上面流下来，<b>碰到第一个满足的条件就停住</b>，下面的门再也不看了。
      </p>

      {/* 分数滑块 */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm text-slate-500 w-20 font-mono">score = {score}</span>
        <input
          type="range" min={0} max={100} value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          className="flex-1 accent-blue-500"
        />
      </div>

      {/* 瀑布门 */}
      <div className="space-y-2">
        {GRADE_GATES.map((gate, i) => {
          const matched = i === matchIndex;
          const failed = matchIndex === -1 ? true : i < matchIndex;
          const unreached = matchIndex !== -1 && i > matchIndex;

          return (
            <motion.div
              key={gate.cond}
              animate={{ opacity: unreached ? 0.3 : 1, scale: matched ? 1.03 : 1 }}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 border-2 ${
                matched
                  ? 'bg-emerald-50 border-emerald-400 shadow-md'
                  : failed
                  ? 'bg-red-50 border-red-200'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <span className="font-mono text-xs text-slate-400 w-10">
                {i === 0 ? 'if' : 'elif'}
              </span>
              <span className="font-mono text-sm flex-1 text-slate-700">{gate.cond}</span>
              {matched && (
                <span className="text-emerald-600 font-bold text-sm">
                  ✓ 满足 → grade = "{gate.grade}"
                </span>
              )}
              {failed && <span className="text-red-400 text-sm">✗ 不满足，往下流</span>}
              {unreached && <span className="text-slate-400 text-sm">💤 没轮到我</span>}
            </motion.div>
          );
        })}

        {/* else */}
        <motion.div
          animate={{ scale: isElse ? 1.03 : 1 }}
          className={`flex items-center gap-3 rounded-xl px-4 py-3 border-2 ${
            isElse ? 'bg-emerald-50 border-emerald-400 shadow-md' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <span className="font-mono text-xs text-slate-400 w-10">else</span>
          <span className="font-mono text-sm flex-1 text-slate-700">以上都不满足</span>
          {isElse && (
            <span className="text-emerald-600 font-bold text-sm">✓ 兜底 → grade = "不及格"</span>
          )}
        </motion.div>
      </div>

      {/* 结果 */}
      <div className="mt-5 text-center">
        <span className="text-sm text-slate-500">最终结果：</span>
        <motion.span
          key={finalGrade}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="ml-2 inline-block px-4 py-1 rounded-lg bg-slate-800 text-white font-bold text-lg font-mono"
        >
          {finalGrade}
        </motion.span>
      </div>

      {/* 同步高亮的代码 */}
      <div className="mt-4">
        <CodeBlock code={GRADE_CODE} highlightLines={highlight} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   布尔逻辑：VIP 门禁 (and / or / not)
   ═══════════════════════════════════════════════════════════════════ */
function BooleanRoom() {
  const [isAdult, setIsAdult] = useState(true);
  const [hasCard, setHasCard] = useState(false);
  const [logic, setLogic] = useState<'and' | 'or'>('and');

  const pass = logic === 'and' ? isAdult && hasCard : isAdult || hasCard;
  const expr = `(年龄≥18) ${logic} (有会员卡)`;

  const Toggle = ({ on, setOn, label }: { on: boolean; setOn: (v: boolean) => void; label: string }) => (
    <button
      onClick={() => setOn(!on)}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
        on ? 'bg-green-50 border-green-400' : 'bg-slate-50 border-slate-300'
      }`}
    >
      <span className={`relative w-11 h-6 rounded-full transition-colors ${on ? 'bg-green-500' : 'bg-slate-300'}`}>
        <motion.span
          layout
          className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow"
          animate={{ left: on ? 22 : 2 }}
        />
      </span>
      <span className="text-sm font-medium text-slate-700">
        {label}：<b className={on ? 'text-green-600' : 'text-slate-400'}>{on ? 'True' : 'False'}</b>
      </span>
    </button>
  );

  return (
    <div className="bg-white border-2 border-violet-200 rounded-2xl p-6 my-6">
      <h3 className="text-center text-lg font-bold text-violet-800 mb-2">
        🚪 VIP 房间门禁
      </h3>
      <p className="text-center text-sm text-slate-500 mb-5">
        <code className="bg-slate-100 px-1 rounded">and</code> = 两个都要满足；
        <code className="bg-slate-100 px-1 rounded">or</code> = 满足一个就行。
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-5">
        <Toggle on={isAdult} setOn={setIsAdult} label="年龄≥18" />
        <Toggle on={hasCard} setOn={setHasCard} label="有会员卡" />
      </div>

      {/* and / or 切换 */}
      <div className="flex justify-center gap-2 mb-5">
        {(['and', 'or'] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLogic(l)}
            className={`px-6 py-2 rounded-lg font-mono font-bold transition-all ${
              logic === l ? 'bg-violet-500 text-white scale-105 shadow' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* 结果大门 */}
      <div className="text-center">
        <div className="font-mono text-sm text-slate-500 mb-2">{expr}</div>
        <motion.div
          key={String(pass)}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-bold text-lg ${
            pass ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {pass ? '🎉 欢迎进入 VIP' : '🚫 抱歉，不能进'}
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   语言学实战：词频分级器
   ═══════════════════════════════════════════════════════════════════ */
interface WordItem {
  word: string;
  freq: number;
}
const WORD_DATA: WordItem[] = [
  { word: '的', freq: 5230 },
  { word: '我', freq: 1180 },
  { word: '研究', freq: 320 },
  { word: '语言学', freq: 95 },
  { word: '音系', freq: 42 },
  { word: '构式', freq: 12 },
  { word: '音位', freq: 6 },
];

const BUCKETS = [
  { key: '高频词', test: (f: number) => f >= 1000, color: 'bg-rose-500', line: 2 },
  { key: '中频词', test: (f: number) => f >= 100, color: 'bg-amber-500', line: 4 },
  { key: '低频词', test: (f: number) => f >= 10, color: 'bg-sky-500', line: 6 },
  { key: '罕见词', test: (_f: number) => true, color: 'bg-slate-400', line: 8 },
];

function classify(freq: number): number {
  return BUCKETS.findIndex((b) => b.test(freq));
}

const CLASSIFY_CODE = `for word, freq in words.items():
    if freq >= 1000:
        level = "高频词"
    elif freq >= 100:
        level = "中频词"
    elif freq >= 10:
        level = "低频词"
    else:
        level = "罕见词"
    print(word, level)`;

function WordFrequencyClassifier() {
  const [current, setCurrent] = useState(-1);
  const [placed, setPlaced] = useState<Record<number, WordItem[]>>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const reset = () => {
    if (timer.current) clearInterval(timer.current);
    setCurrent(-1);
    setPlaced({});
    setIsPlaying(false);
  };

  const play = () => {
    reset();
    setIsPlaying(true);
    let i = 0;
    timer.current = setInterval(() => {
      if (i < WORD_DATA.length) {
        const idx = i;
        setCurrent(idx);
        const bucket = classify(WORD_DATA[idx].freq);
        setPlaced((prev) => ({
          ...prev,
          [bucket]: [...(prev[bucket] ?? []), WORD_DATA[idx]],
        }));
        i++;
      } else {
        setCurrent(WORD_DATA.length);
        setIsPlaying(false);
        if (timer.current) clearInterval(timer.current);
      }
    }, 1100);
  };

  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
  }, []);

  const currentWord = current >= 0 && current < WORD_DATA.length ? WORD_DATA[current] : null;
  const currentBucket = currentWord ? classify(currentWord.freq) : -1;
  const highlight = currentBucket >= 0 ? [BUCKETS[currentBucket].line, BUCKETS[currentBucket].line + 1] : [];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white border-2 border-blue-200 rounded-2xl p-6 my-6">
      <h3 className="text-center text-lg font-bold text-blue-900 mb-2">
        📚 词频分级器
      </h3>
      <p className="text-center text-sm text-slate-500 mb-5">
        一个一个看每个词的频次，用 <code className="bg-white px-1 rounded">if / elif / else</code> 丢进对应的桶。
      </p>

      {/* 待处理的词队列 */}
      <div className="flex flex-wrap justify-center gap-2 mb-6 min-h-[3rem]">
        {WORD_DATA.map((w, i) => {
          const done = i < current;
          const isCur = i === current;
          return (
            <motion.div
              key={w.word}
              animate={{
                opacity: done ? 0.25 : 1,
                scale: isCur ? 1.15 : 1,
                y: isCur ? -4 : 0,
              }}
              className={`px-3 py-1.5 rounded-lg border font-medium text-sm ${
                isCur ? 'bg-yellow-100 border-yellow-400 shadow-md' : 'bg-white border-slate-200'
              }`}
            >
              {w.word}
              <span className="ml-1 text-xs text-slate-400 font-mono">{w.freq}</span>
            </motion.div>
          );
        })}
      </div>

      {/* 当前判断气泡 */}
      <div className="h-10 flex items-center justify-center mb-4">
        <AnimatePresence mode="wait">
          {currentWord && (
            <motion.div
              key={currentWord.word}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="text-sm font-medium text-slate-700 bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-sm"
            >
              「{currentWord.word}」频次 {currentWord.freq} →{' '}
              <span className="text-blue-600 font-bold">{BUCKETS[currentBucket].key}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 四个桶 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {BUCKETS.map((b, bi) => (
          <div key={b.key} className="bg-white rounded-xl border-2 border-slate-200 p-3 min-h-[7rem]">
            <div className={`${b.color} text-white text-xs font-bold text-center rounded-md py-1 mb-2`}>
              {b.key}
            </div>
            <div className="flex flex-wrap gap-1 justify-center">
              <AnimatePresence>
                {(placed[bi] ?? []).map((w) => (
                  <motion.span
                    key={w.word}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="px-2 py-0.5 bg-slate-100 rounded text-xs font-medium text-slate-700"
                  >
                    {w.word}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      {/* 控制按钮 */}
      <div className="flex justify-center gap-3 mb-4">
        <button
          onClick={play}
          disabled={isPlaying}
          className="px-5 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 disabled:opacity-40 transition-colors"
        >
          ▶ 开始分类
        </button>
        <button
          onClick={reset}
          className="px-5 py-2 rounded-lg border border-slate-300 text-slate-600 font-medium hover:bg-slate-100 transition-colors"
        >
          ↺ 重置
        </button>
      </div>

      {/* 同步代码 */}
      <CodeBlock code={CLASSIFY_CODE} highlightLines={highlight} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   练习（可展开答案）
   ═══════════════════════════════════════════════════════════════════ */
function Exercise({ n, title, hint, answer }: { n: number; title: string; hint: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl p-4 my-3 bg-white">
      <div className="flex items-start gap-3">
        <span className="shrink-0 w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
          {n}
        </span>
        <div className="flex-1">
          <p className="font-medium text-slate-800 mb-1">{title}</p>
          <p className="text-sm text-slate-500">💡 提示：{hint}</p>
          <button
            onClick={() => setOpen((v) => !v)}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            {open ? '收起答案 ▲' : '看参考答案 ▼'}
          </button>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-2">
                  <CodeBlock code={answer} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   章节主体
   ═══════════════════════════════════════════════════════════════════ */
export default function Section() {
  return (
    <div className="content-prose max-w-3xl">
      <h1>条件判断：让程序学会"看情况办事"</h1>

      <p>
        到现在为止，你写的代码都是"一条道走到黑"——从上到下，每一行都执行。
        但真实世界不是这样的：下雨了就带伞，饿了就吃饭，灯红了就停车。
        我们需要让程序也能<strong>看情况做决定</strong>。
      </p>

      <p>
        想象你开车到了一个路口。你的大脑其实在飞快地跑一段"如果……就……"：
      </p>

      <TrafficLightOpener />

      <p>
        点几下"切换灯色"，你会发现小车的行为完全由一个问题决定：
        <strong>「灯是红的吗？」</strong>。这个只能回答"是/否"的问题，
        就是编程里的<strong>条件</strong>。翻译成 Python：
      </p>

      <CodeBlock
        code={`light = "红"

if light == "红":     # 如果灯是红的
    print("停下来 🛑")
else:                 # 否则
    print("通过 ✅")`}
        highlightLines={[3, 4]}
      />

      <blockquote>
        <strong>记住这个句型：</strong>
        <code>if 条件:</code> → 条件成立时做的事；<code>else:</code> → 不成立时做的事。
        注意冒号 <code>:</code> 和下面的<strong>缩进</strong>（4 个空格）——它们告诉 Python
        "这几行属于这个分支"。
      </blockquote>

      <h2>条件的核心：一个只有 True / False 的问题</h2>

      <p>
        <code>if</code> 后面跟的条件，最后都会算出一个答案，要么是 <code>True</code>（真），
        要么是 <code>False</code>（假）。最常见的产生 True/False 的方式，就是<strong>比大小</strong>。
        自己来玩玩看：
      </p>

      <ComparisonPlayground />

      <p>
        这里有个超级容易踩的坑：<strong>比较用两个等号 <code>==</code>，赋值用一个等号 <code>=</code></strong>。
        一个是在问"它俩相等吗？"，一个是在说"把右边装进左边"。写错一个符号，程序的意思就完全变了！
      </p>

      <div className="grid sm:grid-cols-2 gap-4 my-6">
        <div className="rounded-xl border-2 border-green-300 bg-green-50 p-4">
          <div className="font-bold text-green-700 mb-2">✅ 比较（问问题）</div>
          <code className="text-sm">if x == 5:</code>
          <p className="text-sm text-slate-600 mt-2 mb-0">"x 等于 5 吗？"</p>
        </div>
        <div className="rounded-xl border-2 border-red-300 bg-red-50 p-4">
          <div className="font-bold text-red-700 mb-2">❌ 赋值（下命令）</div>
          <code className="text-sm">x = 5</code>
          <p className="text-sm text-slate-600 mt-2 mb-0">"把 5 装进 x"（这不是判断！）</p>
        </div>
      </div>

      <h2>多个岔路：if / elif / else</h2>

      <p>
        路口只有"红/不红"两条路。但很多时候有<strong>好几条岔路</strong>：
        考 90 分是 A，80 多分是 B，60 多分是 C，再低就不及格了。
        这时候用 <code>elif</code>（else if 的缩写）把条件一个一个串起来。
      </p>

      <p>
        关键规则一句话：<strong>从上往下检查，碰到第一个成立的就执行，然后整个结构就结束了</strong>，
        后面的条件看都不看。拖动下面的滑块，亲眼看这个"瀑布"是怎么流的：
      </p>

      <GradeWaterfall />

      <p>
        看到没？当分数是 85 时，<code>&gt;= 90</code> 不满足（往下流），
        <code>&gt;= 80</code> 满足了（停住！），于是 grade 变成 "B"，
        后面的 <code>&gt;= 60</code> 和 <code>else</code> 根本没机会运行。
        这就是为什么<strong>条件的顺序很重要</strong>——把最严格的放最上面。
      </p>

      <h2>把条件组合起来：and / or / not</h2>

      <p>
        有时候一个条件不够用。"能不能进 VIP 房间"可能要<strong>同时</strong>满足两件事，
        也可能<strong>满足其一</strong>即可。这就要用到三个逻辑词：
      </p>

      <ul>
        <li><code>and</code>（并且）——<strong>两个都</strong>为真，结果才为真</li>
        <li><code>or</code>（或者）——<strong>至少一个</strong>为真，结果就为真</li>
        <li><code>not</code>（取反）——把 True 变 False，False 变 True</li>
      </ul>

      <BooleanRoom />

      <p>
        试着把两个开关都关掉，再切换 <code>and</code> / <code>or</code>，
        你就能摸清它俩的"脾气"：<code>and</code> 很严格（少一个都不行），
        <code>or</code> 很宽容（有一个就够）。
      </p>

      <h2>语言学实战：给词频分级</h2>

      <p>
        来点真家伙。做语料研究时，我们经常要按频次给词分类：
        <strong>高频词</strong>（像"的""我"这种功能词）、
        <strong>中频词</strong>、<strong>低频词</strong>，还有只出现几次的<strong>罕见词</strong>。
        这正是 <code>if / elif / else</code> 最典型的用武之地。
      </p>

      <p>
        点"开始分类"，看每个词是怎么被一层层的条件筛进对应的桶里的——
        右边的代码会跟着高亮正在执行的那一行：
      </p>

      <WordFrequencyClassifier />

      <p>
        这个小程序的骨架，你在真实研究里会反复用到：
        遍历一批词 → 对每个词做条件判断 → 打上标签。
        换个阈值、换个分类标准，它就能变成情感分级、词长分类、难度分级……万变不离其宗。
      </p>

      <h2>动手练习</h2>

      <p>从简单的开始，一个一个来。先自己写，实在卡住了再看答案。</p>

      <Exercise
        n={1}
        title="判断一个数是正数、负数，还是零，并打印出来。"
        hint="三种情况 → if / elif / else。注意“零”要单独判断。"
        answer={`num = -3

if num > 0:
    print("正数")
elif num < 0:
    print("负数")
else:
    print("零")`}
      />

      <Exercise
        n={2}
        title="给定一个字母，判断它是不是元音（a, e, i, o, u）。"
        hint="用 in 检查“这个字母是否在元音集合里”，一个条件就够了。"
        answer={`letter = "e"

if letter in ["a", "e", "i", "o", "u"]:
    print(letter, "是元音")
else:
    print(letter, "是辅音")`}
      />

      <Exercise
        n={3}
        title="根据词的长度分类：1 个字是“单字词”，2-3 个字是“短词”，更长是“长词”。"
        hint="用 len(word) 拿到长度，再像打分那样用 elif 分档。"
        answer={`word = "语言学"
n = len(word)

if n == 1:
    print("单字词")
elif n <= 3:
    print("短词")
else:
    print("长词")`}
      />

      <Exercise
        n={4}
        title='进阶：判断一个词是不是"高频功能词"——它必须既在功能词表里，频次又要 > 500。'
        hint="两个条件要同时成立，用 and 连起来。"
        answer={`function_words = ["的", "了", "在", "和", "我"]
word = "的"
freq = 5230

if word in function_words and freq > 500:
    print(word, "是高频功能词")
else:
    print(word, "不是")`}
      />

      <div className="rounded-xl bg-slate-800 text-slate-100 p-6 my-8">
        <div className="font-bold text-lg mb-3">🎯 这一章你学会了</div>
        <ul className="space-y-1.5 text-sm text-slate-200 list-none pl-0">
          <li>✅ <code className="bg-slate-700 px-1 rounded">if / else</code>：让程序看情况走不同的路</li>
          <li>✅ 比较运算符 <code className="bg-slate-700 px-1 rounded">&gt; &lt; &gt;= &lt;= == !=</code>，每个都算出 True 或 False</li>
          <li>✅ <code className="bg-slate-700 px-1 rounded">==</code> 是比较，<code className="bg-slate-700 px-1 rounded">=</code> 是赋值，千万别搞混</li>
          <li>✅ <code className="bg-slate-700 px-1 rounded">elif</code> 串多个岔路，从上往下第一个满足就停</li>
          <li>✅ <code className="bg-slate-700 px-1 rounded">and / or / not</code> 组合多个条件</li>
        </ul>
        <p className="text-sm text-slate-300 mt-4 mb-0">
          下一章我们学<strong>函数</strong>——把这些判断逻辑打包成一个能反复使用的小工具。
        </p>
      </div>
    </div>
  );
}
