import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import './styles.css';

const Modal = function (props) {
    const [name, setName] = useState('');
    const [isShowHintText, setIsShowHintText] = useState(false);

        const onChangeNoteName = (term) => {
            setIsShowHintText(false);
            setName(term.target.value)
    };

        const addNewNote = () => {
        if(name !== '') {
            props.addNote({id: uuidv4(), name, list: []});
            setName('');
            setIsShowHintText(false);
            props.closeNoteModal()
        }
        else {
            setIsShowHintText(true);
        }
    };

        const closeModal = () => {
            setName('');
            setIsShowHintText(false);
            props.closeNoteModal()
    };

    return(
            <React.Fragment>
                <Dialog
                    fullWidth
                    open={props.visibleNoteModal}
                    onClose={props.closeNoteModal}
                >
                    <DialogTitle className='dialogText'>Add new Note</DialogTitle>
                    <DialogContentText className='dialogText'>
                        To add a note, you need to fill in the following field.
                    </DialogContentText>
                    <DialogContent>
                        <form className='notesForm'>
                            <FormControl className='notesFormControl'>
                                <input className='addNotesName' type='text'  value={name}
                                       onChange={onChangeNoteName} placeholder={'Name Note'}/>
                            </FormControl>
                        </form>
                    </DialogContent>
                    {isShowHintText? (
                        <div className='containerText'>
                            <p className='textNotification'>Name field must be filled!</p>
                        </div>
                    ) : null}
                    <DialogActions>
                        <Button onClick={closeModal} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={addNewNote} color="primary">
                            Save new Note
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
};

export default Modal;
