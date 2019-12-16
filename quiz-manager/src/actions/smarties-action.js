export const removeSmartie = (color) => async dispatch => {
    dispatch({
      type: 'REM_SMRT',
      payload: color
    });
};


