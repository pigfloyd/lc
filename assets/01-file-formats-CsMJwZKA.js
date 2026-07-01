import{j as e,m as o,r as c}from"./index-BE2nR4qJ.js";import{C as t}from"./CodeBlock-DBaGKhuW.js";import{S as i}from"./StepThrough-D-27y0IR.js";function l(){const[n,d]=c.useState("csv"),a={csv:{label:"CSV",code:`speaker_id,utterance,language,word_count
S001,"今天天气真好",Mandarin,5
S002,"It's a beautiful day",English,5
S003,"今日はいい天気ですね",Japanese,7`,desc:"逗号分隔值——最通用的表格格式，Excel、pandas、R 都能直接读。"},json:{label:"JSON",code:`{
  "utterances": [
    {
      "speaker_id": "S001",
      "utterance": "今天天气真好",
      "language": "Mandarin",
      "word_count": 5
    },
    {
      "speaker_id": "S002",
      "utterance": "It's a beautiful day",
      "language": "English",
      "word_count": 5
    }
  ]
}`,desc:"JavaScript 对象表示法——能表达嵌套结构，是 API 返回数据的标准格式。"},xml:{label:"XML / TEI",code:`<TEI>
  <u who="S001" xml:lang="zh">
    <w>今天</w><w>天气</w><w>真好</w>
  </u>
  <u who="S002" xml:lang="en">
    <w>It's</w><w>a</w><w>beautiful</w><w>day</w>
  </u>
</TEI>`,desc:"可扩展标记语言——语言学语料库最常用的标注格式（TEI 标准），能标注词、句、说话人等层次。"}},r=a[n];return e.jsxs("div",{className:"my-6 p-6 bg-white rounded-2xl border-2 border-slate-200 shadow-sm",children:[e.jsx("h3",{className:"text-lg font-semibold text-slate-800 mb-4",children:"同一份语言数据，三种格式对比"}),e.jsx("div",{className:"flex gap-2 mb-4",children:["csv","json","xml"].map(s=>e.jsx("button",{onClick:()=>d(s),className:`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${n===s?"bg-blue-600 text-white shadow-md":"bg-slate-100 text-slate-600 hover:bg-slate-200"}`,children:a[s].label},s))}),e.jsx("p",{className:"text-sm text-slate-600 mb-3",children:r.desc}),e.jsx(t,{code:r.code,showLineNumbers:!1})]})}function h(){return e.jsxs(o.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.4},className:"content-prose",children:[e.jsx("h2",{children:"语言学数据格式"}),e.jsxs("p",{children:["在开始分析之前，你得先让 Python ",e.jsx("strong",{children:"读懂你的数据"}),"。语言学研究中常见的数据来源五花八门：问卷导出的 Excel、语料库的 XML 标注、API 返回的 JSON…… 这一节教你处理三种最核心的格式。"]}),e.jsx(l,{}),e.jsx("h2",{children:"1. CSV：最通用的表格格式"}),e.jsx("p",{children:'CSV（Comma-Separated Values）就是用逗号隔开的纯文本表格。几乎所有数据分析工具都支持它，是数据交换的"通用语言"。'}),e.jsx(i,{steps:[{title:"用 csv 模块读取",content:e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"text-sm text-slate-600 mb-2",children:"Python 内置的 csv 模块适合简单场景："}),e.jsx(t,{code:`import csv

with open('corpus.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row['speaker'], row['utterance'])`,highlightLines:[4,5]})]})},{title:"用 pandas 读取（推荐）",content:e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"text-sm text-slate-600 mb-2",children:"pandas 的 read_csv 更强大，一行代码搞定："}),e.jsx(t,{code:`import pandas as pd

df = pd.read_csv('corpus.csv')
print(df.head())     # 看前 5 行
print(df.dtypes)     # 查看每列的数据类型`,highlightLines:[3]})]})},{title:"常见陷阱：编码和分隔符",content:e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"text-sm text-slate-600 mb-2",children:"中文数据经常遇到编码问题，记住指定 encoding："}),e.jsx(t,{code:`# 中文 Windows 导出的 CSV 可能是 GBK 编码
df = pd.read_csv('corpus.csv', encoding='utf-8')

# 如果分隔符不是逗号（如制表符）
df = pd.read_csv('corpus.tsv', sep='\\t')

# 处理缺失值
df = pd.read_csv('corpus.csv', na_values=['NA', '', '.'])`,highlightLines:[2,5]})]})}]}),e.jsx("h2",{children:"2. JSON：API 和嵌套数据的首选"}),e.jsxs("p",{children:["JSON（JavaScript Object Notation）是一种轻量级的数据交换格式。当你从网上 API 获取数据时，返回的几乎都是 JSON。 它的优势是能表达",e.jsx("strong",{children:"嵌套结构"}),"——比如一篇文章里有多个段落，每个段落里有多个句子。"]}),e.jsx(t,{code:`import json

# 读取 JSON 文件
with open('interview.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# 访问嵌套数据
for utterance in data['utterances']:
    print(utterance['speaker'], utterance['text'])

# JSON → DataFrame（展平嵌套结构）
df = pd.json_normalize(data['utterances'])
print(df.columns)`,highlightLines:[4,5,8,9,12]}),e.jsxs("div",{className:"my-6 p-5 rounded-2xl border-2 border-amber-200 bg-amber-50",children:[e.jsx("h3",{className:"text-base font-semibold text-amber-800 mb-2",children:"注意：嵌套 JSON 的展平"}),e.jsxs("p",{className:"text-amber-700 text-sm",children:["语言学数据常有多层嵌套（如 语料库 → 文本 → 段落 → 句子 → 词）。",e.jsx("code",{children:"pd.json_normalize()"}),' 可以把嵌套结构"拍平"成表格，但层数太深时需要手动处理。 建议先用 ',e.jsx("code",{children:"print(json.dumps(data, indent=2, ensure_ascii=False))"})," 看清楚数据结构再动手。"]})]}),e.jsx("h2",{children:"3. XML / TEI：语料库标注的行业标准"}),e.jsx("p",{children:"XML（eXtensible Markup Language）是语言学语料库最常用的格式。TEI（Text Encoding Initiative）是专门为人文社科文本制定的 XML 标准， 能标注词性、句法树、说话人、语境等丰富信息。"}),e.jsx(i,{steps:[{title:"解析 XML 的基本流程",content:e.jsx(e.Fragment,{children:e.jsx(t,{code:`from lxml import etree

# 解析 TEI 文件
tree = etree.parse('corpus.tei.xml')
root = tree.getroot()

# TEI 的命名空间
ns = {'tei': 'http://www.tei-c.org/ns/1.0'}

# 提取所有话语单元
for utterance in root.findall('.//tei:u', ns):
    speaker = utterance.get('who')
    text = ''.join(utterance.itertext())
    print(f'{speaker}: {text}')`,highlightLines:[4,10,11,12]})})},{title:"提取词级标注",content:e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"text-sm text-slate-600 mb-2",children:"TEI 中每个词用 <w> 标签标注，可以提取词形和词性："}),e.jsx(t,{code:`words = []
for w in root.findall('.//tei:w', ns):
    words.append({
        'form': w.text,
        'pos': w.get('type'),       # 词性标注
        'lemma': w.get('lemma'),    # 词元
    })

df = pd.DataFrame(words)
print(df.head())`,highlightLines:[2,3,4,5,6]})]})}]}),e.jsx("h2",{children:"4. 写入文件：保存你的工作"}),e.jsx("p",{children:"处理完数据后，通常需要保存为统一格式，方便后续分析或分享给合作者。"}),e.jsx(t,{code:`# 保存为 CSV
df.to_csv('cleaned_corpus.csv', index=False, encoding='utf-8')

# 保存为 JSON
df.to_json('cleaned_corpus.json', orient='records',
           force_ascii=False, indent=2)

# 保存为 Excel（适合发给不懂编程的合作者）
df.to_excel('cleaned_corpus.xlsx', index=False)`,highlightLines:[2,5,8]}),e.jsxs("div",{className:"my-6 p-5 rounded-2xl border-2 border-green-200 bg-green-50",children:[e.jsx("h3",{className:"text-base font-semibold text-green-800 mb-2",children:"实用建议"}),e.jsx("p",{className:"text-green-700 text-sm",children:'做研究时，建议始终保留一份 CSV 格式的"干净版"数据。 CSV 是最不容易出问题的格式——十年后你可能忘了 JSON 的嵌套结构，但 CSV 打开就是表格。'})]})]})}export{h as default};
