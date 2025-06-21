import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { DEFAULT_DATA_FOLDER, EXTENSION_ID } from './config';

export function initializeExtension(workspaceFolder: vscode.WorkspaceFolder) {
	const dataFolderPath = path.join(workspaceFolder.uri.fsPath, 'data');
	try {
		fs.mkdirSync(dataFolderPath, { recursive: true });
		vscode.window.showInformationMessage('Data folder initialized successfully.');
		vscode.commands.executeCommand('setContext', 'yourExtension:hasDataFolder', true);
	} catch (error) {
		vscode.window.showErrorMessage(`Failed to initialize data folder: ${error}`);
	}
}

export function initializeProject(workspaceFolder: vscode.WorkspaceFolder) {
	const dataFolderPath = path.join(workspaceFolder.uri.fsPath, DEFAULT_DATA_FOLDER);
	try {
		if (!fs.existsSync(dataFolderPath)) {
			fs.mkdirSync(dataFolderPath);
		}
		vscode.window.showInformationMessage(`Project initialized: "${DEFAULT_DATA_FOLDER}" folder created.`);
		vscode.commands.executeCommand('setContext', `${EXTENSION_ID}:hasDataFolder`, true);
	} catch (error) {
		vscode.window.showErrorMessage(`Failed to initialize project: ${error instanceof Error ? error.message : String(error)}`);
	}
}