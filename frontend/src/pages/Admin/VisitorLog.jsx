import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import * as XLSX from 'exceljs';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

const VisitorLog = () => {
    const [visitors, setVisitors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [exportType, setExportType] = useState('EXCEL'); // Default export type

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:5555/visitors")
            .then((response) => {
                setVisitors(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const handleExportTypeChange = (event) => {
        setExportType(event.target.value);
    };

    const exportData = () => {
        if (exportType === 'CSV') {
            exportToCSV();
        } else if (exportType === 'EXCEL') {
            exportToXLSX();
        }
    };

    const exportToCSV = () => {
        const csv = Papa.unparse(visitors, {
            quotes: true,
            delimiter: ',',
            header: true,
        });
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'visitor_log.csv');
    };

    const exportToXLSX = () => {
        const workbook = new XLSX.Workbook();
        const worksheet = workbook.addWorksheet('Visitor Log');

        // Add headers
        worksheet.columns = [
            { header: 'No', key: 'no' },
            { header: 'Name', key: 'name' },
            { header: 'Organization', key: 'organization' },
            { header: 'Email', key: 'email' },
            { header: 'Date Visited', key: 'dateVisited' },
        ];

        // Add data
        visitors.forEach((visitor, index) => {
            worksheet.addRow({
                no: index + 1,
                name: visitor.name,
                organization: visitor.organization,
                email: visitor.email,
                dateVisited: new Date(visitor.createdAt).toLocaleString(),
            });
        });

        workbook.xlsx.writeBuffer().then((buffer) => {
            const data = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
            saveAs(data, 'visitor_log.xlsx');
        });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Visitor Log</h1>
            <div className="flex justify-end mb-4">
                <Select
                    value={exportType}
                    onChange={handleExportTypeChange}
                    variant="outlined"
                    className="mr-2"
                >
                    <MenuItem value="CSV">CSV</MenuItem>
                    <MenuItem value="EXCEL">Excel</MenuItem>
                </Select>
                <Button variant="contained" color="primary" onClick={exportData}>
                    Download
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table aria-label="visitor log table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="border border-slate-600 rounded-md" style={{ fontWeight: 'bold' }}>No</TableCell>
                            <TableCell className="border border-slate-600 rounded-md" style={{ fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell className="border border-slate-600 rounded-md" style={{ fontWeight: 'bold' }}>Organization</TableCell>
                            <TableCell className="border border-slate-600 rounded-md" style={{ fontWeight: 'bold' }}>Email</TableCell>
                            <TableCell className="border border-slate-600 rounded-md" style={{ fontWeight: 'bold' }}>Date Visited</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visitors.map((visitor, index) => (
                            <TableRow key={visitor._id} className="h-8">
                                <TableCell className="border border-slate-700 rounded-md text-center">
                                    {index + 1}
                                </TableCell>
                                <TableCell className="border border-slate-700 rounded-md text-center">
                                    {visitor.name}
                                </TableCell>
                                <TableCell className="border border-slate-700 rounded-md text-center">
                                    {visitor.organization}
                                </TableCell>
                                <TableCell className="border border-slate-700 rounded-md text-center">
                                    {visitor.email}
                                </TableCell>
                                <TableCell className="border border-slate-700 rounded-md text-center">
                                    {new Date(visitor.createdAt).toLocaleString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default VisitorLog;
