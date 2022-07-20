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
    { Header: "email", accessor: "email", align: "left" },
    { Header: "actions", accessor: "actions", align: "center" },
]



function User() {
    const [rows, setRows] = useState([])
    const ctx = useContext(AuthContext)

    const updateUser = (User_id, isActive) => {
        if (window.confirm('Are you sure')) {
            fetch(`${process.env.REACT_APP_API_URL}admin/isActiveUpdate/${User_id}`, {
                method: "PUT",
                body:JSON.stringify({
                    isActive
                } 
                ),

				headers: {
					Authorization: "Bearer " + ctx.token, 'Content-Type' : 'application/json'
				  },
            }).then(response => {
                response.json()
                    .then(result => {
                        console.log(result)
                    })
            })
            .catch(e => e)
        }
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}admin/getUsers`, {
            headers: {
                'Authorization': 'Bearer ' + ctx.token
            }
        })
            .then(response => {
                response.json().then(Users => {
                    console.log(Users, "vvvvvvvvv")
                    const allUsers = Users.data.map((User) => {
                        return {
                            name: <>{User.first_name} {User.last_name}</>,
                            email: <>{User.email}</>,
                            actions: <>
                                <MDButton variant="text" color="success" onClick={() => {updateUser(User.id,1)}}>
                                    <Icon>toggle_on</Icon>&nbsp;IsActive
                                </MDButton>
                                <MDButton variant="text" color="error" onClick={() => {updateUser(User.id,0)}}>
                                    <Icon>toggle_off</Icon>&nbsp;DeActivate
                                </MDButton>
                               
                            </>,
                        }
                    })
                    setRows(allUsers)
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
                                    Users Table
                                    </MDTypography>
                                    <Link to='/Users/add'>
                                        {/* <MDButton variant="text">
                                            <Icon>add_circle</Icon>&nbsp;Add
                                        </MDButton> */}
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
export default User;

// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";

// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";
// import { useContext, useEffect, useState } from "react";
// import Icon from "@mui/material/Icon";
// import MDButton from "components/MDButton";

// import { Link } from "react-router-dom";
// import { AuthContext } from "context/AuthContext";

// const columns = [
// 	{ Header: "name", accessor: "name", width: "45%", align: "left" },
// 	{ Header: "email", accessor: "category", align: "left" },
// 	{ Header: "actions", accessor: "actions", align: "center" },
// ]




// function User() {
// 	const [rows, setRows] = useState([])

// 	const ctx = useContext(AuthContext)

// 	const deleteUser = (User_id) => {
// 		if (window.confirm('Are you sure')) {
// 			fetch(`${process.env.REACT_APP_API_URL}Users/${User_id}`, {
// 				method: "DELETE"
// 			}).then(response => {
// 				response.json()
// 					.then(deleted => {
// 						console.log(deleted)
// 					})
// 			})
// 			.catch(e => e)
// 		}
// 	}

// 	useEffect(() => {
// 		fetch(`${process.env.REACT_APP_API_URL}admin/getUsers`, {
// 			headers: {
//                 'Authorization': 'Bearer ' + ctx.token
//             }
// 		})
// 			.then(response => {
// 				response.json().then(Users => {
// 					console.log(Users, "vvvvvvvvv")
// 					const allUsers = Users.data.map((User) => {
// 						return {
// 							name: <>{User.first_name} {User.last_name}</>,
// 							email: <>{User.email}</>,
// 							actions: <>
// 								<MDButton variant="text" color="error" onClick={() => {deleteUser(User.id)}}>
// 									<Icon>delete</Icon>&nbsp;delete
// 								</MDButton>
// 								<Link to={`/Users/edit/${User.id}`}>
// 									<MDButton variant="text" color="info">
// 										<Icon>edit</Icon>&nbsp;edit
// 									</MDButton>
// 								</Link>
// 							</>,
// 						}
// 					})
// 					setRows(allUsers)
// 				})
// 			})
// 	}, [])
// 	return (
// 		<DashboardLayout>
// 			<DashboardNavbar />
// 			<MDBox pt={6} pb={3}>
// 				<Grid container spacing={6}>
// 					<Grid item xs={12}>
// 						<Card>
// 							<MDBox
// 								mx={2}
// 								mt={-3}
// 								py={3}
// 								px={2}
// 								variant="gradient"
// 								bgColor="info"
// 								borderRadius="lg"
// 								coloredShadow="info"
// 							>
// 								<Grid
//                                     container
//                                     direction="row"
//                                     justifyContent="space-between"
//                                     alignItems="center"
//                                 >
//                                     <MDTypography variant="h6" color="white">
// 									Users Table
//                                     </MDTypography>
//                                     <Link to='/Users/add'>
//                                         <MDButton variant="text">
//                                             <Icon>add_circle</Icon>&nbsp;Add
//                                         </MDButton>
//                                     </Link>
//                                 </Grid>
// 							</MDBox>
// 							<MDBox pt={3}>
// 								<DataTable
// 									table={{ columns, rows }}
// 									isSorted={false}
// 									entriesPerPage={false}
// 									showTotalEntries={false}
// 									noEndBorder
// 								/>
// 							</MDBox>
// 						</Card>
// 					</Grid>
// 				</Grid>
// 			</MDBox>
// 			<Footer />
// 		</DashboardLayout>
// 	);
// }

// export default User;
