function addHours(data, hrs) {
    function calculateHours(item, index, arr) {
        arr[index]['hours'] = Math.round(arr[index]['percent'] * hrs / 100);
    }
    data.forEach(calculateHours)
    return data
}

module.exports = addHours;
