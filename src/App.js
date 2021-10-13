import React, {useState} from "react";
import './App.css';
import Notes from './components/Notes/Notes'
import Modal from './components/modalNotes/Modal'
import ModalList from './components/modalList/ModalList'

function App() {

    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleListModal, setVisibleListModal] = useState(false);
    const [noteID, setNoteID] = useState('');
    const [notes, setNotes] = useState([]);

    /***
      Open / Close Modal Window
     */

    const  openNoteModal = () => {
        setVisibleModal(true)
    };

    const closeNoteModal = () => {
        setVisibleModal(false)
    };

    const openListModal = (i) => {
        setNoteID(i);
        setVisibleListModal(true)
    };

    const closeListModal = () => {
        setVisibleListModal(false)
    };

    /***
     Add / Delete Note
     */

    const addANewNote = (note) => {
        let newNotes;
        newNotes = [...notes, note];
        setNotes(newNotes);
    };

    const delNote = (id) => {
        let deleteNote = notes.filter((note) => note.id !== id);
        setNotes(deleteNote);
    };

    /**
     Transport Note in List
     */

     const arrayMoveElement = (arr, old_index, new_index) => {
         if (new_index >= arr.length) {
             var k = new_index - arr.length + 1;
             while (k--) {
                 arr.push(undefined);
             }
         }
         arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
         return arr;
    };

    const upNoteList = (noteId, noteLiIndx) => {
        let findNote = notes.map(item => {
            if (item.id === noteId){
                item.list = arrayMoveElement(item.list, noteLiIndx, noteLiIndx-1)
                }
            return item
        });
        setNotes(findNote);
    };

    const downNoteList = (noteId, noteLiIndx) => {
        let findNote = notes.map(item => {
            if (item.id === noteId){
                item.list = arrayMoveElement(item.list, noteLiIndx, noteLiIndx+1)
            }
            return item
        });
        setNotes(findNote);
    };

    /***
     Add / Delete List in Note
     */


    const addNewList = (note) => {
        let findNote = notes.map(item => {
            if (item.id === noteID){
                item.list.push(note)
            }
            return item
        });
        setNotes(findNote);
    };

    const delNoteList = (noteID, id) => {
        let findNote = notes.map(item => {
            if (item.id === noteID){
                item.list=item.list.filter((oneList,i) => id !== i)
            }
            return item
        });
        setNotes(findNote);
    };

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    My Notes
                </div>
            </header>
            <div className="allBtn">
                <button className="btn" onClick={openNoteModal}>Add Note</button>
            </div>
            <Modal
                visibleNoteModal={visibleModal}
                closeNoteModal={closeNoteModal}
                addNote={addANewNote}
            />
            <ModalList
                visibleListModal={visibleListModal}
                closeListModal={closeListModal}
                addList={addNewList}
            />
            <Notes
                notes={notes}
                deleteNote={delNote}
                addNoteTolist={openListModal}
                deleteNoteList={delNoteList}
                upNoteList={upNoteList}
                downNoteList={downNoteList}
            />
        </div>
    )
}

export default App;
