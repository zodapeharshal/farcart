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

const UploadModal = () => {
    const [open, setOpen] = useState(false);
    const [allUserData, setAllUserData] = useState([]);
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const handleOpen = async () => {
        const response = await axios.get(
            "http://pdf-manager-u6c8.onrender.com/pdf-manager/users"
        );
        if (response.status == 200) {
            setAllUserData(response.data);
            setOpen(true);
        } else {
            toast.error("unable to upload file");
        }
    };

    const handleClose = () => setOpen(false);
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("senderId", currentUser.id);
        formData.append("fileName", fileName) ;
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
                    {/* <Box sx={{ display: "flex" }}> */}
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
                        <input
                                className="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50  focus:outline-none "
                                id="file_name"
                                onChange={(event) =>
                                    setFileName(event.target.value)
                                }
                                type="text"
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
                    {/* </Box> */}
                </Box>
            </Modal>
        </div>
    );
};

const DashboardComp = () => {
    const [showUserModal, setShowUserModal] = useState(false);
    const [allpdf, setAllPDf] = useState([]);
    const getAllPdfs = async () => {
        try {
            const response = await axios.get(API_ENDPOINTS.getAllPdf);
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
    const handleDeleteCallback = () => {
        const response = axios
            .delete(API_ENDPOINTS.deletePdf)
            .then((response) => {
                if (response.status == 200) {
                    toast("Deleted Successfully");
                }
            })
            .catch((error) => {
                // Handle errors
                toast("Unable to delete");
                console.error("Error deleting PDF:", error);
            });
    };
    const handleDownloadCallback = () => {
        const response = axios
            .post(API_ENDPOINTS.download)
            .then((response) => {
                if (response.status != 200) {
                    toast("Unable to download");
                }
            })
            .catch((error) => {
                // Handle errors
                toast("Unable to download");
                console.error("Error download PDF:", error);
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
                        <UploadModal />
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
                                            onDelete={handleDeleteCallback}
                                            onDownload={handleDownloadCallback}
                                            pdfName={item.fileName}
                                        />
 
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
