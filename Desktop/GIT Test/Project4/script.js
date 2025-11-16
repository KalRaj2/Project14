function openNewWindowWithText() {
    // Define the custom text (can be a full HTML string)
    const customContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>My Custom Window</title>
            <style>
                body { font-family: sans-serif; padding: 20px; }
                h1 { color: blue; }
            </style>
        </head>
        <body>
            <h1>Byeee</h1>
            <p>This is your custom text in a new browser window/tab.</p>
            <p>The current time is: ${new Date().toLocaleTimeString()}</p>
        </body>
        </html>
    `;

    // Open a new window (initially blank) and get a reference to it
    // Using an empty URL and name like '' defaults to a new tab in most modern browsers
    const newWin = window.open('', '_blank');

    // Check if the window was successfully opened (not blocked by a popup blocker)
    if (newWin) {
        // Write the custom HTML content to the new window's document
        newWin.document.write(customContent);
        
        // Close the document to finish loading and trigger events
        newWin.document.close();
        
        // Focus the new window
        newWin.focus();
    } else {
        alert('Popup blocked! Please allow popups for this website to see the custom text window.');
    }
}
