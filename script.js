
//Declaring all the variables
const head = document.querySelector(".header");
const displayResults = document.querySelector(".displayResults");
const button= document.querySelector("#btn");

button.addEventListener("click",()=> {
//Fetching the details from the given API
const URL = "https://www.scorebat.com/video-api/v3/";
    let renderResult = (match)=> {
    const resultDiv = document.createElement("div");
    resultDiv.className = "card";
    resultDiv.innerHTML = `
        ${match.videos[0].embed}
        <p><b>Match: </b>${match.title}</p>
        <p><b>Competition: </b>${match.competition}</p>
        <p><b>Date: </b>${match.date}</p>
        `;
    displayResults.appendChild(resultDiv);
    }

//conditions to display only 24 results
    let renderAll = (response)=> {
    displayResults.innerHTML = "";
    document.querySelector('#result').hidden=false;
    let count=0
    for(let result of response){ 
            renderResult(result);
            count++;
            if(count==24)break;
    }
}

//Using async/await to get the results
    let func = async function(URL){
        try{
        const response = await fetch(URL);
        let results = await response.json();
        renderAll(results.response);
        }
        catch(error){
        console.log(error.message);
        alert("Failed to fetch data! try again")
        }
    }  
    func(URL);
    });