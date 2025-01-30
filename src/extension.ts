// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import ollama from 'ollama';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "deepseek-vscode-bs" is now active!');
	const disposable = vscode.commands.registerCommand('deepseek-vscode-bs.hiDeep', () => {
		const panel = vscode.window.createWebviewPanel(
			"deepCaht",
			"DeepSeek",
			vscode.ViewColumn.One,
			{enableScripts: true}
		);
		panel.webview.html = getWebviewContent();
		panel.webview.onDidReceiveMessage(async (message: any) => {
			if (message.command === 'chat') {
				const response = await message.text;
				let returnedText = '';

				try {
					const streamRespponse = await ollama.chat({
						model: 'deepseek-r1:latest',
						messages: [{role: 'user', content: response}],
						stream: true
					});
					for await (const textChank of streamRespponse) {
						returnedText += textChank.message.content;
						panel.webview.postMessage({ command: 'chatResponse', text: returnedText });
					}
					
				} catch (error) {
					panel.webview.postMessage({ command: 'chatResponse', text: `Error: ${String(error)}` });
				}
			}
		});
	});

	const getWebviewContent = () => {
		return /*html*/`
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>DeepSeek vscode-extension-bs</title>
				<style>
					html,body{font-family: sans-serief; padding: 1em; margin: 0;}
					.form-wrapper{display: flex; flex-direction: row; gap: 0.3em; width: 100%, height: 100%; justify-content: space-betwen; justify-items: center;}
					#inputText{min-width: 90%; min-height: 50px; height: 50px; max-height: 50px; box-sizing: border-box; border-radius: 4px; color:#a9b2c6; padding: 1em; border: 1px solid white; background: transparent} 
					#requestBtn{ flex:1;height: 50px;max-height: 50px; box-sizing: border-box; border-radius: 4px; color:#a9b2c6; padding: 1em; border: 1px solid white; background: transparent} 
					#responseText{width: 100%;  box-sizing: border-box; padding: 1em; min-height: 500px; border-radius: 4px; color:#a9b2c6; margin-top: 0.5em; padding: 2em;border: 1px solid white;  background: transparent; font-size: 1rem;}
				</style>
			</head>
			<body>
				<h1>DeepSeek chat for Vscode</h1>
				<section class="form-wrapper">
					<textarea id="inputText" row="5" palaceholder="Type your message here"></textarea><br />
					<button id="requestBtn">Go</button>
				</section>
					<section id="responseText"></section>
			</body>
			<script>
				const vscode = acquireVsCodeApi();
				document.getElementById('requestBtn').addEventListener('click', () => {
					const inputText = document.getElementById('inputText').value;
					vscode.postMessage({
						command: 'chat',
						text: inputText
					});
					window.addEventListener('message', (event) => {
						const { command, text } = event.data;
						if (command === 'chatResponse') {
							document.getElementById('responseText').innerHTML = text;
						}
					})
				})
			</script>
			</html>
		`;
	};

	context.subscriptions.push(disposable);
}

export function deactivate() {}
