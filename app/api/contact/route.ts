import { NextRequest, NextResponse } from "next/server";
import { sheets } from "@/lib/googleSheets";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Append to Google Sheet
        await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SHEET_ID!,
          range: 'Sheet1!A:C',
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [[
              name,
              email,
              message || '',  
            ]],
          },
        });

    return NextResponse.json(
      { message: "Form submitted successfully"},
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving contact form:", error);
    return NextResponse.json(
      { error: "Failed to submit form. Please try again later." },
      { status: 500 }
    );
  }
}
