import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import axios from "axios";
import { backendUrl } from "../../config";
import { useState } from 'react';

const DroneModal = ({ open, handleClose, handleAddedDrone }) => {
    const [drone, setDrone] = useState({});
    const [status, setStatus] = useState('idle'); // default value

    const handleChange = (e) => {
        setDrone({ ...drone, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(drone);
            await axios.post(`${backendUrl}/drone/register`, drone);

            //update new drone on homepage
            handleAddedDrone();
            // Close the modal
            handleClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Register Drone</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="droneIdentifier"
                        label="Drone Identifier"
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        margin="dense"
                        name="model"
                        label="Model"
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={handleChange}
                        required
                    />

                    <FormControl fullWidth variant="outlined" margin="dense">
                        <InputLabel>Status</InputLabel>
                        <Select
                            name="status"
                            label="Status"
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="idle">idle</MenuItem>
                            <MenuItem value="flying">flying</MenuItem>
                            <MenuItem value="offline">offline</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>


                <DialogActions style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Button type="submit" >Add</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default DroneModal;
