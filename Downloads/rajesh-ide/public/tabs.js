function addTab(name){

const tabs = document.getElementById("tabs")

const tab = document.createElement("div")

tab.className="tab active"

tab.innerText=name

tabs.appendChild(tab)

}