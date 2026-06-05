import { useState } from 'react';
import { motion } from 'framer-motion';
import CodeBlock from '../../components/shared/CodeBlock';
import StepThrough from '../../components/shared/StepThrough';

// ── Word Similarity Explorer ─────────────────────────────────────
function WordSimilarityExplorer() {
  const [word, setWord] = useState('国王');

  const embeddings: Record<string, Record<string, number>> = {
    '国王': { '王后': 0.92, '王子': 0.88, '权力': 0.75, '城堡': 0.68, '苹果': 0.12 },
    '王后': { '国王': 0.92, '公主': 0.87, '王冠': 0.73, '宫殿': 0.65, '电脑': 0.10 },
    '语言': { '语言学': 0.91, '语法': 0.82, '词汇': 0.80, '沟通': 0.74, '桌子': 0.15 },
    '语言学': { '语言': 0.91, '语音学': 0.86, '句法学': 0.83, '语料库': 0.78, '烹饪': 0.08 },
    '猫': { '狗': 0.85, '宠物': 0.82, '小猫': 0.90, '动物': 0.76, '汽车': 0.11 },
  };

  const neighbors = embeddings[word] || {};

  return (
    <div className="my-6 p-6 bg-white rounded-2xl border-2 border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">词向量语义相似度演示</h3>
      <p className="text-sm text-slate-600 mb-4">选择一个词，查看它与其他词的语义相似度（模拟数据）。</p>
      <div className="flex gap-2 mb-4 flex-wrap">
        {Object.keys(embeddings).map((w) => (
          <button key={w} onClick={() => setWord(w)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${word === w ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >{w}</button>
        ))}
      </div>
      <div className="space-y-2">
        {Object.entries(neighbors)
          .sort((a, b) => b[1] - a[1])
          .map(([w, sim]) => (
            <div key={w} className="flex items-center gap-3">
              <span className="w-16 text-sm font-semibold text-slate-700 text-right">{w}</span>
              <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${sim * 100}%`,
                    backgroundColor: sim > 0.7 ? '#3b82f6' : sim > 0.4 ? '#f59e0b' : '#94a3b8'
                  }}
                />
              </div>
              <span className="w-12 text-xs font-mono text-slate-500">{sim.toFixed(2)}</span>
            </div>
          ))}
      </div>
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
      <h2>词向量入门</h2>
      <p>
        传统方法把词当作独立的符号——"国王"和"王后"没有任何数学上的关系。
        <strong>词向量</strong>（word embedding）改变了这一切：它把每个词映射成一个<strong>数字向量</strong>（如 300 维），
        使得语义相近的词在向量空间中距离也近。
      </p>

      <div className="my-6 p-5 rounded-2xl border-2 border-blue-200 bg-blue-50">
        <h3 className="text-base font-semibold text-blue-800 mb-2">直觉理解</h3>
        <p className="text-blue-700 text-sm">
          想象一个巨大的多维空间。每个词是空间中的一个点。
          "猫"和"狗"很近，"猫"和"汽车"很远。
          更神奇的是，向量的<strong>方向</strong>编码了语义关系：
          "国王"→"王后" 的方向 ≈ "男人"→"女人" 的方向。
        </p>
      </div>

      <WordSimilarityExplorer />

      {/* ===== 核心概念 ===== */}
      <h2>1. 核心概念</h2>

      <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold text-slate-700">概念</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">含义</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              ['维度（dimension）', '向量的长度。常见 100-300 维。维度越高，表达能力越强，但需要更多数据。'],
              ['余弦相似度', '衡量两个向量方向的接近程度。范围 [-1, 1]，越接近 1 越相似。'],
              ['分布式假设', '"一个词的含义由它周围的词决定"——这是 Word2Vec 的理论基础。'],
              ['预训练模型', '在大规模语料上训练好的词向量，可以直接下载使用。'],
            ].map(([concept, meaning], i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="px-4 py-3 font-semibold text-blue-700">{concept}</td>
                <td className="px-4 py-3 text-slate-600">{meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Word2Vec ===== */}
      <h2>2. 用 Gensim 训练 Word2Vec</h2>
      <p>
        <code>gensim</code> 是 Python 中最流行的词向量库。你可以用它训练自己的词向量，也可以加载预训练模型。
      </p>

      <StepThrough
        steps={[
          {
            title: '准备语料（分词后的句子列表）',
            content: (
              <>
                <CodeBlock
                  code={`# 语料需要是「句子列表，每个句子是词列表」的格式
sentences = [
    ['语言学', '是', '研究', '语言', '的', '科学'],
    ['语音学', '研究', '语音', '的', '物理', '属性'],
    ['句法学', '研究', '句子', '的', '结构', '规则'],
    ['语义学', '研究', '词语', '和', '句子', '的', '意义'],
    # ... 实际需要数万到数百万个句子
]`}
                  showLineNumbers={false}
                />
              </>
            ),
          },
          {
            title: '训练模型',
            content: (
              <>
                <CodeBlock
                  code={`from gensim.models import Word2Vec

# 训练 Word2Vec 模型
model = Word2Vec(
    sentences,       # 输入语料
    vector_size=100, # 向量维度
    window=5,        # 上下文窗口大小
    min_count=2,     # 忽略出现次数 < 2 的词
    workers=4,       # 并行线程数
    epochs=20,       # 训练轮数
)

# 保存模型
model.save('my_word2vec.model')`}
                  highlightLines={[4, 5, 6, 7, 8, 9, 10]}
                />
              </>
            ),
          },
          {
            title: '使用词向量',
            content: (
              <>
                <CodeBlock
                  code={`# 查看词向量
vec = model.wv['语言学']
print(f'维度: {vec.shape}')  # (100,)

# 查找最相似的词
similar = model.wv.most_similar('语言学', topn=5)
for word, score in similar:
    print(f'{word}: {score:.3f}')

# 计算两个词的相似度
sim = model.wv.similarity('语言学', '语音学')
print(f'语言学 vs 语音学: {sim:.3f}')

# 词向量运算：国王 - 男人 + 女人 ≈ 王后
result = model.wv.most_similar(
    positive=['国王', '女人'],
    negative=['男人'],
    topn=3
)
print(result)`}
                  highlightLines={[6, 12, 16, 17, 18]}
                />
              </>
            ),
          },
        ]}
      />

      {/* ===== 预训练模型 ===== */}
      <h2>3. 使用预训练词向量</h2>
      <p>
        从头训练词向量需要大量语料。更常见的做法是下载别人在大规模语料上训练好的模型。
      </p>

      <CodeBlock
        code={`from gensim.models import KeyedVectors

# 加载预训练的中文词向量（如腾讯 AI Lab 开源的 200 维中文词向量）
# 下载地址: https://ai.tencent.com/ailab/nlp/en/embedding.html
wv = KeyedVectors.load_word2vec_format(
    'tencent-ailab-embedding-zh-d200-v0.2.0.txt',
    binary=False
)

# 现在可以直接使用
print(wv.most_similar('语言学', topn=5))
print(wv.similarity('猫', '狗'))`}
        highlightLines={[5, 6, 7]}
      />

      <div className="my-6 p-5 rounded-2xl border-2 border-green-200 bg-green-50">
        <h3 className="text-base font-semibold text-green-800 mb-2">常用中文预训练词向量</h3>
        <ul className="text-green-700 text-sm space-y-1">
          <li><strong>腾讯 AI Lab</strong>：200 维，覆盖 800 万中文词，质量高</li>
          <li><strong>百度百科 Word2Vec</strong>：300 维，百科领域</li>
          <li><strong>人民日报 Word2Vec</strong>：适合新闻语体研究</li>
        </ul>
      </div>

      {/* ===== 语言学应用 ===== */}
      <h2>4. 语言学研究中的应用</h2>

      <div className="my-6 space-y-3">
        {[
          {
            title: '语义相似度计算',
            desc: '比较近义词、测量词汇距离。如：不同方言中"土豆"vs"马铃薯"vs"洋芋"的语义关系。',
            color: 'blue',
          },
          {
            title: '词义变化追踪',
            desc: '用不同时期的语料训练词向量，追踪词义的历时变化。如："小姐"一词的语义演变。',
            color: 'green',
          },
          {
            title: '类比关系发现',
            desc: '"北京之于中国 ≈ ? 之于日本"——词向量能自动发现国家-首都的类比关系。',
            color: 'purple',
          },
          {
            title: '词汇聚类',
            desc: '对词向量做聚类，自动发现语义场。如：自动聚出"食物""动物""颜色"等类别。',
            color: 'amber',
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className={`p-4 rounded-xl border-l-4 ${
              item.color === 'blue' ? 'border-blue-400 bg-blue-50' :
              item.color === 'green' ? 'border-green-400 bg-green-50' :
              item.color === 'purple' ? 'border-purple-400 bg-purple-50' :
              'border-amber-400 bg-amber-50'
            }`}
          >
            <div className="font-semibold text-slate-800">{item.title}</div>
            <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* ===== 注意事项 ===== */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
        <h3 className="text-lg font-semibold text-amber-800 mb-2">注意事项</h3>
        <ul className="text-amber-700 space-y-1.5 text-sm">
          <li><strong>语料偏差</strong>：词向量反映训练语料的偏见。如果语料中"护士"常和"女性"共现，词向量也会编码这种关联。</li>
          <li><strong>多义词</strong>："苹果"在 Word2Vec 中只有一个向量，无法区分水果和品牌。BERT 等上下文模型可以解决这个问题。</li>
          <li><strong>不在词表中的词</strong>：罕见词或新词可能没有预训练向量。</li>
          <li><strong>不是万能的</strong>：词向量是很好的特征，但不能替代严谨的实验设计和统计分析。</li>
        </ul>
      </div>
    </motion.div>
  );
}
