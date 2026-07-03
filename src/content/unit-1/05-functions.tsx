import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CodeBlock from '../../components/shared/CodeBlock';

/* ═══════════════════════════════════════════════════════════════════
   开场：榨汁机 —— 同一台机器，不同的原料，不同的成品
   ═══════════════════════════════════════════════════════════════════ */
const FRUITS = [
  { emoji: '🍎', name: '苹果' },
  { emoji: '🍊', name: '橙子' },
  { emoji: '🍇', name: '葡萄' },
];

function JuiceMachineOpener() {
  const [fruit, setFruit] = useState<(typeof FRUITS)[number] | null>(null);
  const [phase, setPhase] = useState<'idle' | 'in' | 'work' | 'done'>('idle');
  const timers = useRef<number[]>([]);

  const feed = (f: (typeof FRUITS)[number]) => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setFruit(f);
    setPhase('in');
    timers.current.push(window.setTimeout(() => setPhase('work'), 600));
    timers.current.push(window.setTimeout(() => setPhase('done'), 1700));
  };

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  return (
    <div className="bg-gradient-to-b from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl p-6 my-6">
      <h3 className="text-center text-lg font-bold text-orange-900 mb-1">
        🧃 神奇榨汁机
      </h3>
      <p className="text-center text-sm text-slate-500 mb-6">
        点一个水果，喂给机器试试。
      </p>

      {/* 水果按钮 */}
      <div className="flex justify-center gap-3 mb-6">
        {FRUITS.map((f) => (
          <button
            key={f.name}
            onClick={() => feed(f)}
            className="flex flex-col items-center px-5 py-3 rounded-xl bg-white border-2 border-orange-200 hover:border-orange-400 hover:scale-105 transition-all shadow-sm"
          >
            <span className="text-4xl">{f.emoji}</span>
            <span className="text-xs text-slate-500 mt-1">{f.name}</span>
          </button>
        ))}
      </div>

      {/* 流水线：入口 → 机器 → 出口 */}
      <div className="flex items-center justify-center gap-4 sm:gap-8">
        {/* 入口的水果 */}
        <div className="w-16 h-16 flex items-center justify-center">
          <AnimatePresence>
            {fruit && phase === 'in' && (
              <motion.span
                key={fruit.name + '-in'}
                initial={{ x: -30, opacity: 0, scale: 1 }}
                animate={{ x: 30, opacity: 1, scale: 0.6 }}
                exit={{ opacity: 0, scale: 0.2 }}
                transition={{ duration: 0.6 }}
                className="text-5xl"
              >
                {fruit.emoji}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* 机器本体 */}
        <motion.div
          animate={
            phase === 'work'
              ? { rotate: [0, -3, 3, -3, 3, 0], scale: [1, 1.05, 1, 1.05, 1] }
              : { rotate: 0, scale: 1 }
          }
          transition={phase === 'work' ? { duration: 1, repeat: 0 } : {}}
          className="relative bg-slate-800 rounded-2xl px-6 py-5 shadow-xl text-center"
        >
          <div className="text-4xl">{phase === 'work' ? '⚙️' : '🏭'}</div>
          <div className="mt-2 font-mono text-xs text-emerald-300 font-bold">
            make_juice
          </div>
          {phase === 'work' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute -top-3 left-1/2 -translate-x-1/2 text-xl"
            >
              💨
            </motion.div>
          )}
        </motion.div>

        {/* 出口的果汁 */}
        <div className="w-24 h-20 flex flex-col items-center justify-center">
          <AnimatePresence>
            {fruit && phase === 'done' && (
              <motion.div
                key={fruit.name + '-out'}
                initial={{ x: -20, opacity: 0, scale: 0.4 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                className="flex flex-col items-center"
              >
                <span className="text-5xl">🧃</span>
                <span className="text-sm font-bold text-orange-700 mt-1">
                  {fruit.name}汁
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 对应的"调用"表达 */}
      <div className="mt-6 flex justify-center min-h-[2.5rem]">
        <AnimatePresence mode="wait">
          {fruit && phase === 'done' && (
            <motion.div
              key={fruit.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-mono text-sm bg-white px-4 py-2 rounded-lg border border-orange-200 shadow-sm"
            >
              <span className="text-emerald-600">make_juice</span>
              <span className="text-slate-400">(</span>
              <span className="text-amber-600">"{fruit.name}"</span>
              <span className="text-slate-400">)</span>
              <span className="text-slate-400 mx-2">→</span>
              <span className="text-amber-600">"{fruit.name}汁"</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   函数解剖图：四个零件，点一个亮一个
   ═══════════════════════════════════════════════════════════════════ */
const PARTS = [
  {
    key: 'def',
    label: 'def',
    title: '造机器的口令',
    desc: '告诉 Python："注意，我要造一台新机器了！"',
    chip: 'bg-pink-100 text-pink-700 border-pink-300',
    hl: 'bg-pink-500/40 rounded px-0.5 ring-2 ring-pink-400',
  },
  {
    key: 'name',
    label: 'make_juice',
    title: '机器的名字',
    desc: '以后想用它，喊这个名字就行。起名要让人一看就懂它是干嘛的。',
    chip: 'bg-cyan-100 text-cyan-700 border-cyan-300',
    hl: 'bg-cyan-500/40 rounded px-0.5 ring-2 ring-cyan-400',
  },
  {
    key: 'param',
    label: 'fruit',
    title: '入口（参数）',
    desc: '原材料从这里放进去。函数内部就用这个名字称呼收到的东西。',
    chip: 'bg-purple-100 text-purple-700 border-purple-300',
    hl: 'bg-purple-500/40 rounded px-0.5 ring-2 ring-purple-400',
  },
  {
    key: 'return',
    label: 'return',
    title: '出口（返回值）',
    desc: '做好的成品从这里递出来，交到调用它的人手上。',
    chip: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    hl: 'bg-emerald-500/40 rounded px-0.5 ring-2 ring-emerald-400',
  },
];

function FunctionAnatomy() {
  const [active, setActive] = useState('def');
  const part = PARTS.find((p) => p.key === active)!;
  const on = (k: string, cls: string) => (active === k ? cls : '');

  return (
    <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 my-6">
      <h3 className="text-center text-lg font-bold text-slate-800 mb-5">
        🔧 拆开看看：函数的四个零件
      </h3>

      {/* 代码（手工上色，配合零件高亮） */}
      <div className="bg-slate-900 rounded-xl p-5 font-mono text-sm leading-loose overflow-x-auto">
        <div>
          <span className={`text-pink-400 font-semibold ${on('def', PARTS[0].hl)}`}>def</span>
          <span className="text-slate-100"> </span>
          <span className={`text-cyan-300 ${on('name', PARTS[1].hl)}`}>make_juice</span>
          <span className="text-yellow-400">(</span>
          <span className={`text-purple-300 ${on('param', PARTS[2].hl)}`}>fruit</span>
          <span className="text-yellow-400">)</span>
          <span className="text-slate-100">:</span>
        </div>
        <div>
          <span className="text-slate-100">    juice </span>
          <span className="text-sky-300">=</span>
          <span className={`text-purple-300 ${on('param', PARTS[2].hl)}`}> fruit</span>
          <span className="text-sky-300"> +</span>
          <span className="text-amber-300"> "汁"</span>
        </div>
        <div>
          <span className="text-slate-100">    </span>
          <span className={`text-pink-400 font-semibold ${on('return', PARTS[3].hl)}`}>return</span>
          <span className="text-slate-100"> juice</span>
        </div>
      </div>

      {/* 零件按钮 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
        {PARTS.map((p) => (
          <button
            key={p.key}
            onClick={() => setActive(p.key)}
            className={`px-3 py-2 rounded-lg border-2 font-mono text-sm font-bold transition-all ${p.chip} ${
              active === p.key ? 'scale-105 shadow-md' : 'opacity-60 hover:opacity-100'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* 说明 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="mt-4 bg-slate-50 rounded-xl border border-slate-200 p-4"
        >
          <div className="font-bold text-slate-800 mb-1">{part.title}</div>
          <p className="text-sm text-slate-600 mb-0">{part.desc}</p>
        </motion.div>
      </AnimatePresence>

      <p className="mt-4 text-xs text-center text-slate-400 mb-0">
        别忘了 def 那行结尾的冒号 : 和下面每行的缩进 —— 它们框出"机器内部"的范围。
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   调用过程慢动作：一步步看 make_juice("苹果") 发生了什么
   ═══════════════════════════════════════════════════════════════════ */
const CALL_CODE = `def make_juice(fruit):
    juice = fruit + "汁"
    return juice

result = make_juice("苹果")
print(result)`;

interface StepVars {
  fruit?: string;
  juice?: string;
  result?: string;
}
const CALL_STEPS: { lines: number[]; vars: StepVars; desc: string }[] = [
  {
    lines: [5],
    vars: {},
    desc: '出发！Python 看到 make_juice("苹果")，带着 "苹果" 去找这台机器。',
  },
  {
    lines: [1],
    vars: { fruit: '"苹果"' },
    desc: '"苹果" 从入口进去，装进参数 fruit —— 机器内部现在有一个叫 fruit 的盒子。',
  },
  {
    lines: [2],
    vars: { fruit: '"苹果"', juice: '"苹果汁"' },
    desc: '机器开工：把 fruit 和 "汁" 拼起来，放进新盒子 juice。',
  },
  {
    lines: [3],
    vars: { fruit: '"苹果"', juice: '"苹果汁"' },
    desc: 'return 把 "苹果汁" 从出口递出去 —— 机器的任务到此结束。',
  },
  {
    lines: [5],
    vars: { result: '"苹果汁"' },
    desc: '递出来的 "苹果汁" 装进外面的 result。注意：机器内部的 fruit、juice 已经被清空了！',
  },
  {
    lines: [6],
    vars: { result: '"苹果汁"' },
    desc: 'print(result) 打印出：苹果汁 🎉 全程结束。',
  },
];

function VarBox({ name, value, tone }: { name: string; value: string; tone: 'purple' | 'blue' }) {
  const cls =
    tone === 'purple'
      ? 'bg-purple-50 border-purple-300 text-purple-800'
      : 'bg-blue-50 border-blue-300 text-blue-800';
  return (
    <motion.div
      layout
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      className={`px-3 py-2 rounded-lg border-2 font-mono text-sm ${cls}`}
    >
      <span className="font-bold">{name}</span>
      <span className="opacity-60"> = </span>
      {value}
    </motion.div>
  );
}

function FunctionCallStepper() {
  const [step, setStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setIsPlaying(false);
  };

  const reset = () => {
    stop();
    setStep(-1);
  };

  const next = () => {
    stop();
    setStep((s) => Math.min(s + 1, CALL_STEPS.length - 1));
  };

  const play = () => {
    stop();
    setStep(0);
    setIsPlaying(true);
    timer.current = setInterval(() => {
      setStep((s) => {
        if (s >= CALL_STEPS.length - 1) {
          stop();
          return s;
        }
        return s + 1;
      });
    }, 1600);
  };

  useEffect(() => () => stop(), []);

  const cur = step >= 0 ? CALL_STEPS[step] : null;

  return (
    <div className="bg-white border-2 border-indigo-200 rounded-2xl p-6 my-6">
      <h3 className="text-center text-lg font-bold text-indigo-900 mb-2">
        🎬 慢动作回放：一次函数调用的全过程
      </h3>
      <p className="text-center text-sm text-slate-500 mb-5">
        按 ▶ 自动播放，或者一步步点"下一步"，看数据怎么进出机器。
      </p>

      {/* 控制按钮 */}
      <div className="flex justify-center gap-3 mb-5">
        <button
          onClick={play}
          disabled={isPlaying}
          className="px-5 py-2 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 disabled:opacity-40 transition-colors"
        >
          ▶ 自动播放
        </button>
        <button
          onClick={next}
          disabled={step >= CALL_STEPS.length - 1}
          className="px-5 py-2 rounded-lg bg-white border-2 border-indigo-300 text-indigo-700 font-medium hover:bg-indigo-50 disabled:opacity-40 transition-colors"
        >
          👣 下一步
        </button>
        <button
          onClick={reset}
          className="px-5 py-2 rounded-lg border border-slate-300 text-slate-600 font-medium hover:bg-slate-100 transition-colors"
        >
          ↺ 重置
        </button>
      </div>

      {/* 进度点 */}
      <div className="flex justify-center gap-1.5 mb-4">
        {CALL_STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i <= step ? 'bg-indigo-500 w-6' : 'bg-slate-200 w-3'
            }`}
          />
        ))}
      </div>

      {/* 解说气泡 */}
      <div className="min-h-[3.5rem] flex items-center justify-center mb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="text-sm text-slate-700 bg-indigo-50 border border-indigo-200 px-4 py-2.5 rounded-xl max-w-md text-center"
          >
            {cur ? cur.desc : '👆 点上面的按钮开始'}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 变量区：机器内部 vs 外部世界 */}
      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <div className="rounded-xl border-2 border-purple-200 bg-purple-50/40 p-3">
          <div className="text-xs font-bold text-purple-600 mb-2">
            🏭 机器内部（函数里的临时盒子）
          </div>
          <div className="flex flex-wrap gap-2 min-h-[3rem]">
            <AnimatePresence>
              {cur?.vars.fruit && <VarBox key="fruit" name="fruit" value={cur.vars.fruit} tone="purple" />}
              {cur?.vars.juice && <VarBox key="juice" name="juice" value={cur.vars.juice} tone="purple" />}
            </AnimatePresence>
            {cur && !cur.vars.fruit && !cur.vars.juice && (
              <span className="text-xs text-slate-400 self-center">（空的）</span>
            )}
          </div>
        </div>
        <div className="rounded-xl border-2 border-blue-200 bg-blue-50/40 p-3">
          <div className="text-xs font-bold text-blue-600 mb-2">
            🌍 外面的世界（你的主程序）
          </div>
          <div className="flex flex-wrap gap-2 min-h-[3rem]">
            <AnimatePresence>
              {cur?.vars.result && <VarBox key="result" name="result" value={cur.vars.result} tone="blue" />}
            </AnimatePresence>
            {cur && !cur.vars.result && (
              <span className="text-xs text-slate-400 self-center">（还没收到东西）</span>
            )}
          </div>
        </div>
      </div>

      {/* 同步高亮的代码 */}
      <CodeBlock code={CALL_CODE} highlightLines={cur ? cur.lines : []} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   笨办法 vs 聪明办法：复制粘贴地狱
   ═══════════════════════════════════════════════════════════════════ */
const NAMES = ['小明', '小红', '小刚', '小丽', '小华', '小军', '小美', '小强'];

function DumbVsSmart() {
  const [n, setN] = useState(3);
  const [alt, setAlt] = useState(false);
  const [flash, setFlash] = useState(false);
  const timer = useRef<number | null>(null);

  const greeting = alt ? '今天也要加油鸭' : '欢迎来到语言学乐园';

  const toggleGreeting = () => {
    setAlt((v) => !v);
    setFlash(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setFlash(false), 1800);
  };

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const names = NAMES.slice(0, n);
  const dumbLines = names.flatMap((name) => [
    { text: `print("你好, ${name}!")`, changed: false },
    { text: `print("${greeting}")`, changed: true },
  ]);
  const smartLines = [
    { text: 'def greet(name):', changed: false },
    { text: '    print("你好, " + name + "!")', changed: false },
    { text: `    print("${greeting}")`, changed: true },
    { text: '', changed: false },
    ...names.map((name) => ({ text: `greet("${name}")`, changed: false })),
  ];

  const CodePanel = ({ lines }: { lines: { text: string; changed: boolean }[] }) => (
    <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs leading-relaxed max-h-56 overflow-y-auto">
      {lines.map((l, i) => (
        <div
          key={i}
          className={`whitespace-pre transition-colors duration-300 ${
            l.changed && flash ? 'bg-yellow-500/30 rounded' : ''
          } ${l.text ? 'text-slate-200' : ''}`}
        >
          {l.text || ' '}
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 my-6">
      <h3 className="text-center text-lg font-bold text-slate-800 mb-2">
        😫 vs 😎：跟每位同学打招呼
      </h3>
      <p className="text-center text-sm text-slate-500 mb-5">
        拖滑块加人，再点"换欢迎词"，看看哪边先崩溃。
      </p>

      {/* 控制区 */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-5 justify-center">
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500 whitespace-nowrap">来了 {n} 位同学</span>
          <input
            type="range" min={1} max={8} value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="w-40 accent-blue-500"
          />
        </div>
        <button
          onClick={toggleGreeting}
          className="px-4 py-2 rounded-lg bg-amber-400 text-amber-900 text-sm font-bold hover:bg-amber-300 transition-colors"
        >
          ✏️ 换一句欢迎词
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* 笨办法 */}
        <div className="rounded-xl border-2 border-red-300 bg-red-50 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-red-700">❌ 复制粘贴大法</span>
            <span className="text-xs font-mono bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
              {dumbLines.length} 行
            </span>
          </div>
          <CodePanel lines={dumbLines} />
          <AnimatePresence>
            {flash && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-red-600 font-bold mt-2 mb-0"
              >
                改欢迎词要动 {n} 个地方 😫 漏改一处就是 bug！
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* 聪明办法 */}
        <div className="rounded-xl border-2 border-green-300 bg-green-50 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-green-700">✅ 函数大法</span>
            <span className="text-xs font-mono bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              {smartLines.length} 行
            </span>
          </div>
          <CodePanel lines={smartLines} />
          <AnimatePresence>
            {flash && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-green-600 font-bold mt-2 mb-0"
              >
                只改 1 个地方 😎 所有调用自动更新！
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   print vs return：喊出来 ≠ 递到手上
   ═══════════════════════════════════════════════════════════════════ */
function PrintVsReturn() {
  const [leftRun, setLeftRun] = useState(false);
  const [rightRun, setRightRun] = useState(false);
  const timers = useRef<number[]>([]);

  // 先熄灭再点亮，保证重复点击也能重放动画
  const rerun = (set: (v: boolean) => void) => {
    set(false);
    timers.current.push(window.setTimeout(() => set(true), 50));
  };

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const ConsoleLine = ({
    text,
    delay,
    tone,
    note,
  }: {
    text: string;
    delay: number;
    tone: 'normal' | 'bad' | 'good';
    note: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex items-baseline gap-3"
    >
      <span
        className={`font-mono text-sm ${
          tone === 'bad' ? 'text-red-400 font-bold' : tone === 'good' ? 'text-green-400 font-bold' : 'text-slate-200'
        }`}
      >
        {text}
      </span>
      <span className="text-[11px] text-slate-500">{note}</span>
    </motion.div>
  );

  return (
    <div className="bg-white border-2 border-rose-200 rounded-2xl p-6 my-6">
      <h3 className="text-center text-lg font-bold text-rose-900 mb-2">
        📢 喊出来 vs 🤲 递到手上
      </h3>
      <p className="text-center text-sm text-slate-500 mb-5">
        两台机器都"造出了"果汁，但只有一台真的把果汁交给了你。分别点"运行"看看。
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* print 机器 */}
        <div className="rounded-xl border-2 border-slate-200 p-4 flex flex-col">
          <div className="font-bold text-slate-700 mb-2">📢 只会喊的机器（print）</div>
          <CodeBlock
            code={`def shout_juice(fruit):
    print(fruit + "汁")  # 喊出来

cup = shout_juice("苹果")
print(cup)`}
            showLineNumbers={false}
          />
          <button
            onClick={() => rerun(setLeftRun)}
            className="self-center px-5 py-2 rounded-lg bg-slate-700 text-white text-sm font-medium hover:bg-slate-600 transition-colors mb-3"
          >
            ▶ 运行
          </button>
          <div className="bg-slate-900 rounded-lg p-3 min-h-[4.5rem] space-y-1">
            <div className="text-[10px] text-slate-500 font-mono mb-1">运行结果：</div>
            {leftRun && (
              <>
                <ConsoleLine text="苹果汁" delay={0.1} tone="normal" note="← 这是函数自己喊的" />
                <ConsoleLine text="None" delay={0.9} tone="bad" note="← cup 里什么都没有！" />
              </>
            )}
          </div>
          <div className="mt-3 text-center min-h-[3rem]">
            {leftRun && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="inline-flex items-center gap-2 text-sm text-red-600 font-medium"
              >
                <span className="text-2xl">🫙</span> 杯子是空的：cup = None
              </motion.div>
            )}
          </div>
        </div>

        {/* return 机器 */}
        <div className="rounded-xl border-2 border-slate-200 p-4 flex flex-col">
          <div className="font-bold text-slate-700 mb-2">🤲 会递东西的机器（return）</div>
          <CodeBlock
            code={`def make_juice(fruit):
    return fruit + "汁"  # 递给你

cup = make_juice("苹果")
print(cup)`}
            showLineNumbers={false}
          />
          <button
            onClick={() => rerun(setRightRun)}
            className="self-center px-5 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-500 transition-colors mb-3"
          >
            ▶ 运行
          </button>
          <div className="bg-slate-900 rounded-lg p-3 min-h-[4.5rem] space-y-1">
            <div className="text-[10px] text-slate-500 font-mono mb-1">运行结果：</div>
            {rightRun && (
              <ConsoleLine text="苹果汁" delay={0.1} tone="good" note="← 从 cup 里倒出来的" />
            )}
          </div>
          <div className="mt-3 text-center min-h-[3rem]">
            {rightRun && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="inline-flex items-center gap-2 text-sm text-emerald-600 font-medium"
              >
                <span className="text-2xl">🧃</span> 稳稳到手：cup = "苹果汁"
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-center text-slate-500 mb-0">
        <code className="bg-slate-100 px-1 rounded">print</code> 只是在屏幕上喊一嗓子；
        <code className="bg-slate-100 px-1 rounded">return</code> 才把结果交到变量手上，
        后面才能继续用它算别的东西。
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   语言学实战：TTR 词汇丰富度测量仪
   ═══════════════════════════════════════════════════════════════════ */
interface Corpus {
  key: string;
  label: string;
  varName: string;
  tokens: string[];
  bar: string;
  btn: string;
}

const CORPORA: Corpus[] = [
  {
    key: 'child',
    label: '👶 儿童说话',
    varName: 'child_tokens',
    tokens: ['我', '要', '吃', '糖', '我', '要', '玩', '我', '要', '妈妈'],
    bar: 'bg-rose-400',
    btn: 'border-rose-300 hover:border-rose-400',
  },
  {
    key: 'chat',
    label: '💬 日常聊天',
    varName: 'chat_tokens',
    tokens: ['你', '吃', '了', '吗', '我', '吃', '了', '你', '呢', '嗯'],
    bar: 'bg-amber-400',
    btn: 'border-amber-300 hover:border-amber-400',
  },
  {
    key: 'news',
    label: '📰 新闻报道',
    varName: 'news_tokens',
    tokens: ['记者', '今天', '从', '会议', '上', '了解', '到', '会议', '政策', '发布'],
    bar: 'bg-sky-400',
    btn: 'border-sky-300 hover:border-sky-400',
  },
];

const TTR_CODE = `def ttr(tokens):
    types = set(tokens)              # 去掉重复，只留"词种"
    return len(types) / len(tokens)  # 词种数 ÷ 总词数

ttr(child_tokens)   # 换一批语料，再调用一次就行`;

function TTRLab() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [phase, setPhase] = useState<'tokens' | 'types' | 'result' | null>(null);
  const [results, setResults] = useState<Record<string, number>>({});
  const timers = useRef<number[]>([]);

  const run = (c: Corpus) => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setActiveKey(c.key);
    setPhase('tokens');
    timers.current.push(window.setTimeout(() => setPhase('types'), 1000));
    timers.current.push(
      window.setTimeout(() => {
        setPhase('result');
        const types = new Set(c.tokens).size;
        setResults((prev) => ({ ...prev, [c.key]: types / c.tokens.length }));
      }, 2000),
    );
  };

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const active = CORPORA.find((c) => c.key === activeKey) ?? null;
  const typeCounts = active
    ? active.tokens.reduce<Record<string, number>>((acc, t) => {
        acc[t] = (acc[t] ?? 0) + 1;
        return acc;
      }, {})
    : {};
  const uniqueTokens = active ? [...new Set(active.tokens)] : [];
  const highlight = phase === 'tokens' ? [5] : phase === 'types' ? [2] : phase === 'result' ? [3] : [];

  return (
    <div className="bg-gradient-to-b from-teal-50 to-white border-2 border-teal-200 rounded-2xl p-6 my-6">
      <h3 className="text-center text-lg font-bold text-teal-900 mb-2">
        🔬 词汇丰富度测量仪
      </h3>
      <p className="text-center text-sm text-slate-500 mb-5">
        <code className="bg-white px-1 rounded">ttr()</code> 函数只写了一次。
        点不同的语料，看它被反复调用 —— 把三批都测完，比比谁的词汇更丰富。
      </p>

      {/* 语料选择 */}
      <div className="flex flex-wrap justify-center gap-3 mb-5">
        {CORPORA.map((c) => (
          <button
            key={c.key}
            onClick={() => run(c)}
            className={`px-4 py-2.5 rounded-xl bg-white border-2 font-medium text-sm transition-all ${c.btn} ${
              activeKey === c.key ? 'scale-105 shadow-md' : ''
            }`}
          >
            {c.label}
            {results[c.key] !== undefined && (
              <span className="ml-2 font-mono text-xs text-slate-400">✓</span>
            )}
          </button>
        ))}
      </div>

      {/* 分析过程 */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 min-h-[10rem]">
        {!active && (
          <div className="h-full flex items-center justify-center text-sm text-slate-400 py-10">
            👆 选一批语料开始测量
          </div>
        )}
        {active && (
          <div className="space-y-4">
            {/* tokens 行 */}
            <div>
              <div className="text-xs font-bold text-slate-500 mb-1.5">
                总词数 token（{active.tokens.length} 个）：
              </div>
              <div className="flex flex-wrap gap-1.5">
                {active.tokens.map((t, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.06 }}
                    className={`px-2 py-1 rounded text-sm border ${
                      typeCounts[t] > 1
                        ? 'bg-amber-50 border-amber-300 text-amber-800'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
              <div className="text-[11px] text-amber-600 mt-1">🟡 = 重复出现的词</div>
            </div>

            {/* types 行 */}
            {(phase === 'types' || phase === 'result') && (
              <div>
                <div className="text-xs font-bold text-slate-500 mb-1.5">
                  set() 去重后的词种 type（{uniqueTokens.length} 个）：
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {uniqueTokens.map((t, i) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="px-2 py-1 rounded text-sm bg-teal-50 border border-teal-300 text-teal-800"
                    >
                      {t}
                      {typeCounts[t] > 1 && (
                        <span className="ml-1 text-[10px] text-teal-500">×{typeCounts[t]}</span>
                      )}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}

            {/* 结果 */}
            {phase === 'result' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center font-mono text-lg"
              >
                <span className="text-teal-700">{uniqueTokens.length}</span>
                <span className="text-slate-400"> ÷ </span>
                <span className="text-slate-700">{active.tokens.length}</span>
                <span className="text-slate-400"> = </span>
                <span className="font-bold text-teal-600 text-xl">
                  {(uniqueTokens.length / active.tokens.length).toFixed(1)}
                </span>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* 结果对比条 */}
      {Object.keys(results).length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 space-y-2">
          <div className="text-xs font-bold text-slate-500 mb-1">📊 测量结果（TTR 越高 = 词汇越丰富）</div>
          {CORPORA.filter((c) => results[c.key] !== undefined).map((c) => (
            <div key={c.key} className="flex items-center gap-2">
              <span className="text-sm w-24 shrink-0">{c.label}</span>
              <div className="flex-1 bg-slate-100 rounded-full h-5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${results[c.key] * 100}%` }}
                  transition={{ type: 'spring', stiffness: 80 }}
                  className={`h-full ${c.bar} rounded-full`}
                />
              </div>
              <span className="font-mono text-sm font-bold w-10 text-right">
                {results[c.key].toFixed(1)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* 同步代码 */}
      <CodeBlock code={TTR_CODE} highlightLines={highlight} />
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
      <h1>函数：把代码打包成一台小机器</h1>

      <p>
        到目前为止你已经很能干了：会存数据（变量）、会批量干活（循环）、会看情况办事（条件判断）。
        但你可能也隐约感觉到：有些代码总是长得一模一样，每次用都得重新写一遍，烦。
      </p>

      <p>
        生活里我们怎么解决重复劳动？<strong>造一台机器</strong>。
        想喝果汁，不用每次从头研究怎么榨——把水果丢进榨汁机，按一下，果汁自己出来。
      </p>

      <JuiceMachineOpener />

      <p>
        注意看：<strong>同一台机器</strong>，喂苹果出苹果汁，喂葡萄出葡萄汁。
        机器不关心你放的是什么水果，它只负责"把东西变成汁"这个<strong>动作</strong>。
        这台机器，就是编程里的<strong>函数</strong>。翻译成 Python：
      </p>

      <CodeBlock
        code={`def make_juice(fruit):     # 造机器（定义函数）
    juice = fruit + "汁"
    return juice

make_juice("苹果")   # 用机器（调用函数）→ "苹果汁"
make_juice("葡萄")   # 再用一次 → "葡萄汁"`}
        highlightLines={[1, 5, 6]}
      />

      <blockquote>
        <strong>核心思想一句话：</strong>造机器只需要一次（<code>def</code>），
        用机器可以无数次（调用）。这就是函数的全部意义。
      </blockquote>

      <p>
        这台"机器"由四个零件组成。点下面的按钮，一个一个认识它们：
      </p>

      <FunctionAnatomy />

      <h2>机器内部发生了什么？</h2>

      <p>
        写 <code>result = make_juice("苹果")</code> 的那一瞬间，Python 其实做了好几件事。
        我们把整个过程放慢 100 倍，你亲眼看一遍：
      </p>

      <FunctionCallStepper />

      <p>
        有个细节值得多看一眼：函数一结束，它内部的 <code>fruit</code> 和 <code>juice</code> 就<strong>被清空了</strong>。
        函数里的变量是"临时工作台"，外面的世界看不见也摸不着。
        想把成果带出来，只有一条路——<code>return</code>。
      </p>

      <h2>为什么非用函数不可？</h2>

      <p>
        "我复制粘贴不也一样吗？"——来，做个实验。
        假设开学了，你要跟每位新同学打两句招呼：
      </p>

      <DumbVsSmart />

      <p>
        看出来了吧？人一多，左边的代码越滚越长；而右边不管来多少人，机器始终只有一台。
        更致命的是<strong>改需求</strong>：换句欢迎词，左边要改 N 处（漏一处就是 bug），
        右边永远只改 1 处。
      </p>

      <h2>print 不是 return！</h2>

      <p>
        接下来是新手的<strong>头号翻车点</strong>。
        很多人觉得"函数里 print 出来了，就是有结果了"——不对。
        先记住这句话：<code>print</code> 是机器<strong>喊给你听</strong>，
        <code>return</code> 是机器<strong>把东西递到你手上</strong>。
      </p>

      <PrintVsReturn />

      <p>
        判断口诀：想把结果<strong>存下来继续算</strong> → 用 <code>return</code>；
        只是想<strong>在屏幕上看一眼</strong> → 用 <code>print</code>。
        做数据分析时，你写的函数几乎都应该 <code>return</code>。
      </p>

      <h2>入口可以不止一个</h2>

      <p>
        机器可以有好几个入口（参数），用逗号隔开就行。
        还可以给参数设<strong>默认值</strong>——不传的时候，就用默认的。
        比如语料研究里常用的"频次标准化"：
      </p>

      <CodeBlock
        code={`def per_n_words(count, total, per=10000):   # per 有默认值
    return count / total * per

# "构式"在 35 万词的语料里出现了 42 次
per_n_words(42, 350000)           # 1.2  → 每万词 1.2 次（per 用默认的 10000）
per_n_words(42, 350000, 1000000)  # 120.0 → 每百万词 120 次（临时换算标准）`}
        highlightLines={[1]}
      />

      <p>
        为什么要标准化？因为 35 万词的语料和 5 万词的语料，原始频次没法直接比。
        这个函数在第五单元还会正式登场，先混个脸熟。
      </p>

      <h2>语言学实战：词汇丰富度测量仪</h2>

      <p>
        来点真家伙。语言学里有个经典指标 <strong>TTR</strong>（type-token ratio，型例比）：
        <strong>不同的词有几种（type）÷ 总共说了几个词（token）</strong>。
        TTR 越高，说明词汇越丰富——儿童语言发展、二语写作评估都靠它。
      </p>

      <p>
        我们把 TTR 的计算打包成一个 <code>ttr()</code> 函数，然后拿三批语料轮番测试：
      </p>

      <TTRLab />

      <p>
        感受到函数的威力了吗？<code>ttr()</code> 只写了一次，三批语料随便测。
        明天导师又发来第四批语料？<code>ttr(new_tokens)</code>，一行搞定。
        <strong>写一次，用到毕业</strong>——这就是研究者要学函数的理由。
      </p>

      <h2>动手练习</h2>

      <p>从简单的开始。先自己写，卡住了再看答案。</p>

      <Exercise
        n={1}
        title="写一个函数 double(x)，返回 x 的两倍。"
        hint="def 开头，别忘了 return。写完用 double(5) 试试。"
        answer={`def double(x):
    return x * 2

print(double(5))    # 10
print(double(21))   # 42`}
      />

      <Exercise
        n={2}
        title="写一个函数 is_function_word(word)：如果这个词在功能词表 [&quot;的&quot;, &quot;了&quot;, &quot;在&quot;, &quot;和&quot;, &quot;是&quot;] 里，返回 True，否则返回 False。"
        hint="in 的判断结果本身就是 True/False，可以直接 return 它。"
        answer={`def is_function_word(word):
    return word in ["的", "了", "在", "和", "是"]

print(is_function_word("的"))    # True
print(is_function_word("语言"))  # False`}
      />

      <Exercise
        n={3}
        title="写一个函数 count_word(tokens, target)：数一数 target 这个词在词列表 tokens 里出现了几次。"
        hint="两个参数。用上一章学的循环 + 条件判断 + 计数器。"
        answer={`def count_word(tokens, target):
    n = 0
    for t in tokens:
        if t == target:
            n = n + 1
    return n

tokens = ["我", "爱", "我", "的", "家"]
print(count_word(tokens, "我"))   # 2`}
      />

      <Exercise
        n={4}
        title="进阶：写一个函数 ttr_report(name, tokens)，返回一句报告，比如「儿童语料的 TTR 是 0.6」。"
        hint="函数里可以调用别的函数——先算 TTR，再用 str() 把数字拼进句子。"
        answer={`def ttr(tokens):
    return len(set(tokens)) / len(tokens)

def ttr_report(name, tokens):
    value = ttr(tokens)              # 函数调用函数！
    return name + "的 TTR 是 " + str(value)

child = ["我", "要", "吃", "糖", "我", "要", "玩", "我", "要", "妈妈"]
print(ttr_report("儿童语料", child))   # 儿童语料的 TTR 是 0.6`}
      />

      <div className="rounded-xl bg-slate-800 text-slate-100 p-6 my-8">
        <div className="font-bold text-lg mb-3">🎯 这一章你学会了</div>
        <ul className="space-y-1.5 text-sm text-slate-200 list-none pl-0">
          <li>✅ <code className="bg-slate-700 px-1 rounded">def 名字(参数):</code> 造一台机器，造一次就够</li>
          <li>✅ 调用 <code className="bg-slate-700 px-1 rounded">名字(原材料)</code>，想用几次用几次</li>
          <li>✅ <code className="bg-slate-700 px-1 rounded">return</code> 把结果递出来，函数内部的临时变量随即清空</li>
          <li>✅ <code className="bg-slate-700 px-1 rounded">print</code> 只是喊给你听，<code className="bg-slate-700 px-1 rounded">return</code> 才能存进变量继续用</li>
          <li>✅ 参数可以有多个，还能设默认值（<code className="bg-slate-700 px-1 rounded">per=10000</code>）</li>
        </ul>
        <p className="text-sm text-slate-300 mt-4 mb-0">
          下一章我们学<strong>文件读写</strong>——让 Python 直接打开你电脑里的语料文件，
          真实的数据分析从那里开始。
        </p>
      </div>
    </div>
  );
}
