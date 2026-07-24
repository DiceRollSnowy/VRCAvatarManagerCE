const SORT_TYPE = 
{
    NAME_ASC: "nameAsc",
    NAME_DESC: "nameDesc",
    UPDATED_ASC: "updatedAsc",
    UPDATED_DESC: "updatedDesc",
    CREATED_ASC: "createdAsc",
    CREATED_DESC: "createdDesc"
}

/* filter */

function filterAvatarName()
{
    const keyword = filterNameText.value;
    const result = filterAvatar(avatars, keyword);
    render(result);
}

export function filterAvatar(avatars, keyword)
{
    keyword = keyword.trim().toLowerCase();
    if (!keyword)
    {
        return avatars;
    }

    return avatars.filter(a =>
    {
        // avatarNameのみ検索対象
        return [
            a.name
        ]
        .join(" ")
        .toLowerCase()
        .includes(keyword);
    });
}

/* Sort */

export function sortAvatars(avatars, sortType)
{
    const sorted = [...avatars]; // 元データは変更しない

    switch (sortType)
    {
        case SORT_TYPE.NAME_ASC:
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;

        case SORT_TYPE.NAME_DESC:
            sorted.sort((a, b) => b.name.localeCompare(a.name));
            break;

        case SORT_TYPE.UPDATED_ASC:
            sorted.sort((a, b) => a.updated_at.localeCompare(b.updated_at));
            break;

        case SORT_TYPE.UPDATED_DESC:
            sorted.sort((a, b) => b.updated_at.localeCompare(a.updated_at));
            break;

        case SORT_TYPE.CREATED_ASC:
            sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            break;

        case SORT_TYPE.CREATED_DESC:
            sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
    }

    return sorted;
}
