const { app, BrowserWindow, ipcMain, Menu, Tray, nativeImage } = require('electron');
const path = require('path');
const fs = require('fs');

app.commandLine.appendSwitch('--no-sandbox');
app.commandLine.appendSwitch('--disable-setuid-sandbox');

let win;
let dragOffset = { x: 0, y: 0 };
const boundsFile = path.join(app.getPath('userData'), 'bounds.json');

function saveBounds() {
  if (win) {
    const bounds = win.getBounds();
    fs.writeFileSync(boundsFile, JSON.stringify(bounds));
  }
}

function loadBounds() {
  try {
    return JSON.parse(fs.readFileSync(boundsFile, 'utf8'));
  } catch {
    return { width: 655, height: 150, x: 100, y: 100 };
  }
}

ipcMain.on('close-window', () => {
  if (win) win.close();
});

ipcMain.on('show-context-menu', (event) => {
  const menu = Menu.buildFromTemplate([
    {
      label: 'Settings',
      click: () => event.sender.send('toggle-settings')
    },
    {
      label: 'Close',
      click: () => win.close()
    }
  ]);
  menu.popup();
});

ipcMain.on('start-drag', (event, pos) => {
  const bounds = win.getBounds();
  dragOffset.x = pos.x - bounds.x;
  dragOffset.y = pos.y - bounds.y;
});

ipcMain.on('drag', (event, pos) => {
  const newX = pos.x - dragOffset.x;
  const newY = pos.y - dragOffset.y;
  win.setBounds({ x: newX, y: newY, width: 655, height: win.getBounds().height });
});

ipcMain.on('resize-window', (event, height) => {
  const bounds = win.getBounds();
  win.setBounds({ ...bounds, height });
});

ipcMain.on('save-bounds', saveBounds);

function createWindow() {
  const bounds = loadBounds();
  win = new BrowserWindow({
    ...bounds,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    resizable: false,
    frame: false,
    transparent: true,
    show: false,
    skipTaskbar: true,
    type: process.platform === 'linux' ? 'toolbar' : undefined,
    alwaysOnTop: false,
    icon:"./icon.png",
    title: 'GitHub Contributions',
    name: 'GitHub Contributions'
  });

  win.loadFile('index.html');
  win.on('close', saveBounds);

  const icon = nativeImage.createFromPath(path.join(__dirname, 'icon.png'));
  const tray = new Tray(icon);
  tray.setToolTip('GitHub Contributions');

  const trayMenu = Menu.buildFromTemplate([
    {
      label: 'Settings',
      click: () => win.webContents.send('toggle-settings')
    },
    {
      label: 'Close',
      click: () => win.close()
    }
  ]);

  tray.on('click', () => {
    if (win.isVisible()) {
      win.hide();
    } else {
      win.show();
      setTimeout(() => {
        win.setSkipTaskbar(true);
      }, 100);
    }
  });

  tray.setContextMenu(trayMenu);

  win.once('ready-to-show', () => {
    win.show();
    
    // Force hide from taskbar on Linux
    if (process.platform === 'linux') {
      setTimeout(() => {
        win.setSkipTaskbar(true);
        // Additional Linux-specific method
        win.blur();
      }, 100);
      
      // Try multiple times for Linux
      setTimeout(() => win.setSkipTaskbar(true), 500);
      setTimeout(() => win.setSkipTaskbar(true), 1000);
    } else {
      win.setSkipTaskbar(true);
    }
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
