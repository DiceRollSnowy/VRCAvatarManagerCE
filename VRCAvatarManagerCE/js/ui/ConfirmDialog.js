export class ConfirmDialog 
{
    static #resolve;

    static show(title, message, type) 
    {
        const dialog = document.getElementById("confirmDialog");

        const confirmTitle = document.getElementById("confirmTitle");
        const confirmMessage = document.getElementById("confirmMessage");

        const okBtn = document.getElementById("confirmOkBtn");
        const cancelBtn = document.getElementById("confirmCancelBtn");
        okBtn.addEventListener("click", () => {
            dialog.close();
            this.#resolve(true);
        });
        cancelBtn.addEventListener("click", () => {
            dialog.close();
            this.#resolve(false);
        });

        confirmTitle.textContent = title;
        confirmMessage.textContent = message;

        okBtn.classList.remove("active", "warning", "danger");
        if (type === "warning")
        {
            okBtn.classList.add("warning");
        }
        else if (type === "danger")
        {
            okBtn.classList.add("danger");
        }
        else
        {
            okBtn.classList.add("active");
        }

        return new Promise(resolve => {
            this.#resolve = resolve;
            dialog.showModal();
        });
    }
}