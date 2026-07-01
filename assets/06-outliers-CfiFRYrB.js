import{j as e,m as b,r as j}from"./index-BE2nR4qJ.js";import{C as i}from"./CodeBlock-DBaGKhuW.js";import{S as f}from"./StepThrough-D-27y0IR.js";function N(){const[t,a]=j.useState("zscore"),[n,o]=j.useState(2),l=[420,450,480,460,440,470,490,455,465,445,850,430,475,460,1200],d=[...l].sort((s,r)=>s-r),c=l.reduce((s,r)=>s+r,0)/l.length,u=Math.sqrt(l.reduce((s,r)=>s+(r-c)**2,0)/l.length),m=d[Math.floor(d.length*.25)],p=d[Math.floor(d.length*.75)],h=p-m,x=l.map(s=>t==="zscore"?Math.abs((s-c)/u)>n:s<m-n*h||s>p+n*h),g=x.filter(Boolean).length;return e.jsxs("div",{className:"my-6 p-6 bg-white rounded-2xl border-2 border-slate-200 shadow-sm",children:[e.jsx("h3",{className:"text-lg font-semibold text-slate-800 mb-4",children:"异常值检测演示"}),e.jsx("p",{className:"text-sm text-slate-600 mb-4",children:"下面是一组反应时数据（毫秒）。调整检测方法和阈值，看哪些数据点被标记为异常值。"}),e.jsxs("div",{className:"flex gap-2 mb-4",children:[e.jsx("button",{onClick:()=>a("zscore"),className:`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${t==="zscore"?"bg-blue-600 text-white":"bg-slate-100 text-slate-600 hover:bg-slate-200"}`,children:"Z-score"}),e.jsx("button",{onClick:()=>a("iqr"),className:`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${t==="iqr"?"bg-blue-600 text-white":"bg-slate-100 text-slate-600 hover:bg-slate-200"}`,children:"IQR"})]}),e.jsxs("div",{className:"mb-4",children:[e.jsxs("label",{className:"text-sm font-medium text-blue-700",children:["阈值: ",e.jsx("span",{className:"font-mono font-bold",children:n})]}),e.jsx("input",{type:"range",min:1,max:4,step:.5,value:n,onChange:s=>o(Number(s.target.value)),className:"w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500"})]}),e.jsx("div",{className:"flex flex-wrap gap-2 mb-4",children:l.map((s,r)=>e.jsxs("div",{className:`px-3 py-1.5 rounded-lg text-sm font-mono ${x[r]?"bg-red-100 text-red-700 border-2 border-red-300 font-bold":"bg-blue-50 text-blue-700 border border-blue-200"}`,children:[s,x[r]&&e.jsx("span",{className:"ml-1 text-xs",children:"⚠"})]},r))}),e.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[e.jsxs("div",{className:"p-3 rounded-xl bg-slate-50 border border-slate-200 text-center",children:[e.jsx("div",{className:"text-xs text-slate-500",children:"均值"}),e.jsxs("div",{className:"font-mono font-bold text-slate-800",children:[c.toFixed(0)," ms"]})]}),e.jsxs("div",{className:"p-3 rounded-xl bg-red-50 border border-red-200 text-center",children:[e.jsx("div",{className:"text-xs text-red-600",children:"检测到异常值"}),e.jsxs("div",{className:"font-mono font-bold text-red-800",children:[g," 个"]})]})]})]})}function q(){return e.jsxs(b.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.4},className:"content-prose",children:[e.jsx("h2",{children:"异常值检测与处理"}),e.jsx("p",{children:"异常值（outlier）是和大多数数据点差异很大的极端值。语言数据中异常值很常见： 某个被试反应特别慢、某个文本特别长、某个词的频率特别高（高频词干扰）。 异常值可能来自真实变异，也可能是录入错误，但不管原因如何，它们都会严重影响统计结果。"}),e.jsx(N,{}),e.jsx("h2",{children:"1. Z-score 方法"}),e.jsxs("p",{children:["Z-score 衡量一个数据点距离均值有多少个标准差。通常认为 ",e.jsx("strong",{children:"|Z| > 3"})," 的数据点是异常值。"]}),e.jsxs("div",{className:"my-6 p-6 bg-slate-800 text-white rounded-2xl text-center",children:[e.jsx("div",{className:"text-lg font-semibold mb-2",children:"Z = (x - x̄) / s"}),e.jsx("div",{className:"text-sm mt-2 text-slate-300",children:"Z = 0 表示在均值处，|Z| > 3 表示在 3 个标准差之外（概率 < 0.3%）"})]}),e.jsx(i,{code:`import numpy as np
import pandas as pd

# 一组反应时数据（毫秒）
rt = np.array([420, 450, 480, 460, 440, 470, 490, 455, 465, 445,
               850, 430, 475, 460, 1200])

# 计算 Z-score
z_scores = (rt - rt.mean()) / rt.std()
print('Z-scores:', np.round(z_scores, 2))

# 标记异常值（|Z| > 2 为保守阈值，|Z| > 3 为常用阈值）
outliers_z2 = np.abs(z_scores) > 2
outliers_z3 = np.abs(z_scores) > 3

print(f'\\n|Z| > 2 的异常值: {rt[outliers_z2]}')
print(f'|Z| > 3 的异常值: {rt[outliers_z3]}')`,highlightLines:[9,12,13]}),e.jsx("h2",{children:"2. IQR 方法（更稳健）"}),e.jsx("p",{children:"IQR（四分位距）方法不受极端值影响，比 Z-score 更稳健。它用中位数和四分位数代替均值和标准差。"}),e.jsx(i,{code:`# IQR 方法
q1 = np.percentile(rt, 25)   # 第一四分位数
q3 = np.percentile(rt, 75)   # 第三四分位数
iqr = q3 - q1                # 四分位距

# 异常值定义：低于 Q1-1.5*IQR 或高于 Q3+1.5*IQR
lower_bound = q1 - 1.5 * iqr
upper_bound = q3 + 1.5 * iqr

outliers_iqr = (rt < lower_bound) | (rt > upper_bound)

print(f'Q1 = {q1}, Q3 = {q3}, IQR = {iqr}')
print(f'正常范围: [{lower_bound:.0f}, {upper_bound:.0f}]')
print(f'异常值: {rt[outliers_iqr]}')`,highlightLines:[6,7,9]}),e.jsx("div",{className:"my-6 overflow-hidden rounded-2xl border-2 border-slate-200",children:e.jsxs("table",{className:"w-full text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-slate-50",children:[e.jsx("th",{className:"px-4 py-3 text-left font-semibold text-slate-700",children:"方法"}),e.jsx("th",{className:"px-4 py-3 text-left font-semibold text-slate-700",children:"优点"}),e.jsx("th",{className:"px-4 py-3 text-left font-semibold text-slate-700",children:"缺点"}),e.jsx("th",{className:"px-4 py-3 text-left font-semibold text-slate-700",children:"适用场景"})]})}),e.jsx("tbody",{className:"divide-y divide-slate-100",children:[["Z-score","简单直观","受极端值影响（均值和标准差会被拉偏）","数据近似正态时"],["IQR","不受极端值影响","对正态数据效力稍低","数据偏态或有极端值时"],["箱线图","可视化直观","只能看到大概","探索性分析的第一步"]].map(([t,a,n,o],l)=>e.jsxs("tr",{className:l%2===0?"bg-white":"bg-slate-50",children:[e.jsx("td",{className:"px-4 py-3 font-semibold text-blue-700",children:t}),e.jsx("td",{className:"px-4 py-3 text-green-700 text-xs",children:a}),e.jsx("td",{className:"px-4 py-3 text-red-700 text-xs",children:n}),e.jsx("td",{className:"px-4 py-3 text-slate-500",children:o})]},l))})]})}),e.jsx("h2",{children:"3. 用箱线图可视化异常值"}),e.jsx("p",{children:"箱线图是检测异常值最直观的工具——它把中位数、四分位数和异常值一目了然地展示出来。"}),e.jsx(i,{code:`import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(10, 4))

# 箱线图
axes[0].boxplot(rt, vert=False)
axes[0].set_title('反应时箱线图')
axes[0].set_xlabel('毫秒')

# 标记异常值
clean = rt[~outliers_iqr]
axes[1].boxplot(clean, vert=False)
axes[1].set_title('去除异常值后')

plt.tight_layout()
plt.savefig('outlier_detection.png', dpi=150)
plt.show()`,highlightLines:[5]}),e.jsx("h2",{children:"4. 发现异常值后怎么办？"}),e.jsx(f,{steps:[{title:"第一步：检查原因",content:e.jsxs("div",{children:[e.jsx("p",{children:"异常值不一定要删除。先调查原因："}),e.jsxs("ul",{className:"list-disc pl-6 mt-2 space-y-1 text-sm text-slate-700",children:[e.jsxs("li",{children:["是",e.jsx("strong",{children:"录入错误"}),"？→ 修正或删除"]}),e.jsxs("li",{children:["是",e.jsx("strong",{children:"实验设备故障"}),"？→ 删除"]}),e.jsxs("li",{children:["是",e.jsx("strong",{children:"真实的极端表现"}),"？→ 保留，但考虑使用稳健统计量"]}),e.jsxs("li",{children:["是",e.jsx("strong",{children:"高频词干扰"}),'？（如"的""是"频率远超其他词）→ 对数转换或单独处理']})]})]})},{title:"第二步：选择处理方法",content:e.jsx("div",{children:e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"p-3 rounded-xl bg-blue-50 border border-blue-200",children:[e.jsx("span",{className:"font-semibold text-blue-800",children:"删除"}),e.jsx("p",{className:"text-sm text-blue-700 mt-1",children:"确认是错误数据时直接删除。报告删除了多少、为什么。"})]}),e.jsxs("div",{className:"p-3 rounded-xl bg-green-50 border border-green-200",children:[e.jsx("span",{className:"font-semibold text-green-800",children:"Winsorize（缩尾处理）"}),e.jsx("p",{className:"text-sm text-green-700 mt-1",children:"把极端值替换为边界值（如把 > Q3+1.5*IQR 的值替换为 Q3+1.5*IQR）。"})]}),e.jsxs("div",{className:"p-3 rounded-xl bg-purple-50 border border-purple-200",children:[e.jsx("span",{className:"font-semibold text-purple-800",children:"数据转换"}),e.jsx("p",{className:"text-sm text-purple-700 mt-1",children:"取对数可以压缩大值。词频数据常用 log 转换。"})]}),e.jsxs("div",{className:"p-3 rounded-xl bg-amber-50 border border-amber-200",children:[e.jsx("span",{className:"font-semibold text-amber-800",children:"使用稳健方法"}),e.jsx("p",{className:"text-sm text-amber-700 mt-1",children:"不删数据，但用中位数代替均值、用非参数检验代替参数检验。"})]})]})})},{title:"第三步：敏感性分析",content:e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-slate-600 mb-2",children:'最严谨的做法：分别用"含异常值"和"不含异常值"的数据做分析，看结论是否一致。'}),e.jsx(i,{code:`# 敏感性分析：含/不含异常值的结果对比
from scipy import stats

# 含异常值
t1, p1 = stats.ttest_ind(group_a, group_b)
print(f'含异常值: t = {t1:.3f}, p = {p1:.4f}')

# 不含异常值
a_clean = group_a[np.abs(z_a) < 3]
b_clean = group_b[np.abs(z_b) < 3]
t2, p2 = stats.ttest_ind(a_clean, b_clean)
print(f'不含异常值: t = {t2:.3f}, p = {p2:.4f}')

# 如果两次结论一致 → 结果稳健
# 如果结论不同 → 需要在论文中讨论异常值的影响`,showLineNumbers:!1})]})}]}),e.jsx("h2",{children:"5. 语言学中的常见异常值场景"}),e.jsx("div",{className:"my-6 space-y-3",children:[{title:"词频数据中的 Zipf 偏差",desc:'少数极高频词（"的""了""是"）远远超过其他词。用 log 转换或排除功能词。',color:"blue"},{title:"反应时数据中的极端值",desc:"被试走神导致的超长反应时（> 2000ms）。通常设定上限截断（如 2.5 SD 或 1500ms）。",color:"green"},{title:"文本长度差异",desc:"语料中文本长度差异巨大。用标准化指标（如每千词频率）代替原始计数。",color:"amber"},{title:"评分者偏差",desc:"某个评分者系统性地给出高分或低分。检查评分者间一致性（Cohen's kappa）。",color:"purple"}].map((t,a)=>e.jsxs(b.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.1+a*.1},className:`p-4 rounded-xl border-l-4 ${t.color==="blue"?"border-blue-400 bg-blue-50":t.color==="green"?"border-green-400 bg-green-50":t.color==="amber"?"border-amber-400 bg-amber-50":"border-purple-400 bg-purple-50"}`,children:[e.jsx("div",{className:"font-semibold text-slate-800",children:t.title}),e.jsx("p",{className:"text-sm text-slate-600 mt-1",children:t.desc})]},t.title))}),e.jsxs("div",{className:"bg-amber-50 border border-amber-200 rounded-xl p-5 my-6",children:[e.jsx("h3",{className:"text-lg font-semibold text-amber-800 mb-2",children:"黄金法则"}),e.jsxs("ul",{className:"text-amber-700 space-y-1.5 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"不要盲目删除"}),"——先调查原因，保留真实变异"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"不要偷偷处理"}),"——在论文中报告异常值的数量、检测方法和处理方式"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"做敏感性分析"}),"——证明你的结论不依赖于是否删除异常值"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"选择稳健方法"}),"——中位数比均值稳健，非参数检验比参数检验稳健"]})]})]})]})}export{q as default};
