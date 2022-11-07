function upadateTheTable () {
    tableBody = document.getElementById('tableBody');
    let str = ""
    itemJsonArray.forEach((element,index) => {
        str += 
        `
        <tr>
            <th scope="row">${index+1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <th scope="col"><button type="button" class="btn btn-primary" onclick="deleted(${index})">Delete</button></th>
        </tr>
        `
    });
    tableBody.innerHTML = str
}

function deleted(index){
    if (index == 0) {
        itemJsonArray.shift()
    }
    else {
        itemJsonArray.splice(index,index)
    }
    if (itemJsonArray.length == 0) {
        localStorage.clear()
    }
    upadateTheTable()
}

itemJsonArray = localStorage.getItem('itemsJson') == null ? [] : JSON.parse(localStorage.getItem('itemsJson'))
upadateTheTable()

add = document.getElementById("addToList");
add.addEventListener("click", ()=>{
    title = document.getElementById('title').value;
    description = document.getElementById('description').value;
    if ( localStorage.getItem('itemsJson') == null ) {
        itemJsonArray.push([title,description])
        localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray));
    }
    else {
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr)
        itemJsonArray.push([title,description])
        localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray));
    }
    upadateTheTable();
});

del = document.getElementById("deleteList")
del.addEventListener("click", ()=>{
    if (confirm("Do you really want to clear the list?")) {
        itemJsonArray = []
        localStorage.clear()
        tableBody = document.getElementById('tableBody')
        tableBody.innerHTML = ""
    }
})

window.onload = function() {
    var reloading = sessionStorage.getItem("reloading");
    if (reloading) {
        sessionStorage.removeItem("reloading");
        upadateTheTable();
    }
}