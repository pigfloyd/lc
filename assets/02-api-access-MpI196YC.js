import{j as e,m as n,r as i}from"./index-BE2nR4qJ.js";import{C as t}from"./CodeBlock-DBaGKhuW.js";import{S as l}from"./StepThrough-D-27y0IR.js";function d(){const[s,o]=i.useState(200),r={200:{label:"200 OK",color:"green",meaning:"请求成功，服务器返回了你要的数据。",action:"解析返回的数据即可。"},404:{label:"404 Not Found",color:"red",meaning:"URL 写错了，或者这个接口不存在。",action:"检查 URL 拼写和 API 文档。"},429:{label:"429 Too Many Requests",color:"amber",meaning:"你请求太频繁了，服务器拒绝服务。",action:"降低请求频率，加 time.sleep() 等待。"},500:{label:"500 Server Error",color:"red",meaning:"服务器内部出错，不是你的问题。",action:"稍后重试，或联系 API 提供方。"}}[s];return e.jsxs("div",{className:"my-6 p-6 bg-white rounded-2xl border-2 border-slate-200 shadow-sm",children:[e.jsx("h3",{className:"text-lg font-semibold text-slate-800 mb-4",children:"HTTP 状态码速查"}),e.jsx("div",{className:"flex gap-2 mb-4",children:[200,404,429,500].map(a=>e.jsx("button",{onClick:()=>o(a),className:`px-4 py-2 rounded-xl text-sm font-mono font-semibold transition-all ${s===a?"bg-blue-600 text-white shadow-md":"bg-slate-100 text-slate-600 hover:bg-slate-200"}`,children:a},a))}),e.jsxs("div",{className:`p-4 rounded-xl border-2 ${r.color==="green"?"border-green-300 bg-green-50":r.color==="amber"?"border-amber-300 bg-amber-50":"border-red-300 bg-red-50"}`,children:[e.jsx("div",{className:"font-semibold text-slate-800 mb-1",children:r.label}),e.jsx("p",{className:"text-sm text-slate-700 mb-2",children:r.meaning}),e.jsxs("p",{className:"text-sm text-slate-600",children:[e.jsx("strong",{children:"应对："}),r.action]})]})]})}function h(){return e.jsxs(n.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.4},className:"content-prose",children:[e.jsx("h2",{children:"通过 API 获取语料"}),e.jsxs("p",{children:["很多语言学数据不在你电脑上——在线语料库、词典、翻译服务都通过 ",e.jsx("strong",{children:"API"}),'（Application Programming Interface）提供数据。 简单来说，API 就是一个"数据窗口"：你发一个请求，它返回数据。']}),e.jsxs("div",{className:"my-6 p-5 rounded-2xl border-2 border-blue-200 bg-blue-50",children:[e.jsx("h3",{className:"text-base font-semibold text-blue-800 mb-2",children:"直觉理解"}),e.jsx("p",{className:"text-blue-700 text-sm",children:'把 API 想象成一家餐厅的外卖窗口。你（客户端）递上菜单编号（URL），厨房（服务器）做好菜（数据）递出来。 HTTP 状态码就是厨师的回应："200"是做好了，"404"是你点的菜没有，"429"是你点太多了请等等。'})]}),e.jsx("h2",{children:"1. requests：Python 的网络请求工具"}),e.jsxs("p",{children:[e.jsx("code",{children:"requests"})," 是 Python 中最流行的 HTTP 库。用之前需要安装：",e.jsx("code",{children:"pip install requests"}),"。"]}),e.jsx(l,{steps:[{title:"最简单的 GET 请求",content:e.jsx(e.Fragment,{children:e.jsx(t,{code:`import requests

# 发送 GET 请求
response = requests.get('https://api.example.com/corpus')

# 查看状态码
print(response.status_code)  # 200 表示成功

# 获取返回的 JSON 数据
data = response.json()
print(data)`,highlightLines:[3,9]})})},{title:"带参数的请求",content:e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"text-sm text-slate-600 mb-2",children:"大多数 API 需要传参数，比如搜索关键词、语言、数量限制等："}),e.jsx(t,{code:`# 查询参数
params = {
    'keyword': '语言学',
    'language': 'zh',
    'limit': 100,
}

response = requests.get(
    'https://api.example.com/search',
    params=params
)

results = response.json()['results']
print(f'找到 {len(results)} 条结果')`,highlightLines:[2,3,4,5,8,9,10]})]})},{title:"错误处理",content:e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"text-sm text-slate-600 mb-2",children:"网络请求随时可能失败，务必处理异常："}),e.jsx(t,{code:`import requests
import time

def fetch_data(url, params=None, retries=3):
    for attempt in range(retries):
        try:
            resp = requests.get(url, params=params, timeout=10)
            resp.raise_for_status()  # 4xx/5xx 会抛异常
            return resp.json()
        except requests.exceptions.RequestException as e:
            print(f'第 {attempt+1} 次请求失败: {e}')
            time.sleep(2 ** attempt)  # 指数退避
    return None

data = fetch_data('https://api.example.com/corpus', {'lang': 'zh'})`,highlightLines:[8,11,12]})]})}]}),e.jsx(d,{}),e.jsx("h2",{children:"2. 实战：从在线词典 API 查词"}),e.jsx("p",{children:"下面是一个模拟的真实场景：通过词典 API 查询一个词的释义、词频、例句。 虽然不同 API 的 URL 和参数不同，但基本流程都是这样。"}),e.jsx(t,{code:`import requests
import pandas as pd

def lookup_word(word, language='en'):
    """查询词典 API"""
    url = f'https://api.dictionary.example.com/v1/{language}/{word}'
    response = requests.get(url, timeout=10)
    response.raise_for_status()
    return response.json()

# 批量查询
words = ['language', 'corpus', 'phoneme', 'morpheme']
results = []

for word in words:
    try:
        data = lookup_word(word)
        results.append({
            'word': word,
            'pos': data.get('part_of_speech', ''),
            'frequency': data.get('frequency_rank', 0),
            'definition': data['definitions'][0]['text'],
        })
    except Exception as e:
        print(f'查询 {word} 失败: {e}')

df = pd.DataFrame(results)
print(df)`,highlightLines:[5,6,7,8,15,16,17,18,19,20,21]}),e.jsx("h2",{children:"3. 尊重 API：频率限制与礼仪"}),e.jsxs("p",{children:["大多数 API 都有",e.jsx("strong",{children:"频率限制"}),"（rate limit），比如每秒最多 10 次请求。超限会被暂时封禁（返回 429 状态码）。"]}),e.jsx("div",{className:"my-6 grid md:grid-cols-2 gap-4",children:[{title:"错误做法",color:"red",code:`# 连续发 1000 个请求不停歇
for word in word_list:
    resp = requests.get(url)  # 💥 很快被封`},{title:"正确做法",color:"green",code:`# 每次请求后等待一下
for word in word_list:
    resp = requests.get(url)
    time.sleep(0.5)  # 等 0.5 秒`}].map((s,o)=>e.jsxs(n.div,{initial:{opacity:0,x:o===0?-20:20},animate:{opacity:1,x:0},transition:{delay:.2+o*.15},className:`p-4 rounded-2xl border-2 ${s.color==="red"?"border-red-200 bg-red-50":"border-green-200 bg-green-50"}`,children:[e.jsx("h4",{className:`font-semibold mb-2 ${s.color==="red"?"text-red-800":"text-green-800"}`,children:s.title}),e.jsx(t,{code:s.code,showLineNumbers:!1})]},s.title))}),e.jsxs("div",{className:"my-6 p-5 rounded-2xl border-2 border-amber-200 bg-amber-50",children:[e.jsx("h3",{className:"text-base font-semibold text-amber-800 mb-2",children:"API 使用注意事项"}),e.jsxs("ul",{className:"text-amber-700 text-sm space-y-1",children:[e.jsx("li",{children:"先读 API 文档，了解限制和使用条款"}),e.jsx("li",{children:"API Key 不要写死在代码里，用环境变量存储"}),e.jsx("li",{children:"获取的数据要注明来源（学术引用）"}),e.jsx("li",{children:"大量数据建议缓存到本地文件，避免重复请求"})]})]}),e.jsx("h2",{children:"4. 缓存：避免重复请求"}),e.jsx("p",{children:"做研究时经常需要反复运行同一段代码。把 API 返回的数据缓存到本地，既省时间又不会触发频率限制。"}),e.jsx(t,{code:`import json
import os

def cached_fetch(word, cache_dir='cache'):
    """带缓存的 API 请求"""
    os.makedirs(cache_dir, exist_ok=True)
    cache_file = os.path.join(cache_dir, f'{word}.json')

    # 如果缓存文件存在，直接读取
    if os.path.exists(cache_file):
        with open(cache_file, 'r', encoding='utf-8') as f:
            return json.load(f)

    # 否则发请求并缓存
    data = lookup_word(word)
    with open(cache_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    return data`,highlightLines:[10,11,12,15,16,17]})]})}export{h as default};
