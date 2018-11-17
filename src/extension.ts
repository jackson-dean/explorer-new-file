"use strict";
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "vscode-nerdtree.showQuickHelp",
    () => {

    const commands: { [key:string]: string } = {
        "cmd+n": "explorer.newFile",
        "cmd+backspace": "deleteFile",
        "l": "list.select",
        "ctrl+enter": "explorer.openToSide"
      };

      const helpMenu: vscode.QuickPickItem[] = [
        {
          label: "New File",
          description: "cmd+n",
        },
        {
          label: "Delete File",
          description: "cmd+backspace"
        },
        {
          label: "open file or expand folder",
          description: "l"
        },
        {
          label: "open file to the side",
          description: "ctrl+enter"
        }
      ];

      vscode.window.showQuickPick(helpMenu).then((selectedItem) => {
          vscode.commands.executeCommand('workbench.action.focusSideBar').then(() => {
            if (selectedItem && selectedItem.description) {
              vscode.commands.executeCommand(commands[selectedItem.description]);
            }
          })
      });
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
