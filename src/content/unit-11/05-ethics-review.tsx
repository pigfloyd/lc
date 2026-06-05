import { useState } from 'react';
import { motion } from 'framer-motion';
import CodeBlock from '../../components/shared/CodeBlock';
import StepThrough from '../../components/shared/StepThrough';

// ── Ethics Checklist ─────────────────────────────────────────────
function EthicsChecklist() {
  const [checked, setChecked] = useState<boolean[]>(new Array(8).fill(false));

  const items = [
    { text: '研究涉及人类被试（录音、问卷、实验）', risk: 'high' },
    { text: '收集了可识别个人信息（姓名、学号、联系方式）', risk: 'high' },
    { text: '使用了社交媒体上的公开文本（微博、论坛帖子）', risk: 'medium' },
    { text: '研究对象包含未成年人', risk: 'high' },
    { text: '使用了语料库中他人的录音/文本数据', risk: 'medium' },
    { text: '研究涉及敏感话题（政治、宗教、健康、犯罪）', risk: 'high' },
    { text: '数据将公开共享或存入开放语料库', risk: 'medium' },
    { text: '使用了机器翻译或 AI 工具处理被试数据', risk: 'low' },
  ];

  const toggle = (i: number) => {
    const next = [...checked];
    next[i] = !next[i];
    setChecked(next);
  };

  const checkedCount = checked.filter(Boolean).length;
  const highRisk = items.filter((item, i) => checked[i] && item.risk === 'high').length;

  return (
    <div className="my-6 p-6 bg-white rounded-2xl border-2 border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">伦理风险自查清单</h3>
      <p className="text-sm text-slate-600 mb-4">勾选你的研究涉及的项目，评估是否需要伦理审查。</p>

      <div className="space-y-2 mb-4">
        {items.map((item, i) => (
          <label key={i} className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
            checked[i]
              ? item.risk === 'high' ? 'bg-red-50 border border-red-200' :
                item.risk === 'medium' ? 'bg-amber-50 border border-amber-200' :
                'bg-blue-50 border border-blue-200'
              : 'bg-slate-50 border border-slate-100 hover:bg-slate-100'
          }`}>
            <input
              type="checkbox"
              checked={checked[i]}
              onChange={() => toggle(i)}
              className="mt-1 accent-blue-500"
            />
            <span className="text-sm text-slate-700">{item.text}</span>
          </label>
        ))}
      </div>

      {checkedCount > 0 && (
        <div className={`p-4 rounded-xl border-2 ${
          highRisk > 0
            ? 'border-red-300 bg-red-50'
            : checkedCount > 2
            ? 'border-amber-300 bg-amber-50'
            : 'border-green-300 bg-green-50'
        }`}>
          {highRisk > 0 ? (
            <p className="text-red-800 font-semibold text-sm">
              你的研究涉及 {highRisk} 个高风险项目。强烈建议提交伦理审查申请（IRB），并确保获得知情同意。
            </p>
          ) : checkedCount > 2 ? (
            <p className="text-amber-800 font-semibold text-sm">
              你的研究有一定伦理风险。建议咨询导师或伦理委员会，确认是否需要审查。
            </p>
          ) : (
            <p className="text-green-800 font-semibold text-sm">
              伦理风险较低。但仍需注意数据匿名化和使用授权。
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default function Section() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="content-prose"
    >
      <h2>伦理审查与数据伦理</h2>
      <p>
        做研究不仅要方法正确，还要<strong>合乎伦理</strong>。语言学研究涉及人类被试的录音、问卷、实验数据，
        以及网络上公开的文本。忽视伦理问题可能导致论文被拒、学位被撤销，甚至法律纠纷。
      </p>

      <EthicsChecklist />

      {/* ===== IRB ===== */}
      <h2>1. 什么是伦理审查（IRB）？</h2>
      <p>
        IRB（Institutional Review Board，机构审查委员会）是大学或研究机构中负责审查研究伦理的部门。
        在中国通常称为<strong>伦理委员会</strong>或<strong>学术伦理审查委员会</strong>。
      </p>

      <div className="my-6 p-5 rounded-2xl border-2 border-blue-200 bg-blue-50">
        <h3 className="text-base font-semibold text-blue-800 mb-2">需要伦理审查的研究</h3>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>收集人类被试的<strong>录音、访谈、问卷数据</strong></li>
          <li>进行<strong>实验</strong>（如反应时实验、眼动实验、判断任务）</li>
          <li>分析<strong>可识别的个人数据</strong>（如学号、姓名、联系方式）</li>
          <li>研究对象包含<strong>未成年人</strong>（需要监护人同意）</li>
          <li>涉及<strong>敏感话题</strong>（政治观点、健康状况、犯罪记录等）</li>
        </ul>
      </div>

      <div className="my-6 p-5 rounded-2xl border-2 border-amber-200 bg-amber-50">
        <h3 className="text-base font-semibold text-amber-800 mb-2">不需要伦理审查的研究</h3>
        <ul className="text-amber-700 text-sm space-y-1">
          <li>分析<strong>已公开的语料库</strong>（如 BCC、COCA 等标注好的语料库）</li>
          <li>使用<strong>政府公开数据</strong>（如人口普查中的语言使用数据）</li>
          <li>纯<strong>文献综述</strong>或<strong>方法论研究</strong></li>
          <li>分析<strong>你自己编写或生成的数据</strong></li>
        </ul>
      </div>

      {/* ===== 知情同意 ===== */}
      <h2>2. 知情同意</h2>
      <p>
        如果你的研究涉及人类被试，必须获得<strong>知情同意</strong>（informed consent）——
        被试需要知道他们在做什么、数据会怎么用、有什么风险，并且有权随时退出。
      </p>

      <StepThrough
        steps={[
          {
            title: '知情同意书的基本要素',
            content: (
              <div>
                <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5">
                  <li><strong>研究目的</strong>：简单说明你要做什么研究</li>
                  <li><strong>参与内容</strong>：被试需要做什么（如朗读、填问卷、做实验任务）</li>
                  <li><strong>时间预估</strong>：需要多长时间</li>
                  <li><strong>数据用途</strong>：数据仅用于学术研究 / 可能公开发表 / 将存入语料库</li>
                  <li><strong>风险与收益</strong>：可能的不适（如疲劳）和贡献（推进学术研究）</li>
                  <li><strong>自愿原则</strong>：参与完全自愿，可随时退出且不受任何惩罚</li>
                  <li><strong>保密措施</strong>：数据如何匿名化、谁可以访问</li>
                  <li><strong>联系方式</strong>：研究者和伦理委员会的联系方式</li>
                </ul>
              </div>
            ),
          },
          {
            title: '在线研究的知情同意',
            content: (
              <div>
                <p className="text-sm text-slate-600 mb-2">
                  网络问卷和在线实验通常在第一页展示知情同意书，被试点击"同意"后才能继续。
                </p>
                <CodeBlock
                  code={`# 在线问卷的知情同意页面示例（伪代码）
consent_text = """
本研究由 XX 大学语言学系开展，旨在调查学习者对语言变异的态度。

参与本研究需要完成一份约 15 分钟的问卷。
您的回答将完全匿名，仅用于学术研究。
您可以随时退出，无需说明理由。

如您同意参与，请点击"同意并继续"。
"""

# 记录同意时间戳
import datetime
consent_record = {
    'participant_id': generate_anonymous_id(),
    'consent_time': datetime.datetime.now().isoformat(),
    'consent_given': True,
}`}
                  showLineNumbers={false}
                />
              </div>
            ),
          },
          {
            title: '口头同意 vs 书面同意',
            content: (
              <div>
                <p className="text-sm text-slate-600 mb-2">不同场景需要不同的同意方式：</p>
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                    <span className="font-semibold text-blue-800">书面同意</span>
                    <p className="text-sm text-blue-700 mt-1">面对面实验、录音采集。被试在同意书上签字。</p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-50 border border-green-200">
                    <span className="font-semibold text-green-800">电子同意</span>
                    <p className="text-sm text-green-700 mt-1">在线问卷、远程实验。被试勾选"我同意"并提交。</p>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                    <span className="font-semibold text-amber-800">口头同意</span>
                    <p className="text-sm text-amber-700 mt-1">某些田野调查场景。需录音记录同意过程。</p>
                  </div>
                </div>
              </div>
            ),
          },
        ]}
      />

      {/* ===== 数据隐私 ===== */}
      <h2>3. 数据隐私与匿名化</h2>
      <p>
        收集到的数据必须妥善保护，防止被试的个人身份被识别。
      </p>

      <CodeBlock
        code={`import pandas as pd

# 原始数据（包含可识别信息）
raw_data = pd.DataFrame({
    'name': ['张三', '李四', '王五'],
    'student_id': ['2024001', '2024002', '2024003'],
    'phone': ['138xxxx1234', '139xxxx5678', '137xxxx9012'],
    'utterance': ['我觉得这个很好', '不太确定', '完全同意'],
    'age': [22, 25, 23],
})

# 匿名化处理
clean_data = raw_data.drop(columns=['name', 'phone'])
clean_data['participant_id'] = ['P01', 'P02', 'P03']  # 用代号替代学号
clean_data = clean_data.drop(columns=['student_id'])

print(clean_data)
#   utterance  age participant_id
# 0  我觉得这个很好   22            P01
# 1  不太确定      25            P02
# 2  完全同意      23            P03`}
        highlightLines={[11, 12, 13]}
      />

      <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold text-slate-700">数据类型</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">匿名化方法</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              ['姓名、学号', '删除或替换为代号（P01, P02, ...）'],
              ['联系方式（电话、邮箱）', '完全删除'],
              ['录音', '变声处理或仅保留文字转写'],
              ['面部照片', '打码或不收集'],
              ['地理位置', '模糊到省级或删除'],
              ['社交媒体用户名', '替换为匿名代号'],
            ].map(([type, method], i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="px-4 py-3 font-semibold text-slate-700">{type}</td>
                <td className="px-4 py-3 text-slate-600">{method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== 语料使用授权 ===== */}
      <h2>4. 语料使用授权</h2>
      <p>
        使用他人的语料库或网络数据时，需要确认你有权使用。
      </p>

      <div className="my-6 space-y-3">
        {[
          {
            title: '学术语料库（BCC、COCA、CCL 等）',
            desc: '通常有明确的使用许可，按其规定引用即可。注意是否允许二次分发。',
            color: 'green',
          },
          {
            title: '自行爬取的网络数据',
            desc: '检查网站的 robots.txt 和 Terms of Service。学术用途通常可以，但大规模再发布可能侵权。',
            color: 'amber',
          },
          {
            title: '社交媒体数据（微博、Twitter/X）',
            desc: '平台的 API 使用条款可能限制数据分享。即使公开发布的内容，引用时也应匿名化。',
            color: 'amber',
          },
          {
            title: 'AI 生成的数据（ChatGPT 等）',
            desc: '如果用 AI 生成模拟数据，需要在论文中说明。AI 生成的数据不能替代真实语料。',
            color: 'blue',
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className={`p-4 rounded-xl border-l-4 ${
              item.color === 'green' ? 'border-green-400 bg-green-50' :
              item.color === 'amber' ? 'border-amber-400 bg-amber-50' :
              'border-blue-400 bg-blue-50'
            }`}
          >
            <div className="font-semibold text-slate-800">{item.title}</div>
            <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* ===== GDPR ===== */}
      <h2>5. 个人信息保护法</h2>
      <p>
        中国的《个人信息保护法》（2021 年施行）和欧盟的 GDPR 都对个人数据的收集、存储和使用有严格规定。
        作为研究者，你需要了解以下基本要求：
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold text-slate-700">要求</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">研究中的做法</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              ['知情同意', '在收集数据前告知被试并获得同意'],
              ['最小化原则', '只收集研究必需的数据，不收集无关信息'],
              ['存储安全', '数据加密存储，限制访问权限'],
              ['保留期限', '研究结束后按规定保留或销毁数据'],
              ['被试权利', '被试有权要求查看、更正或删除自己的数据'],
            ].map(([req, practice], i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="px-4 py-3 font-semibold text-slate-700">{req}</td>
                <td className="px-4 py-3 text-slate-600">{practice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
        <h3 className="text-lg font-semibold text-amber-800 mb-2">写论文时的伦理声明</h3>
        <p className="text-amber-700 text-sm mb-2">
          大多数期刊和学位论文都要求在方法部分写一段伦理声明，说明：
        </p>
        <ul className="text-amber-700 text-sm space-y-1 list-disc pl-5">
          <li>是否获得了伦理审查批准（附批准编号）</li>
          <li>是否获得了被试的知情同意</li>
          <li>数据如何匿名化和存储</li>
          <li>利益冲突声明（如有无）</li>
        </ul>
      </div>
    </motion.div>
  );
}
