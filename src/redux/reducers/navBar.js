import { NAV_BAR } from '../actions/actionType';

const initState = {
  showNavbar: false
};

export default function NavBar(state = initState, action) {
  switch (action.type) {
    case NAV_BAR.NAV_BAR_ACTION: {
      return { showNavbar: action.show };
    }
    default:
      return state;
  }
}
