import {Note} from './ABCHandler';

let regex = "(=|_|\\^|\\()*[A-Ga-gz](,+|'+)?([0-9]*/?[0-9]+)?(\\))?";
let regexp = RegExp(regex,'g');
let uniqueregexp = RegExp(regex,'i');
let numregex = /([0-9]+\/[0-9]+)/gi;
let numregexp = RegExp(numregex,'gi');
let charregex = "(=|_|\\^)*[A-Ga-gz](,+|'+)?";
let charregexp = RegExp(charregex,'i');
let tieregex = /(\(|\)){1}/; 


function getMatchingNotes(string, onlyfirst = false){
    
    if(onlyfirst){
        
        return uniqueregexp.exec(string)[0];
    }
    let notes = [];
    let match = "";
    while ((match = regexp.exec(string)) !== null) {
        notes.push(new Note(match[0]));
    }
    return notes;
}

function getNoteDuration(string){
    
    return string.match(numregex)[0];
}

function getABCPitch(string){
    
    return string.match(charregex)[0];
}

function getNoteTie(string){
    let match = string.match(tieregex);
    if(match !== null){
        return match[0];
    }
    return "";
}

function calculateMeasureDuration(measure){
    
    let expresion = "0";
    let match = "";
    while ((match = numregexp.exec(measure)) !== null) {
        expresion += "+"+match[0];
    }
    
    return eval(expresion);
}

export {getMatchingNotes, getNoteDuration, getABCPitch, getNoteTie, calculateMeasureDuration};