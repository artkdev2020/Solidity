import { connect } from "react-redux";

import { getCurrentForm } from "../../store/selectors";
import { changeCurrentForm } from "../../store/thunk";

const mapStateToProps = (state) => ({
  currentForm: getCurrentForm(state),
});

const mapDispatchToProps = {
  changeCurrentForm,
};

const Connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default Connector;
