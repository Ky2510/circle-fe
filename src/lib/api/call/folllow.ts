import API from "..";

export const getFollowers = async () => {
    return await API.get('follower', {
        headers: { Authorization: `Bearer ${localStorage.token}` },
    });
}

export const getFollowings = async () => {
    return await API.get('following', {
        headers: { Authorization: `Bearer ${localStorage.token}` },
    });
}