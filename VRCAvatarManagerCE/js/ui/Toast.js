export class Toast 
{
    static #timer;

    static show(message, type = "info", duration = 3000)
    {
        const toast = document.getElementById("toast");
        const label = document.getElementById("toastMessage");

        label.textContent = message;

        toast.className = "toast";
        toast.classList.add(type);
        toast.classList.add("show");

        clearTimeout(this.#timer);

        this.#timer = setTimeout(() => {
            toast.classList.remove("show");
        }, duration);
    }

    static success(message) 
    {
        this.show(message, "success");
    }

    static info(message) 
    {
        this.show(message, "info");
    }

    static warning(message)
    {
        this.show(message, "warning", 5000);
    }

    static error(message)
    {
        this.show(message, "error", 5000);
    }
}