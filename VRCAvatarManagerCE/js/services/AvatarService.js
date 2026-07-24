import { ConfirmDialog } from "/js/ui/ConfirmDialog.js";
import { VrchatApiService } from "/js/services/VrchatApiService.js";
import { Toast } from "/js/ui/Toast.js";

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
            //alert("アバターを変更しました。");
            Toast.success("アバターの変更に成功しました");
        }
        catch(error)
        {
            if(error.message === "NOT_LOGIN")
            {
                Toast.warning("VRChatにログインされていません");
            }
            else
            {
                Toast.error("アバターの変更に失敗しました");
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

        try
        {
            alert("DeleteAvatar: " + avatarName);
            //await VrchatApiService.changeAvatar(avatarId);
            //alert("アバターを変更しました。");
            Toast.success("アバターの削除に成功しました");
        }
        catch(error)
        {
            if(error.message === "NOT_LOGIN")
            {
                Toast.warning("VRChatにログインされていません");
            }
            else
            {
                Toast.error("アバターの削除に失敗しました");
                console.error(error);
            }
        }
    }
}