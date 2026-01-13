"use client";

import { NotionRenderer as Renderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

// 引入核心样式
import "react-notion-x/src/styles.css";
import "@/app/code.css";
// import "prismjs/themes/prism-tomorrow.css"; // 代码高亮样式
// import 'katex/dist/katex.min.css' // 数学公式样式

// 动态加载复杂组件以优化首屏性能
const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then((m) => m.Code)
);
const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
);
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
);
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  { ssr: false }
);

interface NotionRendererProps {
  recordMap: ExtendedRecordMap;
}

const NotionRenderer = ({ recordMap }: NotionRendererProps) => {
  return (
    <div className="notion-wrapper">
      <Renderer
        recordMap={recordMap}
        fullPage={false} // 设置为 false，因为我们通常只渲染内容区，不渲染 Notion 的整个页面结构（如封面/标题已经在外部渲染了）
        darkMode={false} // 可以根据你的主题上下文动态传入
        components={{
          nextImage: Image, // 使用 Next.js 的 Image 组件优化图片
          nextLink: Link, // 使用 Next.js 的 Link 组件优化路由
          Code,
          Collection,
          Equation,
          Modal,
        }}
        // 可以在这里自定义 CSS 类名
        className="!p-0" // 移除默认内边距，根据需要调整
      />
    </div>
  );
};

export default NotionRenderer;
