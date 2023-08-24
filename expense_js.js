let parent_ul= document.getElementById('users');
let myForm= document.getElementById('my-form');
window.addEventListener('load',renderUserList);
parent_ul.addEventListener('click',buttons);
myForm.addEventListener('submit',addUsers);
function addUsers(e)
{
    e.preventDefault();
    const data= 
    {
        expense_amount:e.target.amount.value,
        expense_description:e.target.description.value,
        expense_category:e.target.category.value
    };
    let arr=[];
    if(JSON.parse(localStorage.getItem('users'))!=null)
    {
        arr=JSON.parse(localStorage.getItem('users'));
    }
    arr.push(data);
    localStorage.setItem('users',JSON.stringify(arr));
    e.target.amount.value="";
    e.target.description.value=""
    e.target.category.value="";

    const li= displayUsers(data,arr.length);
    parent_ul.appendChild(li);
}

function displayUsers(data,index)
{
    const li= document.createElement("li");
    li.textContent=index+" ";
    const span1= document.createElement("span");
    const span2= document.createElement("span");
    const span3= document.createElement("span");
    span1.textContent= data.expense_amount+"  ";
    span2.textContent= data.expense_description+"  ";
    span3.textContent= data.expense_category+"  ";

    const edit_expense= document.createElement("button");
    edit_expense.className='edit';
    edit_expense.textContent='Edit Expense';

    const delete_expense= document.createElement("button");
    delete_expense.className='delete';
    delete_expense.textContent='Delete Expense';

    li.appendChild(span1);
    li.appendChild(span2);
    li.appendChild(span3);
    li.appendChild(edit_expense);
    li.appendChild(delete_expense);

    return li;
}

function renderUserList() {
    parent_ul.innerHTML=``;
    if(JSON.parse(localStorage.getItem('users'))!=null)
    {
        let arr = JSON.parse(localStorage.getItem('users'));
        arr.forEach(function(user,index)
        {
            let li=displayUsers(user,index+1);
            parent_ul.appendChild(li);
        });
    }
}

function buttons(e){
    // e.preventDefault();
     if(e.target.classList.contains('edit'))
     {
         let elem=e.target.parentElement; //li
         console.log(elem.textContent);
         let index= elem.textContent[0]-1;
         let arr=JSON.parse(localStorage.getItem('users'));
        // console.log(arr);
         arr.splice(index,1);
         localStorage.setItem('users',JSON.stringify(arr));
         const span=elem.getElementsByTagName('span');
         document.getElementById('amount').value= span[0].textContent;
         document.getElementById('description').value= span[1].textContent;
         document.getElementById('category').value= span[2].textContent;
         renderUserList();
     }
     else if(e.target.classList.contains('delete')){
         let elem=e.target.parentElement;
         let index= elem.textContent[0]-1;
         let arr=JSON.parse(localStorage.getItem('users'));
         //console.log(arr);
         arr.splice(index,1);
         localStorage.setItem('users',JSON.stringify(arr));
         renderUserList();
     }
 
 }