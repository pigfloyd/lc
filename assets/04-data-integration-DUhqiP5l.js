import{j as e,m as n,r as o}from"./index-BE2nR4qJ.js";import{C as t}from"./CodeBlock-DBaGKhuW.js";import{S as i}from"./StepThrough-D-27y0IR.js";function a(){const[s,r]=o.useState("concat");return e.jsxs("div",{className:"my-6 p-6 bg-white rounded-2xl border-2 border-slate-200 shadow-sm",children:[e.jsx("h3",{className:"text-lg font-semibold text-slate-800 mb-4",children:"数据合并方式对比"}),e.jsxs("div",{className:"flex gap-2 mb-4",children:[e.jsx("button",{onClick:()=>r("concat"),className:`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${s==="concat"?"bg-blue-600 text-white shadow-md":"bg-slate-100 text-slate-600 hover:bg-slate-200"}`,children:"concat（上下拼接）"}),e.jsx("button",{onClick:()=>r("merge"),className:`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${s==="merge"?"bg-blue-600 text-white shadow-md":"bg-slate-100 text-slate-600 hover:bg-slate-200"}`,children:"merge（左右关联）"})]}),s==="concat"?e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("div",{className:"flex-1 p-3 rounded-xl bg-blue-50 border border-blue-200 text-center",children:[e.jsx("div",{className:"text-xs text-blue-600 font-semibold mb-1",children:"语料 A（新闻）"}),e.jsx("div",{className:"font-mono text-xs text-slate-700",children:"100 篇文章"})]}),e.jsx("div",{className:"text-2xl text-slate-400",children:"+"}),e.jsxs("div",{className:"flex-1 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center",children:[e.jsx("div",{className:"text-xs text-emerald-600 font-semibold mb-1",children:"语料 B（论坛）"}),e.jsx("div",{className:"font-mono text-xs text-slate-700",children:"200 篇帖子"})]})]}),e.jsx("div",{className:"text-center text-slate-400 text-2xl",children:"↓ pd.concat()"}),e.jsxs("div",{className:"p-3 rounded-xl bg-purple-50 border border-purple-200 text-center",children:[e.jsx("div",{className:"text-xs text-purple-600 font-semibold mb-1",children:"合并后"}),e.jsx("div",{className:"font-mono text-xs text-slate-700",children:"300 行 × 相同列"})]}),e.jsx("p",{className:"text-sm text-slate-600",children:"上下拼接——两个表的列名相同，把行堆在一起。"})]}):e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-start gap-4",children:[e.jsxs("div",{className:"flex-1 p-3 rounded-xl bg-blue-50 border border-blue-200 text-center",children:[e.jsx("div",{className:"text-xs text-blue-600 font-semibold mb-1",children:"词频表"}),e.jsx("div",{className:"font-mono text-xs text-slate-700",children:"word, freq"})]}),e.jsx("div",{className:"text-2xl text-slate-400 mt-4",children:"+"}),e.jsxs("div",{className:"flex-1 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center",children:[e.jsx("div",{className:"text-xs text-emerald-600 font-semibold mb-1",children:"词性标注"}),e.jsx("div",{className:"font-mono text-xs text-slate-700",children:"word, pos"})]})]}),e.jsx("div",{className:"text-center text-slate-400 text-2xl",children:"↓ pd.merge(on='word')"}),e.jsxs("div",{className:"p-3 rounded-xl bg-purple-50 border border-purple-200 text-center",children:[e.jsx("div",{className:"text-xs text-purple-600 font-semibold mb-1",children:"合并后"}),e.jsx("div",{className:"font-mono text-xs text-slate-700",children:"word, freq, pos"})]}),e.jsx("p",{className:"text-sm text-slate-600",children:"左右关联——通过共同列（如 word）把两个表的信息合并到一起。"})]})]})}function p(){return e.jsxs(n.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.4},className:"content-prose",children:[e.jsx("h2",{children:"多源数据整合"}),e.jsx("p",{children:'做研究时，你的数据往往来自多个渠道：问卷结果是一个文件，语料标注是另一个文件， 词频统计又是一个文件。要让它们"合体"成一张表才能分析。'}),e.jsx(a,{}),e.jsx("h2",{children:"1. pd.concat：上下拼接"}),e.jsxs("p",{children:["当多个数据表的",e.jsx("strong",{children:"列名相同"}),"，只是行数不同（比如来自不同语料库的同类型数据），用 ",e.jsx("code",{children:"pd.concat"})," 把它们堆在一起。"]}),e.jsx(t,{code:`import pandas as pd

# 读取多个语料文件
news = pd.read_csv('news_corpus.csv')      # 100 篇新闻
forum = pd.read_csv('forum_posts.csv')     # 200 篇论坛帖子
blog = pd.read_csv('blog_texts.csv')       # 50 篇博客

# 上下拼接
corpus = pd.concat([news, forum, blog], ignore_index=True)
print(f'合并后: {len(corpus)} 行')

# 检查是否成功
print(corpus['source'].value_counts())`,highlightLines:[9,10]}),e.jsxs("div",{className:"my-6 p-5 rounded-2xl border-2 border-amber-200 bg-amber-50",children:[e.jsx("h3",{className:"text-base font-semibold text-amber-800 mb-2",children:"ignore_index=True 很重要"}),e.jsxs("p",{className:"text-amber-700 text-sm",children:["不加这个参数，拼接后的 DataFrame 会保留原来的行号（0-99, 0-199, 0-49），导致重复索引。 加上 ",e.jsx("code",{children:"ignore_index=True"})," 会生成全新的连续行号（0-349）。"]})]}),e.jsx("h2",{children:"2. pd.merge：左右关联"}),e.jsxs("p",{children:["当两个表有",e.jsx("strong",{children:"共同的列"}),"（如词形、说话人 ID），可以用 ",e.jsx("code",{children:"pd.merge"})," 把信息合并到一起——类似 Excel 的 VLOOKUP。"]}),e.jsx(i,{steps:[{title:"基本合并",content:e.jsxs(e.Fragment,{children:[e.jsx(t,{code:`# 词频表
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
print(result)`,highlightLines:[14]}),e.jsx("p",{className:"text-sm text-slate-600 mt-2",children:"结果：一张表同时有词频和词性信息。"})]})},{title:"处理列名不同的情况",content:e.jsx(e.Fragment,{children:e.jsx(t,{code:`# 两个表的键列名不一样
freq = pd.DataFrame({'token': ['语言', '语料'], 'freq': [1200, 800]})
pos  = pd.DataFrame({'word':  ['语言', '语料'], 'pos':  ['noun', 'noun']})

# 用 left_on 和 right_on 指定各自的键列
result = pd.merge(freq, pos, left_on='token', right_on='word')
print(result)`,highlightLines:[6]})})},{title:"合并方式：inner / outer / left / right",content:e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"text-sm text-slate-600 mb-2",children:"当两个表的键不完全匹配时，合并方式决定保留哪些行："}),e.jsx(t,{code:`# inner（默认）：只保留两边都有的
inner = pd.merge(freq, pos, on='word', how='inner')

# outer：保留所有行，缺失的地方填 NaN
outer = pd.merge(freq, pos, on='word', how='outer')

# left：保留左边表的所有行
left = pd.merge(freq, pos, on='word', how='left')`,highlightLines:[2,5,8]})]})}]}),e.jsx("h2",{children:"3. 合并后的数据探查"}),e.jsxs("p",{children:["数据合并完成后，第一件事不是马上分析，而是",e.jsx("strong",{children:"检查数据质量"}),"。"]}),e.jsx(t,{code:`# 基本信息：行数、列名、数据类型、缺失值
corpus.info()

# 数值列的统计摘要
corpus.describe()

# 检查缺失值
print(corpus.isnull().sum())

# 检查分类列的分布
print(corpus['source'].value_counts())
print(corpus['language'].value_counts())

# 抽样查看
print(corpus.sample(5))`,highlightLines:[2,5,8,11,12,15]}),e.jsx("div",{className:"my-6 grid md:grid-cols-2 gap-4",children:[{title:"常见问题",color:"red",items:["合并后行数异常多 → 可能有重复键，产生了笛卡尔积","合并后出现大量 NaN → 键列的值不完全匹配（多了空格、大小写不同）","数据类型不一致 → 一个是 int，一个是 str"]},{title:"解决办法",color:"green",items:["合并前先 drop_duplicates() 去重","用 str.strip().str.lower() 统一键列格式","用 astype() 统一数据类型"]}].map((s,r)=>e.jsxs(n.div,{initial:{opacity:0,x:r===0?-20:20},animate:{opacity:1,x:0},transition:{delay:.2+r*.15},className:`p-4 rounded-2xl border-2 ${s.color==="red"?"border-red-200 bg-red-50":"border-green-200 bg-green-50"}`,children:[e.jsx("h4",{className:`font-semibold mb-2 ${s.color==="red"?"text-red-800":"text-green-800"}`,children:s.title}),e.jsx("ul",{className:`text-sm space-y-1 ${s.color==="red"?"text-red-700":"text-green-700"}`,children:s.items.map((d,l)=>e.jsx("li",{children:d},l))})]},s.title))}),e.jsx("h2",{children:"4. 完整流程示例"}),e.jsx("p",{children:"把前面学的串起来：从多个文件读取数据，合并，清洗，保存。"}),e.jsx(t,{code:`import pandas as pd

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
print('数据整合完成！')`,highlightLines:[12,13]})]})}export{p as default};
