import { getMatchingNotes, getNoteDuration, getABCPitch, getNoteTie, calculateMeasureDuration } from './RegexUtilities';
import { fraction } from 'mathjs';


class ABCHandler {
    
    constructor(tempo,ABCString) {
        this.ABCString = ABCString;
        this.tempo = eval(tempo);
    }

    updateNote(characterIndex, updatedNote){
        let scorePart1 = this.ABCString.substring(0,characterIndex);
        let scorePart2 = this.ABCString.substring(characterIndex);
        let match = getMatchingNotes(scorePart2, true);
        let notes = [new Note(updatedNote)].concat(this.tokenize(match.length,scorePart2));
        console.log(notes);
        let lastMeasure = this.getLastMeasure(scorePart1);
        console.log(lastMeasure);
        scorePart1 = scorePart1.substring(0,lastMeasure[0]+1);
        console.log(scorePart1);
        let measure = this.tokenize(0,lastMeasure[1]);
        this.fixScore(scorePart1,notes,measure);
    }

    addNote(characterIndex, note, after = true){

        let scorePart1 = this.ABCString.substring(0,characterIndex);
        let scorePart2 = this.ABCString.substring(characterIndex);
        let lastMeasure = this.getLastMeasure(scorePart1);
        scorePart1 = scorePart1.substring(0,lastMeasure[0]+1);
        let measure = this.tokenize(0,lastMeasure[1]);
        let notes = [];

        if(after){
            let match = getMatchingNotes(scorePart2, true);
            console.log(match);
            notes = [new Note(new String(match)),new Note(note)].concat(this.tokenize(match.length,scorePart2));
        }else{
            notes = [new Note(note)].concat(this.tokenize(0,scorePart2));
        }
        console.log(notes);

        this.fixScore(scorePart1,notes,measure);
    }

    deleteNote(characterIndex , fix = false){
        let scorePart1 = this.ABCString.substring(0,characterIndex);
        let scorePart2 = this.ABCString.substring(characterIndex);
        let match = getMatchingNotes(scorePart2, true);
        
        if(!fix){
            scorePart1 = scorePart1 + scorePart2.substring(match.length);
            this.ABCString = scorePart1;
        }else{
            let lastMeasure = this.getLastMeasure(scorePart1);
            let measure = this.tokenize(0,lastMeasure[1]);
            scorePart1 = scorePart1.substring(0,lastMeasure[0]+1);
            let notes =  this.tokenize(match.length,scorePart2);
            this.fixScore(scorePart1,notes,measure);
        }
        
    }

    setTempo (tempo){
        this.tempo = eval(tempo);
        console.log("tempo: "+this.tempo);
        let notes = this.tokenize(1);
        this.fixScore("|",notes,[]);
    }

    tieNotes(characterIndex1, characterIndex2){
        
        let scorePart1 = this.ABCString.substring(0,characterIndex1)+"(";
        let scorePart2 = this.ABCString.substring(characterIndex2);
        let match = getMatchingNotes(scorePart2, true);
        scorePart2 = this.ABCString.substring(characterIndex1, characterIndex2 + match.length)+")";
        let scorePart3 = this.ABCString.substring(characterIndex2 + match.length);
        this.ABCString = scorePart1+scorePart2+scorePart3;
    }

    untieNotes(characterIndex1, characterIndex2){
        
        let scorePart1 = this.ABCString.substring(0,characterIndex1);
        let scorePart2 = this.ABCString.substring(characterIndex2);
        let match = getMatchingNotes(scorePart2, true);
        scorePart2 = this.ABCString.substring(characterIndex1+1, characterIndex2 + match.length);
        let scorePart3 = this.ABCString.substring(characterIndex2 + match.length);
        this.ABCString = scorePart1+scorePart2+scorePart3;
    }

    fixScore(scorePart1, notes, lastMeasure){
        console.log("tempo:  "+this.tempo);
        let measure = lastMeasure;
        let i = 0;
        while(i < notes.length){
            let duration  = this.getMeasureDuration(measure);
            while(duration < this.tempo && i < notes.length){
                if(duration  + eval(notes[i].duration) <= this.tempo){
                    measure.push(notes[i]);

                }else if(this.tempo-duration > 0 && duration  + eval(notes[i].duration) > this.tempo){
                    console.log("tempo:  "+this.tempo);
                    let diff = this.tempo - duration;
                    let noteDif = eval(notes[i].duration +"-"+diff);
                    let note_aux = new Note(`(${notes[i].note}${notes[i].duration}`);
                    if(notes[i].tie === ")"){
                        note_aux.tie = "";
                        notes[i].tie = ")";
                    }else if(notes[i].tie === "("){
                        notes[i].tie = "";
                        note_aux.tie = "(";
                    }else{
                        note_aux.tie = "(";
                        notes[i].tie = ")";
                    }
                    console.log(note_aux);
                    let durfrac1 = fraction(diff);
                    note_aux.duration = `${durfrac1.n}/${durfrac1.d}`;

                    durfrac1 = fraction(noteDif);
                    notes[i].duration = `${durfrac1.n}/${durfrac1.d}`;
                    
                    measure.push(note_aux);
                    i--;
                }
                i++;
                duration = this.getMeasureDuration(measure);
            }
            console.log(measure);
            let aux ="";
            measure.forEach(element => {
                aux += element.getABCNote();
            });
            console.log(aux);
            scorePart1 += aux +"|";
            measure = [];
            
        }
        this.ABCString = scorePart1;
    }

    
    tokenize(startIndex, abcstring = -1){

        let ABCString_aux = ""
        if(abcstring !== -1){
            ABCString_aux = abcstring.substring(startIndex);
        }else{
            ABCString_aux = this.ABCString.substring(startIndex);
        }
        console.log(ABCString_aux);
        return getMatchingNotes(ABCString_aux);
    }

    getMeasureDuration(measure){
        let expression = "0";
        
        measure.forEach(element => {
            expression+= "+"+element.duration;
        });

        console.log(expression);
        return eval(expression);
    }

    getLastMeasure(abcstring){
        let mstartIndex = abcstring.length-1;
        while(abcstring[mstartIndex]!== '|'){
            mstartIndex -=1;
        }
        return [mstartIndex, abcstring.substring(mstartIndex)];
    }

    getScore(){
        return this.ABCString;    
    }
}

class Note {
    constructor(note){ 
        this.note = getABCPitch(note);
        this.duration = getNoteDuration(note);
        this.tie = getNoteTie(note);
    }

    getABCNote(){
        if(this.tie === "("){
            return this.tie+this.note+this.duration;
        }else if(this.tie === ")"){
            return this.note+this.duration+this.tie;
        }else{
            return this.note+this.duration;
        }
    }
}

export { ABCHandler, Note};