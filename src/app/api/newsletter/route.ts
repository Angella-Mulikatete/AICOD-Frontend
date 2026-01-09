import mailchimp from "@mailchimp/mailchimp_marketing";
import { NextRequest, NextResponse } from "next/server";

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_API_SERVER,
});

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        console.log("📧 Newsletter API called with email:", email);

        if (!email) {
            console.log("❌ No email provided");
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        //Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log("❌ Invalid email format:", email);
            return NextResponse.json(
                { error: "Please provide a valid email address" },
                { status: 400 }
            );
        }

        const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
        const apiKey = process.env.MAILCHIMP_API_KEY;
        const server = process.env.MAILCHIMP_API_SERVER;

        console.log("🔧 Mailchimp Config:");
        console.log("  - API Key:", apiKey ? `${apiKey.substring(0, 10)}...` : "NOT SET");
        console.log("  - Server:", server || "NOT SET");
        console.log("  - Audience ID:", audienceId || "NOT SET");

        if (!audienceId) {
            console.error("❌ MAILCHIMP_AUDIENCE_ID is not set");
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        console.log("📤 Sending to Mailchimp:", { email_address: email, status: "subscribed" });

        const response = await mailchimp.lists.addListMember(audienceId, {
            email_address: email,
            status: "subscribed",
        });

        console.log("✅ Mailchimp response:", JSON.stringify(response, null, 2));

        return NextResponse.json({
            success: true,
            message: "Thank you for subscribing to our newsletter!",
            data: response,
        });
    } catch (error: any) {
        console.error("❌ Newsletter subscription error:", error);
        console.log("📋 Error details:", {
            status: error.status,
            title: error.response?.body?.title,
            detail: error.response?.body?.detail,
            fullResponse: error.response?.body
        });

        // Handle duplicate subscriber
        if (error.status === 400 && error.response?.body?.title === "Member Exists") {
            console.log("ℹ️ Duplicate subscriber detected");
            return NextResponse.json(
                {
                    error: "You are already subscribed to our newsletter!",
                    alreadySubscribed: true,
                },
                { status: 400 }
            );
        }

        // Handle other errors
        console.log("❌ Returning error to client");
        return NextResponse.json(
            {
                error: error.response?.body?.detail || "Failed to subscribe. Please try again later.",
            },
            { status: error.status || 500 }
        );
    }
}
