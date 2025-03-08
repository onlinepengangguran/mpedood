import { agc } from "./agc"

// Fallback data removed, redirect to 404 page instead

export type Song = {
  id: string;
  title: string;
  image: string;
  duration: string;
  views: string;
  uploaded: string;
  description: string;
  size: string;
  protected_embed: boolean;
}

const redirectTo404 = () => {
  window.location.href = "/404";
}

export async function getTopSongs(): Promise<Song[]> {
  try {
    const songs: Song[] = await agc.getSearch("top songs");
    if (!songs || songs.length === 0) {
      redirectTo404();
      return []; // Return an empty array of type Song[]
    }
    return songs;
  } catch (error) {
    console.error("Error fetching top songs:", error);
    redirectTo404();
    return []; // Return an empty array of type Song[]
  }
}

export async function getRecentSearches(): Promise<string[]> {
  return ["pop music", "rock songs", "dance hits", "top 40"];
}

export async function searchSongs(query: string): Promise<Song[]> {
  try {
    const songs: Song[] = await agc.getSearch(query);
    if (!songs || songs.length === 0) {
      redirectTo404();
      return []; // Return an empty array of type Song[]
    }
    return songs;
  } catch (error) {
    console.error(`Error searching for "${query}":`, error);
    redirectTo404();
    return []; // Return an empty array of type Song[]
  }
}

export async function getSongById(id: string): Promise<Song> {
  try {
    const song: Song = await agc.getDownload(id);
    if (song) return song;

    redirectTo404(); // Redirect to 404 if song not found
    return {
      id: "",
      title: "",
      image: "",
      duration: "",
      views: "",
      uploaded: "",
      description: "",
      size: "",
      protected_embed: false,
    }; // Return a default Song object
  } catch (error) {
    console.error(`Error getting song with ID "${id}":`, error);
    redirectTo404();
    return {
      id: "",
      title: "",
      image: "",
      duration: "",
      views: "",
      uploaded: "",
      description: "",
      size: "",
      protected_embed: false,
    }; // Return a default Song object
  }
}

export async function getRelatedSongs(id: string): Promise<Song[]> {
  try {
    const songs: Song[] = await agc.getRelated(id);
    if (!songs || songs.length === 0) {
      redirectTo404();
      return []; // Return an empty array of type Song[]
    }
    return songs;
  } catch (error) {
    console.error(`Error getting related songs for ID "${id}":`, error);
    redirectTo404();
    return []; // Return an empty array of type Song[]
  }
}

export async function getPlaylist(slug: string) {
  if (slug === "top-hits") {
    return {
      title: "Top Hits 2023",
      slug: "top-hits",
      description: "The most popular songs of 2023",
      songs: [], // No fallback songs
    };
  }
  return null;
}

export async function getPage(slug: string) {
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
  };
  return pages[slug] || null;
}
