/* data */
//const data = [...Array(20)].map((_,i)=>({name:'Avatar '+(i+1)}));

//const avatars = AvatarRepository.getAll();
const avatars = SampleAvatars;

/* const */

const CARD_SIZE = {
    Small: {
        gridWidth: 140,
        thumbHeight: 90
    },
    Medium: {
        gridWidth: 220,
        thumbHeight: 150
    },
    Large: {
        gridWidth: 340,
        thumbHeight: 240
    }
};

/* Element */

const avatarGrid = document.getElementById('avatarGrid');

const sizeSmallBtn = document.getElementById('sizeSmallBtn');
const sizeMediumBtn = document.getElementById('sizeMediumBtn');
const sizeLargeBtn = document.getElementById('sizeLargeBtn');
const sizeButtons = [
    sizeSmallBtn,
    sizeMediumBtn,
    sizeLargeBtn
];

const filterNameBtn = document.getElementById('filterNameBtn');

/* Element AvatarDetail */

const avatarModal = document.getElementById('avatarDetailModal');

const avatarId = document.getElementById("avatarId");
const avatarName = document.getElementById("avatarName");
const avatarDescription = document.getElementById("avatarDescription");
const avatarThumbnail = document.getElementById("avatarThumbnail");
const avatarUnityVer = document.getElementById("avatarUnityVer");
const avatarPlatform = document.getElementById("avatarPlatform");
const avatarCreatedAt = document.getElementById("avatarCreatedAt");
const avatarUpdatedAt = document.getElementById("avatarUpdatedAt");

/* Initialize */

initializeEvents();

/* Fuction */

function initializeEvents()
{
    /* Init */
    filterNameBtn.addEventListener('click', () => filterName());

    /* Modal */
    changeAvatarBtn.onclick=()=>alert('{avatar_name}に変更しますか？');
    copyBpidBtn.onclick=()=>navigator.clipboard.writeText('avtr_dummy');
    openWebBtn.onclick=()=>window.open('https://vrchat.com/home/avatars');
    deleteAvatarBtn.onclick=()=>alert('{avatar_name}を削除しますか？');
    closeAvatarDetailBtn.onclick=()=>avatarModal.close();

    // Display Cards
    render(avatars);

    // Init 
    setActive(sizeMediumBtn);
}

function render(list)
{
    avatarGrid.innerHTML='';
    list.forEach(avatar=>{
        const card = document.createElement('div');
        card.className='grid';
        card.innerHTML=
            `<div class='grid-thumbnail'>
                <img id='gridAvatarThumbnail' class='grid-thumbnail-img'>
            </div>
            <p class='grid-avatarname'>${avatar.name}</p>
            <button id='detailBtn' class='grid-detail'>詳細</button>
            <button id='changeBtn' class='grid-change'>変更</button>`;

        const avatarThumbnail = card.querySelector('#gridAvatarThumbnail');
        avatarThumbnail.src = avatar.thumbnail_url;
        avatarThumbnail.alt = avatar.name;
        const detailBtn = card.querySelector('#detailBtn');
        detailBtn.onclick=()=>{
            showAvatarDetail(avatar);
        };
        const changeBtn = card.querySelector('#changeBtn');
        changeBtn.onclick=()=>{
            alert(avatar.name + "に 変更しますか？");
        }

        avatarGrid.appendChild(card);
    });
}

function changeCardSize(cardWidth, thumbHeight)
{
    document.documentElement.style.setProperty(
        "--grid-width",
        `${cardWidth}px`
    );

    document.documentElement.style.setProperty(
        "--thumb-height",
        `${thumbHeight}px`
    );
}

function setActive(button)
{
    sizeButtons.forEach(b => b.classList.remove("active"));
    button.classList.add("active");
}

function showAvatarDetail(avatar)
{
    avatarName.textContent = avatar.name;
    avatarDescription.textContent = avatar.description;
    avatarThumbnail.src = avatar.thumbnail_url;
    avatarThumbnail.alt = avatar.name;
    avatarUnityVer.textContent = avatar.unity;
    avatarPlatform.textContent = avatar.platform;
    avatarCreatedAt.textContent = avatar.created_at;
    avatarUpdatedAt.textContent = avatar.updated_at;
    avatarModal.showModal();
}

function filterName()
{
    var text = filterNameText.value?.trim() ?? "";
    if (text === "") {
        return;
    }
    console.log(text);
}

/* ChangeCardSize */

sizeSmallBtn.addEventListener('click', () => changeCardSize(CARD_SIZE.Small.gridWidth, CARD_SIZE.Small.thumbHeight));
sizeMediumBtn.addEventListener('click', () => changeCardSize(CARD_SIZE.Medium.gridWidth, CARD_SIZE.Medium.thumbHeight));
sizeLargeBtn.addEventListener('click', () => changeCardSize(CARD_SIZE.Large.gridWidth, CARD_SIZE.Large.thumbHeight));

sizeSmallBtn.onclick = () =>
{
    changeCardSize(CARD_SIZE.Small.gridWidth, CARD_SIZE.Small.thumbHeight);
    setActive(sizeSmallBtn);
};
sizeMediumBtn.onclick = () =>
{
    changeCardSize(CARD_SIZE.Medium.gridWidth, CARD_SIZE.Medium.thumbHeight);
    setActive(sizeMediumBtn);
};
sizeLargeBtn.onclick = () =>
{
    changeCardSize(CARD_SIZE.Large.gridWidth, CARD_SIZE.Large.thumbHeight);
    setActive(sizeLargeBtn);
};
