# 数学表达式识别计算器

这是一个基于 Next.js 开发的网页应用，可以通过上传图片来识别其中的数学表达式并计算结果。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/math-expression-calculator)

## 在线演示

访问 [Demo Site](https://math-expression-calculator.vercel.app) 查看在线演示

## 功能特点

- 📷 支持图片上传
- 🔍 OCR 识别图片中的数学表达式
- 🧮 自动计算数学表达式结果
- 👀 实时预览上传的图片
- 📱 响应式设计，支持移动端和桌面端

## 快速开始

### 开发环境

```bash
# 克隆项目
git clone https://github.com/yourusername/math-expression-calculator.git

# 进入项目目录
cd math-expression-calculator

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 部署到 Vercel

1. Fork 这个项目
2. 在 Vercel 中导入你的 Fork 项目
3. 点击 "Deploy" 按钮

或者直接点击上方的 "Deploy with Vercel" 按钮一键部署。

## 环境变量

不需要配置任何环境变量即可运行。

## 技术栈

- [Next.js 14](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tesseract.js](https://tesseract.projectnaptha.com/)
- [Math.js](https://mathjs.org/)
- [TailwindCSS](https://tailwindcss.com/)

## 使用说明

1. 上传包含数学表达式的图片
2. 点击"识别并计算"按钮
3. 等待系统处理
4. 查看识别结果和计算结果

### 支持的数学运算

- 加法 (+)
- 减法 (-)
- 乘法 (*)
- 除法 (/)
- 括号 ()

### 最佳实践

- 使用清晰的图片
- 确保文字与背景对比度高
- 避免使用手写体
- 数字和运算符之间保持适当间距

## 开发相关

### 项目结构

```
math-expression-calculator/
├── app/                 # Next.js 应用目录
│   ├── page.tsx        # 主页面组件
│   └── layout.tsx      # 布局组件
├── public/             # 静态资源
├── package.json        # 项目配置
└── README.md          # 项目文档
```

### 可用的脚本命令

```bash
npm run dev     # 开发环境
npm run build   # 构建生产版本
npm start       # 运行生产版本
npm run lint    # 代码检查
```

## 贡献指南

欢迎贡献！请查看 [贡献指南](CONTRIBUTING.md) 了解详情。

## 许可证

MIT © [Your Name]
