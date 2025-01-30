# deepseek-vscode-bs README

The DeepSeek VSCode Extension integrates a chat interface directly into Visual Studio Code, allowing you to interact with the DeepSeek model (deepseek-r1) for conversational AI tasks. This extension provides a seamless way to send messages and receive responses within the editor.

Note: This extension is currently in debugging mode and may contain unfinished features or bugs. Feedback and contributions are welcome!

## Features

Chat Interface: A built-in webview panel for interacting with the DeepSeek model.

Streaming Responses: Real-time streaming of responses from the DeepSeek model for a smooth conversational experience.

Customizable UI: A simple and clean user interface for typing messages and viewing responses.

Error Handling: Displays error messages in the chat interface if something goes wrong during the conversation.

![project illustration](https://github.com/BrahimS/vscode-ext/blob/features/src/images/bs.png)


## Requirements

To use this extension, you need the following:

Visual Studio Code: Ensure you have VSCode installed on your machine.

Ollama: The extension uses the ollama library to interact with the DeepSeek model. Make sure you have Ollama installed and running locally.

Install Ollama by following the instructions in the [Ollama documentation](https://ollama.com/download).

Ensure the deepseek-r1:latest model is available in your Ollama instance. You can pull the model using:

```
ollama pull deepseek-r1:latest
```



## Code Overview
The extension is built using the following key components:

Webview Panel: A custom HTML-based interface for the chat.

Ollama Integration: The ollama.chat method is used to send messages to the DeepSeek model and stream responses.

Message Passing: Communication between the webview and the extension is handled using postMessage.

### Key Files
extension.ts: The main extension code that registers the command and handles the webview panel.

webview.html: The HTML template for the chat interface (embedded in the getWebviewContent function).



## Debugging Mode
This extension is currently in debugging mode. This means:

The functionality is still being tested and refined.

You may encounter bugs or incomplete features.

Feedback and bug reports are highly appreciated! Please open an issue in the repository if you encounter any problems.

