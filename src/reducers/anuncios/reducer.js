import produce from "immer";

const initalState = [[], 0];

export default function anuncios(state = initalState, action) {
  switch (action.type) {
    case "@anuncios/BUSCAR":
      return produce(state, draft => {
        draft[0] = action.anuncios;
        draft[1] = action.total;
      });
    default:
      return state;
  }
}
