import Link from "next/link"
import { Music } from "lucide-react"
import config from "@/config/default/config.json"
import { searchSongs } from "@/lib/data"
import type { Metadata } from "next"
import FloatingMenu from "@/components/FloatingMenu"

type Props = {
  params: { query: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const query = decodeURIComponent(params.query)
  const songs = await searchSongs(query)

  return {
    title: config.search_title.replace("%query%", query).replace("%size%", songs.length.toString()),
    description: config.search_description.replace(/%query%/g, query).replace("%size%", songs.length.toString()),
    robots: config.search_robots,
  }
}

export default async function SearchPage({ params }: Props) {
  const query = decodeURIComponent(params.query)
  const songs = await searchSongs(query)

  return (
    <div className="container">
      <h1
        className="text-2xl md:text-3xl font-bold mb-6"
        dangerouslySetInnerHTML={{ __html: config.search_page_title.replace("%query%", query) }}
      />

      {songs.length === 0 ? (
        <div className="text-center py-10">
          <Music size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">No results found</h2>
          <p className="text-secondary">
            We couldn't find any songs matching your search. Please try a different query.
          </p>
        </div>
      ) : (
        <div className="video-grid">
          {songs.map((song: any) => (
            <Link key={song.id} href={`/${config.download_permalink.replace("%id%", song.id)}`} className="video-card">
              <div className="video-thumbnail">
                <img src={song.image || "/placeholder.svg"} alt={song.title} className="w-full h-full object-cover" />
                {song.duration && <div className="video-duration">{song.duration}</div>}
              </div>
              <div className="video-info">
                <h3 className="video-title">{song.title}</h3>
                <div className="video-meta">
                  {song.views && <span className="video-views">{song.views} views</span>}
                  {song.uploaded && <span className="video-date">{song.uploaded}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <FloatingMenu />
    </div>
  )
}

