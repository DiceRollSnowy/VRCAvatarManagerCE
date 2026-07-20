// VRCAPIのやり取り
export class VrchatApiService 
{
    static async login()
    {   

    }

    // ログイン中ユーザ情報取得
    static async getCurrentUser()
    {
        const authCookie = await this.getVRChatAuthCookie();
        console.log("Cookie: " + authCookie.value);

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
        console.log(user);
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
    
    static async getAvatars()
    {

    }

    static async getAvatar(id)
    {

    }
}