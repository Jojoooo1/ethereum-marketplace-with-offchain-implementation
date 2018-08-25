export default function(state = false, action) {
  if (action.type === "GET_ARBITER") {
    return action.payload;
  } else {
    return state;
  }
}
