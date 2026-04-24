let input = document.getElementById("input")
let inputBtn = document.getElementById("inputBtn")
let list = document.getElementById("list")
let none = document.getElementById("none")
let clear = document.getElementById("clear")
let search = document.getElementById("search")

input.addEventListener("keydown", function(event){
    if (event.key === "Enter") {
        addLists()
    }
})

inputBtn.addEventListener("click", function(){
   addLists()
}) 

    clear.addEventListener("click", function(){
        let result = confirm("Are you sure?")
        if (result) {
            list.innerHTML = ""
        }

            localStorage.setItem("notes", list.innerHTML)
    })



let saved = localStorage.getItem("notes")

if (saved) {
    list.innerHTML = saved

    let items = list.querySelectorAll("li")

    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener("click", function () {

            if (this.querySelector("input")) {
                return
            }
            let oldText = this.textContent.replace("X", "")

            let del = this.querySelector("button")

            this.innerHTML = ""

            let newInput = document.createElement("input")
            newInput.value = oldText
            this.appendChild(newInput)

            newInput.focus()

            newInput.addEventListener("keydown", function (event) {
                if (event.key === "Enter") {
                    items[i].textContent = newInput.value
                    items[i].appendChild(del)
                    localStorage.setItem("notes", list.innerHTML)
                }
            })
        })
    }

    let buttons = list.querySelectorAll("button")

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function (event) {
            event.stopPropagation()
            this.parentElement.remove()
            localStorage.setItem("notes", list.innerHTML)
        })
    }
}

function addLists(){
    let text = input.value
    let textNone = input.value.trim()
    
    if (textNone === ""){
        none.textContent = "Enter text"
    } else {
        let li = document.createElement("li")
        let del = document.createElement("button")
        
        del.textContent = "X"
        li.textContent = text
        
        li.appendChild(del)
        list.appendChild(li)
        none.textContent = ""

        li.classList.add("animate") 
        setTimeout(() => li.classList.add("animateR"))
       

        li.addEventListener("click", function () {

            if (this.querySelector("input")) {
                return
            }
            let oldText = this.textContent.replace("X", "")

            let del = this.querySelector("button")

            this.innerHTML = ""

            let newInput = document.createElement("input")
            newInput.value = oldText
            this.appendChild(newInput)

            newInput.focus()

            newInput.addEventListener("keydown", function (event) {
                if (event.key === "Enter") {
                    li.textContent = newInput.value
                    li.appendChild(del)
                    localStorage.setItem("notes", list.innerHTML)
                }
            })
            

        })
        
        del.addEventListener("click", function(event){
            event.stopPropagation()
            this.parentElement.remove()
            localStorage.setItem("notes", list.innerHTML)
        })

    }


    localStorage.setItem("notes", list.innerHTML)
    input.value = ""
}

search.addEventListener("input", function(){
    let textSrc = search.value.toLowerCase()
    let itemsSrc = list.querySelectorAll("li")
    for (let i = 0; i < itemsSrc.length; i++) {
        let textLi = itemsSrc[i].textContent.toLowerCase()
        if (textLi.includes(textSrc)) {
            itemsSrc[i].style.display = "flex"
        } else {
            itemsSrc[i].style.display = "none"
        }
    }
})