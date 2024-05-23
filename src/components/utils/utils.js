function importAllMedia(r) {
    let images = [];
    r.keys().forEach((item, index) => { images.push(r(item)); });
    return images;
}
export { importAllMedia }