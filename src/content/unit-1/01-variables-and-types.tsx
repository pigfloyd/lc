import { motion } from 'framer-motion';
import CodeBlock from '../../components/shared/CodeBlock';
import StepThrough from '../../components/shared/StepThrough';
import TypeBadge from '../../components/shared/TypeBadge';

export default function Section() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="content-prose"
    >
      {/* ===== 第 1 节：引入 — 变量就像贴了标签的容器 ===== */}
      <h2>变量就像贴了标签的容器</h2>
      <p>
        当你做语言学分析时，会接触到各种数据：语料库的名称、词频统计结果、平均句长、是否是被动句……
      </p>
      <p>
        变量（variable）就像给这些数据<b>贴上了标签的容器</b>。你把数据放进容器里，贴上名字，以后就可以随时找到它。
      </p>

      <div className="flex flex-wrap gap-6 justify-center my-8">
        {[
          { name: 'corpus', value: '"CLC"', type: 'str' as const },
          { name: 'word_count', value: '128', type: 'int' as const },
          { name: 'is_passive', value: 'True', type: 'bool' as const },
        ].map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.3, duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="w-32 h-32 md:w-36 md:h-36 rounded-2xl border-2 border-blue-300 bg-blue-50 shadow-sm flex items-center justify-center">
              <span className="text-xl md:text-2xl font-mono font-bold text-blue-700">
                {item.value}
              </span>
            </div>
            <div className="mt-3 px-3 py-1.5 rounded-full bg-blue-500 text-white text-sm font-mono font-semibold shadow-sm">
              {item.name}
            </div>
            <TypeBadge type={item.type} size="sm" className="mt-2" />
          </motion.div>
        ))}
      </div>

      <p>
        上面三个变量分别存了<strong>字符串</strong>、<strong>整数</strong>和<strong>布尔值</strong>——这就是 Python 最基本的三种数据类型。下面我们一步步来学。
      </p>

      {/* ===== 第 2 节：把数据放进变量 ===== */}
      <h2>把数据放进变量</h2>
      <p>
        在 Python 中，<code>=</code> 不是数学里的"等于"，而是<b>"把右边的值赋给左边的变量"</b>。
      </p>

      <CodeBlock
        code={`# 把语料库名称存起来
corpus = "CLC"

# 把统计结果存起来
sentence_count = 5000
avg_length = 15.3

# 打印出来看看
print(corpus)
print(sentence_count)`}
      />

      <StepThrough
        steps={[
          {
            title: '创建变量',
            content: (
              <div>
                <p>
                  <code>=</code> 右边的值 <code>"CLC"</code> 被存入名为 <code>corpus</code> 的变量。
                </p>
                <CodeBlock
                  code={`corpus = "CLC"`}
                  highlightLines={[1]}
                  showLineNumbers={false}
                />
              </div>
            ),
          },
          {
            title: '使用变量',
            content: (
              <div>
                <p>
                  现在只要写 <code>corpus</code>，Python 就知道你指的是 <code>"CLC"</code>。
                </p>
                <CodeBlock
                  code={`print(corpus)  # 输出：CLC`}
                  highlightLines={[1]}
                  showLineNumbers={false}
                />
              </div>
            ),
          },
          {
            title: '一次存多个',
            content: (
              <div>
                <p>你可以创建任意多个变量，每个变量存一种数据。</p>
                <CodeBlock
                  code={`corpus = "CLC"
sentence_count = 5000
avg_length = 15.3`}
                  showLineNumbers={false}
                />
              </div>
            ),
          },
          {
            title: '修改变量',
            content: (
              <div>
                <p>
                  变量是可以修改的——把旧值读出来，计算后再存回去。
                </p>
                <CodeBlock
                  code={`sentence_count = 5000
sentence_count = sentence_count + 200
print(sentence_count)  # 5200`}
                  highlightLines={[2]}
                  showLineNumbers={false}
                />
              </div>
            ),
          },
        ]}
      />

      {/* ===== 第 3 节：四种基本类型 ===== */}
      <h2>四种基本数据类型</h2>
      <p>
        每种数据都有自己所属的<strong>类型</strong>（type）。Python 通过类型知道如何处理这些数据。四个最基本的数据类型是：
      </p>

      <StepThrough
        steps={[
          {
            title: 'int — 整数',
            content: (
              <div>
                <div className="flex justify-center mb-4">
                  <TypeBadge type="int" size="lg" />
                </div>
                <p>
                  语言学中最常用的计数单位。你的<strong>词频统计、句子数量、参与者人数</strong>——都是整数。
                </p>
                <CodeBlock
                  code={`# 词频统计结果是整数
word_freq = 128        # "把"字句出现了 128 次
num_participants = 30  # 实验有 30 名参与者`}
                />
              </div>
            ),
          },
          {
            title: 'float — 浮点数',
            content: (
              <div>
                <div className="flex justify-center mb-4">
                  <TypeBadge type="float" size="lg" />
                </div>
                <p>
                  需要精确度的量——<strong>标准化频率、平均句长、反应时间</strong>——都是浮点数（带小数点的数）。
                </p>
                <CodeBlock
                  code={`# 频率标准化后通常变成小数
type_token_ratio = 0.67      # 类符/形符比
mean_sentence_length = 15.3  # 平均句长 15.3 词`}
                />
              </div>
            ),
          },
          {
            title: 'str — 字符串',
            content: (
              <div>
                <div className="flex justify-center mb-4">
                  <TypeBadge type="str" size="lg" />
                </div>
                <p>
                  语言学研究的核心——<strong>文本数据</strong>。语料库名称、目标词、例句——都是字符串。字符串需要用引号（<code>'</code> 或 <code>"</code>）括起来。
                </p>
                <CodeBlock
                  code={`# 文本数据用字符串
target_word = "把"
corpus_name = "现代汉语语料库"
example = "他把书放在桌子上。"`}
                />
              </div>
            ),
          },
          {
            title: 'bool — 布尔值',
            content: (
              <div>
                <div className="flex justify-center mb-4">
                  <TypeBadge type="bool" size="lg" />
                </div>
                <p>
                  用来回答<strong>"是 / 否"的问题</strong>。这个句子是被动句吗？这个音素是浊音吗？是就是 <code>True</code>，不是就是 <code>False</code>。
                </p>
                <CodeBlock
                  code={`# 判断句子的属性
is_passive = True        # 这个句子是被动语态
has_negation = False     # 这个句子不含否定词`}
                />
              </div>
            ),
          },
        ]}
      />

      {/* ===== 第 4 节：用 type() 检查类型 ===== */}
      <h2>用 type() 检查类型</h2>
      <p>
        如果不确定一个变量的类型，可以用 <code>type()</code> 来问 Python。
      </p>

      <StepThrough
        steps={[
          {
            title: '猜猜看',
            content: (
              <div>
                <p>先猜猜看——<code>count</code> 是什么类型？然后点"下一步"揭晓答案。</p>
                <CodeBlock
                  code={`count = 42`}
                  showLineNumbers={false}
                />
              </div>
            ),
          },
          {
            title: '揭晓：int',
            content: (
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <TypeBadge type="int" size="md" />
                  <code className="text-base">type(count) → &lt;class 'int'&gt;</code>
                </div>
                <CodeBlock
                  code={`count = 42
print(type(count))  # <class 'int'>`}
                  highlightLines={[2]}
                />
              </div>
            ),
          },
          {
            title: '再猜一个',
            content: (
              <div>
                <p><code>ratio</code> 是什么类型？</p>
                <CodeBlock
                  code={`ratio = 0.67`}
                  showLineNumbers={false}
                />
              </div>
            ),
          },
          {
            title: '揭晓：float',
            content: (
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <TypeBadge type="float" size="md" />
                  <code className="text-base">type(ratio) → &lt;class 'float'&gt;</code>
                </div>
                <CodeBlock
                  code={`ratio = 0.67
print(type(ratio))  # <class 'float'>`}
                  highlightLines={[2]}
                />
              </div>
            ),
          },
          {
            title: '再来一个',
            content: (
              <div>
                <p><code>word</code> 是什么类型？</p>
                <CodeBlock
                  code={`word = "把"`}
                  showLineNumbers={false}
                />
              </div>
            ),
          },
          {
            title: '揭晓：str',
            content: (
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <TypeBadge type="str" size="md" />
                  <code className="text-base">type(word) → &lt;class 'str'&gt;</code>
                </div>
                <CodeBlock
                  code={`word = "把"
print(type(word))  # <class 'str'>`}
                  highlightLines={[2]}
                />
              </div>
            ),
          },
          {
            title: '最后一个',
            content: (
              <div>
                <p><code>ok</code> 是什么类型？</p>
                <CodeBlock
                  code={`ok = True`}
                  showLineNumbers={false}
                />
              </div>
            ),
          },
          {
            title: '揭晓：bool',
            content: (
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <TypeBadge type="bool" size="md" />
                  <code className="text-base">type(ok) → &lt;class 'bool'&gt;</code>
                </div>
                <CodeBlock
                  code={`ok = True
print(type(ok))  # <class 'bool'>`}
                  highlightLines={[2]}
                />
              </div>
            ),
          },
        ]}
      />

      <p>
        <code>type()</code> 的输出格式是 <code>&lt;class '类型名'&gt;</code>——你现在不需要记住这个格式，只要知道它告诉你是 int、float、str 还是 bool 就够了。
      </p>

      {/* ===== 第 5 节：类型转换 ===== */}
      <h2>类型转换</h2>
      <p>
        有时你需要把数据从一种类型转换成另一种。最常见的场景是：<strong>从文件或 CSV 读进来的数字其实是字符串</strong>，需要转成 int 或 float 才能计算。
      </p>

      <StepThrough
        steps={[
          {
            title: '问题',
            content: (
              <div>
                <p>
                  <code>count_str</code> 是字符串，不能直接跟数字相加。需要先转换。
                </p>
                <CodeBlock
                  code={`# 从文件读到的数字其实是字符串
count_str = "42"
print(count_str + 8)   # 报错！`}
                  highlightLines={[3]}
                />
              </div>
            ),
          },
          {
            title: 'str → int',
            content: (
              <div>
                <p>
                  <code>int()</code> 把字符串 <code>"42"</code> 转换成整数 <code>42</code>。
                </p>
                <CodeBlock
                  code={`count_str = "42"
count = int(count_str)    # 转成整数
print(count + 8)          # 50 —— 可以计算了！`}
                  highlightLines={[2, 3]}
                />
              </div>
            ),
          },
          {
            title: '自动变 float',
            content: (
              <div>
                <p>
                  两个整数相除，结果<strong>自动变成浮点数</strong>。
                </p>
                <CodeBlock
                  code={`total = 350
passive_count = 42
percentage = passive_count / total * 100
print(percentage)   # 12.0`}
                  highlightLines={[3]}
                />
              </div>
            ),
          },
          {
            title: 'int → str',
            content: (
              <div>
                <p>
                  <code>str()</code> 把数字转成字符串，这样就可以和其他字符串拼接了。
                </p>
                <CodeBlock
                  code={`corpus = "BNC"
year = 1994
label = corpus + "_" + str(year)
print(label)   # BNC_1994`}
                  highlightLines={[3]}
                />
              </div>
            ),
          },
          {
            title: '温馨提示',
            content: (
              <div>
                <p>
                  并非所有字符串都能转成数字。试试 <code>int("hello")</code> —— Python 会报错。
                </p>
                <p className="text-slate-500">
                  转换时确保内容匹配——只有看起来像数字的字符串才能转换。
                </p>
              </div>
            ),
          },
        ]}
      />

      {/* ===== 第 6 节：变量命名规则 ===== */}
      <h2>变量命名规则</h2>
      <p>给变量取名时，有一些规则需要遵守：</p>

      <ul>
        <li>必须以<strong>字母或下划线</strong>开头</li>
        <li>只能包含字母、数字、下划线</li>
        <li>区分大小写（<code>Name</code> 和 <code>name</code> 是不同的变量）</li>
        <li>不能使用 Python 保留字（如 <code>print</code>、<code>if</code>、<code>for</code>）</li>
        <li>推荐风格：小写 + 下划线分隔（snake_case），名字<strong>见名知意</strong></li>
      </ul>

      <div className="grid md:grid-cols-2 gap-4 my-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="p-5 rounded-xl border border-green-300 bg-green-50"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">✅</span>
            <span className="font-semibold text-green-800">推荐写法</span>
          </div>
          <ul className="font-mono text-sm text-green-700 space-y-1.5 list-none pl-0">
            <li>corpus_name</li>
            <li>word_freq</li>
            <li>is_passive</li>
            <li>mean_length</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="p-5 rounded-xl border border-red-300 bg-red-50"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">❌</span>
            <span className="font-semibold text-red-800">避免这样</span>
          </div>
          <ul className="font-mono text-sm text-red-700 space-y-1.5 list-none pl-0">
            <li>a（含义不明）</li>
            <li>1st_corpus（数字开头）</li>
            <li>class（Python 保留字）</li>
            <li>myVar（风格不统一）</li>
          </ul>
        </motion.div>
      </div>

      {/* ===== 第 7 节：小结 ===== */}
      <h2>小结</h2>

      <table>
        <thead>
          <tr>
            <th>类型</th>
            <th>标识</th>
            <th>示例</th>
            <th>语言学用途</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="align-middle">int</td>
            <td className="align-middle"><TypeBadge type="int" size="sm" /></td>
            <td className="align-middle font-mono">128</td>
            <td>词频、句子数、参与者人数</td>
          </tr>
          <tr>
            <td className="align-middle">float</td>
            <td className="align-middle"><TypeBadge type="float" size="sm" /></td>
            <td className="align-middle font-mono">0.67</td>
            <td>TTR、平均句长、反应时间</td>
          </tr>
          <tr>
            <td className="align-middle">str</td>
            <td className="align-middle"><TypeBadge type="str" size="sm" /></td>
            <td className="align-middle font-mono">"把"</td>
            <td>语料库名称、目标词、例句</td>
          </tr>
          <tr>
            <td className="align-middle">bool</td>
            <td className="align-middle"><TypeBadge type="bool" size="sm" /></td>
            <td className="align-middle font-mono">True</td>
            <td>语法判断、属性标记</td>
          </tr>
        </tbody>
      </table>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-6">
        <h3 className="text-lg font-semibold text-amber-800 mb-3">✏️ 试试看</h3>
        <p className="text-amber-700 mb-3">
          打开 Python 解释器（或在纸上写出），为以下语言学概念创建变量：
        </p>
        <ol className="text-amber-800 space-y-2">
          <li>
            你的名字 → <code>name = "你的名字"</code>
          </li>
          <li>
            你读过的语言学论文数 → <code>papers_read = ?</code>
          </li>
          <li>
            你最喜欢的语言 → <code>fav_lang = "?"</code>
          </li>
          <li>
            这句话是否是疑问句 → <code>is_interrogative = ?</code>
          </li>
        </ol>
        <p className="text-amber-700 mt-3">
          然后用 <code>type()</code> 查看每个变量的类型。
        </p>
      </div>

      <p>
        这就是 Python 的四个基本数据类型。下一节我们将学习如何把多个数据组织在一起——<strong>列表与字典</strong>。
      </p>
    </motion.div>
  );
}
