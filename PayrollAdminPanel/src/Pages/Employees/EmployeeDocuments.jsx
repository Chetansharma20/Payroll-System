import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';


const EmployeeDocuments = () => {
  

    const [employeePhoto, setEmployeePhoto] = useState(null);
  const [aadhaarCard, setAadhaarCard] = useState(null);
  const [panCard, setPanCard] = useState(null);
  const [passBook, setPassBook] = useState(null);
  const [degree, setDegree] = useState(null);
  
  const { companyData } = useSelector((state) => state.user);
  const [allEmployees, setAllEmployees] = useState([]);
 const [openDialog, setOpenDialog] = useState(false);
 const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
   const openAddDialog = (employee) => {
  setSelectedEmployeeId(employee.EmployeeId); // Set selected employee ID
  setOpenDialog(true); // Open dialog
};

  const closeAddDialog = ()=>
  {
    setOpenDialog(false)
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

   const SubmitEmployeeDocument = async (e) => {
  try {
       e.preventDefault();
  const formData = new FormData();
    formData.append("EmployeeID", selectedEmployeeId);
    if (employeePhoto) formData.append("EmployeePhoto", employeePhoto);
    if (aadhaarCard) formData.append("AdhaarCard", aadhaarCard);
    if (panCard) formData.append("PanCard", panCard);
    if (passBook) formData.append("PassBook", passBook);
    if (degree) formData.append("Degree", degree);

  

      let result = axios.put('http://localhost:5000/api/updateemployee', formData ,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      // alert("Documents added")
        setSnackbarOpen(true);
    }


    catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      console.log(error);
      alert(message);

    }
  }
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const result = await axios.post("http://localhost:5000/api/getemployeebycompany", {
          CompanyId: companyData._id
        });
           const formattedData = result.data.data.map((emp) => ({
          ...emp,
          EmployeeId: emp._id || 'Unnamed',
          _id: emp._id
        }));
       console.log(formattedData.map(emp => emp.EmployeeId));

        setAllEmployees(formattedData);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };
    fetchEmployees();
  }, [companyData]);

  const columns = [
    {
      field: 'EmployeePhoto',
      headerName: 'Photo',
      width: 100,
      renderCell: (params) => (
        params.value ? (
          <Avatar src={`http://localhost:5000/${params.value}`} alt="photo" />
        ) : 'N/A'
      )
    },
    { field: 'EmployeeName', headerName: 'Name', width: 150 },

    {
      field: 'AdhaarCard',
      headerName: 'Aadhar',
      width: 130,
      renderCell: (params) =>
        params.value ? (
          <a
            href={`http://localhost:5000/${params.value}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View
          </a>
        ) : 'N/A'
    },
    {
      field: 'PanCard',
      headerName: 'PAN',
      width: 130,
      renderCell: (params) =>
        params.value ? (
          <a
            href={`http://localhost:5000/${params.value}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View
          </a>
        ) : 'N/A'
    },
    {
      field: 'PassBook',
      headerName: 'Passbook',
      width: 130,
      renderCell: (params) =>
        params.value ? (
          <a
            href={`http://localhost:5000/${params.value}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View
          </a>
        ) : 'N/A'
    },
    {
      field: 'Degree',
      headerName: 'Degree',
      width: 130,
      renderCell: (params) =>
        params.value ? (
          <a
            href={`http://localhost:5000/${params.value}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View
          </a>
        ) : 'N/A'
    },
     {
      field: 'UpdateDocuments',
      headerName: 'Update',
      width: 160,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          color="info"
          sx={{ borderRadius: '20px', textTransform: 'none' }}
          onClick={() => openAddDialog(params.row)}
        >
          Update
        </Button>
      )
    }
  ];

  const rows = allEmployees.map((emp, index) => ({
    id: emp._id || index,
    ...emp
  }));

  return (
    <>
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <Box sx={{ width: '80vw' }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Employee Documents
        </Typography>
        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10]}
            disableRowSelectionOnClick
            sx={{ backgroundColor: 'white' }}
          />
        </Box>
      </Box>
    </Box>

     <Dialog open={openDialog} onClose={closeAddDialog} maxWidth="sm" fullWidth>
  <DialogTitle>
    <Typography variant="h6" sx={{ fontWeight: 600 }}>
      Upload Employee Documents
    </Typography>
  </DialogTitle>

  <DialogContent dividers>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} component="form"
  onSubmit={SubmitEmployeeDocument}>
      <Button variant="outlined" component="label">
        Upload Photo
        <input type="file" hidden onChange={(e) => setEmployeePhoto(e.target.files[0])} />
      </Button>
      {employeePhoto && (
        <Typography variant="body2" sx={{ ml: 1, color: 'gray' }}>
          Selected: {employeePhoto.name}
        </Typography>
      )}

      <Button variant="outlined" component="label">
        Upload Aadhaar Card
        <input type="file" hidden onChange={(e) => setAadhaarCard(e.target.files[0])} />
      </Button>
      {aadhaarCard && (
        <Typography variant="body2" sx={{ ml: 1, color: 'gray' }}>
          Selected: {aadhaarCard.name}
        </Typography>
      )}

      <Button variant="outlined" component="label" required>
        Upload PAN Card
        <input type="file" hidden onChange={(e) => setPanCard(e.target.files[0])} />
      </Button>
      {panCard && (
        <Typography variant="body2" sx={{ ml: 1, color: 'gray' }}>
          Selected: {panCard.name}
        </Typography>
      )}

      <Button variant="outlined" component="label">
        Upload Bank Passbook
        <input type="file" hidden onChange={(e) => setPassBook(e.target.files[0])} />
      </Button>
      {passBook && (
        <Typography variant="body2" sx={{ ml: 1, color: 'gray' }}>
          Selected: {passBook.name}
        </Typography>
      )}

      <Button variant="outlined" component="label">
        Upload Degree
        <input type="file" hidden onChange={(e) => setDegree(e.target.files[0])} />
      </Button>
      {degree && (
        <Typography variant="body2" sx={{ ml: 1, color: 'gray' }}>
          Selected: {degree.name}
        </Typography>
      )}
        <DialogActions sx={{ justifyContent: 'flex-end', px: 3, pb: 2 }}>
      <Button type="submit"  variant="contained" color="primary">
     Submit
     </Button>
    <Button onClick={closeAddDialog} variant="contained" color="error">
      close
    </Button>
    
  </DialogActions>
    </Box>

  </DialogContent>


</Dialog>
  <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            Documents Updated successfully!
          </Alert>
        </Snackbar>
    </>
  );
};

export default EmployeeDocuments;
