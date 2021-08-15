import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    Animated,
    SafeAreaView,

} from 'react-native';

import { dummyData, COLORS, SIZES, FONTS, icons } from '../constants/';
import tw from 'tailwind-react-native-classnames';
import { HeaderBar, CurrencyLabel, TextButton, PriceAlert  } from '../components';
import { VictoryScatter, VictoryLine, VictoryChart, VictoryAxis } from 'victory-native'
import { VictoryCustomTheme} from '../styles';

const CryptoDetail = ({ route, navigation }) => {
    const scrollX = new Animated.Value(0);
    const numberOfCharts = [1, 2, 3];
    const [selectedCurrency, setSelectedCurrency] = useState(null);
    const [chartOptions, setChartOptions] = useState(dummyData.chartOptions);
    const [selectedOption, setSelectedOption] = useState(chartOptions[0]);

    useEffect(() => {
        const { currency } = route.params;
        setSelectedCurrency(currency);
    }, [])

    const renderDots = () => {
        const dotPosition = Animated.divide(scrollX, SIZES.width);
        return(
            <View style={tw`h-7 mt-4`}>
                <View style={tw`flex-row justify-center items-center`}>
                    {
                        numberOfCharts.map(( item, index ) => {

                            const opacity = dotPosition.interpolate({
                                inputRange: [index - 1, index, index + 1],
                                outputRange: [0.3, 1 , 0.3],
                                extrapolate: "clamp"
                            })

                            const dotSize = dotPosition.interpolate({
                                inputRange: [index - 1, index, index + 1],
                                outputRange: [SIZES.base * 0.8 , 10 , SIZES.base * 0.8],
                                extrapolate: "clamp"
                            })

                            const dotColor = dotPosition.interpolate({                           
                                inputRange: [index - 1, index, index + 1],
                                outputRange: [COLORS.gray, COLORS.primary, COLORS.gray],
                                extrapolate: "clamp"
                            })

                            return(
                                <Animated.View
                                    key={`dot-${index}`}
                                    opacity={opacity}
                                    style={{
                                        borderRadius: SIZES.radius,
                                        marginHorizontal: 6,
                                        width: dotSize,
                                        height: dotSize,
                                        backgroundColor: dotColor,
                                    }}
                                />
                            )
                        })
                    }
                </View>
            </View>
        )
    }

    const renderChart = () => {
        return(
            <View style={[tw`mt-6 mx-3 items-center rounded-xl`, {backgroundColor: COLORS.white, ...styles.shadow}]}>
                {/* Header */}
                <CurrencyLabel 
                    icon={selectedCurrency?.image}
                    currency={selectedCurrency?.currency}
                    code={selectedCurrency?.code}
                    amount={selectedCurrency?.amount}
                    changes={selectedCurrency?.changes}
                    type={selectedCurrency?.type}
                />
                {/* Chart */}
                <Animated.ScrollView
                    horizontal
                    pagingEnabled
                    scrollEventThrottle={16}
                    snapToAlignment="center"
                    snapToInterval={SIZES.width - 40}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={0}
                    onScroll={Animated.event([
                        {nativeEvent: {
                            contentOffset: {
                                x: scrollX
                            }
                        }}
                    ], {useNativeDriver: false})}
                >
                    {
                        numberOfCharts.map(({ item, index }) => (
                            <View
                                key={`chart-${index}`}
                                style={tw`ml-${index == 0 ? '2' : '0'}`}
                            >     
                                <View style={tw`-mt-6`}>
                                    <VictoryChart
                                        theme={VictoryCustomTheme}
                                        height={220}
                                        width={SIZES.width - 40}
                                    >
                                        <VictoryLine
                                            style={{
                                                data: {
                                                    stroke: COLORS.secondary,
                                                },
                                                parent: {
                                                    border: "1px solid #ccc"
                                                }
                                            }}
                                            data={selectedCurrency?.chartData}
                                            categories={{
                                                x: ["15 MIN", "30 MIN", "45 MIN", "60 MIN"],
                                                y: ["15", "30", "45"]
                                            }}
                                        />
                                        <VictoryScatter
                                            data={selectedCurrency?.chartData}
                                            size={7}
                                            style={{
                                                data: {
                                                    fill: COLORS.secondary
                                                }
                                            }}
                                        />
                                        <VictoryAxis
                                            style={{
                                                grid: {
                                                    stroke: "transparent"
                                                }
                                            }}
                                        />
                                        <VictoryAxis
                                            dependentAxis
                                            style={{
                                                axis: {
                                                    stroke: "transparent"
                                                },
                                                grid: {
                                                    stroke: "grey"
                                                }
                                            }}
                                        />
                                    </VictoryChart>
                                </View>
                            </View>
                        ))
                    }     
                </Animated.ScrollView>

                {/* Options */}
                <View style={tw`w-full flex-row justify-between px-6`}>
                    {
                        chartOptions.map(( option ) => {
                            return(
                                <TextButton
                                    key={`option-${option.id}`}
                                    label={option.label}
                                    customContainerStyle={{height: 30, width: 60, borderRadius: 15, backgroundColor: selectedOption.id == option.id ? COLORS.primary : COLORS.lightGray}}
                                    customLabelStyle={{color: selectedOption.id == option.id ? COLORS.white : COLORS.gray, ...FONTS.body5}}
                                    onPress={() => setSelectedOption(option)}
                                />
                            )
                        })
                    }
                </View>

                {/* Dot */}
                {renderDots()}
            </View>
        )
    }

    const renderBuy = () => {
        return(
            <View style={[tw`mt-6 mx-3 p-3 rounded-xl`, {backgroundColor: COLORS.white, ...styles.shadow}]}>            
                <View style={tw`flex-row items-center mb-3`}>
                    {/* CurrencyLabel */}
                    <View style={tw`flex-1`}>                
                        <CurrencyLabel
                            icon={selectedCurrency?.image}
                            currency={`${selectedCurrency?.currency} Wallet`}
                            code={selectedCurrency?.code}
                            renderInBuyCard={true}
                        />
                    </View>
                    {/* Amount */}
                    <View style={tw`flex-row items-center`}>
                        <View style={tw`mr-2`}>
                            <Text style={{...FONTS.h3}}>${selectedCurrency?.wallet.value}</Text>
                            <Text style={[tw`text-right`, {...FONTS.body4, color: COLORS.gray}]}>{selectedCurrency?.wallet.crypto} {selectedCurrency?.code}</Text>
                        </View>
                        <Image
                            source={icons.right_arrow}
                            resizeMode="cover"
                            style={[tw`w-5 h-5`, {tintColor: COLORS.gray}]}
                        />
                    </View>
                </View>
                <TextButton
                    label="Buy"
                    onPress={() => navigation.navigate('Transaction', { currency: selectedCurrency })}
                />
            </View>
        )
    } 

    const renderAbout = ()  => {
        return(
            <View style={[tw`mt-6 mx-3 p-3 rounded-xl`, {backgroundColor: COLORS.white, ...styles.shadow}]}>
                <Text style={{...FONTS.h3}}>About</Text>
                <Text style={[tw`mt-2`, {...FONTS.body3}]}>{selectedCurrency?.description}</Text>
            </View>
        )
    }
    

    return (
        <SafeAreaView style={[tw`flex-1`, {backgroundColor: COLORS.lightGray1}]}>
            <HeaderBar right={true} />
            <ScrollView>
                <View style={tw`flex-1 pb-6`}>
                    {renderChart()}         
                    {renderBuy()}    
                    {renderAbout()}     
                    <PriceAlert
                        customContainerStyle={tw`mt-6 mx-3`}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
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

export default CryptoDetail;