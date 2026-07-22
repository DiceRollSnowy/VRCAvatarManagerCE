export class ImageLoader
{
    static #queue = [];
    static #loading = false;

    static enqueue(img, url)
    {
        this.#queue.push({img, url});
        this.#run();
    }

    static async #run() 
    {
        if (this.#loading) 
        {
            return;
        }

        this.#loading = true;

        while (this.#queue.length > 0) 
        {
            const item = this.#queue.shift();
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