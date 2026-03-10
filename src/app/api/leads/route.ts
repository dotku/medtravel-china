import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!email || !name) {
      return NextResponse.json(
        { error: "Email and name are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error("BREVO_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Prepare Brevo API request
    const brevoPayload = {
      email,
      attributes: {
        FIRSTNAME: name,
        ...(phone && { SMS: phone }),
        ...(message && { NOTE: message }),
      },
      listIds: [3],
      updateEnabled: true,
    };

    // Call Brevo API
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(brevoPayload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Brevo contacts API error:", response.status, JSON.stringify(errorData));

      // For server errors (5xx), fail the request
      // For client errors (4xx like duplicate contact), log and continue to send notification
      if (response.status >= 500) {
        return NextResponse.json(
          { error: "Failed to save contact" },
          { status: 500 }
        );
      }
    }

    // Send notification email to team
    try {
      const emailResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: { name: "MedTravel China", email: "helenlan202602@gmail.com" },
          to: [{ email: "helenlan202602@gmail.com", name: "Helen Lan" }],
          replyTo: { email, name },
          subject: `New Contact Lead: ${name}`,
          htmlContent: `
            <h2>New Contact Form Submission</h2>
            <table style="border-collapse:collapse;width:100%;max-width:500px;">
              <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${name}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">${email}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${phone || "N/A"}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;">Message</td><td style="padding:8px;">${message || "N/A"}</td></tr>
            </table>
          `,
        }),
      });
      if (!emailResponse.ok) {
        const emailErrorData = await emailResponse.json().catch(() => ({}));
        console.error("Brevo email API error:", emailResponse.status, emailErrorData);
      }
    } catch (emailError) {
      // Log but don't fail the request — contact was already saved
      console.error("Failed to send notification email:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing lead:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
