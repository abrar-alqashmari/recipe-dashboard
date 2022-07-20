import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Box from '@mui/material/Box';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";
import MDSnackbar from "components/MDSnackbar";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom"


function AddUser() {

    const firstNameRef = useRef(null)
    const lastNameRef = useRef(null)
    const userNameRef = useRef(null)
    const emailRef = useRef(null)
    const passRef = useRef(null)
    const isAdminRef = useRef(null)


    const ctx = useContext(AuthContext)
    const [serverResponse, setServerResponse] = useState(" ")
    const [snackBarType, setSnackBarType] = useState("success")
    const [openSnackBar, setOpenSnackBar] = useState(false)
    const closeSnackBar = () => setOpenSnackBar(false);
    const navigate = useNavigate()

    const saveuser = () => {
        const firstname = firstNameRef.current.querySelector('input[type=text]').value
        const lastname = lastNameRef.current.querySelector('input[type=text]').value
        console.log(userNameRef,"userNameRef")
        const username = userNameRef.current.querySelector('input[type=text]').value
        const email = emailRef.current.querySelector('input[type=email]').value
        const pass = passRef.current.querySelector('input[type=password]').value
        const isAdmin = isAdminRef.current.querySelector('input[type=text]').value
        console.log(isAdmin,"isAdmin")

    


        // var formdata = new FormData();
        // formdata.append("first_name", firstname);
        // formdata.append("last_name", lastname);
        // formdata.append("username", username);
        // formdata.append("email", email);
        // formdata.append("password", pass);
        // formdata.append("isAdmin", isAdmin);



        // console.log(formdata)
        fetch(`${process.env.REACT_APP_API_URL}admin/createAdmin`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + ctx.token,
                'Content-Type' :'application/json'
            },
            body:JSON.stringify({
                first_name:firstname,
                last_name:lastname,
                username,
                email,
                password:pass,
                isAdmin
            })
        }).then(response => response.json())
            .then(result => {
                console.log(result)
                setServerResponse(result.messages)
                if (result.success) {
                    setSnackBarType('success')
                    navigate('/users')
                } else {
                    setSnackBarType('error')
                }
                setOpenSnackBar(true)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    // const handleCategoryChange = (event) => {
    //     setCategory(event.target.value)
    // }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox
                                mx={2}
                                mt={-3}
                                py={3}
                                px={2}
                                variant="gradient"
                                bgColor="info"
                                borderRadius="lg"
                                coloredShadow="info"
                            >
                                <MDTypography variant="h6" color="white">
                                    Add user
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={4} pb={3} px={3}>
                                <MDBox component="form" role="form">
                                    <MDBox mb={2}>
                                        <MDInput type="text" label="First name" variant="standard" fullWidth ref={firstNameRef} />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput type="text" label="Last name" variant="standard" fullWidth ref={lastNameRef} />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput type="text" label="username" variant="standard" fullWidth ref={userNameRef} />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput type="email" label="Email" variant="standard" fullWidth ref={emailRef} />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput type="text" label="user type" variant="standard" fullWidth ref={isAdminRef} />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput type="password" label="password" variant="standard" fullWidth ref={passRef} />
                                    </MDBox>

                                    <MDBox mt={4} mb={1}>
                                        <MDButton variant="gradient" color="info" fullWidth onClick={saveuser}>
                                            Save user
                                        </MDButton>
                                    </MDBox>
                                </MDBox>
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <MDSnackbar
                color={snackBarType}
                icon={snackBarType == 'success' ? 'check' : 'warning'}
                title="users App"
                content={serverResponse}
                open={openSnackBar}
                onClose={closeSnackBar}
                close={closeSnackBar}
                dateTime=""
                bgWhite
            />
            <Footer />
        </DashboardLayout>
    )
}
export default AddUser