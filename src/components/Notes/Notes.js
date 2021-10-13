import React from 'react'
import './styles.css';
import Collapsible from 'react-collapsible';
import {FaArrowAltCircleUp, FaArrowAltCircleDown} from 'react-icons/fa'

const  NotesList = function (props) {

    const showBntArrowTop = (indexTop) => {
        if (indexTop >0){
            return true
        }
    };

    const showBntArrowBottom = (indexDown, note) => {
        if (indexDown !== note.length-1){
            return true
        }
    };

    return (
        <div>
            {
                props.notes.slice().map((note, index) => (
                    <Collapsible trigger={note.name} key={note.id} className='row'>
                        <button className="btnRow" onClick={()=> props.addNoteTolist(note.id)}>
                            Add note to list
                        </button>
                        <button className="btnRow" onClick={()=> props.deleteNote(note.id)}>
                            Delete {note.name}
                        </button>
                        {
                            note.list.slice().map((oneList, index)=>(
                                <p key={oneList.id} className='rowP'>
                                    {oneList.name}
                                    <div className='btnArrowNote'>
                                        {
                                            showBntArrowTop(index) ?
                                                <FaArrowAltCircleUp title={'Move note up'}
                                                                    onClick={() => props.upNoteList(note.id, index)}/> : null
                                        }
                                        <button className="btnNote" onClick={()=> props.deleteNoteList(note.id, index)}>Delete Note</button>
                                        {
                                            showBntArrowBottom(index, note.list) ?
                                                <FaArrowAltCircleDown title={'Move note down'}
                                                                      onClick={()=> props.downNoteList(note.id, index)}/> : <p className='voidArrow'></p>
                                        }
                                    </div>
                                </p>
                            ))
                        }
                    </Collapsible>
                ))
            }
        </div>
    )
};

export default NotesList;
