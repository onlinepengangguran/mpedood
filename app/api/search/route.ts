import { type NextRequest, NextResponse } from "next/server"
import { agc } from "@/lib/agc"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ error: "Missing query parameter" }, { status: 400 })
  }

  try {
    const results = await agc.getSearch(query)
    return NextResponse.json({ results })
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ error: "An error occurred while searching", details: String(error) }, { status: 500 })
  }
}

