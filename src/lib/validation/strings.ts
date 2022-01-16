export function isNullOrEmpty(val: string) {

    if (!val) return true;
    else if (val == undefined || val == null) return true
    else if (val == '') return true
    else if (val.length == 0) return true
    else if (!/\S/.test(val)) return true;

    return false;
}

export function isEmail(email: string) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};