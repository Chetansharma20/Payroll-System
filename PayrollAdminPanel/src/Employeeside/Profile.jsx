import React from 'react';
import { useSelector } from 'react-redux';
import API_ENDPOINTS from '../config';

const Profile = () => {
  const { EmployeeData } = useSelector((state) => state.employee);
  console.log(EmployeeData);
  console.log(EmployeeData?.EmployeePhoto);
  console.log(EmployeeData?.AdhaarCard);

  if (!EmployeeData) return <div>No employee data found</div>;

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh"
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#333"
        }}
      >
        Employee Profile
      </h2>

      <div
        style={{
          display: "flex",
          gap: "30px",
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          alignItems: "flex-start",
          marginBottom: "20px"
        }}
      >
        <img
          src={API_ENDPOINTS.EMPLOYEES.PHOTO(EmployeeData.EmployeePhoto)}
          alt="Profile"
          width={120}
          height={120}
          style={{ borderRadius: "10px", objectFit: "cover" }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/120";
          }}
        />

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "15px",
            fontSize: "16px"
          }}
        >
          <li><strong>Name:</strong> {EmployeeData.EmployeeName}</li>
          <li><strong>Email:</strong> {EmployeeData.EmployeeEmail}</li>
          <li><strong>Phone No:</strong> {EmployeeData.EmployeePhoneNo}</li>
          <li><strong>Address:</strong> {EmployeeData.EmployeeAddress}</li>
          <li><strong>City:</strong> {EmployeeData.EmployeeCity}</li>
          <li><strong>State:</strong> {EmployeeData.EmployeeState}</li>
          <li><strong>Pincode:</strong> {EmployeeData.EmployeePincode}</li>
          <li><strong>Gender:</strong> {EmployeeData.EmployeeGender}</li>
          <li><strong>DOB:</strong> {new Date(EmployeeData.EmployeeDOB).toLocaleDateString()}</li>
          <li><strong>Joining Date:</strong> {new Date(EmployeeData.EmployeeJoiningDate).toLocaleDateString()}</li>
          <li><strong>Designation:</strong> {EmployeeData.EmployeeDesignation}</li>
          <li><strong>Department:</strong> {EmployeeData.EmployeeDepartment}</li>
          <li><strong>Employee Type:</strong> {EmployeeData.EmployeeType}</li>
          {/* <li><strong>Branch:</strong> {EmployeeData.BranchId?.BranchName}</li> */}
          <li><strong>Company:</strong> {EmployeeData.CompanyId?.CompanyName}</li>
        </ul>
      </div>

      {/* <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
        }}
      > */}
        {/* <h3 style={{ color: "#333", marginBottom: "15px" }}>Documents</h3>
        <ul style={{ listStyle: "none", padding: 0, fontSize: "16px", lineHeight: "1.8" }}>
          <li>
            <strong>Aadhaar Card:</strong>{" "}
            {EmployeeData.AdhaarCard ? (
              <a
                href={`http://localhost:5000/${encodeURIComponent(EmployeeData.AdhaarCard)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            ) : (
              "Not Uploaded"
            )}
          </li>
          <li>
            <strong>PAN Card:</strong>{" "}
            {EmployeeData.PanCard ? (
              <a
                href={`http://localhost:5000/${encodeURIComponent(EmployeeData.PanCard)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            ) : (
              "Not Uploaded"
            )}
          </li>
          <li>
            <strong>Pass Book:</strong>{" "}
            {EmployeeData.PassBook ? (
              <a
                href={`http://localhost:5000/${encodeURIComponent(EmployeeData.PassBook)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            ) : (
              "Not Uploaded"
            )}
          </li>
          <li>
            <strong>Degree Certificate:</strong>{" "}
            {EmployeeData.Degree ? (
              <a
                href={`http://localhost:5000/${encodeURIComponent(EmployeeData.Degree)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            ) : (
              "Not Uploaded"
            )}
          </li>
        </ul> */}
      {/* </div> */}
    </div>
  );
};

export default Profile;
