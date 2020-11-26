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


class listModal extends Component {
    state={
        name:'',
    };

    onChangeListName = (term) => {
        this.setState({name: term.target.value})
    };

    addNewList = () => {
        if(this.state.name !== ''){
            this.props.addList({id: uuidv4(), name: this.state.name});
            this.setState({name:''});
            this.props.closeListModal()
        }
        else {
            alert('Name field must be filled!')
        }
    };

    closeModalList = () => {
        this.setState({name:''});
        this.props.closeListModal()
    };

    render(){

        const {visibleListModal, closeListModal} = this.props;
        const {name} = this.state;

        return(
            <React.Fragment>
                <Dialog
                    fullWidth
                    open={visibleListModal}
                    onClose={closeListModal}
                >
                    <DialogTitle className='dialogTextList'>Add a new note to the list</DialogTitle>
                    <DialogContentText className='dialogTextList'>
                        To add a new note to the list, you need to fill in the following field.
                    </DialogContentText>
                    <DialogContent>
                        <form className='listForm'>
                            <FormControl className='listFormControl'>
                                <input className='addListName' type='text'  value={name}
                                       onChange={this.onChangeListName} placeholder={'Name Note'}/>
                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeModalList} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.addNewList} color="primary">
                            Save new note to list
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default listModal