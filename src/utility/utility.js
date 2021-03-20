export const shouldDisableBtn = (listOfInputs) => {
    const inputs = {...listOfInputs};
    const filledInputs = Object.keys(inputs).filter(key => inputs[key].value === "");
    return filledInputs.length > 0;
}

export const resetInputFields = (listOfInputs) => {
    const inputs = {...listOfInputs};
    const newInputs = {}
    Object.keys(inputs).forEach(key => {
        inputs[key].value = "";
        newInputs[key] = inputs[key];
    });



    return newInputs;
}