export const getColor = function getColor(name: string) {
    let dom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;
    return getComputedStyle(dom).getPropertyValue("--sidooh-".concat(name)).trim();
};