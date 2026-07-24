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

            return { 
                success: true,
                message: ""
            };
        }
        catch(error)
        {
            if(error.message === "NOT_LOGIN")
            {
                return { 
                    success: false,
                    message: "NOT_LOGIN"
                };
            }
            else
            {
                console.error(error);
                return { 
                    success: false,
                    message: error.message
                };
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
            //await VrchatApiService.deleteAvatar(avatarId);
            //alert("DeleteAvatar: " + avatarName);

            return { 
                success: true,
                message: ""
            };
        }
        catch(error)
        {
            if(error.message === "NOT_LOGIN")
            {
                return { 
                    success: false,
                    message: "NOT_LOGIN"
                };
            }
            else
            {
                console.error(error);
                return { 
                    success: false,
                    message: error.message
                };
            }
        }
    }
}