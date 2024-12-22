import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '数学表达式识别计算器',
  description: '上传图片识别并计算数学表达式',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
}
