import PrimarySearchAppBar from "./Header";
import PdfCard from "./PdfCard";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import API_ENDPOINTS from "../../assets/api";
import { FormLabel, FormControl } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const UploadModal = ({onUpload}) => {
    const [open, setOpen] = useState(false);
    const [allUserData, setAllUserData] = useState([]);
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const handleOpen = async () => {

        setOpen(true);

    };

    const handleClose = () => setOpen(false);
    const [file, setFile] = useState();
    const handleFileUpload = async () => {
        console.log(currentUser)
        const formData = new FormData();
        formData.append("file", file);
        formData.append("senderId", currentUser.id);
        await axios
            .post(API_ENDPOINTS.upload, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                // handle the response
                if (response.status == 200) {
                    handleClose();
                    onUpload(); 
                    toast("File Uploaded Successfully");
                }
            })
            .catch((error) => {
                // handle errors
                toast.warn("Unable to upload file", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                console.log(error);
            });
    };
    return (
        <div>
            <ToastContainer />
            <Button onClick={handleOpen} variant="contained">
                <FileUploadIcon /> Upload
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Box sx={{ display: "flex" }}>
                        <Typography id="modal-modal-description">
                            <input
                                className="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50  focus:outline-none "
                                id="file_input"
                                onChange={(event) =>
                                    setFile(event.target.files[0])
                                }
                                type="file"
                            />
                        </Typography>
                        <Typography>
                            <Button
                                onClick={(event) => {
                                    setOpen(false);
                                    handleFileUpload();
                                }}
                                className="flex h-6 "
                            >
                                <FileUploadIcon /> Submit
                            </Button>
                        </Typography>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

const DashboardComp = () => {
    const [showUserModal, setShowUserModal] = useState(false);
    const [allpdf, setAllPDf] = useState([]);
    const [currentUser, setCurrentUser] = useContext(UserContext);

    const getAllPdfs = async () => {
        try {
            console.log(currentUser) ;
            console.log("Requested URl : ", API_ENDPOINTS.getAllPdf + `?userId=${currentUser.id}`)
            const response = await axios.get(API_ENDPOINTS.getAllPdf + `?userId=${currentUser.id}`);
            if (response.status == 200) {
                setAllPDf(response.data);
            } else {
                toast("Bad Request");
            }
        } catch {
            toast("Unable to get all pdfs");
        }
    };
    useEffect(() => {
        getAllPdfs();
    }, []);
    const handleDeleteCallback = (fileId, userId) => {
        console.log(API_ENDPOINTS.deletePdf + `?fileId=${fileId}` + `&userId=${userId}`) ;
        axios
            .delete(API_ENDPOINTS.deletePdf + `?fileId=${fileId}` + `&userId=${userId}`)
            .then((response) => {
                if (response.status == 200) {
                    toast("Deleted Successfully");
                    getAllPdfs() ; 
                }
            })
            .catch((error) => {
                // Handle errors
                toast("Unable to delete");
                console.error("Error deleting PDF:", error);
            });
    };
    const handleDownloadCallback = (fileId) => {
        // axios
        //     .get(API_ENDPOINTS.download + `${fileId}`)
        //     .then((response) => {
        //         if (response.status != 200) {
        //             toast("Unable to download");
        //         }
        //     })
        //     .catch((error) => {
        //         // Handle errors
        //         toast("Unable to download");
        //         console.error("Error download PDF:", error);
        //     });
        axios({
            url: API_ENDPOINTS.download + `${fileId}`,
            method: 'GET',
            responseType: 'blob' // Set the response type to 'blob' to handle binary data
          })
            .then(response => {
              // Create a download link and trigger the download
              const downloadUrl = URL.createObjectURL(response.data);
              const a = document.createElement('a');
              a.href = downloadUrl;
              a.download = `filename1.pdf`; // Set the desired file name and extension
              a.click();
              URL.revokeObjectURL(downloadUrl);
            })
            .catch(error => {
              console.error('Error downloading file:', error);
              toast("Unable to download ;")
            });
    };
    return (
        <div>
            <PrimarySearchAppBar />
            <ToastContainer />
            <div className="flex pt-8 items-center justify-start w-screen">
                <div className="w-10/12 pl-6 pt-0.5 p-4">
                    <div className="flex justify-between">
                        <h1 className="text-4xl">MY PDF</h1>
                        <UploadModal onUpload={getAllPdfs}/>
                    </div>
                    <div
                        style={{
                            borderBottom: "1px solid #D1D5DB",
                            marginTop: "20px",
                        }}
                    ></div>
                    <div className=" pt-2 grid grid-cols-3 gap-4">
                        <div>
                            {allpdf &&
                                allpdf.map((item) => {
                                    return (
                                        <PdfCard
                                            onDelete={()=>handleDeleteCallback(item.fileId, currentUser.id)}
                                            onDownload={()=> handleDownloadCallback(item.fileId)}
                                        >
                                            PDF depends on response
                                        </PdfCard>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DashboardComp;
