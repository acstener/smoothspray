import Script from 'next/script'

export default function GoogleTags() {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-16911810148"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-16911810148');
        `}
      </Script>
      
      {/* Phone snippet for call tracking */}
      <Script id="google-phone-tracking" strategy="afterInteractive">
        {`
          gtag('config', 'AW-16911810148/o4jWCJGN2agaEOT8loA_', {
            'phone_conversion_number': '+44 7860 226411'
          });
        `}
      </Script>
      
      {/* Event snippet for Website lead conversion */}
      <Script id="google-conversion" strategy="afterInteractive">
        {`
          gtag('event', 'conversion', {'send_to': 'AW-16911810148/Jn-OCLGd_KYaEOT8loA_'});
        `}
      </Script>
    </>
  )
} 