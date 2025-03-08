import config from "@/config/default/config.json"
import { getPage } from "@/lib/data"
import type { Metadata } from "next"
import FloatingMenu from "@/components/FloatingMenu"

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getPage(params.slug)

  if (!page) {
    return {
      title: "Page not found",
      description: "The requested page could not be found.",
    }
  }

  return {
    title: config.page_title.replace("%title%", page.title),
    description: config.page_description.replace("%title%", page.title).replace("%site_name%", config.site_name),
    robots: config.page_robots,
  }
}

export default async function StaticPage({ params }: Props) {
  const page = await getPage(params.slug)

  if (!page) {
    return (
      <div className="container">
        <div className="text-center py-10">
          <h1 className="text-3xl font-bold mb-2">Page not found</h1>
          <p>The requested page could not be found. It may have been removed or the URL is incorrect.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">{page.title}</h1>
        <div className="download-section" dangerouslySetInnerHTML={{ __html: page.content }} />
      </div>

      <FloatingMenu />
    </div>
  )
}

