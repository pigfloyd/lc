import{j as e,m as n,r as a}from"./index-BE2nR4qJ.js";import{C as d}from"./CodeBlock-DBaGKhuW.js";import{S as c}from"./StepThrough-D-27y0IR.js";function x(){const[s,r]=a.useState("国王"),i={国王:{王后:.92,王子:.88,权力:.75,城堡:.68,苹果:.12},王后:{国王:.92,公主:.87,王冠:.73,宫殿:.65,电脑:.1},语言:{语言学:.91,语法:.82,词汇:.8,沟通:.74,桌子:.15},语言学:{语言:.91,语音学:.86,句法学:.83,语料库:.78,烹饪:.08},猫:{狗:.85,宠物:.82,小猫:.9,动物:.76,汽车:.11}},o=i[s]||{};return e.jsxs("div",{className:"my-6 p-6 bg-white rounded-2xl border-2 border-slate-200 shadow-sm",children:[e.jsx("h3",{className:"text-lg font-semibold text-slate-800 mb-4",children:"词向量语义相似度演示"}),e.jsx("p",{className:"text-sm text-slate-600 mb-4",children:"选择一个词，查看它与其他词的语义相似度（模拟数据）。"}),e.jsx("div",{className:"flex gap-2 mb-4 flex-wrap",children:Object.keys(i).map(t=>e.jsx("button",{onClick:()=>r(t),className:`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${s===t?"bg-blue-600 text-white shadow-md":"bg-slate-100 text-slate-600 hover:bg-slate-200"}`,children:t},t))}),e.jsx("div",{className:"space-y-2",children:Object.entries(o).sort((t,l)=>l[1]-t[1]).map(([t,l])=>e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:"w-16 text-sm font-semibold text-slate-700 text-right",children:t}),e.jsx("div",{className:"flex-1 h-6 bg-slate-100 rounded-full overflow-hidden",children:e.jsx("div",{className:"h-full rounded-full transition-all duration-500",style:{width:`${l*100}%`,backgroundColor:l>.7?"#3b82f6":l>.4?"#f59e0b":"#94a3b8"}})}),e.jsx("span",{className:"w-12 text-xs font-mono text-slate-500",children:l.toFixed(2)})]},t))})]})}function j(){return e.jsxs(n.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.4},className:"content-prose",children:[e.jsx("h2",{children:"词向量入门"}),e.jsxs("p",{children:['传统方法把词当作独立的符号——"国王"和"王后"没有任何数学上的关系。',e.jsx("strong",{children:"词向量"}),"（word embedding）改变了这一切：它把每个词映射成一个",e.jsx("strong",{children:"数字向量"}),"（如 300 维）， 使得语义相近的词在向量空间中距离也近。"]}),e.jsxs("div",{className:"my-6 p-5 rounded-2xl border-2 border-blue-200 bg-blue-50",children:[e.jsx("h3",{className:"text-base font-semibold text-blue-800 mb-2",children:"直觉理解"}),e.jsxs("p",{className:"text-blue-700 text-sm",children:['想象一个巨大的多维空间。每个词是空间中的一个点。 "猫"和"狗"很近，"猫"和"汽车"很远。 更神奇的是，向量的',e.jsx("strong",{children:"方向"}),'编码了语义关系： "国王"→"王后" 的方向 ≈ "男人"→"女人" 的方向。']})]}),e.jsx(x,{}),e.jsx("h2",{children:"1. 核心概念"}),e.jsx("div",{className:"my-6 overflow-hidden rounded-2xl border-2 border-slate-200",children:e.jsxs("table",{className:"w-full text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-slate-50",children:[e.jsx("th",{className:"px-4 py-3 text-left font-semibold text-slate-700",children:"概念"}),e.jsx("th",{className:"px-4 py-3 text-left font-semibold text-slate-700",children:"含义"})]})}),e.jsx("tbody",{className:"divide-y divide-slate-100",children:[["维度（dimension）","向量的长度。常见 100-300 维。维度越高，表达能力越强，但需要更多数据。"],["余弦相似度","衡量两个向量方向的接近程度。范围 [-1, 1]，越接近 1 越相似。"],["分布式假设",'"一个词的含义由它周围的词决定"——这是 Word2Vec 的理论基础。'],["预训练模型","在大规模语料上训练好的词向量，可以直接下载使用。"]].map(([s,r],i)=>e.jsxs("tr",{className:i%2===0?"bg-white":"bg-slate-50",children:[e.jsx("td",{className:"px-4 py-3 font-semibold text-blue-700",children:s}),e.jsx("td",{className:"px-4 py-3 text-slate-600",children:r})]},i))})]})}),e.jsx("h2",{children:"2. 用 Gensim 训练 Word2Vec"}),e.jsxs("p",{children:[e.jsx("code",{children:"gensim"})," 是 Python 中最流行的词向量库。你可以用它训练自己的词向量，也可以加载预训练模型。"]}),e.jsx(c,{steps:[{title:"准备语料（分词后的句子列表）",content:e.jsx(e.Fragment,{children:e.jsx(d,{code:`# 语料需要是「句子列表，每个句子是词列表」的格式
sentences = [
    ['语言学', '是', '研究', '语言', '的', '科学'],
    ['语音学', '研究', '语音', '的', '物理', '属性'],
    ['句法学', '研究', '句子', '的', '结构', '规则'],
    ['语义学', '研究', '词语', '和', '句子', '的', '意义'],
    # ... 实际需要数万到数百万个句子
]`,showLineNumbers:!1})})},{title:"训练模型",content:e.jsx(e.Fragment,{children:e.jsx(d,{code:`from gensim.models import Word2Vec

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
model.save('my_word2vec.model')`,highlightLines:[4,5,6,7,8,9,10]})})},{title:"使用词向量",content:e.jsx(e.Fragment,{children:e.jsx(d,{code:`# 查看词向量
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
print(result)`,highlightLines:[6,12,16,17,18]})})}]}),e.jsx("h2",{children:"3. 使用预训练词向量"}),e.jsx("p",{children:"从头训练词向量需要大量语料。更常见的做法是下载别人在大规模语料上训练好的模型。"}),e.jsx(d,{code:`from gensim.models import KeyedVectors

# 加载预训练的中文词向量（如腾讯 AI Lab 开源的 200 维中文词向量）
# 下载地址: https://ai.tencent.com/ailab/nlp/en/embedding.html
wv = KeyedVectors.load_word2vec_format(
    'tencent-ailab-embedding-zh-d200-v0.2.0.txt',
    binary=False
)

# 现在可以直接使用
print(wv.most_similar('语言学', topn=5))
print(wv.similarity('猫', '狗'))`,highlightLines:[5,6,7]}),e.jsxs("div",{className:"my-6 p-5 rounded-2xl border-2 border-green-200 bg-green-50",children:[e.jsx("h3",{className:"text-base font-semibold text-green-800 mb-2",children:"常用中文预训练词向量"}),e.jsxs("ul",{className:"text-green-700 text-sm space-y-1",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"腾讯 AI Lab"}),"：200 维，覆盖 800 万中文词，质量高"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"百度百科 Word2Vec"}),"：300 维，百科领域"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"人民日报 Word2Vec"}),"：适合新闻语体研究"]})]})]}),e.jsx("h2",{children:"4. 语言学研究中的应用"}),e.jsx("div",{className:"my-6 space-y-3",children:[{title:"语义相似度计算",desc:'比较近义词、测量词汇距离。如：不同方言中"土豆"vs"马铃薯"vs"洋芋"的语义关系。',color:"blue"},{title:"词义变化追踪",desc:'用不同时期的语料训练词向量，追踪词义的历时变化。如："小姐"一词的语义演变。',color:"green"},{title:"类比关系发现",desc:'"北京之于中国 ≈ ? 之于日本"——词向量能自动发现国家-首都的类比关系。',color:"purple"},{title:"词汇聚类",desc:'对词向量做聚类，自动发现语义场。如：自动聚出"食物""动物""颜色"等类别。',color:"amber"}].map((s,r)=>e.jsxs(n.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.1+r*.1},className:`p-4 rounded-xl border-l-4 ${s.color==="blue"?"border-blue-400 bg-blue-50":s.color==="green"?"border-green-400 bg-green-50":s.color==="purple"?"border-purple-400 bg-purple-50":"border-amber-400 bg-amber-50"}`,children:[e.jsx("div",{className:"font-semibold text-slate-800",children:s.title}),e.jsx("p",{className:"text-sm text-slate-600 mt-1",children:s.desc})]},s.title))}),e.jsxs("div",{className:"bg-amber-50 border border-amber-200 rounded-xl p-5 my-6",children:[e.jsx("h3",{className:"text-lg font-semibold text-amber-800 mb-2",children:"注意事项"}),e.jsxs("ul",{className:"text-amber-700 space-y-1.5 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"语料偏差"}),'：词向量反映训练语料的偏见。如果语料中"护士"常和"女性"共现，词向量也会编码这种关联。']}),e.jsxs("li",{children:[e.jsx("strong",{children:"多义词"}),'："苹果"在 Word2Vec 中只有一个向量，无法区分水果和品牌。BERT 等上下文模型可以解决这个问题。']}),e.jsxs("li",{children:[e.jsx("strong",{children:"不在词表中的词"}),"：罕见词或新词可能没有预训练向量。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"不是万能的"}),"：词向量是很好的特征，但不能替代严谨的实验设计和统计分析。"]})]})]})]})}export{j as default};
