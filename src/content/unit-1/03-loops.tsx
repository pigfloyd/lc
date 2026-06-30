import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CodeBlock from '../../components/shared/CodeBlock';

// 小兔子拔萝卜的动画
function BunnyAnimation() {
  const [step, setStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const carrots = ['🥕', '🥕', '🥕', '🥕', '🥕'];
  const [collected, setCollected] = useState<string[]>([]);

  const reset = () => {
    setStep(-1);
    setCollected([]);
    setIsPlaying(false);
  };

  const play = () => {
    reset();
    setIsPlaying(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i < carrots.length) {
        setStep(i);
        setCollected((prev) => [...prev, carrots[i]]);
        i++;
      } else {
        setStep(carrots.length);
        setIsPlaying(false);
        clearInterval(interval);
      }
    }, 900);
  };

  return (
    <div className="bg-gradient-to-b from-sky-50 to-green-50 border-2 border-green-200 rounded-2xl p-6 my-6">
      <h3 className="text-center text-lg font-bold text-green-800 mb-4">🐰 小兔子拔萝卜</h3>

      <div className="relative my-6 min-h-[140px]">
        {/* 田里的萝卜 */}
        <div className="flex items-end justify-center gap-3">
          {carrots.map((carrot, i) => {
            const isCollected = i < collected.length;
            const isCurrent = i === step;
            return (
              <div
                key={i}
                className="flex flex-col items-center relative"
                style={{ width: '50px' }}
              >
                <motion.div
                  initial={{ y: 0 }}
                  animate={{
                    y: isCollected ? -80 : 0,
                    opacity: isCollected ? 0 : 1,
                    scale: isCurrent ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                  className={`text-4xl ${isCurrent ? 'drop-shadow-lg' : ''}`}
                >
                  {carrot}
                </motion.div>
                <div className="text-xs text-slate-500 mt-1">
                  第{i + 1}个
                </div>

                {/* 小兔子定位在每个萝卜的位置 */}
                {isCurrent && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -left-3 bottom-8 text-4xl"
                  >
                    🐰
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* 结束时的小兔子 */}
        {step >= carrots.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-2 text-5xl"
          >
            😊
          </motion.div>
        )}

        {/* 篮子 */}
        <div className="absolute right-4 top-0 flex flex-col items-center">
          <div className="text-3xl">🧺</div>
          <div className="flex flex-wrap gap-1 mt-2 max-w-[120px]">
            {collected.map((c, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-xl"
              >
                {c}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* 对话气泡 */}
      <div className="flex justify-center my-4">
        <AnimatePresence mode="wait">
          {step === -1 && (
            <motion.div
              key="start"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl px-4 py-2 shadow-md border border-slate-200"
            >
              <p className="text-slate-600 text-sm">点击播放，看小兔子拔萝卜！</p>
            </motion.div>
          )}
          {step >= 0 && step < carrots.length && (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-2xl px-4 py-2 shadow-md border border-green-200"
            >
              <p className="text-green-700 text-sm font-semibold">
                拔第 {step + 1} 个萝卜！🥕
              </p>
            </motion.div>
          )}
          {step >= carrots.length && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-amber-100 rounded-2xl px-4 py-2 shadow-md border border-amber-300"
            >
              <p className="text-amber-800 text-sm font-semibold">
                太棒了！拔完了 {carrots.length} 个萝卜！🎉
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 控制按钮 */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={play}
          disabled={isPlaying}
          className="px-5 py-2 rounded-xl bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition-all shadow-sm disabled:opacity-50"
        >
          ▶ 播放
        </button>
        <button
          onClick={reset}
          className="px-5 py-2 rounded-xl border border-slate-300 text-slate-600 text-sm hover:bg-slate-100 transition-all"
        >
          ↺ 重来
        </button>
      </div>
    </div>
  );
}

// 循环概念可视化
function LoopConcept() {
  const [step, setStep] = useState(0);

  const steps = [
    { title: '1. 开始', desc: '准备要处理的东西', emoji: '🎬' },
    { title: '2. 取一个', desc: '从列表里拿出一个', emoji: '👆' },
    { title: '3. 处理它', desc: '对这个东西做点事', emoji: '✨' },
    { title: '4. 还有吗？', desc: '如果还有，回到第2步', emoji: '🤔' },
    { title: '5. 结束', desc: '全部处理完啦！', emoji: '🎉' },
  ];

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 my-6">
      <h3 className="text-center font-bold text-slate-700 mb-4">🔄 循环是怎么工作的？</h3>

      <div className="flex flex-wrap justify-center gap-3 my-6">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            animate={{
              scale: step === i ? 1.1 : 1,
              opacity: step >= i ? 1 : 0.3,
            }}
            className={`flex flex-col items-center p-3 rounded-xl transition-all ${
              step === i ? 'bg-blue-100 border-2 border-blue-400' : 'bg-white border border-slate-200'
            }`}
          >
            <span className="text-3xl mb-1">{s.emoji}</span>
            <span className={`text-xs font-semibold ${step === i ? 'text-blue-700' : 'text-slate-500'}`}>
              {s.title}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="text-center mb-4 min-h-[60px]">
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-slate-600"
          >
            {steps[step].desc}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="px-4 py-2 rounded-lg border border-slate-300 text-sm disabled:opacity-50"
        >
          上一步
        </button>
        <button
          onClick={() => setStep((step + 1) % steps.length)}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600"
        >
          下一步 →
        </button>
      </div>
    </div>
  );
}

// 吃饼干的 for 循环
function CookieForLoop() {
  const [step, setStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const cookies = ['🍪', '🍪', '🍪', '🍪'];
  const [eaten, setEaten] = useState<number[]>([]);

  const reset = () => {
    setStep(-1);
    setEaten([]);
    setIsPlaying(false);
  };

  const play = () => {
    reset();
    setIsPlaying(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i < cookies.length) {
        setStep(i);
        setEaten((prev) => [...prev, i]);
        i++;
      } else {
        setStep(cookies.length);
        setIsPlaying(false);
        clearInterval(interval);
      }
    }, 1000);
  };

  return (
    <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 my-6">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h3 className="font-bold text-amber-800 mb-2">🍪 for 循环：一个一个吃</h3>
          <p className="text-amber-700 text-sm mb-4">
            <code>for</code> 就是"对每个都做一遍"的意思！
          </p>
          <CodeBlock
            code={`cookies = ["🍪", "🍪", "🍪", "🍪"]

for cookie in cookies:
    print("吃了", cookie)`}
            highlightLines={step >= 0 && step < cookies.length ? [3, 4] : []}
          />
        </div>

        <div>
          <div className="flex justify-center gap-2 mb-4">
            {cookies.map((cookie, i) => {
              const isEaten = eaten.includes(i);
              const isCurrent = i === step;
              return (
                <motion.div
                  key={i}
                  animate={{
                    scale: isCurrent ? 1.3 : 1,
                    opacity: isEaten ? 0 : 1,
                    y: isCurrent ? -10 : 0,
                  }}
                  className={`text-4xl p-2 rounded-xl ${
                    isCurrent ? 'bg-amber-200' : 'bg-white'
                  }`}
                >
                  {isEaten ? '😋' : cookie}
                </motion.div>
              );
            })}
          </div>

          <div className="text-center min-h-[40px]">
            <AnimatePresence mode="wait">
              {step === -1 && (
                <motion.p key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-500 text-sm">
                  点击播放，看小熊吃饼干！
                </motion.p>
              )}
              {step >= 0 && step < cookies.length && (
                <motion.p key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-amber-700 font-semibold">
                  小熊：吃第 {step + 1} 块饼干！🍪
                </motion.p>
              )}
              {step >= cookies.length && (
                <motion.p key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-700 font-bold">
                  吃完啦！一共 {cookies.length} 块！🐻
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="flex gap-2 justify-center mt-4">
            <button
              onClick={play}
              disabled={isPlaying}
              className="px-4 py-2 rounded-xl bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 disabled:opacity-50"
            >
              ▶ 播放
            </button>
            <button
              onClick={reset}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 text-sm hover:bg-slate-100"
            >
              ↺ 重置
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// range 数字楼梯
function RangeStairs() {
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(6);
  const [step, setStep] = useState(1);
  const [current, setCurrent] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  const numbers = [];
  for (let i = start; i < end; i += step) {
    numbers.push(i);
  }

  const reset = () => {
    setCurrent(-1);
    setIsPlaying(false);
  };

  const play = () => {
    reset();
    setIsPlaying(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i < numbers.length) {
        setCurrent(i);
        i++;
      } else {
        setCurrent(numbers.length);
        setIsPlaying(false);
        clearInterval(interval);
      }
    }, 600);
  };

  return (
    <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-6 my-6">
      <h3 className="text-center font-bold text-purple-800 mb-4">🪜 range()：数字楼梯</h3>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-600 font-semibold">从</label>
          <input
            type="range" min={0} max={5} value={start}
            onChange={(e) => { setStart(Number(e.target.value)); reset(); }}
            className="w-16 accent-purple-500"
          />
          <span className="font-mono text-purple-600 w-6">{start}</span>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-600 font-semibold">到</label>
          <input
            type="range" min={1} max={10} value={end}
            onChange={(e) => { setEnd(Number(e.target.value)); reset(); }}
            className="w-16 accent-emerald-500"
          />
          <span className="font-mono text-emerald-600 w-6">{end}</span>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-600 font-semibold">步长</label>
          <input
            type="range" min={1} max={3} value={step}
            onChange={(e) => { setStep(Number(e.target.value)); reset(); }}
            className="w-16 accent-amber-500"
          />
          <span className="font-mono text-amber-600 w-6">{step}</span>
        </div>
      </div>

      <div className="flex items-end justify-center gap-1 my-6 min-h-[180px]">
        {numbers.length === 0 ? (
          <p className="text-slate-400">调整参数，让楼梯出现！</p>
        ) : (
          numbers.map((n, i) => {
            const isCurrent = i === current;
            const isPast = i < current;
            return (
              <motion.div
                key={n}
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: `${n * 30 + 30}px`,
                  opacity: 1,
                  scale: isCurrent ? 1.1 : 1,
                }}
                transition={{ delay: i * 0.1 }}
                className={`w-12 rounded-t-lg flex flex-col items-center justify-end pb-2 ${
                  isCurrent
                    ? 'bg-purple-400 shadow-lg shadow-purple-200'
                    : isPast
                      ? 'bg-purple-300'
                      : 'bg-purple-200'
                }`}
              >
                <span className={`font-bold ${isCurrent ? 'text-white' : 'text-purple-700'}`}>
                  {n}
                </span>
              </motion.div>
            );
          })
        )}
      </div>

      <div className="text-center">
        <CodeBlock
          code={`for i in range(${start}, ${end}, ${step}):
    print(i)`}
          showLineNumbers={false}
          highlightLines={current >= 0 && current < numbers.length ? [1] : []}
        />
        <div className="flex gap-2 justify-center mt-4">
          <button
            onClick={play}
            disabled={isPlaying || numbers.length === 0}
            className="px-4 py-2 rounded-xl bg-purple-500 text-white text-sm font-semibold hover:bg-purple-600 disabled:opacity-50"
          >
            ▶ 爬楼梯
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 text-sm hover:bg-slate-100"
          >
            ↺ 重置
          </button>
        </div>
      </div>
    </div>
  );
}

// 词频统计动画
function WordFrequencyAnimation() {
  const [phase, setPhase] = useState(0);
  const words = ['🐱', '🐶', '🐱', '🐰', '🐶', '🐱'];
  const [freq, setFreq] = useState<Record<string, number>>({});

  const reset = () => {
    setPhase(0);
    setFreq({});
  };

  const runStep = () => {
    if (phase < words.length) {
      const word = words[phase];
      setFreq((prev) => ({
        ...prev,
        [word]: (prev[word] || 0) + 1,
      }));
      setPhase(phase + 1);
    }
  };

  const autoRun = () => {
    reset();
    let i = 0;
    const interval = setInterval(() => {
      if (i < words.length) {
        const word = words[i];
        setFreq((prev) => ({
          ...prev,
          [word]: (prev[word] || 0) + 1,
        }));
        setPhase(i + 1);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 800);
  };

  const animalNames: Record<string, string> = {
    '🐱': '小猫',
    '🐶': '小狗',
    '🐰': '小兔',
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-6 my-6">
      <h3 className="text-center font-bold text-emerald-800 mb-4">📊 实战：统计小动物数量</h3>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {words.map((word, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: i < phase ? 0.3 : 1,
              scale: i === phase - 1 ? 1.3 : 1,
            }}
            className={`text-3xl p-2 rounded-xl ${i < phase ? 'bg-slate-200' : 'bg-white'}`}
          >
            {word}
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mb-6">
        {Object.entries(freq).map(([animal, count], i) => (
          <motion.div
            key={animal}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex flex-col items-center"
          >
            <div className="text-2xl font-bold text-emerald-700">{count}</div>
            <div
              className="w-12 rounded-t-lg"
              style={{
                height: `${count * 30}px`,
                background: animal === '🐱'
                  ? 'linear-gradient(to top, #f59e0b, #fbbf24)'
                  : animal === '🐶'
                    ? 'linear-gradient(to top, #8b5cf6, #a78bfa)'
                    : 'linear-gradient(to top, #ec4899, #f472b6)',
              }}
            />
            <div className="text-2xl mt-1">{animal}</div>
            <div className="text-xs text-slate-500">{animalNames[animal]}</div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-lg mx-auto">
        <CodeBlock
          code={`animals = ["🐱", "🐶", "🐱", "🐰", "🐶", "🐱"]
freq = {}

for animal in animals:
    freq[animal] = freq.get(animal, 0) + 1

print(freq)
# {"🐱": 3, "🐶": 2, "🐰": 1}`}
          highlightLines={phase > 0 ? [4, 5] : []}
        />
      </div>

      <div className="flex gap-2 justify-center mt-4">
        <button
          onClick={autoRun}
          className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600"
        >
          ▶ 自动播放
        </button>
        <button
          onClick={runStep}
          disabled={phase >= words.length}
          className="px-4 py-2 rounded-xl bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 disabled:opacity-50"
        >
          下一步 →
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 text-sm hover:bg-slate-100"
        >
          ↺ 重置
        </button>
      </div>
    </div>
  );
}

// while 循环：灌水气球
function WaterBalloon() {
  const [water, setWater] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const maxWater = 10;

  useEffect(() => {
    if (!isRunning) return;
    if (water >= maxWater) {
      setIsRunning(false);
      return;
    }
    const timer = setTimeout(() => {
      setWater((w) => w + 1);
    }, 500);
    return () => clearTimeout(timer);
  }, [water, isRunning]);

  const start = () => {
    setWater(0);
    setIsRunning(true);
  };

  const isFull = water >= maxWater;

  return (
    <div className="bg-cyan-50 border-2 border-cyan-200 rounded-2xl p-6 my-6">
      <h3 className="text-center font-bold text-cyan-800 mb-4">🎈 while 循环：灌水气球</h3>

      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div>
          <p className="text-cyan-700 text-sm mb-4">
            <code>while</code> 循环是说：<strong>"只要条件满足，就一直做！"</strong>
          </p>
          <CodeBlock
            code={`water = 0

while water < 10:  # 水还没满？
    print("再加一点水...")
    water = water + 1  # 水变多了

print("气球满啦！💥")`}
            highlightLines={isRunning && !isFull ? [3, 4, 5] : isFull ? [7] : []}
          />
        </div>

        <div className="flex flex-col items-center">
          <div className="relative">
            {/* 水龙头 */}
            <div className="text-4xl mb-2">🚰</div>
            {isRunning && !isFull && (
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
                className="absolute left-4 top-8 text-blue-400 text-2xl"
              >
                💧
              </motion.div>
            )}
          </div>

          {/* 气球 */}
          <div className="relative my-4">
            <motion.div
              animate={{
                scale: 0.5 + water * 0.05,
              }}
              className="text-7xl"
            >
              {isFull ? '💥' : '🎈'}
            </motion.div>
            {/* 水量指示器 */}
            <div className="mt-4 w-48 h-4 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-400 to-cyan-400"
                animate={{ width: `${(water / maxWater) * 100}%` }}
              />
            </div>
            <div className="text-center mt-2 font-mono text-cyan-700">
              水量: {water}/{maxWater}
            </div>
          </div>

          <div className="text-center min-h-[40px]">
            {!isRunning && water === 0 && (
              <p className="text-slate-500 text-sm">点击开始灌水！</p>
            )}
            {isRunning && !isFull && (
              <motion.p
                key={water}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-cyan-700 font-semibold"
              >
                再加一点水... 💧
              </motion.p>
            )}
            {isFull && (
              <motion.p
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-red-600 font-bold"
              >
                砰！气球满啦！💥
              </motion.p>
            )}
          </div>

          <div className="flex gap-2 mt-2">
            <button
              onClick={start}
              disabled={isRunning}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-white text-sm font-semibold hover:bg-cyan-600 disabled:opacity-50"
            >
              🚰 开始灌水
            </button>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-6">
        <p className="text-red-700 text-sm">
          <strong>⚠️ 小心！</strong>用 <code>while</code> 时，一定要让条件有机会变成 False！
          不然循环会永远跑下去，程序就卡死了！
        </p>
      </div>
    </div>
  );
}

// 总结卡片
function SummaryCards() {
  return (
    <div className="grid md:grid-cols-2 gap-4 my-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-5 rounded-2xl border-2 border-blue-300 bg-blue-50"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🍪</span>
          <span className="font-bold text-blue-800 text-lg">for 循环</span>
        </div>
        <p className="text-blue-700 text-sm mb-2">
          <strong>"对每个都做一遍"</strong>
        </p>
        <CodeBlock
          code={`for 东西 in 列表:
    处理它`}
          showLineNumbers={false}
        />
        <p className="text-slate-500 text-xs mt-2">
          ✅ 适合：遍历列表、字典、range()
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="p-5 rounded-2xl border-2 border-purple-300 bg-purple-50"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🎈</span>
          <span className="font-bold text-purple-800 text-lg">while 循环</span>
        </div>
        <p className="text-purple-700 text-sm mb-2">
          <strong>"只要满足就一直做"</strong>
        </p>
        <CodeBlock
          code={`while 条件:
    继续做`}
          showLineNumbers={false}
        />
        <p className="text-slate-500 text-xs mt-2">
          ✅ 适合：不确定要做多少次的时候
        </p>
      </motion.div>
    </div>
  );
}

// 主组件
export default function Section() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="content-prose"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="text-6xl mb-4"
        >
          🔄
        </motion.div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">循环：让电脑自动重复做事</h1>
        <p className="text-slate-600">
          不用一个一个手动做，让电脑帮你完成重复的工作！
        </p>
      </div>

      {/* 开场动画故事 */}
      <BunnyAnimation />

      {/* 概念解释 */}
      <h2>什么是循环？</h2>
      <p>
        小兔子拔了 5 个萝卜——如果让你来写程序，你会怎么写？
      </p>
      <div className="grid md:grid-cols-2 gap-4 my-6">
        <div className="p-4 rounded-xl bg-red-50 border border-red-200">
          <p className="text-red-700 text-sm font-semibold mb-2">❌ 笨办法</p>
          <CodeBlock
            code={`print("拔第1个萝卜")
print("拔第2个萝卜")
print("拔第3个萝卜")
print("拔第4个萝卜")
print("拔第5个萝卜")`}
            showLineNumbers={false}
          />
        </div>
        <div className="p-4 rounded-xl bg-green-50 border border-green-200">
          <p className="text-green-700 text-sm font-semibold mb-2">✅ 聪明办法：循环！</p>
          <CodeBlock
            code={`for i in range(1, 6):
    print(f"拔第{i}个萝卜")`}
            showLineNumbers={false}
          />
        </div>
      </div>
      <p>
        如果有 100 个萝卜，笨办法要写 100 行，而循环只要 2 行！
        这就是循环的魔力——<strong>告诉电脑"重复做"，它就会帮你完成！</strong>
      </p>

      {/* 循环工作原理 */}
      <LoopConcept />

      {/* for 循环 */}
      <h2>🍪 for 循环：一个一个来</h2>
      <p>
        最常用的循环是 <code>for</code> 循环——它的意思是：
        <strong>"对列表里的每个东西，都做同样的事！"</strong>
      </p>

      <CookieForLoop />

      {/* 更多 for 例子 */}
      <h3>在语言学中怎么用？</h3>
      <p>我们经常需要处理很多词、很多句子，这时 for 循环就派上用场了：</p>

      <CodeBlock
        code={`words = ["我", "爱", "语", "言", "学"]

# 对每个词，打印它的长度
for word in words:
    print(word, "→", len(word))`}
      />

      {/* range */}
      <h2>🪜 range()：生成数字序列</h2>
      <p>
        有时候你不需要列表，只是需要"做 N 次"或者"数到 N"。
        这时用 <code>range()</code> 来生成连续的数字！
      </p>

      <RangeStairs />

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-6">
        <h4 className="font-semibold text-slate-700 mb-2">range() 的三种用法</h4>
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          <div className="p-3 bg-white rounded-lg">
            <code className="text-purple-600">range(5)</code>
            <p className="text-slate-600 mt-1">从 0 到 4</p>
            <p className="text-slate-400 text-xs">0, 1, 2, 3, 4</p>
          </div>
          <div className="p-3 bg-white rounded-lg">
            <code className="text-blue-600">range(2, 6)</code>
            <p className="text-slate-600 mt-1">从 2 到 5</p>
            <p className="text-slate-400 text-xs">2, 3, 4, 5</p>
          </div>
          <div className="p-3 bg-white rounded-lg">
            <code className="text-amber-600">range(0, 10, 2)</code>
            <p className="text-slate-600 mt-1">跳着数</p>
            <p className="text-slate-400 text-xs">0, 2, 4, 6, 8</p>
          </div>
        </div>
      </div>

      {/* 词频统计实战 */}
      <h2>📊 实战：统计词频</h2>
      <p>
        在语言学研究中，我们经常需要统计每个词出现了多少次。
        用 for 循环 + 字典就可以搞定！
      </p>

      <WordFrequencyAnimation />

      {/* for 循环遍历字典 */}
      <h3>遍历字典：同时看词和它的频率</h3>
      <p>
        用 <code>.items()</code> 可以同时拿到字典的键和值：
      </p>

      <CodeBlock
        code={`freq = {"小猫": 3, "小狗": 2, "小兔": 1}

for word, count in freq.items():
    print(word, "出现了", count, "次")`}
      />

      {/* while 循环 */}
      <h2>🎈 while 循环：只要满足就继续</h2>
      <p>
        <code>while</code> 循环不一样——它不说"对每个做"，而是说
        <strong>"只要条件成立，就一直做！"</strong>
      </p>

      <WaterBalloon />

      {/* 总结对比 */}
      <h2>📝 总结：用 for 还是 while？</h2>

      <SummaryCards />

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 my-6">
        <h3 className="text-base font-semibold text-blue-800 mb-2">💡 经验法则</h3>
        <p className="text-blue-700 text-sm">
          在语言学数据处理中，<strong>90% 的情况用 for 循环就够了！</strong>
          只有当你不确定要循环多少次时，才需要 while。
          如果你刚开始学，优先使用 for 循环！
        </p>
      </div>

      {/* 小练习 */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-6">
        <h3 className="text-lg font-semibold text-amber-800 mb-3">✏️ 试试看</h3>
        <p className="text-amber-700 mb-3">打开 Python 解释器，试试这些练习：</p>
        <ol className="text-amber-800 space-y-2">
          <li>
            用 <code>for</code> 循环打印列表 <code>["语", "言", "学"]</code> 中的每个字
          </li>
          <li>
            用 <code>range()</code> 打印 1 到 10 的所有数字
          </li>
          <li>
            创建词频字典 <code>{"{"}"名词": 45, "动词": 32, "形容词": 18{"}"}</code>，
            用 <code>for</code> 循环打印每个词性和它的数量
          </li>
          <li>
            （挑战）统计一句话中每个字出现的次数！
          </li>
        </ol>
      </div>

      <p>
        学会了循环，你就掌握了自动化处理数据的钥匙！
        下一节我们将学习<strong>条件判断</strong>——让程序根据不同情况做不同的事。
      </p>
    </motion.div>
  );
}
