import React, {useEffect, useState, useContext} from 'react';
import {
  Keyboard,
  Animated,
  Dimensions,
  View,
  TextInput,
  UIManager,
  ScrollView,
} from 'react-native';
import styled from 'styled-components';

const KeyboardShift = props => {
  const height = Dimensions.get('window').height - 88;
  const [screenHeight, setScreenHeight] = useState(0);
  const [keyboardHeight, setkeyboardHeight] = useState(0);

  const [spacerHeight, setSpacerHeight] = useState(0);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [shift, setShift] = useState(new Animated.Value(0));
  const {State: TextInputState} = TextInput;

  const [contentOffset, setContentOffset] = useState(0);
  //   var currentlyFocussedField = TextInputState.currentlyFocusedField();

  scrollRef = React.createRef();

  onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state

    console.log(`set screen height [${contentHeight}]`);
    setScreenHeight(contentHeight);
  };

  useEffect(() => {
    console.log(
      `use effect screenHeight=[${screenHeight}] vs height=[${height}] `,
    );

    if (screenHeight > height) {
      console.log('set scroll true...');
      setScrollEnabled(true);
    } else {
      console.log('set scroll false...');
      setScrollEnabled(false);
    }
  }, [screenHeight]);

  useEffect(() => {}, [isKeyboardVisible]);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      handleKeyboardWillShow,
    );
    const keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      handleKeyboardWillHide,
    );

    return () => {
      keyboardWillHideListener.remove();
      keyboardWillShowListener.remove();
    };
  }, []);

  handleKeyboardWillShow = event => {
    setkeyboardHeight(event.endCoordinates.height);
    setKeyboardVisible(true);
    setSpacerHeight(346);
  };

  handleKeyboardWillHide = () => {
    setKeyboardVisible(false);
    setSpacerHeight(0);
    console.log('handleKeyboardWillHide...');
  };

  doScroll = event => {
    let {width, height} = event.nativeEvent.layout;
    console.log(`doScroll with spacerHeight=[${height}]`);

    const currentlyFocusedField = TextInputState.currentlyFocusedField();

    if (spacerHeight == 0) {
      console.log('... animating for 0');

      this.scrollRef.current.scrollTo({
        animated: true,
        x: 0,
        y: 0,
      });
    } else {
      console.log('... animating for 348');
      const {height: windowHeight} = Dimensions.get('window');

      UIManager.measure(
        currentlyFocusedField,
        (originX, originY, width, height, pageX, pageY) => {
          const fieldHeight = height;
          const fieldTop = pageY;
          const knTop = windowHeight - keyboardHeight;
          console.log(`- keyboardHeight=[${keyboardHeight}]`);
          console.log(`- fieldTop=[${fieldTop}]`);
          console.log(`- knTop=[${knTop}]`);

          if (fieldTop > knTop) {
            this.scrollRef.current.scrollTo({
              animated: true,
              x: 0,
              y: fieldTop - knTop + fieldHeight + 15 + contentOffset,
            });
          }
        },
      );
    }
  };

  hello = event => {
    let {width, height} = event.nativeEvent.layout;
    console.log(`hello with [${height}]`);
  };

  const handleScroll = event => {
    const offset = event.nativeEvent.contentOffset.y;

    setContentOffset(offset);
  };

  return (
    <AnimatedContainer style={[{transform: [{translateY: shift}]}]}>
      <ScrollViewContainer>
        <ScrollView
          ref={this.scrollRef}
          onScroll={event => handleScroll(event)}
          scrollEventThrottle={16}>
          <DummyView onLayout={event => hello(event)}>
            {props.children}
          </DummyView>
          <Spacer
            onLayout={event => doScroll(event)}
            spacerHeight={spacerHeight}></Spacer>
        </ScrollView>
      </ScrollViewContainer>
    </AnimatedContainer>
  );
};

const Spacer = styled.View`
  /* background-color: springgreen; */
  height: ${props => props.spacerHeight};
`;

const ScrollViewStyled = styled.ScrollView`
  background-color: pink;
`;

const ScrollViewContainer = styled.View`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
`;

const DummyView = styled.View`
  /* flex: 1; */
  background-color: wheat;
`;

const ContentView = styled.View`
  height: 100px;
  background-color: yellow;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

export default KeyboardShift;
