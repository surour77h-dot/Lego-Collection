document.addEventListener('DOMContentLoaded',()=>{

const table=document.getElementById('dataTable');
const detail=document.getElementById('detailView');
const detailGrid=document.getElementById('detailGrid');
const setImage=document.getElementById('setImage');

let rows=[];

fetch('data.json')
.then(r=>r.json())
.then(data=>{
rows=data;
renderTable(rows);
});

function renderTable(data){

if(!data || !data.length) return;

const keys=Object.keys(data[0]);

table.innerHTML='';

const thead=document.createElement('thead');
const hr=document.createElement('tr');

keys.forEach(k=>{
const th=document.createElement('th');
th.textContent=k;
hr.appendChild(th);
});

thead.appendChild(hr);
table.appendChild(thead);

const tbody=document.createElement('tbody');

data.forEach(row=>{

const tr=document.createElement('tr');

keys.forEach(k=>{

const td=document.createElement('td');

let value=row[k] ?? '';

if(k.toLowerCase()==='open' && value==='Open'){
td.className='open-cell';
}

if(k.toLowerCase().includes('theme')){
td.classList.add('theme-cell');
}

if(k.toLowerCase().includes('store')){
td.classList.add('store-cell');
}

if(k==='%'){
const n=parseFloat(value)||0;

if(n>=100){
td.classList.add('pct-full');
}
else if(n>0){
td.classList.add('pct-mid');
}
}

td.textContent=value;

tr.appendChild(td);

});

tr.addEventListener('click',()=>showDetail(row));

tbody.appendChild(tr);

});

table.appendChild(tbody);
}

function showDetail(row){

detail.hidden=false;

detailGrid.innerHTML='';

const item=row['item#'] || row['item #'] || '';

setImage.src=`https://img.bricklink.com/ItemImage/SN/0/${item}-1.png`;

Object.entries(row).forEach(([k,v])=>{

const box=document.createElement('div');

box.className='detail-box';

if(k.toLowerCase()==='url'){

box.innerHTML=`
<b>${k}</b>
<br>
<button onclick="window.open('${v}','_blank')">
Open
</button>
`;

}else{

box.innerHTML=`
<b>${k}</b>
<br>
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

});
