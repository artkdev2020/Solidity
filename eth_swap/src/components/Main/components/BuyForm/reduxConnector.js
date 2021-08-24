import { connect } from "react-redux";

import { getEthBalance, getTokenBalance } from "../../../../store/selectors";
import { buyTokens } from "../../../../store/thunk";

const mapStateToProps = (state) => ({
  ethBalance: getEthBalance(state),
  tokenBalance: getTokenBalance(state),
});

const mapDispatchToProps = {
  buyTokens,
};

const Connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default Connector;
