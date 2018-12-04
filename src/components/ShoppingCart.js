import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { removeFromCart, removeProductItem, addToCart } from "../actions";
import { Affix, Card, List, Avatar, Button, Popconfirm } from "antd";
import { Link } from "react-router-dom";

class ShoppingCart extends Component {
  renderCheckoutButton = total => {
    if (total > 0) {
      return <Link to="/checkout/">Checkout</Link>;
    }

    return <p>Minumum amount to checkout = 500</p>;
  };

  renderProductList = () => {
    const total = this.props.cart.reduce(
      (prev, curr) => prev + curr.qty * curr.price,
      0
    );

    return (
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={this.props.cart}
          renderItem={item => (
            <List.Item
              actions={[
                (item.qty > 1 &&
                  <Button
                    type="primary"
                    icon="minus"
                    onClick={() => this.props.removeProductItem(item)} />),
                <Button
                  type="primary"
                  icon="plus"
                  onClick={() => this.props.addToCart(item)} />,
                <Popconfirm
                  placement="top"
                  title={"Are you sure to delete this item?"}
                  onConfirm={() => this.props.removeFromCart(item)}
                  okText="Yes"
                  cancelText="No">
                  <Button
                    type="danger"
                    icon="delete"
                  />
                </Popconfirm>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.images[0].src} />}
                title={`${item.qty} x ${item.name}`}
                description={`$ ${item.qty * item.price}`}
              />
            </List.Item>
          )
          }
        />
        < h2 > Total: $ {total}</h2 >
        {this.renderCheckoutButton(total)}
      </Fragment >
    );
  };

  render() {
    return (
      <Affix style={{ position: "absolute", width: "100%", left: "20px" }}>
        <Card title="Cart" bordered={false}>
          {this.renderProductList()}
        </Card>
      </Affix>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart(product) {
      dispatch(removeFromCart(product));
    },
    removeProductItem(product) {
      dispatch(removeProductItem(product));
    },
    addToCart(product) {
      dispatch(addToCart(product));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart);
