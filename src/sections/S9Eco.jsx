/* S9 插件生态：#eco —— 开源 / 开放 / 可复用 / 可组合 + 社区入口 + 生态动态轮播
   事实源：官网「加入 DSH 插件生态」段（四承诺与引言均为官方原文）；
   README（Discussions / dsh-plugin topic / 文档站 / Discord / CONTRIBUTING.md）。
   组件：CardSwap + Card · SplitText · GradientText · PixelTrail(.ld-ambient.dim)
   说明：契约原定的 ParticleTrail 在 rb/index.js 中不存在，改用 PixelTrail（粒子拖尾氛围，P6Gallery 已验证用法）。 */
import { CardSwap, Card, SplitText, GradientText, PixelTrail } from '../rb/index.js';

const PROMISES = [
  {
    key: '开源',
    en: 'Open Source',
    body: '仓库公开可审计，代码、架构与 Roadmap 都摊开在 GitHub 上；发现问题，直接在 Issues 与 Discussions 里提。',
    more: '安全说明（SAFETY.md）与第三方依赖许可（THIRD_PARTY_NOTICES.md）同样公开——审计不需要额外权限。'
  },
  {
    key: '开放',
    en: 'Open',
    body: '预览版面向全球开放测试，文档站、API 与社区入口对所有人开放，不设邀请码。',
    more: '安装只需 Node.js 与一条 npx 命令；文档站从安装到写插件都有现成路径。'
  },
  {
    key: '可复用',
    en: 'Reusable',
    body: '插件写一次，就能装进自己的 Harness；为插件仓库加上 dsh-plugin 话题，别人也更容易找到它。',
    more: 'dsh-plugin 话题即公共目录：给仓库加上该话题，插件就能被检索与发现。'
  },
  {
    key: '可组合',
    en: 'Composable',
    body: '工具、技能与界面都是插件，插件之间自由组合，把能力拼成适合你的工作方式。',
    more: '官方介绍的原话：插件之间自由组合成新能力——工具、技能与界面皆可互为积木。'
  }
];

const ENTRIES = [
  {
    name: 'GitHub Discussions',
    desc: '提交反馈、缺陷报告与功能建议的第一站，公测期的问题大多在这里流转。',
    href: 'https://github.com/deepseek-ai/deepseek-harness/discussions'
  },
  {
    name: 'dsh-plugin 话题',
    desc: '为你的插件仓库添加 dsh-plugin topic，让插件更容易被检索与发现。',
    href: 'https://github.com/topics/dsh-plugin'
  },
  {
    name: '开发者文档站',
    desc: '安装、架构与插件开发指南，从一条命令到写一个插件都有路径。',
    href: 'https://deepseek-harness.github.io/deepseek-harness/'
  },
  {
    name: 'Cordis 论文',
    desc: '《A Programming Paradigm for Spatiotemporal Composability》——「一切皆插件」背后的驱动论文。',
    href: 'https://arxiv.org/abs/2608.25512'
  },
  {
    name: 'Discord 社区',
    desc: 'README 给出的 Discord 社区入口，与全球用户和开发者交流。',
    href: 'https://discord.gg/4MrtZUhpxg'
  }
];

const ECO_CARDS = [
  {
    text: '「DeepSeek Harness 预览版的核心插件和基础 API 将持续迭代。」',
    meta: '官方介绍 · 持续迭代'
  },
  {
    text: '「我们期待与全球用户和开发者一起，在开源、开放、可复用、可组合的基础设施之上，共同探索智能上限。」',
    meta: '官方介绍 · 共同探索'
  },
  {
    text: '「安装现有插件，或在『创造模式』中通过对话创建插件，扩展工具、技能和界面。」',
    meta: '官方介绍 · 一切皆插件'
  }
];

export default function S9Eco() {
  return (
    <section id="eco" className="ld-section">
      <div className="ld-ambient dim" aria-hidden="true">
        <PixelTrail gridSize={28} color="#4D6BFE" gooeyFilter={{ strength: 2 }} shine={0.5} glow={0.35} />
      </div>

      <p className="sec-label" data-reveal>JOIN THE ECOSYSTEM · 加入 DSH 插件生态</p>
      <SplitText
        tag="h2"
        className="ld-h2 sc-split-h2"
        text="在开源、开放、可复用、可组合的基础设施上共建"
        effect="rise"
        splitType="chars"
        delay={40}
        duration={0.9}
        trigger="view"
      />
      <p className="ld-lead" data-reveal>
        预览版的核心插件和基础 API 将持续迭代。我们期待与全球用户和开发者一起，在
        <GradientText colors={['#4D6BFE', '#7A96FF', '#B497CF']} animationSpeed={6} variant="flow" yoyo style={{ fontSize: 'inherit' }}>开源、开放、可复用、可组合</GradientText>
        的基础设施之上，共同探索智能上限。
      </p>

      <blockquote className="sc-eco-quote" data-reveal>
        <p>「DeepSeek Harness 预览版的核心插件和基础 API 将持续迭代。我们期待与全球用户和开发者一起，在开源、开放、可复用、可组合的基础设施之上，共同探索智能上限。」</p>
        <cite>—— DeepSeek Harness 官方介绍</cite>
      </blockquote>

      <div className="sc-eco-promises">
        {PROMISES.map((p, i) => (
          <div className="ld-card sc-promise" data-reveal key={p.key} data-delay={i % 3 === 1 ? '1' : i % 3 === 2 ? '2' : undefined}>
            <h3>{p.key} <span className="sc-en">{p.en}</span></h3>
            <p>{p.body}</p>
            <details className="ld-expand">
              <summary>再多说一点</summary>
              <div className="ld-expand-body">{p.more}</div>
            </details>
          </div>
        ))}
      </div>

      <div className="ld-grid cols2 sc-eco-cols">
        <div className="sc-eco-entries" data-reveal>
          <h3 className="sc-eco-sub">社区入口 <span className="sc-en">Where to join</span></h3>
          <ul>
            {ENTRIES.map(e => (
              <li className="sc-eco-entry" key={e.name}>
                <div className="sc-eco-entry-body">
                  <strong>{e.name}</strong>
                  <p>{e.desc}</p>
                </div>
                {e.href
                  ? <a className="sc-eco-link" href={e.href} target="_blank" rel="noreferrer">前往 →</a>
                  : <span className="sc-eco-link is-plain">见官方介绍</span>}
              </li>
            ))}
          </ul>
        </div>
        <div className="sc-eco-swap" data-reveal data-delay="1">
          <h3 className="sc-eco-sub">生态动态 <span className="sc-en">From the official intro</span></h3>
          <CardSwap width={320} height={184} cardDistance={44} verticalDistance={52} skewAmount={5} autoplay delay={2800} speed={1} cardRadius={14} theme="light" pauseOnHover>
            {ECO_CARDS.map((c, i) => (
              <Card key={i}>
                <div className="swap-bubble">
                  {c.text}
                  <div className="meta">{c.meta}</div>
                </div>
              </Card>
            ))}
          </CardSwap>
          <p className="sc-eco-swap-cap">生态动态轮播 · 内容摘自官方介绍 · 悬停暂停</p>
        </div>
      </div>
    </section>
  );
}