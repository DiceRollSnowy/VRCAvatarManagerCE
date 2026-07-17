const data = [...Array(20)].map((_,i)=>({name:'Avatar '+(i+1)}));

const grid = document.getElementById('grid');
const modal = document.getElementById('modal');

const sizeSmall = document.getElementById('sizeSmall');
const sizeMedium = document.getElementById('sizeMedium');
const sizeLarge = document.getElementById('sizeLarge');
const sizeButtons = [
    sizeSmall,
    sizeMedium,
    sizeLarge
];

/* Fuction */

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

function changeCardSize(width, thumbHeight)
{
    document.documentElement.style.setProperty(
        "--card-width",
        width
    );

    document.documentElement.style.setProperty(
        "--thumb-height",
        thumbHeight
    );
}

function setActive(button)
{
    sizeButtons.forEach(b => b.classList.remove("active"));
    button.classList.add("active");
}

/* ChangeCardSize */

sizeSmall.addEventListener('click', () => changeCardSize('140px', '90px')); // 120
sizeMedium.addEventListener('click', () => changeCardSize('220px', '150px')); // 200
sizeLarge.addEventListener('click', () => changeCardSize('340px', '240px')); // 320

sizeSmall.onclick = () =>
{
    changeCardSize("140px", "90px");
    setActive(sizeSmall);
};
sizeMedium.onclick = () =>
{
    changeCardSize("220px", "150px");
    setActive(sizeMedium);
};
sizeLarge.onclick = () =>
{
    changeCardSize("340px", "240px");
    setActive(sizeLarge);
};

/* Call Function */

// Display Cards
render(data);

// Init 
setActive(sizeMedium);
