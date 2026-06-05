import { useState } from 'react';
import { motion } from 'framer-motion';
import CodeBlock from '../../components/shared/CodeBlock';
import StepThrough from '../../components/shared/StepThrough';

// ── Sentiment Score Demo ─────────────────────────────────────────
function SentimentScoreDemo() {
  const [text, setText] = useState('这家餐厅的菜品非常好吃，服务也很周到！');

  const positiveWords = ['好', '棒', '优秀', '喜欢', '推荐', '满意', '周到', '好吃', '赞', '完美', '精彩', '感谢', '不错'];
  const negativeWords = ['差', '烂', '糟', '失望', '难吃', '恶劣', '讨厌', '垃圾', '骗', '慢', '贵', '坏'];

  const chars = text.split('');
  let posCount = 0;
  let negCount = 0;

  const highlighted = chars.map((c, i) => {
    const context = text.slice(Math.max(0, i - 1), i + 2);
    const isPos = positiveWords.some((w) => context.includes(w));
    const isNeg = negativeWords.some((w) => context.includes(w));
    if (isPos) { posCount++; return <span key={i} className="text-green-600 font-semibold bg-green-50 rounded px-0.5">{c}</span>; }
    if (isNeg) { negCount++; return <span key={i} className="text-red-600 font-semibold bg-red-50 rounded px-0.5">{c}</span>; }
    return <span key={i}>{c}</span>;
  });

  const score = posCount - negCount;
  const label = score > 0 ? '积极' : score < 0 ? '消极' : '中性';
  const color = score > 0 ? 'green' : score < 0 ? 'red' : 'slate';

  return (
    <div className="my-6 p-6 bg-white rounded-2xl border-2 border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">词典法情感分析演示</h3>
      <p className="text-sm text-slate-600 mb-3">输入文本，查看哪些词被识别为积极（绿色）或消极（红色）。</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-3 border-2 border-slate-200 rounded-xl text-sm mb-4 focus:border-blue-400 focus:outline-none"
        rows={3}
      />
      <div className="p-3 bg-slate-50 rounded-xl mb-4 text-sm leading-relaxed">{highlighted}</div>
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-center">
          <div className="text-xs text-green-600">积极词</div>
          <div className="text-xl font-bold text-green-800">{posCount}</div>
        </div>
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-center">
          <div className="text-xs text-red-600">消极词</div>
          <div className="text-xl font-bold text-red-800">{negCount}</div>
        </div>
        <div className={`p-3 rounded-xl border text-center ${
          color === 'green' ? 'bg-green-50 border-green-200' :
          color === 'red' ? 'bg-red-50 border-red-200' :
          'bg-slate-50 border-slate-200'
        }`}>
          <div className={`text-xs ${color === 'green' ? 'text-green-600' : color === 'red' ? 'text-red-600' : 'text-slate-600'}`}>判断</div>
          <div className={`text-xl font-bold ${color === 'green' ? 'text-green-800' : color === 'red' ? 'text-red-800' : 'text-slate-800'}`}>{label}</div>
        </div>
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
      <h2>情感与态度分析</h2>
      <p>
        情感分析（sentiment analysis）是文本分类的一个特殊分支：判断文本表达的是<strong>正面、负面还是中性</strong>的态度。
        它在话语分析、社会语言学、语用学研究中都有广泛应用。
      </p>

      <div className="my-6 p-5 rounded-2xl border-2 border-blue-200 bg-blue-50">
        <h3 className="text-base font-semibold text-blue-800 mb-2">语言学研究中的应用场景</h3>
        <ul className="text-blue-700 text-sm space-y-1">
          <li><strong>话语分析</strong>：社交媒体上对某语言政策的态度倾向</li>
          <li><strong>语用学</strong>：讽刺和反语的识别（"真是太'棒'了"）</li>
          <li><strong>社会语言学</strong>：不同群体对语言变体的态度差异</li>
          <li><strong>二语习得</strong>：学习者反馈中的情感倾向分析</li>
        </ul>
      </div>

      {/* ===== 两种方法 ===== */}
      <h2>1. 两种方法：词典法 vs 机器学习法</h2>

      <div className="my-6 grid md:grid-cols-2 gap-4">
        {[
          {
            title: '词典法',
            subtitle: 'Dictionary-based',
            icon: '📖',
            color: 'blue',
            border: 'border-blue-300',
            bg: 'bg-blue-50',
            items: [
              '预先定义积极/消极词表',
              '统计文本中正负词的数量',
              '简单直观，不需要训练数据',
              '无法处理讽刺、语境、否定',
            ],
          },
          {
            title: '机器学习法',
            subtitle: 'ML-based',
            icon: '🤖',
            color: 'purple',
            border: 'border-purple-300',
            bg: 'bg-purple-50',
            items: [
              '用标注数据训练分类模型',
              '自动学习词语的上下文关系',
              '精度更高，能处理复杂情况',
              '需要大量标注数据',
            ],
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.15 }}
            className={`p-5 rounded-2xl border-2 ${item.border} ${item.bg}`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{item.icon}</span>
              <span className="font-semibold text-slate-800">{item.title}</span>
              <span className={`px-2 py-0.5 rounded text-xs font-bold bg-${item.color}-200 text-${item.color}-700`}>{item.subtitle}</span>
            </div>
            <ul className="text-sm text-slate-600 space-y-1.5 list-disc pl-5">
              {item.items.map((text, j) => (
                <li key={j}>{text}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <SentimentScoreDemo />

      {/* ===== 词典法实现 ===== */}
      <h2>2. 词典法实现</h2>
      <p>
        词典法的核心非常简单：数一数文本中有多少积极词和消极词，做差得到情感分数。
      </p>

      <CodeBlock
        code={`# 中文情感词典示例（简化版）
positive_words = {'好', '棒', '优秀', '喜欢', '推荐', '满意', '精彩', '赞'}
negative_words = {'差', '烂', '糟', '失望', '难吃', '讨厌', '垃圾', '骗'}
negation_words = {'不', '没', '无', '别', '未', '莫'}  # 否定词

def sentiment_score(text, words):
    """计算情感分数，考虑否定词翻转"""
    score = 0
    tokens = list(text)  # 简单按字切分（实际应用应使用分词工具）
    for i, token in enumerate(tokens):
        if token in positive_words:
            # 检查前面是否有否定词
            if i > 0 and tokens[i-1] in negation_words:
                score -= 1  # "不好" → 消极
            else:
                score += 1
        elif token in negative_words:
            if i > 0 and tokens[i-1] in negation_words:
                score += 1  # "不差" → 积极
            else:
                score -= 1
    return score

# 测试
texts = [
    '这个产品质量很好',       # 积极
    '这个产品质量不好',       # 消极（否定翻转）
    '服务态度太差了',         # 消极
    '不差，但也不算好',       # 中性（互相抵消）
]
for t in texts:
    s = sentiment_score(t, None)
    label = '积极' if s > 0 else '消极' if s < 0 else '中性'
    print(f'{t} → {label} ({s:+d})')`}
        highlightLines={[4, 11, 12, 13]}
      />

      <div className="my-6 p-5 rounded-2xl border-2 border-amber-200 bg-amber-50">
        <h3 className="text-base font-semibold text-amber-800 mb-2">常用中文情感词典</h3>
        <ul className="text-amber-700 text-sm space-y-1.5">
          <li><strong>BosonNLP 情感词典</strong>：约 10 万条，包含情感极性和强度</li>
          <li><strong>知网（HowNet）情感词典</strong>：中英文双语，学术研究常用</li>
          <li><strong>大连理工情感词汇本体库</strong>：细粒度标注（喜、怒、哀、惧等）</li>
          <li><strong>NTUSD（台湾大学）</strong>：繁简中文情感词典</li>
        </ul>
      </div>

      {/* ===== 机器学习法 ===== */}
      <h2>3. 机器学习法实现</h2>
      <p>
        当你需要更高精度，或者词典法无法处理复杂语境时，用上一节学的文本分类方法即可——情感分析本质上就是一个分类问题。
      </p>

      <StepThrough
        steps={[
          {
            title: '准备标注数据',
            content: (
              <>
                <CodeBlock
                  code={`import pandas as pd

# 产品评论情感数据（实际研究中需要数百到数千条）
reviews = pd.DataFrame({
    'text': [
        '非常满意，物流很快！',
        '质量太差了，退货！',
        '还可以吧，一般般',
        '强烈推荐，物超所值',
        '收到货就坏了，垃圾',
    ],
    'sentiment': ['正面', '负面', '中性', '正面', '负面']
})`}
                  showLineNumbers={false}
                />
              </>
            ),
          },
          {
            title: '训练分类器',
            content: (
              <>
                <CodeBlock
                  code={`from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC
from sklearn.model_selection import cross_val_score

pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(analyzer='char_wb', ngram_range=(1, 4))),
    ('clf', LinearSVC(class_weight='balanced')),
])

# 交叉验证评估
scores = cross_val_score(pipeline, reviews['text'], reviews['sentiment'],
                         cv=5, scoring='f1_macro')
print(f'F1 = {scores.mean():.3f}')`}
                  showLineNumbers={false}
                />
              </>
            ),
          },
          {
            title: '预测新文本',
            content: (
              <>
                <CodeBlock
                  code={`# 训练最终模型
pipeline.fit(reviews['text'], reviews['sentiment'])

# 预测
new_texts = ['服务很好，下次还来', '等了三天还没发货']
predictions = pipeline.predict(new_texts)

for text, pred in zip(new_texts, predictions):
    print(f'{text} → {pred}')`}
                  showLineNumbers={false}
                />
              </>
            ),
          },
        ]}
      />

      {/* ===== 高级话题 ===== */}
      <h2>4. 进阶：细粒度情感分析</h2>
      <p>
        基础情感分析只区分正面/负面/中性。更精细的研究可能需要：
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold text-slate-700">粒度</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">示例</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">方法</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              ['二分类', '正面 / 负面', '标准分类器即可'],
              ['三分类', '正面 / 中性 / 负面', '标准分类器 + 中性类'],
              ['细粒度情感', '喜 / 怒 / 哀 / 惧 / 惊', '需要细粒度标注词典或数据'],
              ['方面级情感', '"菜好吃但服务差"', '抽取方面词 + 分别判断情感'],
              ['情感强度', '从 -1.0（极消极）到 +1.0（极积极）', '回归模型或情感词典的强度值'],
            ].map(([level, example, method], i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="px-4 py-3 font-semibold text-blue-700">{level}</td>
                <td className="px-4 py-3 text-slate-600">{example}</td>
                <td className="px-4 py-3 text-slate-500">{method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CodeBlock
        code={`# 方面级情感分析示例（概念演示）
text = '这家餐厅的菜品非常好吃，但是服务态度太差了。'

# 实际实现需要：
# 1. 方面词抽取：提取"菜品"和"服务"
# 2. 对每个方面词，判断其周围文本的情感
# 结果：菜品 → 正面，服务 → 负面

# 简化实现（基于依存句法分析）
import spacy
nlp = spacy.load('zh_core_web_sm')
doc = nlp(text)

# 查找与方面词相邻的情感词
aspects = {'菜品': None, '服务': None}
for token in doc:
    for aspect in aspects:
        if aspect in token.text:
            # 查找修饰该方面词的形容词
            for child in token.head.children:
                if child.pos_ == 'ADJ':
                    aspects[aspect] = child.text
print(aspects)  # {'菜品': '好吃', '服务': '差'}`}
        highlightLines={[12, 13]}
      />

      {/* ===== 注意事项 ===== */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
        <h3 className="text-lg font-semibold text-amber-800 mb-2">情感分析的局限性</h3>
        <ul className="text-amber-700 space-y-1.5 text-sm">
          <li><strong>讽刺和反语</strong>："真是太'棒'了"——字面是积极，实际是消极。词典法无法处理。</li>
          <li><strong>语境依赖</strong>："这个药很有效"——"有效"是积极词，但"药"的语境暗示生病。</li>
          <li><strong>否定和双重否定</strong>："不是不好"——到底是好还是不好？</li>
          <li><strong>领域差异</strong>：同一个词在不同领域情感不同（"冷"在餐厅评论 vs 空调评论中）。</li>
          <li><strong>文化差异</strong>：中文的"呵呵""还行"可能表达消极情感，但词典不一定收录。</li>
        </ul>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 my-6">
        <h3 className="text-base font-semibold text-blue-800 mb-2">研究建议</h3>
        <p className="text-blue-700 text-sm">
          如果你的研究目的是量化情感倾向（如追踪某话题的公众态度变化），词典法够用且可解释性好。
          如果需要精确判断每条文本的情感（如产品评论分类），优先用机器学习法。
          无论用哪种方法，<strong>务必人工验证一部分结果</strong>——报告模型的准确率和错误类型。
        </p>
      </div>
    </motion.div>
  );
}
