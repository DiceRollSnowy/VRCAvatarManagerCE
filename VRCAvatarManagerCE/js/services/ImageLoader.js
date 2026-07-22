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
            await this.#loadImage(item);
            
            await this.#sleep(250);
        }

        this.#loading = false;
    }

    static async #loadImage(item, retry = 0)
    {
        return new Promise(resolve =>
        {
            item.img.onload = () =>
            {
                resolve(true);
            };

            item.img.onerror = async () =>
            {
                if (retry < 3)
                {
                    console.warn(`Load Image Failed. (Count:${retry + 1})`);
                    await this.#sleep(250);
                    resolve(
                        this.#loadImage(item, retry + 1)
                    );
                }
                else
                {
                    console.error("Load Image Failed.", item.url);
                    resolve(false);
                }
            };
            item.img.src = item.url;
        });
    }

    static #sleep(ms)
    {
        return new Promise(resolve =>
            setTimeout(resolve, ms)
        );
    }
}