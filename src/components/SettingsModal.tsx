import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react'
import { Image, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Modal, StyleSheet, View as DefaultView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { getPicture } from '../client/RequestHelpers';
import { useLocale } from '../hooks/useLocale';
import { RootState } from '../redux';
import { SelectCountry, UpdateSettingsModalShown } from '../redux/actions/personalizeActions';
import { LoadWords } from '../redux/actions/wordsActions';
import { FontSize } from '../shared/constants/FontSize';
import { FontWeight } from '../shared/constants/FontWeight';
import GlobalStyles from '../shared/constants/GlobalStyles';
import Locale from '../shared/locales/Locale';
import { LocaleType } from '../shared/types/ui';
import { ChangeLocale } from '../shared/types/utils/Helpers';
import Button from './Form/Button';
import { SelectInput } from './Form/SelectInput';
import { Text, useThemeColor, View } from './Themed';

const whatsappNo = "+96277000000";
const email = "test@gmail.com";

const SettingsModal = () => {
    const countryId = useSelector((state: RootState) => state.personalize.data.countryId)

    const [selectedCountry, setSelectedCountry] = useState(countryId);

    const dispatch = useDispatch();

    const { settingModalShown, settingModalCancelable } = useSelector((state: RootState) => state.personalize.data)

    const languages = useSelector((state: RootState) => state.languages.data)
    const countries = useSelector((state: RootState) => state.countries.data)


    const hideModal = () => {
        settingModalCancelable && dispatch(UpdateSettingsModalShown(false));
    }

    const saveCountry = (countryId: number) => {
        dispatch(SelectCountry(countryId, () => {
            dispatch(LoadWords())
            setSelectedCountry(countryId)
        }))
    }

    const goToWhatsapp = () => {
        hideModal();
        Linking.openURL(`whatsapp://send?phone=${whatsappNo}&text=hello`);
    }

    const sendEmail = () => {
        hideModal();
        Linking.openURL(`mailto:${email}`)
    }


    const styles = StyleSheet.create({
        modalContainer: {
            backgroundColor: useThemeColor("baseColor")
        },
        separator: {
            marginVertical: 15,
            height: 1,
            width: '80%',
            alignSelf: 'center'
        },
    })


    return (
        <Modal
            transparent
            visible={settingModalShown}
            onRequestClose={hideModal}
        >
            <DefaultView style={{
                flex: 1,
                justifyContent: settingModalCancelable ? 'center' : undefined,
            }}>
                <DefaultView style={[
                    styles.modalContainer,
                    GlobalStyles.Shadow5,
                    {
                        flex: settingModalCancelable ? undefined : 1,
                        margin: settingModalCancelable ? 20 : 0,
                        paddingVertical: 20,
                        justifyContent: 'center',
                        borderRadius: settingModalCancelable ? 10 : 0,
                    }]}>

                    {settingModalCancelable && <DefaultView style={{
                        paddingHorizontal: '5%',
                        alignItems: 'flex-end',
                        marginTop: -10
                    }}>
                        <TouchableOpacity onPress={hideModal}>
                            <MaterialCommunityIcons name="close" size={FontSize.xxLarge} />
                        </TouchableOpacity>
                    </DefaultView>}
                    <DefaultView style={{ paddingHorizontal: '5%' }}>
                        <Text>{useLocale("settings.language")}</Text>
                    </DefaultView>
                    <DefaultView style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }}>
                        {languages.map(lang => (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={{
                                    width: "40%",
                                    marginHorizontal: "5%",
                                    marginVertical: 5
                                }}
                                key={lang.name}
                                onPress={async () => ChangeLocale(lang.name as LocaleType)}>
                                <View style={[
                                    GlobalStyles.Shadow5,
                                    {
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        padding: 5,
                                        paddingHorizontal: 10,
                                        borderRadius: 10
                                    }]}>
                                    <Image
                                        resizeMode="contain"
                                        style={{
                                            width: 50,
                                            height: 50
                                        }}
                                        source={{ uri: getPicture(lang.imagePath ?? "") }} />
                                    <DefaultView style={{ width: 10 }} />
                                    <Text >
                                        {Locale[lang.name as LocaleType]["switch.language"]}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </DefaultView>
                    <DefaultView style={{ paddingHorizontal: '5%' }}>
                        <Text>{useLocale("settings.country")}</Text>
                    </DefaultView>
                    <DefaultView style={{ paddingHorizontal: '5%' }}>
                        <SelectInput
                            placeHolder={useLocale("settings.country")}
                            items={countries.map(country => ({
                                label: country.name ?? '',
                                value: country.id,
                            }))}
                            selectedValue={selectedCountry}
                            onSelectedChanged={saveCountry}
                        />
                    </DefaultView>

                    <View style={styles.separator} lightColor="#bbb" darkColor="rgba(255,255,255,0.1)" />

                    <Text style={{
                        textAlign: 'center',
                        fontWeight: FontWeight.bold
                    }}>{useLocale("settings.contactUs")}</Text>

                    <DefaultView style={{
                        width: "80%",
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignSelf: 'center',
                        marginVertical: 20,
                    }}>
                        <TouchableOpacity onPress={goToWhatsapp}>
                            <MaterialCommunityIcons
                                name="whatsapp"
                                style={{
                                    fontSize: 40,
                                    color: "#367b3b"
                                }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={sendEmail}>
                            <MaterialCommunityIcons
                                name="email"
                                style={{
                                    fontSize: 40,
                                    color: "#367b3b"
                                }} />
                        </TouchableOpacity>
                    </DefaultView>

                </DefaultView>
            </DefaultView>
        </Modal>
    )
}

export default SettingsModal
