<template>
    <div class="file-editor">
        <div class="button-row">
            <div class="left">
                <button @click="openFile"><font-awesome-icon icon="folder-open"></font-awesome-icon> Open File</button>
                <button @click="saveFile"><font-awesome-icon icon="save"></font-awesome-icon> Save File</button>
            </div>
            <div class="right">
                <button @click="decryptText"><font-awesome-icon icon="unlock-alt"></font-awesome-icon> Decrypt Text</button>
                <button @click="encryptText"><font-awesome-icon icon="lock"></font-awesome-icon> Encrypt Text</button>
            </div>
        </div>
        <div class="editor-container">
            <textarea class="editor" ref="editor" id="editor" v-model="fileText"></textarea>
        </div>
    </div>
</template>

<script>
    import fs from 'fs';
    import path from 'path';
    const electronRemote = require('electron').remote;
    const dialog = electronRemote.dialog;
    import { Obfuscator } from '../../../services/Obfuscator';

    export default {
        name: 'file-editor',
        data: function() {
            return {
                fileText: '',
                fileName: 'new.txt',
                lastSelectedFolder: ''
            };
        },
        methods: {
            openFile() {
                dialog.showOpenDialog((fileNames) => {
                    if(fileNames === undefined) {
                        console.log("no file selected");
                        return;
                    }

                    let selectedFile = fileNames[0];
                    this.fileName = path.basename(selectedFile);

                    fs.readFile(selectedFile, 'utf-8', (err, data) => {
                        if(err) {
                            alert("An error ocurred reading the file :" + err.message);
                            return;
                        }

                        //console.log(`file content is: ${data}`);
                        this.fileText = data;
                    })
                });
            },

            saveFile() {
                let defaultPath;
                if(this.lastSelectedFolder) {
                    defaultPath = path.resolve(this.lastSelectedFolder, path.basename(this.fileName));
                }
                else {
                    defaultPath = path.resolve(electronRemote.app.getPath("desktop"), path.basename(this.fileName));
                }
                let selectedPath = dialog.showSaveDialog({defaultPath: defaultPath});
                if(selectedPath) {
                    this.lastSelectedFolder = path.dirname(selectedPath);
                    fs.writeFile(selectedPath, this.fileText, (err) => {
                        if(err) {
                            console.log(err);
                        }
                    })
                }
            },

            decryptText() {
                this.fileText = Obfuscator.decrypt(this.fileText, "asdf");
            },

            encryptText() {
                this.fileText = Obfuscator.encrypt(this.fileText, "asdf");
            }
        }
    }
</script>

<style>
    .file-editor, .editor-container {
        width: 100%;
        height: 100%;
        min-width: 440px;
    }

    .button-row {
        height: 40px;
    }

    .editor{
        width: 100%;
        height: 100%;
    }

    textarea {
        resize: none;
    }

    .left {
        float: left;
    }
    
    .right {
        float: right;
    }
</style>