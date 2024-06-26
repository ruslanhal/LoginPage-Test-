import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const LetterSvg = () => {
    return(
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path fill-rule="evenodd" clip-rule="evenodd" d="M4.636 5.04501H19.363C20.267 5.04501 21 5.77801 21 6.68201V17.318C21 18.222 20.267 18.954 19.364 18.954H4.636C3.733 18.955 3 18.222 3 17.318V6.68201C3 5.77801 3.733 5.04501 4.636 5.04501Z" stroke="#828282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M3.11902 6.075L10.813 11.578C11.508 12.075 12.442 12.076 13.138 11.58L20.876 6.061" stroke="#828282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    );
}