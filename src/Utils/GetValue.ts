export function getValue(obj, path) {
    if (obj) {
        for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
            if(obj) obj = obj[path[i]];
        };
        return obj;
    }
};