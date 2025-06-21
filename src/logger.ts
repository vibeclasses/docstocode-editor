import * as vscode from 'vscode';
import { EXTENSION_ID, EXTENSION_NAME } from './config';

const outputChannel = vscode.window.createOutputChannel(EXTENSION_NAME);

const logger = (message: string) => {
    if (!message) {
        return;
    }
    const config = vscode.workspace.getConfiguration(EXTENSION_ID);
    if (config.get('logLevel') === 'debug') {
        outputChannel.appendLine(`[${EXTENSION_NAME} | ${new Date().toISOString()}]: ${message}`);
    }
};

export default logger;