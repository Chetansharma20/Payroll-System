import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import SalarySlip from './SalarySlip';
import { PDFDownloadLink } from '@react-pdf/renderer';
import DescriptionIcon from '@mui/icons-material/Description';
const Salary = () => {
    const[getsalary, setsalary] = useState([])
      const { EmployeeData } = useSelector((state) => state.user);
    useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/fetchsalaryslipbyemployee', {
          EmployeeID: EmployeeData._id
        });
       console.log(response.data.data)
        setsalary(response.data.data);
      } 
      catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    };

    if (EmployeeData?._id) fetchEmployees();
  }, [EmployeeData]);

  const columns = [
    {
      field: 'Month',
      headerName: 'Month',
      flex: 1,
    //   valueGetter: (params) => dayjs(params.row.fromdate).format('YYYY-MM-DD')
    },
    
    {
      field: 'totalEarnings',
      headerName: 'Total Earnings',
      flex: 1
    },
    {
      field: 'totalDeductions',
      headerName: 'Total Deductions',
      flex: 1
    },
    {
      field: 'grossSalary',
      headerName: 'Gross Salary',
      flex: 1
    },
    {
      field: 'netSalary',
      headerName: 'Net Salary',
      flex: 1
    },
     {
      field: 'SalarySlip',
      headerName: 'Slip',
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <PDFDownloadLink
          document={<SalarySlip data={params.row} />}
          fileName={`Slip_${params?.row.EmployeeID?.EmployeeName || 'Employee'}.pdf`}
          style={{ color: 'blue' }}
        >
          <DescriptionIcon />
        </PDFDownloadLink>
      )
    }
  ];

  return (
<Box sx={{ height: 500, width: '100%', p: 2 }}>
      <h2>Salary Slips</h2>
      <h3>{EmployeeData.EmployeeName}</h3>
      <DataGrid
        rows={getsalary}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        disableRowSelectionOnClick
      />
    </Box>
  )
}

export default Salary