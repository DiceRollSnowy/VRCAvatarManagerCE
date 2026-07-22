import { VrchatApiService } from "/js/services/VrchatApiService.js";
import { AvatarMapper } from "/js/model/AvatarMapper.js";

export class AvatarRepository
{
    static #avatars = [];
    static #avatarMap = new Map();

    static async dataSync()
    {
        try
        {
            // Login User
            const user = await VrchatApiService.getCurrentUser();
            //console.log("LoginUser:" + user.id + " " + user.displayName);
    
            // Get Avatars
            const vrcData = await VrchatApiService.getAvatars(user.id, 0, 3);
            //const vrcData = await VrchatApiService.getAllAvatar(user.id);
            //console.log(vrcData);
    
            // Convert Data
            this.#avatars = vrcData.map(
                avatar => AvatarMapper.AvatarDatafromVRChat(avatar)
            );
            this.#avatarMap.clear();

            for (const avatar of this.#avatars) 
            {
                this.#avatarMap.set(avatar.id, avatar);
            }

            //console.log(avatars);
        }
        catch (error)
        {
            if(error.message === "NOT_LOGIN")
            {
                throw new Error("NOT_LOGIN");
            }
            else
            {
                console.error(error);
            }
        }
    }

    static async getAll() 
    {
        return this.#avatars;
        //return sampleAvatars; // SampleData
    }

    static getById(id)
    {
        return this.#avatars.find
        (
            avatar => avatar.id === id
        );
        //return sampleAvatars.find(avatar => avatar.id === id); // SampleData
    }
    
    static search(keyword)
    {

    }

    static sort(sortType)
    {

    }

    static add(avatar)
    {

    }

    static update(avatar)
    {

    }

    static delete(id)
    {

    }

}