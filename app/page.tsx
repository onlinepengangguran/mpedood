import Link from "next/link"
import { Music, Headphones, TrendingUp, Search } from "lucide-react"
import config from "@/config/default/config.json"
import { getTopSongs, getRecentSearches } from "@/lib/data"
import type { Metadata } from "next"
import FloatingMenu from "@/components/FloatingMenu"

export const metadata: Metadata = {
  title: config.home_title,
  description: config.home_description,
  robots: config.home_robots,
}

export default async function Home() {
  const topSongs = await getTopSongs()
  const recentSearches = await getRecentSearches()

  return (
    <div className="container">
      <section className="text-center py-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">{config.home_title}</h1>
        <p className="text-base md:text-lg max-w-3xl mx-auto text-secondary">{config.home_description}</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="download-section text-center">
          <div className="flex justify-center mb-4">
            <Music size={36} className="text-primary-color" />
          </div>
          <h2 className="text-lg font-bold mb-2">Huge Collection</h2>
          <p className="text-sm text-secondary">
            Access thousands of songs and videos from various artists and genres.
          </p>
        </div>

        <div className="download-section text-center">
          <div className="flex justify-center mb-4">
            <Headphones size={36} className="text-primary-color" />
          </div>
          <h2 className="text-lg font-bold mb-2">High Quality</h2>
          <p className="text-sm text-secondary">Download MP3 files with the best audio quality available.</p>
        </div>

        <div className="download-section text-center">
          <div className="flex justify-center mb-4">
            <TrendingUp size={36} className="text-primary-color" />
          </div>
          <h2 className="text-lg font-bold mb-2">Latest Releases</h2>
          <p className="text-sm text-secondary">Stay updated with the newest music releases and trending songs.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="related-videos-title mb-4">
          <TrendingUp size={20} />
          Top Songs
        </h2>
        <div className="video-grid">
          {topSongs.map((song: any) => (
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
      </section>

      {recentSearches.length > 0 && (
        <section>
          <h2 className="related-videos-title mb-4">
            <Search size={20} />
            Recent Searches
          </h2>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search: string, index: number) => (
              <Link
                key={index}
                href={`/${config.search_permalink.replace("%query%", encodeURIComponent(search))}`}
                className="bg-background-card px-3 py-1 rounded-full hover:bg-primary-color hover:text-white transition-colors text-sm"
              >
                {search}
              </Link>
            ))}
          </div>
        </section>
      )}

      <FloatingMenu />
    </div>
  )
}

