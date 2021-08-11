// this fxn generates a random major scale using the JS Math pkg
function generateMajScale() {
    let majScale = '';
    const majScaleList=['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
    return majScaleList[Math.floor((Math.random() * 12))];
};

// this fxn generates a random minor scale using the JS Math pkg
function generateMinScale() {
    let minScale = '';
    const minScaleList=['A', 'E', 'B', 'F#', 'C#', 'G#', 'Eb', 'Bb', 'F', 'C', 'G', 'D'];
    return minScaleList[Math.floor((Math.random() * 12))];
};

// this function gets a random binary integer and then generates a scale depending on that value
function randomScale() {
    let majMin = Math.round(Math.random());
    if (majMin === 0) {
        return generateMajScale() + ' Major'
    } else {
        return generateMinScale() + ' Minor'
    };
};

