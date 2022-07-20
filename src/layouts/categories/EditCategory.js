import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";

import MDSnackbar from "components/MDSnackbar";

import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "context/AuthContext";

import { useParams } from "react-router-dom";

function EditCategory() {
  const nameRef = useRef(null);
  const iconRef = useRef(null);
  const photoRef = useRef(null);

  const ctx = useContext(AuthContext);

   const [categoryData, setCategoryData] = useState({
    name: "",
    photo: "",
    icon: "",
  });

  const { id } = useParams();
  

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}categories/${id}`, {
        
      headers: {
        'Authorization': 'Bearer ' + ctx.token
    }
    })
      .then((response) => {
        response.json().then((currentCategory) => {
          setCategoryData(currentCategory.data);
        });
      })
      .catch((e) => e);
  }, []);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [serverResponse, setServerResponse] = useState("");
  const [snackBarType, setSnackBarType] = useState("success");
  const closeSnackBar = () => setOpenSnackBar(false);

  const [CategoriesData, setCategoriesData] = useState([]);
 
//////////////////
////////////////
    const editCategory = () => {
         const name = nameRef.current.querySelector("input[type=text]").value;
    const icon = iconRef.current.querySelector("input[type=file]").files;
    const photo = photoRef.current.querySelector("input[type=file]").files;
   
    var formdata = new FormData();
    formdata.append("name", name);
    formdata.append("icon", icon[0]);
    formdata.append("photo", photo[0]);

    fetch(`${process.env.REACT_APP_API_URL}categories/${id}`, {
      method: "PUT",
      body: formdata,
      headers: {
        Authorization: "Bearer " + ctx.token,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setServerResponse(result.message.join(" "));
        if (result.success) {
          setSnackBarType("success");
        } else {
          setSnackBarType("error");
        }
        setOpenSnackBar(true);
      })
      .catch((error) => error);
    
  };


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
                      value={categoryData.name}
                      ref={nameRef}
                      onChange={(e) => {
                        setCategoryData({
                          ...categoryData,
                          name: e.target.value,
                        });
                      }}
                      id="categoryName"
                      type="text"
                      label="Category name"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    {categoryData.photo && (
                      <img src={categoryData.photo} width={80} />
                    )}
                    <MDInput
                      ref={photoRef}
                      type="file"
                      onChange={(e) => {
                        console.log(e.target.files);
                      }}
                      label="photo"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    {categoryData.icon && (
                      <img src={categoryData.icon} width={80} />
                    )}
                    <MDInput
                      ref={iconRef}
                      type="file"
                      onChange={(e) => {
                        console.log(e.target.files);
                      }}
                      label="icon"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mt={4} mb={1}>
                    <MDButton
                      variant="gradient"
                      color="info"
                      fullWidth
                      onClick={editCategory}
                    >
                      Edit category
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
        title="Recipe App"
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

export default EditCategory;
