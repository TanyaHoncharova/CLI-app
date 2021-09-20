const asyncHandler = (fn) => {
    return Promise.resolve(fn).catch(error => console.log(error.message));
}

module.exports = asyncHandler;