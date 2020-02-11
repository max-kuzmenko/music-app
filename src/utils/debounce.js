
const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        let later = () => {
            timeout = null;
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, delay);
    };
};

export default debounce;
