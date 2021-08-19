/* this is where the HTML elements will be saved to variables

const scale = document.getElementByClass("scale");
const progression = document.getElementByClass("progression");
const notes = document.getElementByClass("notes");

*/

// initializes note arrays for calculations
const pianoNotes = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
let doubledNotes = pianoNotes.concat(pianoNotes);

// doubledNotes = doubledNotes.concat(pianoNotes);

// formulas to create a major or minor scale --
// in terms of successive semitones/steps to add to the root note
let majorScaleFormula = [2,2,1,2,2,2,1];
let minorScaleFormula = [2,1,2,2,1,2,2];

// converts the index to non zero values to make math easier
let pIndex = letterNote => letterNote + 1;

// creates a class for scales

class MusicScale {

    noteArray = [];

    constructor (id, tonic, majOrMin) {
        this.id = id;
        this.tonic = tonic;
        this.majOrMin = majOrMin;
    };

    initializeArray() {
        this.noteArray.push(this.tonic);
        
        /*
        function isFirstNote(val) {
            if (val === this.tonic) {
                return true;
            } else {
                return false;
            };
        };
        */

        let notePosition = doubledNotes.indexOf(this.tonic);

        console.log(notePosition);

        if (this.majOrMin === "maj") {
            for (let i=0; i < majorScaleFormula.length; i++) {
                if (majorScaleFormula[i] === 2) {
                    notePosition += 2;
                    this.noteArray.push(doubledNotes[notePosition]);
                } else {
                    notePosition += 1;
                    this.noteArray.push(mdoubledNotes[notePosition]);
                };
            };
        } else {
            for (let i=0; i < minorScaleFormula.length; i++) {
                if (minorScaleFormula[i] === 2) {
                    notePosition += 2;
                    this.noteArray.push(doubledNotes[notePosition]);
                } else {
                    notePosition += 1;
                    this.noteArray.push(doubledNotes[notePosition]);
                };
            };
        };
    };
};

// this fxn generates a random major scale using the JS Math pkg
function generateMajScale() {
    let majScale = '';
    const majScaleList=['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
    return majScaleList[Math.floor((Math.random() * 12))] + "maj";
};

// this fxn generates a random minor scale using the JS Math pkg
function generateMinScale() {
    let minScale = '';
    const minScaleList=['A', 'E', 'B', 'F#', 'C#', 'G#', 'Eb', 'Bb', 'F', 'C', 'G', 'D'];
    return minScaleList[Math.floor((Math.random() * 12))] + "min";
};

// this function gets a random binary integer and then generates a scale depending on that value
function randomScale() {
    let majMin = Math.round(Math.random());
    if (majMin === 0) {
        return generateMajScale();
    } else {
        return generateMinScale();
    };
};

// takes a scale code and returns all scale degrees in operatable format
function buildScale(desiredScaleCode) {
    let scaleTonic ="";
    let majOrMin = "";
    if (desiredScaleCode[1] === "m") {
        scaleTonic=desiredScaleCode[0];
        switch(desiredScaleCode.slice(1,4)) {
            case "maj":
                majOrMin = "maj";
                break;
            case "min":
                majOrMin = "min";
                break;
            default:
                console.log("error")
                break;
        };        
    } else {
        scaleTonic=desiredScaleCode.slice(0,2)
        switch(desiredScaleCode.slice(2,5)) {
            case "maj":
                majOrMin = "maj";
                break;
            case "min":
                majOrMin = "min";
                break;
            default:
                console.log("error")
                break;
        };
    };

    let currentScale = new MusicScale(desiredScaleCode, scaleTonic, majOrMin);
    
    currentScale.initializeArray();

    return currentScale.id + " " + currentScale.noteArray;

};

