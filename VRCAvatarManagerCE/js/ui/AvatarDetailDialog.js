import { ImageLoader } from "/js/services/ImageLoader.js";
import { Utils } from "/js/util/Utils.js";
import { AvatarService } from "/js/services/AvatarService.js";
import { Toast } from "/js/ui/Toast.js";

export class AvatarDetailDialog 
{
    static #instance;
    #avatar;

    static getInstance()
    {
        if (!this.#instance) 
        {
            this.#instance = new AvatarDetailDialog();
        }
        return this.#instance;
    }

    constructor() 
    {
        this.dialog = document.getElementById("avatarDetailDialog");
        this.initialize();
    }

    initialize()
    {
        this.changeAvatarBtn = document.getElementById("changeAvatarBtn");
        this.copyAvatarIdBtn = document.getElementById("copyAvatarIdBtn");
        this.openAvatarPageBtn = document.getElementById("openAvatarPageBtn");
        this.deleteAvatarBtn = document.getElementById('deleteAvatarBtn');
        this.closeAvatarDetailBtn = document.getElementById('closeAvatarDetailBtn');

        this.changeAvatarBtn.addEventListener("click", () => 
            this.#changeAvatar()
        );
        this.copyAvatarIdBtn.addEventListener("click", () => 
            this.#copyAvatarId()
        );
        this.openAvatarPageBtn.addEventListener("click", () =>
            this.#openAvatarWebPage()
        );
        this.deleteAvatarBtn.addEventListener("click", () => 
            this.#deleteAvatar()
        );
        this.closeAvatarDetailBtn.addEventListener('click', () =>
            this.dialog.close()
        );
    }

    show(selectedAvatar)
    {
        this.#avatar = selectedAvatar;
        this.#setAvatar(selectedAvatar);
        this.dialog.showModal();
    }

    #setAvatar(avatar) 
    {
        const dialogAvatarId = document.getElementById("avatarId");
        const dialogAvatarName = document.getElementById("avatarName");
        const dialogAvatarThumbnail = document.getElementById("avatarThumbnail");
        const dialogAvatarDescription = document.getElementById("avatarDescription");
        const dialogAvatarPlatform = document.getElementById("avatarPlatform");
        const dialogAvatarPerformanceRank = document.getElementById("avatarPerformanceRank");
        const dialogAvatarCreatedAt = document.getElementById("avatarCreatedAt");
        const dialogAvatarUpdatedAt = document.getElementById("avatarUpdatedAt");

        //const avatarThumbndialogAvatarThumbnailail = grid.querySelector('.avatarThumbnail');
        //const avatarThumbnail = grid.querySelector('.avatar-detail-thumbnail-img');
        ImageLoader.enqueue(dialogAvatarThumbnail, avatar.thumbnail_url);
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
    }

    // Clipboard
    #copyAvatarId()
    {
        const avatarId = this.#avatar.id;
        navigator.clipboard.writeText(avatarId);
        console.log("clipboard copied: " + avatarId);
        Toast.info("クリップボードにコピーしました。");
    }
    
    // アバターページを開く
    #openAvatarWebPage()
    {
        const avatarId = this.#avatar.id;
        let link = `https://vrchat.com/home/avatar/${avatarId}`;
        window.open(link, "_blank");
    }

    // アバター変更
    async #changeAvatar()
    {
        const avatarId = this.#avatar.id;
        const avatarName = this.#avatar.name;
     
        const result = await AvatarService.changeAvatar(avatarId, avatarName);
        if (result.success)
        {
            Toast.success(`アバターの変更に成功しました: ${avatarName}`);
            this.dialog.close();
        }
        else
        {
            const message = result.message;
            if(message === "CANCEL")
            {
                //
            }
            else if(message === "NOT_LOGIN")
            {
                Toast.warning("VRChatにログインされていません");
            }
            else
            {
                Toast.error("アバターの変更に失敗しました");
            }
        }
    }

    // アバター削除
    async #deleteAvatar()
    {
        const avatarId = this.#avatar.id;
        const avatarName = this.#avatar.name;

        const result = await AvatarService.deleteAvatar(avatarId, avatarName);
        if (result.success)
        {
            Toast.warning("現在アバター削除機能は実装されていません"); // wip
            //Toast.success(`アバターの削除に成功しました: ${avatarName}`);
            this.dialog.close();
        }
        else
        {
            const message = result.message;
            if(message === "CANCEL")
            {
                //
            }
            else if(message === "NOT_LOGIN")
            {
                Toast.warning("VRChatにログインされていません");
            }
            else
            {
                Toast.error("アバターの削除に失敗しました");
            }
        }
    }
}
