import { useState, useEffect, useRef, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CodeBlock from '../../components/shared/CodeBlock';

/* ============================================================
   逐帧滚动容器（scroll-snap deck）
   每次下滑吸附到下一帧；右侧进度点 + 底部下一帧按钮 + 首帧滑动提示
   ============================================================ */
function FrameDeck({ frames }: { frames: ReactNode[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const count = frames.length;

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let raf = 0;
    const measure = () => {
      const center = el.scrollTop + el.clientHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < count; i++) {
        const f = el.querySelector<HTMLElement>(`[data-index="${i}"]`);
        if (!f) continue;
        const fCenter = f.offsetTop + f.offsetHeight / 2;
        const d = Math.abs(fCenter - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }
      setActive(best);
      setScrolled(el.scrollTop > 16);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [count]);

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(count - 1, i));
    const f = el.querySelector<HTMLElement>(`[data-index="${clamped}"]`);
    if (f) el.scrollTo({ top: f.offsetTop, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        tabIndex={0}
        className="relative h-[calc(100dvh-7rem)] min-h-[30rem] overflow-y-auto overflow-x-hidden
          snap-y snap-mandatory scroll-smooth rounded-3xl border border-slate-200/70
          bg-gradient-to-b from-slate-50 to-white shadow-paper outline-none
          [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {frames.map((frame, i) => (
          <section
            key={i}
            data-index={i}
            className="snap-start snap-always flex min-h-full w-full flex-col items-center justify-center
              px-5 py-10 sm:px-10"
          >
            <div className="w-full max-w-xl">{frame}</div>
          </section>
        ))}
      </div>

      {/* 帧计数 pill */}
      <div className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-white/80 px-2.5 py-1
        text-xs font-mono font-medium text-slate-500 backdrop-blur">
        {active + 1} / {count}
      </div>

      {/* 右侧进度点 */}
      <div className="absolute right-2 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-2 lg:right-3">
        {frames.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`第 ${i + 1} 帧`}
            className={`rounded-full transition-all duration-300 ${
              i === active
                ? 'h-2.5 w-2.5 bg-blue-500'
                : 'h-2 w-2 bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>

      {/* 底部下一帧按钮 */}
      <AnimatePresence>
        {active < count - 1 && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            onClick={() => goTo(active + 1)}
            aria-label="下一帧"
            className="absolute bottom-4 left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center
              rounded-full border border-slate-200 bg-white/85 text-slate-500 shadow-paper backdrop-blur
              hover:text-blue-600"
          >
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              className="text-lg leading-none"
            >
              ↓
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 首帧滑动提示 */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute bottom-16 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap
              text-xs font-medium tracking-wide text-slate-400"
          >
            向下滑动，一帧一帧看
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* 通用小部件 ---------------------------------------------------------- */

// 帧标题
function FrameTitle({ children, kicker }: { children: ReactNode; kicker?: string }) {
  return (
    <div className="mb-5 text-center">
      {kicker && (
        <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-500">{kicker}</div>
      )}
      <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{children}</h2>
    </div>
  );
}

// 一行说明
function Lead({ children }: { children: ReactNode }) {
  return <p className="text-center text-base leading-relaxed text-slate-600">{children}</p>;
}

// 文件面板（带文件名标签）
function FileBox({
  name,
  children,
  tone = 'slate',
}: {
  name: string;
  children: ReactNode;
  tone?: 'slate' | 'emerald' | 'rose';
}) {
  const bar =
    tone === 'emerald'
      ? 'bg-emerald-100 text-emerald-700'
      : tone === 'rose'
      ? 'bg-rose-100 text-rose-700'
      : 'bg-slate-100 text-slate-500';
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-paper">
      <div className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono ${bar}`}>
        <span>📄</span>
        <span>{name}</span>
      </div>
      <div className="p-4 font-mono text-sm leading-relaxed text-slate-700">{children}</div>
    </div>
  );
}

/* ==========================================================
   帧 3：一行一行读（逐个高亮动画）
   ========================================================== */
function LineByLineDemo() {
  const lines = ['今天 天气 不错', '我们 一起 学 Python', '文件 读写 很 简单'];
  const [cur, setCur] = useState(-1);
  const [playing, setPlaying] = useState(false);

  const reset = () => {
    setCur(-1);
    setPlaying(false);
  };

  const play = () => {
    reset();
    setPlaying(true);
    let i = 0;
    const timer = setInterval(() => {
      if (i < lines.length) {
        setCur(i);
        i++;
      } else {
        clearInterval(timer);
        setPlaying(false);
      }
    }, 1000);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/60 p-4">
      <FileBox name="corpus.txt">
        <div className="space-y-1.5">
          {lines.map((line, i) => {
            const done = i < cur;
            const isCur = i === cur;
            return (
              <motion.div
                key={i}
                animate={{
                  opacity: cur === -1 ? 1 : done ? 0.35 : isCur ? 1 : 0.6,
                  x: isCur ? 6 : 0,
                }}
                className={`flex items-center gap-2 rounded-md px-2 py-1 ${
                  isCur ? 'bg-blue-50 font-semibold text-blue-700' : ''
                }`}
              >
                <span className="text-xs text-slate-400">{isCur ? '👉' : done ? '✅' : '·'}</span>
                <span>{line}</span>
              </motion.div>
            );
          })}
        </div>
      </FileBox>

      <div className="mt-3 flex items-center justify-center gap-2">
        <button
          onClick={play}
          disabled={playing}
          className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-40"
        >
          ▶ 开始读
        </button>
        <button
          onClick={reset}
          className="rounded-lg border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          ↺ 重来
        </button>
      </div>
    </div>
  );
}

/* ==========================================================
   帧 4：with 自动关门（开关切换）
   ========================================================== */
function WithDoorDemo() {
  const [inside, setInside] = useState(true);
  // 在 with 块内 = 门开着可以读；离开 with = 门自动关上
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/60 p-5">
      <div className="flex items-center justify-center gap-6">
        <motion.div
          animate={{ rotateY: inside ? 0 : 72 }}
          transition={{ duration: 0.5 }}
          style={{ transformOrigin: 'left center' }}
          className={`flex h-28 w-20 flex-col items-center justify-center rounded-lg border-2 text-3xl ${
            inside ? 'border-emerald-300 bg-emerald-50' : 'border-slate-300 bg-slate-100'
          }`}
        >
          {inside ? '🔓' : '🔒'}
        </motion.div>
        <div className="text-left text-sm">
          <div className={`font-semibold ${inside ? 'text-emerald-600' : 'text-slate-500'}`}>
            {inside ? '在 with 里：门开着' : '离开 with：门自动关上'}
          </div>
          <div className="mt-1 text-slate-500">
            {inside ? '可以读、可以写' : '文件已安全关闭 ✅'}
          </div>
        </div>
      </div>

      <button
        onClick={() => setInside((v) => !v)}
        className="mx-auto mt-4 block rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
      >
        {inside ? '走出 with 块' : '再进 with 块'}
      </button>
    </div>
  );
}

/* ==========================================================
   帧 5：encoding=utf-8 乱码切换
   ========================================================== */
function EncodingDemo() {
  const [utf8, setUtf8] = useState(true);
  const clean = ['你好，世界', '语言学 linguistics', '音标 [aɪ pʰ]'];
  const garbled = ['ä½ å¥½ï¼Œä¸–ç•Œ', 'è¯­è¨€å­¦ linguistics', 'éŸ³æ ‡ [aÉª pÊ°]'];
  const show = utf8 ? clean : garbled;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/60 p-4">
      <FileBox name="corpus.txt" tone={utf8 ? 'emerald' : 'rose'}>
        <div className="space-y-1.5">
          {show.map((line, i) => (
            <AnimatePresence mode="wait" key={i}>
              <motion.div
                key={line}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className={utf8 ? 'text-slate-700' : 'text-rose-500'}
              >
                {line}
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
      </FileBox>

      <div className="mt-4 flex items-center justify-center gap-3">
        <span className={`text-sm font-mono ${utf8 ? 'text-slate-400' : 'text-rose-500'}`}>关</span>
        <button
          onClick={() => setUtf8((v) => !v)}
          aria-label="切换 utf-8"
          className={`relative h-7 w-14 rounded-full transition-colors ${
            utf8 ? 'bg-emerald-500' : 'bg-slate-300'
          }`}
        >
          <motion.span
            layout
            className="absolute top-0.5 h-6 w-6 rounded-full bg-white shadow"
            animate={{ left: utf8 ? 30 : 2 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </button>
        <span className={`text-sm font-mono ${utf8 ? 'text-emerald-600' : 'text-slate-400'}`}>
          encoding=&quot;utf-8&quot;
        </span>
      </div>
    </div>
  );
}

/* ==========================================================
   帧 6：写文件 w vs a
   ========================================================== */
function WriteModeDemo() {
  const [mode, setMode] = useState<'w' | 'a'>('a');
  const [content, setContent] = useState<string[]>([]);
  const [n, setN] = useState(1);

  const write = () => {
    const line = `结果 #${n}`;
    setN((v) => v + 1);
    setContent((prev) => (mode === 'w' ? [line] : [...prev, line]));
  };
  const clear = () => {
    setContent([]);
    setN(1);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/60 p-4">
      <div className="mb-3 flex items-center justify-center gap-2">
        {(['w', 'a'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`rounded-lg px-3 py-1.5 text-sm font-mono transition-colors ${
              mode === m
                ? m === 'w'
                  ? 'bg-rose-500 text-white'
                  : 'bg-emerald-500 text-white'
                : 'border border-slate-200 text-slate-500 hover:bg-slate-100'
            }`}
          >
            &quot;{m}&quot; {m === 'w' ? '覆盖' : '追加'}
          </button>
        ))}
      </div>

      <FileBox name="out.txt" tone={mode === 'w' ? 'rose' : 'emerald'}>
        <div className="min-h-[4.5rem] space-y-1">
          <AnimatePresence initial={false}>
            {content.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-300">
                （空文件）
              </motion.div>
            )}
            {content.map((line) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-slate-700"
              >
                {line}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </FileBox>

      <div className="mt-3 flex items-center justify-center gap-2">
        <button
          onClick={write}
          className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          写入一行
        </button>
        <button
          onClick={clear}
          className="rounded-lg border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          ↺ 清空
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-slate-500">
        {mode === 'w' ? '每次写入都先清空，只剩最后一行' : '每次写入都接在后面，逐行累积'}
      </p>
    </div>
  );
}

/* ==========================================================
   帧 7：实战流水线 读→算→写
   ========================================================== */
function PipelineDemo() {
  const inputLines = ['The cat sat', 'on the mat', 'cats and dogs'];
  const [stage, setStage] = useState(0); // 0 idle,1 read,2 count,3 write
  const words = inputLines.reduce((s, l) => s + l.split(' ').length, 0);

  const run = () => {
    setStage(1);
    setTimeout(() => setStage(2), 900);
    setTimeout(() => setStage(3), 1800);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/60 p-4">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <FileBox name="corpus.txt">
          <div className="space-y-0.5 text-xs">
            {inputLines.map((l, i) => (
              <div key={i} className={stage >= 1 ? 'text-slate-700' : 'text-slate-300'}>
                {l}
              </div>
            ))}
          </div>
        </FileBox>

        <div className="flex flex-col items-center text-slate-400">
          <motion.div
            animate={{ x: stage >= 2 ? [0, 6, 0] : 0 }}
            transition={{ duration: 0.6, repeat: stage === 2 ? Infinity : 0 }}
            className="text-xl"
          >
            →
          </motion.div>
          <div className="mt-1 text-center text-[10px] leading-tight">
            {stage >= 2 ? `${inputLines.length} 行` : '算'}
            <br />
            {stage >= 2 ? `${words} 词` : ''}
          </div>
        </div>

        <FileBox name="report.txt" tone={stage >= 3 ? 'emerald' : 'slate'}>
          <div className="text-xs">
            {stage >= 3 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-700">
                共 {inputLines.length} 行，{words} 个词
              </motion.div>
            ) : (
              <span className="text-slate-300">（等待输出）</span>
            )}
          </div>
        </FileBox>
      </div>

      <button
        onClick={run}
        className="mx-auto mt-4 block rounded-lg bg-blue-600 px-5 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
      >
        ▶ 跑一遍
      </button>
    </div>
  );
}

/* ==========================================================
   章节主体：把所有帧串起来
   ========================================================== */
export default function Section() {
  const frames: ReactNode[] = [
    // 帧 0 — 开场
    <div key="hook" className="text-center">
      <motion.div
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex items-center justify-center gap-3 text-5xl"
      >
        <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 2.4, repeat: Infinity }}>
          📄
        </motion.span>
        <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 2.4, repeat: Infinity, delay: 0.4 }}>
          📊
        </motion.span>
      </motion.div>
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">你的数据，住在文件里</h1>
      <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-slate-600">
        语料、问卷、转写……都躺在一个个文件里。
        <br />
        这一节，教 Python 把它们<strong className="text-blue-600">打开、读出来、再存回去</strong>。
      </p>
    </div>,

    // 帧 1 — 隐喻：文件 = 盒子
    <div key="metaphor">
      <FrameTitle kicker="先打个比方">文件就是一个盒子</FrameTitle>
      <div className="mx-auto flex max-w-sm items-center justify-center gap-4">
        <div className="text-6xl">📦</div>
        <div className="text-left text-sm text-slate-600">
          <div>盒子外面 → <strong className="text-slate-800">文件名</strong>（corpus.txt）</div>
          <div className="mt-1">盒子里面 → <strong className="text-slate-800">一行行文字</strong></div>
        </div>
      </div>
      <Lead>
        <span className="mt-5 block">Python 要做的，就是打开盒子、看里面。</span>
      </Lead>
    </div>,

    // 帧 2 — open + read
    <div key="open">
      <FrameTitle kicker="第一步">open() 打开，read() 取出</FrameTitle>
      <CodeBlock
        showLineNumbers={false}
        code={`f = open("corpus.txt")   # 打开盒子
text = f.read()          # 里面的字，全部取出
f.close()                # 关上盒子`}
      />
      <Lead>
        <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm">.read()</code> 把整份内容变成一个大字符串。
      </Lead>
    </div>,

    // 帧 3 — 一行一行读
    <div key="lines">
      <FrameTitle kicker="更常用">一行一行地读</FrameTitle>
      <p className="mb-3 text-center text-sm text-slate-500">
        语料常常很大，我们用 <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono">for line in f</code> 逐行处理。
      </p>
      <LineByLineDemo />
    </div>,

    // 帧 4 — with 自动关门
    <div key="with">
      <FrameTitle kicker="好习惯">with：读完自动关门</FrameTitle>
      <CodeBlock
        showLineNumbers={false}
        code={`with open("corpus.txt") as f:
    text = f.read()
# 一出这段，文件自动关闭，不用手动 close()`}
      />
      <WithDoorDemo />
      <Lead>
        <span className="mt-4 block">以后打开文件，<strong className="text-blue-600">一律用 with</strong>。</span>
      </Lead>
    </div>,

    // 帧 5 — encoding utf-8
    <div key="encoding">
      <FrameTitle kicker="中文 / 日文 / 音标必看">乱码？加 encoding=&quot;utf-8&quot;</FrameTitle>
      <EncodingDemo />
      <CodeBlock
        showLineNumbers={false}
        code={`open("corpus.txt", encoding="utf-8")`}
      />
      <Lead>处理中文、日文、IPA 音标，永远记得加这一句。</Lead>
    </div>,

    // 帧 6 — 写文件 w vs a
    <div key="write">
      <FrameTitle kicker="把结果存回去">写文件：&quot;w&quot; 还是 &quot;a&quot;？</FrameTitle>
      <WriteModeDemo />
      <p className="mt-3 text-center text-sm">
        <span className="font-mono text-rose-500">&quot;w&quot;</span> 会先清空整份文件，
        <span className="font-mono text-emerald-600">&quot;a&quot;</span> 才是追加。
      </p>
    </div>,

    // 帧 7 — 实战
    <div key="pipeline">
      <FrameTitle kicker="串起来">读 → 算 → 写</FrameTitle>
      <PipelineDemo />
      <CodeBlock
        showLineNumbers={false}
        code={`with open("corpus.txt", encoding="utf-8") as f:
    lines = f.readlines()

total = sum(len(l.split()) for l in lines)

with open("report.txt", "w", encoding="utf-8") as f:
    f.write(f"共 {len(lines)} 行，{total} 个词")`}
      />
    </div>,

    // 帧 8 — 小抄 + 练习
    <div key="cheatsheet">
      <FrameTitle kicker="记住这张小抄">你已经会读写文件了 🎉</FrameTitle>
      <CodeBlock
        showLineNumbers={false}
        code={`# 读
with open("file.txt", encoding="utf-8") as f:
    for line in f:
        ...

# 写
with open("out.txt", "w", encoding="utf-8") as f:
    f.write(text)`}
      />
      <div className="mt-4 rounded-xl border border-slate-200 bg-white/60 p-4">
        <div className="mb-2 text-sm font-semibold text-slate-700">✍️ 练一练</div>
        <ol className="space-y-1.5 pl-5 text-sm text-slate-600">
          <li className="list-decimal">打开 <code className="rounded bg-slate-100 px-1 font-mono">data.txt</code>，打印每一行。</li>
          <li className="list-decimal">中文文件出现乱码，一句话修好它。</li>
          <li className="list-decimal">把 10 个词写进 <code className="rounded bg-slate-100 px-1 font-mono">words.txt</code>，每行一个。</li>
        </ol>
      </div>
    </div>,
  ];

  return <FrameDeck frames={frames} />;
}
