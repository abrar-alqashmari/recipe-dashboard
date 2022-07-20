import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Box from "@mui/material/Box";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";
import MDSnackbar from "components/MDSnackbar";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import MenuItem from "@mui/material/MenuItem";

function AddRecipe() {
  const [category, setCategory] = useState(0);
  const nameRef = useRef(null);
  const desRef = useRef(null);
  const rPRef = useRef(null);
  const bPRef = useRef(null);
  const yVRef = useRef(null);
  const URef = useRef(null);
  const CRef = useRef(null);
  // const userCatIDRef = useRef(null)

  const ctx = useContext(AuthContext);
  const [serverResponse, setServerResponse] = useState(" ");
  const [snackBarType, setSnackBarType] = useState("success");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const closeSnackBar = () => setOpenSnackBar(false);

  const [categories, setCategories] = useState(0);
  const [categoriesData, setCategoriesData] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}categories`).then((response) => {
      response.json().then((categories) => {
        console.log(categories.data);
        setCategoriesData(categories.data);
      });
    });
  }, []);

  console.log(categoriesData, "hi");

  const addRecipe = () => {
    
    const name = nameRef.current.querySelector("input[type=text]").value;
    const description = desRef.current.querySelector("input[type=text]").value;

    const youtube_video = yVRef.current.querySelector("input[type=text]").value;

    const recipe_photo = rPRef.current.querySelector("input[type=file]").files;
    const background_photo =
      bPRef.current.querySelector("input[type=file]").files;

    var formdata = new FormData();

    formdata.append("name", name);
    formdata.append("description", description);
    formdata.append("recipe_photo", recipe_photo[0]);
    formdata.append("background_photo", background_photo[0]);
    formdata.append("youtube_video", youtube_video);
    formdata.append("categories", categories);
    
    // formdata.append("youtube_video", youtube_video);

    console.log(formdata);

    fetch(`${process.env.REACT_APP_API_URL}recipes/addRecipe`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + ctx.token,
      },
      body: formdata,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setServerResponse(result.messages.join(" "));
        if (result.success) {
          setSnackBarType("success");
        } else {
          setSnackBarType("error");
        }
        setOpenSnackBar(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
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
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <MDBox mb={2}>
                    <MDInput
                      ref={nameRef}
                      type="text"
                      label="name"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>
                  {/* <MDBox mb={2}>
                                        <MDInput ref={URef} type="text" label="name" variant="standard" fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput ref={CRef} type="text" label="name" variant="standard" fullWidth />
                                    </MDBox> */}
                  <MDBox mb={2}>
                    <MDInput
                      ref={desRef}
                      type="text"
                      label="description"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <p>recipe_photo</p>
                    <MDInput
                      ref={rPRef}
                      type="file"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <p>background_photo</p>
                    <MDInput
                      ref={bPRef}
                      type="file"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      ref={yVRef}
                      type="text"
                      label="video link"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Category
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={categories}
                          label="Category"
                          style={{ padding: "20px 0" }}
                          onChange={(e) => {
                            setCategories(e.target.value);
                          }}
                        >
                          {categoriesData.map((category, i) => {
                            //check
                            return (
                              <MenuItem value={category.id} key={category.id}>
                                {category.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Box>
                  </MDBox>
                  {/* <MDBox mb={2}>
                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={''}
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
                                    </MDBox> */}
                  <MDBox mt={4} mb={1}>
                    <MDButton
                      variant="gradient"
                      color="info"
                      fullWidth
                      onClick={addRecipe}
                    >
                      add Recipe
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
        icon={snackBarType == "success" ? "check" : "warning"}
        title="Places App"
        content={serverResponse}
        open={openSnackBar}
        // onClose={closeSnackBar}
        close={closeSnackBar}
        dateTime=""
        bgWhite
      />
    </DashboardLayout>
  );
}
export default AddRecipe;
