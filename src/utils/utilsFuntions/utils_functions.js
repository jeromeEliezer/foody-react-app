function getStorage(local_storage){
    if(local_storage!== "" && local_storage !== null){
        let addFavorite = local_storage.split("  ,");
        addFavorite = addFavorite.map(el => JSON.parse(el));
        return addFavorite;
    }
    return [];
}

export default getStorage