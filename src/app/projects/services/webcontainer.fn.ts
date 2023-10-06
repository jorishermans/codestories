import { WebContainer, WebContainerProcess } from "@webcontainer/api";

/** @type {import('@webcontainer/api').WebContainer}  */
let webcontainerInstance: WebContainer;

export function startListening() {
    window.addEventListener('load', async () => {
        // Call only once
        webcontainerInstance = await WebContainer.boot();
        console.log('web container is booted');
        executeCommand();
        await writeJS('index.js', 'console.log("hello world");');
        const result = await runCommandDirect('node', ['index.js']);
        console.log(result);
        const result2 = await runCommandDirect('npm', ['init', '-y']);
        console.log(result2);
    });
}

/** @param {string} content*/

export async function writeJS(fileName: string, content: string) {
    let existing = '';
    try {
        existing = await webcontainerInstance.fs.readFile(fileName, 'utf-8');
        console.log(existing);
        content += ' \n' + existing;
        console.log(content);
    } catch(ex) {
        console.warn('no file');
    }
    await webcontainerInstance.fs.writeFile(fileName, content);
};

export async function runCommandDirect(cmd: string, args: string[]) {
    const process = await webcontainerInstance.spawn(cmd, args);
    return await writeToProcess(process);
}

export async function executeCommand() {
    const installProcess = await webcontainerInstance.spawn('node', ['-v']);
    return await writeToProcess(installProcess);
}

export async function executeNpmInstall(args: string[]) {
    const installProcess = await webcontainerInstance.spawn('npm', ['install', ...args, '--save']);
    return installProcess.output;
}

export async function runCommand(cmd: string, args: string[]) {
    const process = await webcontainerInstance.spawn(cmd, args);
    return process.output;
}

export async function writeToProcess(installProcess: WebContainerProcess) {
    return new Promise<string>((resolve, _reject) => {
        installProcess.output.pipeTo(new WritableStream({
            write(data: string) {
                resolve(data);
            }
          }));
      });
}