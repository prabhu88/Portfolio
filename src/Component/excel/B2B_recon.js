import React, { useState, useEffect } from 'react'
import exportFromJSON from 'export-from-json'
import {
    Container, FormControl, FormLabel, Input, TextField, Button, FormGroup, Box, Table,
    TableHead, TableBody, TableRow, TableCell, Card, CardContent,
} from '@material-ui/core'
import * as XLSX from "xlsx";
import './B2b_recon.scss'
import Matched from './report/Matched'
import Edata from './report/Books - Template.xlsx'

const B2B_recon = () => {
    const [excel, setExcel] = useState("")
    const [jsonF, setJsonF] = useState("")
    const [Books, setJsonBooks] = useState([])
    const [B2Bjson, setB2bjson] = useState([])
    const [isMatched, setMatched] = useState(false)
    const [MatchedData, setMatchedData] = useState([])
    const [Matched_total, setMatched_total] = useState(0)
    const [overAll, setOverAll] = useState([])
    const [rec, setRec] = useState(false)
    const excelChange = (e) => {
        setExcel(e.target.files[0])
        // var f = e.target.files[0]
        // const reader = new FileReader();
        // const rABS = !!reader.readAsBinaryString;
        // reader.onload = (e) => {
        //     const bstr = e.target.result;
        //     const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true });
        //     const wsname = wb.SheetNames[0];
        //     const ws = wb.Sheets[wsname];
        //     const data = XLSX.utils.sheet_to_json(ws);
        //     setJsonBooks(data)
        // }
        // if (rABS) {
        //     reader.readAsBinaryString(f);
        // } else {
        //     reader.readAsArrayBuffer(f);
        // }
    }
    const jsonChange = (e) => {
        setJsonF(e.target.files[0])
        var f = e.target.files[0]
        const fileReader = new FileReader()
        fileReader.onload = e => {
            setB2bjson(JSON.parse(e.target.result))
        }
        fileReader.readAsText(f, "UTF-8")
    }

    const MatchDownload = () => {
        const fileName = 'B2bMatched'
        const exportType = 'xls'
        let data = overAll.b2b_matched
        exportFromJSON({ data, fileName, exportType })
    }

    const onlyBooksDownload = () => {
        const fileName = 'Only in Books '
        const exportType = 'xls'
        let data = overAll.books_Notmatched
        exportFromJSON({ data, fileName, exportType })
    }

    const onlygstr3b = () => {
        const fileName = 'only in gstr 3b'
        const exportType = 'xls'
        let data = overAll.b2b_Notmatched
        exportFromJSON({ data, fileName, exportType })
    }

    const ProcessData = async () => {
        try {
            var GSTR_3B = []
            var GSTR_3B_Matched = []
            var GSTR_3B_NotMatched = []
            var Books_Inv_Macthed = []
            var NotMatched_BookRecords = []
            ReadExcel()
            ReadJson()
            let books_record = Books//JSON.parse(Books)
            let Json_record = B2Bjson//JSON.parse(B2Bjson)  
            let json_inv_data = Json_record.data
            let docdata = json_inv_data.docdata != undefined ? json_inv_data.docdata : []
            let b2b = docdata.b2b != undefined ? docdata.b2b : [] //Json_record.data.docdata.b2b != undefined ? Json_record.data.docdata.b2b : [] 
            b2b.map(({ inv, ctin, supfildt, supprd, trdnm }, i) => {
                inv.map(({ inum, val, itcavl, rev, typ, dt, items }, j) => {
                    let INV_3b = []
                    INV_3b.length = 0
                    INV_3b['gstin'] = ctin
                    INV_3b['name'] = trdnm
                    INV_3b['supply_period'] = supprd
                    INV_3b['filled_date'] = supfildt
                    INV_3b['inv_no'] = inum
                    INV_3b['inv_date'] = dt
                    INV_3b['inv_itc'] = itcavl
                    INV_3b['inv_rev'] = rev
                    INV_3b['inv_typ'] = typ
                    INV_3b['inv_amount'] = val
                    var local_cgst = 0
                    var local_sgst = 0
                    var local_igst = 0
                    var local_cess = 0
                    var local_taxval = 0
                    items.forEach((e) => {
                        local_cgst += e.cgst ? e.cgst : 0
                        local_sgst += e.sgst ? e.sgst : 0
                        local_igst += e.cess ? e.cess : 0
                        local_cess += e.cess ? e.cess : 0
                        local_taxval += e.txval ? e.txval : 0
                    })
                    INV_3b['cgst'] = local_cgst
                    INV_3b['sgst'] = local_sgst
                    INV_3b['igst'] = local_igst
                    INV_3b['cess'] = local_cess
                    INV_3b['inv_taxval'] = local_taxval
                    GSTR_3B.push(INV_3b)
                    //GSTR_3B_NotMatched.push(INV_3b)
                    books_record.forEach((data) => {
                        let gstin = (data.gstin).trim()
                        if (gstin === ctin && inum === (data.inv).trim()) {
                            //GSTR_3B_NotMatched.pop()
                            console.log('cgst = '+local_cgst + " Books cgst"+data.cgst)
                            let InvM_3b = []
                            InvM_3b['gstin'] = ctin
                            InvM_3b['name'] = trdnm
                            InvM_3b['supply_period'] = supprd
                            InvM_3b['filled_date'] = supfildt
                            InvM_3b['inv_no'] = inum
                            InvM_3b['inv_date'] = dt
                            InvM_3b['inv_itc'] = itcavl
                            InvM_3b['inv_rev'] = rev
                            InvM_3b['inv_typ'] = typ
                            InvM_3b['inv_amount'] = val
                            InvM_3b['cgst'] = local_cgst
                            InvM_3b['sgst'] = local_sgst
                            InvM_3b['igst'] = local_igst
                            InvM_3b['cess'] = local_cess
                            InvM_3b['inv_taxval'] = local_taxval
                            InvM_3b['Books_inv'] = data.inv
                            InvM_3b['Books_inv_date'] = data.inv_date
                            InvM_3b['Books_inv_total'] = data.inv_total
                            InvM_3b['Books_inv_cgst'] = data.cgst
                            GSTR_3B_Matched.push(InvM_3b)
                            Books_Inv_Macthed.push(data)
                        }
                    })
                })
            })
            var FinalGSTR3B = GSTR_3B.filter(function(elem, pos) {
                return GSTR_3B.indexOf(elem) == pos;
            });
            GSTR_3B_NotMatched = arr_diff1(GSTR_3B,GSTR_3B_Matched)            
            NotMatched_BookRecords = arr_diff(books_record, Books_Inv_Macthed)
            let Consolidate = []
            Consolidate['b2b_matched'] = GSTR_3B_Matched
            Consolidate['b2b_Notmatched'] = GSTR_3B_NotMatched
            Consolidate['b2b_total'] = FinalGSTR3B.length
            Consolidate['gstr3b_total'] = FinalGSTR3B.length
            Consolidate['books_total'] = books_record
            Consolidate['books_matched'] = Books_Inv_Macthed
            Consolidate['books_Notmatched'] = NotMatched_BookRecords
            setOverAll(Consolidate);
            console.log(overAll)
            setRec(true)
        }
        catch (error) {
            console.log(error)
        }
    }

    const MatchData = async () => {
        try {
            let cgst = 0
            let sgst = 0
            let igst = 0
            let cess = 0
            let Matched_BookRecords = []
            let NotMatched_BookRecords = []
            let Matched_JsonRecords = []
            let NotMatched_JsonRecords = []
            let JsonTotal = []
            let json_invCount = 0
            let books_invCount = 0
            let json_matchedCount = 0
            let books_matchedCount = 0
            ReadExcel()
            ReadJson()
            // if (Books.length == 0) {ReadExcel()}
            // if (B2Bjson.length == 0) { ReadJson() }
            let books_record = Books//JSON.parse(Books)
            let Json_record = B2Bjson//JSON.parse(B2Bjson)  
            let json_inv_data = Json_record.data
            let docdata = json_inv_data.docdata != undefined ? json_inv_data.docdata : []
            let b2b = docdata.b2b != undefined ? docdata.b2b : [] //Json_record.data.docdata.b2b != undefined ? Json_record.data.docdata.b2b : [] 
            books_invCount = books_record.length
            b2b.map(({ inv, ctin, supfildt, supprd, trdnm }, i) => {
                let Matched_Book = []
                let Matched_Json = []
                Matched_Json['name'] = trdnm
                Matched_Json['gstin'] = ctin
                Matched_Json['filled_date'] = supfildt
                Matched_Json['sullpy_period'] = supprd
                Matched_Book = books_record.filter((data) => {
                    let gstin = (data.gstin).trim()
                    if (gstin == ctin) {
                        inv.map(({ inum, val, dt, items }, j) => {
                            json_invCount++
                            Matched_Json['invoice_no'] = inum
                            Matched_Json['invoice_date'] = dt
                            Matched_Json['invoice_value'] = val
                            let local_cgst = 0
                            let local_sgst = 0
                            let local_igst = 0
                            let local_cess = 0
                            items.map(e => {
                                local_cgst += e.cgst ? e.cgst : 0
                                local_sgst += e.sgst ? e.sgst : 0
                                local_igst += e.cess ? e.cess : 0
                                local_cess += e.cess ? e.cess : 0
                            })
                            Matched_Json['cgst'] = local_cgst
                            Matched_Json['sgst'] = local_sgst
                            Matched_Json['igst'] = local_igst
                            Matched_Json['cess'] = local_cess
                            cgst += local_cgst
                            sgst += local_sgst
                            igst += local_igst
                            cess += local_cess
                            if (inum == (data.inv).trim()) {
                                Matched_Json['Books_invNo'] = data.inv
                                Matched_Json['Books_invDate'] = data.inv_date
                                Matched_Json['Books_invAmount'] = data.inv_total
                                Matched_Json['Difference'] = val - data.inv_total
                                Matched_JsonRecords.push(Matched_Json)
                                Matched_BookRecords.push(data)
                                return data
                            }
                            else {
                                NotMatched_JsonRecords.push(Matched_Json)
                            }

                        })
                    }
                })
            })

            NotMatched_BookRecords = arr_diff(books_record, Matched_BookRecords)
            let Consolidate = []
            Consolidate['b2b_matched'] = Matched_JsonRecords
            Consolidate['b2b_Notmatched'] = NotMatched_JsonRecords
            Consolidate['b2b_total'] = json_invCount
            Consolidate['books_total'] = books_record
            Consolidate['books_matched'] = Matched_BookRecords
            Consolidate['books_Notmatched'] = NotMatched_BookRecords
            setOverAll(Consolidate);
            console.log(overAll)
            setRec(true)
        }
        catch (error) {
            console.log(error)
        }
    }
    const arr_diff1 = (x, y) => {
        let a1 = x
        let a2 = y        
        let aa1 = []
        for (var i = 0; i < a1.length; i++) {            
            if (a1[i].inv_no) {                
                if (a1[i].inv_no != '' || a1[i].inv_no != undefined) {
                    let inv = a1[i].inv_no                    
                    for (var k = 0; k < a2.length; k++) {                        
                        if (inv === a2[k].inv_no) {                            
                            delete a1[i]
                        }
                    }
                }
            }
        }
        
        for (var l = 0; l < a1.length; l++) {
            if (a1[l] != undefined) {
                if (a1[l].inv_no != undefined) {
                    aa1.push(a1[l]);
                }
            }
        }     
        var newArray = aa1.filter(function(elem, pos) {
            return aa1.indexOf(elem) == pos;
        });   
        console.log(newArray)
        return newArray;
    }
    const arr_diff = (x, y) => {
        let a1 = x
        let a2 = y
        let aa1 = []
        for (var i = 0; i < a1.length; i++) {
            if (a1[i].inv) {
                if (a1[i].inv != '' || a1[i].inv != undefined) {
                    let inv = a1[i].inv
                    for (var k = 0; k < a2.length; k++) {
                        if (inv == a2[k].inv) {
                            delete a1[i]
                        }
                    }
                }
            }
        }        
        for (var l = 0; l < a1.length; l++) {
            if (a1[l] != undefined) {
                if (a1[l].inv != undefined) {
                    aa1.push(a1[l]);
                }
            }
        }
        return aa1;
    }

    const ReadExcel = () => {
        var f = excel
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (e) => {
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws);
            setJsonBooks(data)
        }
        if (rABS) {
            reader.readAsBinaryString(f);
        } else {
            reader.readAsArrayBuffer(f);
        }

    }

    const ReadJson = () => {
        var f = jsonF
        const fileReader = new FileReader()
        fileReader.readAsText(jsonF, "UTF-8")
        fileReader.onload = e => {

            setB2bjson(JSON.parse(e.target.result))
        }
    }

    return (
        <div>
            <Container className="b2b">
                <Card className="b2b_card" sx={{
                    width: 400,
                    height: 300,
                }}>
                    <CardContent>
                        <Box component="form" autoComplete="off" className="input_form" >
                        <h4>GSTR 2B - Reconciliation</h4>
                        <br/>
                            <FormGroup>
                                <FormLabel >Please Download Books Template <a href='/Books - Template.xlsx' target="_blank" >Here</a></FormLabel>
                                <FormLabel>Select Books (Excel File)</FormLabel>
                                <TextField
                                    id="file_Excel"
                                    type="file"

                                    variant="standard"
                                    onChange={excelChange}
                                />
                            </FormGroup>
                            <br />
                            <br />
                            <FormGroup>
                                <FormLabel>Select GSTR 2B (Json File)</FormLabel>
                                <TextField
                                    id="file_Json"
                                    type="file"
                                    variant="standard"
                                    onChange={jsonChange}
                                />
                            </FormGroup>
                            <br />
                            <br />
                            <FormGroup>
                                <Button variant="outlined" onClick={ProcessData}  > Process Data</Button> &nbsp; &nbsp; &nbsp;
                            </FormGroup>
                        </Box>
                    </CardContent>
                </Card>
                <Card className="b2b_card" sx={{
                    width: 400,
                    height: 300,
                }}>
                    <CardContent>
                        <Box component="form" className="btn_groups" autoComplete="off" >
                            <Button variant="outlined" onClick={MatchDownload}  > Matched Data ({rec == true ?
                                overAll.b2b_matched.length
                                : null}) </Button> &nbsp; &nbsp; &nbsp;
                            <Button variant="outlined" onClick={onlyBooksDownload}  > Books Not Matched ({rec == true ?
                                overAll.books_Notmatched.length : null})</Button> &nbsp; &nbsp; &nbsp;
                            <Button variant="outlined" onClick={onlygstr3b}  > GSTR 3B Not Matched ({rec == true ? overAll.b2b_Notmatched.length : null})</Button> &nbsp; &nbsp; &nbsp;
                            <br /><br />
                            Total Records in B2b {rec == true ? overAll.b2b_total : 0} <br />
                            Total Records in Books {rec == true ? overAll.books_total.length : 0} <br />
                        </Box>
                    </CardContent>
                </Card>
            </Container>
            <Container>
                {
                    isMatched === true ?
                        <Matched data={MatchedData} />
                        : null

                }
            </Container>
        </div>

    )
}

export default B2B_recon;
