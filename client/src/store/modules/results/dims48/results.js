function compareValues(operator, value1, value2) {
    let value = false;
    switch (operator) {
        case "=":
            value = (value1 == value2);
            break;
        default:
            value = eval(`${value1}${operator}${value2}`);
            break;
    }
    return value;
}

function applyFilter(arr, property, value, operator) {
    console.log(property, value, operator);
    return arr.filter(e => compareValues(operator, e.clientInfo[property], value));
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
                results = applyFilter(results, filter.property, filter.value, filter.operator);
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
        clearFilters: function(state) {
            state.filters = [];
        },
        addFilter: function (state, filter) {
            state.filters.push(filter);
        }
    },
}