import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,

} from 'react-native';

import { COLORS, SIZES, FONTS, icons } from '../constants';
import tw from 'tailwind-react-native-classnames';


const PriceAlert = ({ customContainerStyle }) => {
    return (
        <TouchableOpacity style={[tw`flex-row items-center mt-32 mx-6 py-5 px-3 bg-white rounded-xl`, {...customContainerStyle, ...styles.shadow}]}>
            <Image
                source={icons.notification_color}
                style={tw`w-8 h-8`}
            />
            <View style={tw`flex-1 ml-3`}>
                <Text style={{...FONTS.h3}}>Set Price ALert</Text>
                <Text style={{...FONTS.body4}}>Get notified when your coins are moving</Text>
            </View>
            <Image
                source={icons.right_arrow}
                style={[tw`w-6 h-6`, {tintColor: COLORS.gray}]}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
})

export default PriceAlert
