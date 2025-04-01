// ==UserScript==
// @name         Expand UniFi Console ISP Latency Panel
// @namespace    http://tampermonkey.net/
// @version      2025-04-01
// @description  Expands the UniFi Console ISP Latency Panel
// @author       https://github.com/nickmartin1ee7
// @match        https://unifi.ui.com/consoles/*/network/default/dashboard
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ui.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const panelWidth = '100%';

    // Define the XPath array
    const xpaths = [
        "/html/body/div[1]/div[1]/main/div/div/div/div/div[1]/div/div/div[2]",
        "/html/body/div[1]/div[1]/main/div/div/div/div/div[1]/div/div/div[2]/section"
    ];

    // Create the button
    const button = document.createElement('button');
    button.textContent = 'Expand ISP Panel';
    button.style.position = 'fixed';
    button.style.bottom = '10px';
    button.style.left = '66px';
    button.style.zIndex = '1000';
    button.style.padding = '10px';
    button.style.backgroundColor = '#05254d';
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.visibility = 'hidden'; // Initially hidden

    // Append the button to the body
    document.body.appendChild(button);

    // Function to monitor XPath elements
    function monitorElements() {
        let shouldShowButton = false;

        xpaths.forEach(xpath => {
            const elements = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            for (let i = 0; i < elements.snapshotLength; i++) {
                const element = elements.snapshotItem(i);
                if (element && element.style.width !== panelWidth) {
                    shouldShowButton = true; // At least one element matching the XPath exists in the DOM with incorrect width
                }
            }
        });

        // Update button visibility
        button.style.visibility = shouldShowButton ? 'visible' : 'hidden';
    }

    // Function to modify XPath elements' widths
    function modifyWidths() {
        xpaths.forEach(xpath => {
            const elements = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            for (let i = 0; i < elements.snapshotLength; i++) {
                const element = elements.snapshotItem(i);
                element.style.width = panelWidth; // Set the desired width
                console.log(`Expanding ISP Panel for ${element.tagName} to ${panelWidth}`); // Log the element type being adjusted
            }
        });
    }

    // Monitor the XPath elements every 2 seconds
    setInterval(monitorElements, 2000);

    // Add click event listener to the button
    button.addEventListener('click', modifyWidths);
})();
