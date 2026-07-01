import{j as e,m as n}from"./index-BE2nR4qJ.js";function o(){const s=[{title:"特征提取",items:[{api:"CountVectorizer()",desc:"词袋模型（词频矩阵）",code:`vec = CountVectorizer(max_features=5000)
X = vec.fit_transform(texts)`},{api:"TfidfVectorizer()",desc:"TF-IDF 加权",code:`vec = TfidfVectorizer(analyzer='char_wb', ngram_range=(1,4))
X = vec.fit_transform(texts)`}]},{title:"分类器",items:[{api:"MultinomialNB()",desc:"朴素贝叶斯（快速基线）",code:`from sklearn.naive_bayes import MultinomialNB
clf = MultinomialNB()
clf.fit(X_train, y_train)`},{api:"LinearSVC()",desc:"线性 SVM（高精度）",code:`from sklearn.svm import LinearSVC
clf = LinearSVC(class_weight='balanced')
clf.fit(X_train, y_train)`},{api:"LogisticRegression()",desc:"逻辑回归（可解释）",code:`from sklearn.linear_model import LogisticRegression
clf = LogisticRegression(max_iter=1000)
clf.fit(X_train, y_train)`}]},{title:"模型评估",items:[{api:"train_test_split()",desc:"划分训练/测试集",code:`from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y)`},{api:"cross_val_score()",desc:"交叉验证",code:`from sklearn.model_selection import cross_val_score
scores = cross_val_score(clf, X, y, cv=5, scoring='f1_macro')`},{api:"classification_report()",desc:"分类报告",code:`from sklearn.metrics import classification_report
print(classification_report(y_test, y_pred))`}]},{title:"Pipeline（流水线）",items:[{api:"Pipeline()",desc:"串联多步操作",code:`from sklearn.pipeline import Pipeline
pipe = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('clf', LinearSVC()),
])
pipe.fit(texts, labels)
pipe.predict(['新文本'])`}]},{title:"聚类",items:[{api:"KMeans()",desc:"K 均值聚类",code:`from sklearn.cluster import KMeans
km = KMeans(n_clusters=5)
labels = km.fit_predict(X)`}]}];return e.jsxs(n.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.4},className:"content-prose",children:[e.jsx("h1",{children:"sklearn 速查表"}),e.jsx("p",{children:"scikit-learn 是 Python 中最通用的机器学习库。以下是语言学研究中最常用的 API 速查。"}),s.map((i,r)=>e.jsxs("div",{children:[e.jsx("h2",{children:i.title}),e.jsx("div",{className:"space-y-4",children:i.items.map((t,a)=>e.jsxs("div",{className:"p-4 rounded-2xl border-2 border-slate-200 bg-slate-50",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx("code",{className:"text-sm font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded",children:t.api}),e.jsx("span",{className:"text-sm text-slate-600",children:t.desc})]}),e.jsx("pre",{className:"bg-slate-800 text-slate-100 rounded-xl p-3 text-xs overflow-x-auto",children:e.jsx("code",{children:t.code})})]},a))})]},r)),e.jsx("h2",{children:"中文 NLP 常用设置"}),e.jsx("div",{className:"p-4 rounded-2xl border-2 border-amber-200 bg-amber-50",children:e.jsx("pre",{className:"bg-slate-800 text-slate-100 rounded-xl p-3 text-xs overflow-x-auto",children:e.jsx("code",{children:`# 中文文本分类推荐配置
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
vec = TfidfVectorizer(stop_words=stopwords)`})})})]})}export{o as default};
