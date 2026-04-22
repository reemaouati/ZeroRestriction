// ==UserScript==
// @name         ZeroRestriction
// @namespace    https://github.com/reemaouati
// @version      1.0
// @description  Enforce absolute document sovereignty. Neutralize all CSS and JavaScript-based copy/selection barriers.
// @author       Reem Aouati
// @run-at       document-start
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    /**
     * Forcefully restores selection capabilities via CSS.
     * Overrides 'user-select' and 'pointer-events' globally.
     */
    const enforceCssSovereignty = () => {
        const style = document.createElement('style');
        style.innerHTML = `
            * {
                -webkit-user-select: text !important;
                -moz-user-select: text !important;
                -ms-user-select: text !important;
                user-select: text !important;
                pointer-events: auto !important;
            }
        `;
        document.documentElement.appendChild(style);
    };

    /**
     * Captures and terminates event listeners that block user interaction.
     * Uses the capturing phase (true) to intercept events before site logic.
     */
    const neutralizeListeners = () => {
        const restrictiveEvents = [
            'copy', 'cut', 'contextmenu', 
            'selectstart', 'mousedown', 'mouseup'
        ];

        restrictiveEvents.forEach(event => {
            window.addEventListener(event, (e) => {
                e.stopImmediatePropagation();
            }, true);
        });
    };

    /**
     * Main execution logic.
     */
    const run = () => {
        enforceCssSovereignty();
        neutralizeListeners();
    };

    // Execute immediately at document-start
    run();

    // Re-run on DOMContentLoaded to handle late-loading scripts
    window.addEventListener('DOMContentLoaded', run);
})();
