import React, { Component } from 'react';
import {
    View, Text, ImageBackground, TouchableOpacity,
    BackHandler, Alert, Linking
} from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import Storage from '../../storage/storage';
import Api from '../../services/api/Api';
import UtilsApi from '../../services/utils/utils';
import Menu from '../../components/Menu/Menu';
import List from '../../components/List/List';
import Button from '../../components/Button/Button';
import Styles from './NutritionMealStyles';


class NutritionMeal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuVisible: false,
            loading: true,
            name: '',
            tab: 'foods',
            data: null,
            foods: [],
            supplements: []
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

        Storage.getItem('client-nutrition-meal').then(data => {
            const foodsIds = [];
            data.meal.foods.forEach(function (fd) {
                if (fd.food_id) {
                    foodsIds.push(fd.food_id);
                }
            });
            Api.getFoods({
                photo: true,
                ids: foodsIds
            }, function (response) {
                if (response.success) {
                    self.setState({
                        data: data.meal,
                        foods: self.encodeFoods(response.data, data.meal.foods),
                        supplements: []
                    });

                    if (data.meal.extra_data) {
                        try {
                            const supplements = JSON.parse(data.meal.extra_data).supplements;

                            if (supplements && supplements.length) {
                                self.getSupplements(supplements);
                            } else {
                                self.setState({
                                    loading: false
                                });
                            }

                        } catch (error) {
                            self.setState({
                                loading: false
                            });
                        }
                    } else {
                        self.setState({
                            loading: false
                        });
                    }

                } else {
                    self.setState({
                        loading: false
                    });
                    Alert.alert('', response.message);
                }
            });
        });
    }

    encodeFoods = (foods, mealFoods) => {
        const foodTypes = UtilsApi.getFoodTypes();
        const units = {};
        const foodsObj = {};
        const items = [];

        for (let i = 0; i < foodTypes.length; i++) {
            units[foodTypes[i].value] = foodTypes[i];
        }

        for (let i = 0; i < foods.length; i++) {
            foodsObj[foods[i].id] = foods[i];
        }

        for (let i = 0; i < mealFoods.length; i++) {
            let unit = '';
            let foodSrc = {};

            if (foodsObj[mealFoods[i].food_id]) {
                foodSrc = foodsObj[mealFoods[i].food_id];
            }

            if (units[foodSrc.type] && units[foodSrc.type].unit) {
                unit = units[foodSrc.type].unit;
            }

            items.push({
                photo: foodSrc.image,
                id: mealFoods[i].id,
                name: mealFoods[i].value + unit + ' ' + foodSrc.name,
                description: mealFoods[i].details,
                info: mealFoods[i].info,
                url: foodSrc.url
            });
        }

        return items;
    }

    getSupplements = (supplements) => {
        const self = this;

        if (supplements && supplements.length && supplements[0].id) {
            const payload = {
                ids: [],
                photo: true
            };

            supplements.forEach(function (sup) {
                if (sup && sup.id) {
                    payload.ids.push(sup.id);
                }
            });

            Api.getContents(payload, function (response) {
                const items = [];

                if (response.success) {
                    for (let i = 0; i < response.data.length; i++) {
                        const supplement = supplements.find(function (item) {
                            return item.id == response.data[i].id;
                        });
                        items.push({
                            id: response.data[i].id,
                            photo: response.data[i].image,
                            name: response.data[i].name,
                            info: supplement ? supplement.value : null,
                            description: response.data[i].description,
                            url: response.data[i].url
                        });
                    }
                } else {
                    Alert.alert('', response.message);
                }

                self.setState({
                    supplements: items,
                    loading: false
                });
            });
        } else {
            self.setState({
                supplements: [],
                loading: false
            });
        }
    }

    openVideo = () => {
        this.props.navigation.navigate('Video', {
            title: this.state.data.name,
            videoUrl: this.state.data.video_url
        });
    }

    openItem = (food) => {
        if (food.url) {
            if (food.url.indexOf('https://www.') == -1 &&
                food.url.indexOf('https') == -1 &&
                food.url.indexOf('www') == -1
            ) {
                food.url = 'https://www.' + food.url;
            }
            Linking.openURL(food.url);
        }
    }

    showTab = (tab) => {
        this.setState({
            tab: tab
        });
    }

    openDescription = () => {
        Alert.alert('', this.state.data.description);
    }

    render() {
        const self = this;
        return (
            <View style={Styles.container}>
                <ImageBackground
                    source={require("../../assets/images/background_nutrition.jpg")}
                    style={Styles.background}>
                    <Menu menuVisible={this.state.menuVisible}
                        callbackClose={this.menuEvent} navigation={this.props.navigation} />

                    <View style={Styles.titleContainer}>
                        <Text style={Styles.title}>
                            {this.state.data ? this.state.data.name : ''}
                        </Text>
                    </View>

                    <View style={Styles.containerView}>
                        <View style={Styles.dataContainer}>
                            {this.state.supplements.length ?
                                <View style={Styles.tabs}>
                                    <View style={Styles.headerTab}>
                                        <TouchableOpacity activeOpacity={0.8}
                                            onPress={function () {
                                                self.showTab('foods')
                                            }}
                                            style={[Styles.tab, Styles.firstTab, this.state.tab == 'foods' ? Styles.tabActive : null]}>
                                            <Text style={[Styles.tabText, this.state.tab == 'foods' ? Styles.tabTextActive : null]}>
                                                {window.strings['foods']}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[Styles.headerTab, Styles.headerTabLast]}>
                                        <TouchableOpacity activeOpacity={0.8}
                                            onPress={function () {
                                                self.showTab('supplements')
                                            }}
                                            style={[Styles.tab, Styles.lastTab, this.state.tab == 'supplements' ? Styles.tabActive : null]}>
                                            <Text style={[Styles.tabText, this.state.tab == 'supplements' ? Styles.tabTextActive : null]}>
                                                {window.strings['supplements']}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View> : null}

                            <View style={this.state.supplements.length ? Styles.tabView : Styles.list}>
                                {this.state.tab == 'foods' ?
                                    <List data={this.state.foods && !this.state.loading ? this.state.foods : []}
                                        loading={this.state.loading}
                                        emptyMessage={window.strings['no_defined_meal']}
                                        showDescription={true}
                                        callbackOpen={this.openItem}
                                        imageColStyle={Styles.imageCol}
                                        imageElementStyle={Styles.imageElement}
                                    /> : null}

                                {this.state.tab == 'supplements' ?
                                    <List data={this.state.supplements && !this.state.loading ? this.state.supplements : []}
                                        loading={this.state.loading}
                                        emptyMessage={window.strings['no_defined_meal']}
                                        showDescription={true}
                                        callbackOpen={this.openItem}
                                        imageColStyle={Styles.imageCol}
                                        imageElementStyle={Styles.imageElement}
                                    /> : null}
                            </View>
                        </View>
                    </View>

                    {!this.state.loading && this.state.data && this.state.data.description ?
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

                    {this.state.data && this.state.data.video_url ?
                        <View style={Styles.videoButton}>
                            <Button callback={this.openVideo}
                                text={window.strings['view_video']} />
                        </View> : null}

                </ImageBackground>
            </View>
        );
    }
}

export default NutritionMeal;