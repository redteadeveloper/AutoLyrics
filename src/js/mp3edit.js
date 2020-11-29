const ID3Writer = require("browser-id3-writer")
const filesaver = require("file-saver")
const fetch = require('node-fetch')

window.onload = function() {

    document.getElementById("file").onchange = function() {
        document.getElementById('filepath').style.color = "#000000"
        document.getElementById('filepath').value = document.getElementById('file').files[0].path
    }

    document.getElementById("submit").onclick = async function() {
        
        try {
            let filename = document.getElementById('file').files[0].path.split("\\")[document.getElementById('file').files[0].path.split("\\").length-1]
            let title = document.getElementById("title").value
            let artist = document.getElementById("artist").value

            if (!title) return document.getElementById("status").value = "Please enter title."
            if (!artist) return document.getElementById("status").value = "Please enter artist."

            document.getElementById("status").value = "Please wait a moment..."

            let res = await fetch(`https://some-random-api.ml/lyrics/?title=${encodeURI(artist)}_${encodeURI(title)}`)
            res = await res.json()
            let lyrics = res.lyrics

            if(!lyrics) return document.getElementById("status").value = "Couldn't find lyrics of " + title

            const reader = new FileReader();
            reader.onload = function () {
                const arrayBuffer = reader.result;
                const writer = new ID3Writer(arrayBuffer);
                writer.setFrame('USLT', {
                    description: '-',
                    lyrics: lyrics,
                    language: 'eng'
                });
                writer.addTag();
                document.getElementById("status").value = "Success!"
                const blob = writer.getBlob();
                filesaver.saveAs(blob, '(with lyrics) ' + filename);
            };
            reader.onerror = function () {
                // handle error
                console.error('Reader error', reader.error);
            };
            reader.readAsArrayBuffer(document.getElementById('file').files[0]);
        } catch (error) {
            document.getElementById("status").value = error
        }
        
    }
    
} 
