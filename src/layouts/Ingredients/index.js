import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useContext, useEffect, useState } from "react";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import { Link } from "react-router-dom";
import { AuthContext } from "context/AuthContext";


const columns = [
    { Header: "name", accessor: "name", width: "45%", align: "left" },
    { Header: "description", accessor: "description", align: "left" },
    { Header: "actions", accessor: "actions", align: "center" },
]


function Ingredients() {

    const [rows, setRows] = useState([])
    const ctx = useContext(AuthContext)

    const deleteIngredients = (Recipe_id) => {
        if (window.confirm('Are you sure')) {
            fetch(`${process.env.REACT_APP_API_URL}ingredients/${Recipe_id}`, {
                method: "DELETE",
				headers: {
					Authorization: "Bearer " + ctx.token,
				  },
            }).then(response => {
                response.json()
                    .then(deleted => {
                        console.log(deleted)
                    })
            })
            .catch(e => e)
        }
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}ingredients/`, {
            headers: {
                'Authorization': 'Bearer ' + ctx.token
            }
        })
            .then(response => {
                response.json().then(Ingredients => {
                    console.log(Ingredients, "vvvvvvvvv")
                    const allIngredients = Ingredients.data.map((Ingredients) => {
                        return {
                            name: <>{Ingredients.name}</>,
                            description: <>{Ingredients.description}</>,
                            actions: <>
                                <MDButton variant="text" color="error" onClick={() => {deleteIngredients(Ingredients.id)}}>
                                    <Icon>delete</Icon>&nbsp;delete
                                </MDButton>
                                <Link to={`/Ingredients/edit/${Ingredients.id}`}>
                                    <MDButton variant="text" color="info">
                                        <Icon>edit</Icon>&nbsp;edit
                                    </MDButton>
                                </Link>
                            </>,
                        }
                    })
                    setRows(allIngredients)
                })
            })
    }, [])


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
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <MDTypography variant="h6" color="white">
                                    Ingredients Table
                                    </MDTypography>
                                    <Link to='/Users/add'>
                                        <MDButton variant="text">
                                            <Icon>add_circle</Icon>&nbsp;Add
                                        </MDButton>
                                    </Link>
                                </Grid>
                            </MDBox>
                            <MDBox pt={3}>
                                <DataTable
                                    table={{ columns, rows }}
                                    isSorted={false}
                                    entriesPerPage={false}
                                    showTotalEntries={false}
                                    noEndBorder
                                />
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}
export default Ingredients;