import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CodeBlock from '../../components/shared/CodeBlock';
import StepThrough from '../../components/shared/StepThrough';

/* ============================================================
   开场比喻：书架（列表） vs 通讯录（字典）
   ============================================================ */
function OpeningMetaphor() {
  return (
    <div className="grid md:grid-cols-2 gap-4 my-6">
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border-2 border-blue-300 bg-blue-50 p-5"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">📚</span>
          <span className="font-semibold text-blue-800">书架 = 列表 list</span>
        </div>
        <div className="flex gap-1.5 mb-3">
          {['0', '1', '2', '3', '4'].map((n, i) => (
            <motion.div
              key={n}
              initial={{ height: 0 }}
              animate={{ height: 52 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="flex-1 rounded-md bg-gradient-to-b from-blue-400 to-blue-600 flex items-end justify-center pb-1 text-white text-xs font-mono"
            >
              {n}
            </motion.div>
          ))}
        </div>
        <p className="text-blue-700 text-sm">
          书一本挨一本，靠<strong>位置</strong>（第几本）来找。第 1 本、第 2 本……顺序很重要。
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-5"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">📇</span>
          <span className="font-semibold text-emerald-800">通讯录 = 字典 dict</span>
        </div>
        <div className="space-y-1.5 mb-3">
          {[
            ['小明', '138…'],
            ['小红', '159…'],
          ].map(([name, num], i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.12 }}
              className="flex items-center gap-2 text-sm"
            >
              <span className="px-2 py-0.5 rounded bg-emerald-500 text-white font-mono text-xs">{name}</span>
              <span className="text-emerald-400">→</span>
              <span className="px-2 py-0.5 rounded bg-white border border-emerald-200 font-mono text-xs text-emerald-700">{num}</span>
            </motion.div>
          ))}
        </div>
        <p className="text-emerald-700 text-sm">
          没有"第几个"，靠<strong>名字</strong>来查。报出名字，立刻得到号码。
        </p>
      </motion.div>
    </div>
  );
}

/* ============================================================
   列表操场：可视化 append / insert / remove / sort
   ============================================================ */
type Op = { label: string; code: string; run: (a: number[]) => number[] };

function ListPlayground() {
  const initial = [12, 8, 15, 6];
  const [items, setItems] = useState<number[]>(initial);
  const [lastCode, setLastCode] = useState('lengths = [12, 8, 15, 6]');

  const ops: Op[] = [
    { label: '.append(22)', code: 'lengths.append(22)', run: (a) => [...a, 22] },
    { label: '.insert(1, 99)', code: 'lengths.insert(1, 99)', run: (a) => [a[0], 99, ...a.slice(1)] },
    { label: '.pop()', code: 'lengths.pop()', run: (a) => a.slice(0, -1) },
    { label: '.sort()', code: 'lengths.sort()', run: (a) => [...a].sort((x, y) => x - y) },
    { label: '.reverse()', code: 'lengths.reverse()', run: (a) => [...a].reverse() },
  ];

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 my-6">
      <p className="text-center text-sm text-slate-500 mb-4">点按钮，看列表怎么变 👇</p>

      <div className="flex flex-wrap gap-2 justify-center min-h-[5rem] items-center mb-4">
        <AnimatePresence mode="popLayout">
          {items.map((v, i) => (
            <motion.div
              key={`${v}-${i}`}
              layout
              initial={{ opacity: 0, scale: 0.5, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 12 }}
              transition={{ duration: 0.28 }}
              className="flex flex-col items-center"
            >
              <span className="text-xs text-slate-400 font-mono mb-1">{i}</span>
              <div className="w-14 h-14 rounded-xl border-2 border-blue-400 bg-white flex items-center justify-center font-mono font-bold text-blue-700">
                {v}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {ops.map((op) => (
          <button
            key={op.label}
            onClick={() => {
              setItems((a) => op.run(a));
              setLastCode(op.code);
            }}
            className="px-3 py-1.5 rounded-lg text-sm font-mono bg-white border border-slate-300 text-slate-700 hover:border-blue-400 hover:bg-blue-50 transition-all"
          >
            {op.label}
          </button>
        ))}
        <button
          onClick={() => {
            setItems(initial);
            setLastCode('lengths = [12, 8, 15, 6]');
          }}
          className="px-3 py-1.5 rounded-lg text-sm bg-slate-200 text-slate-600 hover:bg-slate-300 transition-all"
        >
          ↺ 重置
        </button>
      </div>

      <div className="rounded-lg bg-slate-900 px-4 py-2 text-center">
        <code className="text-sm text-cyan-300 font-mono">{lastCode}</code>
      </div>
    </div>
  );
}

/* ============================================================
   索引 + 切片探索器
   ============================================================ */
function SliceExplorer() {
  const words = ['小明', '把', '苹果', '吃', '了'];
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(4);

  const s = Math.max(0, Math.min(start, words.length));
  const e = Math.max(0, Math.min(end, words.length));
  const result = words.slice(s, e);

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 my-6">
      <p className="text-center text-sm text-slate-500 mb-4">拖动滑块，圈出你想要的那一段 👇</p>

      <div className="flex flex-wrap gap-2 justify-center mb-5">
        {words.map((w, i) => {
          const inSlice = i >= s && i < e;
          return (
            <div key={i} className="flex flex-col items-center">
              <span className="text-xs text-slate-400 font-mono mb-1">{i}</span>
              <motion.div
                animate={{
                  scale: inSlice ? 1.08 : 1,
                }}
                className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center font-mono text-sm font-bold transition-colors duration-300 ${
                  inSlice
                    ? 'border-emerald-500 bg-emerald-100 text-emerald-700 shadow-md'
                    : 'border-slate-200 bg-white text-slate-300'
                }`}
              >
                {w}
              </motion.div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-600">起始</label>
          <input
            type="range"
            min={0}
            max={words.length}
            value={start}
            onChange={(ev) => setStart(Number(ev.target.value))}
            className="w-28 accent-emerald-500"
          />
          <span className="font-mono text-emerald-600 w-5 text-center">{start}</span>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-600">结束</label>
          <input
            type="range"
            min={0}
            max={words.length}
            value={end}
            onChange={(ev) => setEnd(Number(ev.target.value))}
            className="w-28 accent-emerald-500"
          />
          <span className="font-mono text-emerald-600 w-5 text-center">{end}</span>
        </div>
      </div>

      <div className="text-center rounded-xl bg-white border-2 border-slate-200 p-4">
        <div className="font-mono text-sm text-slate-500 mb-1">
          words[{start}:{end}]
        </div>
        <div className="font-mono text-emerald-700 font-semibold text-lg">
          → [{result.map((w) => `"${w}"`).join(', ')}]
        </div>
        <p className="text-xs text-slate-400 mt-2">
          包含起始 <code>{start}</code>，<strong>不包含</strong>结束 <code>{end}</code>
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   字典查找：报名字，得释义
   ============================================================ */
function DictLookup() {
  const entries: [string, number][] = [
    ['把', 128],
    ['被', 95],
    ['对', 42],
    ['连', 17],
  ];
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 my-6">
      <p className="text-center text-sm text-emerald-700 mb-4 font-semibold">
        点一个词，字典立刻告诉你它出现了几次 👇
      </p>

      <div className="flex flex-wrap gap-2 justify-center mb-5">
        {entries.map(([k]) => (
          <button
            key={k}
            onClick={() => setActive(active === k ? null : k)}
            className={`px-5 py-2.5 rounded-xl font-mono text-base border-2 transition-all ${
              active === k
                ? 'bg-emerald-500 text-white border-emerald-500 scale-110 shadow-md'
                : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-400'
            }`}
          >
            "{k}"
          </button>
        ))}
      </div>

      <div className="min-h-[3.5rem] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {active ? (
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-3 font-mono text-lg"
            >
              <span className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white">freq["{active}"]</span>
              <span className="text-emerald-400 text-2xl">→</span>
              <span className="px-4 py-1.5 rounded-lg bg-amber-100 text-amber-800 font-bold text-xl">
                {entries.find(([k]) => k === active)?.[1]}
              </span>
            </motion.div>
          ) : (
            <p className="text-slate-400 text-sm">👆 点上面任意一个词</p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ============================================================
   ⭐ 明星演示：动画词频统计器
   一个词一个词地读，实时建起字典 + 长出柱子
   ============================================================ */
function FrequencyCounter() {
  const sentence = ['猫', '坐', '在', '垫子', '上', '猫', '喝', '水', '猫', '睡觉'];
  const [step, setStep] = useState(-1); // -1 = 未开始；处理完第 step 个词
  const [playing, setPlaying] = useState(false);
  const timer = useRef<number | null>(null);

  // 计算处理到 step 时的词频
  const freq: Record<string, number> = {};
  for (let i = 0; i <= step && i < sentence.length; i++) {
    freq[sentence[i]] = (freq[sentence[i]] || 0) + 1;
  }
  const freqEntries = Object.entries(freq);
  const maxCount = Math.max(1, ...freqEntries.map(([, c]) => c));

  const done = step >= sentence.length - 1;
  const currentWord = step >= 0 && step < sentence.length ? sentence[step] : null;

  useEffect(() => {
    if (!playing) return;
    if (done) {
      setPlaying(false);
      return;
    }
    timer.current = window.setTimeout(() => setStep((s) => s + 1), 850);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [playing, step, done]);

  const reset = () => {
    setPlaying(false);
    setStep(-1);
  };

  return (
    <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-6 my-6">
      {/* 句子：逐词高亮 */}
      <p className="text-center text-sm text-slate-500 mb-3">从左到右，一个词一个词地数</p>
      <div className="flex flex-wrap gap-2 justify-center mb-5">
        {sentence.map((w, i) => {
          const isCurrent = i === step;
          const isDone = i < step;
          return (
            <motion.div
              key={i}
              animate={{
                scale: isCurrent ? 1.25 : 1,
                opacity: isDone ? 0.4 : 1,
              }}
              className={`px-3 py-2 rounded-lg font-mono text-sm border-2 transition-colors duration-200 ${
                isCurrent
                  ? 'border-amber-500 bg-amber-100 text-amber-800 shadow-lg font-bold'
                  : isDone
                  ? 'border-slate-200 bg-slate-100 text-slate-400'
                  : 'border-slate-300 bg-white text-slate-600'
              }`}
            >
              {w}
            </motion.div>
          );
        })}
      </div>

      {/* 当前动作提示 */}
      <div className="text-center min-h-[1.75rem] mb-4">
        <AnimatePresence mode="wait">
          {currentWord ? (
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-mono text-sm text-amber-700"
            >
              freq["{currentWord}"] = freq.get("{currentWord}", 0) + 1
            </motion.p>
          ) : step === -1 ? (
            <p className="text-slate-400 text-sm">按 ▶ 开始统计</p>
          ) : (
            <p className="text-emerald-600 text-sm font-semibold">✓ 数完啦！猫出现最多</p>
          )}
        </AnimatePresence>
      </div>

      {/* 实时柱状图（字典） */}
      <div className="rounded-xl bg-white border border-slate-200 p-4 min-h-[10rem] flex items-end justify-center gap-3">
        {freqEntries.length === 0 ? (
          <span className="text-slate-300 text-sm self-center">字典还是空的 {'{}'}</span>
        ) : (
          <AnimatePresence>
            {freqEntries.map(([word, count]) => (
              <motion.div
                key={word}
                layout
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-end"
              >
                <motion.span
                  key={count}
                  initial={{ scale: 1.6 }}
                  animate={{ scale: 1 }}
                  className="text-sm font-bold text-amber-700 mb-1"
                >
                  {count}
                </motion.span>
                <motion.div
                  layout
                  animate={{ height: 24 + (count / maxCount) * 90 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className={`w-10 rounded-t-lg ${
                    count === maxCount && done
                      ? 'bg-gradient-to-t from-emerald-500 to-emerald-300'
                      : 'bg-gradient-to-t from-blue-500 to-blue-300'
                  }`}
                />
                <span className="mt-1.5 text-xs font-mono text-slate-600">{word}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* 控制按钮 */}
      <div className="flex gap-2 justify-center mt-4">
        <button
          onClick={() => {
            if (done) reset();
            setPlaying((p) => !p);
          }}
          className="px-4 py-1.5 rounded-lg text-sm bg-blue-500 text-white hover:bg-blue-600 transition-all"
        >
          {playing ? '⏸ 暂停' : done ? '↻ 重新播放' : '▶ 播放'}
        </button>
        <button
          onClick={() => setStep((s) => Math.min(s + 1, sentence.length - 1))}
          disabled={playing || done}
          className="px-4 py-1.5 rounded-lg text-sm border border-slate-300 text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-all"
        >
          单步 →
        </button>
        <button
          onClick={reset}
          className="px-4 py-1.5 rounded-lg text-sm bg-slate-200 text-slate-600 hover:bg-slate-300 transition-all"
        >
          ↺ 重置
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   页面主体
   ============================================================ */
export default function Section() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="content-prose"
    >
      {/* ===== 开场 ===== */}
      <h2>一个盒子装不下一整个语料库</h2>
      <p>
        上一节的变量，一个只能装<strong>一个</strong>值。可语言学数据从来都是成群结队的：一句话有好几个词，一份语料有上百个句子，一张词频表有几十个词条。
      </p>
      <p>
        我们需要能<strong>打包一整组数据</strong>的东西。Python 给了你两个最顺手的工具，它们的区别，就像书架和通讯录：
      </p>

      <OpeningMetaphor />

      <p>
        记住这个画面：<strong>要顺序、按位置取，用列表；要按名字查、一步到位，用字典。</strong>下面我们一个个玩明白。
      </p>

      {/* ===== 列表 ===== */}
      <h2>列表：一排带编号的抽屉</h2>
      <p>
        列表用<strong>方括号</strong> <code>[]</code> 装东西，中间用逗号隔开。里面放什么都行——文字、数字、甚至混着放。
      </p>

      <CodeBlock
        code={`# 一句话分词后的词表
words = ["小明", "把", "苹果", "吃", "了"]

# 每个参与者的句子长度
lengths = [12, 8, 15, 6]

# 混着放也没问题
mixed = ["BCC语料库", 2024, True]`}
      />

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
        <h3 className="text-base font-semibold text-amber-800 mb-2">🔑 最重要的一件事：编号从 0 开始</h3>
        <p className="text-amber-700 text-sm">
          第一个抽屉是 <code>words[0]</code>，不是 <code>words[1]</code>！这一点几乎所有初学者都会栽跟头，先记牢：<strong>数数从 0 起步。</strong>
        </p>
      </div>

      <p>列表不是死的，你可以随时往里加、往外拿、重新排。自己动手点点看：</p>

      <ListPlayground />

      <p>刚才那几个按钮，对应的就是这几个最常用的方法：</p>

      <StepThrough
        steps={[
          {
            title: 'len() 数一数',
            content: (
              <div>
                <p>想知道列表里有几个元素，用 <code>len()</code>。</p>
                <CodeBlock
                  code={`words = ["小明", "把", "苹果", "吃", "了"]
print(len(words))   # 5`}
                  highlightLines={[2]}
                />
              </div>
            ),
          },
          {
            title: '.append() 加到末尾',
            content: (
              <div>
                <p>在队伍最后面塞一个新元素。</p>
                <CodeBlock
                  code={`words = ["小明", "把"]
words.append("苹果")
print(words)   # ["小明", "把", "苹果"]`}
                  highlightLines={[2]}
                />
              </div>
            ),
          },
          {
            title: '.insert() 插队',
            content: (
              <div>
                <p><code>.insert(位置, 元素)</code>——在指定编号处插进去，后面的往后挪。</p>
                <CodeBlock
                  code={`words = ["小明", "苹果"]
words.insert(1, "把")
print(words)   # ["小明", "把", "苹果"]`}
                  highlightLines={[2]}
                />
              </div>
            ),
          },
          {
            title: '.pop() / .remove() 拿走',
            content: (
              <div>
                <p><code>.pop()</code> 拿走最后一个；<code>.remove(值)</code> 拿走第一个等于该值的元素。</p>
                <CodeBlock
                  code={`words = ["小明", "吃", "苹果"]
words.pop()          # 拿走 "苹果"
words.remove("吃")   # 拿走 "吃"
print(words)   # ["小明"]`}
                  highlightLines={[2, 3]}
                />
              </div>
            ),
          },
          {
            title: '.sort() 排好队',
            content: (
              <div>
                <p>把列表就地排序，数字从小到大。</p>
                <CodeBlock
                  code={`lengths = [12, 8, 15, 6]
lengths.sort()
print(lengths)   # [6, 8, 12, 15]`}
                  highlightLines={[2]}
                />
              </div>
            ),
          },
          {
            title: 'in 在不在？',
            content: (
              <div>
                <p>用 <code>in</code> 检查某个值在不在列表里，结果是 <code>True</code> 或 <code>False</code>。</p>
                <CodeBlock
                  code={`words = ["小明", "吃", "苹果"]
print("吃" in words)    # True
print("跑" in words)    # False`}
                  highlightLines={[2, 3]}
                />
              </div>
            ),
          },
        ]}
      />

      {/* ===== 切片 ===== */}
      <h2>切片：一刀切下一段</h2>
      <p>
        想一次取好几个连着的元素，用<strong>切片</strong>：<code>列表[起始:结束]</code>。有个坑要记住——<strong>包含起始，不包含结束</strong>。拖滑块感受一下：
      </p>

      <SliceExplorer />

      <CodeBlock
        code={`words = ["小明", "把", "苹果", "吃", "了"]

print(words[0:3])   # ["小明", "把", "苹果"]  取前 3 个
print(words[2:])    # ["苹果", "吃", "了"]     从第 2 个到末尾
print(words[-2:])   # ["吃", "了"]            倒数 2 个`}
      />

      {/* ===== 字典 ===== */}
      <h2>字典：报名字，取数据</h2>
      <p>
        列表靠位置找，但很多时候我们脑子里根本没有"第几个"，只有<strong>名字</strong>：把字出现几次？张三多少岁？这时候字典才顺手。
      </p>

      <DictLookup />

      <p>
        字典用<strong>花括号</strong> <code>{'{}'}</code>，每一条是 <code>键: 值</code>，键就是名字，值就是它对应的数据。
      </p>

      <CodeBlock
        code={`# 介词词频表：键是词，值是次数
freq = {
    "把": 128,
    "被": 95,
    "对": 42,
    "连": 17,
}

# 报出键，取出值
print(freq["把"])   # 128`}
        highlightLines={[9]}
      />

      <StepThrough
        steps={[
          {
            title: '.get() 安全查找',
            content: (
              <div>
                <p>
                  直接用 <code>freq["从"]</code> 查一个不存在的键会<strong>报错崩溃</strong>。用 <code>.get(键, 默认值)</code> 更稳——查不到就返回默认值。
                </p>
                <CodeBlock
                  code={`freq = {"把": 128, "被": 95}
print(freq.get("把", 0))   # 128（有，返回真实值）
print(freq.get("从", 0))   # 0（没有，返回默认值，不报错）`}
                  highlightLines={[2, 3]}
                />
              </div>
            ),
          },
          {
            title: '加 / 改',
            content: (
              <div>
                <p><code>字典[键] = 值</code>——键不存在就是新增，已存在就是覆盖。一个语法，两件事。</p>
                <CodeBlock
                  code={`freq = {"把": 128, "被": 95}
freq["从"] = 73     # 新增一条
freq["把"] = 130    # 改掉旧值
print(freq)   # {"把": 130, "被": 95, "从": 73}`}
                  highlightLines={[2, 3]}
                />
              </div>
            ),
          },
          {
            title: 'del 删掉',
            content: (
              <div>
                <p>用 <code>del 字典[键]</code> 删掉一整条。</p>
                <CodeBlock
                  code={`freq = {"把": 128, "被": 95, "对": 42}
del freq["被"]
print(freq)   # {"把": 128, "对": 42}`}
                  highlightLines={[2]}
                />
              </div>
            ),
          },
          {
            title: '.items() 一次拿键和值',
            content: (
              <div>
                <p>
                  遍历字典时，<code>.items()</code> 让你<strong>同时</strong>拿到键和值——这是语言学数据处理里用得最多的一招。
                </p>
                <CodeBlock
                  code={`freq = {"把": 128, "被": 95, "对": 42}
for word, count in freq.items():
    print(f"{word} 出现了 {count} 次")
# 把 出现了 128 次
# 被 出现了 95 次
# 对 出现了 42 次`}
                  highlightLines={[2, 3]}
                />
              </div>
            ),
          },
        ]}
      />

      {/* ===== 明星实战 ===== */}
      <h2>把两样凑一起：数出一句话的词频</h2>
      <p>
        现在见证列表和字典联手的高光时刻。给你一句话，我们要数出<strong>每个词出现几次</strong>——这是语料分析的第一步，也几乎是所有文本研究的起点。
      </p>
      <p>
        思路很简单：<strong>从头到尾扫一遍列表</strong>，每遇到一个词，就在<strong>字典里给它 +1</strong>。按 ▶ 看它一步步长出来：
      </p>

      <FrequencyCounter />

      <p>这段动画背后的代码，其实只有三行核心逻辑：</p>

      <CodeBlock
        code={`sentence = "猫 坐 在 垫子 上 猫 喝 水 猫 睡觉"

words = sentence.split()      # 拆成列表
freq = {}                     # 准备一个空字典

for word in words:            # 从头扫到尾
    freq[word] = freq.get(word, 0) + 1   # 见到就 +1

print(freq)
# {"猫": 3, "坐": 1, "在": 1, "垫子": 1, ...}`}
        highlightLines={[7]}
      />

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 my-6">
        <p className="text-emerald-800 text-sm">
          <code>freq.get(word, 0) + 1</code> 是整段的灵魂：这个词<strong>第一次</strong>出现，<code>.get</code> 返回默认值 <code>0</code>，加 1 变成 1；<strong>再次</strong>出现时返回它当前的次数，再加 1。空字典就这样一点点填满了。
        </p>
      </div>

      {/* ===== 嵌套 ===== */}
      <h2>套娃：列表里装字典</h2>
      <p>
        真实数据经常是<strong>一层套一层</strong>的。其中你以后最常打交道的，是<strong>"列表里装一堆字典"</strong>——一个语料库，就是很多条记录排成的队，每条记录是一个字典。
      </p>

      <StepThrough
        steps={[
          {
            title: '列表套列表',
            content: (
              <div>
                <p>每个小列表是一个人的数据。取值时连点两次编号。</p>
                <CodeBlock
                  code={`data = [
    [12, 8, 15, 6],    # 参与者 A
    [10, 14, 9, 11],   # 参与者 B
]

print(data[0][2])   # 15（A 的第 3 个）`}
                  highlightLines={[6]}
                />
              </div>
            ),
          },
          {
            title: '字典套字典',
            content: (
              <div>
                <p>把一个人的所有信息打包，值本身又是一个字典。</p>
                <CodeBlock
                  code={`p = {
    "name": "张三",
    "L1": "普通话",
    "scores": {"listening": 92, "reading": 88},
}

print(p["scores"]["reading"])   # 88`}
                  highlightLines={[7]}
                />
              </div>
            ),
          },
          {
            title: '⭐ 列表套字典（最常见）',
            content: (
              <div>
                <p>语料库的标准长相：一个列表，装着一条条记录，每条是一个字典。</p>
                <CodeBlock
                  code={`corpus = [
    {"id": 1, "text": "猫坐在垫子上", "passive": False},
    {"id": 2, "text": "书被猫弄丢了", "passive": True},
    {"id": 3, "text": "猫吃了鱼",     "passive": False},
]

print(corpus[1]["text"])   # 书被猫弄丢了`}
                  highlightLines={[7]}
                />
              </div>
            ),
          },
        ]}
      />

      {/* ===== 对照小结 ===== */}
      <h2>列表 vs 字典：一张表记住</h2>

      <div className="overflow-x-auto my-6">
        <table>
          <thead>
            <tr>
              <th>你想做的事</th>
              <th>列表 list 📚</th>
              <th>字典 dict 📇</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>创建</td>
              <td className="font-mono text-sm">[12, 8, 15]</td>
              <td className="font-mono text-sm">{'{"把": 128}'}</td>
            </tr>
            <tr>
              <td>取一个值</td>
              <td className="font-mono text-sm">lst[0]（按位置）</td>
              <td className="font-mono text-sm">d["把"]（按名字）</td>
            </tr>
            <tr>
              <td>加一个</td>
              <td className="font-mono text-sm">lst.append(x)</td>
              <td className="font-mono text-sm">d["新键"] = v</td>
            </tr>
            <tr>
              <td>删一个</td>
              <td className="font-mono text-sm">lst.remove(x)</td>
              <td className="font-mono text-sm">del d["键"]</td>
            </tr>
            <tr>
              <td>在不在</td>
              <td className="font-mono text-sm">x in lst</td>
              <td className="font-mono text-sm">"键" in d</td>
            </tr>
            <tr>
              <td>挨个遍历</td>
              <td className="font-mono text-sm">for x in lst</td>
              <td className="font-mono text-sm">for k, v in d.items()</td>
            </tr>
            <tr>
              <td>语言学场景</td>
              <td>词序列、句长列表</td>
              <td>词频表、参与者信息</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ===== 练习 ===== */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-6">
        <h3 className="text-lg font-semibold text-amber-800 mb-3">✏️ 试试看</h3>
        <p className="text-amber-700 mb-3 text-sm">打开 Python，从简单到难，一题一题来：</p>
        <ol className="text-amber-800 space-y-2 text-sm">
          <li>
            创建 <code>words = ["语言", "学", "很", "有趣"]</code>，用索引取出 <code>"很"</code>。
          </li>
          <li>
            给它 <code>.append("!")</code>，再用切片 <code>words[1:3]</code> 看看是哪两个词。
          </li>
          <li>
            创建词频字典 <code>{'{"的": 50, "了": 30}'}</code>，用 <code>.get()</code> 查一个不存在的键 <code>"在"</code>，让它返回 0 而不报错。
          </li>
          <li>
            给一句话 <code>"红 花 红 叶 红"</code>，用 <code>for</code> + 字典数出每个词的频率。
          </li>
          <li>
            进阶：做一个"参与者名单"——列表里装 3 个字典，每个字典有 <code>name</code> 和 <code>age</code>，然后打印第 2 个人的年龄。
          </li>
        </ol>
      </div>

      <p>
        列表和字典是 Python 组织数据的两根顶梁柱，你已经握在手里了。可是刚才那些"从头扫到尾""挨个 +1"的动作，还得我们一遍遍手写——下一节的<strong>循环</strong>，就是让电脑替你自动重复这些活儿。
      </p>
    </motion.div>
  );
}
