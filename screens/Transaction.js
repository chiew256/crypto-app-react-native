import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    Image,
    ScrollView,

} from 'react-native';

import { dummyData, COLORS, SIZES, FONTS, icons } from '../constants/';
import tw from 'tailwind-react-native-classnames';
import { HeaderBar, CurrencyLabel, TextButton, TransactionHistory } from '../components';

const Transaction = ({ route, navigation }) => {
    const [selectedCurrency, setSelectedCurrency] = useState(null);

    useEffect(() => {
        const { currency } = route.params;
        setSelectedCurrency(currency);
    }, [])

    const renderTrade = () => {
        return(
            <View style={[tw`mt-6 mx-3 p-3 rounded-xl`, {backgroundColor: COLORS.white, ...styles.shadow}]}>
                <View style={tw`mb-3`}>
                    <CurrencyLabel
                            icon={selectedCurrency?.image}
                            currency={selectedCurrency?.currency}
                            code={selectedCurrency?.code}   
                            renderInBuyCard={true}
                    />
                </View>
                <View style={tw`mt-6 mb-9 items-center justify-center`}>
                    <Text style={{...FONTS.h2}}>{selectedCurrency?.wallet.crypto} {selectedCurrency?.code}</Text>
                    <Text style={{color: COLORS.gray, ...FONTS.body4}}>{selectedCurrency?.wallet.value}</Text>
                </View>
                <TextButton
                    label="Trade"
                    onPress={() => console.log("Trade")}/>
            </View>        
        )
    }

    const renderTransactionHistory = () => {
        return(
            <TransactionHistory
                customContainerStyle={{...styles.shadow}}
                history={selectedCurrency?.transactionHistory}/>
        )
    }
    return (
        <SafeAreaView style={[tw`flex-1`, {backgroundColor: COLORS.lightGray1}]}>
            <HeaderBar/>
            <ScrollView>
                <View style={tw`flex-1 pb-6`}>
                    {renderTrade()}
                    {renderTransactionHistory()}
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

export default Transaction;