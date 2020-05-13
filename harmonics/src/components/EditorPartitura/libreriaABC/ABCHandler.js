import { getMatchingNotes, getNoteDuration, getABCPitch} from './RegexUtilities';
import { fraction } from 'mathjs';


class ABCHandler {
    
    constructor(tempo,ABCString) {
        this.ABCString = ABCString;
        // eslint-disable-next-line
        this.tempo = eval(tempo);
    }

    updateNote(characterIndex, updatedNote){
        let scorePart1 = this.ABCString.substring(0,characterIndex);
        let scorePart2 = this.ABCString.substring(characterIndex);
        let match = getMatchingNotes(scorePart2, true);
        let notes = [new Note(updatedNote)].concat(this.tokenize(match.length,scorePart2));
        //console.log(notes);
        let lastMeasure = this.getLastMeasure(scorePart1);
        //console.log(lastMeasure);
        scorePart1 = scorePart1.substring(0,lastMeasure[0]+1);
        //console.log(scorePart1);
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
            // eslint-disable-next-line
            let match = getMatchingNotes(scorePart2, true);
            //console.log(match);
            // eslint-disable-next-line
            notes = [new Note(new String(match)),new Note(note)].concat(this.tokenize(match.length,scorePart2));
        }else{
            notes = [new Note(note)].concat(this.tokenize(0,scorePart2));
        }
        //console.log(notes);

        this.fixScore(scorePart1,notes,measure);
    }

    deleteNote(characterIndex , fix = false){
        if (this.ABCString.length < 3){
            alert("No puede borrar la ultima nota de la partitura");
            return ;
        }
        let scorePart1 = this.ABCString.substring(0,characterIndex);
        let scorePart2 = this.ABCString.substring(characterIndex);
        let match = getMatchingNotes(scorePart2, true);

        if(!fix){
            let exists = this.existNoteAhead(match.length,scorePart2);
            let size = match.length+1;
            if(exists){
                size -= 1;
            }
            scorePart1 = scorePart1 + scorePart2.substring(size);
            this.ABCString = scorePart1;
        }else{
            let lastMeasure = this.getLastMeasure(scorePart1);
            let measure = this.tokenize(0,lastMeasure[1]);
            scorePart1 = scorePart1.substring(0,lastMeasure[0]+1);
            let notes =  this.tokenize(match.length,scorePart2);
            this.fixScore(scorePart1,notes,measure);
        }
        this.ABCString.replace("||","|");
    }

    setTempo (tempo){
        // eslint-disable-next-line
        this.tempo = eval(tempo);
        //console.log("tempo: "+this.tempo);
        let notes = this.tokenize(1);
        this.fixScore("|",notes,[]);
    }

    tieNotes(characterIndex1, characterIndex2){
        let x = this.ABCString.substring(characterIndex1, characterIndex2); 
        if(x.includes("(") || x.includes(")")){
            alert("No puedes ligar dos notas cuando existen ligaduras intermedias entre ellas");
            return ;
        }else{
            let scorePart1 = this.ABCString.substring(0,characterIndex1)+"(";
            let scorePart2 = this.ABCString.substring(characterIndex2);
            let match = getMatchingNotes(scorePart2, true);
            scorePart2 = this.ABCString.substring(characterIndex1, characterIndex2 + match.length)+")";
            let scorePart3 = this.ABCString.substring(characterIndex2 + match.length);
            this.ABCString = scorePart1+scorePart2+scorePart3;
        }
    }

    untieNotes(characterIndex1, characterIndex2){
        if(this.ABCString[characterIndex1] === "("){
            let scorePart1 = this.ABCString.substring(0,characterIndex1);
            let scorePart2 = this.ABCString.substring(characterIndex2);
            let match = getMatchingNotes(scorePart2, true);
            scorePart2 = this.ABCString.substring(characterIndex1+1, characterIndex2 + match.length-1);
            let scorePart3 = this.ABCString.substring(characterIndex2 + match.length);
            this.ABCString = scorePart1+scorePart2+scorePart3;
        }else{
            alert("No puede desligar notas sin ligaduras")
            
        }
    }

    fixScore(scorePart1, notes, lastMeasure){
        //console.log("tempo:  "+this.tempo);
        let measure = lastMeasure;
        let i = 0;
        let j = 1;
        while(i < notes.length){
            let duration  = this.getMeasureDuration(measure);
            while(duration < this.tempo && i < notes.length){
                // eslint-disable-next-line
                if(duration  + eval(notes[i].duration) <= this.tempo){
                    measure.push(notes[i]);
                // eslint-disable-next-line
                }else if(this.tempo-duration > 0 && duration  + eval(notes[i].duration) > this.tempo){
                    //console.log("tempo:  "+this.tempo);
                    let diff = this.tempo - duration;
                    // eslint-disable-next-line
                    let noteDif = eval(notes[i].duration +"-"+diff);
                    let note_aux = new Note(`${notes[i].note}${notes[i].duration}`);
                    if(notes[i].rightTie === ")"){
                        note_aux.leftTie = "(";
                        note_aux.rightTie = ")";
                        notes[i].rightTie = ")";
                    }else{
                        note_aux.leftTie = "(";
                        notes[i].rightTie = ")";
                    }
                    //console.log(note_aux);
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
            let aux ="";
            measure.forEach(element => {
                aux += element.getABCNote();
            });
            scorePart1 += aux +"|";
            if(j%5 === 0){
                scorePart1 += "\n";
            }
            measure = [];
            j++;     
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
        //console.log(ABCString_aux);
        return getMatchingNotes(ABCString_aux);
    }

    getMeasureDuration(measure){
        let expression = "0";
        
        measure.forEach(element => {
            expression+= "+"+element.duration;
        });

        //console.log(expression);
        // eslint-disable-next-line
        return eval(expression);
    }

    getLastMeasure(abcstring){
        let mstartIndex = abcstring.length-1;
        while(abcstring[mstartIndex]!== '|'){
            mstartIndex -=1;
        }
        return [mstartIndex, abcstring.substring(mstartIndex)];
    }

    existNoteAhead(startIndex , abcstring){
        let cont = 0;
        while(abcstring[startIndex]!== '|'){
            if(abcstring[startIndex] !== ' '){
                cont += 1;     
            }
            startIndex +=1;
        }
        return cont > 3;
    }

    getScore(){
        return this.ABCString;    
    }
}


class Note {
    constructor(note){ 
        this.note = getABCPitch(note);
        this.duration = getNoteDuration(note);
        this.leftTie = note.includes("(") ? "(" : "";
        this.rightTie = note.includes(")") ? ")" : "";
    }

    getABCNote(){
        return this.leftTie+this.note+this.duration+this.rightTie;
    }
}

export { ABCHandler, Note};