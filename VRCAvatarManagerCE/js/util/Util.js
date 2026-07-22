export class Utils
{
    // "2026-07-21T04:51:36.652Z" を変換 (ローカル時間)
    static formatDate(dateString) 
    {
        const date = new Date(dateString);

        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");

        const hh = String(date.getHours()).padStart(2, "0");
        const mi = String(date.getMinutes()).padStart(2, "0");
        const ss = String(date.getSeconds()).padStart(2, "0");

        //const result = `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
        //console.log(dateString + " -> " + result);
        return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
    }

}