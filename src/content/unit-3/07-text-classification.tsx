import { useState } from 'react';
import { motion } from 'framer-motion';
import CodeBlock from '../../components/shared/CodeBlock';
import StepThrough from '../../components/shared/StepThrough';

// ── Pipeline Visualizer ──────────────────────────────────────────
function PipelineVisualizer() {
  const [step, setStep] = useState(0);
  const steps = [
    { label: '原始文本', detail: '"今天天气真好，适合出去走走"', color: 'slate' },
    { label: '分词', detail: '["今天", "天气", "真好", "适合", "出去", "走走"]', color: 'blue' },
    { label: '向量化', detail: '[0, 0, 1, 0, 1, 0, 0, 1, ...]  （词袋模型）', color: 'purple' },
    { label: '分类器', detail: 'MultinomialNB → 预测类别：积极', color: 'green' },
  ];

  return (
    <div className="my-6 p-6 bg-white rounded-2xl border-2 border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">文本分类流水线</h3>
      <p className="text-sm text-slate-600 mb-4">点击每一步，查看数据如何从原始文本变成分类结果。</p>
      <div className="flex gap-2 mb-4">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              step === i
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className={`p-4 rounded-xl border-2 ${
        step === 0 ? 'border-slate-300 bg-slate-50' :
        step === 1 ? 'border-blue-300 bg-blue-50' :
        step === 2 ? 'border-purple-300 bg-purple-50' :
        'border-green-300 bg-green-50'
      }`}>
        <div className="font-semibold text-slate-800 mb-1">第 {step + 1} 步：{steps[step].label}</div>
        <p className="font-mono text-sm text-slate-700">{steps[step].detail}</p>
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
      <h2>文本分类</h2>
      <p>
        文本分类是自然语言处理中最基础、应用最广的任务之一：给定一段文本，自动判断它属于哪个类别。
        语言学研究中有大量问题可以转化为分类问题。
      </p>

      <div className="my-6 p-5 rounded-2xl border-2 border-blue-200 bg-blue-50">
        <h3 className="text-base font-semibold text-blue-800 mb-2">语言学中的分类场景</h3>
        <ul className="text-blue-700 text-sm space-y-1">
          <li><strong>语体识别</strong>：这段文字是口语还是书面语？</li>
          <li><strong>方言分类</strong>：这段录音属于哪个方言区？</li>
          <li><strong>文体分类</strong>：这篇论文是实验研究还是综述？</li>
          <li><strong>语言识别</strong>：这条推文是中文还是日文？</li>
          <li><strong>情感分类</strong>：这条评论是正面还是负面？（下一节详解）</li>
        </ul>
      </div>

      <PipelineVisualizer />

      {/* ===== 核心概念 ===== */}
      <h2>1. 核心概念：监督学习</h2>
      <p>
        文本分类属于<strong>监督学习</strong>（supervised learning）：你先提供一批<strong>已标注</strong>的文本（训练数据），
        让模型学习文本特征和类别之间的关系，然后用训练好的模型去预测<strong>未标注</strong>文本的类别。
      </p>

      <StepThrough
        steps={[
          {
            title: '准备标注数据',
            content: (
              <>
                <p className="text-sm text-slate-600 mb-2">每条文本对应一个标签。标注质量直接决定分类效果。</p>
                <CodeBlock
                  code={`import pandas as pd

# 已标注的训练数据
train_data = pd.DataFrame({
    'text': [
        '今天天气真好',
        '这个产品质量太差了',
        '会议将于明天下午举行',
        '非常感谢你的帮助！',
        '服务态度恶劣，再也不来了',
        '请在截止日期前提交报告',
    ],
    'label': ['中性', '负面', '中性', '正面', '负面', '中性'],
})

print(train_data['label'].value_counts())`}
                  showLineNumbers={false}
                />
              </>
            ),
          },
          {
            title: '文本向量化（特征提取）',
            content: (
              <>
                <p className="text-sm text-slate-600 mb-2">计算机不能直接处理文字，需要把文本转成数字向量。</p>
                <CodeBlock
                  code={`from sklearn.feature_extraction.text import CountVectorizer

# 词袋模型：统计每个词出现的次数
vectorizer = CountVectorizer()
X_train = vectorizer.fit_transform(train_data['text'])

print(f'词汇表大小: {len(vectorizer.vocabulary_)}')
print(f'特征矩阵形状: {X_train.shape}')  # (样本数, 词汇数)`}
                  showLineNumbers={false}
                />
                <p className="text-sm text-slate-600 mt-2">
                  词袋模型把每段文本变成一个长向量，每个维度对应一个词，值是该词出现的次数。
                </p>
              </>
            ),
          },
          {
            title: '训练分类器',
            content: (
              <>
                <CodeBlock
                  code={`from sklearn.naive_bayes import MultinomialNB

# 朴素贝叶斯分类器——文本分类的经典基线
clf = MultinomialNB()
clf.fit(X_train, train_data['label'])

# 预测新文本
X_new = vectorizer.transform(['东西不错，推荐购买'])
prediction = clf.predict(X_new)
print(f'预测类别: {prediction[0]}')  # 正面`}
                  showLineNumbers={false}
                />
              </>
            ),
          },
        ]}
      />

      {/* ===== sklearn Pipeline ===== */}
      <h2>2. sklearn Pipeline：一行代码串联全流程</h2>
      <p>
        <code>Pipeline</code> 把向量化和分类器打包在一起，代码更简洁，也不容易出错（比如忘记对测试集用同一个 vectorizer）。
      </p>

      <CodeBlock
        code={`from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

# 构建流水线：TF-IDF 向量化 → 朴素贝叶斯分类
pipeline = Pipeline([
    ('tfidf', TfidfVectorizer()),   # 第 1 步：文本 → TF-IDF 向量
    ('clf', MultinomialNB()),       # 第 2 步：向量 → 分类
])

# 训练
pipeline.fit(train_data['text'], train_data['label'])

# 预测
result = pipeline.predict(['这个产品非常好用'])
print(f'预测: {result[0]}')`}
        highlightLines={[7, 8, 9]}
      />

      <div className="my-6 p-5 rounded-2xl border-2 border-green-200 bg-green-50">
        <h3 className="text-base font-semibold text-green-800 mb-2">TF-IDF vs 词袋模型</h3>
        <p className="text-green-700 text-sm">
          <code>TfidfVectorizer</code> 比 <code>CountVectorizer</code> 更常用。它不仅看词频，还会降低常见词（如"的""是"）的权重，
          提升有区分力的词的权重。大多数文本分类任务优先用 TF-IDF。
        </p>
      </div>

      {/* ===== 训练/测试集划分 ===== */}
      <h2>3. 评估：训练集 vs 测试集</h2>
      <p>
        模型在训练数据上表现好不代表它真的学会了——它可能只是"背答案"。需要用<strong>模型没见过的数据</strong>来评估真实能力。
      </p>

      <CodeBlock
        code={`from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# 划分训练集（80%）和测试集（20%）
X_train, X_test, y_train, y_test = train_test_split(
    train_data['text'], train_data['label'],
    test_size=0.2, random_state=42, stratify=train_data['label']
)

# 训练
pipeline.fit(X_train, y_train)

# 评估
y_pred = pipeline.predict(X_test)
print(classification_report(y_test, y_pred))`}
        highlightLines={[5, 6, 7, 14]}
      />

      <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold text-slate-700">指标</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">含义</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">何时关注</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              ['Precision（精确率）', '预测为 A 的文本中，真正是 A 的比例', '误判代价高时（如将中性误判为负面）'],
              ['Recall（召回率）', '所有真正是 A 的文本中，被正确识别的比例', '漏判代价高时（如不能漏掉任何负面）'],
              ['F1 Score', '精确率和召回率的调和平均', '综合评估，最常用的单一指标'],
              ['Accuracy（准确率）', '所有预测中正确的比例', '类别均衡时使用；类别不均衡时会误导'],
            ].map(([metric, meaning, when], i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="px-4 py-3 font-semibold text-blue-700">{metric}</td>
                <td className="px-4 py-3 text-slate-600">{meaning}</td>
                <td className="px-4 py-3 text-slate-500 text-xs">{when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== 实战示例 ===== */}
      <h2>4. 实战：语体分类</h2>
      <p>
        下面是一个完整的语言学研究场景：用机器学习区分学术论文摘要和新闻报道。
      </p>

      <CodeBlock
        code={`from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC
from sklearn.model_selection import cross_val_score

# 假设已有标注数据
texts = [
    '本研究采用实验法考察了二语习得中的迁移效应...',
    '昨日，某市发生了一起交通事故，造成三人受伤...',
    # ... 更多数据
]
labels = ['academic', 'news', ...]

# SVM 分类器（文本分类的经典选择，通常比朴素贝叶斯更强）
pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(
        analyzer='char_wb',  # 字符级 n-gram，适合中文
        ngram_range=(1, 4),  # 1 到 4 个字符的组合
    )),
    ('clf', LinearSVC()),
])

# 5 折交叉验证
scores = cross_val_score(pipeline, texts, labels, cv=5, scoring='f1_macro')
print(f'F1 = {scores.mean():.3f} ± {scores.std():.3f}')`}
        highlightLines={[17, 18, 19, 23, 24]}
      />

      <div className="my-6 p-5 rounded-2xl border-2 border-amber-200 bg-amber-50">
        <h3 className="text-base font-semibold text-amber-800 mb-2">中文文本分类的注意事项</h3>
        <ul className="text-amber-700 text-sm space-y-1.5">
          <li><strong>分词 vs 字符级</strong>：中文分词不一定完美，字符级 n-gram（<code>analyzer='char_wb'</code>）有时效果更好</li>
          <li><strong>停用词</strong>：可以用 <code>stop_words</code> 参数去除常见虚词，但需自己准备中文停用词表</li>
          <li><strong>数据量</strong>：每类至少需要几百条标注数据才能训练出可靠的模型</li>
          <li><strong>类别均衡</strong>：如果某类数据特别少，模型会偏向多数类——用 <code>class_weight='balanced'</code> 参数</li>
        </ul>
      </div>

      {/* ===== 其他分类器 ===== */}
      <h2>5. 常用分类器对比</h2>

      <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold text-slate-700">分类器</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">特点</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">适用场景</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              ['MultinomialNB', '快速、简单、小样本友好', '数据少时的基线模型'],
              ['LinearSVC', '高精度、适合高维稀疏数据', '中大规模文本分类的首选'],
              ['LogisticRegression', '可解释性好、输出概率', '需要概率输出时'],
              ['RandomForest', '不易过拟合、能处理非线性', '特征不全是文本时（混合特征）'],
            ].map(([clf, feature, scenario], i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="px-4 py-3 font-mono text-blue-700 text-xs">{clf}</td>
                <td className="px-4 py-3 text-slate-600">{feature}</td>
                <td className="px-4 py-3 text-slate-500">{scenario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 my-6">
        <h3 className="text-base font-semibold text-blue-800 mb-2">实践建议</h3>
        <p className="text-blue-700 text-sm">
          先用 <code>TfidfVectorizer + LinearSVC</code> 作为基线。如果效果不够好，
          再尝试调整 n-gram 范围、加入字符级特征、或换用更复杂的模型。
          不要一开始就上深度学习——对大多数语言学分类任务，传统机器学习足够好。
        </p>
      </div>
    </motion.div>
  );
}
