import { ConfirmDialog } from "/js/ui/ConfirmDialog.js";
import { VrchatApiService } from "/js/services/VrchatApiService.js";

export class AvatarService 
{
    static async changeAvatar(avatarId, avatarName)
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
    static async deleteAvatar(avatarId, avatarName)
    {
        // Confirm
        const title = "アバター削除";
        const message = `${avatarName} を削除しますか？`
        const type = "danger";

        const result = await ConfirmDialog.show(title, message, type);
        if (!result) return;

        alert("DeleteAvatar: " + avatarName);
    }
}