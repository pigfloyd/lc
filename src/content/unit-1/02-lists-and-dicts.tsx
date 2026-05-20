import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CodeBlock from '../../components/shared/CodeBlock';
import StepThrough from '../../components/shared/StepThrough';
import TypeBadge from '../../components/shared/TypeBadge';

function ListVisualizer({ items, highlight }: { items: string[]; highlight: number | null }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center my-4">
      {items.map((item, i) => (
        <motion.div
          key={`${item}-${i}`}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.08, duration: 0.3 }}
          className="flex flex-col items-center"
        >
          <span className="text-xs text-slate-400 font-mono mb-1">{i}</span>
          <div
            className={`w-16 h-16 md:w-20 md:h-20 rounded-xl border-2 flex items-center justify-center text-sm md:text-base font-mono font-bold transition-all duration-300 ${
              highlight === i
                ? 'border-blue-500 bg-blue-100 text-blue-700 shadow-lg shadow-blue-200 scale-110'
                : 'border-slate-300 bg-white text-slate-700'
            }`}
          >
            {item}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function DictVisualizer({
  entries,
  highlightKey,
}: {
  entries: [string, string | number][];
  highlightKey: string | null;
}) {
  return (
    <div className="space-y-2 my-4 max-w-md mx-auto">
      {entries.map(([k, v], i) => (
        <motion.div
          key={k}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
          className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
            highlightKey === k ? 'bg-emerald-50 border-2 border-emerald-400 shadow-md' : 'bg-slate-50 border border-slate-200'
          }`}
        >
          <div className={`px-3 py-1.5 rounded-lg font-mono text-sm font-semibold ${
            highlightKey === k ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-700'
          }`}>
            {k}
          </div>
          <span className="text-slate-400 text-lg">→</span>
          <div className={`px-3 py-1.5 rounded-lg font-mono text-sm ${
            highlightKey === k ? 'bg-amber-100 text-amber-800 font-semibold' : 'bg-white text-slate-600 border border-slate-200'
          }`}>
            {v}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Section() {
  const [listHighlight, setListHighlight] = useState<number | null>(null);
  const [dictHighlight, setDictHighlight] = useState<string | null>(null);
  const [sliceStart, setSliceStart] = useState(1);
  const [sliceEnd, setSliceEnd] = useState(4);

  const words = ['小明', '吃', '了', '一个', '苹果'];
  const dictEntries: [string, string | number][] = [
    ['把', 128],
    ['被', 95],
    ['对', 42],
    ['连', 17],
    ['向', 31],
  ];

  const sliceStartClamped = Math.min(sliceStart, words.length - 1);
  const sliceEndClamped = Math.min(sliceEnd, words.length);
  const sliceResult = words.slice(sliceStartClamped, sliceEndClamped);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="content-prose"
    >
      {/* ===== 第 1 节：为什么需要列表和字典？ ===== */}
      <h2>为什么需要列表和字典？</h2>
      <p>
        上一节我们学了变量——一个变量存一个值。但语言学数据从来不是一个一个的：
      </p>
      <ul>
        <li>一句话有多个词</li>
        <li>一份语料库有几百个文本</li>
        <li>词汇频率表有几十个词条</li>
      </ul>
      <p>
        我们需要一种方式把<strong>一组数据打包在一起</strong>。Python 提供了两种最重要的容器：
      </p>

      <div className="grid md:grid-cols-2 gap-4 my-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="p-5 rounded-xl border-2 border-blue-300 bg-blue-50"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 font-mono font-semibold text-sm px-2.5 py-0.5 rounded-full border bg-blue-100 text-blue-700 border-blue-300">list</span>
            <span className="font-semibold text-blue-800">列表 list</span>
          </div>
          <p className="text-blue-700 text-sm">
            有序的集合，像一排<strong>编号抽屉</strong>，每个抽屉按位置（索引）取出。
          </p>
          <p className="text-slate-500 mt-2 text-xs">适合：词表、句长序列、实验结果列表</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="p-5 rounded-xl border-2 border-emerald-300 bg-emerald-50"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 font-mono font-semibold text-sm px-2.5 py-0.5 rounded-full border bg-emerald-100 text-emerald-700 border-emerald-300">dict</span>
            <span className="font-semibold text-emerald-800">字典 dict</span>
          </div>
          <p className="text-emerald-700 text-sm">
            键值对集合，像一本<strong>词典</strong>——查词条（键）得到释义（值）。
          </p>
          <p className="text-slate-500 mt-2 text-xs">适合：词频表、特征标注、配置参数</p>
        </motion.div>
      </div>

      {/* ===== 第 2 节：列表基础 ===== */}
      <h2>列表：有序的容器</h2>
      <p>
        列表用<strong>方括号</strong> <code>[]</code> 创建，元素之间用逗号隔开。
      </p>

      <CodeBlock
        code={`# 一句话分词后的词表
words = ["小明", "吃", "了", "一个", "苹果"]

# 多名参与者的句长数据
sentence_lengths = [12, 8, 15, 6, 22]

# 混合类型也可以
mixed = ["BCC语料库", 2024, True]`}
      />

      <p>
        你可以把列表想象成一排带编号的抽屉：
      </p>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 my-6">
        <p className="text-center text-sm text-slate-500 mb-3">
          点击下面的词，看看它的索引（编号）
        </p>
        <ListVisualizer items={words} highlight={listHighlight} />
        <div className="text-center mt-4 min-h-[2rem]">
          <AnimatePresence mode="wait">
            {listHighlight !== null ? (
              <motion.p
                key={listHighlight}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="font-mono text-blue-600"
              >
                words[{listHighlight}] → "{words[listHighlight]}"
              </motion.p>
            ) : (
              <p className="text-slate-400 text-sm">👆 点击任意词查看索引</p>
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-wrap gap-2 justify-center mt-3">
          {words.map((_w, i) => (
            <button
              key={i}
              onClick={() => setListHighlight(listHighlight === i ? null : i)}
              className={`px-3 py-1.5 rounded-lg text-sm font-mono border transition-all ${
                listHighlight === i
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
              }`}
            >
              [{i}]
            </button>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
        <h3 className="text-base font-semibold text-amber-800 mb-2">注意：索引从 0 开始</h3>
        <p className="text-amber-700 text-sm">
          Python 列表的编号从 <code>0</code> 开始，不是 <code>1</code>。<br />
          第一个元素是 <code>words[0]</code>，第二个是 <code>words[1]</code>，以此类推。
          这在编程中非常普遍——习惯就好！
        </p>
      </div>

      {/* ===== 第 3 节：列表操作 ===== */}
      <h2>列表的常用操作</h2>

      <StepThrough
        steps={[
          {
            title: '取长度 len()',
            content: (
              <div>
                <p>用 <code>len()</code> 知道列表有多少个元素。</p>
                <CodeBlock
                  code={`words = ["小明", "吃", "了", "一个", "苹果"]
print(len(words))  # 5`}
                  highlightLines={[2]}
                />
              </div>
            ),
          },
          {
            title: '追加元素 .append()',
            content: (
              <div>
                <p>用 <code>.append()</code> 在列表末尾加一个元素。</p>
                <CodeBlock
                  code={`words = ["小明", "吃"]
words.append("苹果")
print(words)  # ["小明", "吃", "苹果"]`}
                  highlightLines={[2]}
                />
              </div>
            ),
          },
          {
            title: '插入元素 .insert()',
            content: (
              <div>
                <p>用 <code>.insert(位置, 元素)</code> 在指定位置插入。</p>
                <CodeBlock
                  code={`words = ["小明", "苹果"]
words.insert(1, "想吃")
print(words)  # ["小明", "想吃", "苹果"]`}
                  highlightLines={[2]}
                />
              </div>
            ),
          },
          {
            title: '删除元素 .remove()',
            content: (
              <div>
                <p>用 <code>.remove(值)</code> 删除第一个匹配的元素。</p>
                <CodeBlock
                  code={`words = ["小明", "吃", "苹果"]
words.remove("吃")
print(words)  # ["小明", "苹果"]`}
                  highlightLines={[2]}
                />
              </div>
            ),
          },
          {
            title: '排序 .sort()',
            content: (
              <div>
                <p>用 <code>.sort()</code> 给列表排序——对数字或字符串都有效。</p>
                <CodeBlock
                  code={`lengths = [22, 8, 15, 6, 12]
lengths.sort()
print(lengths)  # [6, 8, 12, 15, 22]`}
                  highlightLines={[2]}
                />
              </div>
            ),
          },
          {
            title: '成员检测 in',
            content: (
              <div>
                <p>用 <code>in</code> 检查某个值是否在列表里。</p>
                <CodeBlock
                  code={`words = ["小明", "吃", "苹果"]
print("吃" in words)   # True
print"跑" in words)   # False`}
                  highlightLines={[2, 3]}
                />
              </div>
            ),
          },
        ]}
      />

      {/* ===== 第 4 节：切片 ===== */}
      <h2>切片：截取一段子列表</h2>
      <p>
        切片（slicing）让一次取出列表中的一段。语法是 <code>列表[起始:结束]</code>——包含起始，<strong>不包含</strong>结束。
      </p>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 my-6">
        <p className="text-center text-sm text-slate-500 mb-4">
          调整起始和结束位置，看看切片的结果
        </p>

        <ListVisualizer
          items={words}
          highlight={
            sliceStartClamped <= sliceEndClamped - 1 && sliceEndClamped <= words.length
              ? null
              : null
          }
        />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600">起始：</label>
            <input
              type="range"
              min={0}
              max={words.length - 1}
              value={sliceStart}
              onChange={(e) => setSliceStart(Number(e.target.value))}
              className="w-24 accent-blue-500"
            />
            <span className="font-mono text-blue-600 w-6 text-center">{sliceStart}</span>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600">结束：</label>
            <input
              type="range"
              min={1}
              max={words.length}
              value={sliceEnd}
              onChange={(e) => setSliceEnd(Number(e.target.value))}
              className="w-24 accent-emerald-500"
            />
            <span className="font-mono text-emerald-600 w-6 text-center">{sliceEnd}</span>
          </div>
        </div>

        <div className="text-center mt-4 p-4 rounded-xl bg-white border-2 border-slate-200">
          <div className="font-mono text-sm text-slate-500 mb-2">
            words[{sliceStart}:{sliceEnd}]
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {words.map((w, i) => {
              const inSlice = i >= sliceStartClamped && i < sliceEndClamped;
              return (
                <motion.div
                  key={i}
                  className={`px-3 py-1.5 rounded-lg font-mono text-sm border transition-all duration-300 ${
                    inSlice
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-400 font-semibold'
                      : 'bg-slate-100 text-slate-400 border-slate-200'
                  }`}
                >
                  {w}
                </motion.div>
              );
            })}
          </div>
          <div className="font-mono text-emerald-700 font-semibold mt-2">
            → {JSON.stringify(sliceResult)}
          </div>
        </div>
      </div>

      <CodeBlock
        code={`words = ["小明", "吃", "了", "一个", "苹果"]

# 取前 3 个词
print(words[0:3])   # ["小明", "吃", "了"]

# 从第 2 个开始取到末尾
print(words[2:])    # ["了", "一个", "苹果"]

# 取最后 2 个
print(words[-2:])   # ["一个", "苹果"]`}
      />

      {/* ===== 第 5 节：字典基础 ===== */}
      <h2>字典：靠名字找数据</h2>
      <p>
        列表靠位置（索引）找数据，但有时我们更想<b>靠名字</b>来查找——就像查词典一样：
      </p>

      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 my-6">
        <p className="text-center text-sm text-emerald-600 mb-4 font-semibold">
          点击词条，查看释义（值）
        </p>
        <DictVisualizer entries={dictEntries} highlightKey={dictHighlight} />
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {dictEntries.map(([k]) => (
            <button
              key={k}
              onClick={() => setDictHighlight(dictHighlight === k ? null : k)}
              className={`px-4 py-2 rounded-lg text-sm font-mono border transition-all ${
                dictHighlight === k
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-md'
                  : 'bg-white text-slate-600 border-slate-300 hover:border-emerald-400'
              }`}
            >
              "{k}"
            </button>
          ))}
        </div>
        <div className="text-center mt-4 min-h-[2rem]">
          <AnimatePresence mode="wait">
            {dictHighlight !== null ? (
              <motion.p
                key={dictHighlight}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="font-mono text-emerald-700"
              >
                freq["{dictHighlight}"] → {dictEntries.find(([k]) => k === dictHighlight)?.[1]}
              </motion.p>
            ) : (
              <p className="text-slate-400 text-sm">👆 点击词条键查看对应的值</p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <p>
        字典用<strong>花括号</strong> <code>{}</code> 创建，每个条目是 <code>键: 值</code> 对，用逗号隔开。
      </p>

      <CodeBlock
        code={`# 介词词频表
freq = {
    "把": 128,
    "被": 95,
    "对": 42,
    "连": 17,
    "向": 31,
}

# 用键来查值
print(freq["把"])  # 128`}
        highlightLines={[9]}
      />

      {/* ===== 第 6 节：字典操作 ===== */}
      <h2>字典的常用操作</h2>

      <StepThrough
        steps={[
          {
            title: '查找值',
            content: (
              <div>
                <p>用 <code>字典[键]</code> 获取值。键不存在会报错。</p>
                <CodeBlock
                  code={`freq = {"把": 128, "被": 95}
print(freq["把"])   # 128
print(freq["从"])   # KeyError!`}
                  highlightLines={[2, 3]}
                />
              </div>
            ),
          },
          {
            title: '.get() 安全查找',
            content: (
              <div>
                <p>用 <code>.get(键, 默认值)</code> 更安全——键不存在时返回默认值而非报错。</p>
                <CodeBlock
                  code={`freq = {"把": 128, "被": 95}
print(freq.get("从", 0))   # 0（没找到，返回默认值）
print(freq.get("把", 0))   # 128（找到了，返回实际值）`}
                  highlightLines={[2, 3]}
                />
              </div>
            ),
          },
          {
            title: '添加 / 修改',
            content: (
              <div>
                <p>直接用 <code>字典[键] = 值</code>——键不存在就添加，已存在就覆盖。</p>
                <CodeBlock
                  code={`freq = {"把": 128, "被": 95}
freq["从"] = 73      # 添加新词条
freq["把"] = 130     # 修改已有值
print(freq)  # {"把": 130, "被": 95, "从": 73}`}
                  highlightLines={[2, 3]}
                />
              </div>
            ),
          },
          {
            title: '删除条目 del',
            content: (
              <div>
                <p>用 <code>del 字典[键]</code> 删除一个条目。</p>
                <CodeBlock
                  code={`freq = {"把": 128, "被": 95, "对": 42}
del freq["被"]
print(freq)  # {"把": 128, "对": 42}`}
                  highlightLines={[2]}
                />
              </div>
            ),
          },
          {
            title: '遍历键 .keys()',
            content: (
              <div>
                <p>用 <code>.keys()</code> 获取所有键。</p>
                <CodeBlock
                  code={`freq = {"把": 128, "被": 95, "对": 42}
for key in freq.keys():
    print(key)   # 把, 被, 对`}
                  highlightLines={[2, 3]}
                />
              </div>
            ),
          },
          {
            title: '遍历键值对 .items()',
            content: (
              <div>
                <p>用 <code>.items()</code> 同时获取键和值——<strong>语言学中最常用</strong>。</p>
                <CodeBlock
                  code={`freq = {"把": 128, "被": 95, "对": 42}
for word, count in freq.items():
    print(f"{word}: {count}次")
# 把: 128次
# 被: 95次
# 对: 42次`}
                  highlightLines={[2, 3]}
                />
              </div>
            ),
          },
          {
            title: '成员检测 in',
            content: (
              <div>
                <p>用 <code>in</code> 检查键是否存在于字典中。</p>
                <CodeBlock
                  code={`freq = {"把": 128, "被": 95}
print("把" in freq)   # True
print("从" in freq)    # False`}
                  highlightLines={[2, 3]}
                />
              </div>
            ),
          },
        ]}
      />

      {/* ===== 第 7 节：列表 vs 字典 ===== */}
      <h2>列表 vs 字典：怎么选？</h2>

      <div className="overflow-x-auto my-6">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>列表 list</th>
              <th>字典 dict</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold">创建</td>
              <td className="font-mono">[1, 2, 3]</td>
              <td className="font-mono">{"{1: 'a', 2: 'b'}"}</td>
            </tr>
            <tr>
              <td className="font-semibold">访问方式</td>
              <td>按位置索引</td>
              <td>按键查找</td>
            </tr>
            <tr>
              <td className="font-semibold">有序性</td>
              <td>✅ 有序</td>
              <td>✅ 有序（Python 3.7+）</td>
            </tr>
            <tr>
              <td className="font-semibold">语言学类比</td>
              <td>语料库中的词序列</td>
              <td>词汇频率表</td>
            </tr>
            <tr>
              <td className="font-semibold">什么时候用</td>
              <td>数据有顺序、需要遍历</td>
              <td>需要通过名称快速查找</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ===== 第 8 节：实战 —— 从文本到数据 ===== */}
      <h2>实战：从文本到数据</h2>
      <p>
        来看一个完整的例子——把一句话拆成词表，再统计词频：
      </p>

      <StepThrough
        steps={[
          {
            title: '第 1 步：原始文本',
            content: (
              <div>
                <p>这是我们的原始数据——一句话。</p>
                <CodeBlock
                  code={`sentence = "猫 坐 在 垫子 上 猫 喝 水 猫 睡觉"`}
                  showLineNumbers={false}
                />
              </div>
            ),
          },
          {
            title: '第 2 步：拆成列表',
            content: (
              <div>
                <p>用 <code>.split()</code> 把字符串按空格拆成列表。</p>
                <div className="flex flex-wrap gap-2 justify-center my-4">
                  {"猫 坐 在 垫子 上 猫 喝 水 猫 睡觉".split(' ').map((w: string, i: number) => (
                    <motion.div
                      key={`${w}-${i}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="px-3 py-1.5 rounded-lg bg-blue-100 border border-blue-300 text-blue-700 font-mono text-sm"
                    >
                      {w}
                    </motion.div>
                  ))}
                </div>
                <CodeBlock
                  code={`words = sentence.split()
print(words)
# ["猫", "坐", "在", "垫子", "上", "猫", "喝", "水", "猫", "睡觉"]`}
                  highlightLines={[1]}
                />
              </div>
            ),
          },
          {
            title: '第 3 步：统计词频',
            content: (
              <div>
                <p>用字典来统计每个词出现的次数。</p>
                <CodeBlock
                  code={`freq = {}
for word in words:
    freq[word] = freq.get(word, 0) + 1

print(freq)
# {"猫": 3, "坐": 1, "在": 1, "垫子": 1, "上": 1, "喝": 1, "水": 1, "睡觉": 1}`}
                  highlightLines={[2, 3]}
                />
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mt-4">
                  <p className="text-emerald-700 text-sm">
                    <code>freq.get(word, 0)</code> 的意思是：如果 <code>word</code> 已经在字典里就取它的值，否则用 <code>0</code>。然后 +1 表示又出现了一次。
                  </p>
                </div>
              </div>
            ),
          },
          {
            title: '第 4 步：找出高频词',
            content: (
              <div>
                <p>按频率从高到低排列。</p>
                <CodeBlock
                  code={`sorted_words = sorted(freq.items(), key=lambda x: x[1], reverse=True)
print(sorted_words)
# [("猫", 3), ("坐", 1), ("在", 1), ...]`}
                  highlightLines={[1]}
                />
                <div className="flex items-end justify-center gap-6 my-4">
                  {[
                    { word: '猫', count: 3 },
                    { word: '坐', count: 1 },
                    { word: '在', count: 1 },
                    { word: '垫子', count: 1 },
                  ].map(({ word, count }, i) => (
                    <motion.div
                      key={word}
                      initial={{ height: 0 }}
                      animate={{ height: `${count * 60}px` }}
                      transition={{ delay: i * 0.15, duration: 0.4 }}
                      className="flex flex-col items-center"
                    >
                      <span className="text-sm font-semibold text-amber-700">{count}</span>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${count * 60}px` }}
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

      {/* ===== 第 9 节：嵌套 ===== */}
      <h2>嵌套：列表和字典的套娃</h2>
      <p>
        真实数据常常是嵌套的——<strong>列表套列表、字典套字典、列表套字典</strong>……用起来就像剥洋葱，一层层取。
      </p>

      <StepThrough
        steps={[
          {
            title: '列表套列表',
            content: (
              <div>
                <p>每个子列表代表一个人的数据。</p>
                <CodeBlock
                  code={`sentence_data = [
    [12, 8, 15, 6],   # 参与者 A 的句长数据
    [10, 14, 9, 11],  # 参与者 B 的句长数据
]

# 取参与者 A 的第 3 句句长
print(sentence_data[0][2])  # 15`}
                  highlightLines={[5]}
                />
              </div>
            ),
          },
          {
            title: '字典套字典',
            content: (
              <div>
                <p>把每个人的所有信息放在一起。</p>
                <CodeBlock
                  code={`participant = {
    "name": "张三",
    "age": 25,
    "L1": "普通话",
    "scores": {"listening": 92, "reading": 88}
}

# 取阅读分数
print(participant["scores"]["reading"])  # 88`}
                  highlightLines={[7]}
                />
              </div>
            ),
          },
          {
            title: '列表套字典',
            content: (
              <div>
                <p>这是语言学数据处理中<b>最常见的结构</b>——一个语料库就是很多条记录的列表。</p>
                <CodeBlock
                  code={`corpus = [
    {"id": 1, "text": "猫坐在垫子上", "is_passive": False},
    {"id": 2, "text": "书被猫弄丢了",   "is_passive": True},
    {"id": 3, "text": "猫吃了鱼",       "is_passive": False},
]

# 取第 2 条记录的文本
print(corpus[1]["text"])  # 书被猫弄丢了`}
                  highlightLines={[7]}
                />
              </div>
            ),
          },
        ]}
      />

      {/* ===== 第 10 节：小结 ===== */}
      <h2>小结</h2>

      <table>
        <thead>
          <tr>
            <th>操作</th>
            <th>列表</th>
            <th>字典</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>创建</td>
            <td className="font-mono text-sm">[a, b, c]</td>
            <td className="font-mono text-sm">{"{k: v}"}</td>
          </tr>
          <tr>
            <td>访问</td>
            <td className="font-mono text-sm">lst[0]</td>
            <td className="font-mono text-sm">d["key"]</td>
          </tr>
          <tr>
            <td>长度</td>
            <td className="font-mono text-sm">len(lst)</td>
            <td className="font-mono text-sm">len(d)</td>
          </tr>
          <tr>
            <td>添加</td>
            <td className="font-mono text-sm">lst.append(x)</td>
            <td className="font-mono text-sm">d["k"] = v</td>
          </tr>
          <tr>
            <td>删除</td>
            <td className="font-mono text-sm">lst.remove(x)</td>
            <td className="font-mono text-sm">del d["k"]</td>
          </tr>
          <tr>
            <td>成员</td>
            <td className="font-mono text-sm">x in lst</td>
            <td className="font-mono text-sm">"k" in d</td>
          </tr>
          <tr>
            <td>遍历</td>
            <td className="font-mono text-sm">for x in lst</td>
            <td className="font-mono text-sm">for k, v in d.items()</td>
          </tr>
        </tbody>
      </table>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-6">
        <h3 className="text-lg font-semibold text-amber-800 mb-3">✏️ 试试看</h3>
        <p className="text-amber-700 mb-3">
          打开 Python 解释器，完成以下练习：
        </p>
        <ol className="text-amber-800 space-y-2">
          <li>
            创建一个列表 <code>words = ["语言", "学", "很", "有趣"]</code>，然后取出第 3 个元素。
          </li>
          <li>
            给上面的列表追加 <code>"!"</code>，然后打印出来。
          </li>
          <li>
            创建一个词频字典 <code>{"{"}"的": 50, "了": 30, "在": 20{"}"}</code>，查找 <code>"了"</code> 的频率。
          </li>
          <li>
            用 <code>.get()</code> 查找一个不存在的键，看看默认值怎么用。
          </li>
          <li>
            试试切片 <code>words[1:3]</code>，看看结果是哪几个词。
          </li>
        </ol>
      </div>

      <p>
        学会了列表和字典，你就掌握了 Python 数据组织的两大支柱。下一节我们将学习如何用<strong>循环</strong>来自动处理列表和字典中的每一个元素。
      </p>
    </motion.div>
  );
}