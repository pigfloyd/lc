import { useState } from 'react';
import { motion } from 'framer-motion';
import CodeBlock from '../../components/shared/CodeBlock';
import StepThrough from '../../components/shared/StepThrough';

// ── Merge Visualizer ─────────────────────────────────────────────
function MergeVisualizer() {
  const [mode, setMode] = useState<'concat' | 'merge'>('concat');

  return (
    <div className="my-6 p-6 bg-white rounded-2xl border-2 border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">数据合并方式对比</h3>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode('concat')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            mode === 'concat'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          concat（上下拼接）
        </button>
        <button
          onClick={() => setMode('merge')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            mode === 'merge'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          merge（左右关联）
        </button>
      </div>

      {mode === 'concat' ? (
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="flex-1 p-3 rounded-xl bg-blue-50 border border-blue-200 text-center">
              <div className="text-xs text-blue-600 font-semibold mb-1">语料 A（新闻）</div>
              <div className="font-mono text-xs text-slate-700">100 篇文章</div>
            </div>
            <div className="text-2xl text-slate-400">+</div>
            <div className="flex-1 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
              <div className="text-xs text-emerald-600 font-semibold mb-1">语料 B（论坛）</div>
              <div className="font-mono text-xs text-slate-700">200 篇帖子</div>
            </div>
          </div>
          <div className="text-center text-slate-400 text-2xl">↓ pd.concat()</div>
          <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-center">
            <div className="text-xs text-purple-600 font-semibold mb-1">合并后</div>
            <div className="font-mono text-xs text-slate-700">300 行 × 相同列</div>
          </div>
          <p className="text-sm text-slate-600">上下拼接——两个表的列名相同，把行堆在一起。</p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-start gap-4">
            <div className="flex-1 p-3 rounded-xl bg-blue-50 border border-blue-200 text-center">
              <div className="text-xs text-blue-600 font-semibold mb-1">词频表</div>
              <div className="font-mono text-xs text-slate-700">word, freq</div>
            </div>
            <div className="text-2xl text-slate-400 mt-4">+</div>
            <div className="flex-1 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
              <div className="text-xs text-emerald-600 font-semibold mb-1">词性标注</div>
              <div className="font-mono text-xs text-slate-700">word, pos</div>
            </div>
          </div>
          <div className="text-center text-slate-400 text-2xl">↓ pd.merge(on='word')</div>
          <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-center">
            <div className="text-xs text-purple-600 font-semibold mb-1">合并后</div>
            <div className="font-mono text-xs text-slate-700">word, freq, pos</div>
          </div>
          <p className="text-sm text-slate-600">左右关联——通过共同列（如 word）把两个表的信息合并到一起。</p>
        </div>
      )}
    </div>
  );
}

export default function Section() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="content-prose"
    >
      <h2>多源数据整合</h2>
      <p>
        做研究时，你的数据往往来自多个渠道：问卷结果是一个文件，语料标注是另一个文件，
        词频统计又是一个文件。要让它们"合体"成一张表才能分析。
      </p>

      <MergeVisualizer />

      {/* === concat === */}
      <h2>1. pd.concat：上下拼接</h2>
      <p>
        当多个数据表的<strong>列名相同</strong>，只是行数不同（比如来自不同语料库的同类型数据），用 <code>pd.concat</code> 把它们堆在一起。
      </p>

      <CodeBlock
        code={`import pandas as pd

# 读取多个语料文件
news = pd.read_csv('news_corpus.csv')      # 100 篇新闻
forum = pd.read_csv('forum_posts.csv')     # 200 篇论坛帖子
blog = pd.read_csv('blog_texts.csv')       # 50 篇博客

# 上下拼接
corpus = pd.concat([news, forum, blog], ignore_index=True)
print(f'合并后: {len(corpus)} 行')

# 检查是否成功
print(corpus['source'].value_counts())`}
        highlightLines={[9, 10]}
      />

      <div className="my-6 p-5 rounded-2xl border-2 border-amber-200 bg-amber-50">
        <h3 className="text-base font-semibold text-amber-800 mb-2">ignore_index=True 很重要</h3>
        <p className="text-amber-700 text-sm">
          不加这个参数，拼接后的 DataFrame 会保留原来的行号（0-99, 0-199, 0-49），导致重复索引。
          加上 <code>ignore_index=True</code> 会生成全新的连续行号（0-349）。
        </p>
      </div>

      {/* === merge === */}
      <h2>2. pd.merge：左右关联</h2>
      <p>
        当两个表有<strong>共同的列</strong>（如词形、说话人 ID），可以用 <code>pd.merge</code> 把信息合并到一起——类似 Excel 的 VLOOKUP。
      </p>

      <StepThrough
        steps={[
          {
            title: '基本合并',
            content: (
              <>
                <CodeBlock
                  code={`# 词频表
freq = pd.DataFrame({
    'word': ['语言', '语料', '语法', '语音'],
    'freq': [1200, 800, 950, 600],
})

# 词性标注表
pos = pd.DataFrame({
    'word': ['语言', '语料', '语法', '语音'],
    'pos':  ['noun', 'noun', 'noun', 'noun'],
})

# 按 word 列合并
result = pd.merge(freq, pos, on='word')
print(result)`}
                  highlightLines={[14]}
                />
                <p className="text-sm text-slate-600 mt-2">结果：一张表同时有词频和词性信息。</p>
              </>
            ),
          },
          {
            title: '处理列名不同的情况',
            content: (
              <>
                <CodeBlock
                  code={`# 两个表的键列名不一样
freq = pd.DataFrame({'token': ['语言', '语料'], 'freq': [1200, 800]})
pos  = pd.DataFrame({'word':  ['语言', '语料'], 'pos':  ['noun', 'noun']})

# 用 left_on 和 right_on 指定各自的键列
result = pd.merge(freq, pos, left_on='token', right_on='word')
print(result)`}
                  highlightLines={[6]}
                />
              </>
            ),
          },
          {
            title: '合并方式：inner / outer / left / right',
            content: (
              <>
                <p className="text-sm text-slate-600 mb-2">当两个表的键不完全匹配时，合并方式决定保留哪些行：</p>
                <CodeBlock
                  code={`# inner（默认）：只保留两边都有的
inner = pd.merge(freq, pos, on='word', how='inner')

# outer：保留所有行，缺失的地方填 NaN
outer = pd.merge(freq, pos, on='word', how='outer')

# left：保留左边表的所有行
left = pd.merge(freq, pos, on='word', how='left')`}
                  highlightLines={[2, 5, 8]}
                />
              </>
            ),
          },
        ]}
      />

      {/* === 数据探查 === */}
      <h2>3. 合并后的数据探查</h2>
      <p>
        数据合并完成后，第一件事不是马上分析，而是<strong>检查数据质量</strong>。
      </p>

      <CodeBlock
        code={`# 基本信息：行数、列名、数据类型、缺失值
corpus.info()

# 数值列的统计摘要
corpus.describe()

# 检查缺失值
print(corpus.isnull().sum())

# 检查分类列的分布
print(corpus['source'].value_counts())
print(corpus['language'].value_counts())

# 抽样查看
print(corpus.sample(5))`}
        highlightLines={[2, 5, 8, 11, 12, 15]}
      />

      <div className="my-6 grid md:grid-cols-2 gap-4">
        {[
          {
            title: '常见问题',
            color: 'red',
            items: [
              '合并后行数异常多 → 可能有重复键，产生了笛卡尔积',
              '合并后出现大量 NaN → 键列的值不完全匹配（多了空格、大小写不同）',
              '数据类型不一致 → 一个是 int，一个是 str',
            ],
          },
          {
            title: '解决办法',
            color: 'green',
            items: [
              '合并前先 drop_duplicates() 去重',
              '用 str.strip().str.lower() 统一键列格式',
              '用 astype() 统一数据类型',
            ],
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.15 }}
            className={`p-4 rounded-2xl border-2 ${
              item.color === 'red'
                ? 'border-red-200 bg-red-50'
                : 'border-green-200 bg-green-50'
            }`}
          >
            <h4 className={`font-semibold mb-2 ${
              item.color === 'red' ? 'text-red-800' : 'text-green-800'
            }`}>{item.title}</h4>
            <ul className={`text-sm space-y-1 ${
              item.color === 'red' ? 'text-red-700' : 'text-green-700'
            }`}>
              {item.items.map((text, j) => (
                <li key={j}>{text}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* === 完整流程 === */}
      <h2>4. 完整流程示例</h2>
      <p>
        把前面学的串起来：从多个文件读取数据，合并，清洗，保存。
      </p>

      <CodeBlock
        code={`import pandas as pd

# 1. 读取多个数据源
interviews = pd.read_csv('interview_data.csv')
questionnaire = pd.read_excel('questionnaire.xlsx')
annotations = pd.read_json('annotations.json')

# 2. 统一键列格式
for df in [interviews, questionnaire, annotations]:
    df['participant_id'] = df['participant_id'].str.strip().str.upper()

# 3. 逐步合并
merged = pd.merge(interviews, questionnaire, on='participant_id', how='left')
merged = pd.merge(merged, annotations, on='participant_id', how='left')

# 4. 检查结果
print(f'合并后: {merged.shape[0]} 行 × {merged.shape[1]} 列')
print(merged.isnull().sum())

# 5. 保存
merged.to_csv('final_dataset.csv', index=False, encoding='utf-8')
print('数据整合完成！')`}
        highlightLines={[12, 13]}
      />
    </motion.div>
  );
}
