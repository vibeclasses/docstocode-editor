import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { initializeExtension, initializeProject } from "./initialize"; // Import your initialization logic
import { EXTENSION_ID, EXTENSION_NAME, DEFAULT_DATA_FOLDER } from "./config";

vscode.commands.registerCommand(`${EXTENSION_ID}.initProject`, async () => {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  if (!workspaceFolder) {return;}

  // Create data folder
  const dataFolder = path.join(workspaceFolder.uri.fsPath, DEFAULT_DATA_FOLDER);
  await fs.promises.mkdir(dataFolder, { recursive: true });

  // Create sample files
  const sampleData = { id: 1, name: "Sample Item" };
  await fs.promises.writeFile(
    path.join(dataFolder, "sample.json"),
    JSON.stringify(sampleData, null, 2)
  );

  vscode.window.showInformationMessage("Project initialized successfully!");
});

export function activate(context: vscode.ExtensionContext) {
  // Check if current workspace has your target folder
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];

  if (!workspaceFolder) {
    return;
  }

  const dataFolderPath = path.join(
    workspaceFolder.uri.fsPath,
    DEFAULT_DATA_FOLDER
  );

  if (fs.existsSync(dataFolderPath)) {
    // Extension is relevant for this project
    vscode.commands.executeCommand(
      "setContext",
      `${EXTENSION_ID}:hasDataFolder`,
      true
    );
    initializeExtension(workspaceFolder);
  } else {
    // Show initialization option
    showInitializationOption(context, workspaceFolder);
  }
}

function showInitializationOption(
  context: vscode.ExtensionContext,
  workspaceFolder: vscode.WorkspaceFolder
) {
  vscode.window
    .showInformationMessage(
      `Would you like to initialize this project for ${EXTENSION_NAME}?`,
      "Yes",
      "No"
    )
    .then((selection) => {
      if (selection === "Yes") {
        initializeProject(workspaceFolder);
      }
    });
}

// import * as vscode from 'vscode';

// // This method is called when your extension is activated
// // Your extension is activated the very first time the command is executed
// export function activate(context: vscode.ExtensionContext) {

// 	// Use the console to output diagnostic information (console.log) and errors (console.error)
// 	// This line of code will only be executed once when your extension is activated
// 	console.log('Congratulations, your extension "docstocode-editor" is now active!');

// 	// The command has been defined in the package.json file
// 	// Now provide the implementation of the command with registerCommand
// 	// The commandId parameter must match the command field in package.json
// 	const disposable = vscode.commands.registerCommand('docstocode-editor.healthcheck', () => {
// 		// The code you place here will be executed every time your command is executed
// 		// Display a message box to the user
// 		vscode.window.showInformationMessage('Hello World from DocsToCode Editor!');
// 	});

// 	context.subscriptions.push(disposable);
// }

// // This method is called when your extension is deactivated
// export function deactivate() {}
