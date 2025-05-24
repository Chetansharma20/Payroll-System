// // EmployeeDocuments.js
// import React from 'react';
// import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// const styles = StyleSheet.create({
//   page: {
//     padding: 40,
//     fontSize: 12,
//     fontFamily: 'Times-Roman',
//     color: '#444444',
//   },
//   header: {
//     fontSize: 18,
//     textAlign: 'center',
//     marginBottom: 20,
//     textTransform: 'uppercase',
//     color: '#333333',
//   },
//   content: {
//     marginVertical: 20,
//     lineHeight: 1.5,
//   },
//   signature: {
//     marginTop: 60,
//     textAlign: 'right',
//     marginRight: 40,
//   },
// });

// const EmployeeDocuments = () => (
//   <Document>
//     <Page style={styles.page}>
//       <Text style={styles.header}>Bonafide Certificate</Text>
//       <View style={styles.content}>
//         <Text>
//           This is to certify that <Text style={{ fontWeight: 'bold' }}>John Doe</Text>, S/o or D/o{' '}
//           <Text style={{ fontWeight: 'bold' }}>Jane Doe</Text> is a bonafide student
//           of our institution.
//         </Text>
//         <Text>
//           He/She is studying in <Text style={{ fontWeight: 'bold' }}>3rd</Text> year of{' '}
//           <Text style={{ fontWeight: 'bold' }}>Computer Science</Text> during the academic year{' '}
//           <Text style={{ fontWeight: 'bold' }}>2024–2025</Text>.
//         </Text>
//         <Text>This certificate is issued on May 21, 2025 for official purposes.</Text>
//       </View>
//       <Text style={styles.signature}>Principal / Head of Institution</Text>
//     </Page>
//   </Document>
// );

// export default EmployeeDocuments;

import React from 'react'

const EmployeeDocuments = () => {
  return (
    <div>EmployeeDocuments</div>
  )
}

export default EmployeeDocuments