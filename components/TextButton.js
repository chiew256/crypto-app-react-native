import React from 'react'
import { 
    Text, 
    TouchableOpacity,   

} from 'react-native'

import { COLORS, SIZES, FONTS } from '../constants/';
import tw from 'tailwind-react-native-classnames';


const TextButton = ({ label, customContainerStyle, customLabelStyle, onPress }) => {
    return (
        <TouchableOpacity 
            style={[tw`items-center justify-center`, {height: 50, width: "100%", borderRadius: 10, backgroundColor: COLORS.green, ...customContainerStyle}]}
            onPress={onPress}
        >
            <Text style={{color: COLORS.white, ...FONTS.h3, ...customLabelStyle}}>{label}</Text>
        </TouchableOpacity>
    )
}

export default TextButton
