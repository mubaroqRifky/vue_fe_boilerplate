export const isExpired = (time) => {
    return new Date().getTime() > time;
};

export const setPathRedirect = (path, timeInMin = 5) => {
    const objPath = {
        path,
        exp: new Date().getTime() + 60000 * timeInMin,
    };
    sessionStorage.setItem("path", JSON.stringify(objPath));
};

export const removePathRedirect = () => {
    sessionStorage.removeItem("path");
};

export const checkPathRedirect = () => {
    try {
        let path = sessionStorage.getItem("path");
        path = JSON.parse(path);

        if (isExpired(path.exp)) {
            sessionStorage.removeItem("path");
            return null;
        } else {
            return path;
        }
    } catch (error) {
        return null;
    }
};

export const formatRupiah = (
    angka,
    prefix,
    accept = "comma",
    fixed = false
) => {
    const regex = accept == "comma" ? /[^,\d]/g : /[^.\d]/g;
    const comma = accept == "comma" ? "," : ".";

    let number_string = String(angka).replace(regex, "").toString(),
        split = number_string.split(comma),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (rupiah.match(/^0{2}/)) return !prefix ? 0 : "Rp. " + 0;
    if (ribuan) {
        let separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
    }

    if (fixed) {
        rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
    }
    const result = !prefix ? rupiah : rupiah ? "Rp. " + rupiah : "";
    return result;
};

export const formatRupiahToNumber = (rupiahFormat) => {
    const result = rupiahFormat.replace(/[^\d,]+/g, "").replace(/[,]+/g, ".");
    return Number(result);
};
