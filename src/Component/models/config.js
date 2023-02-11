import MemoryKeys from "./MemoryKeys";

export const config = {
    headers: {
        "content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem(MemoryKeys.UserToken),
    },
};