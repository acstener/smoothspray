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
          gtag('config', 'AW-16911810148/o4jWCJGN2agaEOT8loA_', {
            'phone_conversion_number': '+44 7860 226411'
          });
        `}
      </Script>
      
      {/* Script for dynamic phone number replacement */}
      <Script id="dynamic-phone-replacement" strategy="afterInteractive">
        {`
          // Add this script to replace phone numbers for visitors coming from ads
          document.addEventListener('DOMContentLoaded', function() {
            // Check if this visitor came from a Google Ad
            function getParameterByName(name) {
              name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
              var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
              var results = regex.exec(location.search);
              return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
            }
            
            // If the visitor came from Google Ads (gclid parameter exists)
            if (getParameterByName('gclid')) {
              // Find all elements with phone numbers and replace them
              const phoneElements = document.querySelectorAll('a[href^="tel:"]');
              phoneElements.forEach(element => {
                // Update the displayed phone number
                if (element.textContent && element.textContent.includes('7860 226411')) {
                  element.textContent = '+44 7860 226411';  // The tracking number
                }
                // Update the href attribute
                element.setAttribute('href', 'tel:+447860226411');
              });
            }
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