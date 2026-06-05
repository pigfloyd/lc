import { motion } from 'framer-motion';

export default function Appendix() {
  const datasets = [
    {
      category: '中文语料库',
      items: [
        { name: 'BCC（北京语言大学）', desc: '150 亿字，含报刊、文学、微博、科技等子库', access: '在线查询免费，下载需申请', url: 'http://bcc.blcu.edu.cn/' },
        { name: 'CCL（北京大学）', desc: '面向汉语研究的大型语料库', access: '在线免费使用', url: 'http://ccl.pku.edu.cn:8080/ccl_corpus/' },
        { name: '国家语委现代汉语平衡语料库', desc: '规范标注的通用语料库', access: '需申请', url: 'http://corpus.zhonghuayuwen.org/' },
        { name: 'THUCNews', desc: '清华大学新闻数据集，14 个类别，适合文本分类', access: '免费下载', url: 'http://thuctc.thunlp.org/' },
      ],
    },
    {
      category: '英文语料库',
      items: [
        { name: 'COCA（美国当代英语语料库）', desc: '10 亿词，口语/小说/杂志/新闻/学术 5 大语体', access: '在线查询免费，下载付费', url: 'https://www.english-corpora.org/coca/' },
        { name: 'BNC（英国国家语料库）', desc: '1 亿词，英式英语代表', access: '部分免费', url: 'http://www.natcorp.ox.ac.uk/' },
        { name: 'Google Books Ngrams', desc: '词频和 n-gram 数据，适合历时研究', access: '免费下载', url: 'https://books.google.com/ngrams' },
        { name: 'OpenSubtitles', desc: '电影字幕语料，多语言，口语研究常用', access: '免费', url: 'https://opus.nlpl.eu/OpenSubtitles.php' },
      ],
    },
    {
      category: '多语言 / NLP 数据集',
      items: [
        { name: 'Universal Dependencies (UD)', desc: '100+ 语言的依存句法标注树库', access: '免费开源', url: 'https://universaldependencies.org/' },
        { name: 'Common Crawl', desc: '互联网爬取的海量文本，训练词向量常用', access: '免费下载', url: 'https://commoncrawl.org/' },
        { name: 'Hugging Face Datasets', desc: '数千个 NLP 数据集，一键加载', access: '免费', url: 'https://huggingface.co/datasets' },
        { name: 'Wikipedia Dumps', desc: '维基百科全文转储，多种语言', access: '免费下载', url: 'https://dumps.wikimedia.org/' },
      ],
    },
    {
      category: '词汇与词典资源',
      items: [
        { name: 'WordNet / Chinese WordNet', desc: '英语/中文义项关系网络', access: '免费', url: 'https://wordnet.princeton.edu/' },
        { name: '情感词典合集', desc: 'BosonNLP、HowNet、NTUSD 等中文情感词典', access: '学术免费', url: '搜索"中文情感词典"获取各资源' },
        { name: 'SUBTLEX', desc: '基于字幕的词频数据库，覆盖中/英/法/荷等多种语言', access: '免费', url: 'https://www.ugent.be/pp/experimentele-psychologie/en/research/documents/subtlex' },
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="content-prose"
    >
      <h1>语言学数据集索引</h1>
      <p>
        以下是语言学研究中常用的公开数据集和语料库。使用前请查阅各资源的使用条款和引用规范。
      </p>

      {datasets.map((category, ci) => (
        <div key={ci}>
          <h2>{category.category}</h2>
          <div className="my-4 overflow-hidden rounded-2xl border-2 border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">名称</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">说明</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">访问方式</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {category.items.map((item, ii) => (
                  <tr key={ii} className={ii % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-4 py-3">
                      <a href={item.url} target="_blank" rel="noopener noreferrer"
                        className="font-semibold text-blue-700 hover:text-blue-900 underline decoration-blue-300 hover:decoration-blue-500">
                        {item.name}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{item.desc}</td>
                    <td className="px-4 py-3 text-slate-500">{item.access}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
        <h3 className="text-lg font-semibold text-amber-800 mb-2">使用数据集时的注意事项</h3>
        <ul className="text-amber-700 space-y-1.5 text-sm">
          <li><strong>引用规范</strong>：使用任何数据集都要按其要求引用。大多数数据集有专门的论文。</li>
          <li><strong>使用条款</strong>：有些只允许学术研究，有些允许商业用途。下载前确认。</li>
          <li><strong>数据版本</strong>：记录你使用的版本号和下载日期，保证研究可重复。</li>
          <li><strong>预处理说明</strong>：论文中说明你对原始数据做了哪些预处理（清洗、筛选、格式转换等）。</li>
        </ul>
      </div>
    </motion.div>
  );
}
