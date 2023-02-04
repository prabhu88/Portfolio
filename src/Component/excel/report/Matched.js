import React,{useState,useEffect} from 'react'
import {Table,TableHead,TableBody,TableRow,TableCell} from '@material-ui/core'
const Matched = ({data}) =>{
    return(
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Trade Name</TableCell>
                    <TableCell>GSTIN</TableCell>
                    <TableCell>Invoice No</TableCell>
                    <TableCell>Invoice Date</TableCell>
                    <TableCell>Taxable Amount</TableCell>
                    <TableCell>CGST</TableCell>
                    <TableCell>SGST</TableCell>
                    <TableCell>IGST</TableCell>
                    <TableCell>CESS</TableCell>
                    <TableCell>Total Amount</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    data.map((inv)=>{
                        return(
                            <TableRow>
                                <TableCell>{inv.name}</TableCell>
                                <TableCell>{inv.gstin}</TableCell>
                                <TableCell>{inv.inv}</TableCell>
                                <TableCell>{inv.inv_date}</TableCell>
                                <TableCell>{inv.taxamount}</TableCell>
                                <TableCell>{inv.cgst}</TableCell>
                                <TableCell>{inv.sgst}</TableCell>
                                <TableCell>{inv.igst}</TableCell>
                                <TableCell>{inv.cess}</TableCell>
                                <TableCell>{inv.inv_total}</TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    )
}
export default Matched;