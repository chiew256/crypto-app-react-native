import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    Image, 
    TouchableOpacity,

} from 'react-native'

import { dummyData, COLORS, SIZES, FONTS, icons, images } from '../constants/';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

const HeaderBar = ({ right }) => {
    const navigation = useNavigation();

    return (
        <View style={tw`px-6 py-1 flex-row`}>
            <View style={tw`flex-1 items-start`}>
                <TouchableOpacity 
                    style={tw`flex-row items-center`}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.back_arrow}
                        resizeMode="contain"
                        style={[tw`w-6 h-6`, {tintColor: COLORS.gray}]}
                    />
                    <Text style={[tw`ml-2`, {...FONTS.h2}]}>Back</Text>
                </TouchableOpacity>           
            </View>
            {right && 
                <TouchableOpacity style={tw`flex-1 items-end`}>
                    <Image
                            source={icons.star}
                            resizeMode="contain"
                            style={tw`w-8 h-8`}
                    />
                </TouchableOpacity> 
            }       
        </View>
    )
}

export default HeaderBar

const styles = StyleSheet.create({})
