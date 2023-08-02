const inputBtn = document.getElementById("input-btn")
const inputele = document.getElementById("input-el")
const ulel  = document.getElementById("ul-el")
const delbtn = document.getElementById("del-btn")
const tabBtn = document.getElementById("tab-btn")

let myLeads = []

const lfls = JSON.parse( localStorage.getItem("myleads") )  
if(lfls)
  {
    myLeads = lfls
    renderLeads(myLeads)
  }

inputBtn.addEventListener("click", () => {
  console.log("button was clicked")
  myLeads.push(inputele.value)
  inputele.value = ""
  localStorage.setItem("myleads",JSON.stringify(myLeads));
  renderLeads(myLeads)
  
})



function renderLeads(lead){
  var listItems = ""
  for(let i=0; i<lead.length; ++i){
    // listItems  += "<li><a target='_blank' href=' " +myLeads[i]+ "'>" +myLeads[i]+"</li>";
    //Template Strings
    listItems  += `
      <li>
        <a target='_blank' href='${lead[i]}'>
          ${lead[i]}
        </a>
      </li>`
  }
  ulel.innerHTML = listItems  
}

tabBtn.addEventListener("click", ()=> {
  chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
    myLeads.push(tabs[0].url);
    localStorage.setItem("myleads",JSON.stringify(myLeads));
    renderLeads(myLeads)
  })
})


delbtn.addEventListener("dblclick",function delLeads(){
  localStorage.clear();
  myLeads = []
  ulel.innerHTML = ''
})




