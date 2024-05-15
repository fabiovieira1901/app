import React, { Component } from 'react';
import {
    View, Text, ImageBackground, Alert,
    TouchableOpacity, BackHandler, Platform
} from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import axios from 'axios';
import * as Print from "expo-print";
import * as Sharing from 'expo-sharing';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import Api from '../../services/api/Api';
import UtilsApi from '../../services/utils/utils';
import UserStorage from '../../storage/user';
import Storage from '../../storage/storage';
import Menu from '../../components/Menu/Menu';
import List from '../../components/List/List';
import Loading from '../../components/Loading/Loading';
import ImagesBase64 from '../../assets/images/ImagesBase64';
import Styles from './NutritionStyles';


class Nutrition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            menuVisible: false,
            pdfLoading: false,
            data: null,
            foods: null,
            supplements: null,
            supplementType: 100,
            units: {}
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        const self = this;

        this._unsubscribeFocus = navigation.addListener('focus', () => {

            self._unsubscribeEvent = EventRegister.addEventListener('header-left-click', () => {
                self.handleBackButton(navigation);
            });

            self._unsubscribeHomeEvent = EventRegister.addEventListener('home-click', () => {
                UtilsApi.backHome(navigation);
            });

            BackHandler.addEventListener('hardwareBackPress', function () {
                self.handleBackButton(navigation);
                return true;
            });

            self.getData();
        });

        this._unsubscribeBlur = navigation.addListener('blur', () => {
            if (self._unsubscribeEvent) {
                EventRegister.removeEventListener(self._unsubscribeEvent);
            }

            if (self._unsubscribeHomeEvent) {
                EventRegister.removeEventListener(self._unsubscribeHomeEvent);
            }

            BackHandler.removeEventListener('hardwareBackPress', function () {
                self.handleBackButton(navigation);
                return true;
            });
        });
    }

    componentWillUnmount() {
        this._unsubscribeFocus();
        this._unsubscribeBlur();

        if (this._unsubscribeEvent) {
            EventRegister.removeEventListener(this._unsubscribeEvent);
        }

        if (this._unsubscribeHomeEvent) {
            EventRegister.removeEventListener(this._unsubscribeHomeEvent);
        }
    }

    handleBackButton(navigation) {
        navigation.goBack(null);
        return true;
    }

    menuEvent = (status) => {
        return this.setState({
            menuVisible: status == 'open' ? true : false
        });
    }

    getData = () => {
        const self = this;

        this.setState({
            loading: true
        });

        UserStorage.getNutrition(axios.defaults.userDbId, function (response) {
            const nutrition = response && response[0] ? response[0] : null;
            if (nutrition) {
                for (let d = 0; d < nutrition.days.length; d++) {
                    const day = nutrition.days[d];
                    day.info = getValuesString(day);

                    for (let m = 0; m < day.meals.length; m++) {
                        const meal = day.meals[m];
                        meal.info = getValuesString(meal);

                        for (let f = 0; f < meal.foods.length; f++) {
                            const food = meal.foods[f];
                            food.info = getValuesString(food);
                        }
                    }
                }

                self.setState({
                    loading: false,
                    data: nutrition
                });
            } else {
                self.setState({
                    loading: false,
                });
            }
        });

        function getValuesString(item) {
            return window.strings['calories'] + ': ' + item.calories +
                window.strings['kcal_protein'] + ': ' + item.protein +
                window.strings['g_carbohydrates'] + ': ' + item.carbs +
                window.strings['g_fat'] + ': ' + item.fat + ' ' + window.strings['g'];
        }
    }

    open = (day) => {
        const self = this;
        Storage.setItem('client-nutrition-day', {
            day: day
        }).then(() => {
            self.props.navigation.navigate('NutritionDay');
        });
    }

    exportPdf = (html) => {
        const self = this;

        this.setState({
            pdfLoading: true
        });

        if (html) {
            if (Platform.OS === 'ios') {
                self.sharePdf(html);
            } else {
                self.printPdf(html);
            }
        } else {
            this.getFoods(function () {
                if (Platform.OS === 'ios') {
                    self.sharePdf();
                } else {
                    self.printPdf();
                }
            });
        }
    }

    exportShoppingList = () => {
        const self = this;
        this.setState({
            pdfLoading: true
        });
        this.getShoppingList(function (data) {
            self.getFoods(function () {
                const html = self.getShoppingListPdf(data);
                self.exportPdf(html);
            });
        });
    }

    getShoppingList = (callback) => {
        const self = this;
        Api.getShoppingList({
            id: this.state.data.id
        }, function (response) {
            if (response.success) {
                callback(response.data);
            } else {
                self.setState({
                    pdfLoading: false
                });
                Alert.alert('', response.message);
            }
        });
    }

    getFoods = (callback) => {
        const self = this;

        if (this.state.foods) {
            this.getSupplements(callback);
        } else {

            let foodTypes = UtilsApi.getFoodTypes();
            let units = {};

            for (let i = 0; i < foodTypes.length; i++) {
                units[foodTypes[i].value] = foodTypes[i];
            }

            this.setState({
                units: units
            });

            const foodsIds = [];
            for (let d = 0; d < this.state.data.days.length; d++) {
                const day = this.state.data.days[d];
                for (let m = 0; m < day.meals.length; m++) {
                    const meal = day.meals[m];
                    for (let f = 0; f < meal.foods.length; f++) {
                        if (meal.foods[f].food_id) {
                            foodsIds.push(meal.foods[f].food_id);
                        }
                    }
                }
            }

            Api.getFoods({
                photo: false,
                ids: foodsIds
            }, function (response) {
                if (response.success) {
                    const foods = {};

                    for (let i = 0; i < response.data.length; i++) {
                        foods[response.data[i].id] = response.data[i];
                    }

                    self.setState({
                        foods: foods
                    });

                    setTimeout(function () {
                        self.getSupplements(callback);
                    })
                } else {
                    self.setState({
                        pdfLoading: false
                    });

                    Alert.alert('', response.message);
                }
            });
        }
    }

    getShoppingListPdf = (data) => {
        let html = '';
        let name = this.state.data ? this.state.data.name : window.strings['food_plan'];

        html += `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">`;
        html += '<title>' + name + '</title>';
        html += `
                <style>
                    body {
                        font-size: 20px;
                        color: black;
                    }

                    h1 {
                        text-align: center;
                    }

                    .pdf-empty {
                        text-align: center;
                        margin-top: 40px;
                    }

                    .pdf-title {
                        font-size: 24px;
                        font-weight: bold;
                    }

                    .pdf-row-item {
                        margin-bottom: 20px;
                    }

                    .pdf-name {
                        font-size: 24px;
                        margin-bottom: 5px;
                    }

                    .pdf-row-info {
                        margin-bottom: 5px;
                    }

                    .pdf-text-bold {
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>`;
        html += '<h1>' + name + '</h1>';
        html += '<h2>' + window.strings['shopping_list'] + '</h2>';

        if (data && data.length) {
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                const unit = this.state.units[data[i].type] && this.state.units[data[i].type].unit ? this.state.units[data[i].type].unit : '';
                html +=
                    '<div class="pdf-row-item">' +
                    '<div class="pdf-name">' + (item.text ? item.text : (item.name + ' - ' + item.value + unit)) + '</div>' +
                    '</div>';
            }
        } else {
            html += '<div class="pdf-empty">' + window.strings['no_defined_food_plan'] + '</div> ';
        }

        html += `
            </body>
            </html>
        `;

        return html;
    }

    getSupplements = (callback) => {
        const self = this;

        if (this.state.supplements) {
            callback();
        } else {
            Api.getContents({
                type: this.state.supplementType,
                photo: false
            }, function (response) {
                if (response.success) {
                    const supplements = {};

                    for (let i = 0; i < response.data.length; i++) {
                        supplements[response.data[i].id] = response.data[i];
                    }

                    self.setState({
                        supplements: supplements
                    });

                    setTimeout(function () {
                        callback();
                    })
                } else {
                    self.setState({
                        pdfLoading: false
                    });

                    Alert.alert('', response.message);
                }
            });
        }
    }

    printPdf = (html) => {
        const self = this;
        try {
            (async () => {
                html = html ? html : self.getPdf();
                const { uri } = await Print.printToFileAsync({ html });

                await Print.printAsync({
                    uri: uri
                });

                self.setState({
                    pdfLoading: false
                });
            })();
        } catch (error) {
            Alert.alert('', window.strings['export_pdf_not_available']);
        }
    }

    sharePdf = (html) => {
        const self = this;
        try {
            (async () => {
                html = html ? html : self.getPdf();
                const { uri } = await Print.printToFileAsync({ html });

                await Sharing.shareAsync(uri);

                self.setState({
                    pdfLoading: false
                });
            })();
        } catch (error) {
            Alert.alert('', window.strings['export_pdf_not_available']);
        }
    }

    getPdf = () => {
        let html = '';
        let name = this.state.data ? this.state.data.name : window.strings['food_plan'];

        html += `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">`;
        html += '<title>' + name + '</title>';
        html += `
                <style>
                    body {
                        font-size: 20px;
                        color: black;
                    }

                    h1 {
                        text-align: center;
                        font-size: 35px;
                    }

                    .pdf-logo {
                        text-align: center;
                    }

                    .pdf-logo img {
                        height: 80px;
                    }

                    .pdf-empty {
                        text-align: center;
                        margin-top: 40px;
                    }

                    .pdf-title {
                        font-size: 26px;
                        font-weight: bold;
                    }

                    .pdf-row-item {
                        margin-bottom: 20px;
                    }

                    .pdf-name {
                        font-weight: bold;
                        font-size: 24px;
                        margin-top: 20px;
                        margin-bottom: 5px;
                        color: #000;
                    }

                    .pdf-row-info {
                        margin-bottom: 5px;
                    }

                    .pdf-text-bold {
                        font-weight: bold;
                        text-decoration: underline;
                        margin-top: 15px;
                        margin-bottom: 5px;
                        color: #000;
                    }

                    .pdf-text-bold-small {
                        font-weight: bold;
                    }

                    .pdf-text-bold-small-underline {
                        font-weight: bold;
                        text-decoration: underline;
                    }

                    .pdf-text-top {
                        margin-top: 5px;
                    }
                </style>
            </head>
            <body>`;
        html += '<div class="pdf-logo"><img src="' + ImagesBase64.logo + '" /></div>';
        html += '<h1>' + name + '</h1>';

        if (this.state.data && this.state.data.days && this.state.data.days.length) {
            for (let i = 0; i < this.state.data.days.length; i++) {
                const day = this.state.data.days[i];
                html +=
                    '<div class="pdf-row-item">' +
                    '<div class="pdf-name">' + day.name + '</div>';

                if (day.info) {
                    html +=
                        '<div class="pdf-text">' +
                        day.info +
                        '</div>';
                }

                if (day.description) {
                    html +=
                        '<div class="pdf-text pdf-text-top">' +
                        '<span class="pdf-text-bold-small">' + window.strings['remarks'] + ': </span>' +
                        day.description +
                        '</div>';
                }

                html += '<div>';

                for (let e = 0; e < day.meals.length; e++) {
                    const meal = day.meals[e];
                    html +=
                        '<div class="pdf-row-info">' +
                        '<div class="pdf-text-bold">' +
                        meal.name +
                        '</div>';

                    if (meal.description) {
                        html +=
                            '<div class="pdf-text pdf-text-top">' +
                            '<span class="pdf-text-bold-small">' + window.strings['remarks'] + ': </span>' +
                            meal.description +
                            '</div>';
                    }

                    html += '</div>';

                    for (let f = 0; f < meal.foods.length; f++) {
                        const food = meal.foods[f];
                        let unit = '';
                        let foodSrc = {};

                        if (this.state.foods[food.food_id]) {
                            foodSrc = this.state.foods[food.food_id];
                        }

                        if (this.state.units[foodSrc.type] &&
                            this.state.units[foodSrc.type].unit
                        ) {
                            unit = this.state.units[foodSrc.type].unit;
                        }

                        html +=
                            '<div class="pdf-row-info">' +
                            '<div class="pdf-text-bold-small">' +
                            food.value + unit + ' ' + foodSrc.name +
                            '</div>' +
                            '<div class="pdf-text">' +
                            food.info +
                            '</div>' +
                            '</div>';
                    }

                    if (meal.info) {
                        html +=
                            '<div class="pdf-row-info">' +
                            '<div class="pdf-text-bold-small-underline">' +
                            window.strings['macros'] +
                            '</div>' +
                            '<div class="pdf-text">' +
                            meal.info +
                            '</div>' +
                            '</div>';
                    }

                    if (meal.extra_data) {
                        try {
                            const supplements = JSON.parse(meal.extra_data).supplements;

                            if (supplements && supplements.length) {
                                const supplementsNames = [];
                                for (let p = 0; p < supplements.length; p++) {
                                    const supplement = this.state.supplements[supplements[p].id];
                                    if (supplement) {
                                        supplementsNames.push(supplement.name + ' - ' + supplements[p].value);
                                    }
                                }

                                html +=
                                    '<div class="pdf-row-info">' +
                                    '<div class="pdf-text-bold-small-underline">' +
                                    window.strings['supplements'] +
                                    '</div>' +
                                    '<div class="pdf-text">' +
                                    supplementsNames.join(' | ') +
                                    '</div>' +
                                    '</div>';
                            }
                        } catch (error) { }
                    }
                }

                html += '</div></div>';
            }
        } else {
            html += '<div class="pdf-empty">' +
                window.strings['no_defined_training_plan'] + '</div> ';
        }

        html += `
            </body>
            </html>
        `;

        return html;
    }

    openDescription = () => {
        Alert.alert('', this.state.data.description);
    }

    render() {
        const self = this;

        return (
            <View style={Styles.container}>
                <Loading loadingVisible={this.state.pdfLoading} />

                <ImageBackground
                    source={require("../../assets/images/background_nutrition.jpg")}
                    style={Styles.background}
                >
                    <Menu menuVisible={this.state.menuVisible}
                        callbackClose={this.menuEvent}
                        navigation={this.props.navigation}
                    />

                    {this.state.data ?
                        <View style={Styles.titleContainer}>
                            <Text style={Styles.title}>
                                {this.state.data.name}
                            </Text>
                            <TouchableOpacity activeOpacity={0.8}
                                onPress={this.exportShoppingList}
                                style={[Styles.button, Styles.buttonSpace]}>
                                <FontAwesome5 name="shopping-cart"
                                    size={Styles.buttonIconSize}
                                    color={Styles.buttonIconColor}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8}
                                onPress={function () {
                                    self.exportPdf()
                                }}
                                style={Styles.button}>
                                <FontAwesome name="file-pdf-o"
                                    size={Styles.buttonIconSize}
                                    color={Styles.buttonIconColor}
                                />
                            </TouchableOpacity>
                        </View> : null}

                    <List data={this.state.data ? this.state.data.days : []}
                        callbackRefresh={this.getData}
                        loading={this.state.loading}
                        emptyMessage={window.strings['no_defined_food_plan']}
                        callbackOpen={this.open}
                    />

                    {this.state.data && this.state.data.description ?
                        <TouchableOpacity style={Styles.description}
                            activeOpacity={0.8}
                            onPress={this.openDescription}
                        >
                            <Text style={Styles.descriptionText}
                                numberOfLines={3}
                            >
                                {this.state.data.description}
                            </Text>
                        </TouchableOpacity> : null}

                </ImageBackground>
            </View>
        );
    }
}

export default Nutrition;