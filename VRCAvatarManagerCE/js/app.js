const data = [...Array(20)].map((_,i)=>({name:'Avatar '+(i+1)}));

const avatarGrid = document.getElementById('avatarGrid');
const avatarModal = document.getElementById('avatarDetailModal');

const sizeSmallBtn = document.getElementById('sizeSmallBtn');
const sizeMediumBtn = document.getElementById('sizeMediumBtn');
const sizeLargeBtn = document.getElementById('sizeLargeBtn');
const sizeButtons = [
    sizeSmallBtn,
    sizeMediumBtn,
    sizeLargeBtn
];

/* Fuction */

function render(list)
{
    avatarGrid.innerHTML='';
    list.forEach(a=>{
        const card = document.createElement('div');
        card.className='grid';
        card.innerHTML=
            `<div class='grid-thumb'></div>
            <p class='grid-avatarname'>${a.name}</p>
            <button id='detailBtn' class='grid-detail'>詳細</button>
            <button id='changeBtn' class='grid-change'>変更</button>`;

        const detailBtn = card.querySelector('#detailBtn');
        detailBtn.onclick=()=>{
            //t.textContent=a.name;
            avatarModal.showModal();
        };
        const changeBtn = card.querySelector('#changeBtn');
        changeBtn.onclick=()=>{
            alert(a.name + "に 変更しますか？");
        }

        avatarGrid.appendChild(card);
    });
}

function changeCardSize(width, thumbHeight)
{
    document.documentElement.style.setProperty(
        "--grid-width",
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

sizeSmallBtn.addEventListener('click', () => changeCardSize('140px', '90px')); // 120
sizeMediumBtn.addEventListener('click', () => changeCardSize('220px', '150px')); // 200
sizeLargeBtn.addEventListener('click', () => changeCardSize('340px', '240px')); // 320

sizeSmallBtn.onclick = () =>
{
    changeCardSize("140px", "90px");
    setActive(sizeSmallBtn);
};
sizeMediumBtn.onclick = () =>
{
    changeCardSize("220px", "150px");
    setActive(sizeMediumBtn);
};
sizeLargeBtn.onclick = () =>
{
    changeCardSize("340px", "240px");
    setActive(sizeLargeBtn);
};

/* Modal */

changeAvatarBtn.onclick=()=>alert('{avatar_name}に変更しますか？');
copyBpidBtn.onclick=()=>navigator.clipboard.writeText('avtr_dummy');
openWebBtn.onclick=()=>window.open('https://vrchat.com/home/avatars');
deleteAvatarBtn.onclick=()=>alert('{avatar_name}を削除しますか？');
closeAvatarDetailBtn.onclick=()=>avatarModal.close();

/* Call Function */

// Display Cards
render(data);

// Init 
setActive(sizeMediumBtn);
