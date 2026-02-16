"use client"

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"
import React from "react"

export function RecaptchaProvider({ children }: { children: React.ReactNode }) {
  // Use environment variable or fallback to Google's Test Site Key
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  )
}
