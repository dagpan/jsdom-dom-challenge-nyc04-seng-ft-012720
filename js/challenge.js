const countHeader = document.querySelector("h1#counter")
const outerDiv = document.querySelector("div#list")
const outerUl = document.querySelector(".likes")
const newCommentForm = document.querySelector("form#comment-form")
const formBtn = document.querySelector("#submit")
const minusBtn = document.querySelector("#minus")
const plusBtn = document.querySelector("#plus")
const likeBtn = document.querySelector("#heart")
const pauseBtn = document.querySelector("#pause")
minusBtn.addEventListener("click", minusCounter)
plusBtn.addEventListener("click", plusCounter)
likeBtn.addEventListener("click", addLike)
newCommentForm.addEventListener("submit", handleSubmit)
pauseBtn.addEventListener("click", pauseResume)
let countTime = setInterval(timer, 1000)
let lisLikes = []
let seconds = 0
let pauseCounter = false
timer()
function timer() {
        if (!pauseCounter) {
             seconds += 1
             countHeader.innerText = `${seconds}` 
        } else {
             countHeader.innerText = `${seconds}`
        }
        countTime
}  
function pauseResume(event) {
         pauseCounter = !pauseCounter 
         if (pauseCounter) {
             minusBtn.disabled = true
             plusBtn.disabled = true
             likeBtn.disabled = true
             formBtn.disabled = true
             pauseBtn.textContent = "resume"
         } else {
             seconds -= 1
             minusBtn.disabled = false
             plusBtn.disabled = false
             likeBtn.disabled = false
             formBtn.disabled = false
             pauseBtn.textContent = "pause"
         }
}
function minusCounter() {
    seconds -= 1
}
function plusCounter() {
    seconds += 1
}
function addLike(event) {
         if (lisLikes.length === 0) {
            lisLikes.push(seconds)
            let i = 1
            const likeList = {
                num: seconds,
                times: i
                }
            renderOneLike(likeList)
         } else {
                if (lisLikes.includes(seconds)) {
                    lisLikes.push(seconds)
                    let sameLi = event.target.nextElementSibling.nextElementSibling.querySelector(`li[data-num="${seconds}"]`)
                    debugger
                    let likeCounter = lisLikes.filter((it) => {return it === seconds})
                    sameLi.innerText = `${seconds} has been liked ${likeCounter.length} times`
                } else {
                    lisLikes.push(seconds)
                    let i = 1
                    const likeList = {
                          num: seconds,
                          times: i
                          }
                    renderOneLike(likeList)
                }
         }
}
function renderOneLike(like){
    const innerLi = document.createElement('li')
    innerLi.dataset["num"] = `${like.num}`
    innerLi.innerHTML = `${like.num} has been liked <span>${like.times}</span> time`
    outerUl.append(innerLi)
}
function renderSameLike(like){
         const innerLi = document.createElement('li')
         innerLi.dataset["num"] = `${like.num}`
         if (like.times > 1) {
             innerLi.innerHTML = `${like.num} has been liked <span>${like.times}</span> times`
         } else { 
             innerLi.innerHTML = `${like.num} has been liked <span>${like.times}</span> time`
         }
         outerUl.append(innerLi)
}
function handleSubmit(event){
    event.preventDefault()
    const newComment = newCommentForm["comment"].value
    renderOneComment(newComment)
    newCommentForm.reset()
}
function renderOneComment(comment){
    const innerP = document.createElement('p')
    innerP.textContent = `${comment}`
    outerDiv.append(innerP)
}