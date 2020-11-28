// Write your JavaScript code here!
window.addEventListener("load", function() {
   let form = document.querySelector("form");
   let letters = /^[A-Za-z]+$/;
   form.addEventListener("submit", function(event) {
      let pilotName = document.querySelector("input[name=pilotName]");
      let copilotName = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let cargoMass = document.querySelector("input[name=cargoMass]");
      let pilotStatus = document.getElementById("pilotStatus");
      let copilotStatus = document.getElementById("copilotStatus");
      let fuelStatus = document.getElementById("fuelStatus");
      let cargoStatus = document.getElementById("cargoStatus");
      let faultyItems = document.getElementById("faultyItems");
      let launchStatus = document.getElementById("launchStatus");
      let status = true;
      //validation
      if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
         // stop the form submission
         validateFaultyItems();
         alert("All fields are required!");
         event.preventDefault();
      } 
      else if (isNaN(fuelLevel.value) || isNaN(cargoMass.value) ) {
         validateFaultyItems();
         alert("Make sure you enter valid information for each field!");
         event.preventDefault();
      }
      else if (!pilotName.value.match(letters) || (!copilotName.value.match(letters)) ) {
         validateFaultyItems();
         alert("Make sure you enter valid information for each field!");
         event.preventDefault();
      } 
      else {
      //update shuttle requirements
      pilotStatus.innerHTML =`Pilot ${pilotName.value} is ready for launch`;
      copilotStatus.innerHTML =`Co-pilot ${copilotName.value} is ready for launch`;
      if (fuelLevel.value < 10000) {
      faultyItems.style.visibility = "visible";
      fuelStatus.innerHTML =`Fuel level too low for launch`;
      launchStatus.innerHTML =`Shuttle Not Ready for Launch`;
      launchStatus.style.color = "red";
      }
      if(cargoMass.value >10000) {
      faultyItems.style.visibility = "visible";
      cargoStatus.innerHTML = `There is too much mass for the shuttle to take off`;
      launchStatus.innerHTML = `Shuttle not ready for launch`;
      launchStatus.style.color = "red";
      }
      if (fuelLevel.value>10000 && cargoMass.value <10000) {
         faultyItems.style.visibility = "visible";
         launchStatus.innerHTML =`Shuttle is Ready for Launch`;
         launchStatus.style.color = "green";
      
      }  
      event.preventDefault();
   
      let missionTarget = document.getElementById("missionTarget");
      let i = Math.floor(Math.random() * 6);;
      fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
          return response.json();
        }).then(function(json) {
           console.log(json[i].name);
           missionTarget.innerHTML = `<h2>Mission Destination</h2>
           <ol>
              <li>Name: ${json[i].name}</li>
              <li>Diameter: ${json[i].diameter}</li>
              <li>Star: ${json[i].star}</li>
              <li>Distance from Earth: ${json[i].distance}</li>
              <li>Number of Moons: ${json[i].moons}</li>
           </ol>
           <img src="${json[i].image}">`
        });
      }
   });  
   });
   
/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
function validateFaultyItems() {
      faultyItems.style.visibility = "hidden";
      launchStatus.innerHTML =`Awaiting Information Before Launch`;
      launchStatus.style.color = "black";
   }
