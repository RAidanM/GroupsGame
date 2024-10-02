
//json setup
let group_data;
const itemsLeft = [];
let json_data = fetch('groups.json').then(
    response => {
        return response.json(); //this is return a promise to parse JSON
    }
).then(
    data => {
        group_data = data;
        //reading the actual data inside the json file
        let grid = document.getElementById(16);

        for (let i = 0; i < 16; i++) {
            let button = document.createElement("button");
            button.id = i;
            itemsLeft.push(i+'');
            button.classList = "grid-item";
            button.style.order = Math.floor(Math.random() * 100 +1);
            let group = i / 4 >>> 0;
            let word = i % 4;
            let content = data.groups[group].words[word].toUpperCase();;
            button.textContent = content;
            grid.appendChild(button);
        }

        document.querySelectorAll(".grid-item").forEach(element => {
            element.addEventListener("mousedown", handleButtonPress);
        });
    }
).catch(error => {
    console.error('Problem fetching data',error);
});

const selectedItems = [];
let order = -16;

//grid-items
function handleButtonPress(el){ pushButton(el.currentTarget); }

function pushButton(element){
    let id = element.id;
    
    if(selectedItems.includes(id)){
        element.style.background = "rgb(239, 239, 230)";
        element.style.color = "buttontext";
        let idLocation = selectedItems.indexOf(id);
        selectedItems.splice(idLocation,1);
    }
    else if(selectedItems.length<4) {
        element.style.background = "rgb(90, 89, 78)";
        element.style.color = "white";
        selectedItems.push(id);
    }
}

//attempts
function loseLife(){
    let attempts = document.getElementById(20);
    attempts.innerHTML = attempts.innerHTML.slice(0,-1);
    if(attempts.innerHTML==""){
        attempts.innerHTML = "YOU LOST";
        attempts.style.color = "white";
        attempts.style.background = "rgb(250, 42, 85)";
    }
}

//deselect button
function deselect(){
    selectedItems.forEach( id => {
        document.getElementById(id).style.background = "rgb(239, 239, 230)";
        document.getElementById(id).style.color = "buttontext";
    });
    
    selectedItems.splice(0,4);
}

//shuffle
function shuffle(){
    itemsLeft.forEach( id =>{
        let element = document.getElementById(id);
        if(element.style.order>0){
            element.style.order = Math.floor(Math.random() * 100 +1);    
        }
    });
}


//submit
function submit(){
    if (selectedItems.length != 4) { return deselect();}
    let group;
    let check = true;
    selectedItems.forEach( id => {
        if (typeof group == 'undefined'){
            group = id / 4 >>> 0;
        }
        else if (group != (id / 4 >>> 0)) {
            check = false;
            loseLife();
            deselect();
        }
    });
    //correct group
    if (check){
        selectedItems.forEach( id => {
            let element = document.getElementById(id);
            let color;
            if (group==0){      color = "rgb(250, 222, 113)";}
            else if(group==1){  color = "rgb(160, 196, 90)";}
            else if(group==2){  color = "rgb(177, 196, 239)";}
            else if(group==3){  color = "rgb(186, 126, 197)";}
            element.style.background = color;
            element.style.color = "buttontext";
            element.style.order = order++;
            element.removeEventListener("mousedown", handleButtonPress);

            
            
            let idLocation = itemsLeft.indexOf(id);
            itemsLeft.splice(idLocation,1);
            
        });

        let titleId = selectedItems.shift();
        let title = document.getElementById(titleId);
        title.style.flex = "100%";

        let words = group_data.groups[group].words[0];
        for (let i = 1; i < 4; i++) {
            words += ", "+group_data.groups[group].words[i];
        }

        title.innerHTML = group_data.groups[group].title + "\n("+words+")";


        selectedItems.forEach( element => {
            document.getElementById(element).remove();
        });
        selectedItems.splice(0,4);
    }
}