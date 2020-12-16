import React, {useEffect, useState, useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components';
import {WebView} from 'react-native-webview';

const deviceWidth = Dimensions.get('window').width;
const WebViewHeight = deviceWidth * (9 / 16);

const WebViewCustom = React.memo(({sourceURL, index}) => {
  const [visible, setVisible] = useState(true);

  // const num = Math.floor(Math.random() * 10);

  const hideSpinner = () => {
    setVisible(false);
  };
  return (
    <Container key={index}>
      <WebView
        onLoad={() => hideSpinner()}
        // onLoad={() => setVisible(false)}
        style={styles.WebViewStyle}
        source={{uri: sourceURL}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
      />
      {visible && (
        <ActivityIndicator
          style={{
            position: 'absolute',
            height: WebViewHeight,
            width: deviceWidth,
            backgroundColor: 'whitesmoke',
          }}
          size="large"
        />
      )}
      {/* <RandView>
        <RandText>{num}</RandText>
      </RandView> */}
    </Container>
  );
});

// const WebViewCustom = (sourceURL, key) => {
//   const [visible, setVisible] = useState(true);

//   const hideSpinner = () => {
//     setVisible(false);
//   };
//   return (
//     <View key={key}>
//       <WebView
//         onLoad={() => hideSpinner()}
//         // onLoad={() => setVisible(false)}
//         style={styles.WebViewStyle}
//         source={{uri: sourceURL}}
//         javaScriptEnabled={true}
//         domStorageEnabled={true}
//         allowsInlineMediaPlayback={true}
//       />
//       {visible && (
//         <ActivityIndicator
//           style={{
//             position: 'absolute',
//             height: WebViewHeight,
//             width: deviceWidth,
//             backgroundColor: 'whitesmoke',
//           }}
//           size="large"
//         />
//       )}
//     </View>
//   );
// };

const Container = styled.View``;

const RandView = styled.View`
  height: 40px;
  justify-content: center;
  align-items: center;
`;

const RandText = styled.Text``;

const RecipePlayerView = styled.View`
  height: ${WebViewHeight}px;
  background-color: whitesmoke;
  justify-content: center;
`;

const styles = StyleSheet.create({
  WebViewStyle: {
    height: WebViewHeight,
    width: deviceWidth,
    flex: 1,
  },
});

export default WebViewCustom;
