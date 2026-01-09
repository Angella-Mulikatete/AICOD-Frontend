import mailchimp from "@mailchimp/mailchimp_marketing";
import { NextRequest, NextResponse } from "next/server";

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_API_SERVER,
});

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Please provide a valid email address" },
                { status: 400 }
            );
        }

        const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

        if (!audienceId) {
            console.error("MAILCHIMP_AUDIENCE_ID is not set");
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        const response = await mailchimp.lists.addListMember(audienceId, {
            email_address: email,
            status: "subscribed",
        });

        return NextResponse.json({
            success: true,
            message: "Thank you for subscribing to our newsletter!",
            data: response,
        });
    } catch (error: any) {
        console.error("Newsletter subscription error:", error);

        // Handle duplicate subscriber
        if (error.status === 400 && error.response?.body?.title === "Member Exists") {
            return NextResponse.json(
                {
                    error: "You are already subscribed to our newsletter!",
                    alreadySubscribed: true,
                },
                { status: 400 }
            );
        }

        // Handle other errors
        return NextResponse.json(
            {
                error: error.response?.body?.detail || "Failed to subscribe. Please try again later.",
            },
            { status: error.status || 500 }
        );
    }
}
