import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Typography from "@mui/material/Typography";
import PrimarySearchAppBar from "./Header";

import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import { useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
};

 

const PdfCard = ({onDelete, onDownload}) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
         
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={require("E:/_Study_Folder_/Files/_DEV/farcart/frontend/src/assets/contemplative-reptile.jpg")}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Lizard
                    </Typography>

                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={onDelete}>
                    Delete
                </Button>
                <Button size="small" color="primary" onClick={onDownload}>
                    Download
                </Button>
            </CardActions>
        </Card>
    );
};
export default PdfCard;
