import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "./assets/styles.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import HeadContent from "@/components/HeadContent"
import config from "@/config/default/config.json"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: config.site_name,
  description: config.site_tagline,
  themeColor: "#ff0000",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow pt-16">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}



import './globals.css'