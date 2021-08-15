import React from 'react'
import {
    View,
    Text,
    Image,

} from 'react-native';

import { COLORS, SIZES, FONTS } from '../constants/';
import tw from 'tailwind-react-native-classnames';

const CurrencyLabel = ({ icon, currency, code, amount, changes, type, renderInBuyCard }) => {
    return (
        <View style={tw`flex-row items-center ${!renderInBuyCard ? 'px-6 mt-6' : ''}`}>
            <View style={tw`flex-1`}>
                <View style={tw`flex-row`}>
                    <Image
                        source={icon}
                        resizeMode="cover"
                        style={tw`w-6 h-6`}
                    />
                    <View style={tw`ml-2`}>
                        <Text style={{...FONTS.h3}}>{currency}</Text>
                        <Text style={{color: COLORS.gray, ...FONTS.body4}}>{code}</Text>
                    </View>
                </View>
            </View>
            <View>
                <Text style={{...FONTS.h3}}>{`${!renderInBuyCard ? '$' : ''}${!renderInBuyCard ? amount : ''}`}</Text>
                <Text style={{color: type == "I" ? COLORS.green : COLORS.red, ...FONTS.body3}}>{changes}</Text>
            </View>
        </View>
    )
}

export default CurrencyLabel
