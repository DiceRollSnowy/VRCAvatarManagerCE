import {
    filterAvatar,
    sortAvatars
} from "./filter/AvatarFilter.js";

import { AvatarRepository } from "./repositories/AvatarRepository.js";
import { VrchatApiService } from "./services/VrchatApiService.js";
import { ImageLoader } from "./services/ImageLoader.js";
import { Utils } from "./util/Utils.js";

import { ConfirmDialog } from "./ui/ConfirmDialog.js";
import { AvatarDetailDialog } from "./ui/AvatarDetailDialog.js";

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

// Status
const avatarCount = document.getElementById('avatarCount');

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


// Confirm Dialog
const confirmDialog = document.getElementById("confirmDialog");
const confirmTitle = document.getElementById("confirmTitle");
const confirmMessage = document.getElementById("confirmMessage");
const confirmOkBtn = document.getElementById("confirmOkBtn");
const confirmCancelBtn = document.getElementById("confirmCancelBtn");

/* Initialize */

initializeEvents();

/* Fuction */

async function initializeEvents()
{
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

        displayAvatarCount(result.length);
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
            openAvatarDetail(avatar.id)
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
    const syncNum = isAll ? "全件" : "25件";

    // Confirm
    const title = "アバター同期";
    const message = `アバターを ${syncNum} 同期しますか？`
    const type = "normal";

    const result = await ConfirmDialog.show(title, message, type);
    if (!result) return;

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
    // Confirm
    const title = "アバター変更";
    const message = `アバターを ${avatarName}に 変更しますか？`;
    const type = "normal";

    const result = await ConfirmDialog.show(title, message, type);
    if (!result) return;

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

// アバター削除
async function deleteAvatar()
{
    const avatarId = avatarDialog.dataset.avatarId;
    const avatarName = avatarDialog.dataset.avatarName;

    // Confirm
    const title = "アバター削除";
    const message = `${avatarName} を削除しますか？`
    const type = "danger";

    const result = await ConfirmDialog.show(title, message, type);
    if (!result) return;

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

//
function displayAvatarCount(count)
{
    if (count < 0)
    {
        count = 0;
    }
    avatarCount.textContent = `${count} 件`
}

//
function setActive(button)
{
    sizeButtons.forEach(b => b.classList.remove("active"));
    button.classList.add("active");
}

// アバター詳細ダイアログ
function openAvatarDetail(id)
{
    const avatar = AvatarRepository.getById(id);
    if (!avatar)
    {
        console.error(`Avatar not found. AvatarId=${id}`);
        return;
    }
    console.log(avatar);

    const dialog = AvatarDetailDialog.getInstance();
    dialog.show(avatar);
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
