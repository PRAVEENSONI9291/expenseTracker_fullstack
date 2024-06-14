window.addEventListener("DOMContentLoaded", fetchData);

var form= document.getElementById('inputform');
var list= document.getElementById('list');

form.addEventListener('submit', AddValues);
list.addEventListener('click',deletevalue);
list.addEventListener('click',editvalue);

let url= "http://localhost:3000/expenseTracker";

async function fetchData(){

    try {
        let res= await axios.get(url);
    res.data.forEach(val=>{
        appendLiItem(val.amount, val.description, val.category);
    })
        
    } catch (error) {
        console.log(error);
        
    }
    
    
    

}

async function AddValues(e){
    e.preventDefault();

    if(document.getElementById('expense').value=="" || document.getElementById('description').value=="" || document.getElementById('category').selectedIndex==0 )
    {
        alert("Please Enter all the fields");
        return;
    }
   
    let amount= document.getElementById('expense').value;
    let description= document.getElementById('description').value;
    let categoryvalue= document.getElementById('category').value;
    let category= document.getElementById('category').options[categoryvalue].text;


    

    let obj= {
        amount: amount,
        description: description,
        category:  category
    }
    
    // var objstring= JSON.stringify(obj);
    // // console.log(objstring);

    // localStorage.setItem(objstring,objstring);

    try {

    await axios.post(url, obj);
    
        
    } catch (error) {
        console.log(error);
        
    }


    appendLiItem(amount, description,category);    
 
    form.reset();
  
}

function appendLiItem(amount,description,category){
    let obj= {
        amount: amount,
        description: description,
        category:  category
    }
    
    var objstring= JSON.stringify(obj);
    let newelement= document.createElement('li');
    newelement.className= "list-group-item";
    newelement.id= objstring;


    newelement.innerHTML= ` <span>Amount:${amount} / Description: ${description} / Category: ${category}</span>
                            <input type="button" class="btn btn-danger btn-sm delete float-end  me-1" value="X">
                            <input type="button" class="btn btn-success btn-sm edit float-end me-1" value="Edit">`;


    list.appendChild(newelement);
     
}

async function deletevalue(e){

   if( e.target.classList.contains('delete'))
    {
       
        let li= e.target.parentElement;
        // console.log(typeof(li.id));
        list.removeChild(li);

    
        let liObj= JSON.parse(li.id);
        // console.log(liObj);
        // console.log(typeof(liObj));

        try {
            const resp = await axios.get(url);
            const item = resp.data.find(values => values.name === liObj.name && values.description === liObj.description && values.category === liObj.category  );
            
            if (item) await axios.delete(`${url}/${item.id}`);
        } catch (err) {
            console.log("error", err);
        }


        // localStorage.removeItem(li.id);
        
    }
}

async function editvalue(e){

    if( e.target.classList.contains('edit'))
     {

        let li= e.target.parentElement;
        // let objstring1= localStorage.getItem(li.id);
        let liObj= JSON.parse(li.id);

        let catObj= document.getElementById('category').options;
         
        let catIndex=0;

        for(let i=0;i<catObj.length;i++)
            { 
                if(catObj[i].innerHTML===liObj.category)
                    {
                        catIndex=i;
                    }

            }
        

        document.getElementById('expense').value= liObj.amount;
        document.getElementById('description').value= liObj.description;
        document.getElementById('category').selectedIndex= catIndex;

        // console.log(document.getElementById('category').options[2].innerHTML);
        



        try {
            const resp = await axios.get(url);
            const item = resp.data.find(values => values.name === liObj.name && values.description === liObj.description && values.category === liObj.category  );
            
            if (item) await axios.delete(`${url}/${item.id}`);
        } catch (err) {
            console.log("error", err);
        }


        // localStorage.removeItem(li.id);
        list.removeChild(li);       
     }
 }