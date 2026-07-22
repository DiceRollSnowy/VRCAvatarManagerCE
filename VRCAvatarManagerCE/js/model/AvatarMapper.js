export class AvatarMapper  
{
    static AvatarDatafromVRChat(data)
    {
        const performance = data.performance ?? [];
        const performance_pc = performance.standalonewindows ?? "";
        const performance_android = performance.android ?? "";
        const performance_ios = performance.ios ?? "";

        return new Avatar({
            upload_user_id:data.authorId,
            id:data.id,
            name:data.name,
            description:data.description,
            thumbnail_url:data.thumbnailImageUrl,
            upload_user_id:data.authorId,
            created_at:data.created_at,
            updated_at:data.updated_at,
            performance_rating_pc:performance_pc,
            performance_rating_android:performance_android,
            performance_rating_ios:performance_ios
        });
    }
}