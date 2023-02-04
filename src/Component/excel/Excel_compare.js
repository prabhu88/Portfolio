import React, { useState,useEffect } from 'react'
import { Container, FormControl, FormLabel, Input, Button, FormGroup, Box,Table,
TableHead,TableBody,TableRow,TableCell } from '@material-ui/core'
import * as XLSX from "xlsx";
import exportFromJSON  from 'export-from-json'


const CompareFile = () => {
    const [excel, setExcel] = useState("");
    const [jsonF, setJsonF] = useState("");
    const [books, setBook] = useState("");
    const [json_2b, setJson] = useState("");

    const [isMatched, setMatched] = useState(false)
    const [MatchDate, setMatchedData] = useState([])

    const [isOnlyBook, setOnlyBook] = useState(false)
    const [OnlyBook, setOnlyBookData] = useState([])

    const excelChange = (e) => {
        setExcel(e.target.files[0])
    }
    const excelJson = (e) => {
        setJsonF(e.target.files[0])
    }

    const NotinBooks = () =>{
        let e = readExcel()
        let j = readJson()
        var books_record = JSON.parse(books)
        var Json_record = JSON.parse(json_2b)
        var b2b = Json_record.data.docdata.b2b
        var Match_GSTIN = []
        var Match_inv = []
        var only_in_B2b = []
        b2b.map(({ inv, ctin }, i) =>{
            let invoice = inv
            let Match_GSTIN_trial = []
            Match_GSTIN_trial = books_record.filter((data)=>{
                let gstin = data.gstin
                if (gstin == ctin) {
                    var BookData = data                    
                    invoice.map(({ inum, val, dt }, j) => {
                        if (inum == (BookData.inv).trim()) {
                            //console.log('invoice - present -' + inum + " -> Book Total = " + data.inv_total + "  json inv toal = " + val)
                            Match_inv.push(data)
                            return data
                        }                        
                    })
                }
            })
            Match_GSTIN.push(Match_GSTIN_trial)
        })       
        
        let diff = arr_diff(books_record,Match_inv)
        setMatched(false)
        setOnlyBook(true)
        setOnlyBookData(diff)
    }
    const arr_diff = (a1, a2) => {  
        let aa1 = []
        console.log(a1)
        for (var i = 0; i < a1.length; i++) {            
            if(a1[i].inv != '' || a1[i].inv != undefined){
                let inv = a1[i].inv
                for(var k=0; k < a2.length; k++){                
                    if(inv == a2[k].inv){
                        delete a1[i]
                    }
                }
            }
            
        }
        // console.log(a2[0].name)
        // for (var i = 0; i < a2.length; i++) {
        //     if (a[a2[i]]) {
        //         delete a[a2[i]];
        //     } else {
        //         a[a2[i]] = true;
        //     }
        // }
        console.log(a1.length)
        for (var l = 0; l < a1.length; l++) {
            if(a1[l] != undefined){
                if(a1[l].inv != undefined){
                    aa1.push(a1[l]);
                }                
            }            
        }
    
        return aa1;
    }
    const GetDiff = () => {
        let e = readExcel()
        let j = readJson()
        var books_record = JSON.parse(books)
        var Json_record = JSON.parse(json_2b)
        var b2b = Json_record.data.docdata.b2b                
        var Match_GSTIN = []
        var Match_inv = []        
        var custom = []
        b2b.map(({ inv, ctin,trdnm,supprd,supfildt }, i) => {
            let localCustom = []
            let invoice = inv
            let Match_GSTIN_trial = []
            Match_GSTIN_trial = books_record.filter((data) => {
                let gstin = data.gstin
                localCustom['Name'] = trdnm
                localCustom['GSTIN'] = ctin
                localCustom['Period'] = supprd
                localCustom['Filed_date'] = supfildt
                if (gstin == ctin) {
                    var BookData = data
                    //console.log(BookData)
                    invoice.map(({ inum, val, dt }, j) => {
                        localCustom['Invoice'] = inum
                        localCustom['Invoice_date'] = dt
                        localCustom['Invoice_amount'] = val
                        custom.push(localCustom)
                        if (inum == (BookData.inv).trim()) {                            
                            console.log('invoice - present -' + inum + " -> Book Total = " + data.inv_total + "  json inv toal = " + val)
                            Match_inv.push(data)
                            return data
                        }
                        // console.log('gstin :'+ctin)
                        // console.log('inv :'+inum)
                        // console.log('booktoal'+BookData.inv_total)
                        // console.log('invtoal'+val)
                        // console.log('invDate'+dt)

                    })

                }
                //return data.gstin.search(ctin) != 1
                //return data.gstin.search(ctin) != -1;
            })

            Match_GSTIN.push(Match_GSTIN_trial)
            // invoice.map(({inum,val,dt},j)=>{                
            //     //console.log(inum)
            //     console.log(val)
            //     Match_inv = Match_GSTIN.filter((datas)=>{
            //         let inv_ = datas.inv_total
            //         console.log(datas)        

            //         // if(inv_ != undefined){
            //         //     if(inv_.trim() == String(inum)){                                            
            //         //         return datas
            //         //     }
            //         // }

            //         //return data.gstin.search(ctin) != 1
            //         //return data.gstin.search(ctin) != -1;
            //     })
            // })


        })        
        // console.log(custom)
        setOnlyBook(false)
        setMatched(true)
        setMatchedData(Match_inv)
        if (Match_inv.count > 0) {            
            console.log(isMatched)
            console.log(MatchDate)
        }
        const fileName = 'download'  
        const exportType = 'xls'
        let custom1 = JSON.parse(custom)
        exportFromJSON({custom1,fileName,exportType})

    }

    const PrintOnlyinBooks = ({ data }) => {
        console.log(data)
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan="5">Books Records Not in GSTR-2b ({data.length} Records) </TableCell>
                    </TableRow>
                    <TableRow>
                        {/* <TableCell>Name</TableCell> */}
                        <TableCell>GSTIN</TableCell>
                        <TableCell>INV NO</TableCell>
                        <TableCell>INV DATE</TableCell>
                        <TableCell>INV TOTAL</TableCell>
                        <TableCell>IGST</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    data.map((item) => {
                        return (
                            <TableRow>
                                {/* <TableCell>{item.name }</TableCell> */}
                                <TableCell>{item.gstin}</TableCell>
                                <TableCell>{item.inv }</TableCell>
                                <TableCell>{item.inv_date }</TableCell>
                                <TableCell>{item.inv_total }</TableCell>
                                <TableCell>{item.igst }</TableCell>
                            </TableRow>
                        )
                    })
                }

                </TableBody>
            </Table>
        )
    }

    const PrintData = ({ data }) => {
        console.log(data)
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan="5">Books Matched With GSTR-2b ({data.length} Records) </TableCell>
                    </TableRow>
                    <TableRow>
                        {/* <TableCell>Name</TableCell> */}
                        <TableCell>GSTIN</TableCell>
                        <TableCell>INV NO</TableCell>
                        <TableCell>INV DATE</TableCell>
                        <TableCell>INV TOTAL</TableCell>
                        <TableCell>IGST</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    data.map((item) => {
                        return (
                            <TableRow>
                                {/* <TableCell>{item.name }</TableCell> */}
                                <TableCell>{item.gstin}</TableCell>
                                <TableCell>{item.inv }</TableCell>
                                <TableCell>{item.inv_date }</TableCell>
                                <TableCell>{item.inv_total }</TableCell>
                                <TableCell>{item.igst }</TableCell>
                            </TableRow>
                        )
                    })
                }

                </TableBody>
            </Table>
        )
    }
    const readJson = () => {
        var f = jsonF;
        var name = f.name;
        const fileReader = new FileReader();
        fileReader.readAsText(f, "UTF-8");
        fileReader.onload = e => {
            setJson(e.target.result)
        }

    }

    const readExcel = () => {
        var f = excel;
        var name = f.name;

        const reader = new FileReader();
        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: "binary" });
            const wsname = wb.SheetNames[3];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_csv(ws, { header: 7 });
            //const data = XLSX.utils.sheet_to_json(ws,{header: 7});
            var result = convertToJson(data);
            console.log(result)
            setBook(data);
        }
        reader.readAsBinaryString(f);
    }
    const convertToJson = (csv) => {
        var lines = csv.split("\n");
        var result = [];
        var headers = lines[0].split(",");
        for (var i = 1; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(",");
            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j]
            }
            result.push(obj);
        }
        return JSON.stringify(result);
    }
    return (
        <Container>
            <Box >
                <br />
                <br />
                <br />
                <FormGroup>
                    <Input type="file" placeholder="Select Excel File" onChange={excelChange} id="excelFile" label="books" />
                </FormGroup>
                <br />
                <br />
                <FormGroup>
                    <Input type="file" placeholder="Select Json File" onChange={excelJson} id="jsonFile" label="books" />
                </FormGroup>
                <br />
                <br />
                <Button variant="outlined" onClick={GetDiff} > Matched Data</Button> &nbsp; &nbsp; &nbsp;
                <Button variant="outlined" onClick={NotinBooks} > Only in Books</Button> &nbsp; &nbsp; &nbsp;
                <Button variant="outlined" onClick={GetDiff} > Not in Books</Button> &nbsp; &nbsp; &nbsp;
            </Box>
            <br />
            <br />
            <Box>
                {
                    isMatched != false ?
                        <PrintData data={MatchDate} />
                        :
                        null
                }
            </Box>
            <br />
            <br />
            <Box>
                {
                    isOnlyBook != false ?
                        <PrintOnlyinBooks data={OnlyBook} />
                        :
                        null
                }
            </Box>

        </Container>
    )

}
export default CompareFile;