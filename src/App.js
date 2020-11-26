import React, {Component} from "react";
import './App.css';
import Notes from './components/Notes/Notes'
import Modal from './components/modalNotes/Modal'
import ModalList from './components/modalList/ModalList'

class App extends Component {
    state = {
        visibleModal: false,
        noteID:'',
        notes: [
            // {
            //     id:'111',
            //     name: 'First note name (1)',
            //     list: [{id:'li1', name:'First note(1)'}, {id:'li2', name:'Second note(2)'}, {id:'li3', name:'Third note(3)'}]
            // },
            // {
            //     id:'222',
            //     name: 'Name of the second note (2)',
            //     list: [{id:'li1', name:'First note(1)'}, {id:'li2', name:'Second note(2)'}, {id:'li3', name:'Third note(3)'}]
            // },
            // {
            //     id:'333',
            //     name: 'Name of the third note (3)',
            //     list: [{id:'li1', name:'First note(1)'}, {id:'li2', name:'Second note(2)'}, {id:'li3', name:'Third note(3)'}]
            // }
        ]
    };


    /***
      Open / Close Modal Window
     */


    openNoteModal = () => {
        this.setState(()=>({visibleModal: true}))
    };

    closeNoteModal = () => {
        this.setState(() => ({visibleModal: false}));
    };

    openListModal = (i) => {
        this.setState(()=>({noteID: i}));
        this.setState(()=>({visibleListModal: true}))
    };

    closeListModal = () => {
        this.setState(() => ({visibleListModal: false}));
    };


    /***
     Add / Delete Note
     */


    addANewNote = (note) => {
        let newNotes;
        newNotes = [...this.state.notes, note];
        this.setState(()=>({notes: newNotes}))
    };

    delNote = (id) => {
        let deleteNote = this.state.notes.filter((note) => note.id !== id);
        this.setState(()=>({notes: deleteNote}))
    };


    /**
     Transport Note in List
     */


     arrayMoveElement = (arr, old_index, new_index) => {
         if (new_index >= arr.length) {
             var k = new_index - arr.length + 1;
             while (k--) {
                 arr.push(undefined);
             }
         }
         arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
         return arr;
    };

    upNoteList = (noteId, noteLiIndx) => {
        let findNote = this.state.notes.map(item => {
            if (item.id === noteId){
                item.list = this.arrayMoveElement(item.list, noteLiIndx, noteLiIndx-1)

                }
            return item
        });
        this.setState(()=>({notes: findNote}))
    };

    downNoteList = (noteId, noteLiIndx) => {
        let findNote = this.state.notes.map(item => {
            if (item.id === noteId){
                item.list = this.arrayMoveElement(item.list, noteLiIndx, noteLiIndx+1)
            }
            return item
        });
        this.setState(()=>({notes: findNote}))
    };


    /***
     Add / Delete List in Note
     */


    addNewList = (note) => {
        let noteID = this.state.noteID;
        let findNote = this.state.notes.map(item => {
            if (item.id === noteID){
                item.list.push(note)
            }
            return item
        });
        this.setState(()=>({notes: this.state.notes, findNote}))
    };

    delNoteList = (noteID, id) => {
        let findNote = this.state.notes.map(item => {
            if (item.id === noteID){
                item.list=item.list.filter((oneList,i) => id !== i)
            }
            return item
        });
        this.setState(()=>({notes: findNote}))
    };

    render(){
        return (
            <div className="App">
                <header className="App-header">
                    <div>
                        My Notes
                    </div>
                </header>
                <div className="allBtn">
                    <button className="btn" onClick={this.openNoteModal}>Add Note</button>
                    <input className="inp" type='text'
                           placeholder={'I found the modal more interesting than the input field, please click on Add Note'}
                    />
                </div>
                <Modal
                    visibleNoteModal={this.state.visibleModal}
                    closeNoteModal={this.closeNoteModal}
                    addNote={this.addANewNote}
                />
                <ModalList
                    visibleListModal={this.state.visibleListModal}
                    closeListModal={this.closeListModal}
                    addList={this.addNewList}
                />
                <Notes
                    notes={this.state.notes}
                    deleteNote={this.delNote}
                    addNoteTolist={this.openListModal}
                    deleteNoteList={this.delNoteList}
                    upNoteList={this.upNoteList}
                    downNoteList={this.downNoteList}
                />
            </div>
        );
    }
}

export default App;
