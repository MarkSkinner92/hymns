var sheetID = '1DwFbenVTO-9OE-EdVJc5fJLZmXDzI8GKSgFXSSL6FzY';
var data = [];


function addSheet(offset,title){
  let slotHolder = document.getElementById('slot-holder');
  let slot = document.getElementById('slot-template').cloneNode(true);
  slot.style.display='block';
  slot.id='';
  let row = getRowNum(offset);
  let html = grabDayData(row);
  let organist = getValue(row,'organist');
  slot.querySelector('.slot-title').innerText=`${fmtDate(getValue(row,'date'))+' ('+title+')'} - ${organist?organist:'TBD (Take a break!)'}`;
  slot.insertAdjacentHTML('beforeend',html);
  slotHolder.appendChild(slot);
}
function getValue(row,c,offset=0){
  let value;
  let a = getCol(c);
  if(a) if(data[a]) if(data[a][row]) value = data[getCol(c)+offset][row];
  return value;
}
//weeks -> offset of sundays. ex 1 = next sunday, -1 = last sunday, 0 = this sunday
function getRowNum(week) {
    var date = new Date(); date.setDate(date.getDate()-1);
    var resultDate = new Date(date.getTime());
    resultDate.setDate(date.getDate() + (7 - (date.getDay()) % 7) + 7*week);
    let dt = [resultDate.toLocaleString('en-us', { month: 'short' }),resultDate.getDate()];
    let dind = getCol('date');
    for(let i = 1; i < data[dind].length; i++){
      if(data[dind]) if(data[dind][i]){
        if(data[dind][i].includes(dt[0]) && data[dind][i].includes(dt[1])){
          return i;
        }
      }
    }
}
function grabDayData(row){
  let html = '';
  /*
  Topic/Theme
  Opening Hymn
  Sacrament Hymn
  Special Music Presentation
  Closing Hymn
  Chorister
  Date
  */
  let tt = getValue(row,'topic');
  if(tt) html += addKeyValue('',tt);

  tt = getValue(row,'opening');
  let tt2 = getValue(row,'opening',1);
  if(tt) html += addKeyValue('Opening',tt + ', '+ tt2);

  tt = getValue(row,'sacrament');
  tt2 = getValue(row,'sacrament',1)
  if(tt) html += addKeyValue('Sacrament',tt + ', '+ tt2);

  tt = getValue(row,'special');
  if(tt) html += addKeyValue('Special Musical Number',tt);

  tt2 = getValue(row,'closing',1)
  tt = getValue(row,'closing');
  if(tt) html += addKeyValue('Closing',tt + ', '+ tt2);

  tt = getValue(row,'chorister');
  if(tt) html += addKeyValue('Chorister',tt);

  tt = getValue(row,'conduct');
  if(tt) html += addKeyValue('Conductor',tt);

  // html += getCol('cond');
  return html;
}
function getCol(key){
  for(let i = 1; i < data.length; i++){
    let value;
    if(data) if(data[i]) if(data[i][2]){
      value = data[i][2];
      if(value.toLowerCase().includes(key.toLowerCase())) return i;
    }
  }
  return undefined;
}
function addKeyValue(key,value){
  if(key)
    return `<p class='slotInfo'><b>${key}</b> - ${value}</p>`;
  else
    return `<p class='slotInfo'>${value}</p>`;
}
function fmtDate(dt){
let st = '';
var month= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
  let n = dt.split('-');
  for(let i = 0; i < month.length; i++){
    if(month[i].includes(n[1])){
      n[1] = month[i];
      break;
    }
  }
  st = `${n[1]} ${n[0]}`
  return st;
}
function doData(json) {
    let spData = json.feed.entry;
    data = [];
    spData.forEach((item, i) => {
      let t = item.gs$cell;
      if(!data[t.col]) data[t.col] = [];
      data[t.col][t.row] = t.$t;
    });
    console.log(data);
}
function createSheets(){
  addSheet(0,'This Sunday');
  addSheet(1,'Next Sunday');
  addSheet(2,'The Sunday After That');
}
function onLoad(){
    let pageIndex = 1;
    let script=`https://spreadsheets.google.com/feeds/cells/${sheetID}/${pageIndex}/public/values?alt=json-in-script&callback=doData`;
    $.getScript(script).done(function(script,textStatus){
      createSheets();
    });
}
