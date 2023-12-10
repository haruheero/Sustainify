// Create the button element
const profilebox = document.createElement("div");
// profilebox.textContent = "Google Login";
profilebox.classList.add("absolute-button-Bhindi");

// Append the button to the body

// on windows load fetch id and iage
window.onload = () => {
  var flag=false;
  let allTabs = document.querySelectorAll(".MUFPAc .bmaJhd.iJddsb");
  for(let i=0;i<allTabs.length;i++){
    let x = allTabs[i].nextSibling.textContent;
    console.log(typeof(x));
    console.log(x);
    if(x==="Shopping"){
      flag=true;
      break;
    }
  }
  if(flag===true){
    // profilebox.textContent = "loading....";
    document.body.appendChild(profilebox);
  }
}

profilebox.onclick = ()=>{
  const promptValue = document.querySelector("#APjFqb").value;
  window.location.href = `http://localhost:3000/results/${promptValue}`;
}