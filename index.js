function dataBinding(initialData) {
    const render = (elem, value) => elem.innerHTML = value;
    const renderInBindedElements = (prop, value) => {
        const bindedElems = document.querySelectorAll(`[data-bind-${prop}]`);
        bindedElems.forEach(elem => render(elem, value));
    };
    const state = new Proxy(initialData, {
        set(obj, prop, value) {
            obj[prop] = value;
            renderInBindedElements(prop, value);
        }
    });

    Object.keys(initialData).forEach(key => {
        renderInBindedElements(key, initialData[key]);
    });

    return state;
}

// Get instance of binded object with passed in initial values
let state = dataBinding({
    name: 'Some name',
    name2: 'Second Name',
    something: 'random text',
    anythingElse: 123
});

// Now if you update something in state, the changes will be reflected to template
state.name = 'Some other Name';
state.something = 'another random text';