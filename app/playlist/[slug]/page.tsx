import Link from "next/link"
import { Music, Play } from "lucide-react"
import config from "@/config/default/config.json"
import { getPlaylist } from "@/lib/data"
import type { Metadata } from "next"
import FloatingMenu from "@/components/FloatingMenu"

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const playlist = await getPlaylist(params.slug)

  if (!playlist) {
    return {
      title: "Playlist not found",
      description: "The requested playlist could not be found.",
    }
  }

  return {
    title: config.playlist_title.replace("%title%", playlist.title),
    description: config.playlist_description
      .replace("%title%", playlist.title)
      .replace("%description%", playlist.description || ""),
    robots: config.playlist_robots,
  }
}

export default async function PlaylistPage({ params }: Props) {
  const playlist = await getPlaylist(params.slug)

  if (!playlist) {
    return (
      <div className="container">
        <div className="text-center py-10">
          <Music size={64} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-3xl font-bold mb-2">Playlist not found</h1>
          <p>The requested playlist could not be found. It may have been removed or the URL is incorrect.</p>
          <Link href="/" className="btn btn-primary mt-4 inline-block">
            Go to Homepage
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="md:col-span-1">
          <div className="aspect-square bg-background-card rounded-lg flex items-center justify-center">
            <Music size={64} className="text-gray-400" />
          </div>
        </div>

        <div className="md:col-span-3">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{playlist.title}</h1>
          <p className="text-secondary mb-4">{playlist.description}</p>
          <div className="flex items-center gap-4">
            <span className="text-secondary">{playlist.songs.length} songs</span>
            <button className="btn btn-primary">
              <Play size={16} />
              Play All
            </button>
          </div>
        </div>
      </div>

      <div className="video-grid">
        {playlist.songs.map((song: any, index: number) => (
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

      <FloatingMenu />
    </div>
  )
}

