import React, { Component } from "react";
import { View, Animated, StyleSheet } from "react-native";

export class ParallaxScroll extends Component {
  static defaultProps = {
    scaleParallaxHeader: true,
  };

  _animatedValue = new Animated.Value(50);

  constructor(props) {
    super(props);

    this._animatedValue.addListener(this.onScroll);
  }

  get stickyMarginTop() {
    const { parallaxHeaderHeight = 0, stickyHeaderHeight = 0 } = this.props;
    return Math.abs(parallaxHeaderHeight - stickyHeaderHeight);
  }

  onScroll = ({ value }) => {
    const { onScroll, onSticky, stickyHeaderHeight } = this.props;

    if (typeof onScroll === "function") {
      onScroll(value);
    }
    if (typeof onSticky === "function") {
      onSticky(value >= stickyHeaderHeight);
    }
  };

  renderFixedHeader() {
    const { fixedHeader } = this.props;

    if (typeof fixedHeader !== "function") {
      return null;
    }

    return (
      <View
        style={{
          height: 50,
          width: "100%",
          padding: 10,
          justifyContent: "center",
        }}
      >
        {fixedHeader(this._animatedValue)}
      </View>
    );
  }

  renderStickyHeader() {
    const { stickyHeader, isSectionList } = this.props;

    if (typeof stickyHeader !== "function") {
      return null;
    }

    return stickyHeader(this._animatedValue);
  }

  renderParallaxHeader() {
    const { parallaxHeader, scaleParallaxHeader, parallaxHeaderHeight } =
      this.props;

    if (typeof parallaxHeader !== "function") {
      return null;
    }

    let animationStyle = null;
    if (scaleParallaxHeader) {
      const scaleValue = 5;
      const scale = this._animatedValue.interpolate({
        inputRange: [-parallaxHeaderHeight, 0],
        outputRange: [scaleValue * 1.5, 1],
        extrapolate: "clamp",
      });
      animationStyle = {
        transform: [{ scale }],
      };
    }

    return (
      <Animated.View style={[animationStyle, { height: parallaxHeaderHeight }]}>
        {parallaxHeader(this._animatedValue)}
      </Animated.View>
    );
  }

  render() {
    const { children, onRef, ...props } = this.props;

    const event = Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              y: this._animatedValue,
            },
          },
        },
      ],
      { useNativeDriver: true }
    );

    return (
      <View style={{ flex: 1 }}>
        <View style={{ position: "absolute" }}>{this.renderFixedHeader()}</View>
        <Animated.ScrollView
          ref={onRef}
          {...props}
          onScroll={event}
          stickyHeaderIndices={[2]}
        >
          {this.renderParallaxHeader()}
          <View style={{ height: this.stickyMarginTop }} />
          {this.renderStickyHeader()}
          {children}
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parralexHeader: {
    height: 50,
    width: "100%",
    padding: 10,
  },
});

export default ParallaxScroll;
