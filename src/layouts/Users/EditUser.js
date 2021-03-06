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

import { Wrapper } from "@googlemaps/react-wrapper";
import { useParams } from "react-router-dom";
function Map({ center, zoom, prevState, updatePlace }) {
    const mapRef = useRef(null)
    const [map, setMap] = useState()
    useEffect(() => {
        setMap(new window.google.maps.Map(mapRef.current, {
            center,
            zoom,
        }));
    }, []);
    useEffect(() => {
        if (map) {
            map.addListener("click", (mapsMouseEvent) => {
                const coordinates = mapsMouseEvent.latLng.toJSON()
                updatePlace({
                    ...prevState,
                    latitude: coordinates.lat,
                    longitude: coordinates.lng
                })
            });
        }
    }, [map])
    return (<div ref={mapRef} style={{ height: '400px' }} />)
}
function EditUser() {
    const [longitude, setLongitude] = useState(28.5)
    const [latitude, setLatitude] = useState(40.5)
    const [category, setCategory] = useState(0)

    const userPicRef = useRef(null)

    const [userData, setuserData] = useState({
        name: '',
        description: '',
        longitude: 28,
        latitude: 41,
        Category: {
            id: null
        }
    })
    const { id } = useParams()
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}users/${id}`)
            .then(response => {
                response.json().then(currentPlace => {
                    setuserData(currentPlace.data)
                })
            })
            .catch(e => e)
    }, [])

    const ctx = useContext(AuthContext)

    const [serverResponse, setServerResponse] = useState(" ")
    const [snackBarType, setSnackBarType] = useState("success")
    const [openSnackBar, setOpenSnackBar] = useState(false)

    const closeSnackBar = () => setOpenSnackBar(false);

    const [categoriesData, setCategoriesData] = useState([])
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}categories`)
            .then(response => {
                response.json().then(categories => {
                    setCategoriesData(categories.data)
                })
            })
    }, [])
    const saveuser = () => {
        const picture = userPicRef.current.querySelector('input[type=file]').files
        var formdata = new FormData();
        formdata.append("name", userData.name);
        formdata.append("description", userData.description);
        formdata.append("category_id", userData.Category.id);
        formdata.append("longitude", userData.longitude);
        formdata.append("latitude", userData.latitude);
        formdata.append("picture", picture[0]);
        fetch(`${process.env.REACT_APP_API_URL}user/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + ctx.token
            },
            body: formdata,
        }).then(response => response.json())
            .then(result => {
                console.log(result)
                setServerResponse(result.message.join(' '))
                if (result.success) {
                    setSnackBarType('success')
                } else {
                    setSnackBarType('error')
                }
                setOpenSnackBar(true)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const updateuserData = (obj) => {
        setuserData({
            ...userData,
            ...obj
        })
    }

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
                                    Edit user
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={4} pb={3} px={3}>
                                <MDBox component="form" role="form">
                                    <MDBox mb={2}>
                                        <MDInput onChange={(e) => {updateuserData({name: e.target.value})}} type="text" label="user name" variant="standard" fullWidth value={userData.name} />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput onChange={(e) => {updateuserData({description: e.target.value})}} type="text" label="user Description" variant="standard" fullWidth value={userData.description} />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput onChange={(e) => {updateuserData({latitude: e.target.value})}} type="text" label="Latitude" variant="standard" fullWidth value={userData.latitude} />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput onChange={(e) => {updateuserData({longitude: e.target.value})}} type="text" label="longitude" variant="standard" fullWidth value={userData.longitude} />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={userData?.Category?.id ?? ''}
                                                    label="Category"
                                                    style={{padding: '20px 0'}}
                                                    onChange={(e) => {updateuserData({Category: {id: e.target.value}})}}
                                                >
                                                    {categoriesData.map((category, i) => {
                                                        return <MenuItem value={category.id} key={category.id}>{category.name}</MenuItem>
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput type="file" label="Picture" variant="standard" fullWidth ref={userPicRef} />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <Wrapper apiKey={''} >
                                            <Map center={{ lat: userData.latitude, lng: userData.longitude }} zoom={16} updateuser={setuserData} prevState={userData} />
                                        </Wrapper>
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
                title="user App"
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
export default EditUser