import React, { useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Image,
    ImageBackground,
    LogBox,
} from 'react-native';

import { dummyData, COLORS, SIZES, FONTS, icons, images } from '../constants/';
import tw from 'tailwind-react-native-classnames';
import { PriceAlert, TransactionHistory } from '../components';

const Home = ({ navigation }) => {
    const [trending, setTrending] = useState(dummyData.trendingCurrencies);
    const [transactionHistory, setTransactionHistory] = useState(dummyData.transactionHistory)

    useEffect(() => {
        LogBox.ignoreAllLogs(['VirtualizedLists should never be tested'])
    }, [])

    const renderHeader = () => {
        const renderItem = (({ item, index}) => (
            <TouchableOpacity  
                style={tw`w-44 px-6 py-6 ml-${index === 0 ? "6" : "0"} mr-3 rounded-xl bg-white`}
                onPress={() => navigation.navigate('CryptoDetail', {currency: item})}
            >
                {/* Currency  */}
                <View style={tw`flex-row`}>
                    <View>
                        <Image
                            source={item.image}
                            resizeMode="cover"
                            style={tw`mt-1 w-6 h-6`}
                        />
                    </View>
                    <View style={tw`ml-2`}>
                        <Text style={{...FONTS.h2}}>{item.currency}</Text>
                        <Text style={{color: COLORS.gray, ...FONTS.body3}}>{item.code}</Text>
                    </View>
                </View>

                {/* Value */}
                <View style={tw`mt-3`}>
                    <Text style={{...FONTS.h2}}>{item.amount}</Text>
                    <Text style={{color: item.type == "I" ? COLORS.green : COLORS.red, ...FONTS.h3 }}>{item.changes}</Text>
                </View>
                
            </TouchableOpacity>
        ))
        return (
            <View style={[tw`w-full h-80`, {...styles.shadow}]}>
                <ImageBackground
                    source={images.banner}
                    resizeMode="cover"
                    style={tw`flex-1 items-center`}
                >
                    {/* Header Bar */}
                    <View style={tw`mt-12 w-full items-end px-6`}>
                        <TouchableOpacity
                            style={tw`w-9 h-9 items-center justify-center`}
                            onPress={() => {
                                console.log("Notifications Pressed");
                            }}
                        >
                                <Image
                                    source={icons.notification_white}
                                    resizeMode="contain"
                                    style={tw`flex-1`}
                                />

                        </TouchableOpacity>
                    </View>

                    {/* Balance */}
                    <View style={tw`justify-center items-center`}>
                        <Text style={{color: COLORS.white, ...FONTS.h3}}>Your Portfolio Balance</Text>
                        <Text style={[tw`mt-2`], {color: COLORS.white, ...FONTS.h1}}>${dummyData.portfolio.balance}</Text>
                        <Text style={{color: COLORS.white, ...FONTS.body5}}>{dummyData.portfolio.changes}</Text>
                    </View>

                    {/* Trending */}
                    <View style={tw`absolute -bottom-1/3`}>
                        <Text style={[tw`ml-6`, {color: COLORS.white, ...FONTS.h2}]}>Trending</Text>
                        <FlatList
                            contentContainerStyle={tw`mt-2`}
                            data={trending}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>

                </ImageBackground>
            </View>
        )
    }

    const renderAlert = () => {
        return(
            <PriceAlert/>
        )
    }

    const renderNotice = () => {
        return(
            <View style={[tw`mt-6 mx-6 p-5 rounded-xl`, {backgroundColor: COLORS.secondary}]}>
                <Text style={{...FONTS.h3, color: COLORS.white}}>Investing Safety</Text>
                <Text style={[tw`mt-3`, {...FONTS.body4, color: COLORS.white, lineHeight: 18}]}>It's a very difficult to time an investment, 
                    especially when the market is volatile. 
                    Learn how to use dollar cost to averaging to your advantage.
                </Text>
                <TouchableOpacity 
                    style={tw`mt-6 `}
                    onPress={() => {
                        console.log("Learn more")
                    }}
                >
                    <Text style={[tw`underline`, {color: COLORS.green, ...FONTS.h3}]}>Learn More</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const renderTransactionHistory = () => {
        return(
            <TransactionHistory
                customContainerStyle={styles.shadow}
                history={transactionHistory}
            />
        )
    }

    return (
        <ScrollView>
            <View style={tw`flex-1 pb-32`}>
                {renderHeader()}
                {renderAlert()}
                {renderNotice()}
                {renderTransactionHistory()}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    }
})

export default Home;