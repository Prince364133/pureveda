(function() {
    // Determine target host domain accurately for cookies
    var host = window.location.hostname;
    // For localhost, simple cookies; for real domains, use dot prefix
    var domainStr = (host === "127.0.0.1" || host === "localhost" || host === "") ? "" : " domain=." + host + ";";

    // CSS to Hide Google Translate Top Banner & Tooltips and style our toggle
    var css = `
        /* Hide all Google Translate default widgets and toolbars */
        body { top: 0 !important; }
        .skiptranslate, .goog-te-banner-frame { display: none !important; }
        #goog-gt-tt { display: none !important; }
        .goog-te-spinner-pos { display: none !important; }
        
        /* Custom Language Toggle Container */
        .g-lang-toggle {
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 999999;
            background: white;
            border: 2px solid #0f172a;
            border-radius: 30px;
            display: flex;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            font-family: inherit;
        }
        
        /* Toggle Buttons */
        .g-lang-toggle-btn {
            padding: 8px 16px;
            font-weight: 700;
            font-size: 14px;
            cursor: pointer;
            background: white;
            color: #64748b;
            border: none;
            outline: none;
            transition: all 0.2s ease;
        }
        .g-lang-toggle-btn:hover {
            color: #0f172a;
        }
        .g-lang-toggle-btn.active {
            background: #0f172a; /* Slate 900 */
            color: white;
        }
    `;
    var styleNode = document.createElement('style');
    styleNode.innerHTML = css;
    document.head.appendChild(styleNode);

    // Default to Hindi if 'googtrans' cookie is completely missing
    var currentLang = 'hi'; 
    if (document.cookie.includes('googtrans=/en/en')) {
        currentLang = 'en';
    } else if (!document.cookie.includes('googtrans')) {
        // Set root cookie and domain cookie to cover all bases
        document.cookie = 'googtrans=/en/hi; path=/;';
        document.cookie = 'googtrans=/en/hi;' + domainStr + ' path=/;';
    } else if (document.cookie.includes('googtrans=/en/hi')) {
        currentLang = 'hi';
    }

    // Append necessary HTML for the toggle button and the hidden google div
    var toggleHTML = \`
        <div class="g-lang-toggle">
            <button class="g-lang-toggle-btn" id="lang-btn-en">ENG</button>
            <button class="g-lang-toggle-btn" id="lang-btn-hi">HIN</button>
        </div>
        <div id="google_translate_element" style="display:none;"></div>
    \`;
    var wrapper = document.createElement('div');
    wrapper.innerHTML = toggleHTML;
    document.body.appendChild(wrapper);

    // Set Active Button status
    if (currentLang === 'en') {
        document.getElementById('lang-btn-en').classList.add('active');
    } else {
        document.getElementById('lang-btn-hi').classList.add('active');
    }

    // Click Handlers for Buttons
    document.getElementById('lang-btn-en').addEventListener('click', function() {
        setLanguage('en');
    });
    
    document.getElementById('lang-btn-hi').addEventListener('click', function() {
        setLanguage('hi');
    });

    // Language Setter Function
    function setLanguage(lang) {
        var transCode = lang === 'en' ? '/en/en' : '/en/hi';
        // Erase old cookies first properly
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        if(domainStr) {
            document.cookie = 'googtrans=; ' + domainStr + ' expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }

        // Set New Cookies
        document.cookie = 'googtrans=' + transCode + '; path=/;';
        if(domainStr) {
            document.cookie = 'googtrans=' + transCode + ';' + domainStr + ' path=/;';
        }
        
        // Reload page to apply changes
        window.location.reload();
    }

    // Load Google Translate API Script
    window.googleTranslateElementInit = function() {
        new google.translate.TranslateElement({
            pageLanguage: 'en', 
            includedLanguages: 'hi,en', 
            autoDisplay: false
        }, 'google_translate_element');
    };

    var scriptNode = document.createElement('script');
    scriptNode.type = 'text/javascript';
    scriptNode.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.head.appendChild(scriptNode);

})();
