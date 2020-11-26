import React, {Component} from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import './styles.css';


class noteModal extends Component {
    state={
        name:'',
    };

    onChangeNoteName = (term) => {
        this.setState({name: term.target.value})
    };

    addNewNote = () => {
        if(this.state.name !== ''){
            this.props.addNote({id: uuidv4(), name: this.state.name, list: []});
            this.setState({name:''});
            this.props.closeNoteModal()
        }
        else {
            alert('Name field must be filled!')
        }
    };

    closeModal = () => {
        this.setState({name:''});
        this.props.closeNoteModal()
    };

    render(){

        const {visibleNoteModal, closeNoteModal} = this.props;
        const {name} = this.state;

        return(
            <React.Fragment>
                <Dialog
                    fullWidth
                    open={visibleNoteModal}
                    onClose={closeNoteModal}
                >
                    <DialogTitle className='dialogText'>Add new Note</DialogTitle>
                    <DialogContentText className='dialogText'>
                        To add a note, you need to fill in the following field.
                    </DialogContentText>
                    <DialogContent>
                        <form className='notesForm'>
                            <FormControl className='notesFormControl'>
                                <input className='addNotesName' type='text'  value={name}
                                       onChange={this.onChangeNoteName} placeholder={'Name Note'}/>
                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeModal} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.addNewNote} color="primary">
                            Save new Note
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default noteModal