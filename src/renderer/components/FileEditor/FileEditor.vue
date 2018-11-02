<template>
    <div class="file-editor">
        <div class="button-row">
            <div class="left">
                <button @click="openFile"><font-awesome-icon icon="folder-open"></font-awesome-icon> Open File</button>
                <button ><font-awesome-icon icon="save"></font-awesome-icon> Save File</button>
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
    const { dialog } = require('electron').remote;
    import { Obfuscator } from '../../../services/Obfuscator';

    export default {
        name: 'file-editor',
        data: function() {
            return {
                fileText: ''
            };
        },
        methods: {
            openFile () {
                dialog.showOpenDialog((fileNames) => {
                    if(fileNames === undefined) {
                        console.log("no file selected");
                        return;
                    }

                    var selectedFile = fileNames[0];

                    fs.readFile(selectedFile, 'utf-8', (err, data) => {
                        if(err) {
                            alert("An error ocurred reading the file :" + err.message);
                            return;
                        }

                        console.log(`file content is: ${data}`);
                        this.fileText = data;
                    })
                });
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