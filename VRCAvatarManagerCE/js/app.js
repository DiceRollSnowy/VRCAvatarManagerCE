import {
    filterAvatar,
    sortAvatars
} from "./filter/AvatarFilter.js";

import { AvatarRepository } from "./repositories/AvatarRepository.js";
import { VrchatApiService } from "./services/VrchatApiService.js";
import { ImageLoader } from "./services/ImageLoader.js";
import { Utils } from "./util/Utils.js";

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

const avatarDialog = document.getElementById('avatarDetailDialog');
const changeAvatarBtn = document.getElementById('changeAvatarBtn');
const copyAvatarIdBtn = document.getElementById('copyAvatarIdBtn');
const openAvatarPageBtn = document.getElementById('openAvatarPageBtn');
const deleteAvatarBtn = document.getElementById('deleteAvatarBtn');
const closeAvatarDetailBtn = document.getElementById('closeAvatarDetailBtn');

const dialogAvatarId = document.getElementById("avatarId");
const dialogAvatarName = document.getElementById("avatarName");
const dialogAvatarThumbnail = document.getElementById("avatarThumbnail");
const dialogAvatarDescription = document.getElementById("avatarDescription");
const dialogAvatarPlatform = document.getElementById("avatarPlatform");
const dialogAvatarPerformanceRank = document.getElementById("avatarPerformanceRank");
const dialogAvatarCreatedAt = document.getElementById("avatarCreatedAt");
const dialogAvatarUpdatedAt = document.getElementById("avatarUpdatedAt");



/* Initialize */

initializeEvents();

/* Fuction */

async function initializeEvents()
{
    // Dialog Event
    changeAvatarBtn.addEventListener('click', () => changeAvatar());
    copyAvatarIdBtn.addEventListener('click', () => copyAvatarId());
    openAvatarPageBtn.addEventListener('click', () => openAvatarWebPage());
    deleteAvatarBtn.addEventListener('click', () => deleteAvatar());
    closeAvatarDetailBtn.addEventListener('click', () => avatarDialog.close());

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
    try
    {
        await AvatarRepository.dataSync();
        updateList();
    }
    catch (error)
    {
        if(error.message === "NOT_LOGIN")
        {
            console.error("VRChat Not Login");
            //showLoginRequired();
        }
        else
        {
            console.error(error);
        }
    }

    // Size
    setActive(sizeMediumBtn);
}

async function updateList()
{
    try
    {
        let result = await AvatarRepository.getAll();
        //console.log(result);

        result = filterAvatar(result, filterNameText.value);
        result = sortAvatars(result, sortSelect.value);
        render(result);
    }
    catch (error)
    {
        if(error.message === "NOT_LOGIN")
        {
            console.error("VRChat Not Login");
            //showLoginRequired();
        }
        else
        {
            console.error(error);
        }
    }
}

async function render(list)
{
    avatarGrid.innerHTML='';
    list.forEach(avatar=>{
        const grid = document.createElement('div');
        grid.className='grid';
        grid.innerHTML=
            `<div class='grid-thumbnail'>
                <img class='grid-thumbnail-img'>
            </div>
            <p class='grid-avatarname'>${avatar.name}</p>
            <button class='grid-detail'>詳細</button>
            <button class='grid-change'>変更</button>`;

        const avatarThumbnail = grid.querySelector('.grid-thumbnail-img');
        ImageLoader.enqueue(avatarThumbnail, avatar.thumbnail_url);
        avatarThumbnail.alt = avatar.name;

        const detailBtn = grid.querySelector('.grid-detail');
        detailBtn.onclick=()=>{
            openAvatarDetail(avatar.id);
        };
        
        const changeBtn = grid.querySelector('.grid-change');
        changeBtn.onclick=()=>{
            changeAvatarById(avatar.id, avatar.name);
        }

        avatarGrid.appendChild(grid);
    });
}

// 同期処理
async function syncAvatars(isAll)
{
    try
    {
        updateList();
    }
    catch (error)
    {
        if(error.message === "NOT_LOGIN")
        {
            console.error("VRChat Not Login");
            //showLoginRequired();
        }
        else
        {
            console.error(error);
        }
    }
}

// アバター変更
async function changeAvatar()
{
    const avatarId = avatarDialog.dataset.avatarId;
    const avatarName = avatarDialog.dataset.avatarName;
    await changeAvatarById(avatarId, avatarName);
}

async function changeAvatarById(avatarId, avatarName)
{
    alert("ChangeAvatar: " + avatarName);
    try
    {
        await VrchatApiService.changeAvatar(avatarId);
        alert("アバターを変更しました。");
    }
    catch(error)
    {
        if(error.message === "CHANGE_AVATAR_ERROR")
        {
            alert("アバター変更に失敗しました。");
        }
        else
        {
            console.error(error);
        }
    }

}

// Clipboard
function copyAvatarId()
{
    const avatarId = avatarDialog.dataset.avatarId;
    const avatarName = avatarDialog.dataset.avatarName;
    navigator.clipboard.writeText(avatarId);
    alert("Clipboard: " + avatarId);
    console.log(avatarName)
}

// アバターページを開く
function openAvatarWebPage()
{
    const avatarId = avatarDialog.dataset.avatarId;
    const avatarName = avatarDialog.dataset.avatarName;
    //console.log(avatarId);
    let link = `https://vrchat.com/home/avatar/${avatarId}`;
    window.open(link, "_blank");
}

// アバター削除
function deleteAvatar()
{
    const avatarId = avatarDialog.dataset.avatarId;
    const avatarName = avatarDialog.dataset.avatarName;
    alert("DeleteAvatar: " + avatarName);
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

    console.log(avatar);

    // datasetに保存
    avatarDialog.dataset.avatarId = avatar.id;
    avatarDialog.dataset.avatarName = avatar.name;

    const avatarThumbnail = avatarDialog.querySelector('#avatarThumbnail');
    ImageLoader.enqueue(avatarThumbnail, avatar.thumbnail_url);
    avatarThumbnail.alt = avatar.name;

    dialogAvatarName.textContent = avatar.name;
    dialogAvatarDescription.textContent = avatar.description;
    dialogAvatarPlatform.textContent = "-";
    //dialogAvatarPlatform.textContent = avatar.platform;

    const prankPC = avatar.performance_rating_pc;
    const prankAndroid = avatar.performance_rating_android;
    const prankIOS = avatar.performance_rating_ios;
    const perfmanceRank = `${prankPC} / ${prankAndroid} / ${prankIOS}`
    dialogAvatarPerformanceRank.textContent = perfmanceRank;

    const createdAt = Utils.formatDate(avatar.created_at);
    const updatedAt = Utils.formatDate(avatar.updated_at);
    dialogAvatarCreatedAt.textContent = createdAt;
    dialogAvatarUpdatedAt.textContent = updatedAt;

    avatarDialog.showModal();
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
