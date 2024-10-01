//json setup
let json_data = fetch('groups.json').then(
    response => {
        return response.json(); //this is return a promise to parse JSON
    }
).then(
    data => {
        //reading the actual data inside the json file
        let grid = document.getElementById(0);

        for (let i = 0; i < 16; i++) {
            let button = document.createElement("button");
            button.id = i+1;
            button.classList = "grid-item";
            button.style.order = Math.floor(Math.random() * 100 +1);
            let group = i / 4 >>> 0;
            let word = i % 4;
            let content = data.groups[group].words[word].toUpperCase();;
            button.textContent = content;
            grid.appendChild(button);
        }

        document.querySelectorAll(".grid-item").forEach(element => {
            element.addEventListener("mousedown", function(event) {
                pushButton(event, element);
            });
        });
    }
).catch(error => {
    console.error('Problem fetching data',error);
});

const selectedItems = [];

//grid-items
function pushButton(event, element){
    let id = element.id;
    
    if(selectedItems.includes(id)){
        element.style.background = "rgb(239, 239, 230)";
        element.style.color = "buttontext";

        let idLocation = selectedItems.indexOf(id);

        selectedItems.splice(idLocation,1);


        console.log("Unselected: "+id);
    }
    else if(selectedItems.length<4) {
        element.style.background = "rgb(90, 89, 78)";
        element.style.color = "white";
        selectedItems.push(id);
        console.log("Selected: "+id);
    }
    console.log(selectedItems);
}

function deselect(){
    selectedItems.forEach( id => {
        document.getElementById(id).style.background = "rgb(239, 239, 230)";
        document.getElementById(id).style.color = "buttontext";
    });
    
    selectedItems.splice(0,4);
}

document.querySelector