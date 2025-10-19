import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import dayjs from "dayjs";
import {
  Box,
  Typography,
  TextField,
  Autocomplete,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Paper,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import API_ENDPOINTS from "../../config";



const AttendanceTrack = () => {
  const token = localStorage.getItem("token");
  const { companyData } = useSelector((state) => state.company);

  const [EmployeeId, setEmployeeId] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [inPunch, setInPunch] = useState("");
  const [outPunch, setOutPunch] = useState("");
  const [selectDate, setSelectDate] = useState(dayjs());
  const [toast, setToast] = useState({ open: false, message: "", severity: "info" });

  const showToast = (message, severity = "info") =>
    setToast({ open: true, message, severity });

  // Fetch employees once
  useEffect(() => {
    if (!companyData?._id) return;

    const fetchEmployees = async () => {
      try {
        const response = await axios.post(
          API_ENDPOINTS.EMPLOYEES.LIST_BY_COMPANY,
          { CompanyId: companyData._id },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const formatted = response.data.data.map((emp) => ({
          ...emp,
          EmployeeName: emp.EmployeeName || "Unnamed",
        }));

        setEmployees(formatted);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
        showToast("Error fetching employees", "error");
      }
    };

    fetchEmployees();
  }, [companyData, token]);

  // Fetch attendance
  const fetchAttendance = useCallback(async () => {
    if (!EmployeeId || !companyData?._id) return setAttendanceData([]);

    try {
      const month = selectDate.format("MM");
      const year = selectDate.format("YYYY");

      const response = await axios.post(
        API_ENDPOINTS.ATTENDANCE.FETCH,
        { EmployeeID: EmployeeId, month, year, CompanyId: companyData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAttendanceData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      showToast("Failed to fetch attendance data", "error");
      setAttendanceData([]);
    }
  }, [EmployeeId, selectDate, companyData?._id, token]);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  const handleOpenDialog = (row) => {
    setSelectedRow(row);
    setInPunch(dayjs(row.InPunchTime).format("HH:mm"));
    setOutPunch(row.OutPunchTime ? dayjs(row.OutPunchTime).format("HH:mm") : "");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRow(null);
    setInPunch("");
    setOutPunch("");
  };

  const calculateTotalHours = (inTime, outTime) => {
    if (!inTime || !outTime) return null;
    let start = dayjs(`2000-01-01T${inTime}`);
    let end = dayjs(`2000-01-01T${outTime}`);
    let diff = end.diff(start, "hour", true);
    if (diff < 0) diff += 24;
    return diff.toFixed(2);
  };

  const handleSave = async () => {
    try {
      const attendanceDate = dayjs(selectedRow.AttendanceDate).format("YYYY-MM-DD");
      const inPunchDateTime = `${attendanceDate}T${inPunch}:00`;
      const outPunchDateTime = outPunch ? `${attendanceDate}T${outPunch}:00` : null;

      const response = await axios.put(
        API_ENDPOINTS.ATTENDANCE.UPDATE(),
        { id: selectedRow._id, InPunchTime: inPunchDateTime, OutPunchTime: outPunchDateTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        showToast("Attendance updated successfully", "success");
        handleCloseDialog();
        fetchAttendance();
      }
    } catch (error) {
      console.error("Error updating attendance:", error);
      showToast(error.response?.data?.message || "Failed to update attendance", "error");
    }
  };

  const columns = [
    { field: "EmployeeID", headerName: "Employee Name", flex: 1, renderCell: (params) => params.row?.EmployeeData?.EmployeeName || "N/A" },
    { field: "AttendanceDate", headerName: "Date", flex: 1, renderCell: (params) => dayjs(params.row.AttendanceDate).format("YYYY-MM-DD") },
    { field: "InPunchTime", headerName: "Punch In", flex: 1, renderCell: (params) => params.row.InPunchTime ? dayjs(params.row.InPunchTime).format("HH:mm") : "-" },
    { field: "OutPunchTime", headerName: "Punch Out", flex: 1, renderCell: (params) => params.row.OutPunchTime ? dayjs(params.row.OutPunchTime).format("HH:mm") : "-" },
    { field: "TotalHours", headerName: "Total Hours", flex: 0.6, renderCell: (params) => params.row.TotalHours?.toFixed(2) || "-" },
    { field: "edit", headerName: "Edit", flex: 0.3, renderCell: (params) => <IconButton onClick={() => handleOpenDialog(params.row)} color="primary"><EditIcon /></IconButton> },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>Attendance Tracking</Typography>

        {/* Filters */}
        <Grid container spacing={2} alignItems="center" mb={3}>
          <Grid item xs={12} sm={4} md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker views={["year", "month"]} label="Select Month & Year" value={selectDate} onChange={setSelectDate} renderInput={(params) => <TextField fullWidth {...params} />} />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Autocomplete
              options={employees}
              getOptionLabel={(option) => option.EmployeeName || ""}
              value={employees.find((emp) => emp._id === EmployeeId) || null}
              onChange={(e, newVal) => setEmployeeId(newVal?._id || "")}
              renderInput={(params) => <TextField {...params} label="Select Employee" fullWidth />}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <Button variant="contained" fullWidth onClick={fetchAttendance} sx={{ height: "100%" }}>Search</Button>
          </Grid>
        </Grid>

        {/* DataGrid */}
        <Box sx={{ height: 450 }}>
          <DataGrid
            rows={attendanceData.map((entry) => ({ id: entry._id, ...entry }))}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
            disableSelectionOnClick
            sx={{
              borderRadius: 2,
              backgroundColor: "#f9fafb",
              "& .MuiDataGrid-columnHeaders": { backgroundColor: "#1976d2", color: "black", fontWeight: "bold" },
            }}
          />
        </Box>
      </Paper>

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Attendance</DialogTitle>
        <DialogContent dividers>
          {selectedRow && (
            <>
              <Typography gutterBottom><strong>Name:</strong> {selectedRow?.EmployeeData?.EmployeeName || "N/A"}</Typography>
              <Typography gutterBottom><strong>Date:</strong> {dayjs(selectedRow.AttendanceDate).format("YYYY-MM-DD")}</Typography>

              <TextField label="Punch In" type="time" fullWidth margin="normal" value={inPunch} onChange={(e) => setInPunch(e.target.value)} />
              <TextField label="Punch Out" type="time" fullWidth margin="normal" value={outPunch} onChange={(e) => setOutPunch(e.target.value)} />
              {inPunch && outPunch && <Typography variant="body2" color="gray">Total Hours: {calculateTotalHours(inPunch, outPunch)} hrs</Typography>}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="error" variant="outlined">Cancel</Button>
          <Button onClick={handleSave} color="primary" variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast({ ...toast, open: false })} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity={toast.severity} variant="filled" sx={{ width: "100%" }}>{toast.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default AttendanceTrack;
