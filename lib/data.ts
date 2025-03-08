import { agc } from "./agc"

// Fallback data in case the API fails
const fallbackSongs = [
  {
    id: "sample1",
    title: "Sample Song 1",
    image: "/placeholder.svg?height=480&width=640",
    duration: "3:45",
    views: "1.2M",
    uploaded: "2 months ago",
    description: "This is a sample song description.",
  },
  {
    id: "sample2",
    title: "Sample Song 2",
    image: "/placeholder.svg?height=480&width=640",
    duration: "4:20",
    views: "850K",
    uploaded: "1 month ago",
    description: "Another sample song description.",
  },
  {
    id: "sample3",
    title: "Sample Song 3",
    image: "/placeholder.svg?height=480&width=640",
    duration: "3:15",
    views: "2.1M",
    uploaded: "3 months ago",
    description: "Yet another sample song description.",
  },
]

export async function getTopSongs() {
  try {
    const songs = await agc.getSearch("top songs")
    return songs && songs.length > 0 ? songs : fallbackSongs
  } catch (error) {
    console.error("Error fetching top songs:", error)
    return fallbackSongs
  }
}

export async function getRecentSearches() {
  // This could be implemented later with local storage or a database
  return ["pop music", "rock songs", "dance hits", "top 40"]
}

export async function searchSongs(query: string) {
  try {
    const songs = await agc.getSearch(query)
    return songs && songs.length > 0 ? songs : fallbackSongs
  } catch (error) {
    console.error(`Error searching for "${query}":`, error)
    return fallbackSongs
  }
}

export async function getSongById(id: string) {
  try {
    const song = await agc.getDownload(id)
    if (song) return song

    // Return a fallback song if the real one isn't found
    return {
      id,
      title: "Sample Song",
      image: "/placeholder.svg?height=480&width=640",
      duration: "3:45",
      views: "1.2M",
      uploaded: "2 months ago",
      description: "This is a sample song that's shown when the requested song couldn't be found.",
      size: "4.2 MB",
      protected_embed: false,
    }
  } catch (error) {
    console.error(`Error getting song with ID "${id}":`, error)
    return {
      id,
      title: "Sample Song",
      image: "/placeholder.svg?height=480&width=640",
      duration: "3:45",
      views: "1.2M",
      uploaded: "2 months ago",
      description: "This is a sample song that's shown when the requested song couldn't be found.",
      size: "4.2 MB",
      protected_embed: false,
    }
  }
}

export async function getRelatedSongs(id: string) {
  try {
    const songs = await agc.getRelated(id)
    return songs && songs.length > 0 ? songs : fallbackSongs
  } catch (error) {
    console.error(`Error getting related songs for ID "${id}":`, error)
    return fallbackSongs
  }
}

export async function getPlaylist(slug: string) {
  // For now, we'll return a playlist with fallback songs
  if (slug === "top-hits") {
    return {
      title: "Top Hits 2023",
      slug: "top-hits",
      description: "The most popular songs of 2023",
      songs: fallbackSongs,
    }
  }
  return null
}

export async function getPage(slug: string) {
  // Static pages content
  const pages: Record<string, { title: string; content: string }> = {
    about: {
      title: "About Us",
      content: `<p>Welcome to our music download platform! We provide a simple way to discover and download your favorite music.</p>
                <p>Our mission is to make music accessible to everyone while respecting artists' rights.</p>`,
    },
    contact: {
      title: "Contact Us",
      content: `<p>Get in touch with us at contact@example.com</p>
                <p>We're always happy to hear from our users and improve our service based on your feedback.</p>`,
    },
    dmca: {
      title: "DMCA Policy",
      content: `<p>We respect copyright laws and intellectual property rights. If you believe that your work has been copied in a way that constitutes copyright infringement, please provide us with the following information:</p>
                <ul>
                  <li>A physical or electronic signature of the copyright owner or a person authorized to act on their behalf</li>
                  <li>Identification of the copyrighted work claimed to have been infringed</li>
                  <li>Identification of the material that is claimed to be infringing or to be the subject of infringing activity</li>
                  <li>Your contact information, including your address, telephone number, and an email address</li>
                  <li>A statement by you that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law</li>
                  <li>A statement that the information in the notification is accurate, and, under penalty of perjury, that you are authorized to act on behalf of the copyright owner</li>
                </ul>`,
    },
  }
  return pages[slug] || null
}

