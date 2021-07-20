
//Selecting Elements
const clear=document.querySelector(".clear");
const dateElement=document.getElementById("date");
const list=document.getElementById("list");
const input=document.getElementById("input");
  
// Classes Names
const CHECK="fa-check-circle";
const UNCHECK ="fa-circle-thin";
const LINE_THROUGH="lineThrough";

//variables create

let LIST,id;

// get item from localstorage

let data=localStorage.getItem("TODO");

//check if data is not empty  
if(data){
    LIST = JSON.parse(data);
    id= LIST.length;  //set the id to the last one in the list
    loadList(LIST);  //load the list to the UI
}
else{
    //if data is not empty
    LIST=[]
    , id=0;
}

//load items to UI
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//CLEAR THE LOCAL STORAGE
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})



//show today's date
const options={weekday:"long", month:"short", day:"numeric"};
const today=new Date();  
dateElement.innerHTML=today.toLocaleDateString("en-US",options);



//add to-do funtion
function addToDo(toDo,id, done,trash){
    if(trash) {return; } 
    const DONE= done ? CHECK : UNCHECK;
    const LINE= done ?  LINE_THROUGH : "";
        const item=` <li class="item">
                            <i class="fa ${DONE} co" aria-hidden="true"  job="complete" id="${id}"></i>
                            <p class="text ${LINE}"> ${toDo}</p>
                            <i class="fa fa-trash-o de" aria-hidden="true" job="delete" id="${id}"></i>
                            </li>
                            `;

    const position= "beforeend";

    list.insertAdjacentHTML(position, item);
}

// add an item to the list using enter key
document.addEventListener("keyup", function(event){
    if(event.keyCode==13){
        const toDo=input.value;

        //if the input is not empty
        if(toDo){
            addToDo(toDo,id,false,false);

            //to push the list item or array
            LIST.push({
                name:toDo,
                id:id,
                done:false,
                trash:false

            });

            //add item to localstorage(THIS CODE SHOULD BE ADDED WHERE THE LIST ARRAY IS UPDATED)
localStorage.setItem("TODO", JSON.stringify(LIST));
    
        id++;
    }
         input.value="";

    }
});




//when user clicks complete button

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    //update our list

    LIST[element.id].done ? false: true;

}


//remove the item button

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash=true;
}

//target the items that are created dynamically

list.addEventListener("click", function(event){
    const element = event.target; //return the clicked element inside the list
    const elementJob= element.attributes.job.value; // complete or delete

    if (elementJob == "complete"){
        completeToDo(element);
    }
    else if(elementJob == "delete"){  
            removeToDo(element);
        }


        //add item to localstorage (THIS CODE SHOULD BE ADDED WHERE THE LIST ARRAY IS UPDATED)
localStorage.setItem("TODO", JSON.stringify(LIST));
   
});




