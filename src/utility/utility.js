export const shouldDisableBtn = (listOfInputs) => {
    const inputs = {...listOfInputs};
    const filledInputs = Object.keys(inputs).filter(key => inputs[key].value === "");
    return filledInputs.length > 0;
}