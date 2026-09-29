import Link from 'next/link'

export default function PagesIndex() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Pages</h1>
      <p className="mb-4">This is a placeholder for grouped pages. Choose a page:</p>
      <ul className="list-disc pl-6">
        <li><Link href="/blog" className="text-blue-600">Blog</Link></li>
        <li><Link href="/pricing" className="text-blue-600">Pricing</Link></li>
        <li><Link href="/pages/portfolio" className="text-blue-600">Portfolio</Link></li>
      </ul>
    </main>
  )
}
