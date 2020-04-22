import Cuadrada from '../../recursos/Notas-iconos/CuadradaIcon.png';
import Redonda from '../../recursos/Notas-iconos/RedondaIcon.png';
import Blanca from '../../recursos/Notas-iconos/BlancaIcon.png';
import Negra from '../../recursos/Notas-iconos/NegraIcon.png';
import Corceha from '../../recursos/Notas-iconos/CorcheaIcon.png';
import SemiCorchea from '../../recursos/Notas-iconos/SemicorcheaIcon.png';
import Fusa from '../../recursos/Notas-iconos/FusaIcon.png';


const Modo = [
    //Ionian
    {value: 'C#', name: 'C# Mayor'}, {value: 'F#', name: 'F# Mayor'}, {value: 'B', name: 'B Mayor'}, 
    {value: 'E', name: 'E Mayor'}, {value: 'A', name: 'A Mayor'}, {value: 'D', name: 'D Mayor'},
    {value: 'G', name: 'G Mayor'}, {value: 'C', name: 'C Mayor'}, {value: 'F', name: 'F Mayor'}, 
    {value: 'Bb', name: 'Bb Mayor'}, {value: 'Eb', name: 'Eb Mayor'}, {value: 'Ab', name: 'Ab Mayor'}, 
    {value: 'Db', name: 'Db Mayor'}, {value: 'Gb', name: 'Gb Mayor'}, {value: 'Cb', name: 'Cb Mayor'},
    //Aeolian
    {value: 'A#m', name: 'A# Menor'}, {value: 'D#m', name: 'D# Menor'}, {value: 'G#m', name: 'G# Menor'}, 
    {value: 'C#m', name: 'C# Menor'}, {value: 'F#m', name: 'F# Menor'}, {value: 'Bm', name: 'B Menor'},
    {value: 'Em', name: 'E Menor'}, {value: 'Am', name: 'A Menor'}, {value: 'Dm', name: 'D Menor'}, 
    {value: 'Gm', name: 'G Menor'}, {value: 'Cm', name: 'C Menor'}, {value: 'Fm', name: 'F Menor'}, 
    {value: 'Bbm', name: 'Bb Menor'}, {value: 'Ebm', name: 'Eb Menor'}, {value: 'Abm', name: 'Ab Menor'},
    //Mixolydian
    {value: 'G#Mix', name: 'G# Mixolidio'}, {value: 'C#Mix', name: 'C# Mixolidio'}, {value: 'F#Mix', name: 'F# Mixolidio'}, 
    {value: 'BMix', name: 'B Mixolidio'}, {value: 'EMix', name: 'E Mixolidio'}, {value: 'AMix', name: 'A Mixolidio'},
    {value: 'DMix', name: 'D Mixolidio'}, {value: 'GMix', name: 'G Mixolidio'}, {value: 'CMix', name: 'C Mixolidio'}, 
    {value: 'FMix', name: 'F Mixolidio'}, {value: 'BbMix', name: 'Bb Mixolidio'}, {value: 'EbMix', name: 'Eb Mixolidio'}, 
    {value: 'AbMix', name: 'Ab Mixolidio'}, {value: 'DbMix', name: 'Db Mixolidio'}, {value: 'GbMix', name: 'Gb Mixolidio'},
    //Dorian
    {value: 'D#Dor', name: 'D# Dórico'}, {value: 'G#Dor', name: 'G# Dórico'}, {value: 'C#Dor', name: 'C# Dórico'}, 
    {value: 'F#Dor', name: 'F# Dórico'}, {value: 'BDor', name: 'B Dórico'}, {value: 'EDor', name: 'E Dórico'},
    {value: 'ADor', name: 'A Dórico'}, {value: 'DDor', name: 'D Dórico'}, {value: 'GDor', name: 'G Dórico'}, 
    {value: 'CDor', name: 'C Dórico'}, {value: 'FDor', name: 'F Dórico'}, {value: 'BbDor', name: 'Bb Dórico'}, 
    {value: 'EbDor', name: 'Eb Dórico'}, {value: 'AbDor', name: 'Ab Dórico'}, {value: 'DbDor', name: 'Db Dórico'},
    //Phrygian
    {value: 'E#Phr', name: 'E# Frigio'}, {value: 'A#Phr', name: 'A# Frigio'}, {value: 'D#Phr', name: 'D# Frigio'}, 
    {value: 'G#Phr', name: 'G# Frigio'}, {value: 'C#Phr', name: 'C# Frigio'}, {value: 'F#Phr', name: 'F# Frigio'},
    {value: 'BPhr', name: 'B Frigio'}, {value: 'EPhr', name: 'E Frigio'}, {value: 'APhr', name: 'A Frigio'}, 
    {value: 'DPhr', name: 'D Frigio'}, {value: 'GPhr', name: 'G Frigio'}, {value: 'CPhr', name: 'C Frigio'}, 
    {value: 'FPhr', name: 'F Frigio'}, {value: 'BbPhr', name: 'Bb Frigio'}, {value: 'EbPhr', name: 'Eb Frigio'},
    //Lydian
    {value: 'F#Lyd', name: 'F# Lidio'}, {value: 'BLyd', name: 'B Lidio'}, {value: 'ELyd', name: 'E Lidio'}, 
    {value: 'ALyd', name: 'A Lidio'}, {value: 'DLyd', name: 'D Lidio'}, {value: 'GLyd', name: 'G Lidio'},
    {value: 'CLyd', name: 'C Lidio'}, {value: 'FLyd', name: 'F Lidio'}, {value: 'BbLyd', name: 'Bb Lidio'}, 
    {value: 'EbLyd', name: 'Eb Lidio'}, {value: 'AbLyd', name: 'Ab Lidio'}, {value: 'DbLyd', name: 'Db Lidio'}, 
    {value: 'GbLyd', name: 'Gb Lidio'}, {value: 'CbLyd', name: 'Cb Lidio'}, {value: 'FbLyd', name: 'Fb Lidio'},
    //Locrian
    {value: 'B#Loc', name: 'B# Locrio'}, {value: 'E#Loc', name: 'E# Locrio'}, {value: 'A#Loc', name: 'A# Locrio'}, 
    {value: 'D#Loc', name: 'D# Locrio'}, {value: 'G#Loc', name: 'G# Locrio'}, {value: 'C#Loc', name: 'C# Locrio'},
    {value: 'F#Loc', name: 'F# Locrio'}, {value: 'BLoc', name: 'B Locrio'}, {value: 'ELoc', name: 'E Locrio'}, 
    {value: 'ALoc', name: 'A Locrio'}, {value: 'DLoc', name: 'D Locrio'}, {value: 'GLoc', name: 'G Locrio'}, 
    {value: 'CLoc', name: 'C Locrio'}, {value: 'FLoc', name: 'F Locrio'}, {value: 'BbLoc', name: 'Bb Locrio'}
]


const Claves = [
    //Ionian
    {value: 'treble', name: 'Clave de Sol'}, {value: 'bass', name: 'Clave de Fa'}, {value: 'bass3', name: 'Clave de Fa en tercera'}, 
    {value: 'tenor', name: 'Clave de Do en cuarta'}, {value: 'alto', name: 'Clave de Do en tercera'}, {value: 'alto2', name: 'Clave de Do en segunda'},
    {value: 'alto1', name: 'Clave de Do en primera'}
]

const Notas = [
    //Ionian
    {value: 'C', name: 'Do'}, {value: 'D', name: 'Re'}, {value: 'E', name: 'Mi'}, 
    {value: 'F', name: 'Fa'}, {value: 'G', name: 'Sol'}, {value: 'A', name: 'La'},
    {value: 'B', name: 'Si'}
]


const Alteraciones = [
    //Ionian
    {value: '_', name: 'Bemol'}, {value: '__', name: 'Doble bemol'}, {value: '^', name: 'Sostenido'}, 
    {value: '^^', name: 'Doble Sostenido'}, {value: '=', name: 'Becuadro'}
]

const Duraciones = [
    {
      key: 'Cuadrada',
      text: 'Cuadrada',
      value: '8',
      image: { avatar: true, src: Cuadrada },
    },
    {
      key: 'Redonda',
      text: 'Redonda',
      value: '4',
      image: { avatar: true, src: Redonda },
    },
    {
      key: 'Blanca',
      text: 'Blanca',
      value: '2',
      image: { avatar: true, src: Blanca },
    },
    {
      key: 'Negra',
      text: 'Negra',
      value: '',
      image: { avatar: true, src: Negra },
    },
    {
      key: 'Corceha',
      text: 'Corceha',
      value: '/2',
      image: { avatar: true, src: Corceha },
    },
    {
      key: 'SemiCorchea',
      text: 'SemiCorchea',
      value: '/4',
      image: { avatar: true, src: SemiCorchea },
    },
    {
      key: 'Fusa',
      text: 'Fusa',
      value: '/8',
      image: { avatar: true, src: Fusa },
      }
  ]
export default { Modo, Claves, Notas, Alteraciones, Duraciones} ;