import React, {useState} from 'react';
import {View, Image} from 'react-native';
import styled from 'styled-components';

const RecipeImageThumbnail = React.memo(({imageURL}) => {
  const [visible, setVisible] = useState(true);

  return (
    <View>
      <RecipeImage onLoad={() => setVisible(false)} source={{uri: imageURL}} />
      {visible && (
        <Image
          style={{
            position: 'absolute',
            width: 50,
            height: 50,
          }}
          source={require('../images/placeholder.jpg')}
        />
      )}
    </View>
  );
});

const RecipeImage = styled.Image`
  width: 50px;
  height: 50px;
  background-color: grey;
  margin-right: 20px;
`;

export default RecipeImageThumbnail;
