import { type NextRequest, NextResponse } from "next/server"
import { agc } from "@/lib/agc"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "Missing id parameter" }, { status: 400 })
  }

  try {
    const relatedItems = await agc.getRelated(id)
    return NextResponse.json({ relatedItems })
  } catch (error) {
    console.error("Related items retrieval error:", error)
    return NextResponse.json(
      { error: "An error occurred while retrieving related items", details: String(error) },
      { status: 500 },
    )
  }
}

