import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import {
  Paper, Typography, Box, FormControl, InputLabel, Select, MenuItem, TextField, Button
} from '@mui/material';
import axiosInstance from '../../api/axiosinstance';
import API_ENDPOINTS from '../../config';

const SalarySetting = () => {
      const token = localStorage.getItem("token")
  const { companyData } = useSelector((state) => state.company);
  const [employees, setEmployees] = useState([]);
  const [selectedEmpId, setSelectedEmpId] = useState('');
  const [salaryHeads, setSalaryHeads] = useState([]);
  const [applicableValues, setApplicableValues] = useState({});

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
      const res = await axiosInstance.post(API_ENDPOINTS.SALARY_SETTING.FETCH_EMPLOYEES, {
  CompanyId: companyData._id,
});

        setEmployees(res.data.data || []);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    if (companyData?._id) fetchEmployees();
  }, [companyData]);

  useEffect(() => {
    const fetchSalaryHeads = async () => {
      try {
       const res = await axiosInstance.post(API_ENDPOINTS.SALARY_SETTING.FETCH_SALARY_HEADS, {
  CompanyId: companyData._id,
});

        const formatted = (res.data.data || []).map((head) => ({
          id: head._id,
          SalaryHeadsTitle: head.SalaryHeadsTitle,
          ShortName: head.ShortName,
          SalaryHeadsType: head.SalaryHeadsType,
          SalaryCalcultateMethod: head.SalaryCalcultateMethod,
          DependOn: head.DependOn,
          isActive: head.isActive ? "Active" : "Inactive",
        }));
        setSalaryHeads(formatted);
      } catch (error) {
        console.error('Error fetching salary heads:', error);
      }
    };
    if (companyData?._id) fetchSalaryHeads();
  }, [companyData]);

  const handleEmpChange = (event) => {
    setSelectedEmpId(event.target.value);
    setApplicableValues({});
  };

  // ✅ Store both applicableValue & percentage separately for each salary head
  const handleApplicableValueChange = (id, field, value) => {
    setApplicableValues((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    if (!selectedEmpId) {
      alert("Please select an employee.");
      return;
    }

    const salaryHeadsPayload = salaryHeads.map((head) => ({
      SalaryHeadId: head.id,
      applicableValue: Number(applicableValues[head.id]?.applicableValue) || 0,
      percentage: Number(applicableValues[head.id]?.percentage) || 0,
    }));

    const payload = {
      CompanyId: companyData._id,
      EmployeeID: selectedEmpId,
      SalaryHeads: salaryHeadsPayload,
      EffectFrom: new Date(),
    };

    try {
await axiosInstance.post(API_ENDPOINTS.SALARY_SETTING.SAVE_SETTINGS, payload);
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
    { field: 'SalaryCalcultateMethod', headerName: 'Calc. Method', width: 150 },
    {
      field: 'applicableValue',
      headerName: 'Applicable Value',
      width: 160,
      renderCell: (params) => (
        <TextField
          size="small"
          type="number"
          value={applicableValues[params.row.id]?.applicableValue || ''}
          onChange={(e) => handleApplicableValueChange(params.row.id, 'applicableValue', e.target.value)}
        />
      ),
    },
    {
      field: 'percentage',
      headerName: 'Percentage (%)',
      width: 160,
      renderCell: (params) => (
        <TextField
          size="small"
          type="number"
          value={applicableValues[params.row.id]?.percentage || ''}
          onChange={(e) => handleApplicableValueChange(params.row.id, 'percentage', e.target.value)}
        />
      ),
    },
  ];

  return (
    <Paper elevation={4} sx={{ p: 4, mt: 4, width: '70vw', height: '35vw', marginRight: '50px' }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Salary Settings
      </Typography>

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

      <Box sx={{ height: 340, width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb: 2 }}>
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
    </Paper>
  );
};

export default SalarySetting;
