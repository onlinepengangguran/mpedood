import { type NextRequest, NextResponse } from "next/server"
import { agc } from "@/lib/agc"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const fileCode = searchParams.get("file_code")

  if (!fileCode) {
    return NextResponse.json({ error: "Missing file_code parameter" }, { status: 400 })
  }

  try {
    const info = await agc.getDownload(fileCode)
    if (!info) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }
    return NextResponse.json({ info })
  } catch (error) {
    console.error("Info retrieval error:", error)
    return NextResponse.json(
      { error: "An error occurred while retrieving info", details: String(error) },
      { status: 500 },
    )
  }
}

