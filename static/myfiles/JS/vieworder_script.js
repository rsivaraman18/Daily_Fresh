//alert("hiii siva" )
let GetallordersApi= "http://127.0.0.1:5000/getallorders";
url = GetallordersApi
fetch(url).then((rawdata ) => {
    //console.log(rawdata)                //this is in Json data ,so convert to Javascript Object 
    return rawdata.json( );
    
})
.then( (condata) => {
    let Displaydata = " ";
    condata.map( (myvalues) =>{
        Displaydata += `<tr  >           
                            <td> ${myvalues.order_id}   </td>
                            <td> ${myvalues.customer_name} </td>
                            <td> ${myvalues.grand_total} </td>
                            <td> ${myvalues.order_time} </td>
                            <td> <a href="http://127.0.0.1:5000/vieworderdetails" onclick="passvalues(this)" id=${myvalues.order_id} class="stat btn btn-warning" > View Order Details</a> </td>
                            </td>
                        </tr>`
        document.getElementById("tbody").innerHTML = Displaydata;
        
        
    })
})
.catch( (err) => {
    console.log(err)
});


/**  *************************************************** */

/**      pass value  */

function passvalues(x){
    let newid = x['id']
    console.log(newid)
    localStorage.setItem("myidvalue",newid);
    

        
}
