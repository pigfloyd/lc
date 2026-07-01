import{j as e,m as d,r as c}from"./index-BE2nR4qJ.js";import{C as r}from"./CodeBlock-DBaGKhuW.js";import{S as p}from"./StepThrough-D-27y0IR.js";function x(){const[l,o]=c.useState(1),a={1:{label:"一维数组（向量）",desc:"10 名学生的测试成绩",shape:"(10,)",code:"scores = np.array([85, 92, 78, 90, 88, 76, 95, 89, 82, 91])",visual:e.jsx("div",{className:"flex gap-1 flex-wrap",children:[85,92,78,90,88,76,95,89,82,91].map((s,n)=>e.jsx("div",{className:"w-10 h-10 bg-blue-100 border border-blue-300 rounded-lg flex items-center justify-center text-xs font-mono text-blue-800",children:s},n))})},2:{label:"二维数组（矩阵）",desc:"5 名学生 × 3 次测试",shape:"(5, 3)",code:"data = np.array([[85, 90, 88], [78, 82, 80], [92, 95, 91], [88, 85, 87], [76, 80, 79]])",visual:e.jsx("div",{className:"grid grid-cols-3 gap-1",children:[[85,90,88],[78,82,80],[92,95,91],[88,85,87],[76,80,79]].map((s,n)=>s.map((t,i)=>e.jsx("div",{className:`w-12 h-10 ${i===0?"bg-blue-100 border-blue-300":"bg-emerald-50 border-emerald-200"} border rounded-lg flex items-center justify-center text-xs font-mono ${i===0?"text-blue-800":"text-emerald-800"}`,children:t},`${n}-${i}`)))})},3:{label:"三维数组",desc:"4 名说话人 × 5 个句子 × 10 个声学特征",shape:"(4, 5, 10)",code:"features = np.random.rand(4, 5, 10)  # 随机生成示意",visual:e.jsx("div",{className:"space-y-2",children:[0,1,2,3].map(s=>e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("span",{className:"text-xs text-slate-500 w-16",children:["说话人 ",s+1]}),e.jsx("div",{className:"flex gap-0.5",children:Array.from({length:50}).map((n,t)=>e.jsx("div",{className:"w-1.5 h-4 rounded-sm",style:{backgroundColor:`hsl(${200+s*40}, 60%, ${50+t%10*4}%)`}},t))})]},s))})}}[l];return e.jsxs("div",{className:"my-6 p-6 bg-white rounded-2xl border-2 border-slate-200 shadow-sm",children:[e.jsx("h3",{className:"text-lg font-semibold text-slate-800 mb-4",children:"NumPy 数组维度可视化"}),e.jsx("div",{className:"flex gap-2 mb-4",children:[1,2,3].map(s=>e.jsxs("button",{onClick:()=>o(s),className:`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${l===s?"bg-blue-600 text-white shadow-md":"bg-slate-100 text-slate-600 hover:bg-slate-200"}`,children:[s,"D"]},s))}),e.jsxs("p",{className:"text-sm text-slate-600 mb-1",children:[e.jsx("strong",{children:a.label}),"：",a.desc]}),e.jsxs("p",{className:"text-xs text-slate-500 mb-3 font-mono",children:["shape = ",a.shape]}),e.jsx("div",{className:"mb-3",children:a.visual}),e.jsx(r,{code:a.code,showLineNumbers:!1})]})}function j(){return e.jsxs(d.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.4},className:"content-prose",children:[e.jsx("h2",{children:"NumPy：数值计算基础"}),e.jsxs("p",{children:["NumPy（Numerical Python）是 Python 科学计算的基石。后面的描述统计、可视化、回归模型全都依赖它。 核心概念只有一个：",e.jsx("strong",{children:"ndarray"}),"（N-dimensional array，N 维数组）。"]}),e.jsx(x,{}),e.jsx("h2",{children:"1. 创建数组"}),e.jsx(r,{code:`import numpy as np

# 从 Python 列表创建
scores = np.array([85, 92, 78, 90, 88])
print(scores)          # [85 92 78 90 88]
print(scores.shape)    # (5,)  — 一维，5 个元素
print(scores.dtype)    # int64

# 创建二维数组（矩阵）
data = np.array([
    [85, 90, 88],   # 学生 1 的三次测试
    [78, 82, 80],   # 学生 2
    [92, 95, 91],   # 学生 3
])
print(data.shape)    # (3, 3)  — 3 行 3 列

# 常用快捷创建
zeros = np.zeros(5)       # [0. 0. 0. 0. 0.]
ones = np.ones((2, 3))    # 2×3 全 1 矩阵
rng = np.arange(0, 10, 2) # [0 2 4 6 8]
lin = np.linspace(0, 1, 5) # [0.   0.25 0.5  0.75 1.  ]`,highlightLines:[3,10,11,12,15,16,17,18]}),e.jsx("h2",{children:"2. 向量化运算：告别 for 循环"}),e.jsxs("p",{children:["NumPy 最强大的特性是",e.jsx("strong",{children:"向量化"}),"（vectorization）——对整个数组做运算，不需要写循环。 代码更简洁，速度也快几十倍。"]}),e.jsxs("div",{className:"my-6 grid md:grid-cols-2 gap-4",children:[e.jsxs(d.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.2},className:"p-5 rounded-2xl border-2 border-red-200 bg-red-50",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[e.jsx("span",{className:"text-xl",children:"🐌"}),e.jsx("span",{className:"font-semibold text-red-800",children:"用 for 循环（慢）"})]}),e.jsx(r,{code:`scores = [85, 92, 78, 90, 88]
scaled = []
for s in scores:
    scaled.append(s / 100)
# [0.85, 0.92, 0.78, 0.90, 0.88]`,showLineNumbers:!1})]}),e.jsxs(d.div,{initial:{opacity:0,x:20},animate:{opacity:1,x:0},transition:{delay:.4},className:"p-5 rounded-2xl border-2 border-green-200 bg-green-50",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[e.jsx("span",{className:"text-xl",children:"⚡"}),e.jsx("span",{className:"font-semibold text-green-800",children:"向量化（快）"})]}),e.jsx(r,{code:`scores = np.array([85, 92, 78, 90, 88])
scaled = scores / 100
# array([0.85, 0.92, 0.78, 0.90, 0.88])`,showLineNumbers:!1})]})]}),e.jsx(r,{code:`# 基本运算——全部是逐元素操作
a = np.array([10, 20, 30, 40, 50])
b = np.array([1, 2, 3, 4, 5])

print(a + b)     # [11 22 33 44 55]  加法
print(a - b)     # [ 9 18 27 36 45]  减法
print(a * b)     # [ 10  40  90 160 250]  乘法
print(a / b)     # [10. 10. 10. 10. 10.]  除法
print(a ** 2)    # [ 100  400  900 1600 2500]  平方

# 标量运算——广播（broadcasting）
print(a * 2)     # [ 20  40  60  80 100]  每个元素都乘 2
print(a + 100)   # [110 120 130 140 150]  每个元素都加 100`,highlightLines:[4,5,6,7,8,11,12]}),e.jsx("h2",{children:"3. 统计聚合函数"}),e.jsx("p",{children:"NumPy 内置了所有常用统计函数——这正是描述统计单元的基础。"}),e.jsx(r,{code:`scores = np.array([85, 92, 78, 90, 88, 76, 95, 89, 82, 91])

print(f'均值: {scores.mean():.1f}')        # 86.6
print(f'中位数: {np.median(scores):.1f}')   # 88.5
print(f'标准差: {scores.std(ddof=1):.2f}')  # 6.34（ddof=1 用样本标准差）
print(f'方差: {scores.var(ddof=1):.2f}')    # 40.27
print(f'最小值: {scores.min()}')            # 76
print(f'最大值: {scores.max()}')            # 95
print(f'总和: {scores.sum()}')              # 866
print(f'求和: {np.sum(scores)}')            # 866（等价写法）`,highlightLines:[3,4,5]}),e.jsxs("div",{className:"my-6 p-5 rounded-2xl border-2 border-amber-200 bg-amber-50",children:[e.jsx("h3",{className:"text-base font-semibold text-amber-800 mb-2",children:"ddof 参数很重要"}),e.jsxs("p",{className:"text-amber-700 text-sm",children:[e.jsx("code",{children:"np.std()"})," 默认计算",e.jsx("strong",{children:"总体标准差"}),"（除以 n），而统计学中通常用",e.jsx("strong",{children:"样本标准差"}),"（除以 n-1）。 记得设置 ",e.jsx("code",{children:"ddof=1"}),"（Delta Degrees of Freedom）。 pandas 的 ",e.jsx("code",{children:".std()"})," 默认就是 ddof=1，但 NumPy 不是——这是初学者最常见的坑。"]})]}),e.jsx("h2",{children:"4. 索引和切片"}),e.jsx(p,{steps:[{title:"一维索引",content:e.jsx(r,{code:`scores = np.array([85, 92, 78, 90, 88, 76, 95, 89, 82, 91])

# 单个元素
print(scores[0])      # 85（第一个）
print(scores[-1])     # 91（最后一个）

# 切片（和 Python 列表一样）
print(scores[2:5])    # [78 90 88]（第 3 到第 5 个）
print(scores[::2])    # [85 78 88 95 82]（每隔一个取）

# 布尔索引（筛选满足条件的元素）
high = scores[scores >= 90]
print(high)           # [92 90 95 91]`,highlightLines:[8,11,12]})},{title:"二维索引",content:e.jsx(r,{code:`data = np.array([
    [85, 90, 88],
    [78, 82, 80],
    [92, 95, 91],
])

print(data[0])        # [85 90 88]（第 1 行）
print(data[:, 0])     # [85 78 92]（第 1 列）
print(data[1, 2])     # 80（第 2 行第 3 列）

# 条件筛选
mask = data[:, 0] >= 80  # 第一次测试 >= 80 的学生
print(data[mask])     # [[85,90,88], [92,95,91]]`,highlightLines:[7,8,9,12,13]})}]}),e.jsx("h2",{children:"5. 语言学常用函数"}),e.jsx(r,{code:`# 随机数（模拟数据或打乱顺序）
np.random.seed(42)  # 固定随机种子，保证可重复
random_scores = np.random.normal(loc=80, scale=10, size=100)
# 生成 100 个均值 80、标准差 10 的正态分布数据

# 数学函数
print(np.log([1, 10, 100, 1000]))     # [0.    2.303 4.605 6.908]（自然对数）
print(np.log10([1, 10, 100, 1000]))   # [0. 1. 2. 3.]（常用对数）
print(np.sqrt([4, 9, 16, 25]))        # [2. 3. 4. 5.]（平方根）
print(np.exp([0, 1, 2]))              # [1.    2.718 7.389]（指数）

# 排序
data = np.array([85, 92, 78, 90, 88])
print(np.sort(data))                  # [78 85 88 90 92]
print(np.argsort(data))               # [2 0 4 3 1]（排序后的索引）

# 去重和计数
tags = np.array(['noun', 'verb', 'noun', 'adj', 'verb', 'noun'])
unique, counts = np.unique(tags, return_counts=True)
print(dict(zip(unique, counts)))
# {'adj': 1, 'noun': 3, 'verb': 2}`,highlightLines:[5,14,15,19,20,21]}),e.jsxs("div",{className:"bg-blue-50 border border-blue-200 rounded-xl p-5 my-6",children:[e.jsx("h3",{className:"text-base font-semibold text-blue-800 mb-2",children:"NumPy vs pandas：何时用哪个？"}),e.jsxs("ul",{className:"text-blue-700 text-sm space-y-1.5",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"NumPy"}),"：纯数值运算、数学计算、底层算法实现"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"pandas"}),"：带标签的数据表、数据清洗、分组汇总"]}),e.jsxs("li",{children:["pandas 底层就是 NumPy，两者可以无缝转换：",e.jsx("code",{children:"df.values"})," 返回 NumPy 数组"]}),e.jsx("li",{children:"做统计计算时通常先用 pandas 读取和清洗数据，再转成 NumPy 数组做计算"})]})]})]})}export{j as default};
