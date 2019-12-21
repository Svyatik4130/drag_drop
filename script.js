  function allowDrop(event) {
    event.preventDefault();
  }
  
  function drag(event) {
    event.dataTransfer.setData("text", event.target.id);

  }
  
  function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    if (event.target == "[object HTMLDivElement]") {
      if (event.target.querySelector("*") == null) {
      event.target.appendChild(document.getElementById(data));
      } else{
      alert("Эта ячейка уже занята");
      }
    }else{
    alert("Эта ячейка уже занята");
    }
  }

  function dragEnter(event){
    if ( event.target.className == "block-for-text" ) {
      event.target.style.border = "3px dotted red";
    }
  }

  let rus_Phrases = ["Иди и купи немного хлеба, пожалуйста.", "Не будь таким глупым!", "Да ладно, не злись.", "Пусть он делает все, что хочет.", "Это такая прекрасная жизнь!"]
  let Phrases = ["Go and buy some bread, please.", "Don’t be so silly!", "Oh, come on, don’t be mad.", "Let him do whatever he wants.", "It’s such a beautiful life!"];

  var rand = Math.floor(Math.random() * Phrases.length);
  var original_arr = Phrases[rand];
  var original_arr_rus = rus_Phrases[rand];
  var One_Phrase = original_arr.split(" ");

  var rus_node = document.createTextNode(original_arr_rus); 
  var rus_text_div = document.getElementById("translator");
  rus_text_div.appendChild(rus_node, rus_text_div); 



function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  return array;
}

var Shuffled_One_Phrase = shuffle(One_Phrase);
for (var i = 0; i < One_Phrase.length; i++) {
  var newDiv = document.createElement("div");
  var newDiv2 = document.createElement("div");
  var newH = document.createElement("h3");
  // and give it some content 
  var newContent = document.createTextNode(Shuffled_One_Phrase[i]); 
  // add the text node to the newly created div
  newH.appendChild(newContent);
  newDiv2.appendChild(newH);
  newDiv2.setAttribute("id", "drag"+i);
  newDiv2.setAttribute("draggable", "true");
  newDiv2.setAttribute("ondragstart", "drag(event)");
  newDiv2.setAttribute("class", "img-center");
  newDiv2.setAttribute("style", "width: 100%;");
  newDiv.appendChild(newDiv2);
  newDiv.setAttribute("class", "col s2 border-img wrap-text-en");
  newDiv.setAttribute("id", "divv"+i);
  newDiv.setAttribute("ondragover", "allowDrop(event)");
  newDiv.setAttribute("ondrop", "drop(event)");
  newDiv.setAttribute("style", "width: 30%;");

  // add the newly created element and its content into the DOM 
  var currentDiv = document.getElementById("public_div"); 
  currentDiv.appendChild(newDiv, currentDiv); 

  //создание ячеек 
  var newDiv3 = document.createElement("div");
  var newBlock = document.createElement("div");
  newBlock.setAttribute("class", "block-for-text");
  newBlock.setAttribute("id", "div"+i);
  newBlock.setAttribute("ondragenter", "dragEnter(event)");
  newBlock.setAttribute("ondragover", "allowDrop(event)");
  newBlock.setAttribute("ondrop", "drop(event)");
  var currentBlock = document.getElementById("blocks");
  currentBlock.appendChild(newBlock, currentBlock);

}


// проверка
function check() {
  var splited_original_arr = original_arr.split(" ");
  var checking ="a";
  for (var i = 0; i < One_Phrase.length; i++) {
    var div_into = currentBlock.querySelector('#div'+i);
    var text_into_div = div_into.querySelector("*");
    if (text_into_div.querySelector("*").innerHTML == splited_original_arr[i]){
      checking+='1';
    } else{
      checking+='0';
    }
  }
  // создание элеметов после ответа пользователя
  if (checking.indexOf("0")<0){
    currentBlock.parentNode.setAttribute("style", "border-style: dashed; border-width: 10px; border-color: green;");
    var newH = document.createElement("h3");
    var newContent = document.createTextNode("Правильно"); 
    newH.appendChild(newContent);
    currentBlock.appendChild(newH, currentDiv);
    var bar = document.getElementById("bar_div");
    bar.parentNode.removeChild(bar);
    var new_form = document.createElement("form");
    var new_input = document.createElement("input");
    new_input.setAttribute("type", "submit");
    new_input.setAttribute("value", "Перезагрузка");
    new_form.appendChild(new_input);
    new_form.setAttribute("action", "index.html");
    new_form.setAttribute("method", "GET");
    currentBlock.appendChild(new_form, currentDiv);


  }
  // неправильно 
  else{
    currentBlock.parentNode.setAttribute("style", "border-style: dashed; border-width: 10px; border-color: red;");
    var newH = document.createElement("h3");
    var newContent = document.createTextNode("Неправильно"); 
    newH.appendChild(newContent);
    currentBlock.appendChild(newH, currentDiv);
    var bar = document.getElementById("bar_div");
    bar.parentNode.removeChild(bar);
    var new_form = document.createElement("form");
    var new_input = document.createElement("input");
    new_input.setAttribute("type", "submit");
    new_input.setAttribute("value", "Перезагрузка");
    new_form.appendChild(new_input);
    new_form.setAttribute("action", "index.html");
    new_form.setAttribute("method", "GET");
    currentBlock.appendChild(new_form, currentDiv);
  }
}

// две функц сброса
function reset() {
  for (var i = 0; i < One_Phrase.length; i++) {
  let element = document.getElementById("div"+i);
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
  reset_block();
}

function reset_block() {
  for (var i = 0; i < One_Phrase.length; i++) {
    let element2 = document.getElementById("divv"+i);
    if (element2 == null) {
      continue;
    } else {
      element2.parentNode.removeChild(element2);
    }
  }
  for (var j = 0; j < One_Phrase.length; j++) {

    var newDiv = document.createElement("div");
    var newDiv2 = document.createElement("div");
    var newH = document.createElement("h3");
    // and give it some content 
    var newContent = document.createTextNode(Shuffled_One_Phrase[j]); 
    // add the text node to the newly created div
    newH.appendChild(newContent);
    newDiv2.appendChild(newH);
    newDiv2.setAttribute("id", "drag"+j);
    newDiv2.setAttribute("draggable", "true");
    newDiv2.setAttribute("ondragstart", "drag(event)");
    newDiv2.setAttribute("class", "img-center");
    newDiv2.setAttribute("style", "width: 100%;");
    newDiv.appendChild(newDiv2);
    newDiv.setAttribute("class", "col s2 border-img wrap-text-en");
    newDiv.setAttribute("id", "divv"+j);
    newDiv.setAttribute("ondragover", "allowDrop(event)");
    newDiv.setAttribute("ondrop", "drop(event)");
    newDiv.setAttribute("style", "width: 30%;");

    // add the newly created element and its content into the DOM 
    var currentDiv = document.getElementById("public_div"); 
    currentDiv.appendChild(newDiv, currentDiv); 
  }
}