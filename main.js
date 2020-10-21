// Main Process
const { app, BrowserWindow, Notification } = require('electron');
const path = require('path');

function createWindow(){
    // Browser Window <- Renderer Process
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            // will sanitize JS code
            // TODO: explain when React application is initialize
            worldSafeExecuteJavaScript: true,
            // is a feature that ensures that both, your preload scripts and 
            // Electrons internal logic tun in separate context
            contextIsolation: true
        }
    })
    win.loadFile('index.html')
    win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

// For Dawin
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
})

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0){
        createWindow();
    }
})

// Chromium -> web engine for rendering the UI, full Chrome-like web browser