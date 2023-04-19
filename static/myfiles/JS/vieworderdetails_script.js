myid =localStorage.getItem("myidvalue")
let GetallordersApi= "http://127.0.0.1:5000/getorderdetails/" +myid
url = GetallordersApi
fetch(url).then((rawdata ) => {
    return rawdata.json( );   
})
.then( (condata) => {
    let Displaydata = " ";
    condata.map( (myvalues) =>{
        Displaydata += `<tr>
                            <td> ${myvalues.order_id}   </td>
                            <td> ${myvalues.Product_id} </td>
                            <td> ${myvalues.Product_name} </td>
                            <td> ${myvalues.Product_unit} </td>
                            <td> ${myvalues.Quantity} </td>
                            <td> ${myvalues.Total} </td>
                            
                        </tr>`
        document.getElementById("tbody").innerHTML = Displaydata;
        
        
    })
})


