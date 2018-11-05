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
        <div class="password-container">
            <label class="pc_label" for="password">Password: </label>
            <input type="password" class="pc_input" id="password" v-model="password" />
        </div>
        <br />
        <div class="editor-container">
            <textarea class="editor" ref="editor" id="editor" v-model="fileText"></textarea>
        </div>
    </div>
</template>

<script>
    import fs from'fs';
    import path from'path';
    import{ Obfuscator } from'../../../services/Obfuscator';
    const electronRemote = require('electron').remote;
    const dialog = electronRemote.dialog;

    export default {
        name: 'file-editor',
        data: function() {
            return{
                fileText: '',
                fileName: 'new.txt',
                lastSelectedFolder: '',
                password: ''
            };
        },
        computed: {
            defaultFolder: function() {
                if(this.lastSelectedFolder) {
                    return this.lastSelectedFolder;
                }
                else{
                    return electronRemote.app.getPath('desktop');
                }
            }
        },
        methods: {
            openFile() {
                dialog.showOpenDialog({defaultPath: this.defaultFolder}, (fileNames) => {
                    if(fileNames === undefined) {
                        console.log('no file selected');
                        return;
                    }

                    let selectedFile = fileNames[0];
                    this.fileName = path.basename(selectedFile);

                    fs.readFile(selectedFile, 'utf-8', (err, data) => {
                        this.lastSelectedFolder = path.dirname(selectedFile);
                        if(err) {
                            alert('An error ocurred reading the file :' + err.message);
                            return;
                        }

                        // console.log(`file content is: ${data}`);
                        this.fileText = data;
                    });
                });
            },

            saveFile() {
                let defaultPath = path.resolve(this.defaultFolder, path.basename(this.fileName));
                let selectedPath = dialog.showSaveDialog({defaultPath: defaultPath});
                if(selectedPath) {
                    this.lastSelectedFolder = path.dirname(selectedPath);
                    fs.writeFile(selectedPath, this.fileText, (err) => {
                        if(err) {
                            console.log(err);
                        }
                    });
                }
            },

            decryptText() {
                if(this.password) {
                    this.fileText = Obfuscator.decrypt(this.fileText, 'asdf');
                }
                else{
                    alert('Please enter the password for this file.');
                }
            },

            encryptText() {
                if(this.password) {
                    this.fileText = Obfuscator.encrypt(this.fileText, 'asdf');
                }
                else{
                    alert('Please enter the password for this file.');
                }
            }
        }
    };
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

    .password-container {
        display: flex;
        flex-wrap: nowrap;
    }

    .pc_label {
        flex-grow: 1
    }

    .pc_input {
        flex-grow: 100;
    }

    .left {
        float: left;
    }
    
    .right {
        float: right;
    }
</style>