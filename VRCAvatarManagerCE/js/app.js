const data = [...Array(20)].map((_,i)=>({name:'Avatar '+(i+1)}));

const grid = document.getElementById('grid');
const modal = document.getElementById('modal');

// Fuction

function render(list)
{
    grid.innerHTML='';
    list.forEach(a=>{
        const card = document.createElement('div');
        card.className='card';
        card.innerHTML=
            `<div class='card-thumb'></div>
            <p class='avatar-name'>${a.name}</p>
            <button id='detailBtn' class='detail'>詳細</button>
            <button id='changeBtn' class='change'>変更</button>`;
        grid.appendChild(card);
    });
}

// Display

render(data);
