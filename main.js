const inputBtn = document.getElementById("input-btn")
const inputele = document.getElementById("input-el")
const ulel  = document.getElementById("ul-el")
const delbtn = document.getElementById("del-btn")
const tabBtn = document.getElementById("tab-btn")

let mytopics = []

const lfls = JSON.parse( localStorage.getItem("mytopics") )  
if(lfls)
  {
    mytopics = lfls
    rendertopics(mytopics)
  }

inputBtn.addEventListener("click", () => {
  console.log("button was clicked")
  mytopics.push(inputele.value)
  inputele.value = ""
  localStorage.setItem("mytopics",JSON.stringify(mytopics));
  rendertopics(mytopics)
  
})



function rendertopics(topic){
  var listItems = ""
  for(let i=0; i<topic.length; ++i){
    // listItems  += "<li><a target='_blank' href=' " +mytopics[i]+ "'>" +mytopics[i]+"</li>";
    //Template Strings
    listItems  += `
      <li>
        <a target='_blank' href='${topic[i]}'>
          ${topic[i]}
        </a>
      </li>`
  }
  ulel.innerHTML = listItems  
}

tabBtn.addEventListener("click", ()=> {
  chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
    mytopics.push(tabs[0].url);
    localStorage.setItem("mytopics",JSON.stringify(mytopics));
    rendertopics(mytopics)
  })
})


delbtn.addEventListener("dblclick",function deltopics(){
  localStorage.clear();
  mytopics = []
  ulel.innerHTML = ''
})




