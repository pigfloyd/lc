import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CodeBlock from '../../components/shared/CodeBlock';

/* ────────────────────────────────────────────────────────────────
   Demo 1：人肉统计 vs 电脑统计 大对决
   ──────────────────────────────────────────────────────────────── */

const TOTAL_ESSAYS = 500;
const TICK_MS = 100;
const COMPUTER_DONE_TICK = 10; // 电脑 1 秒完成
const HUMAN_TICKS_PER_ESSAY = 22; // 人每 2.2 秒数完一篇（演示用）
const RACE_END_TICK = 72; // 约 7 秒后结束演示

function RaceDemo() {
  const [tick, setTick] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!playing) return;
    timerRef.current = setInterval(() => {
      setTick((t) => {
        if (t + 1 >= RACE_END_TICK) {
          setPlaying(false);
          return RACE_END_TICK;
        }
        return t + 1;
      });
    }, TICK_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing]);

  const humanEssays = Math.min(3, Math.floor(tick / HUMAN_TICKS_PER_ESSAY));
  const computerProgress = Math.min(100, (tick / COMPUTER_DONE_TICK) * 100);
  const computerDone = tick >= COMPUTER_DONE_TICK;
  const raceOver = tick >= RACE_END_TICK;
  const started = tick > 0;

  const reset = () => {
    setPlaying(false);
    setTick(0);
  };

  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-500">
          🏁 比赛项目：数完 500 篇作文里的“把”字句
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => (raceOver ? reset() : setPlaying((p) => !p))}
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            {raceOver ? '↺ 再看一次' : playing ? '⏸ 暂停' : '▶ 开始比赛'}
          </button>
          <button
            onClick={reset}
            className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200"
          >
            ↺ 重置
          </button>
        </div>
      </div>

      {/* 选手一：小雅 */}
      <div className="mb-4 rounded-xl bg-slate-50 p-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-slate-700">
            👩‍🎓 小雅（手动数，一篇约 10 分钟）
          </span>
          <span className="font-mono text-slate-500">
            {humanEssays} / {TOTAL_ESSAYS} 篇
          </span>
        </div>
        <div className="h-4 overflow-hidden rounded-full bg-slate-200">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-orange-400 to-rose-400"
            animate={{ width: `${Math.max((humanEssays / TOTAL_ESSAYS) * 100, started ? 1 : 0)}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <AnimatePresence>
          {raceOver && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-2 text-sm text-rose-600"
            >
              😵 才数完 3 篇……照这个速度，剩下的还要{' '}
              <strong>82 小时 50 分钟</strong>（不吃不睡三天半）
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* 选手二：电脑 */}
      <div className="rounded-xl bg-slate-50 p-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-slate-700">💻 电脑（运行一小段 Python）</span>
          <span className="font-mono text-slate-500">
            {computerDone ? TOTAL_ESSAYS : Math.floor((computerProgress / 100) * TOTAL_ESSAYS)} /{' '}
            {TOTAL_ESSAYS} 篇
          </span>
        </div>
        <div className="h-4 overflow-hidden rounded-full bg-slate-200">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
            animate={{ width: `${computerProgress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
        <AnimatePresence>
          {computerDone && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-2 text-sm text-emerald-600"
            >
              ✅ 完成！用时 <strong>0.3 秒</strong>，500 篇作文全部数完
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {raceOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4 text-center text-sm text-blue-800"
          >
            同一件事，电脑比人快了大约 <strong>100 万倍</strong>——而且不会数错、不会累、不会烦。
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Demo 2：死板助手小机 —— 逐字扫描数“了”
   ──────────────────────────────────────────────────────────────── */

const ROBOT_SENTENCE = '他吃了饭，喝了茶，把作业写完了。';
const ROBOT_CHARS = Array.from(ROBOT_SENTENCE);
const TARGET_CHAR = '了';

function RobotStepDemo() {
  const [idx, setIdx] = useState(-1); // -1 = 还没开始
  const [playing, setPlaying] = useState(false);

  const done = idx >= ROBOT_CHARS.length - 1;
  const count = ROBOT_CHARS.slice(0, idx + 1).filter((c) => c === TARGET_CHAR).length;

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setIdx((i) => {
        if (i + 1 >= ROBOT_CHARS.length - 1) setPlaying(false);
        return Math.min(i + 1, ROBOT_CHARS.length - 1);
      });
    }, 450);
    return () => clearInterval(timer);
  }, [playing]);

  const step = () => setIdx((i) => Math.min(i + 1, ROBOT_CHARS.length - 1));
  const reset = () => {
    setPlaying(false);
    setIdx(-1);
  };

  const currentChar = idx >= 0 ? ROBOT_CHARS[idx] : null;
  const isHit = currentChar === TARGET_CHAR;

  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-semibold text-slate-500">
          🤖 小机的任务：数出句子里有几个“{TARGET_CHAR}”
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => (done ? reset() : setPlaying((p) => !p))}
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            {done ? '↺ 再看一次' : playing ? '⏸ 暂停' : '▶ 自动播放'}
          </button>
          <button
            onClick={step}
            disabled={playing || done}
            className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200 disabled:opacity-40"
          >
            ⏭ 下一步
          </button>
          <button
            onClick={reset}
            className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200"
          >
            ↺ 重置
          </button>
        </div>
      </div>

      {/* 句子逐字展示 */}
      <div className="mb-4 flex flex-wrap justify-center gap-1.5 rounded-xl bg-slate-50 p-4">
        {ROBOT_CHARS.map((char, i) => {
          const isCurrent = i === idx;
          const isPast = i < idx;
          const isTargetHit = char === TARGET_CHAR && i <= idx;
          return (
            <motion.span
              key={i}
              animate={{
                scale: isCurrent ? 1.35 : 1,
                opacity: isPast && !isTargetHit ? 0.35 : 1,
              }}
              className={`flex h-9 w-9 items-center justify-center rounded-lg text-lg font-medium ${
                isTargetHit
                  ? 'bg-emerald-500 text-white shadow-md'
                  : isCurrent
                    ? 'bg-blue-500 text-white shadow-lg ring-2 ring-blue-300'
                    : 'bg-white text-slate-700 shadow-sm'
              }`}
            >
              {char}
            </motion.span>
          );
        })}
      </div>

      {/* 状态面板 */}
      <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-900 px-4 py-3 text-sm text-white">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-slate-200"
            >
              {idx < 0
                ? '待命中……按 ▶ 或 ⏭ 让我开始'
                : done
                  ? `全部看完，报告：一共 ${count} 个“${TARGET_CHAR}”`
                  : isHit
                    ? `第 ${idx + 1} 个字是“${currentChar}”→ 找到目标，计数 +1`
                    : `第 ${idx + 1} 个字是“${currentChar}”→ 不是目标，跳过`}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="flex shrink-0 items-center gap-2 rounded-lg bg-slate-700 px-3 py-1.5">
          <span className="text-xs text-slate-300">计数器</span>
          <motion.span
            key={count}
            initial={{ scale: 1.6, color: '#34d399' }}
            animate={{ scale: 1, color: '#ffffff' }}
            className="font-mono text-lg font-bold"
          >
            {count}
          </motion.span>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Demo 3：步骤 ↔ 代码 对照
   ──────────────────────────────────────────────────────────────── */

const SYNC_CODE = `text = "他吃了饭，喝了茶，把作业写完了。"
count = 0
for char in text:
    if char == "了":
        count = count + 1
print(count)`;

const SYNC_STEPS: { emoji: string; desc: string; lines: number[] }[] = [
  { emoji: '📄', desc: '把要检查的句子交给小机', lines: [1] },
  { emoji: '🔢', desc: '准备一个归零的计数器', lines: [2] },
  { emoji: '👀', desc: '一个字一个字地看过去', lines: [3] },
  { emoji: '❓', desc: '每看一个字，问：是“了”吗？', lines: [4] },
  { emoji: '✅', desc: '是的话，计数器 +1', lines: [5] },
  { emoji: '📢', desc: '全部看完，报告结果：3', lines: [6] },
];

function CodeSyncDemo() {
  const [stepIdx, setStepIdx] = useState(0);
  const step = SYNC_STEPS[stepIdx];

  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-500">
          🔍 点“上一步 / 下一步”，看每条指令对应哪行代码
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
            disabled={stepIdx === 0}
            className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200 disabled:opacity-40"
          >
            ← 上一步
          </button>
          <span className="font-mono text-xs text-slate-400">
            {stepIdx + 1}/{SYNC_STEPS.length}
          </span>
          <button
            onClick={() => setStepIdx((i) => Math.min(SYNC_STEPS.length - 1, i + 1))}
            disabled={stepIdx === SYNC_STEPS.length - 1}
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-40"
          >
            下一步 →
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={stepIdx}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.2 }}
          className="mb-2 flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3"
        >
          <span className="text-2xl">{step.emoji}</span>
          <span className="text-sm font-medium text-blue-900">
            指令 {stepIdx + 1}：{step.desc}
          </span>
        </motion.div>
      </AnimatePresence>

      <CodeBlock code={SYNC_CODE} highlightLines={step.lines} />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Demo 4：你的第一个语言学小工具 —— 实时数词器
   ──────────────────────────────────────────────────────────────── */

const DEFAULT_TEXT =
  '这学期我学了很多东西。老师讲了统计方法，我们也了解了语料库的用法。虽然一开始什么都不会，但现在我已经可以自己分析数据了。';

function LiveCounterDemo() {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [target, setTarget] = useState('了');

  const { count, parts } = useMemo(() => {
    if (!target) return { count: 0, parts: [text] };
    const pieces = text.split(target);
    return { count: pieces.length - 1, parts: pieces };
  }, [text, target]);

  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold text-slate-500">🛠️ 我要数：</span>
        <input
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          maxLength={6}
          className="w-24 rounded-lg border border-slate-300 px-3 py-1.5 text-center font-medium text-slate-800 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
        <div className="ml-auto flex items-baseline gap-2 rounded-xl bg-emerald-50 px-4 py-2">
          <span className="text-xs text-emerald-600">出现次数</span>
          <motion.span
            key={count}
            initial={{ scale: 1.4 }}
            animate={{ scale: 1 }}
            className="font-mono text-2xl font-bold text-emerald-600"
          >
            {count}
          </motion.span>
        </div>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        className="w-full rounded-xl border border-slate-300 p-3 text-sm leading-relaxed text-slate-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
      />

      <div className="mt-3 rounded-xl bg-slate-50 p-4 text-sm leading-loose text-slate-700 whitespace-pre-wrap">
        {parts.map((piece, i) => (
          <span key={i}>
            {piece}
            {i < parts.length - 1 && (
              <mark className="rounded bg-emerald-200 px-0.5 font-semibold text-emerald-900">
                {target}
              </mark>
            )}
          </span>
        ))}
      </div>

      <p className="mt-3 text-xs text-slate-400">
        💡 试着把“了”改成“的”“我”“数据”，或者把上面的文字换成你自己的语料。
      </p>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   语言学实战场景卡片
   ──────────────────────────────────────────────────────────────── */

const SCENARIOS = [
  { emoji: '📊', title: '词频与搭配', desc: '“留学生最爱用哪些连词？”——几十万词的语料，几秒出结果' },
  { emoji: '🧹', title: '语料清洗', desc: '删掉网页标签、统一标点、去重——脏活累活全交给电脑' },
  { emoji: '📋', title: '问卷分析', desc: '300 份 Likert 量表问卷，自动算分、画图、跑检验' },
  { emoji: '⏱️', title: '实验数据', desc: '反应时间实验的上千条记录，一键剔除异常值、算平均' },
  { emoji: '📈', title: '统计检验', desc: 't 检验、卡方、回归、混合效应模型——本教材后面全会教' },
  { emoji: '🎨', title: '论文配图', desc: '期刊级别的图表，代码一跑就出，改数据不用重画' },
];

function ScenarioCards() {
  return (
    <div className="my-6 grid gap-3 sm:grid-cols-2">
      {SCENARIOS.map((s) => (
        <motion.div
          key={s.title}
          whileHover={{ y: -3 }}
          className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="mb-1 flex items-center gap-2">
            <span className="text-2xl">{s.emoji}</span>
            <span className="font-semibold text-slate-800">{s.title}</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-500">{s.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   疑虑粉碎机 FAQ
   ──────────────────────────────────────────────────────────────── */

const FAQS = [
  {
    q: '😰 我数学不好，能学吗？',
    a: '能。写代码更像“把任务拆成步骤说清楚”，和你写论文提纲用的是同一种能力。真正的数学（统计）我们会用动画一点点讲，需要算的部分电脑替你算。',
  },
  {
    q: '🤯 我一行代码都没写过……',
    a: '这本教材就是为你写的。每个概念都先讲故事、看动画，理解了“在做什么”，再看代码“怎么写”。没有任何前置知识要求。',
  },
  {
    q: '🤖 有 ChatGPT / AI 了，还要自己学吗？',
    a: '更要学。AI 可以帮你写代码，但你得看得懂它写的对不对——数据是你的、研究是你的，判断只能你来做。会一点 Python 的人用 AI，效率是完全不会的人的十倍。',
  },
  {
    q: '💥 我会不会把电脑搞坏？',
    a: '不会。运行 Python 代码就像在计算器上按按钮，最坏的结果是程序报错停下来——报错信息还会告诉你哪里出了问题。放心大胆地试。',
  },
];

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="my-6 space-y-2">
      {FAQS.map((faq, i) => (
        <div key={i} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <span>{faq.q}</span>
            <motion.span animate={{ rotate: open === i ? 180 : 0 }} className="text-slate-400">
              ▾
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p className="border-t border-slate-100 px-4 py-3 text-sm leading-relaxed text-slate-600">
                  {faq.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   练习 1：哪些任务适合交给电脑？（点选 + 判分）
   ──────────────────────────────────────────────────────────────── */

const TASKS = [
  { emoji: '📚', text: '数出 1000 篇作文里“被”字句的数量', suitable: true, why: '规则明确、重复量大——电脑的主场' },
  { emoji: '🎭', text: '判断一首诗写得美不美', suitable: false, why: '“美”没有精确标准，需要人的审美判断' },
  { emoji: '🎙️', text: '把 200 个录音文件按被试编号重命名', suitable: true, why: '机械重复的操作，写 5 行代码一秒搞定' },
  { emoji: '🔍', text: '决定毕业论文研究什么问题', suitable: false, why: '研究品味和学术判断，只能靠你自己' },
  { emoji: '📊', text: '算出 300 份问卷每道题的平均分', suitable: true, why: '纯计算任务，电脑又快又不会算错' },
];

function TaskQuiz() {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [checked, setChecked] = useState(false);

  const toggle = (i: number) => {
    if (checked) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const allCorrect =
    checked && TASKS.every((t, i) => t.suitable === selected.has(i));

  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="mb-3 text-sm text-slate-600">
        点选你认为<strong>适合交给电脑</strong>的任务，然后检查答案：
      </p>
      <div className="space-y-2">
        {TASKS.map((task, i) => {
          const isSelected = selected.has(i);
          const correct = task.suitable === isSelected;
          return (
            <button
              key={i}
              onClick={() => toggle(i)}
              className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left text-sm transition-all ${
                checked
                  ? correct
                    ? 'border-emerald-300 bg-emerald-50'
                    : 'border-rose-300 bg-rose-50'
                  : isSelected
                    ? 'border-blue-400 bg-blue-50 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <span className="text-xl">{task.emoji}</span>
              <span className="flex-1">
                <span className="font-medium text-slate-700">{task.text}</span>
                {checked && (
                  <span className={`mt-1 block text-xs ${correct ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {task.suitable ? '✅ 适合电脑' : '🙅 需要人'} —— {task.why}
                  </span>
                )}
              </span>
              {!checked && (
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${
                    isSelected ? 'border-blue-500 bg-blue-500 text-white' : 'border-slate-300'
                  }`}
                >
                  {isSelected ? '✓' : ''}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={() => {
            if (checked) {
              setChecked(false);
              setSelected(new Set());
            } else {
              setChecked(true);
            }
          }}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          {checked ? '↺ 再做一次' : '检查答案'}
        </button>
        {allCorrect && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-sm font-medium text-emerald-600"
          >
            🎉 全对！你已经掌握了“人机分工”的直觉
          </motion.span>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   可展开的参考答案
   ──────────────────────────────────────────────────────────────── */

function Answer({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <div className="mt-3">
      <button
        onClick={() => setShow((s) => !s)}
        className="text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        {show ? '▾ 收起参考答案' : '▸ 查看参考答案'}
      </button>
      <AnimatePresence initial={false}>
        {show && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-2 rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm leading-relaxed text-blue-900">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   小节标题
   ──────────────────────────────────────────────────────────────── */

function SectionTitle({ num, children }: { num: number; children: React.ReactNode }) {
  return (
    <h2 className="mt-14 mb-4 flex items-center gap-3 text-2xl font-bold text-slate-800">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-base font-bold text-white">
        {num}
      </span>
      {children}
    </h2>
  );
}

/* ────────────────────────────────────────────────────────────────
   章节主体
   ──────────────────────────────────────────────────────────────── */

export default function Section() {
  return (
    <div className="pb-8">
      {/* ── 标题 ── */}
      <h1 className="mb-2 text-3xl font-bold text-slate-900">为什么要学编程</h1>
      <p className="mb-8 text-slate-500">
        在装任何软件、写任何代码之前，先花 10 分钟搞清楚一件事：编程到底能帮你做什么。
      </p>

      {/* ── 1. 开场故事 ── */}
      <SectionTitle num={1}>小雅的 500 篇作文</SectionTitle>
      <div className="space-y-3 leading-relaxed text-slate-700">
        <p>
          小雅是一名语言学研究生。周五下午，导师发来消息：
        </p>
        <div className="rounded-2xl rounded-tl-sm border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-700">
            💬 “小雅，语料库里那 <strong>500 篇留学生作文</strong>
            ，你统计一下每篇用了多少次‘把’字句，下周组会要用。”
          </p>
        </div>
        <p>
          小雅打开第一篇作文，逐句找“把”字句、拿本子记数——一篇花了 10 分钟。她算了一下：500
          篇就是 <strong>5000 分钟，83 个小时</strong>。就算每天数 8 小时，也要数十天半。
        </p>
        <p>而她的师兄写了 6 行 Python 代码，按下回车，去接了杯水——回来时已经数完了。</p>
      </div>

      <RaceDemo />

      <p className="leading-relaxed text-slate-700">
        这就是你要学编程的第一个理由：把<strong>机械重复的劳动</strong>
        交给电脑，把省下来的时间花在真正需要你的地方——提出好问题、解读结果、写出论文。
      </p>

      {/* ── 2. 概念可视化 ── */}
      <SectionTitle num={2}>电脑不聪明，只是快</SectionTitle>
      <div className="space-y-3 leading-relaxed text-slate-700">
        <p>
          看到上面的比赛，你可能觉得电脑很“聪明”。恰恰相反——
          <strong>电脑是个完全不会变通的助手</strong>：你说什么它做什么，一个字都不多想。
        </p>
        <p>
          它唯一的超能力是<strong>快</strong>，而且<strong>永远不累、永远不错</strong>
          。所以关键在于：你得把任务拆成它能执行的、清清楚楚的小步骤。
        </p>
        <p>
          来看看它是怎么工作的。下面这个机器人叫<strong>小机</strong>
          ，它数“了”的方法笨得可爱：一个字一个字地看，看到“了”就在计数器上 +1。
        </p>
      </div>

      <RobotStepDemo />

      <div className="my-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-800">
        ⭐ <strong>这就是编程的全部秘密：</strong>
        把一个任务，拆成一串电脑能执行的精确小步骤。这串步骤写下来，就叫<strong>程序</strong>
        ；用来写它的语言（比如 Python），就叫<strong>编程语言</strong>。
      </div>

      {/* ── 3. 代码对照 ── */}
      <SectionTitle num={3}>把步骤翻译成 Python</SectionTitle>
      <p className="mb-2 leading-relaxed text-slate-700">
        小机刚才执行的每一步，都能翻译成一行 Python。先别管语法细节（后面会慢慢学），只要看出
        <strong>“步骤”和“代码”是一一对应的</strong>就够了。
      </p>

      <CodeSyncDemo />

      <p className="leading-relaxed text-slate-700">
        更妙的是，“数某个东西出现几次”这种事太常见了，Python 早就替你打包好了——上面 6
        行可以缩成 1 行：
      </p>

      <CodeBlock
        code={`text = "他吃了饭，喝了茶，把作业写完了。"
print(text.count("了"))   # 结果：3`}
      />

      <p className="leading-relaxed text-slate-700">
        这也是 Python 适合研究者的原因：<strong>大量现成的工具</strong>
        ，很多任务只需要几行代码把工具组合起来。
      </p>

      {/* ── 4. 交互式演示 ── */}
      <SectionTitle num={4}>亲手试试：你的第一个语言学工具</SectionTitle>
      <p className="mb-2 leading-relaxed text-slate-700">
        下面就是一个“数词小工具”——它背后的逻辑和你刚看到的代码一模一样。改改要数的词、换换文本，感受一下“程序替你干活”是什么体验。
      </p>

      <LiveCounterDemo />

      <div className="my-4 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-relaxed text-blue-900">
        🔬 <strong>发现问题了吗？</strong>数“了”的时候，“<strong>了解</strong>”里的“了”也被算进去了——
        但它读 liǎo，根本不是完成体的“了”。电脑很死板，你喂它什么规则，它就执行什么规则。
        怎么让电脑“懂一点语言学”？这正是后面<strong>分词、正则表达式</strong>等章节要解决的问题。
      </div>

      {/* ── 5. 语言学实战 ── */}
      <SectionTitle num={5}>编程能帮语言学研究做什么</SectionTitle>
      <p className="leading-relaxed text-slate-700">
        数“把”字句只是开胃菜。学完这本教材，下面这些事你都能自己搞定：
      </p>

      <ScenarioCards />

      <p className="leading-relaxed text-slate-700">
        注意一个共同点：这些任务里<strong>提问和解读永远是你的工作</strong>
        ，电脑只负责中间那段又快又枯燥的计算。学编程不是转行当程序员，而是给自己配一个不知疲倦的研究助理。
      </p>

      {/* ── FAQ ── */}
      <SectionTitle num={6}>你可能在想……</SectionTitle>
      <FaqAccordion />

      {/* ── 练习 ── */}
      <SectionTitle num={7}>练习</SectionTitle>

      <div className="space-y-8">
        <div>
          <h3 className="mb-2 font-semibold text-slate-800">练习 1：人机分工</h3>
          <TaskQuiz />
        </div>

        <div>
          <h3 className="mb-2 font-semibold text-slate-800">练习 2：像电脑一样思考</h3>
          <p className="text-sm leading-relaxed text-slate-600">
            假设小机完全不懂“泡茶”，把“泡一杯茶”拆成它能执行的精确步骤（提示：参考它数“了”的方式——每一步都不能有歧义）。
          </p>
          <Answer>
            一种可行的拆法：① 拿一个空杯子 → ② 放入 1 个茶包 → ③ 往杯中倒入 300 毫升热水 → ④
            等待 3 分钟 → ⑤ 取出茶包。要点：每一步都<strong>具体、无歧义、可执行</strong>
            ——“适量热水”“泡一会儿”这种模糊说法，电脑无法执行。
          </Answer>
        </div>

        <div>
          <h3 className="mb-2 font-semibold text-slate-800">练习 3：算一笔时间账</h3>
          <p className="text-sm leading-relaxed text-slate-600">
            你要统计 2000 条微博里“绝绝子”出现的次数。手动看一条要 15 秒；写代码要 30
            分钟（初学者速度），代码运行只要 1 秒。哪种方式更快？快多少？
          </p>
          <Answer>
            手动：2000 × 15 秒 = 30000 秒 ≈ <strong>8.3 小时</strong>。编程：30 分钟 + 1 秒 ≈{' '}
            <strong>0.5 小时</strong>。编程快了约 16 倍。而且如果下个月数据涨到 2 万条，代码改个文件名再跑一次就行——手动就得再花
            83 小时。
          </Answer>
        </div>

        <div>
          <h3 className="mb-2 font-semibold text-slate-800">练习 4：找出电脑的“死板”</h3>
          <p className="text-sm leading-relaxed text-slate-600">
            回到第 4 节的数词小工具，把要数的词改成“的”，观察高亮结果：哪些“的”其实是你不想数的？（想想“的确”“目的”这类词）
          </p>
          <Answer>
            “<strong>目的</strong>”“<strong>的确</strong>”“<strong>的士</strong>
            ”里的“的”都会被数进去，但它们不是结构助词“的”。电脑只认字符、不认语法——想数得更准，需要
            <strong>分词</strong>和<strong>词性标注</strong>，这些在语料分析单元都会学到。
          </Answer>
        </div>
      </div>

      {/* ── 收尾 ── */}
      <div className="mt-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg">
        <h3 className="mb-2 text-lg font-bold">🎒 本节带走三句话</h3>
        <ul className="space-y-1.5 text-sm leading-relaxed text-blue-50">
          <li>① 电脑不聪明，只是<strong>快、不累、不出错</strong>——机械重复的活儿都该交给它。</li>
          <li>② 编程 = 把任务拆成<strong>精确的小步骤</strong>，再用 Python 写下来。</li>
          <li>③ 提问和解读永远属于你，电脑只是你的<strong>研究助理</strong>。</li>
        </ul>
        <p className="mt-4 text-sm text-blue-100">
          下一节，我们就把这位“研究助理”请进你的电脑——搭建 Python 环境。
        </p>
      </div>
    </div>
  );
}
