/* P2 特性一：Everything is a plugin（官方） */
import { GlideSelect, GradientText, CursorGrid } from '../rb/index.js';

const PLUG_KINDS = [
  { name: '工具插件', desc: '文件系统、Shell、浏览器——Agent 的手脚', demo: 'shell' },
  { name: '技能插件', desc: '把一套流程固化成可复用的技能', demo: 'skill' },
  { name: '界面插件', desc: 'Web 面板、IM 群——Agent 被看见的方式', demo: 'ui' }
];

export default function PagePlugin() {
  return (
    <div className="page-wrap pos-rel" style={{ position: 'relative' }}>
      <div className="page-bg" aria-hidden="true">
        <CursorGrid color="#8FA6FF" gridColor="#3A54D9" cellSize={52} gridOpacity={0.14} lightMode />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p className="sec-label">EXPANDING CAPABILITIES · 特性一</p>
        <p className="scene-statement" style={{ marginTop: 18 }}>
          <GradientText colors={['#4D6BFE', '#7A96FF', '#B497CF']} animationSpeed={6} variant="flow" yoyo style={{ fontSize: 'inherit' }}>
            Everything is a plugin
          </GradientText>
        </p>
        <p className="scene-note" style={{ maxWidth: 680 }}>
          安装插件，或者在 <strong style={{ color: 'var(--ink)' }}>Creator mode</strong> 里用聊天直接创建——
          扩展 Agent 的工具、技能与界面。插件是 Harness 的一切：能力不是配置出来的，是装上去的。
        </p>

        <div className="plugin-rows" data-reveal>
          {PLUG_KINDS.map(k => (
            <div className="plugin-row" key={k.name}>
              <div>
                <div className="p-name">{k.name}</div>
                <p className="p-desc">{k.desc}</p>
              </div>
              <div className="p-widget">
                <span className="mini-chip">{k.demo}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="creator-demo" data-reveal>
          <div className="creator-chat">
            <div className="cc-head">Creator mode · 聊着聊着，插件就写好了</div>
            <div className="cc-body">
              <div className="bubble-me">帮我做一个「每日站会前自动汇总 issue」的插件</div>
              <div className="bubble-ai">
                好的，插件 <b>dsh-plugin-standup</b> 已创建：每天 09:30 拉取 open issue，
                按优先级排序生成摘要，发送到你的面板。要调整触发时间吗？
              </div>
            </div>
          </div>
          <p className="eco-caption">Creator mode 示意 · 官方能力</p>
        </div>
      </div>
    </div>
  );
}
