export class ImageLoader
{
    static #queue = [];
    static #loading = false;
    static #cache = new Map();
    
    static enqueue(img, url)
    {
        this.#queue.push({img, url});
        this.#load();
    }

    static async #load() 
    {
        if (this.#loading) 
        {
            return;
        }

        this.#loading = true;

        while (this.#queue.length > 0) 
        {
            const item = this.#queue.shift();

            // メモリキャッシュがあればそのまま表示 
            if (this.#cache.has(item.url)) 
            {
                item.img.src = this.#cache.get(item.url);
                continue; 
            }

            // 初回のみ取得 
            item.img.onload = () => {
                this.#cache.set(item.url, item.img.src); 
            };
            item.img.src = item.url;
            
            await this.#sleep(200);
        }

        this.#loading = false;
    }

    static #sleep(ms)
    {
        return new Promise(resolve =>
            setTimeout(resolve, ms)
        );
    }
}