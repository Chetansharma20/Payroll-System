import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import {
  Paper, Typography, Box, FormControl, InputLabel, Select, MenuItem, TextField, Button
} from '@mui/material';

const SalarySetting = () => {
  const { companyData } = useSelector((state) => state.user);
  const [employees, setEmployees] = useState([]);
  const [selectedEmpId, setSelectedEmpId] = useState('');
  const [salaryHeads, setSalaryHeads] = useState([]);
  const [applicableValues, setApplicableValues] = useState({});

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.post('http://localhost:5000/api/getemployeebycompany', {
          CompanyId: companyData._id,
        }); 
        console.log(res.data.data)
        setEmployees(res.data.data || []);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    if (companyData?._id) {
      fetchEmployees();
    }
  }, [companyData]);

  useEffect(() => {
    const fetchSalaryHeads = async () => {
      try {
        const res = await axios.post('http://localhost:5000/api/salaryheadsbycompany', {
          CompanyId: companyData._id,
        });
        const formatted = (res.data.data || []).map((head) => ({
          id: head._id,
          SalaryHeadsTitle: head.SalaryHeadsTitle,
          ShortName: head.ShortName,
          SalaryHeadsType: head.SalaryHeadsType,
          SalaryHeadsValue: head.SalaryHeadsValue,
          SalaryCalcultateMethod: head.SalaryCalcultateMethod,
          DependOn: head.DependOn,
          isActive: head.isActive ? "Active" : "Inactive",
        }));
        setSalaryHeads(formatted);
      } catch (error) {
        console.error('Error fetching salary heads:', error);
      }
    };
    if (companyData?._id) {
      fetchSalaryHeads();
    }
  }, [companyData]);

  const handleEmpChange = (event) => {
    setSelectedEmpId(event.target.value);
    setApplicableValues({}); 
  };

  const handleApplicableValueChange = (id, value) => {
    setApplicableValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSave = async () => {
    if (!selectedEmpId) {
      alert("Please select an employee.");
      return;
    }
    // Debug: Log values before saving
    console.log("Applicable Values:", applicableValues);

    const salaryHeadsPayload = salaryHeads.map((head) => ({
      SalaryHeadId: head.id,
      applicableValue: Number(applicableValues[head.id]) || 0
    }));

    const payload = {
      CompanyId: companyData._id,
      EmployeeID: selectedEmpId,
      SalaryHeads: salaryHeadsPayload,
      EffectFrom: new Date(),
    };

    try {
      await axios.post('http://localhost:5000/api/addsalarysettings', payload);
      alert('Salary settings saved successfully!');
      console.log(payload);
    } catch (error) {
      console.error('Error saving salary settings:', error);
      alert('Failed to save salary settings');
    }
  };

  const selectedEmployee = employees.find(emp => emp._id === selectedEmpId);

  const columns = [
    { field: 'SalaryHeadsTitle', headerName: 'Title', width: 180 },
    { field: 'ShortName', headerName: 'Short Name', width: 120 },
    { field: 'SalaryHeadsType', headerName: 'Type', width: 120 },
    // { field: 'SalaryHeadsValue', headerName: 'Value', width: 120 },
    { field: 'SalaryCalcultateMethod', headerName: 'Calc. Method', width: 150 },
    // { field: 'DependOn', headerName: 'Depend On', width: 120 },
    // { field: 'isActive', headerName: 'Status', width: 100 },
    {
      field: 'applicableValue',
      headerName: 'Applicable Value',
      width: 180,
      renderCell: (params) => (
        <TextField
          size="small"
          type="number"
          value={applicableValues[params.row.id] || ''}
          onChange={(e) => handleApplicableValueChange(params.row.id, e.target.value)}
        />
      ),
    },
  ];

  return (
    <Paper elevation={4} sx={{ p:4, mt: 4, width: '70vw', height:'35vw',marginTop:'',marginRight:'50px'}}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Salary Settings
      </Typography>

      {/* Employee Dropdown */}
      <Box sx={{ mb: 3, width: 300 }}>
        <FormControl fullWidth>
          <InputLabel id="employee-select-label">Select Employee</InputLabel>
          <Select
            labelId="employee-select-label"
            value={selectedEmpId}
            label="Select Employee"
            onChange={handleEmpChange}
          >
            {employees.map(emp => (
              <MenuItem key={emp._id} value={emp._id}>
                {emp.EmployeeName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedEmployee && (
          <Typography sx={{ mt: 2 }}>
            <b>Selected Employee:</b> {selectedEmployee.EmployeeName}
          </Typography>
        )}
      </Box>

      {/* Salary Heads DataGrid */}
      <Box sx={{ height: 340, width: '100%' }}>
           <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb:2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={!selectedEmpId}
        >
          Save
        </Button>
      </Box>
        <DataGrid
          key={selectedEmpId} 
          rows={salaryHeads}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
        />
      </Box>

      {/* Save Button */}
      {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={!selectedEmpId}
        >
          Save
        </Button>
      </Box> */}
      
    </Paper>
  );
};

export default SalarySetting;