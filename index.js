
let chatData = [
    {
        id: 1,
        type: "bot-chat",
        name: "Support",
        time: getChatTime(),
        text: "Hello there! 👋 Need help? Reach out to us right here, and we'll get back to you as soon as we can!", 
    }
]

//get chat time
function getChatTime(){
    const today = new Date()
    return  `${today.getHours()} : ${today.getMinutes()}`
}


document.getElementById("user-input").addEventListener("keypress", function(e){
    if (e.key === "Enter"){
        e.preventDefault()
        const userInput = document.getElementById("user-input").value
        //create new user obj on Enter key press
        let user = {
            type : "user-chat",
            name : "you",
            text : `${userInput}`,
            time : getChatTime()
            }
        //push obj to chat data
        chatData.push(user)
        renderPage()
        document.getElementById("user-input").value = "" //clear text field
        botResponse(userInput)
    }
} )

async function botResponse(userInput){
    const numberOfSentence = Math.floor(Math.random() * 3) + 1
    //get dummy text from lorem ipsum api
    const res = await fetch (`https://baconipsum.com/api/?type=all-meat&sentences=${numberOfSentence}&start-with-lorem=1`)
    let botResponse = await res.json()

    if (userInput.includes("Hello")){
        botResponse = "Hello I am Increase, How are you doing today?"
        } else if (userInput.includes("are you doing")){
            botResponse = "I am fine. How may I help you today?"
        } else {botResponse}
        
     //create new bot obj on Enter key press
    let bot = {
        type : "bot-chat",
        name : "support",
        text : botResponse,
        time : getChatTime()
    }
   
    chatData.push(bot)
    renderPage()
}

//get chat html from chat array of objects
function chatHtml(data){

    const html = data.map(function(chat){

        const {type, name, time, text} = chat //deconstruct each chat item in the array
        if (type === "bot-chat"){
            return `
                <div class="${type}">
                <img src="/img/bot-avatar.png"  class="bot-avatar" alt="bot-avatar">
                    <div class="text">
                        <p class="name">${name}</p>
                        <p class="chat-text" >
                            ${text}
                        </p>
                        <p class="time">${time}</p>
                    </div>
                </div>`
        } else {
            return `
                <div class="${type}">
                    <div class="text">
                        <p class="name">${name}</p>
                        <p class="chat-text" >
                            ${text}
                        </p>
                        <p class="time">${time}</p>
                    </div>
                </div>`
        }

    }).join("")
    return html
}

//render chat htm to DOM
function renderPage(){
    document.getElementById("chat-area").innerHTML = chatHtml(chatData)
}

renderPage()