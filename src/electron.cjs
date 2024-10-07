const {app, ipcMain, BrowserWindow} = require("electron");
const serve = require("electron-serve");
const ws = require("electron-window-state");
try { require("electron-reloader")(module); } catch {}

const loadURL = serve({directory: "."});
const port = process.env.PORT || 3000;
const isdev = !app.isPackaged || (process.env.NODE_ENV == "development");
let mainwindow;

function loadVite(port) {
    mainwindow.loadURL(`http://localhost:${port}`).catch(() => {
        setTimeout(() => { loadVite(port); }, 200);
    });
}

function createMainWindow() {
    let mws = ws({
        defaultWidth: 1600,
        defaultHeight: 900,
    });

    mainwindow = new BrowserWindow({
        x: mws.x,
        y: mws.y,
        width: mws.width,
        height: mws.height,
        minWidth: 1600,
        minHeight: 900,
        title: "TimeSwift",
        icon: "static/Clock.png",

        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: isdev || true
        }
    });

    console.log('Minimale Breite:', mainwindow.getMinimumSize()[0]);
    console.log('Minimale Höhe:', mainwindow.getMinimumSize()[1]);

    mainwindow.setMenuBarVisibility(false);

    mainwindow.once("close", () => { mainwindow = null; });

    if(!isdev) mainwindow.removeMenu();
    else mainwindow.webContents.openDevTools();
    mws.manage(mainwindow);

    if(isdev) loadVite(port);
    else loadURL(mainwindow);
}

app.once("ready", createMainWindow);
app.on("activate", () => { if(!mainwindow) createMainWindow(); });
app.on("window-all-closed", () => { if(process.platform !== "darwin") app.quit(); });




/* Backend User Managment and Database */

//Username Abfrage

