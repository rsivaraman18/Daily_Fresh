//alert ('siva' ) 

// To Extract items from API link

let ProductApiUrl = "http://127.0.0.1:5000/allproducts";
url = 
url = ProductApiUrl
fetch(url).then((rawdata ) => {
    //console.log(rawdata)                //this is in Json data ,so convert to Javascript Object 
    return rawdata.json( );
    
})
.then( (condata) => {
    let Displaydata = " ";
    condata.map( (myvalues) =>{
        Displaydata += `<tr  >
                            <td> ${myvalues.prod_id}   </td>
                            <td> ${myvalues.prod_name} </td>
                            <td> ${myvalues.prod_price} </td>
                            <td> ${myvalues.prod_unit} </td>
                            <td> <input type="submit" value="Delete" id=${myvalues.prod_id} name=${myvalues.prod_name} class="btn btn-danger btn-lg"  onclick="del(this )"> </td>   
                        </tr>`
        document.getElementById("tbody").innerHTML = Displaydata;
        
        
    })
})
.catch( (err) => {
    console.log(err)
});





/*  ************************************         Delete Function     *****************************       */

function del(x){
    s_name = x.name
    s_id   = x.id
    document.getElementById("display-action").innerText= "selected Id is : " +s_id  +" selected name is :  " +s_name 
    
    //Delete using APILink
    let mydata = { "Id" :s_id , "Name" : s_name }
    let url = "http://127.0.0.1:5000/delete/"+s_id
    let options =   {
                        method : "POST" ,
                        headers :   {
                                    "Content-Type" : "application/json"
                                    } ,
                        body : JSON.stringify(mydata)
                    }
    
    console.log(url)
    
    let isdelete = confirm("Are you sure you want to delete " +x.name)
    if (isdelete ==true)
        {
            fetch(url,options)
            .then((result) => {
                console.log(result)
            })
            
        }
    else{console.log("bye",isdelete)}
    
    location.reload();
    
};


/* ********************************* Insert Function ************************************  */

function insert(){
    console.log("ready to insert ")
    const formEl  = document.forms.myform
    const Pname1  = document.getElementById('pname').value;
    const Pname   = Pname1.charAt(0).toUpperCase() + Pname1.slice(1);
    const Punit   = document.getElementById('punit').value;
    const Pprice  = document.getElementById('pprice').value;
    const newdata = {
                        "pname"  : Pname,
                        "punit"  : Punit,
                        "pprice" : Pprice
                    }

    let mydata = newdata
    let url = "http://127.0.0.1:5000/insert"
    let options =   {
                        method : "POST" ,
                        headers :   {
                                    "Content-Type" : "application/json"
                                    } ,
                        body : JSON.stringify(mydata)
                    }
    
    //console.log(url)
       
    fetch(url,options)
    .then((result) => {
    console.log(result)
    })
    alert("New product "+Pname +"Inserted Successfully" )
    //location.reload();            
    
    
    /*   // this prevent refreshing of page due to form submit...To see console use this 
    const handlesubmit = (myevent) =>{
        myevent.preventDefault();     
        console.log(Pname)
        console.log(Punit)
        console.log(Pprice)
        console.log(newdata)
        
    };


    formEl.addEventListener("submit",handlesubmit);
     */
    
    }
    

/* ********************** Insert Function Ends here ********************  */   

/* ********************** Update Function Starts here ********************  */  


function update(){
    console.log("ready to Update ")
    const formEl = document.forms.updateform
    const Uid    = document.getElementById('uid').value;
    const Uname1 = document.getElementById('uname').value;
    const Uname  = Uname1.charAt(0).toUpperCase() + Uname1.slice(1);
    const Uunit  = document.getElementById('uunit').value;
    const Uprice = document.getElementById('uprice').value;
    const newdata = {
                        "uid"    : Uid,
                        "uname"  : Uname,
                        "uunit"  : Uunit,
                        "uprice" : Uprice
                    }

    let mydata = newdata
    let url = "http://127.0.0.1:5000/update"
    let options =   {
                        method : "PUT" ,        
                        headers :   {
                                    "Content-Type" : "application/json"
                                    } ,
                        body : JSON.stringify(mydata)
                    }
    
    //console.log(url)
       
    fetch(url,options)
    .then((result) => {
    console.log(result)
    })
    alert("Our product "+Uname +" Updated Successfully" )

}



/* ********************** Update Function Ends here ********************  */   










/* ********************** Update Function Ends here ********************  */   


    

    



