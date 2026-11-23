/* App：单页滚动长站 —— 顶栏 + 11 分节 + 页脚（deck 引擎已退役） */
import { useActiveSection, useReveal } from './hooks/useReveal.js';
import { useCardJuice } from './hooks/useCardJuice.js';
import TopNav from './components/TopNav.jsx';
import SiteFooter from './components/SiteFooter.jsx';
import S1Hero from './sections/S1Hero.jsx';
import S2What from './sections/S2What.jsx';
import S3Plugin from './sections/S3Plugin.jsx';
import S4Tasks from './sections/S4Tasks.jsx';
import S5Workflow from './sections/S5Workflow.jsx';
import S6DevTools from './sections/S6DevTools.jsx';
import S7Start from './sections/S7Start.jsx';
import S8Live from './sections/S8Live.jsx';
import S9Eco from './sections/S9Eco.jsx';
import S10Faq from './sections/S10Faq.jsx';
import S11Cta from './sections/S11Cta.jsx';
import { SECTIONS } from './sections/index.js';

const IDS = SECTIONS.map(s => s.id);

function App() {
  const active = useActiveSection(IDS);
  useReveal();
  useCardJuice();
  return (
    <>
      <TopNav active={active} />
      <main id="top">
        <S1Hero />
        <S2What />
        <S3Plugin />
        <S4Tasks />
        <S5Workflow />
        <S6DevTools />
        <S7Start />
        <S8Live />
        <S9Eco />
        <S10Faq />
        <S11Cta />
      </main>
      <SiteFooter />
    </>
  );
}

export default App;