import { motion } from 'framer-motion';

export default function Appendix() {
  const sections = [
    {
      title: '特征提取',
      items: [
        { api: 'CountVectorizer()', desc: '词袋模型（词频矩阵）', code: "vec = CountVectorizer(max_features=5000)\nX = vec.fit_transform(texts)" },
        { api: 'TfidfVectorizer()', desc: 'TF-IDF 加权', code: "vec = TfidfVectorizer(analyzer='char_wb', ngram_range=(1,4))\nX = vec.fit_transform(texts)" },
      ],
    },
    {
      title: '分类器',
      items: [
        { api: 'MultinomialNB()', desc: '朴素贝叶斯（快速基线）', code: "from sklearn.naive_bayes import MultinomialNB\nclf = MultinomialNB()\nclf.fit(X_train, y_train)" },
        { api: 'LinearSVC()', desc: '线性 SVM（高精度）', code: "from sklearn.svm import LinearSVC\nclf = LinearSVC(class_weight='balanced')\nclf.fit(X_train, y_train)" },
        { api: 'LogisticRegression()', desc: '逻辑回归（可解释）', code: "from sklearn.linear_model import LogisticRegression\nclf = LogisticRegression(max_iter=1000)\nclf.fit(X_train, y_train)" },
      ],
    },
    {
      title: '模型评估',
      items: [
        { api: 'train_test_split()', desc: '划分训练/测试集', code: "from sklearn.model_selection import train_test_split\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, stratify=y)" },
        { api: 'cross_val_score()', desc: '交叉验证', code: "from sklearn.model_selection import cross_val_score\nscores = cross_val_score(clf, X, y, cv=5, scoring='f1_macro')" },
        { api: 'classification_report()', desc: '分类报告', code: "from sklearn.metrics import classification_report\nprint(classification_report(y_test, y_pred))" },
      ],
    },
    {
      title: 'Pipeline（流水线）',
      items: [
        { api: 'Pipeline()', desc: '串联多步操作', code: "from sklearn.pipeline import Pipeline\npipe = Pipeline([\n    ('tfidf', TfidfVectorizer()),\n    ('clf', LinearSVC()),\n])\npipe.fit(texts, labels)\npipe.predict(['新文本'])" },
      ],
    },
    {
      title: '聚类',
      items: [
        { api: 'KMeans()', desc: 'K 均值聚类', code: "from sklearn.cluster import KMeans\nkm = KMeans(n_clusters=5)\nlabels = km.fit_predict(X)" },
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="content-prose"
    >
      <h1>sklearn 速查表</h1>
      <p>
        scikit-learn 是 Python 中最通用的机器学习库。以下是语言学研究中最常用的 API 速查。
      </p>

      {sections.map((section, si) => (
        <div key={si}>
          <h2>{section.title}</h2>
          <div className="space-y-4">
            {section.items.map((item, ii) => (
              <div key={ii} className="p-4 rounded-2xl border-2 border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2 mb-2">
                  <code className="text-sm font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">{item.api}</code>
                  <span className="text-sm text-slate-600">{item.desc}</span>
                </div>
                <pre className="bg-slate-800 text-slate-100 rounded-xl p-3 text-xs overflow-x-auto"><code>{item.code}</code></pre>
              </div>
            ))}
          </div>
        </div>
      ))}

      <h2>中文 NLP 常用设置</h2>
      <div className="p-4 rounded-2xl border-2 border-amber-200 bg-amber-50">
        <pre className="bg-slate-800 text-slate-100 rounded-xl p-3 text-xs overflow-x-auto"><code>{`# 中文文本分类推荐配置
from sklearn.feature_extraction.text import TfidfVectorizer
vec = TfidfVectorizer(
    analyzer='char_wb',     # 字符级 n-gram（避免分词依赖）
    ngram_range=(1, 4),     # 1-4 字符组合
    max_features=10000,     # 最多 1 万个特征
    sublinear_tf=True,      # 用 1 + log(tf) 代替 tf
)

# 处理类别不平衡
clf = LinearSVC(class_weight='balanced')

# 自定义停用词
stopwords = ['的', '了', '是', '在', '和', '有', '就', '不', '也', '这']
vec = TfidfVectorizer(stop_words=stopwords)`}</code></pre>
      </div>
    </motion.div>
  );
}
