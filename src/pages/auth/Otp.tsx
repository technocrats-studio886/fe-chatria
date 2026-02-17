import { verifyOtp } from "@/api/authApi";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { setToken } from "@/utils/token";
import { useNavigate } from "@tanstack/react-router";

import { useState } from "react"

export default function OtpPage() {
    const [otp, setOtp] = useState("")
    const navigate = useNavigate({from: "/otp"});
    const handleComplete = async (value: string) => {
        
            const urlParams = new URLSearchParams(window.location.search);
            const email = urlParams.get("email");
            if (email) {
                try {
                    const data = await verifyOtp(email, value);
                    if (data.payload && data.payload.access_token) {
                        setToken(data.payload.access_token);
                        navigate({
                            to: "/"
                        });
                        
                    } else {
                        console.error("OTP verification failed: No access token in response");
                    }
                } catch (error) {
                    console.error("OTP verification failed:", error);
                }
            } else {
                console.error("Email not found in query parameters.");
            }
        


        
    }

    return <div className="px-5 min-h-screen flex items-center justify-center bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="flex flex-col gap-6 w-full items-center ">
            <h1 className="text-2xl font-bold text-center text-white">Enter OTP</h1>
            <p className="text-center text-muted-foreground">We have sent an OTP to your email. Please enter it below to verify your account.</p>
            <InputOTP 
                maxLength={6} 
                value={otp}
                onChange={setOtp}
                onComplete={handleComplete}
            >
                <InputOTPGroup className="text-white">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
        </div>
    </div>;
}