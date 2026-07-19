export class AvatarRepository
{
    static getAll() 
    {
        return sampleAvatars;
    }

    static getById(id)
    {
        return sampleAvatars.find(avatar => avatar.id === id);
        //return await db.avatars.get(id);
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