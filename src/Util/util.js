export const getDateIDFromDate = (date) => {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const today = dd + '-' + mm + '-' + yyyy;
    return today;
}

export const getDateObjFromID = (dateString) => {
    let [dd, mm, yyyy ] = dateString.split('-');
    const newDate = new Date(+yyyy, mm-1, +dd);
    return newDate;

}