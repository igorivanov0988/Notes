import React, { Component } from 'react'
import './styles.css';
import Collapsible from 'react-collapsible';
import {FaArrowAltCircleUp, FaArrowAltCircleDown} from 'react-icons/fa'

class NotesList extends Component {

    showBntArrowTop = (indexTop) => {
        if (indexTop >0){
            return true
        }
    };

    showBntArrowBottom = (indexDown, note) => {
        if (indexDown !== note.length-1){
            return true
        }
    };

    render() {
        const {notes} = this.props;
        return (
            <div>
                {
                    notes.slice().map((note, index) => (
                        <Collapsible trigger={note.name} key={note.id} className='row'>
                            <button className="btnRow" onClick={()=>this.props.addNoteTolist(note.id)}>
                                Add note to list
                            </button>
                            <button className="btnRow" onClick={()=>this.props.deleteNote(note.id)}>
                                Delete {note.name}
                            </button>
                            {
                                note.list.slice().map((oneList, index)=>(
                                    <p key={oneList.id} className='rowP'>
                                        {oneList.name}
                                        <div className='btnArrowNote'>
                                            {
                                                this.showBntArrowTop(index) ?
                                                    <FaArrowAltCircleUp title={'Move note up'}
                                                                        onClick={() => this.props.upNoteList(note.id, index)}/> : null
                                            }
                                        <button className="btnNote" onClick={()=>this.props.deleteNoteList(note.id, index)}>Delete Note</button>
                                            {
                                                this.showBntArrowBottom(index, note.list) ?
                                                    <FaArrowAltCircleDown title={'Move note down'}
                                                                          onClick={()=>this.props.downNoteList(note.id, index)}/> : <p className='voidArrow'></p>
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
    }
}

export default NotesList