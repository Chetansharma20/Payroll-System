import { Page, StyleSheet, Text, View, Document } from '@react-pdf/renderer'
import React from 'react'


const SalarySlip = ({ data }) => {

    const styles = StyleSheet.create({
        page: {
            padding: 30,
            fontSize: 12,
            fontFamily: 'Helvetica',
        },
        title: {
            fontSize: 16,
            marginBottom: 10,
            textAlign: 'center',
            fontWeight: 'bold',
        },
        sectionTitle: {
            marginTop: 15,
            marginBottom: 5,
            fontWeight: 'bold',
        },
        table: {
            display: "table",
            width: "auto",
            borderStyle: "solid",
            borderColor: "#000",
            borderWidth: 1,
            marginBottom: 10,
        },
        tableRow: {
            flexDirection: "row",
        },
        tableColHeader: {
            width: "50%",
            backgroundColor: "#e0e0e0",
            borderRightWidth: 1,
            borderBottomWidth: 1,
            padding: 4,
            fontWeight: "bold",
        },
        tableCol: {
            width: "50%",
            borderRightWidth: 1,
            borderBottomWidth: 1,
            padding: 4,
        },
        totalRow: {
            flexDirection: "row",
            marginTop: 10,
            fontWeight: "bold",
        },
        totalLabel: {
            width: "50%",
            padding: 4,
        },
        totalValue: {
            width: "50%",
            padding: 4,
            textAlign: "right",
        },
    });

    const { EmployeeID, Earnings, Deductions, totalEarnings, totalDeductions, grossSalary, netSalary } = data;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>Salary Slip</Text>
                <Text>Employee: {EmployeeID?.EmployeeName}</Text>

                <Text style={styles.sectionTitle}>Earnings</Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>Title</Text>
                        <Text style={styles.tableColHeader}>Amount</Text>
                    </View>
                    {Earnings.map((item, index) => (
                        <View style={styles.tableRow} key={index}>
                            <Text style={styles.tableCol}>{item.title}</Text>
                            <Text style={styles.tableCol}>{item.amount}</Text>
                        </View>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Deductions</Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>Title</Text>
                        <Text style={styles.tableColHeader}>Amount (₹)</Text>
                    </View>
                    {Deductions.map((item, index) => (
                        <View style={styles.tableRow} key={index}>
                            <Text style={styles.tableCol}>{item.title}</Text>
                            <Text style={styles.tableCol}>{item.amount}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Gross Salary:</Text>
                    <Text style={styles.totalValue}> {grossSalary}</Text>
                </View>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total Deductions:</Text>
                    <Text style={styles.totalValue}> {totalDeductions}</Text>
                </View>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Net Salary:</Text>
                    <Text style={styles.totalValue}> {netSalary}</Text>
                </View>
            </Page>
        </Document>
    );
};
export default SalarySlip