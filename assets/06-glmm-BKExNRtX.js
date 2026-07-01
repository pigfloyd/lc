import{j as e,m as r,r as d}from"./index-BE2nR4qJ.js";import{C as t}from"./CodeBlock-DBaGKhuW.js";import{S as o}from"./StepThrough-D-27y0IR.js";function c(){const[l,n]=d.useState("continuous"),i={continuous:{label:"连续型因变量",example:"反应时（毫秒）、阅读速度（词/分）",link:"恒等函数（identity）",distribution:"正态分布",model:"线性混合模型（LMM）",formula:"y = Xβ + Zu + ε",color:"blue"},binary:{label:"二分型因变量",example:"正确/错误、接受/拒绝",link:"Logit 函数（log-odds）",distribution:"二项分布",model:"逻辑混合模型（GLMM）",formula:"logit(p) = Xβ + Zu",color:"green"},count:{label:"计数型因变量",example:"错误次数、词汇多样性",link:"对数函数（log）",distribution:"泊松分布",model:"泊松混合模型（GLMM）",formula:"log(λ) = Xβ + Zu",color:"purple"}},s=i[l];return e.jsxs("div",{className:"my-6 p-6 bg-white rounded-2xl border-2 border-slate-200 shadow-sm",children:[e.jsx("h3",{className:"text-lg font-semibold text-slate-800 mb-4",children:"因变量类型决定模型选择"}),e.jsx("div",{className:"flex gap-2 mb-4",children:["continuous","binary","count"].map(a=>e.jsx("button",{onClick:()=>n(a),className:`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${l===a?"bg-blue-600 text-white shadow-md":"bg-slate-100 text-slate-600 hover:bg-slate-200"}`,children:i[a].label},a))}),e.jsxs("div",{className:`p-4 rounded-xl border-2 border-${s.color}-300 bg-${s.color}-50 space-y-2`,children:[e.jsxs("div",{className:"grid grid-cols-2 gap-x-4 gap-y-2 text-sm",children:[e.jsxs("div",{children:[e.jsx("span",{className:"text-slate-500",children:"例子："}),e.jsx("span",{className:"text-slate-800",children:s.example})]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-slate-500",children:"分布："}),e.jsx("span",{className:"text-slate-800",children:s.distribution})]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-slate-500",children:"链接函数："}),e.jsx("span",{className:"text-slate-800",children:s.link})]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-slate-500",children:"模型："}),e.jsx("span",{className:"text-slate-800 font-semibold",children:s.model})]})]}),e.jsx("div",{className:`p-3 rounded-lg bg-white/60 text-center font-mono text-sm text-${s.color}-800`,children:s.formula})]})]})}function h(){return e.jsxs(r.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.4},className:"content-prose",children:[e.jsx("h2",{children:"广义线性混合模型（GLMM）"}),e.jsxs("p",{children:["上一节的混合效应模型假设因变量是",e.jsx("strong",{children:"连续的、正态分布的"}),'。 但语言学研究中大量因变量不是连续的：二语习得实验中被试回答"正确/错误"（二分变量）、 语料库中某个词法错误出现的"次数"（计数变量）。 这时候需要',e.jsx("strong",{children:"广义线性混合模型"}),"（Generalized Linear Mixed Model, GLMM）。"]}),e.jsx(c,{}),e.jsx("h2",{children:"1. 为什么不能直接用 LMM 处理二分数据？"}),e.jsxs("div",{className:"my-6 grid md:grid-cols-2 gap-4",children:[e.jsxs(r.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.2},className:"p-5 rounded-2xl border-2 border-red-200 bg-red-50",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[e.jsx("span",{className:"text-xl",children:"❌"}),e.jsx("span",{className:"font-semibold text-red-800",children:"错误做法"})]}),e.jsx("p",{className:"text-sm text-red-700",children:"把正确=1、错误=0 当作连续变量跑 LMM。 问题：残差不服从正态分布（只有 0 和 1 两个值）、预测值可能超出 [0,1] 范围。"})]}),e.jsxs(r.div,{initial:{opacity:0,x:20},animate:{opacity:1,x:0},transition:{delay:.4},className:"p-5 rounded-2xl border-2 border-green-200 bg-green-50",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[e.jsx("span",{className:"text-xl",children:"✅"}),e.jsx("span",{className:"font-semibold text-green-800",children:"正确做法"})]}),e.jsx("p",{className:"text-sm text-green-700",children:"用 GLMM（逻辑混合模型），通过 logit 链接函数把概率映射到实数空间，同时保留随机效应结构。"})]})]}),e.jsx("h2",{children:"2. Python 实现：二分类 GLMM"}),e.jsx("p",{children:"语言学中最常见的 GLMM 场景：二语习得实验中被试回答正确/错误，同时需要考虑被试和项目（词汇）的随机效应。"}),e.jsx(o,{steps:[{title:"场景：语法判断任务",content:e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"text-sm text-slate-600 mb-2",children:"30 名学习者判断 20 个句子的语法是否正确（1=正确，0=错误）。自变量是学习者的水平（初级/高级）和句子类型（简单/复杂）。"}),e.jsx(t,{code:`import pandas as pd
import numpy as np

# 模拟数据
np.random.seed(42)
n_subjects, n_items = 30, 20

data = []
for subj in range(n_subjects):
    level = 'advanced' if subj > 15 else 'beginner'
    for item in range(n_items):
        sentence = 'complex' if item > 10 else 'simple'
        # 模拟正确率（高级学习者 + 简单句 → 更高正确率）
        p = 0.9 if level == 'advanced' and sentence == 'simple' else             0.7 if level == 'advanced' else             0.6 if sentence == 'simple' else 0.4
        correct = np.random.binomial(1, p)
        data.append({'subj': f'S{subj:02d}', 'item': f'I{item:02d}',
                     'level': level, 'sentence': sentence,
                     'correct': correct})

df = pd.DataFrame(data)
print(df.head(10))`,showLineNumbers:!1})]})},{title:"拟合逻辑混合模型",content:e.jsxs(e.Fragment,{children:[e.jsx(t,{code:`import statsmodels.formula.api as smf

# 逻辑混合模型（二项分布 + logit 链接）
glmm = smf.mixedlm(
    'correct ~ C(level, Treatment("beginner")) * C(sentence)',
    data=df,
    groups=df['subj'],            # 被试随机效应
    re_formula='1',               # 随机截距
)

# 注意：statsmodels 的 MixedLM 默认是 LMM
# 对于二分类数据，需要用 BinomialBayesMixedGLM 或换用 pymer4
result = glmm.fit()
print(result.summary())`,showLineNumbers:!1}),e.jsxs("p",{className:"text-sm text-slate-600 mt-2",children:["注意：",e.jsx("code",{children:"statsmodels"})," 的 ",e.jsx("code",{children:"mixedlm"})," 是线性混合模型。对二分类数据，需要用专门的 GLMM 工具。"]})]})},{title:"使用 pymer4（推荐）",content:e.jsx(e.Fragment,{children:e.jsx(t,{code:`# pymer4：更友好的 GLMM 接口
# pip install pymer4
from pymer4.models import Lmer

# 语法和 R 的 lme4 一致
model = Lmer(
    'correct ~ level * sentence + (1 | subj) + (1 | item)',
    data=df,
    family='binomial'  # 指定二项分布 → 逻辑混合模型
)

result = model.fit()
print(result)

# 输出包含：
# - 固定效应的系数、标准误、z 值、p 值
# - 随机效应的方差分量
# - AIC/BIC 用于模型比较`,highlightLines:[5,6,7]})})}]}),e.jsx("h2",{children:"3. 解读 GLMM 结果"}),e.jsxs("div",{className:"my-6 p-5 rounded-2xl border-2 border-blue-200 bg-blue-50",children:[e.jsx("h3",{className:"text-base font-semibold text-blue-800 mb-2",children:"系数含义：Odds Ratio"}),e.jsxs("p",{className:"text-blue-700 text-sm",children:["GLMM 的系数是 log-odds（对数几率）。要直观理解，需要转换为 ",e.jsx("strong",{children:"Odds Ratio"}),"（几率比）： OR = e",e.jsx("sup",{children:"β"}),'。OR = 2 表示该条件下的正确"几率"是参照条件的 2 倍。 OR > 1 表示正效应，OR < 1 表示负效应，OR = 1 表示无效应。']})]}),e.jsx(t,{code:`# 将 log-odds 转换为 Odds Ratio
import numpy as np

# 假设 model 输出的固定效应系数
coefficients = {
    'Intercept': -0.41,           # 初级 × 简单句的基线 log-odds
    'level[T.advanced]': 1.10,    # 高级 vs 初级
    'sentence[T.complex]': -0.85, # 复杂句 vs 简单句
    'interaction': 0.35,          # 交互效应
}

# 转换为 Odds Ratio
for name, coef in coefficients.items():
    or_val = np.exp(coef)
    print(f'{name}: β = {coef:+.2f}, OR = {or_val:.2f}')

# 输出示例：
# Intercept: β = -0.41, OR = 0.66（基线正确率约 40%）
# level[T.advanced]: β = +1.10, OR = 3.00（高级学习者的正确几率是初级的 3 倍）`,highlightLines:[12,13]}),e.jsx("h2",{children:"4. 模型比较与选择"}),e.jsx(t,{code:`from pymer4.models import Lmer

# 模型 1：只有随机截距
m1 = Lmer('correct ~ level * sentence + (1 | subj) + (1 | item)',
          data=df, family='binomial')
m1.fit()

# 模型 2：加入被试随机斜率
m2 = Lmer('correct ~ level * sentence + (1 + level | subj) + (1 | item)',
          data=df, family='binomial')
m2.fit()

# 比较两个模型
print(m1.aic, m2.aic)  # AIC 越低越好
# 也可以用似然比检验比较嵌套模型`,highlightLines:[8]}),e.jsx("div",{className:"my-6 overflow-hidden rounded-2xl border-2 border-slate-200",children:e.jsxs("table",{className:"w-full text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-slate-50",children:[e.jsx("th",{className:"px-4 py-3 text-left font-semibold text-slate-700",children:"因变量类型"}),e.jsx("th",{className:"px-4 py-3 text-left font-semibold text-slate-700",children:"分布"}),e.jsx("th",{className:"px-4 py-3 text-left font-semibold text-slate-700",children:"Python 工具"})]})}),e.jsx("tbody",{className:"divide-y divide-slate-100",children:[["连续（反应时、成绩）","正态","statsmodels.mixedlm 或 pymer4 (gaussian)"],["二分（正确/错误）","二项","pymer4 (binomial) 或 statsmodels.BinomialBayesMixedGLM"],["计数（错误次数）","泊松","pymer4 (poisson)"]].map(([l,n,i],s)=>e.jsxs("tr",{className:s%2===0?"bg-white":"bg-slate-50",children:[e.jsx("td",{className:"px-4 py-3 font-semibold text-blue-700",children:l}),e.jsx("td",{className:"px-4 py-3 text-slate-600",children:n}),e.jsx("td",{className:"px-4 py-3 font-mono text-xs text-slate-600",children:i})]},s))})]})}),e.jsxs("div",{className:"bg-amber-50 border border-amber-200 rounded-xl p-5 my-6",children:[e.jsx("h3",{className:"text-lg font-semibold text-amber-800 mb-2",children:"实践建议"}),e.jsxs("ul",{className:"text-amber-700 space-y-1.5 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"收敛问题"}),"：GLMM 比 LMM 更容易遇到不收敛。简化随机效应结构（如去掉随机斜率）再试。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"样本量要求"}),"：GLMM 需要更多数据。被试和项目都至少需要 30+ 个。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"R 的优势"}),"：Python 的 GLMM 支持不如 R 的 ",e.jsx("code",{children:"lme4::glmer"})," 完善。如果遇到困难，考虑用 ",e.jsx("code",{children:"rpy2"})," 调用 R。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"报告内容"}),"：固定效应（系数、OR、CI、p）、随机效应方差、模型拟合指标（AIC）。"]})]})]})]})}export{h as default};
