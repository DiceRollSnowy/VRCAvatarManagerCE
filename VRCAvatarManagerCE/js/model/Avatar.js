class Avatar 
{
    constructor(data)
    {
        this.upload_user_id = data.upload_user_id;
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.thumbnail_url = data.thumbnail_url;
        this.performance_rating_pc = data.performance_rating_pc;
        this.performance_rating_android = data.performance_rating_android;
        this.performance_rating_ios = data.performance_rating_ios;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at; 
    }
}