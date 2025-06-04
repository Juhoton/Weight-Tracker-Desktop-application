const windowStateManager = require('electron-window-state');
const { app, BrowserWindow, ipcMain } = require('electron');
const contextMenu = require('electron-context-menu');
const serve = require('electron-serve');
const path = require('path');
const { Model } = require('./model/Model.cjs');
const { Console } = require('console');

try {
	require('electron-reloader')(module);
} catch (e) {
	console.error(e);
}

const serveURL = serve({ directory: '.' });
const port = process.env.PORT || 5173;
const dev = !app.isPackaged;
let mainWindow;
let modal;
const model = new Model();

function createWindow() {
	let windowState = windowStateManager({
		defaultWidth: 800,
		defaultHeight: 600,
	});

	const mainWindow = new BrowserWindow({
		backgroundColor: '#39542c',
		autoHideMenuBar: true,
		trafficLightPosition: {
			x: 17,
			y: 32,
		},
		resizable: false,
		webPreferences: {
			enableRemoteModule: true,
			contextIsolation: true,
			nodeIntegration: true,
			spellcheck: false,
			devTools: dev,
			preload: path.join(__dirname, 'preload.cjs'),
		},
		x: windowState.x,
		y: windowState.y,
		width: windowState.width,
		height: windowState.height,
	});

	windowState.manage(mainWindow);

	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
		mainWindow.focus();
	});

	mainWindow.on('close', () => {
		windowState.saveState(mainWindow);
	});

	return mainWindow;
}

contextMenu({
	showLookUpSelection: false,
	showSearchWithGoogle: false,
	showCopyImage: false,
	prepend: (defaultActions, params, browserWindow) => [
		{
			label: 'Make App 💻',
		},
	],
});

function loadVite(port) {
	mainWindow.loadURL(`http://localhost:${port}`).catch((e) => {
		console.log('Error loading URL, retrying', e);
		setTimeout(() => {
			loadVite(port);
		}, 200);
	});
}

function createMainWindow() {
	mainWindow = createWindow();
	mainWindow.once('close', () => {
		mainWindow = null;
	});

	if (dev) loadVite(port);
	else serveURL(mainWindow);
}

app.once('ready', createMainWindow);
app.on('activate', () => {
	if (!mainWindow) {
		createMainWindow();
	}
});
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('to-main', (event, count) => {
	return mainWindow.webContents.send('from-main', `next count is ${count + 1}`);
});



// Routing

let profileName = "";

ipcMain.handle('get-profile-names', async () => {
	return model.getAllProfileNames();
});

ipcMain.handle('get-profile-settings', async (event, name) => {
	return model.getProfileSettings(name);
});

ipcMain.handle('get-profile-entries', async (event, name) => {
	return model.getProfileEntries(name);
});

ipcMain.handle('get-profile-goal-type', async (event, name) => {
	return model.getProfileGoalType(name);
});

ipcMain.handle('get-profile-goal-weight', async (event, name) => {
	return model.getProfileGoalWeight(name);
});

ipcMain.handle('get-profile-goal-bodyfat', async (event, name) => {
	return model.getProfileGoalBodyfat(name);
});

ipcMain.handle('get-profile-activity-level', async (event, name) => {
	return model.getProfileActivityLevel(name);
});

ipcMain.handle('get-profile-target-calories', async (event, name) => {
	return model.getProfileTargetCalories(name);
});

ipcMain.handle('get-calorie-consumption', async (event, name) => {
	return model.getCalorieConsumption(name);
});

ipcMain.on('open-delete-confirmation', async (_, modalArgs) => {
	modal = new BrowserWindow({
		backgroundColor: '#39542c',
		autoHideMenuBar: true,
		resizable: false,
		width: 229,
		height: 130,
		parent: mainWindow,
		modal: true,
		webPreferences: {
			enableRemoteModule: true,
			contextIsolation: true,
			nodeIntegration: true,
			spellcheck: false,
			devTools: dev,
			preload: path.join(__dirname, 'preload.cjs'),
		},
	});

	// Pass data via query string or IPC
	modal.loadURL(`http://localhost:${port}/deleteprofile/deleteconfirmation?name=${encodeURIComponent(modalArgs.name)}`);
});

ipcMain.on('open-add-entry', async (_, modalArgs) => {
	modal = new BrowserWindow({
		backgroundColor: '#39542c',
		autoHideMenuBar: true,
		resizable: false,
		width: 545,
		height: 258,
		parent: mainWindow,
		modal: true,
		webPreferences: {
			enableRemoteModule: true,
			contextIsolation: true,
			nodeIntegration: true,
			spellcheck: false,
			devTools: dev,
			preload: path.join(__dirname, 'preload.cjs'),
		},
	});

	// Pass data via query string or IPC
	modal.loadURL(`http://localhost:${port}/mainscreen/addentry?name=${encodeURIComponent(modalArgs.name)}`);
});

ipcMain.on('open-edit-goals', async (_, modalArgs) => {
	modal = new BrowserWindow({
		backgroundColor: '#39542c',
		autoHideMenuBar: true,
		resizable: false,
		width: 545,
		height: 258,
		parent: mainWindow,
		modal: true,
		webPreferences: {
			enableRemoteModule: true,
			contextIsolation: true,
			nodeIntegration: true,
			spellcheck: false,
			devTools: dev,
			preload: path.join(__dirname, 'preload.cjs'),
		},
	});

	// Pass data via query string or IPC
	modal.loadURL(`http://localhost:${port}/mainscreen/editgoals`);
});

ipcMain.on('close-modal', () => {
	modal.close();
});

ipcMain.on('delete-profile',  (event, name) => {
	model.deleteProfile(name);
});

ipcMain.handle('', async (event, name) => {
	return model;
});

ipcMain.on('send-profile', (event, profile) => {
	model.addProfile(profile);
});

ipcMain.on('send-add-entry', (event, entry) => {
	model.addEntry(entry);
});

ipcMain.on('set-temp-profile-name', (event, name) => {
	profileName = name;
})
ipcMain.handle('get-temp-profile-name', async () => {
	return profileName;
});

ipcMain.on('set-profile-goal-type', (event, name, goalType ) => {
	model.setProfileGoalType(name, goalType);
});

ipcMain.on('set-profile-goal-weight', (event, name, goalWeight) => {
	model.setProfileGoalWeight(name, goalWeight);
});

ipcMain.on('set-profile-goal-bodyfat', (event, name, goalBodyfat) => {
	model.setProfileGoalBodyfat(name, goalBodyfat);
});

ipcMain.on('set-profile-target-calories', (event, name, targetCalories) => {
	model.setProfileTargetCalories(name, targetCalories);
	console.log("targer calories ipc:",name, targetCalories);
});

ipcMain.on('', (event, ) => {
	model.apply;
});