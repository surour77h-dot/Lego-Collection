const table=document.getElementById('dataTable');

const detail=document.getElementById('detailView');

const detailGrid=document.getElementById('detailGrid');

const setImage=document.getElementById('setImage');

fetch('data.json')

.then(r=>r.json())

.then(data=>{

const rows=data.sheets.Owned.rows;

render(rows);

})

.catch(err=>{

console.error(err);

});

function render(rows){

const keys=Object.keys(rows[0]);

let html='<thead><tr>';

keys.forEach(k=>{

html+=`<th>${k}</th>`;

});

html+='</tr></thead><tbody>';

rows.forEach((row,i)=>{

html+=`<tr onclick="openDetails(${i})">`;

keys.forEach(k=>{

let value=row[k] ?? '';

let cls='';

if(k.toLowerCase()==='open' && value==='Open'){

cls='open-cell';

}

if(k.toLowerCase().includes('theme')){

cls='theme-cell';

}

if(k.toLowerCase().includes('store')){

cls='store-cell';

}

if(k==='%'){

const n=parseFloat(value)||0;

if(n>=100){

cls='pct-full';

}else if(n>0){

cls='pct-mid';

}

}

html+=`<td class="${cls}">${value}</td>`;

});

html+='</tr>';

});

html+='</tbody>';

table.innerHTML=html;

window.allRows=rows;

}

window.openDetails=function(i){

const row=window.allRows[i];

detail.hidden=false;

detailGrid.innerHTML='';

const item=row['item#'] || '';

setImage.src=`https://img.bricklink.com/ItemImage/SN/0/${item}-1.png`;

Object.entries(row).forEach(([k,v])=>{

const box=document.createElement('div');

box.className='detail-box';

if(k.toLowerCase()==='url'){

box.innerHTML=`
<b>${k}</b>
<br><br>
<button onclick="window.open('${v}','_blank')">
OPEN
</button>
`;

}else{

box.innerHTML=`
<b>${k}</b>
<br><br>
${v}
`;

}

detailGrid.appendChild(box);

});

}

document.getElementById('backToTable')

?.addEventListener('click',()=>{

detail.hidden=true;

});
