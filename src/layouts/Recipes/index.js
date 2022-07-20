import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState, useContext } from "react";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import { AuthContext } from "context/AuthContext";
import { Link } from "react-router-dom";

const columns = [
  { Header: "name", accessor: "name", width: "45%", align: "left" },
  // { Header: "description", accessor: "description", align: "center" },
  { Header: "recipe_photo", accessor: "recipe_photo", align: "center" },
  { Header: "background_photo", accessor: "background_photo", align: "center" },
  { Header: "youtube_video", accessor: "youtube_video", align: "center" },
  { Header: "actions", accessor: "actions", align: "center" },
];
// const rows = []
function Recipe() {
  const [rows, setRows] = useState([]);
  const ctx = useContext(AuthContext);
  const [showMore, setShowMore] = useState(false);

  const deleteRecipe = (Recipe_id) => {
    if (window.confirm("Are you sure")) {
      fetch(`${process.env.REACT_APP_API_URL}recipes/${Recipe_id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + ctx.token,
        },
      })
        .then((response) => {
          console.log(response, "8888888");
          response.json().then((deleted) => {
            console.log(deleted);
          });
        })
        .catch((e) => e);
    }
  };

  const show = (id) => {
    if (window.confirm("Are you sure")) {
      fetch(`${process.env.REACT_APP_API_URL}ingredients/${id}`, {
        headers: {
          Authorization: "Bearer " + ctx.token,
        },
      })
        .then((response) => {
          console.log(response, "8888888");
          response.json().then(() => {});
        })
        .catch((e) => e);
    }
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}recipes`).then((response) => {
      response.json().then((recipes) => {
        const allRecipes = recipes.data.map((Recipe) => {
          console.log(Recipe, "jjjjjjjjj");
          return {
            name: <>{Recipe.name}</>,
            // description: (
            //   <>
            //     {Recipe.description}
            //   </>
            // ),
            recipe_photo: <img src={Recipe.recipe_photo} width="80px" />,
            background_photo: (
              <img src={Recipe.background_photo} width="80px" />
            ),
            youtube_video: (
              <a
                href={`https://www.youtube.com/embed/${Recipe?.youtube_video}`}
              >
                Click Me
              </a>
            ),

            actions: (
              <>
                <MDButton
                  key={Recipe.id}
                  variant="text"
                  color="error"
                  onClick={() => {
                    deleteRecipe(Recipe.id);
                  }}
                >
                  <Icon>delete</Icon>&nbsp;delete
                </MDButton>
                <Link to={`/recipes/add${Recipe.id}`}>
                  <MDButton variant="text" color="info">
                    {/* <Icon>edit</Icon>&nbsp;edit */}
                  </MDButton>
                </Link>
                <Link to={`/ingredients/show/${Recipe.id}`}>
                  <MDButton variant="text" color="info">
                    <Icon onClick={show}>visibility</Icon>&nbsp;show
                  </MDButton>
                </Link>
              </>
            ),
          };
        });
        setRows(allRecipes);
      });
    });
  }, []);
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
                    recipe Table
                  </MDTypography>
                  <Link to="/recipes/add">
                    <MDButton variant="text">
                      {/* <Icon>add_circle</Icon>&nbsp;Add */}
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
export default Recipe;

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
// 	{ Header: "description", accessor: "description", align: "center" },
// 	{ Header: "recipe_photo", accessor: "recipe_photo", align: "center" },
// 	{ Header: "background_photo", accessor: "background_photo", align: "center" },
// 	{ Header: "youtube_video", accessor: "youtube_video", align: "center" },
// 	{ Header: "actions", accessor: "actions", align: "center" },
// ]

// function Recipe() {
// 	const [rows, setRows] = useState([])
//     const ctx = useContext(AuthContext)

// 	const deleteRecipe = (Recipe_id) => {
// 		if (window.confirm('Are you sure')) {
// 			fetch(`${process.env.REACT_APP_API_URL}recipes/${Recipe_id}`, {
// 				method: "DELETE",
// 				headers: {
// 					'Authorization': 'Bearer ' + ctx.token
// 				},
// 			}).then(response => {
// 				response.json()
// 					.then(deleted => {
// 						console.log(deleted)
// 					})
// 			}).catch(e => e)
// 		}
// 	}

// 	useEffect(() => {
// 		fetch(`${process.env.REACT_APP_API_URL}recipes`)
// 			.then(response => {
// 				response.json().then(recipes => {
// 					const allRecipes = recipes.data.map((Recipe) => {
// 						return {
// 							name: <>{Recipe.name}</>,
// 							description: <>{Recipe.description}</>,
// 							recipe_photo: <img src={Recipe.recipe_photo} width="80px"/>,
// 							background_photo: <img src={Recipe.background_photo} width="80px"/>,
// 							youtube_video: <a href={Recipe.youtube_video}>Click Me</a>,
// 							actions: <>
// 								<MDButton variant="text" color="error" onClick={() => {deleteRecipe(Recipe.id)}}>
// 									<Icon>delete</Icon>&nbsp;delete
// 								</MDButton>
// 								<Link to={`/Recipes/edit/${Recipe.id}`}>
// 									<MDButton variant="text" color="info">
// 										<Icon>edit</Icon>&nbsp;edit
// 									</MDButton>
// 								</Link>
// 							</>,
// 						}
// 					})
// 					setRows(allRecipes)
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
// 									Recipes Table
//                                     </MDTypography>
//                                     <Link to='/recipes/add'>
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

// export default Recipe;
