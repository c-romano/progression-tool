/* this is where the HTML elements will be saved to variables

const scale = document.getElementByClass("scale");
const progression = document.getElementByClass("progression");
const notes = document.getElementByClass("notes");

*/

// initializes note arrays for calculations
const pianoNotes = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
let doubledNotes = pianoNotes.concat(pianoNotes);

// formulas to create a major or minor scale --
// in terms of successive semitones/steps to add to the root note
let majorScaleFormula = [2,2,1,2,2,2,1];
let minorScaleFormula = [2,1,2,2,1,2,2];

// converts the index to non zero values to make math easier
let pIndex = letterNote => letterNote + 1;

// formulas for major and minor chord creation
let majorChordFormula = [4,7];
let minorChordFormula = [3,7];

// progression arrays
let majProgressionArray = [
    ["maj1", "maj5", "min6", "maj4"],
    ["min6", "maj5", "maj4", "maj5"],
    ["maj1", "maj4", "maj5", "maj1"],
    ["maj1", "maj5", "maj4", "maj4"]
]

let minProgressionArray = [
    ["min1", "maj6", "maj3", "maj7"],
    ["min1", "maj3", "maj7", "maj6"],
    ["min1", "maj6", "maj7", "min1"],
    ["maj6", "min1", "maj4", "maj7"]
]

// for converting chord to roman numeral
let majRomanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII"];
let minRomanNumerals = ["i", "ii", "iii", "iv", "v", "vi", "vi"];

// creates a class for scales
class MusicScale {

    noteArray = [];
    scaleName;

    constructor (id, tonic, majOrMin) {
        this.id = id;
        this.tonic = tonic;
        this.majOrMin = majOrMin;
    };

    // sets up the array and proper scale name
    initializeScale() {
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

        if (this.majOrMin === "maj") {
            for (let i=0; i < majorScaleFormula.length; i++) {
                if (majorScaleFormula[i] === 2) {
                    notePosition += 2;
                    this.noteArray.push(doubledNotes[notePosition]);
                } else {
                    notePosition += 1;
                    this.noteArray.push(doubledNotes[notePosition]);
                };
            };

            this.scaleName = this.tonic + " Major"

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

            this.scaleName = this.tonic + " Minor"
        };
    };

    // method that generated a formatted string of scale notes
    convertToString() {
        let scaleString = this.noteArray[0];

        for (let i=1; i < this.noteArray.length; i++) {
            scaleString += " - ";
            scaleString += this.noteArray[i];
        }

        return scaleString;
    }

};

// could add chord class here but probably overkill

// this fxn generates a random major scale using the JS Math pkg
function generateMajScale() {
    let majScale = '';
    const majScaleList=['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F'];

    // actual scale list below. Converted to sharps for consistency.
    // const majScaleList=['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'];

    return majScaleList[Math.floor((Math.random() * 12))] + "maj";
};

// this fxn generates a random minor scale using the JS Math pkg
function generateMinScale() {
    let minScale = '';
    const minScaleList=['A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F', 'C', 'G', 'D'];
    
    // actual scale list is below. Everything was converted to sharps for consistency.
    //const minScaleList=['A', 'E', 'B', 'F#', 'C#', 'G#', 'Eb', 'Bb', 'F', 'C', 'G', 'D'];
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

// generates a random major chord progression
function generateProgression(majMin) {
    if (majMin === "maj") {
        return majProgressionArray[Math.floor((Math.random() * 4))];
    } else {
        return minProgressionArray[Math.floor((Math.random() * 4))];
    };
}



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
    currentScale.initializeScale();

    return currentScale;

};

// takes chord root note and type and returns a chord array
function generateChord(rootNote, chordType) {
    currentChord = [];

    switch (chordType) { 
        case "maj":
            currentChord.push(rootNote);
            currentChord.push(doubledNotes[doubledNotes.indexOf(rootNote) + majorChordFormula[0]]);
            currentChord.push(doubledNotes[doubledNotes.indexOf(rootNote) + majorChordFormula[1]]);
            break;
        case "min":
            currentChord.push(rootNote);
            currentChord.push(doubledNotes[doubledNotes.indexOf(rootNote) + minorChordFormula[0]]);
            currentChord.push(doubledNotes[doubledNotes.indexOf(rootNote) + minorChordFormula[1]]);
            break;
        default:
            console.log("error")
            break;
    };

    return currentChord;
};

// takes chord root and type to construct proper name
function findChordName(rootNote, chordType) {
    if (chordType === "maj") {
        return rootNote + " Major"
    } else {
        return rootNote + " Minor"
    };
};

// takes chord number and type and finds numeral
function findChordNumeral(chordNumber, chordType) {
    if (chordType === "maj") {
        return majRomanNumerals[chordNumber-1]
    } else {
        return minRomanNumerals[chordNumber-1]
    };
};

// calls generate progression formula and parses chords given key
function generateChordProgression(musicScale) {
    let progression = generateProgression(musicScale.majOrMin);
    
    let progressionDetails = [];

    let actualChordNameArray = [];
    let actualChordNumeral = [];
    let actualChordArray = [];

    for (let i=0; i < progression.length; i++) {
        let majOrMinChord = progression[i].slice(0,3);
        let chordRoot = musicScale.noteArray[progression[i].slice(3,4)-1];
        let chordNumber = progression[i].slice(3,4);

        actualChordNameArray.push(findChordName(chordRoot, majOrMinChord));
        actualChordNumeral.push(findChordNumeral(chordNumber, majOrMinChord));
        
        actualChordArray.push(generateChord(chordRoot, majOrMinChord));

    };
    
    // creates a string of the progression to eventually be displayed
    let formattedProgression = actualChordNumeral[0] + " - " + actualChordNumeral[1] + " - "
    + actualChordNumeral[2] + " - " + actualChordNumeral[3];

    // adds the different components to one unified array
    progressionDetails.push(actualChordNameArray, actualChordNumeral, actualChordArray,
    formattedProgression);
    
    return progressionDetails;
};

// the main function that will execute after pressing the button
function generateRandomImprov() {
    let generatedScale = buildScale(randomScale());
    let keyDetails = generateChordProgression(generatedScale);

    // debated using a loop for this

    // updates chord names on HTML
    document.getElementById("chord1-name").innerHTML=keyDetails[0][0];
    document.getElementById("chord2-name").innerHTML=keyDetails[0][1];
    document.getElementById("chord3-name").innerHTML=keyDetails[0][2];
    document.getElementById("chord4-name").innerHTML=keyDetails[0][3];

    // updates roman numerals on HTML
    document.getElementById("roman1").innerHTML=keyDetails[1][0];
    document.getElementById("roman2").innerHTML=keyDetails[1][1];
    document.getElementById("roman3").innerHTML=keyDetails[1][2];
    document.getElementById("roman4").innerHTML=keyDetails[1][3];

    // updates chord notes on HTML
    document.getElementById("chord1-notes").innerHTML=keyDetails[2][0][0]
    + " - " + keyDetails[2][0][1] + " - " +keyDetails[2][0][2];

    document.getElementById("chord2-notes").innerHTML=keyDetails[2][1][0]
    + " - " + keyDetails[2][1][1] + " - " +keyDetails[2][1][2];

    document.getElementById("chord3-notes").innerHTML=keyDetails[2][2][0]
    + " - " + keyDetails[2][2][1] + " - " +keyDetails[2][2][2];

    document.getElementById("chord4-notes").innerHTML=keyDetails[2][3][0]
    + " - " + keyDetails[2][3][1] + " - " +keyDetails[2][3][2];

    // updates scale name displayer
    document.getElementById("scale").innerHTML=generatedScale.scaleName;

    // updates chord progression displayer
    document.getElementById("progression").innerHTML=keyDetails[3];

    // updates scale note displayer
    document.getElementById("notes").innerHTML=generatedScale.convertToString();
    
}