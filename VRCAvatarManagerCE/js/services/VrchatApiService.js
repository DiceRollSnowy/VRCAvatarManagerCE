// VRCAPIのやり取り
export class VrchatApiService 
{
    static API_BASE = "https://api.vrchat.cloud/api/1";

    // ログイン中ユーザ情報取得
    static async getCurrentUser()
    {
        const authCookie = await this.getVRChatAuthCookie();

        // 未ログイン
        if (!authCookie)
        {
            throw new Error("NOT_LOGIN");
        }
        await this.setApiAuthCookie(authCookie.value);

        const response  = await fetch(
            "https://api.vrchat.cloud/api/1/auth/user",
            {
                credentials: "include"
            }
        );

        if(response.status === 401)
        {
            throw new Error("NOT_LOGIN");
        }
        else if(!response.ok)
        {
            throw new Error(`VRChat API Error. Status: ${response.status}`);
        }

        const user = await response.json();
        //console.log(user);
        return user;
    }

    // VRChatの認証Cookieを取得
    static async getVRChatAuthCookie()
    {
        return new Promise(resolve=>{
            chrome.cookies.get(
            {
                url:"https://vrchat.com",
                name:"auth"
            },
            cookie=>{
                //console.log(cookie);
                resolve(cookie);
            });
        });
    }

    // api.vrchat.cloud用にcookieを設定
    static async setApiAuthCookie(value)
    {
        return new Promise(resolve=>{
            chrome.cookies.set(
            {
                url:"https://api.vrchat.cloud",
                name:"auth",
                value:value,
                secure:true
            },
            cookie=>{
                //console.log(cookie);
                resolve(cookie);
            });
        });
    }

    // AvatarData 全件取得
    static async getAllAvatar(userId)
    {
        const avatars = [];
        let offset = 0;
        const limit = 50;

        while(true)
        {
            const result = await this.getAvatars(userId, offset, limit);
            avatars.push(...result);

            // 50件未満なら終了
            if(result.length < limit)
            {
                break;
            }

            offset += limit;

            // API負荷対策
            await this.sleep(1000);
        }

        return avatars;
    }
    
    // AvatarData 指定件数取得(50件まで)
    static async getAvatars(userId, offset = 0, n = 50)
    {
        const params = new URLSearchParams({
            user:"me",
            offset:offset,
            n:n,
            releaseStatus:"all",
            sort: "updated",
            order: "descending"
        });

        const url = `${this.API_BASE}/avatars?${params}`
        //console.log(url);

        const response = await fetch(url,
            {
                method:"GET",
                credentials:"include"
            }
        );

        if(response.status === 401)
        {
            throw new Error("NOT_LOGIN");
        }
        if(!response.ok)
        {
            throw new Error(`Avatar Error ${response.status}`);
        }

        return await response.json();
    }

    //
    static async changeAvatar(avatarId)
    {
        const response = await fetch(
            `${this.API_BASE}/avatars/${avatarId}/select`,
            {
                method: "PUT",
                credentials: "include",
            }
        );

        if (!response.ok)
        {
            throw new Error("CHANGE_AVATAR_ERROR");
        }
        return await response.json();
    }

    static sleep(ms)
    {
        return new Promise(
            resolve=>setTimeout(resolve, ms)
        );
    }
}