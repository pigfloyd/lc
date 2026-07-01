import{j as e,m as n}from"./index-BE2nR4qJ.js";import{C as t}from"./CodeBlock-DBaGKhuW.js";import{S as a}from"./StepThrough-D-27y0IR.js";function x(){return e.jsxs(n.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.4},className:"content-prose",children:[e.jsx("h2",{children:"网页文本采集"}),e.jsxs("p",{children:["互联网上有海量的语言数据：新闻文章、论坛讨论、百科词条、政府公报…… 如果没有现成的 API，你可以用 ",e.jsx("strong",{children:"网页爬虫"}),"（web scraping）直接从网页上提取文本。"]}),e.jsxs("div",{className:"my-6 p-5 rounded-2xl border-2 border-blue-200 bg-blue-50",children:[e.jsx("h3",{className:"text-base font-semibold text-blue-800 mb-2",children:"直觉理解"}),e.jsx("p",{className:"text-blue-700 text-sm",children:'网页本质上是一段 HTML 代码，浏览器把它渲染成你看到的页面。 爬虫就是"不打开浏览器，直接读 HTML 代码"，然后从中提取你需要的文字。'})]}),e.jsx("h2",{children:"1. 从 URL 到干净文本：四步走"}),e.jsx(a,{steps:[{title:"第一步：安装工具",content:e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"text-sm text-slate-600 mb-2",children:"需要两个库：requests（获取网页）和 BeautifulSoup（解析 HTML）"}),e.jsx(t,{code:"pip install requests beautifulsoup4",showLineNumbers:!1}),e.jsx(t,{code:`import requests
from bs4 import BeautifulSoup`,showLineNumbers:!1})]})},{title:"第二步：获取网页 HTML",content:e.jsx(e.Fragment,{children:e.jsx(t,{code:`url = 'https://example.com/article/123'
headers = {'User-Agent': 'Mozilla/5.0'}  # 模拟浏览器

response = requests.get(url, headers=headers, timeout=10)
response.raise_for_status()

html = response.text
print(f'网页长度: {len(html)} 字符')`,highlightLines:[2,4,5]})})},{title:"第三步：解析并提取文本",content:e.jsx(e.Fragment,{children:e.jsx(t,{code:`soup = BeautifulSoup(html, 'html.parser')

# 提取标题
title = soup.find('h1').get_text(strip=True)

# 提取正文（根据实际网页结构调整选择器）
article = soup.find('article') or soup.find('div', class_='content')
paragraphs = article.find_all('p')

text = '\\n'.join(p.get_text(strip=True) for p in paragraphs)
print(f'标题: {title}')
print(f'正文: {len(text)} 字符')`,highlightLines:[1,4,7,8,10]})})},{title:"第四步：清洗文本",content:e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"text-sm text-slate-600 mb-2",children:"网页文本通常夹杂着广告、导航栏、版权信息等噪音，需要清洗："}),e.jsx(t,{code:`import re

# 去除多余空白
text = re.sub(r'\\s+', ' ', text).strip()

# 去除常见噪音（根据实际情况调整）
noise = ['版权声明', '相关推荐', '热门文章']
for phrase in noise:
    if phrase in text:
        text = text.split(phrase)[0]

print(text[:200])  # 预览前 200 字`,highlightLines:[4]})]})}]}),e.jsx("h2",{children:"2. CSS 选择器：精准定位网页元素"}),e.jsxs("p",{children:["网页内容嵌在各种 HTML 标签里。要精准提取某一部分，需要用 ",e.jsx("strong",{children:"CSS 选择器"})," 定位元素。"]}),e.jsx("div",{className:"my-6 overflow-hidden rounded-2xl border-2 border-slate-200",children:e.jsxs("table",{className:"w-full text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-slate-50",children:[e.jsx("th",{className:"px-4 py-3 text-left font-semibold text-slate-700",children:"选择器"}),e.jsx("th",{className:"px-4 py-3 text-left font-semibold text-slate-700",children:"含义"}),e.jsx("th",{className:"px-4 py-3 text-left font-semibold text-slate-700",children:"示例"})]})}),e.jsx("tbody",{className:"divide-y divide-slate-100",children:[["tag","标签名","soup.find('p')"],[".class","CSS 类名","soup.select('.article-body')"],["#id","元素 ID","soup.find(id='main-content')"],["tag.class","标签 + 类名","soup.select('div.paragraph')"],["parent > child","直接子元素","soup.select('article > p')"]].map(([s,r,i],l)=>e.jsxs("tr",{className:"hover:bg-slate-50",children:[e.jsx("td",{className:"px-4 py-3 font-mono text-blue-700",children:s}),e.jsx("td",{className:"px-4 py-3 text-slate-600",children:r}),e.jsx("td",{className:"px-4 py-3 font-mono text-slate-700 text-xs",children:i})]},l))})]})}),e.jsx("h2",{children:"3. 实战：采集新闻语料"}),e.jsx("p",{children:"下面是一个完整的示例：批量采集新闻网站的文章标题和正文，构建研究用的小型语料库。"}),e.jsx(t,{code:`import requests
from bs4 import BeautifulSoup
import pandas as pd
import time

def scrape_article(url):
    """采集单篇文章"""
    headers = {'User-Agent': 'Mozilla/5.0'}
    resp = requests.get(url, headers=headers, timeout=10)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, 'html.parser')

    title = soup.find('h1').get_text(strip=True)
    body = soup.find('article') or soup.find('div', class_='content')
    text = '\\n'.join(p.get_text(strip=True) for p in body.find_all('p'))

    return {'url': url, 'title': title, 'text': text, 'char_count': len(text)}

# 采集多篇文章
urls = [
    'https://news.example.com/article/1',
    'https://news.example.com/article/2',
    'https://news.example.com/article/3',
]

articles = []
for url in urls:
    try:
        article = scrape_article(url)
        articles.append(article)
        print(f'✓ {article["title"]}')
        time.sleep(1)  # 每次请求间隔 1 秒
    except Exception as e:
        print(f'✗ {url}: {e}')

df = pd.DataFrame(articles)
df.to_csv('news_corpus.csv', index=False, encoding='utf-8')
print(f'\\n采集完成，共 {len(df)} 篇文章')`,highlightLines:[6,7,8,12,13,14,27,28,29,30]}),e.jsx("h2",{children:"4. robots.txt：爬虫礼仪"}),e.jsxs("p",{children:["大多数网站都有一个 ",e.jsx("code",{children:"robots.txt"})," 文件（如 ",e.jsx("code",{children:"https://example.com/robots.txt"}),"）， 告诉爬虫哪些页面可以访问、哪些不行。"]}),e.jsxs("div",{className:"my-6 p-5 rounded-2xl border-2 border-amber-200 bg-amber-50",children:[e.jsx("h3",{className:"text-base font-semibold text-amber-800 mb-2",children:"爬虫礼仪清单"}),e.jsxs("ul",{className:"text-amber-700 text-sm space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"先查 robots.txt"}),"——如果明确禁止爬取某个路径，就不要去碰。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"控制频率"}),"——每次请求间隔至少 1 秒，不要给服务器造成压力。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"设置 User-Agent"}),"——让网站知道是谁在访问，最好包含你的联系方式。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"注明数据来源"}),"——学术论文中使用爬取的数据时，要注明来源网站和采集时间。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"遵守版权"}),"——爬取公开内容用于学术研究通常可以，但不要大规模再发布。"]})]})]}),e.jsx("h2",{children:"5. 什么时候 requests + BeautifulSoup 不够用？"}),e.jsxs("p",{children:["有些网页的内容是通过 JavaScript 动态加载的——用 requests 获取的 HTML 里根本没有你要的文字。 这时候需要 ",e.jsx("strong",{children:"Selenium"})," 或 ",e.jsx("strong",{children:"Playwright"})," 这样的工具来模拟真实浏览器。"]}),e.jsx(t,{code:`# 安装: pip install selenium
from selenium import webdriver
from selenium.webdriver.common.by import By

# 启动浏览器
driver = webdriver.Chrome()
driver.get('https://example.com/dynamic-page')

# 等待内容加载
import time
time.sleep(3)

# 提取文本
elements = driver.find_elements(By.CSS_SELECTOR, '.article-text')
for el in elements:
    print(el.text)

driver.quit()`,highlightLines:[6,7,13,14]}),e.jsxs("div",{className:"my-6 p-5 rounded-2xl border-2 border-green-200 bg-green-50",children:[e.jsx("h3",{className:"text-base font-semibold text-green-800 mb-2",children:"选择建议"}),e.jsxs("p",{className:"text-green-700 text-sm",children:[e.jsx("strong",{children:"能用 API 就用 API"}),"（最稳定、最规范）； API 没有就用 ",e.jsx("strong",{children:"requests + BeautifulSoup"}),"（简单高效）； 遇到动态加载才用 ",e.jsx("strong",{children:"Selenium"}),"（慢、重，但能处理所有情况）。"]})]})]})}export{x as default};
