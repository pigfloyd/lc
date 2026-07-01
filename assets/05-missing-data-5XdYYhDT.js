import{j as e,m as i,r as l}from"./index-BE2nR4qJ.js";import{C as a}from"./CodeBlock-DBaGKhuW.js";import{S as d}from"./StepThrough-D-27y0IR.js";function o(){const[s,t]=l.useState("MCAR"),r={MCAR:{label:"MCAR — 完全随机缺失",example:"问卷在运输过程中丢失了几份——缺失和任何变量都无关。",impact:"删除缺失样本不会引入偏差，只是样本量减少。",color:"green"},MAR:{label:"MAR — 随机缺失",example:"年龄较大的被试更不愿意填写收入——缺失和年龄有关，但和收入本身无关。",impact:"删除缺失样本会引入偏差；可以用其他变量（如年龄）来预测缺失值。",color:"amber"},MNAR:{label:"MNAR — 非随机缺失",example:"收入高的人不愿意填写收入——缺失和收入本身直接相关。",impact:"最危险的情况。删除或简单插补都会引入偏差，需要专门的模型。",color:"red"}}[s];return e.jsxs("div",{className:"my-6 p-6 bg-white rounded-2xl border-2 border-slate-200 shadow-sm",children:[e.jsx("h3",{className:"text-lg font-semibold text-slate-800 mb-4",children:"缺失数据的三种机制"}),e.jsx("div",{className:"flex gap-2 mb-4",children:["MCAR","MAR","MNAR"].map(n=>e.jsx("button",{onClick:()=>t(n),className:`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${s===n?"bg-blue-600 text-white shadow-md":"bg-slate-100 text-slate-600 hover:bg-slate-200"}`,children:n},n))}),e.jsxs("div",{className:`p-4 rounded-xl border-2 ${r.color==="green"?"border-green-300 bg-green-50":r.color==="amber"?"border-amber-300 bg-amber-50":"border-red-300 bg-red-50"}`,children:[e.jsx("div",{className:"font-semibold text-slate-800 mb-2",children:r.label}),e.jsxs("p",{className:"text-sm text-slate-700 mb-2",children:[e.jsx("strong",{children:"例子："}),r.example]}),e.jsxs("p",{className:"text-sm text-slate-600",children:[e.jsx("strong",{children:"影响："}),r.impact]})]})]})}function b(){return e.jsxs(i.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.4},className:"content-prose",children:[e.jsx("h2",{children:"缺失数据处理"}),e.jsx("p",{children:"真实数据几乎总有缺失值：被试没填某道题、录音听不清某个词、某个语料库缺少某个字段。 如何处理缺失数据，直接影响你的统计结论是否可信。"}),e.jsx(o,{}),e.jsx("h2",{children:"1. 检测缺失值"}),e.jsxs("p",{children:["pandas 中缺失值通常表示为 ",e.jsx("code",{children:"NaN"}),"（Not a Number）或 ",e.jsx("code",{children:"None"}),"。第一步是搞清楚有多少缺失、缺失在哪里。"]}),e.jsx(a,{code:`import pandas as pd
import numpy as np

# 模拟一份有缺失的语言学数据
df = pd.DataFrame({
    'participant': ['P01', 'P02', 'P03', 'P04', 'P05'],
    'age': [25, 30, np.nan, 28, 35],
    'proficiency': ['B2', np.nan, 'C1', 'B1', np.nan],
    'reaction_time': [450, 520, 480, np.nan, 510],
    'accuracy': [0.85, 0.72, 0.91, 0.78, 0.88],
})

# 每列的缺失数量
print(df.isnull().sum())

# 缺失比例
print(f'\\n缺失比例:\\n{(df.isnull().sum() / len(df) * 100).round(1)}%')

# 可视化缺失模式（需要 missingno 库）
# import missingno as msno
# msno.matrix(df)`,highlightLines:[15,18]}),e.jsx("h2",{children:"2. 处理策略"}),e.jsx(d,{steps:[{title:"策略一：删除（最简单）",content:e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"text-sm text-slate-600 mb-2",children:"如果缺失很少（< 5%），且满足 MCAR 假设，直接删除是最简单的选择。"}),e.jsx(a,{code:`# 删除有缺失值的行
df_dropped = df.dropna()
print(f'删除前: {len(df)} 行')
print(f'删除后: {len(df_dropped)} 行')

# 只删除特定列有缺失的行
df_dropped = df.dropna(subset=['age', 'reaction_time'])

# 删除缺失比例过高的列（如超过 50%）
threshold = len(df) * 0.5
df_clean = df.loc[:, df.isnull().sum() < threshold]`,highlightLines:[2,8,11]})]})},{title:"策略二：均值/众数填补（简单但有风险）",content:e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"text-sm text-slate-600 mb-2",children:"用列的均值（连续变量）或众数（分类变量）填补缺失值。简单但会低估方差。"}),e.jsx(a,{code:`# 数值列：均值填补
df['age'].fillna(df['age'].mean(), inplace=True)
df['reaction_time'].fillna(df['reaction_time'].median(), inplace=True)

# 分类列：众数填补
df['proficiency'].fillna(df['proficiency'].mode()[0], inplace=True)

# ⚠️ 注意：均值填补会缩小方差，影响后续统计检验的 p 值
# 适用于缺失比例很小（< 5%）的场景`,highlightLines:[2,3,6]})]})},{title:"策略三：多重插补（最严谨）",content:e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"text-sm text-slate-600 mb-2",children:"多重插补（Multiple Imputation）生成多个完整数据集，分别分析后合并结果——这是学术研究中最推荐的方法。"}),e.jsx(a,{code:`from sklearn.experimental import enable_iterative_imputer
from sklearn.impute import IterativeImputer

# 多重插补（MICE 算法）
imputer = IterativeImputer(max_iter=10, random_state=42)

# 只对数值列做插补
numeric_cols = df.select_dtypes(include=[np.number]).columns
df_imputed = df.copy()
df_imputed[numeric_cols] = imputer.fit_transform(df[numeric_cols])

print(df_imputed)`,highlightLines:[5,10]})]})}]}),e.jsx("h2",{children:"3. 决策流程图"}),e.jsx("div",{className:"my-6 p-6 bg-slate-50 rounded-2xl border-2 border-slate-200",children:e.jsx("div",{className:"space-y-3 text-sm",children:[{q:"缺失比例 < 5%？",yes:"→ 可以删除",no:"→ 继续判断",color:"green"},{q:"缺失机制是 MCAR？",yes:"→ 删除不会引入偏差",no:"→ 需要填补",color:"blue"},{q:"缺失机制是 MAR？",yes:"→ 用多重插补（推荐）",no:"→ 继续判断",color:"amber"},{q:"缺失机制是 MNAR？",yes:"→ 需要专门模型或敏感性分析",no:"→ ",color:"red"}].map((s,t)=>e.jsxs(i.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.1+t*.1},className:`p-3 rounded-xl border-l-4 ${s.color==="green"?"border-green-400 bg-green-50":s.color==="blue"?"border-blue-400 bg-blue-50":s.color==="amber"?"border-amber-400 bg-amber-50":"border-red-400 bg-red-50"}`,children:[e.jsx("span",{className:"font-semibold text-slate-800",children:s.q}),e.jsxs("div",{className:"mt-1 text-slate-600",children:[e.jsx("span",{className:"text-green-700 font-medium",children:"是"})," ",s.yes,"  | ",e.jsx("span",{className:"text-red-700 font-medium",children:"否"})," ",s.no]})]},t))})}),e.jsxs("div",{className:"my-6 p-5 rounded-2xl border-2 border-amber-200 bg-amber-50",children:[e.jsx("h3",{className:"text-base font-semibold text-amber-800 mb-2",children:"报告缺失数据"}),e.jsx("p",{className:"text-amber-700 text-sm",children:"论文中必须报告：缺失值的数量和比例、缺失机制的判断依据、选择的处理方法及其理由。 这是审稿人和读者判断你研究可信度的重要依据。"})]})]})}export{b as default};
