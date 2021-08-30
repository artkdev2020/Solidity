import { connect } from "react-redux";

import {
  getEthBalance,
  getTokenBalance,
  getCalculatedEthBalance,
  getCalculatedTokenBalance,
} from "../../../store/selectors";
import {
  sellTokens,
  calculateEthBalance,
  calculateTokenBalance,
} from "../../../store/thunk";

const mapStateToProps = (state) => ({
  ethBalance: getEthBalance(state),
  tokenBalance: getTokenBalance(state),
  calculatedEthBalance: getCalculatedEthBalance(state),
  calculatedTokenBalance: getCalculatedTokenBalance(state),
});

const mapDispatchToProps = {
  sellTokens,
  calculateEthBalance,
  calculateTokenBalance,
};

const Connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default Connector;
