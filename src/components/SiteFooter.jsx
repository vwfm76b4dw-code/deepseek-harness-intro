/* 页脚：固定一行社区声明（契约 §4） */
export default function SiteFooter() {
  return (
    <footer className="ld-footer">
      <p className="ld-note" style={{ fontSize: 13 }}>
        DeepSeek Harness（dsh）· DeepSeek AI 开源的 agent harness · MIT License
      </p>
      <div className="ld-footer-links">
        <a href="https://github.com/deepseek-ai/deepseek-harness" target="_blank" rel="noreferrer">GitHub 仓库</a>
        <a href="https://deepseek-harness.github.io/deepseek-harness/" target="_blank" rel="noreferrer">开发者文档</a>
        <a href="https://arxiv.org/abs/2608.25512" target="_blank" rel="noreferrer">Cordis 论文</a>
        <a href="https://www.deepseek.com/zh/harness/" target="_blank" rel="noreferrer">官方介绍</a>
      </div>
      <p className="ld-footer-note">社区宣传页 · 非官方 · 内容摘自官方介绍与公开仓库</p>
    </footer>
  );
}