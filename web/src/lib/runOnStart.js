export const isCreateWritableSupported = async () => {
    const root = await navigator.storage.getDirectory();    
    const fileHandle = await root.getFileHandle("test.test", {create:true});

    if('createWritable' in fileHandle){
        return true;
    }
    return false;
}