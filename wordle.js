var inc_btn = document.getElementById("inc_btn");
var dec_btn = document.getElementById("dec_btn");
var output = document.getElementById("length_lbl");
var tbl = document.getElementById("game_tbl");
var chosen = null;
var words = null;

url = "https://raw.githubusercontent.com/zlee1/WordleN/master/data/generated/word_set.txt"

fetch(url)
    .then(response => response.text())
    .then(text => {
        words = JSON.parse(text);
    });

for(var i = tbl.rows[0].cells.length; i < parseInt(output.innerHTML); i++){
  addColumn("game_tbl");
}

inc_btn.addEventListener('click', () => {
  val = parseInt(output.innerHTML);
  if(val < 15){
    output.innerHTML = val+1;
    for(var i = tbl.rows[0].cells.length; i < val+1; i++){
      addColumn("game_tbl");
    }
  }
  clear_board("game_tbl");
});

dec_btn.addEventListener('click', () => {
  val = parseInt(output.innerHTML);
  if(val > 2){
    output.innerHTML = val-1;
    for(var i = val-1; i <= tbl.rows[0].cells.length; i++){
      deleteColumn("game_tbl");
    }
  }
  clear_board("game_tbl");
});

function clear_board(id){
  chosen = null;
  guess.value = null;
  button.value = "Guess";
  tbl = document.getElementById(id);
  for(var i = 0; i < tbl.rows.length; i++){
    for(var j = 0; j < tbl.rows[i].cells.length; j++)
      tbl.rows[i].cells[j].innerHTML = "";
  }

  for(var i = 0; i < tbl.rows.length; i++){
    for(var j = 0; j < tbl.rows[i].cells.length; j++)
      tbl.rows[i].cells[j].style.backgroundColor = "white";
  }
}

function check_guess_legal(guess,len){
  return words[len.toString()].legal.includes(guess);
}

var button = document.getElementById("guess_btn");
var guess = document.getElementById("guess_txt");

guess.addEventListener("keyup", function(e) {
  if(e.code == "Enter"){
    button.click();
  }
});

function get_info(guess){
  var colors = [];
  var used_letters = [];
  for(var i = 0; i < chosen.length; i++){
    colors.push("gray");
  }

  for(var i = 0; i < chosen.length; i++){
    if(guess[i] == chosen[i]){
      colors[i] = "green";
      used_letters.push(guess[i]);
    }
  }

  for(var i = 0; i < chosen.length; i++){
    if(chosen.includes(guess[i]) && colors[i] == "gray"){
      if(used_letters.includes(guess[i])){
        var w_count = 0;
        var u_count = 0;
        for(var j = 0; j < chosen.length; j++){
          if(chosen[j] == guess[i]){
            w_count += 1;
          }
        }
        for(var j = 0; j < used_letters.length; j++){
          if(used_letters[j] == guess[i]){
            u_count += 1;
          }
        }
        if(w_count > u_count){
          colors[i] = "yellow";
        }
      }else{
        colors[i] = "yellow";
      }
      used_letters.push(guess[i]);
    }
  }

  return colors;
}

function set_colors(colors, row){
  if(row == null){
    var cur_row = 0;
    for(var row = 0; row < tbl.rows.length; row++){
      if(tbl.rows[row].cells[0].innerHTML == ""){
        cur_row = row-1;
        break;
      }
    }
  }

  for(var i = 0; i < colors.length; i++){
    if(colors[i] == "green"){
      tbl.rows[row].cells[i].style.backgroundColor = '#BDF182';
    }else if(colors[i] == "yellow"){
      tbl.rows[row].cells[i].style.backgroundColor = '#FFF585';
    }else{
      tbl.rows[row].cells[i].style.backgroundColor = '#DDDDDD';
    }
  }
}

button.addEventListener('click', () => {
  if(button.value == "Restart"){
    chosen = null;
    clear_board("game_tbl");
    button.value = "Guess"
    return null;
  }

  if(chosen == null){
    chosen = choose_word(tbl.rows[0].cells.length);
  }

  if(guess.value == chosen){
    set_colors(get_info(guess.value, null));
    button.value = "Restart";
  }

  if(check_guess_legal(guess.value,tbl.rows[0].cells.length)){

    var cur_row = 0;
    for(var row = 0; row < tbl.rows.length; row++){
      if(tbl.rows[row].cells[0].innerHTML == ""){
        cur_row = row;
        break;
      }
    }
    for(var i = 0; i < guess.value.length; i++){
      tbl.rows[cur_row].cells[i].innerHTML = guess.value[i].toUpperCase();
    }
    set_colors(get_info(guess.value), cur_row);

    if(cur_row == tbl.rows.length-1 || guess.value == chosen){
      button.value = "Restart";
      guess.value = chosen.toUpperCase();
    }
    else{
      guess.value = null;
    }

  }

});

function addColumn(tblId)
{
  var tblHeadObj = document.getElementById(tblId);
  var l = tblHeadObj.rows.length;
  for (var h=0; h<l; h++) {
    var newTH = document.createElement('td');
    tblHeadObj.rows[h].appendChild(newTH);
  }
}

function deleteColumn(tblId)
{
  var allRows = document.getElementById(tblId).rows;
  for (var i=0; i<allRows.length; i++) {
    if (allRows[i].cells.length > 1) {
      allRows[i].deleteCell(-1);
    }
  }
}

function choose_word(len){
  return words[len.toString()].answers[Math.floor(Math.random()*words[len.toString()].answers.length)];
}
