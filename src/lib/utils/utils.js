export function splitArray(array, chunkSize) {
    const result = [];

    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        result.push(chunk);
    }

    return result;
}

export function getUrls(array, pb) {
    array.forEach(element => {
        element.content = pb.files.getUrl(element, element.content);
    });
}

export function getAvatar(user, pb) {
    if (!user.avatar) {
        user.avatar = "https://api.dicebear.com/7.x/pixel-art/svg?seed=" + user.username;
        return;
    }

    user.avatar = pb.files.getUrl(user, user.avatar);
}