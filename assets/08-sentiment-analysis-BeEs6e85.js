import{j as e,m as p,r as N}from"./index-BE2nR4qJ.js";import{C as o}from"./CodeBlock-DBaGKhuW.js";import{S as v}from"./StepThrough-D-27y0IR.js";function y(){const[s,t]=N.useState("这家餐厅的菜品非常好吃，服务也很周到！"),n=["好","棒","优秀","喜欢","推荐","满意","周到","好吃","赞","完美","精彩","感谢","不错"],r=["差","烂","糟","失望","难吃","恶劣","讨厌","垃圾","骗","慢","贵","坏"],b=s.split("");let c=0,x=0;const j=b.map((i,d)=>{const h=s.slice(Math.max(0,d-1),d+2),f=n.some(m=>h.includes(m)),u=r.some(m=>h.includes(m));return f?(c++,e.jsx("span",{className:"text-green-600 font-semibold bg-green-50 rounded px-0.5",children:i},d)):u?(x++,e.jsx("span",{className:"text-red-600 font-semibold bg-red-50 rounded px-0.5",children:i},d)):e.jsx("span",{children:i},d)}),a=c-x,g=a>0?"积极":a<0?"消极":"中性",l=a>0?"green":a<0?"red":"slate";return e.jsxs("div",{className:"my-6 p-6 bg-white rounded-2xl border-2 border-slate-200 shadow-sm",children:[e.jsx("h3",{className:"text-lg font-semibold text-slate-800 mb-4",children:"词典法情感分析演示"}),e.jsx("p",{className:"text-sm text-slate-600 mb-3",children:"输入文本，查看哪些词被识别为积极（绿色）或消极（红色）。"}),e.jsx("textarea",{value:s,onChange:i=>t(i.target.value),className:"w-full p-3 border-2 border-slate-200 rounded-xl text-sm mb-4 focus:border-blue-400 focus:outline-none",rows:3}),e.jsx("div",{className:"p-3 bg-slate-50 rounded-xl mb-4 text-sm leading-relaxed",children:j}),e.jsxs("div",{className:"grid grid-cols-3 gap-3",children:[e.jsxs("div",{className:"p-3 rounded-xl bg-green-50 border border-green-200 text-center",children:[e.jsx("div",{className:"text-xs text-green-600",children:"积极词"}),e.jsx("div",{className:"text-xl font-bold text-green-800",children:c})]}),e.jsxs("div",{className:"p-3 rounded-xl bg-red-50 border border-red-200 text-center",children:[e.jsx("div",{className:"text-xs text-red-600",children:"消极词"}),e.jsx("div",{className:"text-xl font-bold text-red-800",children:x})]}),e.jsxs("div",{className:`p-3 rounded-xl border text-center ${l==="green"?"bg-green-50 border-green-200":l==="red"?"bg-red-50 border-red-200":"bg-slate-50 border-slate-200"}`,children:[e.jsx("div",{className:`text-xs ${l==="green"?"text-green-600":l==="red"?"text-red-600":"text-slate-600"}`,children:"判断"}),e.jsx("div",{className:`text-xl font-bold ${l==="green"?"text-green-800":l==="red"?"text-red-800":"text-slate-800"}`,children:g})]})]})]})}function L(){return e.jsxs(p.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.4},className:"content-prose",children:[e.jsx("h2",{children:"情感与态度分析"}),e.jsxs("p",{children:["情感分析（sentiment analysis）是文本分类的一个特殊分支：判断文本表达的是",e.jsx("strong",{children:"正面、负面还是中性"}),"的态度。 它在话语分析、社会语言学、语用学研究中都有广泛应用。"]}),e.jsxs("div",{className:"my-6 p-5 rounded-2xl border-2 border-blue-200 bg-blue-50",children:[e.jsx("h3",{className:"text-base font-semibold text-blue-800 mb-2",children:"语言学研究中的应用场景"}),e.jsxs("ul",{className:"text-blue-700 text-sm space-y-1",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"话语分析"}),"：社交媒体上对某语言政策的态度倾向"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"语用学"}),`：讽刺和反语的识别（"真是太'棒'了"）`]}),e.jsxs("li",{children:[e.jsx("strong",{children:"社会语言学"}),"：不同群体对语言变体的态度差异"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"二语习得"}),"：学习者反馈中的情感倾向分析"]})]})]}),e.jsx("h2",{children:"1. 两种方法：词典法 vs 机器学习法"}),e.jsx("div",{className:"my-6 grid md:grid-cols-2 gap-4",children:[{title:"词典法",subtitle:"Dictionary-based",icon:"📖",color:"blue",border:"border-blue-300",bg:"bg-blue-50",items:["预先定义积极/消极词表","统计文本中正负词的数量","简单直观，不需要训练数据","无法处理讽刺、语境、否定"]},{title:"机器学习法",subtitle:"ML-based",icon:"🤖",color:"purple",border:"border-purple-300",bg:"bg-purple-50",items:["用标注数据训练分类模型","自动学习词语的上下文关系","精度更高，能处理复杂情况","需要大量标注数据"]}].map((s,t)=>e.jsxs(p.div,{initial:{opacity:0,x:t===0?-20:20},animate:{opacity:1,x:0},transition:{delay:.2+t*.15},className:`p-5 rounded-2xl border-2 ${s.border} ${s.bg}`,children:[e.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[e.jsx("span",{className:"text-xl",children:s.icon}),e.jsx("span",{className:"font-semibold text-slate-800",children:s.title}),e.jsx("span",{className:`px-2 py-0.5 rounded text-xs font-bold bg-${s.color}-200 text-${s.color}-700`,children:s.subtitle})]}),e.jsx("ul",{className:"text-sm text-slate-600 space-y-1.5 list-disc pl-5",children:s.items.map((n,r)=>e.jsx("li",{children:n},r))})]},s.title))}),e.jsx(y,{}),e.jsx("h2",{children:"2. 词典法实现"}),e.jsx("p",{children:"词典法的核心非常简单：数一数文本中有多少积极词和消极词，做差得到情感分数。"}),e.jsx(o,{code:`# 中文情感词典示例（简化版）
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
    print(f'{t} → {label} ({s:+d})')`,highlightLines:[4,11,12,13]}),e.jsxs("div",{className:"my-6 p-5 rounded-2xl border-2 border-amber-200 bg-amber-50",children:[e.jsx("h3",{className:"text-base font-semibold text-amber-800 mb-2",children:"常用中文情感词典"}),e.jsxs("ul",{className:"text-amber-700 text-sm space-y-1.5",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"BosonNLP 情感词典"}),"：约 10 万条，包含情感极性和强度"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"知网（HowNet）情感词典"}),"：中英文双语，学术研究常用"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"大连理工情感词汇本体库"}),"：细粒度标注（喜、怒、哀、惧等）"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"NTUSD（台湾大学）"}),"：繁简中文情感词典"]})]})]}),e.jsx("h2",{children:"3. 机器学习法实现"}),e.jsx("p",{children:"当你需要更高精度，或者词典法无法处理复杂语境时，用上一节学的文本分类方法即可——情感分析本质上就是一个分类问题。"}),e.jsx(v,{steps:[{title:"准备标注数据",content:e.jsx(e.Fragment,{children:e.jsx(o,{code:`import pandas as pd

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
})`,showLineNumbers:!1})})},{title:"训练分类器",content:e.jsx(e.Fragment,{children:e.jsx(o,{code:`from sklearn.pipeline import Pipeline
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
print(f'F1 = {scores.mean():.3f}')`,showLineNumbers:!1})})},{title:"预测新文本",content:e.jsx(e.Fragment,{children:e.jsx(o,{code:`# 训练最终模型
pipeline.fit(reviews['text'], reviews['sentiment'])

# 预测
new_texts = ['服务很好，下次还来', '等了三天还没发货']
predictions = pipeline.predict(new_texts)

for text, pred in zip(new_texts, predictions):
    print(f'{text} → {pred}')`,showLineNumbers:!1})})}]}),e.jsx("h2",{children:"4. 进阶：细粒度情感分析"}),e.jsx("p",{children:"基础情感分析只区分正面/负面/中性。更精细的研究可能需要："}),e.jsx("div",{className:"my-6 overflow-hidden rounded-2xl border-2 border-slate-200",children:e.jsxs("table",{className:"w-full text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-slate-50",children:[e.jsx("th",{className:"px-4 py-3 text-left font-semibold text-slate-700",children:"粒度"}),e.jsx("th",{className:"px-4 py-3 text-left font-semibold text-slate-700",children:"示例"}),e.jsx("th",{className:"px-4 py-3 text-left font-semibold text-slate-700",children:"方法"})]})}),e.jsx("tbody",{className:"divide-y divide-slate-100",children:[["二分类","正面 / 负面","标准分类器即可"],["三分类","正面 / 中性 / 负面","标准分类器 + 中性类"],["细粒度情感","喜 / 怒 / 哀 / 惧 / 惊","需要细粒度标注词典或数据"],["方面级情感",'"菜好吃但服务差"',"抽取方面词 + 分别判断情感"],["情感强度","从 -1.0（极消极）到 +1.0（极积极）","回归模型或情感词典的强度值"]].map(([s,t,n],r)=>e.jsxs("tr",{className:r%2===0?"bg-white":"bg-slate-50",children:[e.jsx("td",{className:"px-4 py-3 font-semibold text-blue-700",children:s}),e.jsx("td",{className:"px-4 py-3 text-slate-600",children:t}),e.jsx("td",{className:"px-4 py-3 text-slate-500",children:n})]},r))})]})}),e.jsx(o,{code:`# 方面级情感分析示例（概念演示）
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
print(aspects)  # {'菜品': '好吃', '服务': '差'}`,highlightLines:[12,13]}),e.jsxs("div",{className:"bg-amber-50 border border-amber-200 rounded-xl p-5 my-6",children:[e.jsx("h3",{className:"text-lg font-semibold text-amber-800 mb-2",children:"情感分析的局限性"}),e.jsxs("ul",{className:"text-amber-700 space-y-1.5 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"讽刺和反语"}),`："真是太'棒'了"——字面是积极，实际是消极。词典法无法处理。`]}),e.jsxs("li",{children:[e.jsx("strong",{children:"语境依赖"}),'："这个药很有效"——"有效"是积极词，但"药"的语境暗示生病。']}),e.jsxs("li",{children:[e.jsx("strong",{children:"否定和双重否定"}),'："不是不好"——到底是好还是不好？']}),e.jsxs("li",{children:[e.jsx("strong",{children:"领域差异"}),'：同一个词在不同领域情感不同（"冷"在餐厅评论 vs 空调评论中）。']}),e.jsxs("li",{children:[e.jsx("strong",{children:"文化差异"}),'：中文的"呵呵""还行"可能表达消极情感，但词典不一定收录。']})]})]}),e.jsxs("div",{className:"bg-blue-50 border border-blue-200 rounded-xl p-5 my-6",children:[e.jsx("h3",{className:"text-base font-semibold text-blue-800 mb-2",children:"研究建议"}),e.jsxs("p",{className:"text-blue-700 text-sm",children:["如果你的研究目的是量化情感倾向（如追踪某话题的公众态度变化），词典法够用且可解释性好。 如果需要精确判断每条文本的情感（如产品评论分类），优先用机器学习法。 无论用哪种方法，",e.jsx("strong",{children:"务必人工验证一部分结果"}),"——报告模型的准确率和错误类型。"]})]})]})}export{L as default};
