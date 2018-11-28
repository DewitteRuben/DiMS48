function compareValues(operator, value1, value2, type) {
    if (type === String) {
        value1 = value1.toLowerCase();
        value2 = value2.toLowerCase();
    }

    let value = false;
    switch (operator) {
        case "=":
            value = (value1 === value2);
            break;
        case "≠":
            value = (value1 !== value2);
            break;
        case "≤":
            value = (value1 <= value2);
            break;
        case "≥":
            value = (value1 >= value2);
            break;
        case "Bevat":
            value = (value1.includes(value2));
            break;
        default:
            value = eval(`${value1}${operator}${value2}`);
            break;
    }
    return value;
}

function getValueByPropertyPath(object, path) {
    return [object].concat(path.split('.')).reduce((a, b) => a[b]);
}

function applyFilter(arr, property, value, operator, type) {
    return arr.filter(e => compareValues(operator, getValueByPropertyPath(e, property), value, type));
}


function initialState() {
    return {
        resultFeed: null,
        filters: [],
    }
}

function deepClone(structure) {
    return JSON.parse(JSON.stringify(structure));
}

export default {
    namespaced: true,
    state: initialState,
    getters: {
        filteredFeed: function (state) {
            let results = deepClone(state.resultFeed);
            state.filters.forEach(filter => {
                results = applyFilter(results, filter.property, filter.value, filter.operator, filter.type);
            });
            return results;
        }
    },
    actions: {

    },
    mutations: {
        setResultFeed: function (state, resultFeed) {
            state.resultFeed = resultFeed;
        },
        removeFilter: function (state, id) {
            state.filters.splice(id, 1);
        },
        clearFilters: function (state) {
            state.filters = [];
        },
        addFilter: function (state, filter) {
            state.filters.push(filter);
        }
    },
}