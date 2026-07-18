function filterAvatarName()
{
    const keyword = filterNameText.value;
    const result = filterAvatar(avatars, keyword);
    render(result);
}

function filterAvatar(avatars, keyword)
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