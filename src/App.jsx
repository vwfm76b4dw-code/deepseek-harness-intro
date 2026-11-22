/* App：多页舞台 + 影绘转场编排 + chrome/pager */
import { Chrome, MontageCanvas, usePageTransitions } from './engine.jsx';
import { BlindsLayer, PixelWaveLayer, ClockLayer, ShotFrame } from './transitions.jsx';
import PageCover from './pages/P1Cover.jsx';
import PagePlugin from './pages/P2Plugin.jsx';
import PageTasks from './pages/P3Tasks.jsx';
import PageWorkflow from './pages/P4Workflow.jsx';
import PageDevTools from './pages/P5DevTools.jsx';
import PageDevExp from './pages/P6DevExp.jsx';
import PageEcosystem from './pages/P7Ecosystem.jsx';
import PageCta from './pages/P8Cta.jsx';

const PAGES = [
  { comp: PageCover, script: ['重播', 'READY?', 'GO'] },
  { comp: PagePlugin, script: ['插件', 'Creator mode', '聊着创建'] },
  { comp: PageTasks, script: ['任务范围', '直接预览', '对话精炼'] },
  { comp: PageWorkflow, script: ['工作流', '定时运行', '随时开始'] },
  { comp: PageDevTools, script: ['开发者工具', '执行轨迹', '看得见内部'] },
  { comp: PageDevExp, script: ['一条命令', 'Web UI', '立即启动'] },
  { comp: PageEcosystem, script: ['插件生态', '全球共建', '智能边界'] },
  { comp: PageCta, script: ['下载桌面版', '就现在', 'Ready'] }
];

const SCRIPTS = PAGES.map(p => p.script);

function App() {
  const { cur, go, montage, fxMode, setFxMode } = usePageTransitions({ total: PAGES.length, scripts: SCRIPTS });
  const Page = PAGES[cur].comp;
  const closing = montage && montage.closing;

  return (
    <>
      <Chrome page={cur} total={PAGES.length} fxMode={fxMode} onFxMode={setFxMode} />
      <div className="stage">
        <div className="page-full" key={'c' + cur}>
          <Page go={go} />
        </div>
        {montage && montage.mode === 'shadow' && !closing && <MontageCanvas word={montage.word} />}
        {montage && montage.mode === 'shadow' && closing && <div className="white-fadeout" aria-hidden="true" />}
        {montage && montage.mode !== 'shadow' && (
          <div className={`montage on ${montage.mode}-mode ${closing ? `m-closing-${montage.mode}` : ''}`}>
            {montage.mode === 'blinds' && <BlindsLayer phase={closing ? 'reveal' : 'cover'} />}
            {montage.mode === 'pixelWave' && <PixelWaveLayer phase={closing ? 'reveal' : 'cover'} />}
            {montage.mode === 'clock' && <ClockLayer phase={closing ? 'reveal' : 'cover'} />}
            {montage.mode === 'match' && !closing && <div className="mc-panel" style={{ animationDuration: '2.2s' }} />}
            <ShotFrame shot={montage.shots[Math.min(montage.idx, montage.shots.length - 1)]} noAnim={closing} />
          </div>
        )}
        {closing && montage.mode === 'shadow' && null}
      </div>
      <button type="button" className="edge-btn left" onClick={() => go(cur - 1)} disabled={cur === 0} aria-label="上一页">‹</button>
      <button type="button" className="edge-btn right" onClick={() => go(cur + 1)} disabled={cur === PAGES.length - 1} aria-label="下一页">›</button>
      <div className="pager">
        {PAGES.map((_, i) => (
          <button key={i} type="button" className={i === cur ? 'on' : ''} onClick={() => go(i)} aria-label={`第 ${i + 1} 页`} />
        ))}
      </div>
    </>
  );
}

export default App;
