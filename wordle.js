var inc_btn = document.getElementById("inc_btn");
var dec_btn = document.getElementById("dec_btn");
var output = document.getElementById("length_lbl");
var tbl = document.getElementById("game_tbl");

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
});

dec_btn.addEventListener('click', () => {
  val = parseInt(output.innerHTML);
  if(val > 3){
    output.innerHTML = val-1;
    for(var i = val-1; i <= tbl.rows[0].cells.length; i++){
      deleteColumn("game_tbl");
    }
  }
});

var button = document.getElementById("guess_btn");
var guess = document.getElementById("guess_txt");

button.addEventListener('click', () => {
  console.log(guess.value);
  guess.value = null;
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
