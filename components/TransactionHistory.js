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
import { FlatList } from 'react-native-gesture-handler';

const TransactionHistory = ({ customContainerStyle, history }) => {
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={tw`flex-row items-center py-2`}
                onPress={() => console.log(item)}
            >
                <Image
                    source={icons.transaction}
                    style={[tw`w-7 h-7`, {tintColor: COLORS.primary}]}
                />
                <View style={tw`flex-1 ml-3`}>
                    <Text style={{...FONTS.h3}}>{item.description}</Text>
                    <Text style={{...FONTS.body4}}>{item.date}</Text>
                </View>
                <View style={tw`flex-row h-full items-center`}>
                    <Text style={{color: item.type == "B" ? COLORS.green : COLORS.black, ...FONTS.h3}}>{item.amount}</Text>
                    <Image
                        source={icons.right_arrow}
                        style={[tw`ml-4 w-6 h-6`, {tintColor: COLORS.gray}]}
                    />
                </View>
 
            </TouchableOpacity>
        )
    }
    return (
        <View style={[tw`mt-6 mx-6 p-5 rounded-xl`, {backgroundColor: COLORS.white, ...customContainerStyle}]}>
            <Text style={{...FONTS.h2}}>Transaction History</Text>
            <FlatList
                contentContainerStyle={tw`mt-3`}
                scrollEnabled={false}
                data={history}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => {
                    return(
                        <View style={[tw`w-full h-px`, {backgroundColor: COLORS.lightGray}]}></View>
                    )
                }}/>
        </View>
    )
}

export default TransactionHistory;
