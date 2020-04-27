window.onload = function(){
    math.config({
        number: 'Fraction'
    });  
    let element =this.document.getElementById("texto");
    let texto = "|=D1/4E1/8B1/8B1/8A1/8 =B1/8E1/8B'2/4|B1/4 A1/8B1/8 d1/8B1/8A1/8G1/8|z1/2 z1/2|";
    texto+="^F1/8^D1/8_A1/8D1/8 B1/8D1/8A1/8D1/8|F1/8D1/8A1/8D1/8 d1/8A1/8F1/8D1/8|E1/8B1/8B1/8A1/8 B1/4 E1/8B1/8|B1/4 A1/8B1/8 d1/8e1/8f1/8g1/8|";
    texto+="a1/8f1/8e1/8^c1/8 d1/8B1/8A1/8F1/8|D1/8E1/8F1/8D1/8 E1/4|g1/8f1/8|e1/8B1/8 B1/4 e1/8f1/8g1/8e1/8|e1/8B1/8 B1/4 g1/8e1/8d1/8B1/8|";
    texto+="A1/4 F1/8A1/8 D1/8A1/8F1/8A1/8|A1/4 F1/8A1/8 d1/8e1/8f1/8g1/8|e1/8B1/8 B1/4 e1/8B1/8g1/8B1/8|e1/8B1/8 B1/4 d1/8e1/8f1/8g1/8|a1/8f1/8e1/8^c1/8 d1/8B1/8A1/8F1/8|D1/8E1/8F1/8D1/8 E1/4|";
    let handler = new ABCHandler("1/4",texto);
    //handler.updateNote(1,"(_D3/8");
    //console.log(handler.getScore());
    handler.addNote(10,"=A''1/1");
    handler.setTempo("3/4");
    //handler.deleteNote(10,false);
    //handler.tieNotes(55,71);
    //handler.untieNotes(55,72);
    console.log(handler.getScore());

    //|=D1/4E1/8|(=A''1/2=A''1/2)|B1/8A1/8=B1/8E1/8B'2/4|B1/4A1/8B1/8d1/8B1/8A1/8G1/8|z1/2z1/2|^F1/8^D1/8_A1/8D1/8B1/8D1/8A1/8D1/8|F1/8D1/8A1/8D1/8d1/8A1/8F1/8D1/8|E1/8B1/8B1/8A1/8B1/4E1/8B1/8|B1/4A1/8B1/8d1/8e1/8f1/8g1/8|a1/8f1/8e1/8^c1/8d1/8B1/8A1/8F1/8|D1/8E1/8F1/8D1/8E1/4g1/8f1/8|e1/8B1/8B1/4e1/8f1/8g1/8e1/8|e1/8B1/8B1/4g1/8e1/8d1/8B1/8|A1/4F1/8A1/8D1/8A1/8F1/8A1/8|A1/4F1/8A1/8d1/8e1/8f1/8g1/8|e1/8B1/8B1/4e1/8B1/8g1/8B1/8|e1/8B1/8B1/4d1/8e1/8f1/8g1/8|a1/8f1/8e1/8^c1/8d1/8B1/8A1/8F1/8|D1/8E1/8F1/8D1/8E1/4|
    
}