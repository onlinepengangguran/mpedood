"use client"

import config from "@/config/default/config.json"
import { usePathname } from "next/navigation"

export default function HeadContent() {
  const pathname = usePathname()
  const googleVerify = config.google_verify

  return (
    <>
      {googleVerify && <meta name="google-site-verification" content={googleVerify} />}
      {pathname === "/" && <meta name="robots" content={config.home_robots} />}
      {pathname?.startsWith("/f/") && <meta name="robots" content={config.search_robots} />}
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        rel="stylesheet"
        crossOrigin="anonymous"
      />
      <meta name="theme-color" content="#e50914" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    </>
  )
}

