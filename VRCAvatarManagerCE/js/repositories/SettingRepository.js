class SettingsRepository
{
    static async getCardSize()
    {
        const result = await chrome.storage.local.get("cardSize");
        return result.cardSize ?? "Medium";
    }

    static async setCardSize(size)
    {
        await chrome.storage.local.set({
            cardSize:size
        });
    }
}