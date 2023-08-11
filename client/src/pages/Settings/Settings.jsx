import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import Navbar from "../../components/navbar/Navbar";
import LeftBar from "../Homepage/LeftBar";
import Footer from "../../components/footer/Footer";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from "../../config";

import './settings.scss'

const Settings = () => {
    const [showKey, setShowKey] = useState(false);
    const [publicKey, setPublicKey] = useState('Fetching public key...');

    //show public key
    const handleToggleKeyVisibility = () => {
        setShowKey(!showKey);
    };


    const [openDialog, setOpenDialog] = useState(false);

    const handleRegenerateKey = () => {
        setOpenDialog(true);
    };

    //regenerate keys with POST request
    const handleConfirmRegeneration = async () => {
        try {
            const res = await axios.post(`${backendUrl}/keys/regenerate`);
            // console.log(res.data);
            setPublicKey(res.data.publicKey);

        } catch (error) {
            console.error('Error regenerating keys:', error);
        }


        setOpenDialog(false);
    };

    // get public key from server
    useEffect(() => {
        const getPublicKey = async () => {
            try {
                const res = await axios.get(`${backendUrl}/keys/publicKey`);
                // console.log(res.data)
                setPublicKey(res.data.publicKey);
            } catch (error) {
                console.error("Failed to fetch the public key:", error);
            }
        };

        getPublicKey();
    }, []);

    return (
        <div>
            <Navbar />
            <div style={{ display: "flex" }}>
                <LeftBar />
                <div style={{ flex: 6 }}>
                    <div className='settings'>
                        <div className="top">
                            <h2>Key Management</h2>
                        </div>

                        <div className='key'>
                            <TextField style={{ width: '400px' }}
                                id='outlined-adornment-password'
                                type={showKey ? 'text' : 'password'}
                                label='Public Key'
                                value={publicKey}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle key visibility"
                                                onClick={handleToggleKeyVisibility}
                                            >
                                                {showKey ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AutorenewIcon />}
                                onClick={handleRegenerateKey}
                                style={{ marginLeft: 15, marginTop: 5 }}
                            >
                                Regenerate
                            </Button>
                        </div>

                        {/* This is the Dialog component for confirmation */}
                        <Dialog
                            open={openDialog}
                            onClose={() => setOpenDialog(false)}
                        >
                            <DialogTitle>Regenerate Public Key?</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Regenerating the public key will replace your current key pair and shared secret for encryption & decryption and may affect any ongoing drone operations. Are you sure you want to proceed?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <Button onClick={handleConfirmRegeneration} color="primary">
                                    Confirm
                                </Button>

                                <Button onClick={() => setOpenDialog(false)} color="primary">
                                    Cancel
                                </Button>
                            </DialogActions>

                        </Dialog>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Settings;
