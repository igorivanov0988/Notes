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

const ModalList = function (props) {
    const [name, setName] = useState('');
    const [isShowHintText, setIsShowHintText] = useState(false);

    const onChangeListName = (term) => {
        setIsShowHintText(false);
        setName(term.target.value)
    };

     const addNewList = () => {
        if(name !== ''){
           props.addList({id: uuidv4(), name});
           setName('');
           setIsShowHintText(false);
           props.closeListModal()
        }
        else {
            setIsShowHintText(true);
        }
    };


    const closeModalList = () => {
        setName('');
        setIsShowHintText(false);
        props.closeListModal()
    };
            return(
            <React.Fragment>
                <Dialog
                    fullWidth
                    open={props.visibleListModal}
                    onClose={props.closeListModal}
                >
                    <DialogTitle className='dialogTextList'>Add a new note to the list</DialogTitle>
                    <DialogContentText className='dialogTextList'>
                        To add a new note to the list, you need to fill in the following field.
                    </DialogContentText>
                    <DialogContent>
                        <form className='listForm'>
                            <FormControl className='listFormControl'>
                                <input className='addListName' type='text'  value={name}
                                       onChange={onChangeListName} placeholder={'Name Note'}/>
                            </FormControl>
                        </form>
                    </DialogContent>
                    {isShowHintText? (
                        <div className='containerText'>
                            <p className='textNotification'>Name field must be filled!</p>
                        </div>
                    ) : null}
                    <DialogActions>
                        <Button onClick={closeModalList} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={addNewList} color="primary">
                            Save new note to list
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
};

export default ModalList;
