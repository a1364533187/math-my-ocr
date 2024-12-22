'use client'

import { useState } from 'react'
import { createWorker, Worker } from 'tesseract.js'
import { evaluate } from 'mathjs'

export default function Home() {
  const [image, setImage] = useState<string | null>(null)
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 显示预览图片
    const reader = new FileReader()
    reader.onload = (e) => {
      setImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)
    setSelectedFile(file)
    setResult('') // 清除之前的结果
  }

  const handleProcess = async () => {
    if (!selectedFile) {
      alert('请先上传图片')
      return
    }

    // OCR识别
    setLoading(true)
    let worker: Worker | null = null
    try {
      worker = await createWorker()
      await worker.loadLanguage('eng')
      await worker.initialize('eng')
      const { data: { text } } = await worker.recognize(selectedFile)

      // 清理识别出的文本，只保留数学表达式
      const cleanedText = text.replace(/[^0-9+\-*/().]/g, '')
      
      // 计算结果
      try {
        const calculatedResult = evaluate(cleanedText)
        setResult(`表达式: ${cleanedText}\n计算结果: ${calculatedResult}`)
      } catch {
        setResult('无法计算该表达式，请确保图片中包含有效的数学表达式')
      }
    } catch {
      setResult('图片识别失败，请重试')
    } finally {
      if (worker) {
        await worker.terminate()
      }
      setLoading(false)
    }
  }

  const examples = [
    {
      description: '简单加法',
      expression: '1 + 2',
      result: '3',
      tips: '清晰的数字和运算符，黑色文字白色背景'
    },
    {
      description: '混合运算',
      expression: '(2 + 3) * 4',
      result: '20',
      tips: '包含括号的复杂表达式'
    },
    {
      description: '除法运算',
      expression: '10 / 2',
      result: '5',
      tips: '除号要清晰可见'
    }
  ]

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">数学表达式识别计算器</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium mb-2">
                上传包含数学表达式的图片：
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm border rounded-lg cursor-pointer p-2"
              />
              <button
                onClick={handleProcess}
                disabled={loading || !selectedFile}
                className={`w-full py-2 px-4 rounded-lg text-white font-medium
                  ${loading || !selectedFile 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600'
                  }`}
              >
                {loading ? '处理中...' : '识别并计算'}
              </button>
            </div>

            {image && (
              <div>
                <p className="font-medium mb-2">预览图片：</p>
                <div className="relative w-full h-[300px] border rounded-lg overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}

            {result && (
              <div className="p-4 bg-gray-100 rounded-lg">
                <pre className="whitespace-pre-wrap">{result}</pre>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">使用示例</h2>
            <div className="space-y-4">
              {examples.map((example, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h3 className="font-medium text-lg">{example.description}</h3>
                  <div className="mt-2 space-y-2">
                    <p className="font-mono bg-gray-100 p-2 rounded">
                      表达式: {example.expression}
                    </p>
                    <p className="text-green-600">
                      结果: {example.result}
                    </p>
                    <p className="text-sm text-gray-600">
                      提示: {example.tips}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">使用提示</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>确保图片清晰，文字与背景对比度高</li>
                <li>支持的运算符：+（加）、-（减）、*（乘）、/（除）、()（括号）</li>
                <li>数字和运算符之间最好有适当间距</li>
                <li>避免使用手写体，建议使用打印字体</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
