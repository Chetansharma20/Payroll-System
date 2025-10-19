import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useSelector } from "react-redux";

const SalaryHeads = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { companyData } = useSelector((state) => state.company);
  const [AllSalaryHeads, setAllSalaryHeads] = useState([]);

  const openAddDialog = () => setOpenDialog(true);
  const closeAddDialog = () => setOpenDialog(false);

  // ✅ Fetch salary heads
  const fetchSalaryHeads = async () => {
    try {
      const result = await axios.post(
        "http://localhost:5000/api/salaryheadsbycompany",
        { CompanyId: companyData._id }
      );
      const formattedData = result.data.data.map((sal) => ({
        ...sal,
        id: sal._id,
      }));
      setAllSalaryHeads(formattedData);
    } catch (error) {
      console.error(error);
      alert("Error fetching salary heads");
    }
  };

  useEffect(() => {
    fetchSalaryHeads();
  }, []);

  // ✅ Add salary head
  const SubmitSalaryHeads = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const reqData = Object.fromEntries(formData.entries());

    try {
      await axios.post("http://localhost:5000/api/addsalaryheads", {
        ...reqData,
        CompanyId: companyData._id,
      });
      alert("Salary head added");
      closeAddDialog();
      fetchSalaryHeads();
    } catch (error) {
      const message =
        error?.response?.data?.message || "Something went wrong";
      alert(message);
    }
  };

  // ✅ Delete salary head
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this salary head?"))
      return;

    try {
      await axios.delete("http://localhost:5000/api/deletesalaryhead", {
        data: { SalaryHeadId: id },
      });
      alert("Salary head deleted");
      fetchSalaryHeads();
    } catch (error) {
      console.error(error);
      alert("Error deleting salary head");
    }
  };

  // ✅ Table Columns
  const columns = [
    { field: "SalaryHeadsTitle", headerName: "Name", width: 200 },
    { field: "ShortName", headerName: "Short Name", width: 200 },
    { field: "SalaryHeadsType", headerName: "Type", width: 150 },
    { field: "SalaryCalcultateMethod", headerName: "Method", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => handleDelete(params.row._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2, mr: 8 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#2980b9" }}
          onClick={openAddDialog}
        >
          Add Salary Heads
        </Button>
      </Box>

      <Box sx={{ height: 500, width: "70vw" }}>
        <DataGrid
          rows={AllSalaryHeads}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableSelectionOnClick
        />
      </Box>

      {/* Add Salary Head Dialog */}
      <Dialog
        open={openDialog}
        onClose={closeAddDialog}
        maxWidth="sm"
        fullWidth
      >
        <Box
          component="form"
          onSubmit={SubmitSalaryHeads}
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <DialogTitle sx={{ textAlign: "center" }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#2c3e50" }}
            >
              Add Salary Head
            </Typography>
          </DialogTitle>

          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              size="small"
              label="Title"
              name="SalaryHeadsTitle"
              variant="outlined"
              required
              fullWidth
            />

            <TextField
              size="small"
              label="Short Name"
              name="ShortName"
              variant="outlined"
              required
              fullWidth
            />

            <FormControl component="fieldset">
              <FormLabel>Salary Heads Type</FormLabel>
              <RadioGroup row name="SalaryHeadsType">
                <FormControlLabel
                  value="Earnings"
                  control={<Radio size="small" />}
                  label="Earnings"
                />
                <FormControlLabel
                  value="Deductions"
                  control={<Radio size="small" />}
                  label="Deductions"
                />
              </RadioGroup>
            </FormControl>

            <FormControl size="small" fullWidth required>
              <InputLabel id="salary-method-label">
                Salary Calculation Method
              </InputLabel>
              <Select
                labelId="salary-method-label"
                name="SalaryCalcultateMethod"
                defaultValue=""
                label="Salary Calculation Method"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Fixed">Fixed</MenuItem>
                <MenuItem value="PF">PF</MenuItem>
                <MenuItem value="TRANS">Trans</MenuItem>
                <MenuItem value="LWF">LWF</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>

          <DialogActions>
            <Button type="submit" variant="contained">
              Submit
            </Button>
            <Button onClick={closeAddDialog} variant="outlined">
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default SalaryHeads;
