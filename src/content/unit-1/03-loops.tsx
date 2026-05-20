import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CodeBlock from '../../components/shared/CodeBlock';
import StepThrough from '../../components/shared/StepThrough';

function LoopAnimator({
  items,
  currentIdx,
  label,
}: {
  items: { value: string; result?: string }[];
  currentIdx: number;
  label: string;
}) {
  return (
    <div className="my-4">
      <div className="flex flex-wrap gap-3 justify-center">
        {items.map((item, i) => {
          const isCurrent = i === currentIdx;
          const isPast = i < currentIdx;
          return (
            <motion.div
              key={i}
              className="flex flex-col items-center"
              initial={false}
              animate={{
                scale: isCurrent ? 1.15 : 1,
                opacity: isPast ? 0.5 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-xs text-slate-400 font-mono mb-1">{i}</span>
              <div
                className={`w-16 h-16 md:w-20 md:h-20 rounded-xl border-2 flex items-center justify-center text-sm md:text-base font-mono font-bold transition-all duration-300 ${
                  isCurrent
                    ? 'border-blue-500 bg-blue-100 text-blue-700 shadow-lg shadow-blue-200'
                    : isPast
                      ? 'border-slate-200 bg-slate-50 text-slate-400 line-through'
                      : 'border-slate-300 bg-white text-slate-700'
                }`}
              >
                {item.value}
              </div>
              {isCurrent && item.result !== undefined && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 px-2.5 py-1 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-700 text-xs font-mono"
                >
                  {item.result}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
      <div className="text-center mt-3">
        <AnimatePresence mode="wait">
          {currentIdx >= 0 && currentIdx < items.length ? (
            <motion.p
              key={currentIdx}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-mono text-blue-600 text-sm"
            >
              {label} = "{items[currentIdx].value}"
            </motion.p>
          ) : currentIdx >= items.length ? (
            <motion.p
              key="done"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-emerald-600 font-semibold text-sm"
            >
              循环结束！共处理 {items.length} 个元素
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

function DictLoopAnimator({
  entries,
  currentIdx,
}: {
  entries: [string, number][];
  currentIdx: number;
}) {
  return (
    <div className="my-4 space-y-2 max-w-md mx-auto">
      {entries.map(([k, v], i) => {
        const isCurrent = i === currentIdx;
        const isPast = i < currentIdx;
        return (
          <motion.div
            key={k}
            initial={false}
            animate={{
              scale: isCurrent ? 1.02 : 1,
              opacity: isPast ? 0.5 : 1,
            }}
            transition={{ duration: 0.3 }}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
              isCurrent
                ? 'bg-emerald-50 border-2 border-emerald-400 shadow-md'
                : isPast
                  ? 'bg-slate-50 border border-slate-200 opacity-50'
                  : 'bg-slate-50 border border-slate-200'
            }`}
          >
            <div
              className={`px-3 py-1.5 rounded-lg font-mono text-sm font-semibold ${
                isCurrent ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {k}
            </div>
            <span className="text-slate-400 text-lg">→</span>
            <div
              className={`px-3 py-1.5 rounded-lg font-mono text-sm ${
                isCurrent
                  ? 'bg-amber-100 text-amber-800 font-semibold'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              {v}
            </div>
          </motion.div>
        );
      })}
      <div className="text-center mt-3">
        <AnimatePresence mode="wait">
          {currentIdx >= 0 && currentIdx < entries.length ? (
            <motion.p
              key={currentIdx}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-mono text-emerald-600 text-sm"
            >
              word = "{entries[currentIdx][0]}", count = {entries[currentIdx][1]}
            </motion.p>
          ) : currentIdx >= entries.length ? (
            <motion.p
              key="done"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-emerald-600 font-semibold text-sm"
            >
              遍历完成！
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

function RangeVisualizer({ start, end, step, currentIdx }: { start: number; end: number; step: number; currentIdx: number }) {
  const values: number[] = [];
  for (let i = start; i < end; i += step) {
    values.push(i);
  }

  return (
    <div className="my-4">
      <div className="flex flex-wrap gap-2 justify-center">
        {values.map((v, i) => {
          const isCurrent = i === currentIdx;
          const isPast = i < currentIdx;
          return (
            <motion.div
              key={v}
              initial={false}
              animate={{
                scale: isCurrent ? 1.2 : 1,
                opacity: isPast ? 0.5 : 1,
              }}
              transition={{ duration: 0.25 }}
              className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-sm font-mono font-bold ${
                isCurrent
                  ? 'border-purple-500 bg-purple-100 text-purple-700 shadow-lg shadow-purple-200'
                  : isPast
                    ? 'border-slate-200 bg-slate-50 text-slate-400'
                    : 'border-slate-300 bg-white text-slate-700'
              }`}
            >
              {v}
            </motion.div>
          );
        })}
      </div>
      {values.length === 0 && (
        <p className="text-center text-slate-400 text-sm mt-2">空范围——没有数字可遍历</p>
      )}
    </div>
  );
}

export default function Section() {
  const [forIdx, setForIdx] = useState(-1);
  const [dictIdx, setDictIdx] = useState(-1);
  const [rangeIdx, setRangeIdx] = useState(-1);
  const [rangeStart, setRangeStart] = useState(0);
  const [rangeEnd, setRangeEnd] = useState(5);
  const [rangeStep, setRangeStep] = useState(1);
  const [whileStep, setWhileStep] = useState(-1);

  const words = ['语言', '学', '很', '有趣'];
  const freqEntries: [string, number][] = [
    ['把', 128],
    ['被', 95],
    ['对', 42],
    ['向', 31],
    ['连', 17],
  ];

  const whileSteps = [
    { n: 5, code: 'n > 0 → True', action: 'print(5), n = 4' },
    { n: 4, code: 'n > 0 → True', action: 'print(4), n = 3' },
    { n: 3, code: 'n > 0 → True', action: 'print(3), n = 2' },
    { n: 2, code: 'n > 0 → True', action: 'print(2), n = 1' },
    { n: 1, code: 'n > 0 → True', action: 'print(1), n = 0' },
    { n: 0, code: 'n > 0 → False', action: '循环结束' },
  ];

  const playForLoop = () => {
    setForIdx(-1);
    let i = 0;
    const interval = setInterval(() => {
      if (i < words.length) {
        setForIdx(i);
        i++;
      } else {
        setForIdx(words.length);
        clearInterval(interval);
      }
    }, 600);
  };

  const playDictLoop = () => {
    setDictIdx(-1);
    let i = 0;
    const interval = setInterval(() => {
      if (i < freqEntries.length) {
        setDictIdx(i);
        i++;
      } else {
        setDictIdx(freqEntries.length);
        clearInterval(interval);
      }
    }, 600);
  };

  const playRangeLoop = () => {
    setRangeIdx(-1);
    const values: number[] = [];
    for (let i = rangeStart; i < rangeEnd; i += rangeStep) {
      values.push(i);
    }
    let i = 0;
    const interval = setInterval(() => {
      if (i < values.length) {
        setRangeIdx(i);
        i++;
      } else {
        setRangeIdx(values.length);
        clearInterval(interval);
      }
    }, 500);
  };

  const playWhileLoop = () => {
    setWhileStep(-1);
    let i = 0;
    const interval = setInterval(() => {
      if (i < whileSteps.length) {
        setWhileStep(i);
        i++;
      } else {
        setWhileStep(whileSteps.length);
        clearInterval(interval);
      }
    }, 700);
  };

  const resetForLoop = () => setForIdx(-1);
  const resetDictLoop = () => setDictIdx(-1);
  const resetRangeLoop = () => setRangeIdx(-1);
  const resetWhileLoop = () => setWhileStep(-1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="content-prose"
    >
      <h2>循环：让计算机替你重复做事</h2>
      <p>
        上一节我们学了列表和字典——它们可以装很多数据。但数据装进去之后呢？如果一个一个手动处理，100
        个词要写 100 行代码——太累了！
      </p>
      <p>
        <strong>循环</strong>（loop）就是让计算机自动重复执行同一段代码。你只需要说"对列表里的每个元素做这件事"，Python
        就会帮你一个个处理完。
      </p>

      <div className="grid md:grid-cols-2 gap-4 my-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="p-5 rounded-xl border-2 border-blue-300 bg-blue-50"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono font-bold text-blue-700 text-lg">for</span>
            <span className="font-semibold text-blue-800">遍历循环</span>
          </div>
          <p className="text-blue-700 text-sm">
            对容器里的<strong>每一个元素</strong>，做同一件事。就像老师点名——按名单逐个叫到。
          </p>
          <p className="text-slate-500 mt-2 text-xs">适合：处理列表/字典中的每个数据</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="p-5 rounded-xl border-2 border-purple-300 bg-purple-50"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono font-bold text-purple-700 text-lg">while</span>
            <span className="font-semibold text-purple-800">条件循环</span>
          </div>
          <p className="text-purple-700 text-sm">
            只要条件满足，就<strong>一直重复</strong>。就像跑步——只要没到终点就继续跑。
          </p>
          <p className="text-slate-500 mt-2 text-xs">适合：不确定次数的重复</p>
        </motion.div>
      </div>

      <h2>for 循环：逐个点名</h2>
      <p>
        <code>for</code> 循环的语法很简单——<strong>"对列表中的每个东西，做某事"</strong>：
      </p>

      <CodeBlock
        code={`for 变量 in 列表:
    对变量做某事`}
        showLineNumbers={false}
      />

      <p>来看一个真实的例子——遍历一个词表：</p>

      <CodeBlock
        code={`words = ["语言", "学", "很", "有趣"]

for word in words:
    print(word)`}
        highlightLines={[3, 4]}
      />

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 my-6">
        <p className="text-center text-sm text-slate-500 mb-2">
          点击"播放"观看 for 循环的执行过程
        </p>
        <LoopAnimator items={words.map((w) => ({ value: w, result: `输出: ${w}` }))} currentIdx={forIdx} label="word" />
        <div className="flex gap-3 justify-center mt-4">
          <button
            onClick={playForLoop}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 transition-all shadow-sm"
          >
            ▶ 播放
          </button>
          <button
            onClick={resetForLoop}
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 text-sm hover:bg-slate-100 transition-all"
          >
            ↺ 重置
          </button>
        </div>
      </div>

      <p>循环的执行过程是这样的：</p>

      <StepThrough
        steps={[
          {
            title: '第 1 轮',
            content: (
              <div>
                <p>
                  Python 从列表取出第 1 个元素，赋给变量 <code>word</code>。
                </p>
                <CodeBlock
                  code={`word = "语言"   # 第 1 轮
print(word)     # 输出：语言`}
                  highlightLines={[1]}
                  showLineNumbers={false}
                />
              </div>
            ),
          },
          {
            title: '第 2 轮',
            content: (
              <div>
                <p>取出第 2 个元素，再次执行 <code>print</code>。</p>
                <CodeBlock
                  code={`word = "学"     # 第 2 轮
print(word)     # 输出：学`}
                  highlightLines={[1]}
                  showLineNumbers={false}
                />
              </div>
            ),
          },
          {
            title: '第 3 轮',
            content: (
              <div>
                <p>取出第 3 个元素……</p>
                <CodeBlock
                  code={`word = "很"     # 第 3 轮
print(word)     # 输出：很`}
                  highlightLines={[1]}
                  showLineNumbers={false}
                />
              </div>
            ),
          },
          {
            title: '第 4 轮',
            content: (
              <div>
                <p>取出最后一个元素，执行完毕。</p>
                <CodeBlock
                  code={`word = "有趣"   # 第 4 轮
print(word)     # 输出：有趣`}
                  highlightLines={[1]}
                  showLineNumbers={false}
                />
              </div>
            ),
          },
          {
            title: '结束',
            content: (
              <div>
                <p>列表里没有更多元素了，循环自动结束。4 个词 → 循环执行了 4 次。</p>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-3">
                  <p className="text-blue-700 text-sm">
                    <strong>核心规则：</strong>列表有几个元素，<code>for</code> 循环就跑几轮。
                  </p>
                </div>
              </div>
            ),
          },
        ]}
      />

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
        <h3 className="text-base font-semibold text-amber-800 mb-2">缩进很重要！</h3>
        <p className="text-amber-700 text-sm">
          <code>for</code> 下面的代码必须<strong>缩进</strong>（按 Tab 键或 4 个空格）。缩进的代码就是"每轮要做的事"。
          没有缩进的代码不属于循环——它只在循环结束后执行一次。
        </p>
        <CodeBlock
          code={`for word in words:
    print(word)        # ← 缩进了，每轮都执行
print("完成！")       # ← 没缩进，循环结束后只执行一次`}
          highlightLines={[2, 3]}
        />
      </div>

      <h2>for + 字典：遍历词频表</h2>
      <p>
        上一节学过字典的 <code>.items()</code> 方法——它能同时给出键和值。配合 <code>for</code>
        循环，就能遍历整个词频表：
      </p>

      <CodeBlock
        code={`freq = {"把": 128, "被": 95, "对": 42, "向": 31, "连": 17}

for word, count in freq.items():
    print(f"{word}: {count}次")`}
        highlightLines={[3, 4]}
      />

      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 my-6">
        <p className="text-center text-sm text-emerald-600 mb-2 font-semibold">
          点击"播放"观看字典遍历过程
        </p>
        <DictLoopAnimator entries={freqEntries} currentIdx={dictIdx} />
        <div className="flex gap-3 justify-center mt-4">
          <button
            onClick={playDictLoop}
            className="px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-all shadow-sm"
          >
            ▶ 播放
          </button>
          <button
            onClick={resetDictLoop}
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 text-sm hover:bg-slate-100 transition-all"
          >
            ↺ 重置
          </button>
        </div>
      </div>

      <StepThrough
        steps={[
          {
            title: '.keys() — 只遍历键',
            content: (
              <div>
                <p>只需要键的时候用 <code>.keys()</code>。</p>
                <CodeBlock
                  code={`freq = {"把": 128, "被": 95}
for word in freq.keys():
    print(word)  # 把, 被`}
                  highlightLines={[2, 3]}
                />
              </div>
            ),
          },
          {
            title: '.values() — 只遍历值',
            content: (
              <div>
                <p>只需要值的时候用 <code>.values()</code>。</p>
                <CodeBlock
                  code={`freq = {"把": 128, "被": 95}
for count in freq.values():
    print(count)  # 128, 95`}
                  highlightLines={[2, 3]}
                />
              </div>
            ),
          },
          {
            title: '.items() — 键值一起',
            content: (
              <div>
                <p>
                  <code>.items()</code> 是<strong>语言学中最常用的</strong>——同时拿到键和值。
                </p>
                <CodeBlock
                  code={`freq = {"把": 128, "被": 95}
for word, count in freq.items():
    print(f"{word}: {count}次")`}
                  highlightLines={[2, 3]}
                />
              </div>
            ),
          },
        ]}
      />

      <h2>range()：生成数字序列</h2>
      <p>
        有时候你不需要遍历列表，而是需要<strong>执行 N 次</strong>操作，或者需要一组连续的数字。这时用{' '}
        <code>range()</code>：
      </p>

      <CodeBlock
        code={`# range(起始, 结束) —— 包含起始，不包含结束
for i in range(1, 5):
    print(i)
# 输出：1, 2, 3, 4（没有 5！）`}
        highlightLines={[2, 3]}
      />

      <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-6 my-6">
        <p className="text-center text-sm text-purple-600 mb-2 font-semibold">
          调整参数，看看 range() 生成哪些数字
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600 font-semibold">起始：</label>
            <input
              type="range"
              min={0}
              max={10}
              value={rangeStart}
              onChange={(e) => {
                setRangeStart(Number(e.target.value));
                setRangeIdx(-1);
              }}
              className="w-20 accent-purple-500"
            />
            <span className="font-mono text-purple-600 w-6 text-center">{rangeStart}</span>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600 font-semibold">结束：</label>
            <input
              type="range"
              min={1}
              max={12}
              value={rangeEnd}
              onChange={(e) => {
                setRangeEnd(Number(e.target.value));
                setRangeIdx(-1);
              }}
              className="w-20 accent-emerald-500"
            />
            <span className="font-mono text-emerald-600 w-6 text-center">{rangeEnd}</span>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600 font-semibold">步长：</label>
            <input
              type="range"
              min={1}
              max={3}
              value={rangeStep}
              onChange={(e) => {
                setRangeStep(Number(e.target.value));
                setRangeIdx(-1);
              }}
              className="w-20 accent-amber-500"
            />
            <span className="font-mono text-amber-600 w-6 text-center">{rangeStep}</span>
          </div>
        </div>

        <RangeVisualizer start={rangeStart} end={rangeEnd} step={rangeStep} currentIdx={rangeIdx} />

        <div className="text-center p-3 rounded-xl bg-white border-2 border-slate-200 mt-3">
          <div className="font-mono text-sm text-slate-500">
            range({rangeStart}, {rangeEnd}, {rangeStep})
          </div>
        </div>

        <div className="flex gap-3 justify-center mt-4">
          <button
            onClick={playRangeLoop}
            className="px-4 py-2 rounded-lg bg-purple-500 text-white text-sm font-semibold hover:bg-purple-600 transition-all shadow-sm"
          >
            ▶ 播放遍历
          </button>
          <button
            onClick={resetRangeLoop}
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 text-sm hover:bg-slate-100 transition-all"
          >
            ↺ 重置
          </button>
        </div>
      </div>

      <StepThrough
        steps={[
          {
            title: 'range(N)',
            content: (
              <div>
                <p>只写一个数——从 0 开始，到 N-1 结束。</p>
                <CodeBlock
                  code={`for i in range(5):
    print(i)  # 0, 1, 2, 3, 4`}
                  highlightLines={[1]}
                />
                <p className="text-slate-500 text-sm mt-2">最常见的用法——"做 N 次"。</p>
              </div>
            ),
          },
          {
            title: 'range(起始, 结束)',
            content: (
              <div>
                <p>指定起始和结束——包含起始，<strong>不包含</strong>结束（跟切片一样！）。</p>
                <CodeBlock
                  code={`for i in range(2, 6):
    print(i)  # 2, 3, 4, 5`}
                  highlightLines={[1]}
                />
              </div>
            ),
          },
          {
            title: 'range(起始, 结束, 步长)',
            content: (
              <div>
                <p>加上步长——可以跳着数。</p>
                <CodeBlock
                  code={`for i in range(0, 10, 2):
    print(i)  # 0, 2, 4, 6, 8`}
                  highlightLines={[1]}
                />
              </div>
            ),
          },
          {
            title: '语言学场景',
            content: (
              <div>
                <p>给语料库中的每条记录编号时，range 特别好用。</p>
                <CodeBlock
                  code={`sentences = ["第一句", "第二句", "第三句"]
for i in range(len(sentences)):
    print(f"第{i + 1}句: {sentences[i]}")`}
                  highlightLines={[2, 3]}
                />
              </div>
            ),
          },
        ]}
      />

      <h2>while 循环：跑到条件不满足为止</h2>
      <p>
        <code>while</code> 循环和 <code>for</code> 不同——它不说"对每个元素做"，而是说<strong>"只要条件成立就一直做"</strong>：
      </p>

      <CodeBlock
        code={`n = 5
while n > 0:
    print(n)
    n = n - 1
# 输出：5, 4, 3, 2, 1`}
        highlightLines={[2, 3, 4]}
      />

      <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-6 my-6">
        <p className="text-center text-sm text-purple-600 mb-2 font-semibold">
          点击"播放"观看 while 循环的执行过程
        </p>

        <div className="my-4 space-y-3 max-w-lg mx-auto">
          {whileSteps.map((step, i) => {
            const isCurrent = i === whileStep;
            const isPast = i < whileStep;
            return (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  scale: isCurrent ? 1.02 : 1,
                  opacity: isPast ? 0.5 : 1,
                }}
                transition={{ duration: 0.3 }}
                className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${
                  isCurrent
                    ? 'bg-purple-100 border-2 border-purple-400 shadow-md'
                    : isPast
                      ? 'bg-slate-50 border border-slate-200'
                      : 'bg-slate-50 border border-slate-200'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-lg shrink-0 ${
                    isCurrent
                      ? 'bg-purple-500 text-white'
                      : isPast
                        ? 'bg-slate-200 text-slate-500'
                        : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {step.n}
                </div>
                <div className="flex-1">
                  <div className={`font-mono text-sm ${isCurrent ? 'text-purple-700 font-semibold' : 'text-slate-500'}`}>
                    {step.code}
                  </div>
                  <div className={`text-sm ${isCurrent ? 'text-amber-700 font-semibold' : 'text-slate-400'}`}>
                    {step.action}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex gap-3 justify-center mt-4">
          <button
            onClick={playWhileLoop}
            className="px-4 py-2 rounded-lg bg-purple-500 text-white text-sm font-semibold hover:bg-purple-600 transition-all shadow-sm"
          >
            ▶ 播放
          </button>
          <button
            onClick={resetWhileLoop}
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 text-sm hover:bg-slate-100 transition-all"
          >
            ↺ 重置
          </button>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-xl p-5 my-6">
        <h3 className="text-base font-semibold text-red-800 mb-2">⚠ 当心无限循环！</h3>
        <p className="text-red-700 text-sm">
          如果 <code>while</code> 的条件永远不会变成 <code>False</code>，循环就会<strong>永远跑下去</strong>，程序卡死。
          确保循环体中有让条件逐渐变为 <code>False</code> 的语句（比如 <code>n = n - 1</code>）。
        </p>
        <CodeBlock
          code={`# 危险！n 永远不会变，条件永远为 True
n = 5
while n > 0:
    print(n)
    # 忘了写 n = n - 1 → 无限循环！`}
          highlightLines={[5]}
        />
      </div>

      <h2>for vs while：怎么选？</h2>

      <div className="overflow-x-auto my-6">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>for 循环</th>
              <th>while 循环</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold">核心思想</td>
              <td>对每个元素做某事</td>
              <td>只要满足条件就继续</td>
            </tr>
            <tr>
              <td className="font-semibold">循环次数</td>
              <td>由容器大小决定</td>
              <td>由条件决定（可能不确定）</td>
            </tr>
            <tr>
              <td className="font-semibold">适合场景</td>
              <td>遍历列表、字典、range</td>
              <td>读文件直到结尾、等待用户输入</td>
            </tr>
            <tr>
              <td className="font-semibold">语言学例子</td>
              <td>统计每个词的频率</td>
              <td>不断读取语料直到处理完</td>
            </tr>
            <tr>
              <td className="font-semibold">使用频率</td>
              <td>⭐⭐⭐ 非常常用</td>
              <td>⭐ 偶尔使用</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 my-6">
        <h3 className="text-base font-semibold text-blue-800 mb-2">经验法则</h3>
        <p className="text-blue-700 text-sm">
          在语言学数据处理中，<strong>90% 的情况用 for 循环就够了</strong>。只有当你不确定要循环多少次时，才需要
          while。如果你刚开始学，优先使用 for。
        </p>
      </div>

      <h2>循环中的两个关键字：break 和 continue</h2>

      <StepThrough
        steps={[
          {
            title: 'break — 提前退出',
            content: (
              <div>
                <p>
                  <code>break</code> 让你<strong>立刻跳出</strong>整个循环，不再继续。
                </p>
                <CodeBlock
                  code={`words = ["猫", "狗", "STOP", "鸟", "鱼"]
for word in words:
    if word == "STOP":
        break          # 遇到 STOP，立刻退出
    print(word)
# 输出：猫, 狗（鸟和鱼不会被处理）`}
                  highlightLines={[4]}
                />
              </div>
            ),
          },
          {
            title: 'continue — 跳过这一轮',
            content: (
              <div>
                <p>
                  <code>continue</code> 让你<strong>跳过当前这一轮</strong>，直接进入下一轮。
                </p>
                <CodeBlock
                  code={`words = ["猫", "", "狗", "", "鸟"]
for word in words:
    if word == "":
        continue      # 空字符串，跳过
    print(word)
# 输出：猫, 狗, 鸟（空字符串被跳过了）`}
                  highlightLines={[4]}
                />
              </div>
            ),
          },
          {
            title: '语言学场景',
            content: (
              <div>
                <p>处理语料时，跳过不需要的行很常见。</p>
                <CodeBlock
                  code={`for line in lines:
    if line.startswith("#"):
        continue      # 跳过注释行
    if line.strip() == "":
        continue      # 跳过空行
    process(line)     # 只处理有效数据`}
                  highlightLines={[3, 5]}
                />
              </div>
            ),
          },
        ]}
      />

      <h2>实战：用循环统计词频</h2>
      <p>
        上一节最后我们看过一段统计词频的代码。现在你有了循环的知识，让我们真正理解它的每一步：
      </p>

      <StepThrough
        steps={[
          {
            title: '第 1 步：原始数据',
            content: (
              <div>
                <p>一段已经分好词的文本。</p>
                <CodeBlock code={`text = "猫 坐 在 垫子 上 猫 喝 水 猫 睡觉"`} showLineNumbers={false} />
              </div>
            ),
          },
          {
            title: '第 2 步：拆成列表',
            content: (
              <div>
                <p>
                  用 <code>.split()</code> 把字符串拆成列表。
                </p>
                <CodeBlock
                  code={`words = text.split()
# ["猫", "坐", "在", "垫子", "上", "猫", "喝", "水", "猫", "睡觉"]`}
                  highlightLines={[1]}
                />
              </div>
            ),
          },
          {
            title: '第 3 步：空字典准备',
            content: (
              <div>
                <p>创建一个空字典来存放统计结果。</p>
                <CodeBlock code={`freq = {}`} showLineNumbers={false} />
              </div>
            ),
          },
          {
            title: '第 4 步：循环统计',
            content: (
              <div>
                <p>对列表中的每个词：如果字典里已有这个词，次数 +1；如果没有，设为 1。</p>
                <CodeBlock
                  code={`for word in words:
    freq[word] = freq.get(word, 0) + 1`}
                  highlightLines={[1, 2]}
                />
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mt-3">
                  <p className="text-emerald-700 text-sm">
                    <code>freq.get(word, 0)</code>：如果 <code>word</code> 已在字典中，返回它的值；否则返回
                    0。然后 +1 表示又出现了一次。
                  </p>
                </div>
              </div>
            ),
          },
          {
            title: '第 5 步：查看结果',
            content: (
              <div>
                <p>打印统计结果。</p>
                <CodeBlock
                  code={`print(freq)
# {"猫": 3, "坐": 1, "在": 1, "垫子": 1, "上": 1, "喝": 1, "水": 1, "睡觉": 1}`}
                />
                <div className="flex items-end justify-center gap-6 my-4">
                  {[
                    { word: '猫', count: 3 },
                    { word: '坐', count: 1 },
                    { word: '在', count: 1 },
                    { word: '垫子', count: 1 },
                    { word: '上', count: 1 },
                  ].map(({ word, count }, i) => (
                    <motion.div
                      key={word}
                      initial={{ height: 0 }}
                      animate={{ height: `${count * 50}px` }}
                      transition={{ delay: i * 0.15, duration: 0.4 }}
                      className="flex flex-col items-center"
                    >
                      <span className="text-sm font-semibold text-amber-700">{count}</span>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${count * 50}px` }}
                        transition={{ delay: i * 0.15, duration: 0.4 }}
                        className="w-12 bg-gradient-to-t from-amber-500 to-amber-300 rounded-t-lg"
                      />
                      <span className="mt-2 text-sm font-mono text-slate-600">{word}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
          },
        ]}
      />

      <h2>嵌套循环：循环里面套循环</h2>
      <p>
        有时你需要对每个元素再做一轮循环——比如对比每一对参与者的数据。这就是<strong>嵌套循环</strong>：
      </p>

      <CodeBlock
        code={`participants = ["A", "B", "C"]

for p1 in participants:
    for p2 in participants:
        if p1 != p2:
            print(f"{p1} vs {p2}")`}
        highlightLines={[3, 4, 5, 6]}
      />

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
        <h3 className="text-base font-semibold text-amber-800 mb-2">注意嵌套层数</h3>
        <p className="text-amber-700 text-sm">
          两层嵌套很常见，三层以上就要小心——代码会变复杂，运行速度也会变慢。如果发现嵌套太深，通常可以换一种写法。
        </p>
      </div>

      <h2>小结</h2>

      <table>
        <thead>
          <tr>
            <th>语法</th>
            <th>用途</th>
            <th>示例</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="font-mono">for x in 列表</td>
            <td>遍历列表的每个元素</td>
            <td className="font-mono text-sm">for word in words</td>
          </tr>
          <tr>
            <td className="font-mono">for k, v in 字典.items()</td>
            <td>遍历字典的键值对</td>
            <td className="font-mono text-sm">for word, count in freq.items()</td>
          </tr>
          <tr>
            <td className="font-mono">for i in range(n)</td>
            <td>执行 n 次 / 生成数字</td>
            <td className="font-mono text-sm">for i in range(10)</td>
          </tr>
          <tr>
            <td className="font-mono">while 条件</td>
            <td>条件满足就继续</td>
            <td className="font-mono text-sm">while n &gt; 0</td>
          </tr>
          <tr>
            <td className="font-mono">break</td>
            <td>立刻退出整个循环</td>
            <td className="font-mono text-sm">if x == "STOP": break</td>
          </tr>
          <tr>
            <td className="font-mono">continue</td>
            <td>跳过当前轮，继续下一轮</td>
            <td className="font-mono text-sm">if x == "": continue</td>
          </tr>
        </tbody>
      </table>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-6">
        <h3 className="text-lg font-semibold text-amber-800 mb-3">✏️ 试试看</h3>
        <p className="text-amber-700 mb-3">打开 Python 解释器，完成以下练习：</p>
        <ol className="text-amber-800 space-y-2">
          <li>
            用 <code>for</code> 循环打印列表 <code>["语", "言", "学"]</code> 中的每个元素。
          </li>
          <li>
            用 <code>range()</code> 打印 1 到 10 的所有数字。
          </li>
          <li>
            创建字典 <code>{"{"}"名词": 45, "动词": 32, "形容词": 18{"}"}</code>
            ，用 <code>for</code> 循环打印每个词性和它的数量。
          </li>
          <li>
            用 <code>while</code> 循环从 10 倒数到 1，打印每个数字。
          </li>
          <li>
            给定 <code>words = ["我", "", "喜欢", "", "语言学"]</code>，用 <code>continue</code> 跳过空字符串，只打印非空词。
          </li>
        </ol>
      </div>

      <p>
        学会了循环，你就掌握了自动化处理数据的钥匙。下一节我们将学习<strong>条件判断</strong>——让程序根据不同情况做不同的事。
      </p>
    </motion.div>
  );
}
