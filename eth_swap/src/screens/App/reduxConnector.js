import { connect } from "react-redux";

import { getWeb3Loaded, getAccount, getLoading } from "../../store/selectors";
import { loadWeb3, loadBlockchainData } from "../../store/thunk";

const mapStateToProps = (state) => ({
  loading: getLoading(state),
  web3Loaded: getWeb3Loaded(state),
  account: getAccount(state),
});

const mapDispatchToProps = {
  loadWeb3,
  loadBlockchainData,
};

const Connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default Connector;
