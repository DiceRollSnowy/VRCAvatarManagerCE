/* data */
//const data = [...Array(20)].map((_,i)=>({name:'Avatar '+(i+1)}));

//const avatars = AvatarRepository.getAll();
const avatars = SampleAvatars;

/* const */

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

/* const AvatarDetail */

const avatarModal = document.getElementById('avatarDetailModal');

const avatarId = document.getElementById("avatarId");
const avatarName = document.getElementById("avatarName");
const avatarDescription = document.getElementById("avatarDescription");
const avatarThumbnail = document.getElementById("avatarThumbnail");
const avatarUnityVer = document.getElementById("avatarUnityVer");
const avatarPlatform = document.getElementById("avatarPlatform");
const avatarCreatedAt = document.getElementById("avatarCreatedAt");
const avatarUpdatedAt = document.getElementById("avatarUpdatedAt");

/* Fuction */

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


/* Init */
filterNameBtn.addEventListener('click', () => filterName());

/* Modal */
changeAvatarBtn.onclick=()=>alert('{avatar_name}に変更しますか？');
copyBpidBtn.onclick=()=>navigator.clipboard.writeText('avtr_dummy');
openWebBtn.onclick=()=>window.open('https://vrchat.com/home/avatars');
deleteAvatarBtn.onclick=()=>alert('{avatar_name}を削除しますか？');
closeAvatarDetailBtn.onclick=()=>avatarModal.close();

/* Call Function */

// Display Cards
render(avatars);

// Init 
setActive(sizeMediumBtn);
