/* 顶栏：sticky + 毛玻璃（浮动层级才允许毛玻璃，Apple HIG）+ 锚点导航 + 当前分节高亮 */
import { SECTIONS } from '../sections/index.js';

export default function TopNav({ active }) {
  return (
    <header className="ld-nav">
      <div className="ld-nav-inner">
        <a className="ld-nav-logo" href="#top">
          <img src="brand/dsh-icon-192.png" alt="" width={22} height={22} className="ld-nav-icon" aria-hidden="true" />
          <span>DeepSeek Harness</span>
        </a>
        <nav className="ld-nav-links" aria-label="分节导航">
          {SECTIONS.map(s => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={active === s.id ? 'on' : ''}
              aria-current={active === s.id ? 'true' : undefined}
            >
              {s.label}
            </a>
          ))}
        </nav>
        <a
          className="ld-nav-cta"
          href="https://github.com/deepseek-ai/deepseek-harness"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}