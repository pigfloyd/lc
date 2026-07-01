import{j as e,m as o,r as m}from"./index-BE2nR4qJ.js";import{C as a}from"./CodeBlock-DBaGKhuW.js";import{S as x}from"./StepThrough-D-27y0IR.js";function h(){const[s,r]=m.useState("dummy"),t={dummy:{label:"Dummy Coding（虚拟编码）",desc:"以第一个类别为参照组。每个系数表示该类别与参照组的差异。",cols:["初级(参照)","中级","高级"],rows:[{cat:"初级",vals:["1","0","0"]},{cat:"中级",vals:["1","1","0"]},{cat:"高级",vals:["1","0","1"]}],interpretation:`中级系数 = 中级与初级的差异
高级系数 = 高级与初级的差异`,color:"blue"},effect:{label:"Effect Coding（效应编码）",desc:"以所有类别的均值为参照。系数表示每个类别与总均值的偏差。",cols:["截距","中级","高级"],rows:[{cat:"初级",vals:["1","-1","-1"]},{cat:"中级",vals:["1","1","0"]},{cat:"高级",vals:["1","0","1"]}],interpretation:`截距 = 总均值
中级系数 = 中级与总均值的偏差
初级的系数 = -(中级系数 + 高级系数)`,color:"green"},ordinal:{label:"Ordinal Coding（顺序编码）",desc:"假设类别之间等距。只有一个数值变量，值为 0, 1, 2。",cols:["level"],rows:[{cat:"初级",vals:["0"]},{cat:"中级",vals:["1"]},{cat:"高级",vals:["2"]}],interpretation:`假设从初级到高级的"距离"相等。
如果这个假设不成立，不应该用顺序编码。`,color:"purple"}}[s];return e.jsxs("div",{className:"my-6 p-6 bg-white rounded-2xl border-2 border-slate-200 shadow-sm",children:[e.jsx("h3",{className:"text-lg font-semibold text-slate-800 mb-4",children:"编码方式交互对比"}),e.jsx("p",{className:"text-sm text-slate-600 mb-4",children:'同一个变量"语言水平"（初级/中级/高级），三种编码方式生成的特征矩阵不同。'}),e.jsx("div",{className:"flex gap-2 mb-4",children:["dummy","effect","ordinal"].map(l=>e.jsx("button",{onClick:()=>r(l),className:`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${s===l?"bg-blue-600 text-white shadow-md":"bg-slate-100 text-slate-600 hover:bg-slate-200"}`,children:l==="dummy"?"Dummy":l==="effect"?"Effect":"Ordinal"},l))}),e.jsx("p",{className:`text-sm mb-3 font-medium text-${t.color}-700`,children:t.label}),e.jsx("p",{className:"text-sm text-slate-600 mb-4",children:t.desc}),e.jsx("div",{className:"overflow-hidden rounded-xl border border-slate-200 mb-4",children:e.jsxs("table",{className:"w-full text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-slate-50",children:[e.jsx("th",{className:"px-3 py-2 text-left font-semibold text-slate-600",children:"类别"}),t.cols.map(l=>e.jsx("th",{className:"px-3 py-2 text-center font-semibold text-slate-600",children:l},l))]})}),e.jsx("tbody",{children:t.rows.map((l,c)=>e.jsxs("tr",{className:c%2===0?"bg-white":"bg-slate-50",children:[e.jsx("td",{className:"px-3 py-2 font-semibold text-slate-800",children:l.cat}),l.vals.map((d,n)=>e.jsx("td",{className:`px-3 py-2 text-center font-mono ${d==="0"?"text-slate-400":d==="1"||d==="-1"?`text-${t.color}-700 font-bold`:"text-slate-700"}`,children:d},n))]},c))})]})}),e.jsx("div",{className:`p-3 rounded-xl bg-${t.color}-50 border border-${t.color}-200`,children:e.jsx("pre",{className:`text-xs text-${t.color}-800 whitespace-pre-wrap`,children:t.interpretation})})]})}function j(){return e.jsxs(o.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.4},className:"content-prose",children:[e.jsx("h2",{children:"分类变量编码"}),e.jsxs("p",{children:["语言学研究中的自变量大部分是",e.jsx("strong",{children:"分类变量"}),'：语言水平（初/中/高）、语体（口语/书面语）、母语背景（中文/英文/日文）…… 但回归模型只能处理数字。把分类变量"翻译"成数字的过程叫',e.jsx("strong",{children:"编码"}),"（encoding / coding）。 编码方式不同，模型的系数含义就不同。"]}),e.jsx(h,{}),e.jsx("h2",{children:"1. Dummy Coding（虚拟编码）"}),e.jsxs("p",{children:["最常用的编码方式。k 个类别生成 k-1 个 0/1 变量，",e.jsx("strong",{children:"第一个类别作为参照组"}),"。 模型系数表示每个类别与参照组的差异。"]}),e.jsx(a,{code:`import pandas as pd
import statsmodels.formula.api as smf

# 模拟数据：不同语言水平的学习者的阅读成绩
df = pd.DataFrame({
    'proficiency': ['初级'] * 10 + ['中级'] * 10 + ['高级'] * 10,
    'score': [65, 70, 68, 72, 66, 71, 69, 67, 73, 64,
              78, 82, 80, 76, 81, 79, 83, 77, 84, 75,
              88, 92, 90, 86, 91, 89, 93, 87, 94, 85],
})

# 方法一：pd.get_dummies（手动控制参照组）
dummies = pd.get_dummies(df['proficiency'], prefix='prof', drop_first=True)
print(dummies.head())
#    prof_中级  prof_高级
# 0     False      False   ← 初级（参照组，两个都是 0）
# 1     False      False
# 10     True      False   ← 中级
# 20    False       True   ← 高级`,highlightLines:[13,14]}),e.jsxs("div",{className:"my-6 p-5 rounded-2xl border-2 border-blue-200 bg-blue-50",children:[e.jsx("h3",{className:"text-base font-semibold text-blue-800 mb-2",children:"参照组的选择很重要"}),e.jsxs("p",{className:"text-blue-700 text-sm",children:["Dummy coding 中，所有系数都是相对于参照组的差异。选择哪一组作为参照会影响结果的解读。 通常选择",e.jsx("strong",{children:"理论上有意义的基线"}),'（如"初级水平"或"母语者"）作为参照组。',e.jsx("code",{children:"drop_first=True"})," 自动把第一列去掉作为参照。"]})]}),e.jsx("h2",{children:"2. 在回归中使用 C() 函数"}),e.jsxs("p",{children:[e.jsx("code",{children:"statsmodels"})," 提供了 ",e.jsx("code",{children:"C()"})," 函数，自动把分类变量进行编码，不用手动创建虚拟变量。"]}),e.jsx(x,{steps:[{title:"基本用法",content:e.jsxs(e.Fragment,{children:[e.jsx(a,{code:`import statsmodels.formula.api as smf

# C() 自动对分类变量做 dummy coding
# 参照组默认是字母序第一个
model = smf.ols('score ~ C(proficiency)', data=df).fit()
print(model.summary())`,highlightLines:[4]}),e.jsx("p",{className:"text-sm text-slate-600 mt-2",children:'输出的 Intercept 是参照组（"初级"）的均值，C(proficiency)[T.中级] 是中级相对于初级的差异。'})]})},{title:"指定参照组",content:e.jsx(e.Fragment,{children:e.jsx(a,{code:`# 指定"高级"为参照组
model = smf.ols(
    'score ~ C(proficiency, Treatment(reference="高级"))',
    data=df
).fit()

# 现在系数表示：初级 vs 高级、中级 vs 高级的差异
print(model.params)`,highlightLines:[3]})})},{title:"效应编码",content:e.jsxs(e.Fragment,{children:[e.jsx(a,{code:`# 效应编码：系数表示与总均值的偏差
model = smf.ols(
    'score ~ C(proficiency, Sum)',
    data=df
).fit()

# Intercept = 总均值
# 每个系数 = 该类别与总均值的偏差
print(model.params)`,highlightLines:[3]}),e.jsxs("p",{className:"text-sm text-slate-600 mt-2",children:[e.jsx("code",{children:"Sum"})," 表示效应编码（deviation coding）。最后一个类别的系数 = 前面所有系数之和的相反数。"]})]})}]}),e.jsx("h2",{children:"3. 如何选择编码方式？"}),e.jsx("div",{className:"my-6 overflow-hidden rounded-2xl border-2 border-slate-200",children:e.jsxs("table",{className:"w-full text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-slate-50",children:[e.jsx("th",{className:"px-4 py-3 text-left font-semibold text-slate-700",children:"编码方式"}),e.jsx("th",{className:"px-4 py-3 text-left font-semibold text-slate-700",children:"何时使用"}),e.jsx("th",{className:"px-4 py-3 text-left font-semibold text-slate-700",children:"系数含义"})]})}),e.jsx("tbody",{className:"divide-y divide-slate-100",children:[["Dummy (Treatment)","有明确参照组时（如对照组 vs 实验组）","与参照组的差异"],["Effect (Sum)","没有明确参照组，关注每个类别与总均值的偏差","与总均值的偏差"],["Helmert","比较每个类别与后续类别的均值","与后续类别均值的差异"],["Ordinal","类别有序且等距（如 A1/A2/B1/B2）","每升一级的效应"]].map(([s,r,i],t)=>e.jsxs("tr",{className:t%2===0?"bg-white":"bg-slate-50",children:[e.jsx("td",{className:"px-4 py-3 font-semibold text-blue-700",children:s}),e.jsx("td",{className:"px-4 py-3 text-slate-600",children:r}),e.jsx("td",{className:"px-4 py-3 text-slate-500 text-xs",children:i})]},t))})]})}),e.jsx("h2",{children:"4. 多个分类变量的交互"}),e.jsx("p",{children:"当模型中有多个分类变量时，编码方式影响交互效应的解读。"}),e.jsx(a,{code:`# 两个分类变量：语言水平 × 语体
df2 = pd.DataFrame({
    'proficiency': ['初级', '中级', '高级'] * 6,
    'register': ['口语', '书面语'] * 9,
    'score': [65, 70, 68, 72, 66, 71, 69, 67, 73, 64,
              78, 82, 80, 76, 81, 79, 83, 77],
})

# 主效应 + 交互效应
model = smf.ols(
    'score ~ C(proficiency) + C(register) + C(proficiency):C(register)',
    data=df2
).fit()

# 交互效应：不同语言水平在口语 vs 书面语上的差异是否不同
print(model.summary())`,highlightLines:[11,12]}),e.jsx("h2",{children:"5. 常见陷阱"}),e.jsx("div",{className:"my-6 space-y-3",children:[{title:"把分类变量当数值输入",desc:'如果把"初级=1, 中级=2, 高级=3"直接当数值变量，模型假设每升一级的效应相等。这通常不成立。',fix:"用 C(proficiency) 而不是直接用 proficiency",color:"red"},{title:"忘记检查参照组",desc:'pandas 默认按字母序选参照组（如"高级"排在"初级"前面），可能不是你想要的。',fix:'用 Treatment(reference="初级") 明确指定',color:"amber"},{title:"类别太多导致过拟合",desc:"如果有 50 种方言，每个方言一个虚拟变量，模型会非常复杂。",fix:"合并低频类别、用效应编码、或用混合效应模型",color:"blue"}].map((s,r)=>e.jsxs(o.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.1+r*.1},className:`p-4 rounded-xl border-l-4 ${s.color==="red"?"border-red-400 bg-red-50":s.color==="amber"?"border-amber-400 bg-amber-50":"border-blue-400 bg-blue-50"}`,children:[e.jsx("div",{className:"font-semibold text-slate-800",children:s.title}),e.jsx("p",{className:"text-sm text-slate-600 mt-1",children:s.desc}),e.jsxs("p",{className:`text-sm mt-1 font-medium ${s.color==="red"?"text-red-700":s.color==="amber"?"text-amber-700":"text-blue-700"}`,children:["修正：",s.fix]})]},s.title))}),e.jsxs("div",{className:"bg-blue-50 border border-blue-200 rounded-xl p-5 my-6",children:[e.jsx("h3",{className:"text-base font-semibold text-blue-800 mb-2",children:"实践建议"}),e.jsxs("p",{className:"text-blue-700 text-sm",children:["在语言学研究中，",e.jsx("strong",{children:"Dummy coding"}),' 是最常用的选择——它直接告诉你"某一组比参照组高/低多少"，容易向读者解释。 如果没有明确的参照组，用 ',e.jsx("strong",{children:"Effect coding"})," 看每个类别与平均水准的偏差。 永远不要把分类变量当数值直接输入回归模型。"]})]})]})}export{j as default};
