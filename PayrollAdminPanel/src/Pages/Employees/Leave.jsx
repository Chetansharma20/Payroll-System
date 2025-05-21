import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import axios from 'axios'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Leave = () => {
const { companyData } = useSelector((state) => state.user);
    const[employees, setEmployees] = useState([])
    const[EmployeeId, setEmployeeId] = useState('')

    const[leaveData, setLeaveData] = useState([]) 
const [fromDate, setFromDate] = useState(dayjs());
const [toDate, setToDate] = useState(dayjs());
const[openDialog, setopenDialog] = useState(false)
let openAddDialog = ()=>
{
    setopenDialog(true)
}

let closeAddDialog = ()=>
{
    setopenDialog(false)
}
    let submitLeave = async(e)=>
    {
        e.preventDefault()
        let getleave = new FormData(e.target)
        let reqdata = Object.fromEntries(getleave.entries())
        console.log(reqdata)

        const FormattedFrom = fromDate.format('YYYY-MM-DD')
        const FormattedTo = toDate.format('YYYY-MM-DD')
        try
        {
            let leave = await axios.post("http://localhost:5000/api/addleave",{...reqdata, CompanyId: companyData._id, EmployeeID:EmployeeId , FromDate: FormattedFrom, ToDate: FormattedTo })

  console.log(leave.data)
  alert("Leave added")
   setopenDialog(false)
        }
        catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      console.log(error);
      alert(message);

    }
    }
      const[selectMonth, setSelectedMonth] = useState(dayjs())
     const[selectYear, setSelectedYear] = useState(dayjs()) 


    useEffect(()=>
    {
        let fetchEmployees   = async()=>
        {
            try
            {
                let response = await axios.post("http://localhost:5000/api/getemployeebycompany",
                    {
                        CompanyId : companyData._id

                    }
                )
                console.log(response.data.data)


                const formattedData = response.data.data.map(emp=>({
                    ...emp,
                     EmployeeName: emp.EmployeeName || 'Unnamed',
                     _id: emp._id
                }
                ))

                setEmployees(formattedData)
    
            }

            catch(error)
            {
                 console.error("Failed to fetch employees:", error);
            }
        }

        if (companyData?._id) 
            {
                fetchEmployees()
            
        }
    },[companyData])

useEffect(() => {
  const fetchleave = async () => {
    if (!EmployeeId || !companyData?._id) {
      setLeaveData([]); // Clear table if no selection
      return;
    }

    const month = selectMonth?.format('MM');
    const year = selectYear?.format('YYYY');

    try {
      if (month && year) {
        // Fetch by month and year
        const response = await axios.post(
          "http://localhost:5000/api/fetchleavebymonthandyear",

          {
            EmployeeID: EmployeeId,
            month,
            year,
            CompanyId: companyData._id,
          }
        );
        setLeaveData(response.data.data);
      } else {
        // Fetch all attendance for employee
        const response = await axios.post(
          "http://localhost:5000/api/fetchleavebycompanyid",
          {
            EmployeeID: EmployeeId,
            CompanyId: companyData._id,
          }
        );
        setLeaveData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      setLeaveData([]); // Clear on error
    }
  };

  fetchleave();
}, [EmployeeId, selectMonth, selectYear, companyData?._id]);



const columns = 
[
        {
      field: 'EmployeeID',
      headerName: 'Employee Name',
      flex: 1,
      renderCell: (params) => {
        return params.row?.EmployeeID?.EmployeeName || 'N/A';
      }
    },
      {
          field: 'FromDate',
          headerName: 'From Date',
          flex: 1,
          renderCell: (params) => dayjs(params.row.FromDate).format('YYYY-MM-DD')
        },
         {
          field: 'ToDate',
          headerName: 'To Date',
          flex: 1,
          renderCell: (params) => dayjs(params.row.ToDate).format('YYYY-MM-DD')
        },
       
       
    
]
const rows = leaveData.map((entry) => ({
    id: entry._id,
    ...entry
  }));
// const rows1 = fetchEmployeesByMonth.map((entry) => ({
//     id: entry._id,
//     ...entry
//   }));


  return (
   <>
       <Box sx={{ padding: 2 }}>
  
     <Typography variant="h5" fontWeight="bold" mb={2}>
        Leave Tracking
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
           <DatePicker
      value={selectMonth}
      onChange={(newValue) => setSelectedMonth(newValue)}
       views={[ 'month']}
      dateFormat="MM"
      showMonthYearPicker
      placeholderText="Select month "
      isClearable

    />
    <DatePicker
      value={selectYear}
      onChange={(newValue) => setSelectedYear(newValue)}
       views={['year']}
      dateFormat="yyyy"
      showMonthYearPicker
      placeholderText="Select  year"
      isClearable
    />
    </LocalizationProvider>

           <Autocomplete
              options={employees}
              getOptionLabel={(option) => option.EmployeeName || ''}
              value={employees.find(emp => emp._id === EmployeeId) || null}
              onChange={(event, newValue) => {
                console.log(newValue)
                setEmployeeId(newValue ? newValue._id : '');
              }}
              renderInput={(params) => <TextField {...params} label="Select Employee" fullWidth />}
            />

        <Button variant="contained" sx={{  backgroundColor: '#2980b9'}}onClick={() => openAddDialog()}>
          Add Leave
        </Button>
      </Box>
    
   
    <Box sx={{ height: 500, backgroundColor: 'white' }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} />
      </Box>

   </Box>
<Dialog open={openDialog} onClose={closeAddDialog} maxWidth="sm" fullWidth >

<Box component="form" onSubmit={submitLeave} 
sx={{p:3, display:'flex', flexDirection:'column', gap:2, width:'500px'}}>

<DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            Add Leave
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }} >



     {/* <FormControl size="small">
      <Select name="EmployeeId" required defaultValue="" displayEmpty>
        <MenuItem disabled value="">Select EMployee</MenuItem>
        {EmployeeId.map((emp) => (
          <MenuItem key={emp._id} value={emp._id}>{emp.EmployeeName}</MenuItem>
        ))}
      </Select>
    </FormControl> */}
     <Autocomplete
              options={employees}
              getOptionLabel={(option) => option.EmployeeName || ''}
              value={employees.find(emp => emp._id === EmployeeId) || null}
              onChange={(event, newValue) => {
                setEmployeeId(newValue ? newValue._id : '');
              }}
              renderInput={(params) => <TextField {...params} label="Select Employee" fullWidth />}
            />

<LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    label="From Date"
    value={fromDate}
    onChange={(newValue) => setFromDate(newValue)}
    renderInput={(params) => <TextField {...params} name="FromDate" required />}
  />
  <DatePicker
    label="To Date"
    value={toDate}
    onChange={(newValue) => setToDate(newValue)}
    renderInput={(params) => <TextField {...params} name="ToDate" required />}
  />
</LocalizationProvider>

            
            <TextField label="Leave description" 
            name='LeaveDescription' 
            type="text" 
            required />
            

            {/* <TextField label="Leave Type" 
            name='LeaveType' 
            type="text" 
            required /> */}
            <FormControl fullWidth>
              <InputLabel id="leave-type-label">Leave Type</InputLabel>
  <Select labelId="leave-type-label" name="LeaveType" label="Leave Type"  defaultValue="" placeholderText="select leave type" required>
   {/* <MenuItem value="" disabled>
      Select Leave Type
    </MenuItem> */}
    <MenuItem value="paid">Paid</MenuItem>
    <MenuItem value="sick">Sick</MenuItem>
    <MenuItem value="casual">Casual</MenuItem>
  </Select>
</FormControl>

            
          <FormControl>
      <FormLabel>Leave Status</FormLabel>
      <RadioGroup row name="LeaveStatus">
        <FormControlLabel value="pending" control={<Radio size="small" />} label="Pending" />
        <FormControlLabel value="approved" control={<Radio size="small" />} label="Approved" />
        <FormControlLabel value="reject" control={<Radio size="small" />} label="Reject" />
      </RadioGroup>
    </FormControl>
</DialogContent>

 <DialogActions>
            <Button  type="submit" variant='contained' color='primary'>Submit</Button>
            <Button onClick={() => closeAddDialog()} variant='contained' color='error'>Close</Button>

          </DialogActions>
</Box>



</Dialog>





   </>
  )
}

export default Leave