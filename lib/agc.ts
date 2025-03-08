import NodeCache from "node-cache"

class AGC {
  private cache: NodeCache

  constructor() {
    this.cache = new NodeCache({ stdTTL: 3600 }) // Cache for 1 hour
  }

  async getSearch(query: string) {
    const q = encodeURIComponent(query)
    const cacheKey = `search_${this.md5(q)}`
    let items = this.cache.get(cacheKey)

    if (!items) {
      try {
        const searchUrl = `https://v0-aban.vercel.app/api/search?q=${q}`
        const response = await fetch(searchUrl)

        if (response.ok) {
          const text = await response.text()
          // Check if the response is valid JSON before parsing
          try {
            const searchArray = JSON.parse(text)
            items =
              searchArray.result?.map((item: any) => ({
                id: item.file_code,
                title: item.title,
                image: item.single_img,
                duration: item.length,
                views: item.views,
                uploaded: item.uploaded,
                splash_img: item.splash_img,
                canplay: item.canplay,
              })) || []

            this.cache.set(cacheKey, items)
          } catch (parseError) {
            console.error("JSON parse error:", parseError)
            return []
          }
        } else {
          console.error("API response not OK:", response.status)
          return []
        }
      } catch (fetchError) {
        console.error("Fetch error:", fetchError)
        return []
      }
    }

    return items || []
  }

  async getDownload(id: string) {
    const cacheKey = `download_${id}`
    let data = this.cache.get(cacheKey)

    if (!data) {
      try {
        const infoUrl = `https://v0-aban.vercel.app/api/info?file_code=${id}`
        const response = await fetch(infoUrl)

        if (response.ok) {
          const text = await response.text()
          // Check if the response is valid JSON before parsing
          try {
            const infoArray = JSON.parse(text)
            if (infoArray.result?.[0]) {
              const result = infoArray.result[0]
              data = {
                id: result.filecode,
                title: result.title,
                image: result.single_img,
                duration: result.length,
                views: result.views,
                uploaded: result.uploaded,
                splash_img: result.splash_img,
                canplay: result.canplay,
                size: result.size,
                protected_embed: result.protected_embed,
              }

              this.cache.set(cacheKey, data)
            }
          } catch (parseError) {
            console.error("JSON parse error:", parseError)
            return null
          }
        } else {
          console.error("API response not OK:", response.status)
          return null
        }
      } catch (fetchError) {
        console.error("Fetch error:", fetchError)
        return null
      }
    }

    return data
  }

  async getRelated(id: string) {
    const cacheKey = `related_${id}`
    let items = this.cache.get(cacheKey)

    if (!items) {
      try {
        const data = await this.getDownload(id)
        if (data) {
          const title = data.title.split(" ").slice(0, 3).join(" ")
          const searchUrl = `https://v0-aban.vercel.app/api/search?q=${encodeURIComponent(title)}`
          const response = await fetch(searchUrl)

          if (response.ok) {
            const text = await response.text()
            // Check if the response is valid JSON before parsing
            try {
              const searchArray = JSON.parse(text)
              items =
                searchArray.result?.map((item: any) => ({
                  id: item.file_code,
                  title: item.title,
                  image: item.single_img,
                  duration: item.length,
                  views: item.views,
                  uploaded: item.uploaded,
                  splash_img: item.splash_img,
                  canplay: item.canplay,
                })) || []

              this.cache.set(cacheKey, items)
            } catch (parseError) {
              console.error("JSON parse error:", parseError)
              return []
            }
          } else {
            console.error("API response not OK:", response.status)
            return []
          }
        }
      } catch (fetchError) {
        console.error("Fetch error:", fetchError)
        return []
      }
    }

    return items || []
  }

  private md5(str: string): string {
    // Simple hash function for demonstration purposes
    // In a production environment, use a proper cryptographic hash function
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return hash.toString(36)
  }
}

export const agc = new AGC()

