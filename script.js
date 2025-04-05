// ==UserScript==
// @name         Expand UniFi Side Panel
// @namespace    http://tampermonkey.net/
// @version      2025-04-01
// @description  Expands the UniFi Side Panel
// @author       https://github.com/nickmartin1ee7/UniFi-Console-Side-Panel-Expansion-Script
// @match        https://unifi.ui.com/consoles/*/network/default/dashboard
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ui.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const panelWidth = '100%';

    // Define the XPath array once
    const xpaths = [
        "/html/body/div[1]/div[1]/main/div/div/div/div/div[1]/div/div/div[2]",
        "/html/body/div[1]/div[1]/main/div/div/div/div/div[1]/div/div/div[2]/section"
    ];

    // Create the container div
    const container = document.createElement('div');
    container.style.width = '400px'; // Set width for the surrounding div
    container.style.position = 'fixed'; // Keep the container fixed
    container.style.top = '7.5px'; // Positioning
    container.style.right = '0px'; // Positioning
    container.style.zIndex = '1000'; // Ensure the div stays on top
    container.style.display = 'flex'; // Use flexbox
    container.style.justifyContent = 'center'; // Center the button horizontally
    container.style.alignItems = 'center'; // Center the button vertically (optional)
    container.style.pointerEvents = 'none'; // Make the div click-through

    // Create the button
    const button = document.createElement('button');
    button.textContent = 'Expand Side Panel';
    button.style.padding = '10px';
    button.style.backgroundColor = '#05254d';
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.cursor = 'pointer';
    button.style.visibility = 'hidden'; // Initially hidden
    button.style.pointerEvents = 'auto'; // Allow the button to be clickable

    // Append the button to the container
    container.appendChild(button);

    // Append the container to the document body
    document.body.appendChild(container);

    // Function to monitor XPath elements
    function monitorElements() {
        let shouldShowButton = false;

        xpaths.forEach(xpath => {
            const elements = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            for (let i = 0; i < elements.snapshotLength; i++) {
                const element = elements.snapshotItem(i);
                if (element && element.style.width !== panelWidth) {
                    shouldShowButton = true; // At least one element matching the xpath exists in the DOM with incorrect width
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
                console.log(`Expanding Side Panel for ${element.tagName} to ${panelWidth}`); // Log the element type being adjusted
            }
        });
    }

    // Monitor the XPath elements
    setInterval(monitorElements, 500);

    // Add click event listener to the button
    button.addEventListener('click', modifyWidths);
})();
