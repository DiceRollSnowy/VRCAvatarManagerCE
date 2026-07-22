import {
    filterAvatar,
    sortAvatars
} from "./filter/AvatarFilter.js";

import { AvatarRepository } from "./repositories/AvatarRepository.js";
import { VrchatApiService } from "./services/VrchatApiService.js";
import { AvatarMapper } from "./model/AvatarMapper.js";


/* const */

const GRID_SIZE = {
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

// Sync Button
const sync25Btn = document.getElementById('sync25Btn');
const syncAllBtn = document.getElementById('syncAllBtn');

const filterNameBtn = document.getElementById('filterNameBtn');
const filterNameText = document.getElementById('filterNameText');

const sortSelect = document.getElementById('sortSelect');

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
    // Modal Event
    changeAvatarBtn.onclick=()=>alert('{avatar_name}に変更しますか？');
    copyBpidBtn.onclick=()=>navigator.clipboard.writeText('avtr_dummy');
    openWebBtn.onclick=()=>window.open('https://vrchat.com/home/avatars');
    deleteAvatarBtn.onclick=()=>alert('{avatar_name}を削除しますか？');
    closeAvatarDetailBtn.onclick=()=>avatarModal.close();

    // Sync Event
    sync25Btn.addEventListener('click', () => syncAvatars(false));
    syncAllBtn.addEventListener('click', () => syncAvatars(true));

    // Filter Event
    filterNameBtn.addEventListener('click', () => updateList());
    filterNameText.addEventListener("keydown", (e) =>
    {
        if (e.key === "Enter")
        {
            updateList();
        }
    });

    sortSelect.addEventListener("change", () => updateList());

    // Display Cards
    updateList()

    // Size
    setActive(sizeMediumBtn);
}

function updateList()
{
    let result = AvatarRepository.getAll();
    result = filterAvatar(result, filterNameText.value);
    result = sortAvatars(result, sortSelect.value);
    render(result);
}

function render(list)
{
    avatarGrid.innerHTML='';
    list.forEach(avatar=>{
        const grid = document.createElement('div');
        grid.className='grid';
        grid.innerHTML=
            `<div class='grid-thumbnail'>
                <img id='gridAvatarThumbnail' class='grid-thumbnail-img'>
            </div>
            <p class='grid-avatarname'>${avatar.name}</p>
            <button id='detailBtn' class='grid-detail'>詳細</button>
            <button id='changeBtn' class='grid-change'>変更</button>`;

        const avatarThumbnail = grid.querySelector('#gridAvatarThumbnail');
        avatarThumbnail.src = avatar.thumbnail_url;
        avatarThumbnail.alt = avatar.name;
        const detailBtn = grid.querySelector('#detailBtn');
        detailBtn.onclick=()=>{
            openAvatarDetail(avatar.id);
        };
        const changeBtn = grid.querySelector('#changeBtn');
        changeBtn.onclick=()=>{
            alert(avatar.name + "に 変更しますか？");
        }

        avatarGrid.appendChild(grid);
    });
}

// 同期処理
async function syncAvatars(isAll)
{
    try
    {
        // Login User
        const user = await VrchatApiService.getCurrentUser();
        console.log("LoginUser:" + user.id + " " + user.displayName);

        // Get Avatars
        const vrcData = await VrchatApiService.getAvatars(user.id, 0, 2);
        console.log(vrcData);

        // Convert Data
        const avatars = vrcData.map(
            avatar=> {
                return AvatarMapper.AvatarDatafromVRChat(avatar);
            }
        );
        console.log(avatars);

        // updateList ------
        //let result = AvatarRepository.getAll();
        //result = filterAvatar(result, filterNameText.value);
        //result = sortAvatars(result, sortSelect.value);
        //render(result);
        //------

    }
    catch (error)
    {
        if(error.message === "NOT_LOGIN")
        {
            showLoginRequired();
        }
        else
        {
            console.error(error);
        }
    }
}

function changeGridSize(gridWidth, thumbHeight)
{
    document.documentElement.style.setProperty(
        "--grid-width",
        `${gridWidth}px`
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

function openAvatarDetail(id)
{
    const avatar = AvatarRepository.getById(id);
    if (!avatar)
    {
        console.error(`Avatar not found. AvatarId=${id}`);
        return;
    }

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

/* ChangeGridSize */

sizeSmallBtn.addEventListener('click', () => changeGridSize(GRID_SIZE.Small.gridWidth, GRID_SIZE.Small.thumbHeight));
sizeMediumBtn.addEventListener('click', () => changeGridSize(GRID_SIZE.Medium.gridWidth, GRID_SIZE.Medium.thumbHeight));
sizeLargeBtn.addEventListener('click', () => changeGridSize(GRID_SIZE.Large.gridWidth, GRID_SIZE.Large.thumbHeight));

sizeSmallBtn.onclick = () =>
{
    changeGridSize(GRID_SIZE.Small.gridWidth, GRID_SIZE.Small.thumbHeight);
    setActive(sizeSmallBtn);
};
sizeMediumBtn.onclick = () =>
{
    changeGridSize(GRID_SIZE.Medium.gridWidth, GRID_SIZE.Medium.thumbHeight);
    setActive(sizeMediumBtn);
};
sizeLargeBtn.onclick = () =>
{
    changeGridSize(GRID_SIZE.Large.gridWidth, GRID_SIZE.Large.thumbHeight);
    setActive(sizeLargeBtn);
};
